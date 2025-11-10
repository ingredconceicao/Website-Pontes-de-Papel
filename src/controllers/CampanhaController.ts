import { Request, Response } from 'express';
import Campanha from '../models/CampanhaModels';
import Book from '../models/BookModel';
import mongoose from 'mongoose';


export const criarCampanha = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Usuário não autenticado.' });
      return;
    }

    const { nome, descricao, meta } = req.body;

    const novaCampanha = new Campanha({
      nome,
      descricao,
      meta,
      status: 'ativa',
      criadaPor: req.user._id,
    });

    const campanhaSalva = await novaCampanha.save();
    res.status(201).json({ success: true, data: campanhaSalva });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro ao criar campanha.' });
  }
};



export const getActiveCampaigns = async (req: Request, res: Response): Promise<Response> => {
  try {
    const campaigns = await Campanha.find({ status: 'Ativa' }).populate('livros', 'titulo autor genero');
    return res.status(200).json({ success: true, count: campaigns.length, data: campaigns });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Erro ao listar campanhas.' });
  }
};


export const addBookToCampaign = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { bookId } = req.body;

    const campaign = await Campanha.findById(id);
    if (!campaign) return res.status(404).json({ success: false, message: 'Campanha não encontrada.' });

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ success: false, message: 'Livro não encontrado.' });

    const campanhaId = new mongoose.Types.ObjectId(req.params.id);
    await campaign.save();

    return res.status(200).json({ success: true, message: 'Livro adicionado à campanha com sucesso.', data: campaign });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Erro ao adicionar livro à campanha.' });
  }
};


export const endCampaign = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const campaign = await Campanha.findById(id);
    if (!campaign) return res.status(404).json({ success: false, message: 'Campanha não encontrada.' });

    campaign.status = 'Encerrada';
    campaign.dataFim = new Date();
    await campaign.save();

    return res.status(200).json({ success: true, message: 'Campanha encerrada com sucesso.', data: campaign });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Erro ao encerrar campanha.' });
  }
};

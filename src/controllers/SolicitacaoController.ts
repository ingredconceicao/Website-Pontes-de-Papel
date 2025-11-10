import { Request, Response } from 'express';
import Solicitacao from '../../src/models/SolicitacaoModel';
import Book from '../../src/models/BookModel';

export const solicitarLivro = async (req: Request, res: Response) => {
  try {
    const alunoId = (req as any).user._id;
    const { id: livroId } = req.params;

 
    const livro = await Book.findById(livroId);
    if (!livro) {
      return res.status(404).json({ success: false, message: 'Livro não encontrado.' });
    }
    if (livro.status !== 'Disponível') {
      return res.status(400).json({ success: false, message: 'Livro não está disponível para solicitação.' });
    }

  
    const jaSolicitado = await Solicitacao.findOne({ livro: livroId, aluno: alunoId });
    if (jaSolicitado) {
      return res.status(400).json({ success: false, message: 'Você já solicitou este livro.' });
    }

 
    const solicitacao = await Solicitacao.create({ livro: livroId, aluno: alunoId });


    livro.status = 'Reservado';
    await livro.save();

    console.log(`📩 Novo pedido: Aluno ${alunoId} solicitou o livro ${livro.titulo}`);

    res.status(201).json({
      success: true,
      message: 'Solicitação enviada com sucesso!',
      data: solicitacao,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro ao solicitar o livro.' });
  }
};


export const getMinhasSolicitacoes = async (req: Request, res: Response) => {
  try {
    const alunoId = (req as any).user._id;
    const solicitacoes = await Solicitacao.find({ aluno: alunoId })
      .populate('livro', 'titulo autor genero condicao status')
      .sort({ createdAt: -1 });

    if (solicitacoes.length === 0) {
      return res.status(200).json({ success: true, message: 'Você ainda não fez nenhuma solicitação.', data: [] });
    }

    res.status(200).json({ success: true, data: solicitacoes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro ao buscar solicitações.' });
  }
};

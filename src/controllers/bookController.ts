import { Request, Response } from 'express';
import Book, { IBook } from '../models/BookModel';


export const getAvailableBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, autor, genero } = req.query;
    let query: any = { status: 'Disponível' };

    if (search && typeof search === 'string') {
      query.$or = [
        { titulo: { $regex: search, $options: 'i' } },
        { autor: { $regex: search, $options: 'i' } },
      ];
    }

    if (autor) query.autor = autor;
    if (genero) query.genero = genero;

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const books = await Book.find(query)
      .populate('doador', 'nome email')
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });

    const total = await Book.countDocuments(query);

    res.status(200).json({
      success: true,
      count: books.length,
      total,
      page,
      data: books,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro ao buscar o catálogo de livros.' });
  }
};


export const createBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { titulo, autor, genero, condicao, isbn } = req.body;
    const doadorId = (req as any).user._id;

    const newBook: IBook = new Book({
      titulo,
      autor,
      genero,
      condicao,
      isbn,
      doador: doadorId,
      status: 'Disponível',
    });

    const book = await newBook.save();

    res.status(201).json({
      success: true,
      data: book,
      message: 'Livro cadastrado com sucesso!',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro ao cadastrar o livro.' });
  }
};


export const updateBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookId = req.params.id;
    const updates = req.body;
    const userId = (req as any).user._id;

    const book = await Book.findOne({ _id: bookId, doador: userId });
    if (!book) {
      res.status(404).json({ success: false, message: 'Livro não encontrado ou sem permissão' });
      return;
    }

    Object.assign(book, updates);
    const updatedBook = await book.save();

    res.status(200).json({ success: true, data: updatedBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro ao atualizar o livro' });
  }
};


export const deleteBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookId = req.params.id;
    const userId = (req as any).user._id;

    const deleted = await Book.findOneAndDelete({ _id: bookId, doador: userId });
    if (!deleted) {
      res.status(404).json({ success: false, message: 'Livro não encontrado ou sem permissão' });
      return;
    }

    res.status(200).json({ success: true, message: 'Livro deletado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro ao deletar o livro' });
  }
};


export const getMyDonations = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user._id;
    const books = await Book.find({ doador: userId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: books.length, data: books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro ao buscar suas doações' });
  }
};

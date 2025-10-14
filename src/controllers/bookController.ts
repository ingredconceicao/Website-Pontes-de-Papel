import { Request, Response } from "express";
import Book, { IBook } from "../../src/models/BookModel";


export const createBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { titulo, autor, condicao } = req.body;

    const doadorId = (req as any).user?._id;

    const newBook: IBook = new Book({
      titulo,
      autor,
      condicao,
      doador: doadorId,
      status: "Disponível",
    });

    const book = await newBook.save();

    res.status(201).json({
      success: true,
      data: book,
      message: "Livro cadastrado com sucesso!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Erro ao cadastrar o livro.",
    });
  }
};


export const getAvailableBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, autor, genero } = req.query;
    let query: any = { status: "Disponível" };

    
    if (search && typeof search === "string") {
      query.$or = [
        { titulo: { $regex: search, $options: "i" } },
        { autor: { $regex: search, $options: "i" } },
      ];
    }

  
    if (autor) query.autor = autor;
    if (genero) query.genero = genero;

   
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const books = await Book.find(query)
      .populate("doador", "nome email")
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
    res.status(500).json({
      success: false,
      message: "Erro ao buscar o catálogo de livros.",
    });
  }
};

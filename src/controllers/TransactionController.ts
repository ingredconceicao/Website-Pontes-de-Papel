import { Request, Response } from 'express';
import Transaction from '../../src/models/Transacitons';
import Book from '../../src/models/BookModel';


export const requestBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const { livroId } = req.body;
        const alunoId = (req as any).user._id;

        const book = await Book.findById(livroId);

       
        if (!book) {
            res.status(404).json({ success: false, message: 'Livro não encontrado.' });
            return;
        }

        if (book.status !== 'Disponível') {
            res.status(400).json({ success: false, message: 'Este livro já foi reservado ou entregue.' });
            return;
        }

      
        const newTransaction = new Transaction({
            aluno: alunoId,
            livro: livroId,
            doador: book.doador,
            status_logistica: 'Aguardando Retirada'
        });

        
        book.status = 'Reservado';
        await book.save();
        await newTransaction.save();
        
        res.status(201).json({ 
            success: true, 
            data: newTransaction,
            message: 'Livro solicitado com sucesso. Aguardando contato do doador.' 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: 'Erro ao solicitar o livro.' 
        });
    }
};
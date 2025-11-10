import express from 'express';
import { solicitarLivro, getMinhasSolicitacoes } from '../controllers/SolicitacaoController';
import { protect } from '../middlewares/authMiddleware';
import { restrictTo } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/:id/request', protect, restrictTo('aluno'), solicitarLivro);
router.get('/me', protect, restrictTo('aluno'), getMinhasSolicitacoes);

export default router;

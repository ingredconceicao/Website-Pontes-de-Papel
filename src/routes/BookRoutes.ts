import { Router } from 'express';
import { 
  createBook, 
  getAvailableBooks,
  updateBook,
  deleteBook,
  getMyDonations,
  getRecentBooks,
  getDeliveredBooks
} from '../controllers/bookController';
import { protect, restrictTo } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', getAvailableBooks);

// Rotas que o frontend exige
router.get('/recent', getRecentBooks);
router.get('/delivered', getDeliveredBooks);

router.post('/', protect, restrictTo('doador','aluno'), createBook);

router.get('/mine', protect, restrictTo('doador','aluno'), getMyDonations);

router.route('/:id')
  .put(protect, restrictTo('doador','aluno'), updateBook)
  .delete(protect, restrictTo('doador','aluno'), deleteBook);

export default router;

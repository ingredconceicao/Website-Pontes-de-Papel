import { Router } from 'express';
import { 
  createBook, 
  getAvailableBooks,
  updateBook,
  deleteBook,
  getMyDonations
} from '../controllers/bookController';
import { protect, restrictTo } from '../middlewares/authMiddleware';

const router = Router();


router.get('/', getAvailableBooks);


router.post('/', protect, restrictTo('doador','aluno'), createBook);
router.get('/mine', protect, restrictTo('doador','aluno'), getMyDonations);

router.route('/:id')
  .put(protect, restrictTo('doador','aluno'), updateBook)
  .delete(protect, restrictTo('doador','aluno'), deleteBook);

export default router;



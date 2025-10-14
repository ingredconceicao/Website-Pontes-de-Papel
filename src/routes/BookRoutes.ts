import { Router } from 'express';
import { 
  createBook, 
  getAvailableBooks, 
} from '../../src/controllers/bookController';


const router = Router();

router.get('/', getAvailableBooks);

router.post('/', createBook);

router.route('/:id')


export default router;

import { Router } from 'express';
import BookController from '../controllers/BookController';
import BookValidator from '../validations/BookValidator';

const router = Router();

router.get('/', BookController.listBooks);
router.get('/:bookId', BookValidator.getBook(), BookController.getBook);
router.post('/', BookValidator.createBook(), BookController.createBook);

export default router;

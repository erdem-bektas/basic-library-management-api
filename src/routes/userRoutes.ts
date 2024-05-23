import { Router } from 'express';
import UserController from '../controllers/UserController';
import UserValidator from '../validations/UserValidator';

const router = Router();

router.get('/', UserController.listUsers);
router.get('/:userId', UserValidator.getUser(), UserController.getUser);
router.post('/', UserValidator.createUser(), UserController.createUser);
router.post('/:userId/borrow/:bookId', UserValidator.borrowBook(), UserController.borrowBook);
router.post('/:userId/return/:bookId', UserValidator.returnBook(), UserController.returnBook);

export default router;

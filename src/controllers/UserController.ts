import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import UserService from '../services/UserService';
import { toUserDTO } from '../mappers/userMapper';
import ErrorHandler from '../middlewares/ErrorHandler';

class UserController {
  constructor(private userService: UserService) { }

  public listUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userService.listUsers();
      res.json(users);
    } catch (error) {
      ErrorHandler.handleCustomError(res, error, 'Error fetching users');
    }
  };

  public getUser = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    try {
      const userId = parseInt(req.params.userId, 10);
      const user = await this.userService.getUser(userId);

      if (user) {
        const response = toUserDTO(user);
        res.json(response);
      } else {
        res.status(404).send('User not found');
      }
    } catch (error) {
      ErrorHandler.handleCustomError(res, error, 'Error fetching user');
    }
  };

  public createUser = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    try {
      const { name } = req.body;
      await this.userService.createUser(name);
      res.status(201).send();
    } catch (error) {
      ErrorHandler.handleCustomError(res, error, 'Error creating user');
    }
  };

  public borrowBook = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    try {
      const bookId = parseInt(req.params.bookId, 10);
      const userId = parseInt(req.params.userId, 10);

      await this.userService.borrowBook(bookId, userId);
      res.status(200).send();
    } catch (error) {
      ErrorHandler.handleCustomError(res, error, 'Error borrowing book');
    }
  };

  public returnBook = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    try {
      const bookId = parseInt(req.params.bookId, 10);
      const userId = parseInt(req.params.userId, 10);
      const rating = req.body.rating;

      await this.userService.returnBook(bookId, userId, rating);
      res.status(200).send();
    } catch (error) {
      ErrorHandler.handleCustomError(res, error, 'Error returning book');
    }
  };

}

const userService = new UserService();
const userController = new UserController(userService);

export default userController;

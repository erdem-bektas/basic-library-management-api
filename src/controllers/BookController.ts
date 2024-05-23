import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import BookService from '../services/BookService';
import { toBookDTO } from '../mappers/bookMapper';
import ErrorHandler from '../middlewares/ErrorHandler';

class BookController {
  constructor(private bookService: BookService) { }

  public listBooks = async (req: Request, res: Response): Promise<void> => {
    try {
      const books = await this.bookService.listBooks();
      res.json(books);
    } catch (error) {
      ErrorHandler.handleCustomError(res, error, 'Error fetching books');
    }
  };

  public getBook = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    try {
      const bookId = parseInt(req.params.bookId, 10);
      const book = await this.bookService.getBook(bookId);

      if (book) {
        const response = toBookDTO(book);
        res.json(response);
      } else {
        res.status(404).send('Book not found');
      }
    } catch (error) {
      ErrorHandler.handleCustomError(res, error, 'Error fetching book');
    }
  };

  public createBook = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    try {
      const { name } = req.body;
      await this.bookService.createBook(name);
      res.status(201).send();
    } catch (error) {
      ErrorHandler.handleCustomError(res, error, 'Error creating book');
    }
  };
}

const bookService = new BookService();
const bookController = new BookController(bookService);

export default bookController;

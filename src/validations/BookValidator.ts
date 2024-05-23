import { body, param } from 'express-validator';
import AppDataSource from '../ormconfig';
import Book from '../entities/Book';

class BookValidator {
    public static createBook() {
        return [
            body('name')
                .isString()
                .isLength({ min: 3 })
                .withMessage('Name must be at least 3 characters long and contain only letters and numbers')
                .custom(async (name) => {
                    const bookRepository = AppDataSource.getRepository(Book);
                    const existingBook = await bookRepository.findOneBy({ name });
                    if (existingBook) {
                        return Promise.reject('Book name already exists');
                    }
                })
        ];
    }

    public static getBook() {
        return [param('bookId').isInt().withMessage('Book ID must be an integer')];
    }
}

export default BookValidator;

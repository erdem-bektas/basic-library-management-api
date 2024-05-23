import { body, param } from 'express-validator';

class UserValidator {
    public static createUser() {
        return [body('name').isString().notEmpty().withMessage('Name is required')];
    }

    public static getUser() {
        return [param('userId').isInt().withMessage('User ID must be an integer')];
    }

    public static borrowBook() {
        return [
            param('bookId').isInt().withMessage('Book ID must be an integer'),
            param('userId').isInt().withMessage('User ID must be an integer').notEmpty().withMessage('User ID cannot be empty')
        ];
    }

    public static returnBook() {
        return [
            param('bookId').isInt().withMessage('Book ID must be an integer'),
            param('userId').isInt().withMessage('User ID must be an integer').notEmpty().withMessage('User ID cannot be empty'),
            body('rating').optional().isFloat({ min: 0, max: 10 }).withMessage('Rating must be between 0 and 10')
        ];
    }
}

export default UserValidator;

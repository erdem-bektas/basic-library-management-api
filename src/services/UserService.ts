import { IsNull } from 'typeorm';
import AppDataSource from '../ormconfig';
import User from '../entities/User';
import Borrow from '../entities/Borrow';
import Book from '../entities/Book';

class UserService {
    private userRepository = AppDataSource.getRepository(User);
    private borrowRepository = AppDataSource.getRepository(Borrow);
    private bookRepository = AppDataSource.getRepository(Book);

    public async listUsers(): Promise<User[]> {
        return this.userRepository.find({
            select: ["id", "name"]
        });
    }

    public async getUser(userId: number): Promise<User | null> {
        return this.userRepository.findOne({
            where: { id: userId },
            relations: ['borrows', 'borrows.book']
        });
    }

    public async createUser(name: string): Promise<void> {
        const newUser = this.userRepository.create({ name });
        await this.userRepository.save(newUser);
    }

    public async borrowBook(bookId: number, userId: number): Promise<void> {
        const book = await this.findBook(bookId);
        const user = await this.findUser(userId);

        const existingBorrow = await this.borrowRepository.findOneBy({ book: { id: bookId }, returnDate: IsNull() });
        if (existingBorrow) {
            throw new Error('Book is already borrowed');
        }

        const newBorrow = this.borrowRepository.create({ book, user, borrowDate: new Date() });
        await this.borrowRepository.save(newBorrow);
    }

    public async returnBook(bookId: number, userId: number, rating?: number): Promise<void> {
        const borrow = await this.borrowRepository.findOneBy({
            book: { id: bookId },
            user: { id: userId },
            returnDate: IsNull()
        });

        if (!borrow) {
            throw new Error('Borrow record not found');
        }

        borrow.returnDate = new Date();
        if (rating !== undefined) {
            await this.updateBookRating(bookId, rating);
            borrow.rating = rating;
        }

        await this.borrowRepository.save(borrow);
    }

    private async findBook(bookId: number): Promise<Book> {
        const book = await this.bookRepository.findOneBy({ id: bookId });
        if (!book) {
            throw new Error('Book not found');
        }
        return book;
    }

    private async findUser(userId: number): Promise<User> {
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    private async updateBookRating(bookId: number, rating: number): Promise<void> {
        const book = await this.bookRepository.findOneBy({ id: bookId });
        if (book) {
            if (book.ratingCount === 0 && book.averageRating === -1) {
                book.averageRating = rating;
            }
            book.ratingCount += 1;
            const totalRating = (book.averageRating * (book.ratingCount - 1)) + rating;
            book.averageRating = totalRating / book.ratingCount;
            await this.bookRepository.save(book);
        }
    }
}

export default UserService;

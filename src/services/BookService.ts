import AppDataSource from '../ormconfig';
import Book from '../entities/Book';
import Borrow from '../entities/Borrow';
import User from '../entities/User';

class BookService {
    private bookRepository = AppDataSource.getRepository(Book);
    private userRepository = AppDataSource.getRepository(User);
    private borrowRepository = AppDataSource.getRepository(Borrow);

    public async listBooks(): Promise<Book[]> {
        return this.bookRepository.find({
            select: ['id', 'name'],
        });
    }

    public async getBook(bookId: number): Promise<Book | null> {
        return this.bookRepository.findOneBy({ id: bookId });
    }

    public async createBook(name: string): Promise<void> {
        const newBook = this.bookRepository.create({ name });
        await this.bookRepository.save(newBook);
    }
}

export default BookService;

import Book from "../entities/Book";
import BookDTO from "../dtos/BookDTO";

export const toBookDTO = (book: Book): BookDTO => {
    const bookDTO = new BookDTO();
    bookDTO.id = book.id;
    bookDTO.name = book.name;
    bookDTO.averageRating = parseFloat(book.averageRating.toFixed(2));

    return bookDTO;
} 

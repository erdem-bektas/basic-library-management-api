import User from '../entities/User';
import UserDTO from '../dtos/UserDTO';
import BorrowDTO from '../dtos/BorrowDTO';

export const toUserDTO = (user: User): UserDTO => {
    const pastBorrows: BorrowDTO[] = user.borrows
        ?.filter(borrow => borrow.rating !== null && borrow.returnDate !== null)
        .map(borrow => ({
            name: borrow.book.name,
            userScore: borrow.rating
        })) || [];

    const presentBorrows: BorrowDTO[] = user.borrows
        ?.filter(borrow => borrow.rating === null && borrow.returnDate === null)
        .map(borrow => ({
            name: borrow.book.name
        })) || [];

    return {
        id: user.id,
        name: user.name,
        books: {
            past: pastBorrows,
            present: presentBorrows
        }
    };
};

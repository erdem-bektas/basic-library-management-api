export default class UserDTO {
    id!: number;
    name!: string;
    books!: {
        past: { name: string; userScore?: number }[];
        present: { name: string }[];
    };
}
interface User {
    user_id: string;
    genres: string[];
    instruments: string[];
    spotify?: string;
    description?: string;
    name: string;
    surname: string;
    likes: string[];
    matches: string[];
}
export default User;
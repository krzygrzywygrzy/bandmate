import Message from "./Message";
import User from "./User";

interface Chat {
  id: number;
  user: User;
  messages: Message[];
}

export default Chat;

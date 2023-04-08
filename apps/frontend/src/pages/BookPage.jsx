import { useParams } from "react-router-dom";
import { bookdata } from "@/utils/bookdata";

export default function BookPage() {
  const { bookid } = useParams();

  // Find the room data 
  const book = bookdata.find((book) => book.bookid === bookid);

  return (
    <div>
      <h1>{book.bookname}</h1>
      <p>Room ID: {book.bookid}</p>
      <p>Room Size: {book.author}</p>
      <p>Room Status: {book.story}</p>
    </div>
  );
}
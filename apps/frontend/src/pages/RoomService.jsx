import { useParams } from "react-router-dom";
import { roomdata } from "@/utils/roomdata";

export default function RoomService() {
  const { roomid } = useParams();

  // Find the room data 
  const room = roomdata.find((room) => room.roomid === roomid);

  return (
    <div>
      <h1>{room.roomname}</h1>
      <p>Room ID: {room.roomid}</p>
      <p>Room Size: {room.size}</p>
      <p>Room Status: {room.status}</p>
    </div>
  );
}
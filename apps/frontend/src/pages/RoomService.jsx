import { useParams } from "react-router-dom";
import { roomdata } from "@/utils/roomdata";
import NavbarStatic from "@/components/navbarStatic";

export default function RoomService() {
  const { roomid } = useParams();

  // Find the room data 
  const room = roomdata.find((room) => room.roomid === roomid);

  return (
    <>
     <NavbarStatic
        bgcolor = 'bg-white hover:drop-shadow-md' 
        textcolor = 'text-black'
      />
    <div>
      <h1>{room.roomname}</h1>
      <p>Room ID: {room.roomid}</p>
      <p>Room Size: {room.size}</p>
      <p>Room Status: {room.status}</p>
    </div>
    </>

  );
}
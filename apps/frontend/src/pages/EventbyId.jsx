import { useParams } from "react-router-dom";
import { eventdata } from "@/utils/eventdata";

export default function EventbyId() {
  const { eventid } = useParams();

  // Find the event data
  const event = eventdata.find((event) => event.eventid === eventid);

  return (
    <div>
      <h1>{event.location}</h1>
    </div>
  );
}

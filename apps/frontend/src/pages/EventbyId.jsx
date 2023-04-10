import { useParams } from "react-router-dom";
import { eventdata } from "@/utils/eventdata";
import { useState } from 'react';
import NavbarStatic from "@/components/navbarStatic";
import { Link } from "react-router-dom";

export default function EventbyId() {
  const { eventid } = useParams();

  // Find the event data
  const event = eventdata.find((event) => event.eventid === eventid);

  const imgevent = ' max-w-[60%] h-full';

  const meetingTime = new Date(event.meetingtime);

  // format the date using the toLocaleString() method
  const formattedMeetingTime = meetingTime.toLocaleString("th-TH", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });

  const [participants, setParticipants] = useState(event.participant);

  // Split the participant string into an array of names
  const participantArray = participants.split(',');

  // Count the number of participants
  const numParticipants = participantArray.length;

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div >
      <NavbarStatic
        bgcolor='bg-white hover:drop-shadow-md'
        textcolor='text-black'
      />
      <div className="w-[80%] mx-[10%] h-[350px] bg-whitebrown mt-[10vh] flex justify-center items-center">
        <img src={'../'+ event.image} className={imgevent} />
      </div>
      
      <div className="mx-[10%] pr-[20%]">
        <p className='font-semibold font-kanit text-orange-600 text-lg text-left mt-6 ml-4'>{formattedMeetingTime}</p>
        <p className='font-semibold font-kanit text-[#454545] text-3xl text-left mt-2 ml-4'>{event.eventname}</p>
        <p className='font-normal font-kanit text-[#454545] text-lg text-left mt-1 ml-4'>{event.category}</p>
        <Link to={`*`}>
          <button
            className="absolute right-[15%] -translate-y-20 w-[80px] p-[10px] h-auto rounded-full bg-[#0092BF]  hover:bg-[#007396] font-semibold font-poppins text-white my-[20px] ease-out duration-300"
          >join
          </button>
        </Link>
      </div>
      <hr className=" border-2 mt-5 mx-[10%]" />
      <div className="mx-[10%] pl-10 pr-[5%] mb-[10%]">
        <h1 className=" font-medium font-kanit text-[#454545] text-2xl text-left mt-5">รายละเอียด</h1>
        <div className="pl-[5%]">
          <span>
            <p className='font-normal font-kanit text-[#454545] text-lg text-left mt-4'>มีจำนวนคนเข้าร่วมกิจกรรม {numParticipants} คน</p>
            <button
              className="absolute left-[40%] -translate-y-[48px] hover:underline hover:text-sky-700 font-normal font-kanit text-sky-600 my-[20px] ease-out duration-300 text-lg"
              onClick={openModal}>ดูทั้งหมด
            </button>
          </span>
          {modalIsOpen && (
            <div className="fixed flex justify-center items-center w-full h-full top-0 left-0 z-50 bg-black/50">
              <div className="flex flex-wrap rounded-lg shadow-lg shadow-gray-700 w-[62%] min-h-[450px] max-h-[80%] bg-white">
                <span className="absolute right-[20%] text-3xl cursor-pointer" onClick={closeModal}>
                  &times;
                </span>
                  <div className="text-center justify-center mx-[10%]  w-[80%] p-[16px]">
                    <h1 className="font-medium font-kanit text-[#454545] text-2xl my-5 text-center">รายชื่อผู้เข้าร่วม</h1>
                    <div className=" overflow-y-scroll font-light text-lg font-kanit max-h-[32%]">
                    <ul>
                      {participantArray.map((name, index) => (
                        <li key={index}>{name.trim()}</li>
                      ))}
                    </ul>
                    </div>
                  </div>
              </div>
            </div>
          )}
          <p className='font-normal font-kanit text-[#454545] text-lg text-left mt-1'>จัดกิจกรรมโดย {event.host} </p>
          <p className='font-normal font-kanit text-[#454545] text-lg text-left mt-1'>สถานที่จัดกิจกรรม {event.location} </p>
          <hr className=" border-1 my-4" />
          <p className='font-normal font-kanit text-[#454545] text-lg text-left mt-1'>{event.eventdes} </p>
        </div>
      </div>
      <footer>
        <div className="flex flex-col w-full h-[150px] bg-[#8D4120] columns-2 max-sm:h-[120px]">
          <div className="mt-6 ml-40">
            <p className="font-semi-bold font-poppins text-white text-lg max-sm:text-base">CONTACT US</p>
            <div className="columns-2">
              <p className="font-regular font-roboto text-white text-base max-sm:text-xs">
                Tel. 02-423-5522 {<br />}
                Email : kmutt_library@kmutt.ac.th
              </p>
              <p className="font-regular font-kanit text-white text-base max-sm:text-xs">
                Location : 91 ถนน พุทธบูชา {<br />}
                แขวงบางมด เขตทุ่งครุ {<br />}
                กรุงเทพมหานคร 10140
              </p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

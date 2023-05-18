import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import NavbarStatic from "@/components/NavbarStatic";
import { Link } from "react-router-dom";
import Footer from '@/components/Footer';
import { fetch } from '@/utils/Fetch';

export default function EventbyId() {
  const { eventid } = useParams();

  const [event, setEvent] = useState(null);
  const [participants, setParticipants] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await fetch.get(`events/${eventid}`);
      setEvent(response.data);
    }

    const fetchParticipants = async () => {
      const response = await fetch.get(`events/${eventid}/member`)
      setParticipants(response.data)
    }

    fetchEvent();
    fetchParticipants();
  }, []);

  const imgevent = ' max-w-[60%] h-full';

  const meetingTime = new Date(event?.meetingTime || new Date());

  const meetingEndTime = new Date(event?.endTime || new Date());

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

  // format the date using the toLocaleString() method
  const formattedMeetingEndTime = meetingEndTime.toLocaleString("th-TH", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  if (!event || !participants) {
    return (
      <>
        <div className="min-h-screen">
          <NavbarStatic
            bgcolor='bg-white hover:drop-shadow-md'
            textcolor='text-black'
          />
          <Footer />
        </div>
      </>
    );
  }

  return (
    <div >
      <NavbarStatic
        bgcolor='bg-white hover:drop-shadow-md'
        textcolor='text-black'
      />
      <div className="w-[80%] mx-[10%] h-[350px] bg-whitebrown mt-[10vh] flex justify-center items-center">
        <img src={event.image} className={imgevent} />
      </div>

      <div className="mx-[10%] pr-[20%]">
        <p className='font-semibold font-kanit text-orange-600 text-lg text-left mt-6 ml-4'>{formattedMeetingTime} - {formattedMeetingEndTime}</p>
        <p className='font-semibold font-kanit text-[#454545] text-3xl text-left mt-2 ml-4'>{event.name}</p>
        <p className='font-normal font-kanit text-[#454545] text-lg text-left mt-1 ml-4'>{event.categories.map(cat => cat.name).join(' / ')}</p>
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
            <p className='font-normal font-kanit text-[#454545] text-lg text-left mt-4'>มีจำนวนคนเข้าร่วมกิจกรรม {participants.length} คน</p>
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
                      {participants.map((data, index) => (
                        <li key={index}>{data.firstname.trim()} {data.lastname.trim()} {data.branch.trim()}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          <p className='font-normal font-kanit text-[#454545] text-lg text-left mt-1'>สถานที่จัดกิจกรรม {event.location} </p>
          <hr className=" border-1 my-4" />
          <p className='font-normal font-kanit text-[#454545] text-lg text-left mt-1'>{event.description} </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

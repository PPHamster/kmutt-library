import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetch } from '@/utils/Fetch';
import Event from "@/components/Eventlist";

export default function EventComponent() {

  const [events, setEvents] = useState(null);

  useEffect(() => {
    const fetchData = async() => {
      const response = await fetch.get('/events');
      setEvents(response.data);
    }

    fetchData();
  }, []);

  if (!events) {
    return (
      <div className="flex flex-row w-full h-[700px] bg-[#eebfbf] mt-[9rem]"></div>
    );
  }

  const event = events[0];

  return (
    <>
      <div className="flex flex-row w-full h-[700px] bg-[#eebfbf] mt-[9rem]">
        <div className="ml-[12vw] mt-[9rem]">
          <h1 className='font-bold font-poppins text-5xl text-white drop-shadow-sm ml-[30px]'>Event</h1>
          <div className='h-[550px] w-[35vw] font-normal font-kanit text-xl whitespace-normal text-white drop-shadow-sm mt-8'>
            KMUTT Event ในมหาลัยของเรามีระบบการจัดกิจกรรมภายในสำนักหนังสือ โดยรายละเอียดกิจกรรมขึ้นอยู่กับผู้จัดตั้งโดยมี ตัวอย่างเช่น กิจกรรมชมรมหนังสือ หรือกิจกรรม โต้วาที
          </div>
        </div>
        <div className="ml-[20vw] mt-[4rem] flex-col flex">
          <div>
            {event ? <Event
              id={event.id}
              image={event.image}
              name={event.name}
              categories={event.categories}
              description={event.description}
              location={event.location}
              meetingTime={event.meetingTime}
              endTime={event.endTime}
            /> : null}
          </div>
          <div className="ml-[4vw]">
            <Link to='/event'>
              <div className='w-[120px] h-[40px] ml-[20px] text-center pt-[5px] rounded-full border-transparent hover:border-[#5c4b4b] border-2 hover:bg-[#5c4b4b] ease-out duration-300 bg-[#ab8e8e]'>
                <p className="font-kanit font-regular text-white">ดูกิจกรรมอื่น</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
};

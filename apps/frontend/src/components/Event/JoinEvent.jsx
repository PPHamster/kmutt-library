import React, { useState } from 'react';
import Event from '@/components/Eventlist'
import { eventdata } from '@/utils/eventdata';
import { Link } from 'react-router-dom';

export default function JoinEvent() {

    const [selectedEvent, setSelectedEvent] = useState(false)
    const handleEventClick = (event) => {
        setSelectedEvent(event);
    };

    return (
        <>
            <div className="w-full h-[700px] mt-[5rem] pt-[2rem] px-[8rem] max-sm:px-[20px] max-lg:px-[4rem]">
                <div className="w-full ">
                    <Link to={'/event/create'}>
                        <button
                            className="absolute right-0 mr-[10%] w-auto h-auto py-[10px] px-[20px] bg-[#0092BF] text-white hover:bg-[#007396] rounded-full border-2 font-regular font-poppins my-[20px] ease-out duration-300"
                        >Create Event</button>
                    </Link>
                    <h1 className='font-bold font-kanit text-3xl text-[#454545] ml-[30px]'>เข้าร่วมกิจกรรม</h1>
                    <div className="w-full h-auto m-auto drop-shadow-md mt-10 ">
                        {eventdata.map((data) => {
                            return (
                                <Event
                                    eventid={data.eventid}
                                    eventimage={data.image}
                                    eventname={data.eventname}
                                    category={data.category}
                                    host={data.host}
                                    eventdes={data.eventdes}
                                    location={data.location}
                                    meetingtime={data.meetingtime}
                                    endtime={data.endtime}
                                    onClick={() => handleEventClick(data)}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

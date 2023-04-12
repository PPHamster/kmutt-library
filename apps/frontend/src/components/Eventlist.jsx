import React from 'react';
import { Link } from "react-router-dom";

export default function Event(props) {

    const infoEvent = 'max-h-[250px] max-w-[250px] rounded-lg object-scale-down mt-[20px] cursor-pointer';

    const meetingTime = new Date(props.meetingtime);

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

    return (
        // row
        <div className='mx-[50px] -my-[16px] after:content-[""] after:table'>
            {/* column */}
            <div className='flex justify-center items-center w-2/4 float-left max-sm:w-full max-lg:w-2/4 max-lg:p-2'>
                {/* content */}

                <div className='bg-white rounded-lg p-[20px] w-[350px] min-h-[480px] my-8 max-sm:my-2 max-lg:my-4 cursor-pointer  hover:drop-shadow-lg'>
                    <Link to={`/event/${props.eventid}`}>
                        <div className='w-[250px] h-[250px] flex justify-center items-center mx-7'>

                            <img src={props.eventimage} className={infoEvent} />
                        </div>
                        <p className='font-semibold font-kanit text-orange-600 text-sm text-left mt-6'>{formattedMeetingTime}</p>

                        <p className='font-semibold font-kanit text-[#454545] text-lg text-left mt-0 cursor-pointer'>{props.eventname}</p>

                        <p className='font-normal font-kanit text-[#454545] text-sm text-left mt-0'>{props.location}</p>
                        <Link to={`/event/${props.eventid}`}>
                            <button
                                className="w-[110px] h-[30px] mx-[99px] rounded-full bg-white border-2 hover:bg-gray-200 font-regular font-poppins text-[#696969] my-[20px] ease-out duration-300"
                            >see more</button>
                        </Link>
                    </Link>
                </div>

            </div>
        </div>
    )
}

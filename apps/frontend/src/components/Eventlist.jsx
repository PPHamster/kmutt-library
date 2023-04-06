import React, { useState } from 'react'

export default function Event(props) {

    const infoEvent = 'max-h-[250px] max-w-[250px] rounded-lg object-scale-down mt-[20px]';

    return (
        // row
        <div className='mx-[50px] -my-[16px] after:content-[""] after:table'>
             {/* column */}
            <div className='flex justify-center items-center w-2/4 float-left max-sm:w-full max-lg:w-2/4 max-lg:p-2'>
                {/* content */}
                <div className='bg-white rounded-lg p-[20px] w-[350px] h-[480px] my-8 max-sm:my-2 max-lg:my-4'>
                    <div className='w-[250px] h-[250px] flex justify-center items-center mx-7'>
                    <img src={props.eventimage} className={infoEvent} />
                    </div>
                    <p className='font-semibold font-kanit text-[#454545] text-lg text-center mt-4'>{props.eventname}</p>
                    <p className='font-normal font-kanit text-[#454545] text-sm text-center mt-4'>{props.category}</p>
                    <p className='font-normal font-kanit text-[#454545] text-sm text-center mt-2'>สถานที่ : {props.location}</p>
                    <button
                        className="w-[110px] h-[30px] mx-[99px] rounded-full bg-white border-2 hover:bg-gray-200 font-regular font-poppins text-[#696969] my-[20px] ease-out duration-300"
                        onClick={props.onClick}
                    >see more</button>
                </div>
            </div>
        </div>
    )
}

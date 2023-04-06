import React, { useState } from 'react'

export default function Event(props) {

    const [OpenPopup, SetOpenPopup] = useState(false)
    const infoEvent = 'max-h-[250px] max-w-[250px] rounded-lg';

    return (
        <div className='-mx-[16px] my-[8px] p-[8px] after: content-[""] table clear-both'>
            <div className='float-left w-1/4 p-[8px] sm:w-full lg:w-2/4'>
                <div className='bg-[#D9D9D9] rounded-lg p-[10px] w-full '>
                    <img src={props.eventimage} className={infoEvent} />
                    <p className='font-bold font-roboto text-[#454545] text-lg text-center'>{props.eventname}</p>
                    <p className='font-normal font-roboto text-[#454545] text-sm text-center'>{props.eventdes}</p>
                    <p className='font-normal font-roboto text-[#454545] text-sm text-center'>{props.location}</p>
                    <button
                        className="w-auto h-auto bg-cyan-500 hover:bg-cyan-700 rounded-lg font-bold font-poppins 
                        text-white text-xl my-[20px] ease-out duration-300"
                        onClick={props.onClick}
                    >see more</button>
                </div>
            </div>
        </div>
    )
}

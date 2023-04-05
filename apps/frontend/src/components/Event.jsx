import React, { useState } from 'react'

export default function Event(props) {
  
    const [OpenPopup, SetOpenPopup] = useState(false)
    const infoEvent = 'h-3/4 w-2/4 round-lg object-scale-down';

    return (
        <div className='box-content h-[450px] w-2/4 pr-[25px] pl-[25px] '>
            <section className='h-[400px] w-full bg-[#D9D9D9] rounded-lg p-[25px] select-none mr-10'>
                <img src={props.image} className={infoEvent}/>
                <p className='font-bold font-roboto text-[#454545] text-lg text-center'>{props.eventname}</p>
                <button
                    className="w-[135px] h-[40px] ml-[20%] rounded-md bg-cyan-500 hover:bg-cyan-700 font-bold font-poppins text-white text-xl my-[20px] ease-out duration-300"
                    onClick={props.onClick}
                    >see more</button>
            </section>
        </div>
  )
}

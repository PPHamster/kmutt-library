import React from 'react';
import { Link } from "react-router-dom";

export default function Room(props) {
    let imageStyle = 'h-[170px] w-[270px] rounded-sm object-scale-down';
    let textstatus = 'hidden'
    if((props.status) !== 'open') 
    {
        imageStyle = 'h-[170px] w-[270px] rounded-sm object-scale-down grayscale';
        textstatus = 'text-orange-600 font-roboto text-base mt-0.5 ml-5'
    }
    // image styles
    
    return (
        <div className='box-content h-[240px] w-[560px] pr-[25px] pl-[25px] bg-transparent'>
            <section className='h-[220px] w-[550px] bg-white rounded-[0.55rem] p-[25px] select-none mr-10 drop-shadow-md hover:drop-shadow-lg'>
                <div className='flex flex-row'>
                    <img src={props.image} className={imageStyle} alt='book cover' draggable="false" onClick={props.onClick} />
                    <div className='flex flex-col ml-4 mr-4'>
                        <p className='font-regular font-kanit text-[#696969] whitespace-normal mt-2 ml-7 text-md'>ห้อง</p>
                        <p className='w-[200px] max-h-[67px] font-bold font-roboto text-[#696969] whitespace-normal mt-0.5 text-lg text-center '>{props.roomname}</p>
                        <p className={textstatus}>{props.status}</p>
                        <Link to={`/service/room/${props.roomid}`}>                        
                        <button
                            className="w-[110px] h-[30px] ml-[45px] rounded-full bg-white border-2 hover:bg-gray-200 font-regular font-poppins text-[#696969] text-md mt-[55px] ease-out duration-300"
                            >see more
                        </button> 
                        </Link>

                    </div>                    
                </div>


            </section>
        </div>
    )
}
import React , {useState} from 'react';

export default function Book(props) {
    
    // image styles
    const imageStyle = 'h-[300px] w-[200px] rounded-lg object-scale-down';
    return (
        <div className='box-content h-[495px] w-[275px] pr-[25px] pl-[25px] bg-transparent'>
            <section className='h-[475px] w-[275px] bg-white rounded-[0.55rem] p-[37.5px] select-none mr-10 drop-shadow-md'>
                <img src={props.image} className={imageStyle}/>
                <div className='w-[200px] h-[50px] font-bold font-roboto text-[#696969] whitespace-normal mt-2 text-lg text-center'>{props.bookname}</div>
                <button
                    className="w-[110px] h-[30px] ml-[45px] rounded-full bg-white border-2 hover:bg-gray-200 font-regular font-poppins text-[#696969] text-md my-[20px] ease-out duration-300"
                    onClick={props.onClick}
                    >see more</button>
            </section>
        </div>
    )
}
import React from 'react';

export default function Book(props) {
    // image styles
    const imageStyle = 'h-[300px] w-[200px] rounded-lg object-scale-down';
    return (
        <div className='box-content h-[480px] w-[225px] pr-[25px] pl-[25px] bg-transparent'>
            <section className='h-[455px] w-[225px] bg-white rounded-[0.55rem] p-[17.5px] select-none mr-10 drop-shadow-md hover:drop-shadow-lg'>
                <img src={props.image} className={imageStyle} alt='book cover' draggable="false" onClick={props.onClick} />
                <p className='w-[190 px] h-[67px] font-bold font-roboto text-[#696969] whitespace-normal mt-2 text-base leading-[22px] overflow-hidden text-ellipsis text-center'>{props.title}</p>             
                <button
                    className="w-[110px] h-[30px] ml-[44px] rounded-full bg-white border-2 hover:bg-gray-200 font-regular font-poppins text-[#696969] text-md mt-[16px] ease-out duration-300"
                    onClick={props.onClick}
                    >see more
                </button>
            </section>
        </div>
    )
}
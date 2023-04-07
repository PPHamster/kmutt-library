import React from "react";

export default function Eventpopup(props) {
    const imageStyle = 'max-h-[260px] max-w-[225px] rounded-lg object-scale-down max-lg:w-[60%] max-sm:max-h-[220px]';
    const textStyle = 'text-base font-kanit text-[#696969] mt-3  max-lg:mt-1 max-lg:text-sm';
    const textStyle2 = 'text-base font-kanit text-[#696969] mt-3 mb-3 max-lg:mt-1 max-lg:text-sm';
    if (!(props.open)) return null
    return (
        <>
            <div className="fixed flex justify-center items-center  top-0 left-0 right-0 bottom-0 h-screen bg-black/50 z-[40]">
                {/* // row */}
                <div className="flex flex-wrap w-[62%] min-h-[60%] max-h-[75%] rounded-lg shadow-lg shadow-gray-700 max-lg:flex-col max-lg:h-[73%]">

                    {/* side */}
                    <div className="w-[35%] justify-center items-center flex rounded-l-lg bg-white max-lg:w-full max-lg:rounded-t-lg max-lg:rounded-none">
                        <img src={props.event.image} className={imageStyle} />
                    </div>
                    {/* detail */}
                    <div className="w-[65%] px-[20px] pt-[5%] bg-white rounded-r-lg pb-3 max-sm:h-[59%] max-lg:w-full max-lg:rounded-b-lg max-lg:h-[52%] max-lg:rounded-none">
                        <div className='fixed right-[20%] top-[22%] p-2 max-lg:top-[18%]' onClick={props.onClose}><p className="cursor-pointer">X</p></div>
                        <p className='text-lg font-kanit font-medium max-lg:text-base'>{props.event.eventname}</p>
                        <p className={textStyle}>ผู้จัด: {props.event.host}</p>
                        <p className={textStyle}>สถานที่: {props.event.location}</p>
                        <p className={textStyle2}>[รายละเอียด]<br /> {props.event.eventdes}</p>
                        <button
                        className="w-[110px] h-[30px] mx-[50px] max-lg:mx-[80px] max-sm:mx-[25px] rounded-full bg-[#0092BF]  hover:bg-[#007396] font-regular font-poppins text-white my-[20px] ease-out duration-300"
                        onClick={props.onClick}
                    >join</button>
                        <button
                        className="w-[140px] h-[30px] mx-[45px] max-lg:mx-[80px] max-sm:mx-[10px] rounded-full bg-white border-2 hover:bg-gray-200 font-regular font-poppins text-[#696969] my-[20px] ease-out duration-300"
                        onClick={props.onClick}
                    >รายชื่อผู้เข้าร่วม</button>
                    </div>
                </div>
            </div>
        </>
    )

}

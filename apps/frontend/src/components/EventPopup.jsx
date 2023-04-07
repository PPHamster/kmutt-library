import React from "react";
import { Link } from "react-router-dom";

export default function Eventpopup(props) {
    const imageStyle = 'h-[260px] w-[225px] rounded-lg object-scale-down max-lg:w-[60%]';
    const textStyle = 'font-md font-kanit text-[#696969]';
    // if(!(props.open)) return null
    return (
        <>
            <div className="fixed flex justify-center items-center  top-0 left-0 right-0 bottom-0 h-screen bg-black/50 z-[40]">
                    {/* // row */}
                    <div className="flex flex-wrap w-[62%] min-h-[60%] max-h-[75%] rounded-lg shadow-lg shadow-gray-700 max-lg:flex-col max-lg:h-[70%]">
                        
                        {/* side */}
                        <div className="w-[35%] justify-center items-center flex rounded-l-lg bg-white max-lg:w-full max-lg:rounded-t-lg">
                        <img src='./image/PAX.jpg' className={imageStyle} />
                        
                        </div>
                        {/* detail */}
                        <div className="w-[65%] flex p-[20px] bg-white rounded-r-lg max-lg:w-full max-lg:rounded-b-lg">
                        <div className='fixed right-[20%] top-[22%] p-2 max-lg:top-[15%]' onClick={props.onClose}><p className="cursor-pointer">X</p></div>
                        </div>
                    </div>
                


            </div>
        </>
    )

}

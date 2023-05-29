import React from "react";

export default function Navbar() {

    return (
        <>
                <div className="flex flex-col w-full h-[1100px] bg-[#262A56] m-auto mt-drop-shadow-brown rounded-t-lg">
                    <h1 className='font-bold font-poppins text-3xl text-white mt-[4rem] ml-36'>Service</h1>
                    <div className="mt-9 min-h-[100px] w-[90vw] ml-[5vw] p-8 bg-white rounded-lg drop-shadow-md" >
                        <p className="font-poppins font-semibold text-2xl ml-6 mt-4 text-gray-800">Reversation room</p>
                        <img src="./image/screenshot256638At14381.jpg" className="mt-2"/>
                    </div>
                </div>
        </>
    )
};
import React from 'react';

export default function Recommend() {

    const imageStyle = "bg-auto bg-fixed h-500";
    return (
        <>
            <div className="flex mx-4 h-[60vh] w-full left-0 top-0 z-0">
                <div className="bg-fixed bg-library bg-cover top-0 left-0 h-full w-full"></div>
            </div>
            <div className='top-[60vh] w-full min-h-[7vh] bg-white'>
                <h1 className='font-medium font-poppins text-2xl mt-[4rem] ml-20'>Recommendation</h1>
                <div className="w-full h-[500px] bg-whitebrown m-auto mt-3.5 drop-shadow-brown">
                {/* Recommend column*/}
                    
                </div>
            </div>
        </>
    );
    

}
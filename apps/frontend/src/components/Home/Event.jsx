import React from "react";
import { Link } from "react-router-dom";

export default function Event() {

    return (
        <>
            <div className="flex flex-row w-full h-[700px] bg-[#FFD4D4] mt-[9rem]">
                <div className="ml-[15vw] mt-[9rem]">
                    <h1 className='font-bold font-poppins text-5xl text-[#454545] ml-[30px]'>Event</h1>
                    <div className='h-[550px] w-[650px] font-normal font-kanit text-2xl whitespace-normal text-[#454545] mt-8'>
                    KMUTT Event ในมหาลัยของเรามีระบบการจัดกิจกรรมภายในสำนักหนังสือ โดยรายละเอียดกิจกรรมขึ้นอยู่กับผู้จัดตั้งโดยมี ตัวอย่างเช่น กิจกรรมชมรมหนังสือ หรือกิจกรรม โต้วาที
                    </div>
                </div>
                <div className="ml-[7vw] mt-[9rem]">
                    <div>

                    </div>
                    <Link to='/event'>
                        <div className='w-[120px] h-[40px] ml-[60px] text-center pt-[5px] rounded-full border-transparent hover:border-[#5c4b4b] border-2 hover:bg-[#5c4b4b] font-regular font-poppins text-[#696969] text-md my-[20px] ease-out duration-300 bg-[#ab8e8e]'>
                            <p className="font-kanit font-regular text-white">ดูกิจกรรมอื่น</p>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
};
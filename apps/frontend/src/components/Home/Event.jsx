import React from "react";
import { Link } from "react-router-dom";
import Event from "@/components/Eventlist";

export default function EventComponent() {

    return (
        <>
            <div className="flex flex-row w-full h-[700px] bg-[#FFD4D4] mt-[9rem]">
                <div className="ml-[12vw] mt-[9rem]">
                    <h1 className='font-bold font-poppins text-5xl text-[#454545] ml-[30px]'>Event</h1>
                    <div className='h-[550px] w-[35vw] font-normal font-kanit text-xl whitespace-normal text-[#454545] mt-8'>
                    KMUTT Event ในมหาลัยของเรามีระบบการจัดกิจกรรมภายในสำนักหนังสือ โดยรายละเอียดกิจกรรมขึ้นอยู่กับผู้จัดตั้งโดยมี ตัวอย่างเช่น กิจกรรมชมรมหนังสือ หรือกิจกรรม โต้วาที
                    </div>
                </div>
                <div className="ml-[20vw] mt-[4rem] flex-col flex">
                    <div>
                        <Event
                            eventname=''
                            category=''
                            location=''
                        />
                    </div>
                    <div className="ml-[4vw]">
                        <Link to='/event'>
                            <div className='w-[120px] h-[40px] ml-[20px] text-center pt-[5px] rounded-full border-transparent hover:border-[#5c4b4b] border-2 hover:bg-[#5c4b4b] ease-out duration-300 bg-[#ab8e8e]'>
                                <p className="font-kanit font-regular text-white">ดูกิจกรรมอื่น</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
};
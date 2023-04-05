import React from "react";

export default function Event() {

    return (
        <>
                <div className="flex flex-row w-full h-[700px] bg-[#FFD4D4] mt-[9rem]">
                    <div className="ml-[15vw] mt-[9rem]">
                        <h1 className='font-bold font-poppins text-5xl text-[#454545] ml-[30px]'>Event</h1>
                        <p className='font-normal font-kanit text-2xl text-[#454545] mt-8'>
                        KMUTT Event ในมหาลัยของเรามีระบบการจัดกิจกรรมภายในสำนักหนังสือ {<br/>}โดยรายละเอียดกิจกรรมขึ้นอยู่กับผู้จัดตั้งโดยมี{<br/>}ตัวอย่างเช่น กิจกรรมชมรมหนังสือ หรือกิจกรรม โต้วาที
                        </p>
                    </div>
                    <div className="ml-[15vw] mt-[9rem]">
                        {/* Event */}
                    </div>
                </div>
        </>
    )
};
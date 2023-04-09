import React from "react";
import { Link } from "react-router-dom";

export default function Blog() {

    return (
        <>
            <div className="flex flex-row w-full h-[700px] bg-[#729ad2] mt-[9rem]">
                <div className="ml-[15vw] mt-[9rem]">
                    <h1 className='font-bold font-poppins text-5xl text-[#454545] ml-[30px]'>Blog</h1>
                    <div className='h-[550px] w-[35vw] font-normal font-kanit text-2xl whitespace-normal text-[#454545] mt-8'>
                    KMUTT Community ใช้พูดคุย แลกเปลี่ยน ความคิดและความเห็นเกี่ยวกับหนังสือ
                    </div>
                </div>
                <div className="ml-[20vw] mt-[9rem]">
                    <div>
                    
                    </div>
                    <div className="ml-[4vw]">
                        <Link to='/event'>
                            <div className='flex w-[120px] h-[40px] ml-[60px] text-center pt-[5px] rounded-full border-transparent hover:border-[#3e5679] border-2 hover:bg-[#3e5679] ease-out duration-300 bg-[#5f81af]'>
                                <p className="font-kanit font-regular text-white">see more</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
};
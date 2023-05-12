import React from 'react'
import NavbarStaff from '@/components/NavbarStaff'
import StaffTab from '@/components/Staff/StaffTab'
import { Link } from 'react-router-dom'

export const StaffPage = () => {

    return (
        <>
        <div className='w-full h-full bg-slate-100'>
            <div className='fixed pt-12 ml-[3%] z-50'>
            <Link to={'/'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="absolute left-[3%] w-6 h-6 -translate-y-4 text-center">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg></Link>
            </div>
            <NavbarStaff
                bgcolor='bg-white hover:drop-shadow-md'
                textcolor='text-black'
            />
            
            <StaffTab />
            <footer>
                <div className=" flex flex-col w-full h-[150px] bg-[#8D4120] columns-2 mt-[10%]">
                    <div className="mt-6 ml-40">
                        <p className="font-semi-bold font-poppins text-white text-lg">CONTACT US</p>
                        <div className="columns-2">
                            <p className="font-regular font-roboto text-white text-md">
                                Tel. 02-423-5522 {<br />}
                                Email : kmutt_library@kmutt.ac.th
                            </p>
                            <p className="font-regular font-kanit text-white text-md">
                                Location : 91 ถนน พุทธบูชา {<br />}
                                แขวงบางมด เขตทุ่งครุ {<br />}
                                กรุงเทพมหานคร 10140
                            </p>
                        </div>
                    </div>
                </div>
            </footer></div>
        </>
    )
}

import React from 'react'
import NavbarStaff from '@/components/NavbarStaff'
import StaffTab from '@/components/Staff/StaffTab'

export const StaffPage = () => {

    return (
        <>
        <div className='w-full h-full bg-slate-100'>
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

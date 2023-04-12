import React from 'react'
import { Link } from 'react-router-dom';

export default function navbarStaff(props) {

    const navbarClass = "fixed pt-2 h-[12vh] top-0 left-0 w-full z-50 transition ease-in-out duration-1000 shadow-lg " + props.bgcolor;
    const textClass = "relative font-normal font-poppins mt-1 ease-in-out duration-300" + props.textcolor;

    return (
        <>
            <div className={navbarClass}>
                <div>
                    {/* logo for navigation */}
                </div>
                <nav className='flex w-full justify-center  items-center text-center mt-4'>
                    <Link to={'/'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="absolute left-[3%] w-6 h-6 -translate-y-4 text-center">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg></Link>

                    <p className={textClass}>Book & Room & Event<br />Management</p>
                </nav>
            </div>
        </>
    )
}

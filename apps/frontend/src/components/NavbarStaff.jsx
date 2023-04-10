import React from 'react'

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
                <p className={textClass}>Book & Room & Event<br/>Management</p>
                </nav>
            </div>
        </>
    )
}

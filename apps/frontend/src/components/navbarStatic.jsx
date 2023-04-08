import React from 'react';
import { Link } from "react-router-dom";

// bgcolor and text should be color or [#797979]
export default function NavbarStatic(props) {
    
    //navbar&list class css
    const navbarClass = "fixed pt-2 h-[7.7vh] top-0 left-0 w-full z-50 transition ease-in-out duration-1000 " + props.bgcolor;
    const textClass = "relative font-normal font-poppins mt-1 ease-in-out duration-300 hover:font-bold hover:border-t-4 " + props.textcolor;

    // list style
    const listClass = "float-left list-none ml-5 mr-5 mt-0.5";
    return (
        <>
            <div className={navbarClass}>
                <div>
                    {/* logo for navigation */}
                </div>
                <nav className='flex w-full justify-center  items-center mt-4'>
                    <li className={listClass}><Link to='/'>
                        <p className={textClass}>Home</p></Link>
                    </li>
                    <li className={listClass}><Link to='/service'>
                        <p className={textClass}>Service</p></Link>
                    </li>
                    <li className={listClass}><Link to='/event'>
                        <p className={textClass}>Event</p></Link>
                    </li>
                </nav>
            </div>
        </>
    )
};

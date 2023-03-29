import React from 'react';
import { Link } from "react-router-dom";

export default function Navbar() {

    // state scrolling
    const [scrolled, setScrolled] = React.useState(false);
    const handleScroll = () => {
        const offset = window.scrollY;
        // set offset to handle scrolling
        if (offset > 200) setScrolled(true);
        else setScrolled(false);
    };
    
    // listen for scroll
    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    });

    //navbar class css
    let navbarClass = ["sticky pt-2 min-h-[7vh] w-full"];

    // scroll class css 
    if (scrolled) navbarClass.push("fixed top-0 left-0 bg-[#effbff]");

    // text&list style
    const textClass = "relative font-normal mt-1 ease-in-out duration-300 text-white hover:font-bold hover:border-t-4 ";
    const listClass = "float-left list-none ml-5 mr-5 mt-0.5";
    return (
        <>
            <div className={navbarClass.join(" ")}>
                <div>
                     {/* logo for navigation */}
                </div>
                <nav className='flex w-full justify-center'>
                    <li className={listClass}><Link to='/'>
                        <p className={textClass}>Home</p></Link>
                    </li>
                    <li className={listClass}><Link to='/'>
                        <p className={textClass}>Service</p></Link>
                    </li>
                    <li className={listClass}><Link to='/'>
                        <p className={textClass}>Event</p></Link>
                    </li>
                </nav>
            </div>
        </>
    )


};
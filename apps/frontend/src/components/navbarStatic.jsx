import React from 'react';
import { Link } from "react-router-dom";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import PeopleIcon from '@mui/icons-material/People';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StyledBadge = styled(Badge) (({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

// bgcolor and text should be color or [#797979]
export default function NavbarStatic(props) {
    
    //navbar&list class css
    const navbarClass = "fixed flex justify-between pt-2 h-[100px] top-0 left-0 w-full z-50 transition ease-in-out duration-1000 " + props.bgcolor;
    const textClass = "relative font-normal font-poppins mt-1 ease-in-out duration-300 hover:font-bold hover:border-t-4 " + props.textcolor;

    // list style
    const listClass = "float-left list-none ml-5 mr-5 mt-0.5";
    return (
        <>
            <div className={navbarClass}>
                <div>
                    <img src='./image/educationPana12.jpg' className='h-[80px] m-auto object-scale-down ml-8 mt-2'/>
                </div>
                <nav className='flex justify-center items-center mt-2'>
                    <li className={listClass}><Link to='/'>
                        <p className={textClass}>Home</p></Link>
                    </li>
                    <li className={listClass}><Link to='/service'>
                        <p className={textClass}>Service</p></Link>
                    </li>
                    <li className={listClass}><Link to='/event'>
                        <p className={textClass}>Event</p></Link>
                    </li>
                    <li className={listClass}><Link to='/blog'>
                        <p className={textClass}>Blog</p></Link>
                    </li>
                </nav>
                <div className='flex flex-row justify-center items-center mt-2 mr-12'>
                    <div className='mr-2'>
                        <Button size='small' startIcon={<PeopleIcon />}>
                            Login
                        </Button>
                    </div>
                    <IconButton aria-label="cart">
                        <StyledBadge badgeContent={0} color="secondary">
                           <ShoppingCartIcon />
                        </StyledBadge>
                    </IconButton>
                </div>
            </div>
        </>
    )
};
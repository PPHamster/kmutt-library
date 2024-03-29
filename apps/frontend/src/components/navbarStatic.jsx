import React from 'react';
import { Link } from "react-router-dom";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import PeopleIcon from '@mui/icons-material/People';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

const StyledBadge = styled(Badge)(({ theme }) => ({
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

  const { user } = useAuth();
  const { cart } = useCart();

  // list style
  const listClass = "float-left list-none ml-5 mr-5 mt-0.5";
  return (
    <>
      <div className={navbarClass}>
        <div>
          <img src='/image/educationPana12.jpg' className='h-[80px] m-auto object-scale-down ml-8 mt-2' />
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
          {
            user && user.role === 'Admin' ?
              <>
                <li className={listClass}>
                  <Link to='/staff'>
                    <p className={textClass}>Staff</p>
                  </Link>
                </li>
                <li className={listClass}>
                  <Link to='/admin'>
                    <p className={textClass}>Admin</p>
                  </Link>
                </li>
                <li className={listClass}>
                  <Link to='/admin/dashboard/order'>
                    <p className={textClass}>Dashboard</p>
                  </Link>
                </li>
              </>
              : user && user.role === 'Staff' ?
                <li className={listClass}>
                  <Link to='/staff'>
                    <p className={textClass}>Staff</p>
                  </Link>
                </li>
                : null
          }
        </nav>
        <div className='flex flex-row justify-center items-center mt-2 mr-12'>
          {
            user ?
              <>
                <Link to="/profile" className="mr-[10px]">
                  <Avatar alt="Remy Sharp" src={user.image} sx={{ width: 42, height: 42 }} />
                </Link>
                <Link to="/order">
                  <IconButton aria-label="cart">
                    <StyledBadge badgeContent={cart.length} color="secondary">
                      <ShoppingCartIcon />
                    </StyledBadge>
                  </IconButton>
                </Link>
              </> :
              <Link to="/signin">
                <Button size='small' startIcon={<PeopleIcon />}>
                  Login
                </Button>
              </Link>
          }
        </div>
      </div>
    </>
  )
};

import NavbarStatic from '@/components/navbarStatic';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import { fetch } from '@/utils/Fetch';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { red, deepOrange, deepPurple } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { WithUser } from '@/components/Hoc/WithUser';

function ProfilePage() {

  const { user, logout } = useAuth();

  const navigate = useNavigate()

  const [books, setBooks] = useState(null);
  const [orders, setOrders] = useState(null);

  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

  const handleLogout = async () => {
    await logout();
    navigate('/');
  }

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch.get('/books');
      setBooks(response.data);
    }
    const fetchOrders = async () => {
      const response = await fetch.get('/orders');
      setOrders(response.data);
    }

    fetchOrders();
    fetchBooks();
  }, []);

  return (
    <>
      <NavbarStatic
        bgcolor='bg-white hover:drop-shadow-md'
        textcolor='text-black'
      />
      <div className='grid grid-flow-col auto-cols-max w-full'>
        <div className='ml-[10vw] mt-[120px]'>
          <div className='drop-shadow-md'>
            <Avatar sx={{ bgcolor: red[50], width: 300, height: 300 }} src={user.image} >
            </Avatar>
          </div>
        </div>
        {/* edit profile name */}
        <div className='ml-[180px] mt-[120px] flex flex-col justify-items-center'>

          <h1 className='font-kanit font-bold text-[#454545] text-2xl mt-6'>{user.firstname + " " + user.lastname}</h1>
          <h1 className='font-kanit font-normal text-[#454545] text-2lg mt-6'>{"Email: " + user.email}</h1>
          <h1 className='font-kanit font-normal text-[#454545] text-2lg mt-6'>{"Tel: " + user.tel}</h1>
          <h1 className='font-kanit font-normal text-[#454545] text-2lg mt-6'>{"Year: " + (new Date().getFullYear() - user.registYear)}</h1>
          <h1 className='font-kanit font-normal text-[#454545] text-2lg mt-6'>{"Major: " + user.branch}</h1>
        </div>
      </div>
      <div className='relative w-full'>
        <div className='absolute top-0 left-0 ml-[735px]'>
          <Button variant="contained" onClick={handleLogout}>Logout</Button>
        </div>
        <div className='absolute top-0 right-0 mr-[24px]'>
          <Fab size="small" color="secondary" aria-label="add" onClick={() => { nav("/event") }}>
            <EditIcon />
          </Fab>
        </div>
      </div>
      <hr className='mt-[60px] w-full'></hr>
      <h1 className='font-kanit font-bold text-xl ml-[24px] mt-[24px]'>Latest Activity</h1>
      <div className="grid grid-rows-4 grid-flow-col gap-4">
        {
          books ?
            books.map((data) => (
              <div key={data.id}>
                <Card sx={{ minWidth: 275, width: 500 }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      {data.author}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {data.title}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {data.publishDate}
                    </Typography>
                    <Typography variant="body2">
                      {data.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              </div>
            )) : null
        }
      </div>
    </>
  );
}

export default WithUser(ProfilePage);

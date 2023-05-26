import NavbarStatic from '@/components/navbarStatic';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import { fetch } from '@/utils/Fetch';
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

    const cancelQueue = (order,book) => {
        const response = fetch.delete('/orders/' + order.id + '/' + book.id);
        window.location.reload();
    }

    const returnBook = (order,book) => {
        const response = fetch.put('/orders/' + order.id + '/' + book.id + '/return');
        window.location.reload();
    }

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
            <div className="grid grid-column-4 auto-cols-max">
                {
                    orders ?
                        orders.map((orderItem) => (
                            <>
                                <div key={orderItem.id}>
                                    <hr className='mt-[16px] w-full'></hr>
                                    <h1 className='font-kanit font-normal mt-[8px] ml-[24px]'> {'Order ID:' + orderItem.id}</h1>
                                    <div className="ml-[24px] grid grid-cols-4 gap-4">
                                        {
                                            orderItem.items.map((book) => (

                                                <div key={book.id}>
                                                    <Card className='mt-[8px]' sx={{ minWidth: 275, width: 500 }}>
                                                        <CardContent>
                                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                                {(() => {
                                                                    if (book.receivedDate == null) {
                                                                        return (
                                                                            <><h1>In Queue</h1></>
                                                                        )
                                                                    } else if (book.returnedDate != null) {
                                                                        return (
                                                                            <><h1>Returned</h1></>
                                                                        )
                                                                    } else {
                                                                        return (
                                                                            <><h1>Received</h1></>
                                                                        )
                                                                    }
                                                                })()}
                                                            </Typography>
                                                            <Typography variant="h5" component="div">
                                                                {book.title}
                                                            </Typography>
                                                            {(() => {
                                                                if (book.receivedDate == null) {
                                                                    return <Typography variant="body2">
                                                                        <br></br>
                                                                    </Typography>
                                                                } else {
                                                                    return (<Typography variant="body2">
                                                                        {book.receivedDate}
                                                                    </Typography>)
                                                                }

                                                            })()}
                                                            <Typography variant="body2">
                                                                {book.description}
                                                            </Typography>
                                                        </CardContent>
                                                        <CardActions>
                                                            <Button size="small">Learn More</Button>
                                                            {(() => {
                                                                if (book.receivedDate == null) {
                                                                    return (
                                                                        <Button onClick={() => cancelQueue(orderItem,book)} variant="outlined" color="error" size="small">Cancel Queue</Button>
                                                                    )
                                                                } else if (book.returnedDate != null) {
                                                                    return null

                                                                } else {
                                                                    return (
                                                                        <Button onClick={() => returnBook(orderItem,book)} variant="outlined" color="error" size="small">Return</Button>
                                                                    )
                                                                }
                                                            })()}
                                                        </CardActions>
                                                    </Card>
                                                </div>

                                            ))
                                        }
                                    </div>
                                    <hr className='mt-[24px] mb-[24px] w-full'></hr>
                                </div>
                            </>
                        )) : null
                }
            </div>
        </>
    );
}

export default WithUser(ProfilePage);

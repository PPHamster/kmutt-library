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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { WithUser } from '@/components/Hoc/WithUser';

const bookborrow = [
  { id: 1, title: 'That Time I Got Reincarnated as a Slime, Vol. 1', author: 'testtt', description: '5555', isbn: '1234567891011', publishDate: '2023-05-11', language: 'thai', image: './bookimages/chainsawman_volume_1.jpg', location: 'floor1', count: 0 },
  { id: 2, title: 'test2', author: 'testtt', description: '5555', isbn: '1234567891011', publishDate: '2023-05-11', language: 'thai', image: './bookimages/kaguya_sama_love_is_war_volume_1.jpg', location: 'floor1', count: 0 },
  { id: 3, title: 'test', author: 'testtt', description: '5555', isbn: '1234567891011', publishDate: '2023-05-11', language: 'thai', image: './bookimages/chainsawman_volume_1.jpg', location: 'floor1', count: 1 },
  { id: 4, title: 'test2', author: 'testtt', description: '5555', isbn: '1234567891011', publishDate: '2023-05-11', language: 'thai', image: './bookimages/kaguya_sama_love_is_war_volume_1.jpg', location: 'floor1', count: 5 },
  { id: 5, title: 'test', author: 'testtt', description: '5555', isbn: '1234567891011', publishDate: '2023-05-11', language: 'thai', image: './bookimages/chainsawman_volume_1.jpg', location: 'floor1', count: 1 },
]

const roombooking = [
  { id: 1, name: 'ห้องอ่านนส. 1', location: 'หอสมุดชั้น 3', status: 'open', date: '2023-05-11', beginTime: '08:00:00', endTime: '10:00:00' },
  { id: 2, name: 'ห้องประชุม 2', location: 'หอสมุดชั้น 2', status: 'open', date: '2023-05-11', beginTime: '08:00:00', endTime: '10:00:00' },
  { id: 3, name: 'ห้องนั่งเล่น', location: 'testtt', status: 'close', date: '2023-05-11', beginTime: '08:00:00', endTime: '10:00:00' },
  { id: 4, name: 'ห้องหน้าร้านกาแฟ', location: 'testtt', status: 'open', date: '2023-05-11', beginTime: '08:00:00', endTime: '10:00:00' },
]
function ProfilePage() {

  const infoBook = 'max-h-[200px] max-w-[200px] rounded-lg object-scale-down mt-[20px]';

  const { user, logout } = useAuth();

  const navigate = useNavigate()

  const [books, setBooks] = useState(null);
  const [orders, setOrders] = useState(null);
  const [mybooks, setMybooks] = useState(bookborrow);
  const [myrooms, setMyrooms] = useState(roombooking);
  const [name, setName] = useState("");
  const [Lname, setLname] = useState("");
  const [tel, setTel] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleLnameChange = (event) => {
    setLname(event.target.value);
  };

  const handleTelChange = (event) => {
    setTel(event.target.value)
  };

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

  const cancelQueue = (order, book) => {
    const response = fetch.delete('/orders/' + order.id + '/' + book.id);
    window.location.reload();
  }

  const returnBook = (order, book) => {
    const response = fetch.put('/orders/' + order.id + '/' + book.id + '/return');
    window.location.reload();
  }

  //EditPro
  const [openEdit, toggleOpenEdit] = useState(false);

  const handleOpenEdit = () => {
    toggleOpenEdit(true);
    setImageData([]);
  }

  const handleCloseEdit = () => {
    toggleOpenEdit(false);
  };

  const handleSubmitEdit = (event) => {
    event.preventDefault();
    handleCloseEdit();
    submitEdit();
  };

  const submitEdit = () => {
    console.log(
      name,
      Lname,
      tel,
      imageData
    );
  };


  //upload image
  const [images, setImages] = useState([]);
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    if (images.length < 1) return;
    const newImageData = [];
    images.forEach(image => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = () => {
        const base64Data = reader.result;
        newImageData.push(base64Data);
        setImageData(newImageData);
      }
    });
  }, [images]);

  function onImageChange(e) {
    setImages([...e.target.files]);
  }

  //BookRe
  const [openRe, toggleOpenRe] = useState(false);

  const handleOpenRe = () => {
    toggleOpenRe(true);
  }

  const handleCloseRe = () => {
    toggleOpenRe(false);
  };

  const handleSubmitRe = (event) => {
    event.preventDefault();
    handleCloseRe();
  };

  function Rebook(Id) {
    console.log('reeeeeeeeeeee');
  }

  //BookCan
  const [openCan, toggleOpenCan] = useState(false);

  const handleOpenCan = () => {
    toggleOpenCan(true);
  }

  const handleCloseCan = () => {
    toggleOpenCan(false);
  };

  const handleSubmitCan = (event) => {
    event.preventDefault();
    handleCloseCan();
  };

  function Canbook(Id) {
    console.log('reeeeeeeeeeee');
  }

  //Room
  const [openRoom, toggleOpenRoom] = useState(false);

  const handleOpenRoom = () => {
    toggleOpenRoom(true);
  }

  const handleCloseRoom = () => {
    toggleOpenRoom(false);
  };

  const handleSubmitRoom = (event) => {
    event.preventDefault();
    handleCloseRoom();
  };

  function CancelRoom(Id) {
    console.log('roommmmmmmmm');
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
        {/* <div className='absolute top-0 right-0 mr-[24px]'>
          <Fab size="small" color="secondary" aria-label="add" onClick={() => { nav("/event") }}>
            <EditIcon />
          </Fab>
        </div> */}
        <div className='absolute top-0 left-0 ml-[870px] z-10'>
          <Fab size="small" color="secondary" aria-label="add" onClick={handleOpenEdit}>
            <EditIcon />
          </Fab>
        </div>
        <Dialog open={openEdit} onClose={handleCloseEdit}>
          <form onSubmit={handleSubmitEdit}>
            <DialogTitle className='text-center'>แก้ไขโปรไฟล์</DialogTitle>
            <hr />
            <DialogContent>
              <DialogContentText className='px-5'>
                <Box
                  component="form"
                  sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' }, }}
                  noValidate
                  autoComplete="off"
                >
                  <div className="my-[3vh] mx-[5vh]">
                    <TextField
                      required
                      label="ชื่อ"
                      onChange={handleNameChange}
                      defaultValue={user.firstname}
                      multiline
                      maxRows={2}
                    />
                    <TextField
                      label="นามสกุล"
                      onChange={handleLnameChange}
                      defaultValue={user.lastname}
                      multiline
                      maxRows={1}
                    />
                    <TextField
                      label="เบอร์โทรศัพท์"
                      onChange={handleTelChange}
                      defaultValue={user.tel}
                      multiline
                      maxRows={1}
                    />
                  </div>
                  <div className="my-[3vh] ml-[11.5vh]">
                    <h2 className=' font-normal font-kanit text-orange-600 text-sm text-left mb-2'>หากไม่ต้องการเปลี่ยนรูป ไม่ต้อง Upload รูปใด ๆ</h2>
                    <input type="file"
                      className=" file:rounded-full file:bg-white
                              file:hover:bg-gray-200 file:font-normal 
                                file:font-poppins file:text-black file:ease-out 
                                file:duration-300 file:border-2 font-poppins file:p-[8px] 
                                file:px-[20px] file:mr-5"
                      multiple
                      accept="image/*"
                      onChange={onImageChange}
                    />
                    {imageData.map((dataURL, idx) => (
                      <img key={idx} className="w-3/12" src={dataURL} />
                    ))}
                  </div>
                </Box>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEdit}>ยกเลิก</Button>
              <Button type="submit">ยืนยัน</Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
      <hr className='mt-[80px] w-full'></hr>
      <h1 className='font-kanit font-bold text-3xl ml-[150px] mt-[50px]'>My Borrowing and Booking</h1>
      <h1 className='font-kanit font-semibold text-2xl ml-[200px] mt-[20px] mb-[10px]'>Books</h1>
      <div className='mx-[50px] -my-[16px] after:content-[""] after:table'>
        {mybooks.map((book) => (
          <div className='flex justify-center items-center w-1/3 float-left max-sm:w-full max-lg:w-1/3 max-lg:p-2 max-md:w-2/4' key={book.id}>
            <div className='bg-white rounded-lg p-[20px] w-[300px] min-h-[300px] my-8 max-sm:my-2 max-lg:my-4 border drop-shadow-sm'>
              <div className='w-[200px] h-[200px] flex justify-center items-center mx-7'>
                <img src={book.image} className={infoBook} />
              </div>
              <p className='font-normal font-kanit text-[#454545] text-xl text-center mt-5'>{book.title}</p>
              {book.count === 0 ? (
                <>
                  <p className='font-normal font-kanit text-orange-600 text-xl text-center mt-1'>Borrowing</p>
                  <button
                    className="w-[110px] p-3 mx-[72px] rounded-full bg-[#0092BF]  hover:bg-[#007396] border-2 font-regular font-poppins text-white my-[20px] ease-out duration-300"
                    onClick={() => { handleOpenRe(book) }}>Return</button>
                </>
              ) : (
                <>
                  <p className='font-normal font-kanit text-orange-600 text-xl text-center mt-1'>In Queue</p>
                  <button
                    className="w-[110px] p-3 mx-[72px] rounded-full bg-[#F44336] border-2 hover:bg-[#c5342a] font-regular font-poppins text-white my-[20px] ease-out duration-300"
                    onClick={() => { handleOpenCan(book) }}>Cancel</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Re */}
      <Dialog open={openRe} onClose={handleCloseRe}>
        <form onSubmit={handleSubmitRe}>
          <DialogTitle className='text-center'>การคืนหนังสือ</DialogTitle>
          <hr />
          <DialogContent>
            <DialogContentText className='px-5'>
              คุณแน่ใจหรือไม่ว่าต้องการคืนหนังสือ
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseRe}>ยกเลิก</Button>
            <Button type="submit" onClick={() => ReBook(book.id)}>ยืนยัน</Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Re */}
      <Dialog open={openCan} onClose={handleCloseCan}>
        <form onSubmit={handleSubmitCan}>
          <DialogTitle className='text-center'>ยกเลิกการจองหนังสือ</DialogTitle>
          <hr />
          <DialogContent>
            <DialogContentText className='px-5'>
              คุณแน่ใจหรือไม่ว่าต้องการยกเลิกการจองหนังสือ
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCan}>ยกเลิก</Button>
            <Button type="submit" onClick={() => CanBook(book.id)}>ยืนยัน</Button>
          </DialogActions>
        </form>
      </Dialog>
      <hr className='mt-[80px] mb-[50px] w-[85%] mx-[7.5%]'></hr>
      <h1 className='font-kanit font-semibold text-2xl ml-[200px] mt-[20px] mb-[30px]'>Rooms</h1>
      <div className='mx-[200px] mb-[100px]'>
        <table className="font-kanit w-[100%] border text-left">
          <thead className='bg-gray-200 drop-shadow-sm h-[80px]'>
            <tr>
              <th className='px-[20px] font-medium text-lg border'>Name</th>
              <th className='px-[20px] font-medium text-lg border'>Location</th>
              <th className='px-[20px] font-medium text-lg border'>Status</th>
              <th className='px-[20px] font-medium text-lg border'>Date - Time Booking</th>
              <th ></th>
            </tr>
          </thead>
          <tbody className='h-[300px]'>
            {myrooms.map((room) => {
              const meetingTime = new Date(room.date);

              // format the date using the toLocaleString() method
              const DateRoom = meetingTime.toLocaleString("th-TH", {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
              });

              const startTime = room.beginTime.slice(0, 5);
              const endTime = room.endTime.slice(0, 5);

              return (
                <tr key={room.id}>
                  <td className='border px-[10px] text-lg'>{room.name}</td>
                  <td className='border px-[10px] text-lg'>{room.location}</td>
                  <td className='border px-[10px] text-lg'>{room.status}</td>
                  <td className='border px-[10px] text-lg text-orange-600'>{DateRoom} เวลา {startTime} - {endTime}</td>
                  <td className='text-center'>
                    <button
                      className=" w-[80px] p-3 rounded-full bg-[#F44336] border-2 hover:bg-[#c5342a] font-regular font-poppins text-white text-md ease-out duration-300"
                      onClick={() => { handleOpenRoom(room) }}>Cancel</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* room */}
        <Dialog open={openRoom} onClose={handleCloseRoom}>
          <form onSubmit={handleSubmitRoom}>
            <DialogTitle className='text-center'>ยกเลิกการจองห้อง</DialogTitle>
            <hr />
            <DialogContent>
              <DialogContentText className='px-5'>
                คุณแน่ใจหรือไม่ว่าต้องการยกเลิกการจองห้อง
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseRoom}>ยกเลิก</Button>
              <Button type="submit" onClick={() => CancelRoom(room.id)}>ยืนยัน</Button>
            </DialogActions>
          </form>
        </Dialog>

      </div>
      {/* <div className='mx-[50px] -my-[16px] after:content-[""] after:table'>
        {myrooms.map((room) => (
          <div className='flex justify-center items-center w-1/3 float-left max-sm:w-full max-lg:w-1/3 max-lg:p-2 max-md:w-2/4' key={room.id}>
            <div className='bg-white rounded-lg p-[20px] w-[300px] min-h-[300px] my-8 max-sm:my-2 max-lg:my-4 border drop-shadow-sm'>
              <div className='w-[200px] h-[200px] flex justify-center items-center mx-7'>
                <img src={room.image} className={infoBook} />
              </div>
              <p className='font-normal font-kanit text-[#454545] text-xl text-center mt-5'>{room.name}</p>
            </div>
          </div>
        ))}
      </div> */}


      {/* ส่วน code เดิม */}
      {/* <div className="grid grid-column-4 auto-cols-max">
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
                                    <Button onClick={() => cancelQueue(orderItem, book)} variant="outlined" color="error" size="small">Cancel Queue</Button>
                                  )
                                } else if (book.returnedDate != null) {
                                  return null

                                } else {
                                  return (
                                    <Button onClick={() => returnBook(orderItem, book)} variant="outlined" color="error" size="small">Return</Button>
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
      </div> */}
    </>
  );
}

export default WithUser(ProfilePage);

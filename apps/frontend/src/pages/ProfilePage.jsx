import NavbarStatic from '@/components/navbarStatic';
import { useState, useEffect, memo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import { fetch } from '@/utils/Fetch';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { WithUser } from '@/components/Hoc/WithUser';
import { popup } from '@/utils/Popup';

function ProfilePage() {

  function isDateAfterOrEqual(day1, day2) {
    return !(
      day1.getFullYear() < day2.getFullYear() ||
      (day1.getFullYear() === day2.getFullYear() &&
        day1.getMonth() < day2.getMonth()) ||
      (day1.getFullYear() === day2.getFullYear() &&
        day1.getMonth() === day2.getMonth() &&
        day1.getDate() < day2.getDate())
    );
  }

  const infoBook = 'max-h-[200px] max-w-[200px] rounded-lg object-scale-down mt-[20px]';

  const { user, logout, setDownload } = useAuth();

  const navigate = useNavigate()

  const [mybooks, setMybooks] = useState(null);
  const [downloadBooks, setDownloadBooks] = useState(true);

  const [myrooms, setMyrooms] = useState(null);
  const [downloadRooms, setDownloadRooms] = useState(true);

  const [name, setName] = useState(user.firstname);
  const [Lname, setLname] = useState(user.lastname);
  const [tel, setTel] = useState(user.tel);

  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

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

  //EditPro
  const [openEdit, toggleOpenEdit] = useState(false);

  const handleOpenEdit = () => {
    toggleOpenEdit(true);
    setName(user.firstname);
    setLname(user.lastname);
    setTel(user.tel);
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

  const submitEdit = async () => {

    const data = {
      firstname: name,
      lastname: Lname,
      tel: tel,
      image: imageData,
    }

    try {
      await fetch.put(`/users/${user.id}`, data);

      if (imageData.length > 0) {
        await fetch.put(`/users/${user.id}/image`, { image: imageData[0].split(',')[1] });
        navigate(0);
      }
      setDownload(true);
    } catch (error) {
      await popup.fire({
        icon: 'error',
        title: 'Failed to edit user!',
        text: `${error.response.data.message}`,
      })
    }
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

  const handleOpenRe = (book) => {
    setSelectedBook(book);
    toggleOpenRe(true);
  }

  const handleCloseRe = () => {
    setSelectedBook(null);
    toggleOpenRe(false);
  };

  const handleSubmitRe = (event) => {
    event.preventDefault();
    handleCloseRe();
  };

  async function ReBook() {
    try {
      await fetch.put(`/orders/${selectedBook.orderId}/${selectedBook.id}/return`);
      setDownloadBooks(true);
      await popup.fire({
        icon: 'success',
        title: 'Return Success!',
        text: `Return ${selectedBook.title} Successfully`,
      })
    } catch (error) {
      await popup.fire({
        icon: 'error',
        title: 'Return Failed!',
        text: `${error.response.data.message}`,
      })
    }
  }

  //BookCan
  const [openCan, toggleOpenCan] = useState(false);

  const handleOpenCan = (book) => {
    setSelectedBook(book);
    toggleOpenCan(true);
  }

  const handleCloseCan = () => {
    setSelectedBook(null);
    toggleOpenCan(false);
  };

  const handleSubmitCan = (event) => {
    event.preventDefault();
    handleCloseCan();
  };

  async function CanBook() {
    try {
      await fetch.delete(`/orders/${selectedBook.orderId}/${selectedBook.id}`);
      setDownloadBooks(true);
      await popup.fire({
        icon: 'success',
        title: 'Cancel Success!',
        text: `Cancel ${selectedBook.title} Successfully`,
      })
    } catch (error) {
      await popup.fire({
        icon: 'error',
        title: 'Cancel Failed!',
        text: `${error.response.data.message}`,
      })
    }
  }

  //Room
  const [openRoom, toggleOpenRoom] = useState(false);

  const handleOpenRoom = (room) => {
    setSelectedRoom(room);
    toggleOpenRoom(true);
  }

  const handleCloseRoom = () => {
    setSelectedRoom(null);
    toggleOpenRoom(false);
  };

  const handleSubmitRoom = (event) => {
    event.preventDefault();
    handleCloseRoom();
  };

  async function CancelRoom() {
    try {
      await fetch.delete(`/rooms/${selectedRoom.id}/book/${selectedRoom.bookingRoomId}`, {
        date: new Date(new Date(selectedRoom.date).toLocaleDateString({ timeZone: 'Asia/Bangkok' })),
      });
      setDownloadRooms(true);
      await popup.fire({
        icon: 'success',
        title: 'Cancel Success!',
        text: `Cancel ${selectedRoom.name} Successfully`,
      })
    } catch (error) {
      await popup.fire({
        icon: 'error',
        title: 'Cancel Failed!',
        text: `${error.response.data.message}`,
      })
    }
  }

  useEffect(() => {
    const fetchBooks = async () => {
      if (downloadBooks) {
        const response = await fetch.get('/books/interact');
        setMybooks(response.data);
        setDownloadBooks(false);
      }
    }

    const fetchRooms = async () => {
      if (downloadRooms) {
        const response = await fetch.get('/rooms/interact');
        setMyrooms(response.data);
        setDownloadRooms(false);
      }
    }

    fetchBooks();
    fetchRooms();
  }, [downloadBooks, downloadRooms]);

  if (!mybooks || !myrooms) {
    return (
      <>
        <NavbarStatic
          bgcolor='bg-white hover:drop-shadow-md'
          textcolor='text-black'
        />
        <div className='grid grid-flow-col auto-cols-max w-full' />
      </>
    );
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
            <Avatar sx={{ bgcolor: red[50], width: 300, height: 300 }} src={user.image} />
          </div>
        </div>
        {/* edit profile name */}
        <div className='ml-[180px] mt-[120px] flex flex-col justify-items-center'>
          <h1 className='font-kanit font-bold text-[#454545] text-2xl mt-6'>{user.firstname + " " + user.lastname}</h1>
          <h1 className='font-kanit font-normal text-[#454545] text-2lg mt-6'>{"ID: " + user.id}</h1>
          <h1 className='font-kanit font-normal text-[#454545] text-2lg mt-6'>{"Email: " + user.email}</h1>
          <h1 className='font-kanit font-normal text-[#454545] text-2lg mt-6'>{"Tel: " + user.tel}</h1>
          <h1 className='font-kanit font-normal text-[#454545] text-2lg mt-6'>{"Year: " + (new Date().getFullYear() - user.registYear + (new Date().getMonth() >= 7 ? 1 : 0))}</h1>
          <h1 className='font-kanit font-normal text-[#454545] text-2lg mt-6'>{"Major: " + user.branch}</h1>
        </div>
      </div>
      <div className="flex justify-center items-center mt-10">
        <div className="mr-10">
          <Button variant="contained" onClick={handleLogout}>Logout</Button>
        </div>
        <div className="z-0">
          <Fab size="small" color="secondary" aria-label="add" onClick={handleOpenEdit}>
            <EditIcon />
          </Fab>
        </div>
      </div>
      <div className='relative w-full'>
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
                      <Avatar key={idx} className="mt-[10px]" sx={{ bgcolor: red[50], width: 100, height: 100 }} src={dataURL} />
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
                  <p className='font-normal font-kanit text-orange-600 text-xl text-center mt-1'>{`In ${book.count} Queue${book.count > 1 ? 's' : ''}`}</p>
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
            <Button type="submit" onClick={ReBook}>ยืนยัน</Button>
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
            <Button type="submit" onClick={CanBook}>ยืนยัน</Button>
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
              const meetingTime = new Date(new Date(room.date).toLocaleDateString({ timeZone: 'Asia/Bangkok' }));

              // format the date using the toLocaleString() method
              const DateRoom = meetingTime.toLocaleString("th-TH", {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
              });

              const startTime = room.beginTime.slice(0, 5);
              const endTime = room.endTime.slice(0, 5);

              const today = new Date();
              const timeNow = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();


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
              )
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
              <Button type="submit" onClick={CancelRoom}>ยืนยัน</Button>
            </DialogActions>
          </form>
        </Dialog>

      </div>
    </>
  );
}

export default WithUser(ProfilePage);

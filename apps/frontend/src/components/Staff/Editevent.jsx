import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavbarStaff from '@/components/NavbarStaff'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import { eventcategory } from "@/utils/Eventcategory";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { eventdata } from "@/utils/eventdata";
import { Link, useNavigate } from "react-router-dom";
import { fetch } from '@/utils/Fetch';
import { popup } from '@/utils/Popup';
import { WithUser } from '@/components/Hoc/WithUser';

function Editevent() {

  const { eventid } = useParams();

  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [categories, setCategories] = useState(null);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [textdes, setText] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await fetch.get(`/events/${eventid}`);
      const eventRes = response.data;

      setEvent(eventRes);
      setName(eventRes.name);
      setLocation(eventRes.location);
      setSelectedCategory(eventRes.categories);
      setText(eventRes.description);
      setImageData(eventRes.image);
      setSelectedDate(dayjs(eventRes.meetingTime));
      setSelectedDateEnd(dayjs(eventRes.endTime));
    }

    const fetchCategories = async () => {
      const response = await fetch.get('/event-categories');
      setCategories(response.data);
    }

    fetchEvent();
    fetchCategories();
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleText = (event) => {
    setText(event.target.value)
  };

  //add cat
  const [open, toggleOpen] = useState(false);
  const [inputEditValue, setInputEditValue] = useState('');

  const handleClose = () => {
    setInputEditValue(null);
    toggleOpen(false);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    handleClose();
    addCategory(inputEditValue);
  };

  function addCategory(newcat) {
    // Generate a unique id for the new category
    const newCategoryId = NaN;

    // Create a new category object with the generated id and the new category name
    const newCategory = {
      id: newCategoryId,
      name: newcat
    };

    setCategories((prev) => {
      return [...prev, newCategory];
    });
  }

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

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateEnd, setSelectedDateEnd] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleDateEndChange = (dateend) => {
    setSelectedDateEnd(dateend);
  };

  const submit = async (event) => {
    event.preventDefault();

    const data = {
      name: name,
      categories: selectedCategory.map(cat => cat.name),
      description: textdes,
      location: location,
      meetingTime: selectedDate,
      endTime: selectedDateEnd,
    };

    try {
      const response = await fetch.put(`/events/${eventid}`, data);
      
      if (typeof imageData !== 'string') {
        await fetch.put(`/events/${eventid}/image`, { image: imageData[0].split(',')[1] });
      }

      await popup.fire({
        icon: 'success',
        title: 'Update successful!',
        text: `${response.data.msg}`,
      })

      navigate('/staff');
    } catch (error) {
      const thisError = error.response.data.message;
      await popup.fire({
        icon: 'error',
        title: 'Update Failed!',
        text: Array.isArray(thisError) ? thisError.join(' / ') : thisError,
      })
    }
  }

  if (!event || !categories) {
    return (
      <div className='w-full h-full bg-gray-50'>
        <div className='fixed pt-12 ml-[3%] z-50'>
          <Link to={'/staff'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="absolute left-[3%] w-6 h-6 -translate-y-4 text-center">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg></Link>
        </div>
        <NavbarStaff
          bgcolor='bg-white hover:drop-shadow-md'
          textcolor='text-black'
        />
      </div>
    );
  }

  return (
    <>
      <div className='w-full h-full bg-gray-50'>
        <div className='fixed pt-12 ml-[3%] z-50'>
          <Link to={'/staff'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="absolute left-[3%] w-6 h-6 -translate-y-4 text-center">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg></Link>
        </div>
        <NavbarStaff
          bgcolor='bg-white hover:drop-shadow-md'
          textcolor='text-black'
        />
        <div className="w-[80%] mx-[10%] mb-[12.8%] pt-[20vh]">
          <div className="py-[10vh] px-[5vh] min-h-[70vh] bg-white rounded-sm drop-shadow-md">
            <div className="flex flex-col">
              <p className="font-poppins text-lg ml-4">Edit event</p>
              <Box
                component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' }, }}
                noValidate
                autoComplete="off"
              >
                <div className="my-[3vh] mx-[5vh]">
                  <TextField
                    required
                    label="ชื่อกิจกรรม"
                    defaultValue={event.name}
                    inputlabelprops={{
                      shrink: true,
                    }}
                    onChange={handleNameChange}
                    multiline
                    maxRows={2}
                  />
                  <TextField
                    label="สถานที่จัดกิจกรรม"
                    defaultValue={event.location}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={handleLocationChange}
                    multiline
                    maxRows={1}
                  />

                  <div className="absolute mt-[1.5%] ml-[44%]">
                    <Button onClick={() => toggleOpen(true)}>
                      เพิ่ม Category
                    </Button>
                  </div>
                  {/* add category */}
                  <Dialog open={open} onClose={handleClose}>
                    <form onSubmit={handleSubmit}>
                      <DialogTitle className='text-center'>เพิ่ม Event Category</DialogTitle>
                      <hr />
                      <DialogContent>
                        <DialogContentText className='px-5'>
                          โปรดระบุ Category ใหม่
                        </DialogContentText>
                        <div className='flex justify-center'>
                          <TextField
                            autoFocus
                            margin="dense"
                            value={inputEditValue}
                            type="text"
                            variant="standard"
                            onChange={(e) =>
                              setInputEditValue(e.target.value)
                            }
                          /></div>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>ยกเลิก</Button>
                        <Button type="submit">ยืนยัน</Button>
                      </DialogActions>
                    </form>
                  </Dialog>
                  <Autocomplete
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    multiple
                    onChange={(event, value) => {
                      setSelectedCategory(value)
                    }}
                    options={categories}
                    getOptionLabel={(option) => option.name}
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Category"
                        placeholder="โปรดระบุ Category หรือกด เพิ่ม Category"
                      />
                    )}
                    defaultValue={categories.filter(cat => event.categories.map(ca => ca.name).includes(cat.name))}
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                      <DateTimePicker
                        label="วัน-เวลาเริ่มกิจกรรม"
                        defaultValue={dayjs(event.meetingTime)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        ampm={false}
                        value={selectedDate}
                        onChange={handleDateChange} />
                      <DateTimePicker
                        label="วัน-เวลาสิ้นสุดกิจกรรม"
                        defaultValue={dayjs(event.endTime)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        ampm={false}
                        value={selectedDateEnd}
                        onChange={handleDateEndChange} />
                    </DemoContainer>
                  </LocalizationProvider>
                  <TextField
                    InputProps={{
                      style: {
                        width: '204%',
                        height: '250px',
                        padding: '16px'
                      }
                    }}
                    id="outlined-multiline-static"
                    multiline
                    rows={10}
                    onChange={handleText}
                    label="รายละเอียด"
                    placeholder="เรื่องย่อหรือรายละเอียดกิจกรรม .."
                    defaultValue={event.description}
                    InputLabelProps={{
                      shrink: true,
                    }}
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
                    onChange={onImageChange} />
                  {Array.isArray(imageData) && imageData.map((dataURL, idx) => (
                    <img key={idx} className="w-3/12" src={dataURL} />
                  ))}
                </div>
                <button
                  className="ml-[11.5vh] text-center bg-[#0092BF] text-white hover:bg-[#007396] border-black border-2 rounded-full"
                  onClick={submit}
                >
                  <p className="font-poppins text-md p-[8px] px-[20px]">Save Change</p>
                </button>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default WithUser(Editevent);

import React, { useState, useEffect } from 'react';
import EventforSt from '@/components/Staff/EventforSt'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { eventcategory } from '@/utils/Eventcategory';
import { Link } from 'react-router-dom';
import { fetch } from '@/utils/Fetch';
import { popup } from '@/utils/Popup';


const filter = createFilterOptions();

export default function StaffEvent() {

  const [filteredEvent, setFilteredEvent] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [events, setEvents] = useState(null);
  const [categories, setCategories] = useState(null);
  const [downloadEvents, setDownloadEvents] = useState(true);
  const [downloadCategories, setDownloadCategories] = useState(true);

  const handleKeyDown = (event) => {
    const keyword = event.target.value;
    setSearchTerm(keyword);
  }

  useEffect(() => {

    function matchingevent() {

      if (!events) return [];

      return events.filter((e) =>
        e.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredEvent(matchingevent());
  }, [searchTerm, events]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch.get('/events');
      setEvents(response.data);
    }

    const fetchCategories = async () => {
      const response = await fetch.get('/event-categories')
      setCategories(response.data);
    }

    if (downloadEvents) {
      fetchEvents();
      setDownloadEvents(false);
    }

    if (downloadCategories) {
      fetchCategories();
      setDownloadCategories(false);
    }

  }, [downloadEvents, downloadCategories]);

  const [value, setValue] = useState(null);
  const [open, toggleOpen] = useState(false);

  const handleClose = () => {
    setDialogValue({
      id: '',
      name: '',
    });
    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = useState({
    id: '',
    name: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setValue({
      id: dialogValue.id,
      name: dialogValue.name,
    });
    handleClose();
    addCategory();
  };

  async function addCategory() {
    try {
      const response = await fetch.post('/event-categories', { name: dialogValue.name });

      setValue(null);
      setDownloadCategories(true);

      await popup.fire({
        icon: 'success',
        title: 'Create successful!',
        text: `${response.data.msg}`,
      })

    } catch (error) {
      const thisError = error.response.data.message;
      await popup.fire({
        icon: 'error',
        title: 'Create Failed!',
        text: Array.isArray(thisError) ? thisError.join(' / ') : thisError,
      })
    }
  }

  const [openEdit, toggleOpenEdit] = useState(false);

  const handleCloseEdit = () => {
    toggleOpenEdit(false);
    setInputEditValue(null)
  };

  const handleSubmitEdit = (event) => {
    event.preventDefault();
    handleCloseEdit();
  };

  const [inputEditValue, setInputEditValue] = useState('');

  async function renameCategory(categoryId, inputEditValue) {

    if (inputEditValue === null) {
      alert('โปรดระบุ Category ที่เปลี่ยน');
      setRenamingCategoryId(null);
      return;
    }

    try {
      const response = await fetch.put(`/event-categories/${categoryId}`, { name: inputEditValue });

      setValue(null);
      setDownloadCategories(true);

      await popup.fire({
        icon: 'success',
        title: 'Update successful!',
        text: `${response.data.msg}`,
      })

    } catch (error) {
      const thisError = error.response.data.message;
      await popup.fire({
        icon: 'error',
        title: 'Update Failed!',
        text: Array.isArray(thisError) ? thisError.join(' / ') : thisError,
      })
    }
  }

  const [openDel, toggleOpenDel] = useState(false);

  const handleCloseDel = () => {
    toggleOpenDel(false);

  };

  const handleSubmitDel = (event) => {
    event.preventDefault();
    handleCloseDel();

  };


  async function delCategory(CategoryId) {
    
    try {
      const response = await fetch.delete(`/event-categories/${CategoryId}`);

      setValue(null);
      setDownloadCategories(true);

      await popup.fire({
        icon: 'success',
        title: 'Delete successful!',
        text: `${response.data.msg}`,
      })

    } catch (error) {
      const thisError = error.response.data.message;
      await popup.fire({
        icon: 'error',
        title: 'Delete Failed!',
        text: Array.isArray(thisError) ? thisError.join(' / ') : thisError,
      })
    }
  }

  if (!events || !categories) {
    return (
      <div className="w-full h-[700px] pt-[2rem] px-[8rem] max-sm:px-[20px] max-lg:px-[4rem]"></div>
    );
  }

  return (
    <>
      <div className="w-full h-[700px] pt-[2rem] px-[8rem] max-sm:px-[20px] max-lg:px-[4rem]">
        <div className="w-full ">
          <div className='pl-[5%]'>
            <h1 className=' font-medium font-kanit text-xl text-[#454545] mb-[15px]'>Category</h1>
            <Autocomplete
              className='ml-5 mt-5'
              value={value}
              onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                  // timeout to avoid instant validation of the dialog's form.
                  setTimeout(() => {
                    toggleOpen(true);
                    setDialogValue({
                      id: '',
                      name: newValue,
                    });
                  });
                } else if (newValue && newValue.inputValue) {
                  toggleOpen(true);
                  setDialogValue({
                    id: '',
                    name: newValue.inputValue,
                  });
                } else {
                  setValue(newValue);
                }
              }}

              filterOptions={(options, params) => {
                const filtered = filter(options, params);

                if (params.inputValue !== '') {
                  filtered.push({
                    inputValue: params.inputValue,
                    name: `Add "${params.inputValue}"`,
                  });
                }
                return filtered;
              }}
              options={categories}
              getOptionLabel={(option) => {
                // e.g value selected with enter, right from the input
                if (typeof option === 'string') {
                  return option;
                }
                if (option.inputValue) {
                  return option.inputValue;
                }
                return option.name;
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              renderOption={(props, option) => <li {...props}>{option.name}</li>}
              sx={{ width: 300 }}
              freeSolo
              renderInput={(params) => <TextField {...params} label="ค้นหา Category" />}
            />
            {/* add category */}
            <Dialog open={open} onClose={handleClose}>
              <form onSubmit={handleSubmit}>
                <DialogTitle className='text-center'>เพิ่ม Category Event</DialogTitle>
                <hr />
                <DialogContent>
                  <DialogContentText className='px-5'>
                    คุณแน่ใจหรือไม่ว่าต้องการเพิ่ม '{dialogValue.name}' เป็น Category ใหม่
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>ยกเลิก</Button>
                  <Button type="submit">ยืนยัน</Button>
                </DialogActions>
              </form>
            </Dialog>

            {/* del category */}
            <Dialog open={openDel} onClose={handleCloseDel}>
              <form onSubmit={handleSubmitDel}>
                <DialogTitle className='text-center'>ลบ Category Event</DialogTitle>
                <hr />
                <DialogContent>
                  <DialogContentText className='px-5'>
                    คุณแน่ใจหรือไม่ว่าต้องการลบ '{value !== null ? value.name : 'null'}' ออกจาก Category Event
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDel}>ยกเลิก</Button>
                  <Button type="submit" onClick={() => delCategory(value.id)}>ยืนยัน</Button>
                </DialogActions>
              </form>
            </Dialog>

            {/* edit category */}
            <Dialog open={openEdit} onClose={handleCloseEdit}>
              <form onSubmit={handleSubmitEdit}>
                <DialogTitle className='text-center'>แก้ไข Category Event</DialogTitle>
                <hr />
                <DialogContent>
                  <DialogContentText className='px-5'>
                    ระบุชื่อ Category ใหม่ที่ต้องการใช้แทน {value !== null ? value.name : 'null'}
                  </DialogContentText>
                  <div className='flex justify-center'>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      value={inputEditValue}
                      type="text"
                      variant="standard"
                      onChange={(e) =>
                        setInputEditValue(e.target.value)
                      }
                    /></div>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseEdit}>ยกเลิก</Button>
                  <Button type="submit" onClick={() => renameCategory(value.id, inputEditValue)}>ยืนยัน</Button>
                </DialogActions>
              </form>
            </Dialog>
            <button
              className="absolute left-[42%] -translate-y-[70px] w-auto p-[8px] px-[20px] h-auto 
                                mx-[99px] rounded-full bg-[#0092BF]  hover:bg-[#007396] font-regular font-poppins text-white
                                 my-[20px] ease-out duration-300 border-2" onClick={() => {
                if (value === null) {
                  alert('ระบุ Category ที่ต้องการแก้ไข');
                } else {
                  toggleOpenEdit(true);
                }
              }}
            >edit</button>
            <button
              className="absolute right-[41%] -translate-y-[64px] w-auto p-[10px] ml-[44px] rounded-full bg-[#F44336] border-2 hover:bg-[#c5342a] font-regular font-poppins text-white text-md mt-[16px] ease-out duration-300"
              onClick={() => {
                if (value === null) {
                  alert('ระบุ Category ที่ต้องการลบ');
                } else {
                  toggleOpenDel(true);
                }
              }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>
            <h1 className=' font-medium font-kanit text-xl text-[#454545] mt-[30px]'>ค้นหากิจกรรม</h1>
            <div className="relative flex items-center ml-[18%] -translate-y-8 h-10 w-[50%] rounded-lg focus-within:shadow-lg
                         bg-white overflow-hidden border-2">
              <div className="grid place-items-center h-full w-12 text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                type="text"
                id="search"
                placeholder="ชื่อกิจกรรมที่ต้องการแก้ไขหรือลบ.."
                onChange={handleKeyDown}
              />
            </div>
            <Link to={'/staff/event/create'}>
              <button className="absolute right-[34%] -translate-y-[94px] w-auto p-[8px] h-auto border-2 rounded-full bg-[#3AAF3C]  hover:bg-[#2e9330] font-semibold font-poppins text-white my-[20px] ease-out duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </Link>
            <div className='max-w-[50vw] min-w-[40vw] h-[77vh] grid gap-0 grid-auto-fit-[241px] overflow-y-scroll overflow-x-hidden pt-3 px-9'>
              {events.map((data) => (
                <EventforSt
                  key={data.id}
                  id={data.id}
                  image={data.image}
                  name={data.name}
                  categories={data.categories}
                  description={data.description}
                  location={data.location}
                  meetingTime={data.meetingTime}
                  endTime={data.endTime}
                  onDelete={setDownloadEvents}
                  onClick={() => handleEventClick(data)}
                />))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

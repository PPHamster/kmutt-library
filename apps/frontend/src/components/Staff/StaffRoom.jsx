import React, { useState, useEffect } from 'react';
import RoomforSt from '@/components/Staff/RoomforSt'
import { roomdata } from '@/utils/roomdata';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { timeperiod } from '@/utils/timeperiod';
import { Link } from 'react-router-dom';

const filter = createFilterOptions();

export default function StaffRoom() {

  const [filteredRoom, setFilteredRoom] = useState(roomdata);
  const [searchTerm, setSearchTerm] = useState('');
  const [beginTime, setBeginTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const handleBeginTimeChange = (newTime) => {
    setBeginTime(newTime);
  };

  const handleEndTimeChange = (newTime) => {
    setEndTime(newTime);
  };

  const handleKeyDown = (event) => {
    const keyword = event.target.value;
    setSearchTerm(keyword);
  }

  useEffect(() => {

    function matchingroom() {

      return roomdata.filter((room) =>
        room.roomname.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredRoom(matchingroom());
  }, [searchTerm]);

  const [value, setValue] = useState(null);
  const [open, toggleOpen] = useState(false);

  const handleClose = () => {
    setBeginTime(null);
    setEndTime(null);
    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = useState({
    id: '',
    begin: '',
    end: '',
});

  const handleSubmit = (event) => {
    event.preventDefault();
    handleClose();
    if (!beginTime || !endTime) {
      alert('โปรดระบุเวลาเริ่มต้นและเวลาสิ้นสุด');
      return toggleOpen(true);
    }
    if (beginTime && endTime) {
      addTime(beginTime, endTime);
    }
  };

  function addTime(beginTime, endTime) {
    // Generate a unique id for the new TimePeriod
    const newId = NaN;

    // Create a new TimePeriod object with the generated id and the new begin and end times
    const newTimePeriod = {
      id: newId,
      begin: beginTime.format('HH:mm'),
      end: endTime.format('HH:mm'),
    };

    // Add the new TimePeriod to the timeperiod array
    timeperiod.push(newTimePeriod);
  }

  const [openEdit, toggleOpenEdit] = useState(false);

  const handleCloseEdit = () => {
    toggleOpenEdit(false);
    setBeginTime(null);
    setEndTime(null);
  };

  const handleSubmitEdit = (event) => {
    event.preventDefault();
    handleCloseEdit();
  };

  function editTime(Id) {
    // Find the category object with the specified id
    const Index = timeperiod.findIndex(c => c.id === Id);

    if (!beginTime || !endTime) {
      alert('โปรดระบุเวลาเริ่มต้นและเวลาสิ้นสุด');
      return toggleOpenEdit(true);
    }

    // Update the name property of the category object
    timeperiod[Index].begin = beginTime.format('HH:mm');
    timeperiod[Index].end = endTime.format('HH:mm');
  };

  const [openDel, toggleOpenDel] = useState(false);

  const handleCloseDel = () => {
    toggleOpenDel(false);

  };

  const handleSubmitDel = (event) => {
    event.preventDefault();
    handleCloseDel();
  };


  function delTime(Id) {
    const index = timeperiod.findIndex((c) => c.id === Id);

    if (index !== -1) {
      timeperiod.splice(index, 1);
    }
  }

  return (
    <>
      <div className="w-full h-[700px] pt-[2rem] px-[8rem] max-sm:px-[20px] max-lg:px-[4rem]">
        <div className="w-full ">
          <div className='pl-[5%]'>
            <h1 className=' font-medium font-kanit text-xl text-[#454545] mb-[15px]'>TimePeriod</h1>
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
                      begin: newValue,
                      end: '',
                    });
                  });
                } else if (newValue && newValue.inputValue) {
                  toggleOpen(true);
                  setDialogValue({
                    id: '',
                    begin: newValue.inputValue,
                    end: '',
                  });
                } else {
                  setValue(newValue);
                }
              }}

              filterOptions={(options, params) => {
                const filtered = filter(options, params);

                if (params.inputValue == 'New') {
                  filtered.push({
                    inputValue: params.inputValue,
                    begin: `Add TimePeriod`,
                    end: '',
                  });
                }
                return filtered;
              }}
              options={timeperiod}
              getOptionLabel={(option) => {
                // e.g value selected with enter, right from the input
                if (typeof option === 'string') {
                  return option;
                }
                if (option.inputValue) {
                  return option.inputValue;
                }
                return `${option.id} ${option.begin} - ${option.end}`;
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              renderOption={(props, option) => <li {...props}>{option.id} {option.begin} - {option.end} </li>}
              sx={{ width: 300 }}
              freeSolo
              renderInput={(params) => <TextField {...params} label="ค้นหา TimePeriod หรือ New เพื่อเพิ่มใหม่" />}
            />
            {/* add time */}
            <Dialog open={open} onClose={handleClose}>
              <form onSubmit={handleSubmit}>
                <DialogTitle className='text-center'>เพิ่ม TimePeriod</DialogTitle>
                <hr />
                <DialogContent>
                  <DialogContentText className='px-5 text-center'>
                    โปรดระบุ TimePeriod ใหม่
                  </DialogContentText>
                  <div className='flex justify-center'>
                    <div className='mx-[10px]'>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['TimePicker']}>
                          <TimePicker label="Begin" ampm={false} value={beginTime} onChange={handleBeginTimeChange} />
                        </DemoContainer>
                      </LocalizationProvider>
                    </div>
                    <div className='mx-[10px] mb-[10px]'>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['TimePicker']}>
                          <TimePicker label="End" ampm={false} value={endTime} onChange={handleEndTimeChange} />
                        </DemoContainer>
                      </LocalizationProvider>
                    </div>
                  </div>
                  <DialogContentText className='px-5'>
                    {beginTime && endTime
                      ? `คุณแน่ใจหรือไม่ว่าต้องการเพิ่ม '${beginTime.format('HH:mm')} - ${endTime.format('HH:mm')}' เป็น TimePeriod ใหม่`
                      : 'โปรดเลือกเวลาเริ่มต้นและเวลาสิ้นสุด'}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>ยกเลิก</Button>
                  <Button type="submit">ยืนยัน</Button>
                </DialogActions>
              </form>
            </Dialog>

            {/* del time */}
            <Dialog open={openDel} onClose={handleCloseDel}>
              <form onSubmit={handleSubmitDel}>
                <DialogTitle className='text-center'>ลบ TimePeriod</DialogTitle>
                <hr />
                <DialogContent>
                  <DialogContentText className='px-5'>
                    คุณแน่ใจหรือไม่ว่าต้องการลบออกจาก TimePeriod
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDel}>ยกเลิก</Button>
                  <Button type="submit" onClick={() => delTime(value.id)}>ยืนยัน</Button>
                </DialogActions>
              </form>
            </Dialog>

            {/* edit category */}
            <Dialog open={openEdit} onClose={handleCloseEdit}>
              <form onSubmit={handleSubmitEdit}>
                <DialogTitle className='text-center'>แก้ไข TimePeriod</DialogTitle>
                <hr />
                <DialogContent>
                  <DialogContentText className='px-5'>
                    ระบุ TimePeriod ใหม่ที่ต้องการใช้แทน
                  </DialogContentText>
                  <div className='flex justify-center'>
                  <div className='mx-[10px]'>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['TimePicker']}>
                          <TimePicker label="Begin" ampm={false} value={beginTime} onChange={handleBeginTimeChange} />
                        </DemoContainer>
                      </LocalizationProvider>
                    </div>
                    <div className='mx-[10px] mb-[10px]'>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['TimePicker']}>
                          <TimePicker label="End" ampm={false} value={endTime} onChange={handleEndTimeChange} />
                        </DemoContainer>
                      </LocalizationProvider>
                    </div>
                    </div>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseEdit}>ยกเลิก</Button>
                  <Button type="submit" onClick={() => editTime(value.id)}>ยืนยัน</Button>
                </DialogActions>
              </form>
            </Dialog>
            <button
              className="absolute left-[42%] -translate-y-[70px] w-auto p-[8px] px-[20px] h-auto 
                                mx-[99px] rounded-full bg-[#0092BF]  hover:bg-[#007396] font-regular font-poppins text-white
                                 my-[20px] ease-out duration-300 border-2" onClick={() => {
                if (value === null) {
                  alert('ระบุ TimePeriod ที่ต้องการแก้ไข');
                } else {
                  toggleOpenEdit(true);
                }
              }}
            >edit</button>
            <button
              className="absolute right-[41%] -translate-y-[64px] w-auto p-[10px] ml-[44px] rounded-full bg-[#F44336] border-2 hover:bg-[#c5342a] font-regular font-poppins text-white text-md mt-[16px] ease-out duration-300"
              onClick={() => {
                if (value === null) {
                  alert('ระบุ TimePeriod ที่ต้องการลบ');
                } else {
                  toggleOpenDel(true);
                }
              }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>
            <h1 className=' font-medium font-kanit text-xl text-[#454545] mt-[30px]'>ค้นหาห้อง</h1>
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
                placeholder="ชื่อห้องที่ต้องการแก้ไขหรือลบ.."
                onChange={handleKeyDown}
              />
            </div>
            <Link to={'/staff/room/create'}>
              <button className="absolute right-[34%] -translate-y-[94px] w-auto p-[8px] h-auto border-2 rounded-full bg-[#3AAF3C]  hover:bg-[#2e9330] font-semibold font-poppins text-white my-[20px] ease-out duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </Link>
            <div className='max-w-[80vw] min-w-[40vw] h-[77vh] grid gap-5 gap-y-36 grid-auto-fit-[241px] overflow-y-scroll overflow-x-hidden pt-3 px-4'>
              {filteredRoom.map((data, index) => (
                <RoomforSt
                  key={index}
                  roomid={data.roomid}
                  image={data.image}
                  roomname={data.roomname}
                  size={data.size}
                  status={data.status}
                  onClick={() => handleRoomClick(data)}
                />))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

import React, { useEffect, useState } from "react";
import NavbarStaff from "../NavbarStaff";
import Box from '@mui/material/Box';
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
import { timeperiod } from "@/utils/timeperiod";
import { Link } from "react-router-dom";

const filter = createFilterOptions();

export default function NewRoom() {

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  //for search timeperiod
  const [filteredtime, setFilteredTime] = useState(timeperiod);
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

    function matchingtime() {

      return timeperiod.filter((time) =>
        time.begin.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTime(matchingtime());
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

  const submit = (event) => {
    event.preventDefault();
    console.log({
      title: name,
      image: imageData,
      location: location,
      timeperiod: value,
    })
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
              <p className="font-poppins font-semibold text-lg ml-4">Create new room</p>
              <Box
                component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' }, }}
                noValidate
                autoComplete="off"
              >
                <div className="my-[3vh] mx-[5vh]">
                  <TextField
                    required
                    label="ชื่อห้อง"
                    onChange={handleNameChange}
                    multiline
                    maxRows={2}
                  />
                  <TextField
                    label="สถานที่"
                    onChange={handleLocationChange}
                    multiline
                    maxRows={1}
                  />
                 <div className="absolute mt-[1.5%] ml-[44%]">
                    <Button onClick={() => toggleOpen(true)}>
                    เพิ่มช่วงเวลา
                  </Button>
                  </div> 
                  <div className="flex items-center">
                  <Autocomplete
                    value={value || []}
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
                      } else {
                        setValue(newValue);
                      }
                    }}

                    filterOptions={(options, params) => {
                      const filtered = filter(options, params);
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
                    multiple
                    filterSelectedOptions
                    renderInput={(params) => <TextField {...params} label='ช่วงเวลาที่เปิดบริการ' placeholder="ถ้าไม่มีช่วงเวลาที่ต้องการกด เพิ่มช่วงเวลา" />}
                  />
                  </div>
                  
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
                </div>
                <div className="my-[3vh] ml-[11.5vh]">
                  <input type="file"
                    className=" file:rounded-full file:bg-white
                              file:hover:bg-gray-200 file:font-normal 
                                file:font-poppins file:text-black file:ease-out 
                                file:duration-300 file:border-2 font-poppins file:p-[8px] 
                                file:px-[20px] file:mr-5"
                    multiple
                    accept="image/*"
                    onChange={onImageChange} />
                  {imageData.map((dataURL, idx) => (
                    <img key={idx} className="w-3/12" src={dataURL} />
                  ))}
                </div>
                <button
                  className="ml-[11.5vh] text-center bg-[#0092BF] text-white hover:bg-[#007396] border-black border-2 rounded-full"
                  onClick={submit}
                >
                  <p className="font-poppins text-md p-[8px] px-[20px]">Create</p>
                </button>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

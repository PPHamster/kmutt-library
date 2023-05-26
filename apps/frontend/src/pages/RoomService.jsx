import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { fetch } from '@/utils/Fetch';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import NavbarStatic from "@/components/NavbarStatic";
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useEffect } from 'react';

const data = [
  { id: 69070501001, firstname: 'Haahahahahahaaa', lastname: 'Mairuruururururuur', email: 'john@example.com', tel: '1234567890', role: 'User', branch: 'COMPUTER ENGINEERING', registYear: 2020, blacklist: false },
  { id: 69070501002, firstname: 'John', lastname: 'Doe', email: 'johnnathanlnwza007@example.com', tel: '1234567890', role: 'Admin', branch: 'Branch A', registYear: 2020, blacklist: false },
  { id: 69070501003, firstname: 'John', lastname: 'Doe', email: 'john@example.com', tel: '1234567890', role: 'User', branch: 'Branch A', registYear: 2020, blacklist: false },
  { id: 69070501004, firstname: 'John', lastname: 'Doe', email: 'john@example.com', tel: '1234567890', role: 'User', branch: 'Branch A', registYear: 2020, blacklist: false },
  { id: 69070501005, firstname: 'John', lastname: 'Doe', email: 'john@example.com', tel: '1234567890', role: 'User', branch: 'Branch A', registYear: 2020, blacklist: false },
  { id: 69070501006, firstname: 'John', lastname: 'Doe', email: 'john@example.com', tel: '1234567890', role: 'User', branch: 'Branch A', registYear: 2020, blacklist: false },
  { id: 69070501007, firstname: 'John', lastname: 'Doe', email: 'john@example.com', tel: '1234567890', role: 'User', branch: 'Branch A', registYear: 2020, blacklist: false },
  { id: 69070501008, firstname: 'John', lastname: 'Doe', email: 'john@example.com', tel: '1234567890', role: 'User', branch: 'Branch A', registYear: 2020, blacklist: false },
  { id: 69070501009, firstname: 'John', lastname: 'Doe', email: 'john@example.com', tel: '1234567890', role: 'User', branch: 'Branch A', registYear: 2020, blacklist: false },
  { id: 69070501010, firstname: 'John', lastname: 'Doe', email: 'john@example.com', tel: '1234567890', role: 'Admin', branch: 'Branch A', registYear: 2020, blacklist: false },
];

export default function RoomService() {
  const { roomid } = useParams();

  //style
  const headStyle = "font-poppins font-semibold text-xl mb-2"
  const textStyle = "font-kanit font-light text-lg"

  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [room, setRoom] = useState(null);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [selectedTime, setSelectedTime] = useState("8:00 - 10:00");
  const [timePeriodSelected, setTimePeriodSelected] = useState(0);
  const [user, setUser] = useState([]);

  const handleChange = (event) => {
    setSelectedTime(event.target.value);
    const [beginTime, endTime] = event.target.value.split("-").map(time => time.trim());
    setTimePeriodSelected(room.timePeriods.find((time) => {
      return time.beginTime === beginTime && time.endTime === endTime;
    }));
  };

  const handleOnClick = () => {
    console.log(selectedDate.format("YYYY-MM-DD"))
    console.log(timePeriodSelected.id)
  }

  const timePeriodToString = (timePeriod) => {
    return `${timePeriod.beginTime} - ${timePeriod.endTime}`;
  }

  function ClosePage(props) {

    return (
      <div className="w-screen h-screen bg-slate-200">
        <div className="relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <img src={props.image} className="mx-auto max-w-full h-auto w-60" alt="Maintenance" />
          <p>This room is currently {props.textstatus} Please check back later.</p>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch.get(`rooms/${roomid}`);
      setRoom(response.data);
      setSelectedTime(timePeriodToString(response.data.timePeriods[0]));
      setTimePeriodSelected(response.data.timePeriods[0])
    }

    fetchData();
  }, []);

  if (!room) {
    return (
      <div className="min-h-screen">
        <NavbarStatic
          bgcolor='bg-white hover:drop-shadow-md'
          textcolor='text-black'
        />
      </div>
    )
  }

  if (room.status === 'Maintaining') {
    return (
      <ClosePage image='https://media.tenor.com/D0mtfd-0dgEAAAAi/tohru.gif' textstatus=" under maintenance. " />
    )
  }

  if (room.status === 'Closed') {
    return (
      <ClosePage image='https://media.tenor.com/IMIycxJ0LxUAAAAC/princess-connect.gif' textstatus=" not available. " />
    )
  }

  return (
    <>
      <NavbarStatic
        bgcolor='bg-white hover:drop-shadow-md'
        textcolor='text-black'
      />
      <div className="relative top-[120px] w-[95vw]">
        <div className="flex flex-row ml-[5vw] mt-[4vh]">
          <img className="w-[44vw] h-[225px] object-scale-down drop-shadow-lg" alt='book cover' draggable="false" src={room.image} />
          <div className="flex flex-col ml-[5vw] mt-1">
            <p className={headStyle}>{room.name}</p>
            <p className={textStyle}>สถานที่ 　 {room.location}</p>
            <div className='mt-4 font-light text-lg font-kanit whitespace-normal w-[55vw] h-[36px] max-h-[290px] border-b-2 mb-2'>
            </div>
          </div>
        </div>
        <div className="ml-[120px] mt-[50px] mb-[200px]">
          <p className="font-kanit text-3xl text-blue-700 font-medium ml-[40px] mb-8">การจอง</p>
          <div className="flex flex-row">
            <div className="w-[370px] py-9 bg-white rounded-md drop-shadow-md mb-10">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  value={selectedDate}
                  onChange={handleDateChange}
                  orientation="portrait"
                  disablePast
                  maxDate={dayjs().add(7, 'day')}
                />
              </LocalizationProvider>
            </div>
            <div className="ml-32 flex flex-col">
              <p className='font-kanit text-2xl text-blue-700 font-light mb-2'>ช่วงเวลา</p>
              <div className="ml-6">
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={selectedTime}
                    name="time-radio"
                  >
                    {room.timePeriods.map((timePeriod) => (
                      <FormControlLabel
                        value={timePeriodToString(timePeriod)}
                        control={<Radio />}
                        onChange={handleChange}
                        label={timePeriodToString(timePeriod)}
                        key={timePeriod.id}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </div>
              <p className='font-kanit text-2xl text-blue-700 font-light mb-2 mt-4'>ผู้เข้าใช้งาน</p>
              <div className="ml-6">
                <Box
                  component="form"
                  sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' }, }}
                  noValidate
                  autoComplete="off"
                >
                  <Autocomplete
                    multiple
                    options={data}
                    getOptionLabel={(option) => `${option.id}, ${option.firstname}`}
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="User"
                        placeholder="ระบุผู้ใช้งานทั้งหมด"
                      />
                    )}
                    onChange={(event, value) => {
                      setUser(value)
                    }}
                  />
                </Box>
              </div>
              <div className="mt-8 ml-1 font-kanit text-md">| {selectedDate.format("YYYY-MM-DD")} เวลา {selectedTime}</div>
              <div className=" ml-1 font-kanit text-md">
              <p className='mb-2'>| ผู้เข้าใช้งาน</p>
                <ul className="ml-6">
                  {user.map((data, index) => (
                    <li key={index}> {data.firstname.trim()} {data.lastname.trim()} {data.branch.trim()}</li>
                  ))}
                </ul>
              </div>
              <button
                className="w-[110px] h-[30px] rounded-full bg-white border-2 hover:bg-gray-200 font-regular font-poppins text-[#696969] text-md mt-[22px] ease-out duration-300"
                onClick={handleOnClick}
              >จอง
              </button>
            </div>
          </div>

        </div>

      </div>

    </>
  );
}

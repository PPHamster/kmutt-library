import React , { useState } from "react";
import { useParams } from "react-router-dom";
import { roomdata } from "@/utils/roomdata";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import NavbarStatic from "@/components/NavbarStatic";
import dayjs from 'dayjs';
import 'dayjs/locale/en';


export default function RoomService() {
  const { roomid } = useParams();

  // Find the room data 
  const room = roomdata.find((room) => room.roomid === roomid);

   //style
  const headStyle = "font-poppins font-semibold text-xl mb-2"
  const textStyle = "font-kanit font-light text-lg"
  let statusStyle = textStyle;
  if (room.status !== 'open') statusStyle = 'text-orange-600 font-kanit font-light text-lg'

  const [selectedDate, setSelectedDate] = useState(dayjs());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [selectedTime, setSelectedTime] = useState("8:00 - 10:00");

  const handleChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleOnClick = () => {
    console.log(selectedDate.format("YYYY-MM-DD") ,selectedTime)
  }
  function ClosePage(props) {
    
    return (
      <div className="w-screen h-screen bg-slate-200">
        <div className="relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <img src={props.image} className="mx-auto max-w-full h-auto w-60" alt="Maintenance"/>
          <p>This room is currently {props.textstatus} Please check back later.</p>
        </div>
      </div>
    );
  }


  if (room.status === 'maintenance') {
    return (
    <ClosePage image='https://media.tenor.com/D0mtfd-0dgEAAAAi/tohru.gif' textstatus=" under maintenance. " />
    )
  }
  if (room.status === 'closed') {
    return (
     <ClosePage image='https://media.tenor.com/IMIycxJ0LxUAAAAC/princess-connect.gif' textstatus=" not available. " />
    )
  }
  return (
    <>
     <NavbarStatic
        bgcolor = 'bg-white hover:drop-shadow-md' 
        textcolor = 'text-black'
      />
      <div className="relative top-[120px] w-[95vw]">
        <div className="flex flex-row ml-[5vw] mt-[4vh]">
          <img className="w-[44vw] h-[225px] object-scale-down drop-shadow-lg" alt='book cover' draggable="false" src={'../../' + room.image} />
          <div className="flex flex-col ml-[5vw] mt-1">
            <p className={headStyle}>{room.roomname}</p>
            <p className={textStyle}>ขนาด 　 {room.size} คน</p>
            <p className={textStyle}>ระยะเวลา 　 {room.periodtime}</p>
            <p className={statusStyle}>สถานะ 　 {room.status}</p>
            <p className={textStyle}>สถานที่ 　 {room.location}</p>
            <div className='mt-4 font-light text-lg font-kanit whitespace-normal w-[55vw] h-[36px] max-h-[290px] border-b-2 mb-2'>
            </div>
          </div>
        </div>
        <div className="ml-[120px] mt-[50px]">
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
                      defaultValue="8:00 - 10:00"
                      name="time-radio"
                    >
                      <FormControlLabel value="8:00 - 10:00" control={<Radio />} onChange={handleChange} label="8:00 - 10:00" />
                      <FormControlLabel value="10:00 - 12:00" control={<Radio />} onChange={handleChange} label="10:00 - 12:00" />
                      <FormControlLabel value="13:00 - 15:00" control={<Radio />} onChange={handleChange} label="13:00 - 15:00" />
                      <FormControlLabel value="15:00 - 17:00" control={<Radio />} onChange={handleChange} label="15:00 - 17:00" />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div className="mt-8 ml-1 font-kanit text-md">| {selectedDate.format("YYYY-MM-DD")} เวลา {selectedTime}</div>
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
import React, { useState, useEffect } from 'react';
import { eventdata } from '@/utils/eventdata';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function EventforSt(props) {

  const infoEvent = 'max-h-[220px] max-w-[220px] rounded-lg object-scale-down mt-[20px] cursor-pointer';

  //Del
  const [openDel, toggleOpenDel] = useState(false);

  const handleCloseDel = () => {
    toggleOpenDel(false);

  };

  const handleSubmitDel = (event) => {
    event.preventDefault();
    handleCloseDel();
  };

  function delevent(Id) {
    // Find the index of the category with the matching id
    const index = eventdata.findIndex((c) => c.id === Id);

    // If the category was found, remove it from the categories array
    if (index !== -1) {
      eventdata.splice(index, 1);
    }
  }

  return (
    <div className='mx-[90px] -my-[16px] after:content-[""] after:table'>
      {/* column */}
      <div className='flex justify-center items-center w-2/4 px-5 float-left max-sm:w-full max-lg:w-2/4 max-lg:p-2'>
        {/* content */}

        <div className='bg-white border-2 rounded-lg  w-[300px] min-h-[320px] my-8 max-sm:my-2 max-lg:my-4 cursor-pointer  hover:drop-shadow-lg'>
          <div className='w-[220px] h-[250px] flex justify-center items-center mx-7'>

            <img src={props.eventimage} className={infoEvent} />
          </div>
          <p className='font-semibold font-kanit text-[#454545] text-base text-center'>{props.eventname}</p>
          <Link to={`/staff/event/${props.eventid}/edit`}>
          <button
            className=" translate-x-5 -translate-y-[6px] w-[80px] h-[35px] ml-[44px] rounded-full border-2 bg-[#0092BF]  hover:bg-[#007396] font-regular font-poppins text-white text-md mt-[16px] ease-out duration-300"
            onClick={props.onClick}
          >edit
          </button>
          </Link>
          <button
            className="-translate-y-1 w-auto p-[10px] ml-[44px] rounded-full bg-[#F44336] border-2 hover:bg-[#c5342a] font-regular font-poppins text-white text-md mt-[16px] ease-out duration-300"
            onClick={toggleOpenDel}
          ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>

          {/* del book */}
          <Dialog open={openDel} onClose={handleCloseDel}>
            <form onSubmit={handleSubmitDel}>
              <DialogTitle className='text-center'>ลบ Event</DialogTitle>
              <hr />
              <DialogContent>
                <DialogContentText className='px-5 text-center'>
                  คุณแน่ใจหรือไม่ว่าต้องการลบ <br /> {props.eventname} ออก
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDel}>ยกเลิก</Button>
                <Button type="submit" onClick={() => delevent(props.eventid)}>ยืนยัน</Button>
              </DialogActions>
            </form>
          </Dialog>
        </div>

      </div>
    </div>
  )
}

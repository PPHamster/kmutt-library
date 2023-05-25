import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { fetch } from '@/utils/Fetch';
import { popup } from '@/utils/Popup';

export default function BookforSt(props) {
  // image styles
  const imageStyle = 'h-[300px] w-[200px] rounded-lg object-scale-down';

  //Del
  const [openDel, toggleOpenDel] = useState(false);

  const handleCloseDel = () => {
    toggleOpenDel(false);

  };

  const handleSubmitDel = (event) => {
    event.preventDefault();
    handleCloseDel();
  };

  async function delbook(Id) {
    try {
      const response = await fetch.delete(`/books/${Id}`);

      props.onDelete(true);

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
  return (
    <div className='box-content h-[480px] w-[225px] pr-[25px] pl-[25px] bg-transparent'>
      <section className='h-[455px] w-[225px] bg-white rounded-[0.55rem] p-[17.5px] select-none mr-10 drop-shadow-md hover:drop-shadow-lg'>
        <img src={props.image} className={imageStyle} alt='book cover' draggable="false" onClick={props.onClick} />
        <p className='w-[190 px] h-[67px] font-bold font-roboto text-[#696969] whitespace-normal mt-2 text-base leading-[22px] text-center'>{props.title}</p>
        <Link to={`/staff/book/${props.id}/edit`}>
          <button
            className="absolute -translate-x-5 -translate-y-[2px] w-[80px] h-[35px] ml-[44px] rounded-full border-2 bg-[#0092BF]  hover:bg-[#007396] font-regular font-poppins text-white text-md mt-[16px] ease-out duration-300"
          >edit</button>
        </Link>
        <button
          className="absolute translate-x-20 -translate-y-1 w-auto p-[10px] ml-[44px] rounded-full bg-[#F44336] border-2 hover:bg-[#c5342a] font-regular font-poppins text-white text-md mt-[16px] ease-out duration-300"
          onClick={toggleOpenDel}
        ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </button>
      </section>

      {/* del book */}
      <Dialog open={openDel} onClose={handleCloseDel}>
        <form onSubmit={handleSubmitDel}>
          <DialogTitle className='text-center'>ลบหนังสือ</DialogTitle>
          <hr />
          <DialogContent>
            <DialogContentText className='px-5'>
              คุณแน่ใจหรือไม่ว่าต้องการลบ {props.title} ออก
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDel}>ยกเลิก</Button>
            <Button type="submit" onClick={() => delbook(props.id)}>ยืนยัน</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

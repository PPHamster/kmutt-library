import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { fetch } from '@/utils/Fetch';
import { popup } from '@/utils/Popup';

export default function BlogforSt(props) {

  const [openDel, toggleOpenDel] = useState(false);

  const handleCloseDel = () => {
    toggleOpenDel(false);

  };

  const handleSubmitDel = (event) => {
    event.preventDefault();
    handleCloseDel();
  };

  async function delBlog(Id) {
    try {
      const response = await fetch.delete(`/blogs/${Id}`);

      props.onDelete(true);

      await popup.fire({
        icon: 'success',
        title: 'Delete successful!',
        text: `${response.data.msg}`,
      })

    } catch (error) {
      await popup.fire({
        icon: 'error',
        title: 'Delete Failed!',
        text: error.message,
      })
    }
  }

  return (
    <>
      <div className="w-[240px] ml-[2vw] px-2 min-h-[460px] bg-white rounded-md drop-shadow-md">
        <div>
          <img src={props.book.image} className='m-[30px] w-[160px] min-h-[220px] max-h-[240px] object-scale-down rounded-lg drop-shadow-md' />
          <div className="px-2">
            <p className="w-[200px] whitespace-normal overflow-hidden mt-7 font-kanit text-lg text-gray-700">{props.blog.topic}</p>
            <p className="font-kanit text-md text-light text-gray-500">เรื่อง: {props.book.title}</p>

            <button
              className="absolute translate-x-10 -translate-y-1 w-auto p-[10px] ml-[44px] rounded-full bg-[#F44336] border-2 hover:bg-[#c5342a] font-regular font-poppins text-white text-md mt-[16px] ease-out duration-300"
              onClick={toggleOpenDel}
            ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* del blog */}
      <Dialog open={openDel} onClose={handleCloseDel}>
        <form onSubmit={handleSubmitDel}>
          <DialogTitle className='text-center'>ลบ Blog</DialogTitle>
          <hr />
          <DialogContent>
            <DialogContentText className='px-5'>
              คุณแน่ใจหรือไม่ว่าต้องการลบ {props.blog.topic} ออก
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDel}>ยกเลิก</Button>
            <Button type="submit" onClick={() => delBlog(props.blog.id)}>ยืนยัน</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

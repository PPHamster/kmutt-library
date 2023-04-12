import React, { useState, useEffect } from 'react';
import RoomforSt from '@/components/Staff/RoomforSt'
import { roomdata } from '@/utils/roomdata';

export default function StaffRoom() {

  //book selected
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [filteredRoom, setFilteredRoom] = useState(roomdata);
  const [searchTerm, setSearchTerm] = useState('');
  // book data handling
  const handleRoomClick = (room) => {
    setSelectedRoom(room);
  };

  // key press handling
  const handleKeyDown = (event) => {
    const keyword = event.target.value;
    setSearchTerm(keyword);
  }

  useEffect(() => {
    //filter data
    function matchingroom() {
      //text search
      return roomdata.filter((room) =>
        room.roomname.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredRoom(matchingroom());
  }, [searchTerm]);



  return (
    <>
      <div className="w-full h-[700px] pt-[2rem] px-[8rem] max-sm:px-[20px] max-lg:px-[4rem]">
        <div className="w-full ">
          <div className='pl-[5%]'>
            <h1 className=' font-medium font-kanit text-xl text-[#454545] mb-[15px]'>Category</h1>
            <button
              className="absolute left-[29%] -translate-y-[72px] w-auto p-[8px] px-[20px] h-auto 
                                mx-[99px] rounded-full bg-[#0092BF]  hover:bg-[#007396] font-regular font-poppins text-white
                                 my-[20px] ease-out duration-300 border-2"
            >see all</button>
            <button className="absolute left-[32%] -translate-y-[72px] w-auto p-[8px] h-auto border-2 rounded-full bg-[#3AAF3C]
                          hover:bg-[#2e9330] font-semibold font-poppins text-white my-[20px] ease-out duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
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
            <button className="absolute right-[34%] -translate-y-[94px] w-auto p-[8px] h-auto border-2 rounded-full bg-[#3AAF3C]  hover:bg-[#2e9330] font-semibold font-poppins text-white my-[20px] ease-out duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
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
      {selectedRoom && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-40">
          <Bookpopup
            book={selectedRoom}
            onClose={() => handleRoomClick(null)}
            open={selectedRoom !== null}
          />
        </div>
      )}
    </>
  )
}

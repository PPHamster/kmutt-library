import React , { useState } from 'react';
import Book from '@/components/Book';
import Room from '@/components/Room';
import Bookpopup from '@/components/Bookoverlay';
import { bookdata } from '@/utils/bookdata';
import { roomdata } from '@/utils/roomdata';

export default function Borrowbook() {

    const [SearchText, setSearchText] = useState('');
    const [selectedBook, setSelectedBook] = useState(null)

    // book data handling
    const handleBookClick = (book) => {
        setSelectedBook(book);
      };
    
    // key press handling
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          console.log(SearchText)
        }
    }

    //check list of categories
    const [checked, setChecked] = useState([]);
    const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
          updatedList = [...checked, event.target.value];
        } else {
          updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
      };
    const Category = ["English", "Japanese", "Action", "Comedy", "Romance"];
    
    // year publisher 
    const [yearpublisher, setYearpublisher] = useState(0);
    const [yearpublisherEnd, setYearpublisherEnd] = useState(new Date().getFullYear());
    const allow = /^[0-9\b]+$/;
    const handleYearStart = (event) => {
        if (event.target.value === '' || allow.test(event.target.value)) setYearpublisher(event.target.value)

    }
    const handleYearEnd = (event) => {
        if (event.target.value === '' || allow.test(event.target.value)) setYearpublisherEnd(event.target.value)
        
    }
    // publisher
    const [publisher, setPublisher] = useState('');
    // language 
    const Language = ["English", "Japanese", "Thai"]
    var currentValue = '';
    const handleValue = (event) => {
        currentValue = event;
    }

    //reversation room
    const [ selectedRoom, setSelectedRoom] = useState(null);

    //handle room select
    const handleRoomClick = (room) => {
        setSelectedRoom(room);
      };
    return (
        <>  
            <div className='relative flex flex-col min-h-[7vh] mb-64 top-[80px]'>
                <p className='font-kanit font-semibold text-3xl ml-[100px] mb-[22px] text-gray-800'>ยืมหนังสือ</p>
                <div className='flex flex-row'>  
                    <div className='w-[22.2vw] flex flex-col ml-[5.2vw]'>
                        <p className='font-kanit text-xl text-gray-700 font-medium mb-3'>หมวดหมู่</p>
                        <div className='max-h-[400px] px-3 pb-3 mb-3 overflow-y-auto text-sm text-gray-700'>
                            {Category.map((item, index) => (
                                <div key={index} className="p-1">  
                                    <div className="flex items-center mr-4 mb-2">  
                                        <input value={item} type="checkbox" id="item" name="category" className="opacity-0 absolute h-6 w-6" onChange={handleCheck} />  
                                            <div className="bg-white border-2 rounded-md border-blue-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">  
                                                <svg className="fill-current hidden w-3 h-3 text-blue-600 pointer-events-none" version="1.1" viewBox="0 0 17 12" xmlns="http://www.w3.org/2000/svg">  
                                                    <g fill="none" fillRule="evenodd">  
                                                        <g transform="translate(-9 -11)" fill="#1F73F1" fillRule="nonzero">  
                                                            <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />  
                                                        </g>  
                                                    </g>  
                                                </svg>  
                                            </div>  
                                        <label htmlFor="item" className="select-none">{item}</label>  
                                    </div>  
                                    </div>
                            ))}
                        </div>
                        <p className='font-kanit text-xl text-gray-700 font-medium mb-3'>ปีที่พิมพ์</p>
                        <div className='flex flex-row ml-3 mb-6 '>
                            <input 
                                type="number" 
                                className='peer h-[34px] w-[82px] outline-none text-sm text-gray-700 pl-2 pr-2 font-kanit border-2 border-gray-300 rounded-lg focus-within:shadow-md'
                                id='yearstart'
                                placeholder='เริ่มต้น'
                                onChange={handleYearStart}
                            />
                            <p className='pt-2 ml-3 mr-3 text-center'>-</p>
                            <input 
                                type="number" 
                                className='peer h-[34px] w-[82px] outline-none text-sm text-gray-700 pl-2 pr-2 font-kanit border-2 border-gray-300 rounded-lg focus-within:shadow-md'
                                id='yearstart'
                                placeholder='สุดท้าย'
                                onChange={handleYearEnd}
                            />
                        </div>
                        <p className='font-kanit text-xl text-gray-700 font-medium mb-2'>สำนักพิมพ์</p>
                        <div className='mb-2 '>
                        <input 
                                type="text" 
                                className='peer h-[34px] w-[180px] outline-none text-sm text-gray-700 pl-2 pr-2 ml-2 mb-3 font-kanit border-2 border-gray-300 rounded-lg focus-within:shadow-md'
                                id='yearstart'
                                placeholder='สำนักพิมพ์'
                                onChange={(e) => setPublisher(e.target.value)}  
                            />
                        </div>
                        <p className='font-kanit text-xl text-gray-700 font-medium mb-3'>ภาษา</p>
                        <div>
                        <div className='max-h-[400px] px-3 pb-3 mb-3 overflow-y-auto text-sm text-gray-700'>
                            {Language.map((item, index) => (
                                <div key={index} className="p-1">  
                                    <div className="flex items-center mr-4 mb-2">  
                                        <input value={item} type="radio" id="item" name="language" className="opacity-0 absolute h-6 w-6" onChange={(event) => handleValue(event.target.value)} />  
                                            <div className="bg-white border-2 rounded-md border-blue-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">  
                                                <svg className="fill-current hidden w-3 h-3 text-blue-600 pointer-events-none" version="1.1" viewBox="0 0 17 12" xmlns="http://www.w3.org/2000/svg">  
                                                    <g fill="none" fillRule="evenodd">  
                                                        <g transform="translate(-9 -11)" fill="#1F73F1" fillRule="nonzero">  
                                                            <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />  
                                                        </g>  
                                                    </g>  
                                                </svg>  
                                            </div>  
                                        <label htmlFor="item" className="select-none">{item}</label>  
                                    </div>  
                                    </div>
                            ))}
                        </div>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <div>
                            <div className='max-w-lg ml-[70px]'>
                                <div className="relative flex items-center w-full h-10 rounded-lg focus-within:shadow-lg bg-white overflow-hidden border-2">
                                    <div className="grid place-items-center h-full w-12 text-gray-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <input
                                    className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                                    type="text"
                                    id="search"
                                    placeholder="Search something.." 
                                    onChange={(event) => setSearchText(event.currentTarget.value)}
                                    onKeyDown={handleKeyDown}
                                    /> 
                                </div>
                            </div>
                        </div>
                        <div className='w-full min-h-[7vh] left-0 bg-white mt-4 '>
                            <div className='w-[80vw] h-[77vh] grid grid-auto-fit-[16rem] overflow-y-scroll overflow-x-hidden pt-3 px-9'>
                                    {bookdata.map((data) => (
                                        <Book 
                                        key={data.bookid}
                                        image={data.image} 
                                        bookname={data.bookname}
                                        onClick={() => handleBookClick(data)}
                                        id={setSelectedRoom}
                                    />))}
                            </div>
                        </div>                       
                    </div>
                    
                </div>
                <p className= 'font-kanit font-semibold text-3xl mt-12 ml-[100px] mb-[30px] text-gray-800'>จองห้อง co-working</p>
                <div className='w-[90vw] h-[70vh] grid gap-4 grid-auto-fit-[33rem] overflow-y-scroll overflow-x-hidden pb-12 px-12'>
                    {roomdata.map((data, index) => (
                        <Room
                            key={index}
                            roomid={data.roomid}
                            image={data.image}
                            roomname={data.roomname}
                            size={data.size}
                            status={data.status}
                            onclick={() => handleRoomClick(data)}
                        />                        
                    )) }

                </div>
            </div>

            {selectedBook && (
                    <div className="fixed top-0 left-0 right-0 bottom-0 z-40">
                        <Bookpopup 
                            book={selectedBook} 
                            onClose={() => handleBookClick(null)}
                            open={selectedBook !== null}
                        />
                    </div>
            )}
        </>
    )
    

}
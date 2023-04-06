import React , { useState } from 'react';
import Book from '@/components/Book';
import Bookpopup from '@/components/Bookoverlay';
import { bookdata } from '@/utils/bookdata';

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

    return (
        <>  
            <div className='relative flex flex-row min-h-[7vh] mb-64 top-[150px]'>
                <div className='w-[22.2vw] flex flex-col ml-[5.2vw]'>
                    <p className='font-kanit text-2xl text-gray-700 font-medium mb-3'>หมวดหมู่</p>
                    <div className='h-[400px] px-3 pb-3 overflow-y-auto text-sm text-gray-700'>
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
                    <p className='font-kanit text-2xl text-gray-700 font-medium mb-3'>ปีที่พิมพ์</p>
                    <div>
                        {/* years function */}
                    </div>
                    <p className='font-kanit text-2xl text-gray-700 font-medium mb-3'>สำนักพิมพ์</p>
                    <div>
                        {/* publisher function */}
                    </div>
                    <p className='font-kanit text-2xl text-gray-700 font-medium mb-3'>ภาษา</p>
                    <div>
                        {/* language function */}
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div>
                        <div className='max-w-lg ml-[70px]'>
                            <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden border-2">
                                <div className="grid place-items-center h-full w-12 text-gray-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                    <div className='w-full min-h-[7vh] left-0 bg-white mt-4'>
                        <div className='w-[80vw] h-[70vh] grid gap-4 grid-auto-fit-[17rem] overflow-y-scroll overflow-x-hidden p-12'>
                                {bookdata.map((data) => (
                                    <Book 
                                    key={data.bookid}
                                    image={data.image} 
                                    bookname={data.bookname}
                                    onClick={() => handleBookClick(data)}
                                />))}
                        </div>
                    </div>                       
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
import React , { useState } from 'react';
import Book from '@/components/Book';
import Bookpopup from '@/components/Bookoverlay';
import { bookdata } from '@/utils/bookdata';

export default function Borrowbook() {

    const [SearchText, setSearchText] = useState('');
    const [selectedBook, setSelectedBook] = useState(null)
    const handleBookClick = (book) => {
        setSelectedBook(book);
      };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          console.log(SearchText)
        }
    }

    return (
        <>  
            <div className='relative flex flex-row min-h-[7vh] mb-64 top-[150px]'>
                <div className='w-[22.2vw] flex flex-col'>

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
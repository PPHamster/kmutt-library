import React , { useState } from 'react';
import Book from '@/components/Book';
import Bookpopup from '@/components/Bookoverlay';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useEffect } from 'react';
import { fetch } from '@/utils/Fetch';

export default function Recommend() {

    const [books, setBooks] = useState([]);

    const [selectedBook, setSelectedBook] = useState(null)
    const handleBookClick = (book) => {
        setSelectedBook(book);
      };
      const renderPrevButton = ({ isDisabled }) => {
        return <span style={{ opacity: isDisabled ? '0.5' : 1 }}>&lt;</span>;
    };
    
    const renderNextButton = ({ isDisabled }) => {
        return <span style={{ opacity: isDisabled ? '0.5' : 1 }}>&gt;</span>;
    };

    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 3 },
        1280: { items: 4 },
        1440: { items: 5,
             itemsFit: 'contain',},
    };

    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch.get('/books/recommend?count=20');
        setBooks(response.data);
      }

      fetchData();
    }, []);

    return (
        <>
            <div className="flex h-[60vh] w-full left-0 top-0">
                <div className="bg-fixed bg-library bg-cover top-0 left-0 h-full w-full"></div>
            </div>
            <div className='top-[60vh] w-full min-h-[7vh] bg-white'>
                <div className='flex flex-row'>
                    <h1 className='font-bold font-poppins text-[#454545] text-3xl mt-[4rem] ml-36'>Recommendation</h1>
                    <h1 className='font-regular font-kanit text-[#797979] text-2xl mt-[4.2rem] ml-4'>หนังสือยอดนิยม</h1>                   
                </div>
                <div className="w-full h-[800px] bg-whitebrown m-auto mt-[2.5rem] drop-shadow-brown pt-16 pl-24 pr-24">
                <AliceCarousel 
                    mouseTracking
                    disableButtonsControls
                    autoWidth
                    disableDotsControls
                    responsive={responsive}
                    renderPrevButton={renderPrevButton}
                    renderNextButton={renderNextButton}
                    items={
                   books.map((data) => (
                            <Book 
                            key={data.id}
                            image={data.image} 
                            title={data.title}
                            onClick={() => handleBookClick(data)}
                            />
                        ))} 
                />
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

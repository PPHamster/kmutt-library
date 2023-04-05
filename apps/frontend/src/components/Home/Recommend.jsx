import React from 'react';
import Book from '@/components/Book';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

export default function Recommend() {

    const imageStyle = "bg-auto bg-fixed h-500";
    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 3 },
        1280: { items: 4 },
        1440: { items: 5,
             itemsFit: 'contain',},
    };

    //dummy data test template
    const bookdata = [
        {   
            bookid: 'MILF01',
            image: "./image/kmutt_library.jpg",
            bookname: "example book1",
            category: ['anime','action','horror'],
            type: 'manga',
            author: 'kobayashi tohru',
            story: 'keep it simple',
        },
        {   
            bookid: 'MILF02',
            image: "./image/kmutt_library.jpg",
            bookname: "example book2",
            category: ['anime','action','horror'],
            type: 'manga',
            author: 'kobayashi tohru',
            story: 'keep it simple',
        },
        {   
            bookid: 'MILF03',
            image: "./image/kmutt_library.jpg",
            bookname: "example book3",
            category: ['anime','action','horror'],
            type: 'manga',
            author: 'kobayashi tohru',
            story: 'keep it simple',
        },
        {   
            bookid: 'MILF04',
            image: "./image/kmutt_library.jpg",
            bookname: "example book4",
            category: ['anime','action','horror'],
            type: 'manga',
            author: 'kobayashi tohru',
            story: 'keep it simple',
        },
        {   
            bookid: 'MILF05',
            image: "./image/kmutt_library.jpg",
            bookname: "example book5",
            category: ['anime','action','horror'],
            type: 'manga',
            author: 'kobayashi tohru',
            story: 'keep it simple',
        },
        {   
            bookid: 'MILF06',
            image: "./image/kmutt_library.jpg",
            bookname: "example book6",
            category: ['anime','action','horror'],
            type: 'manga',
            author: 'kobayashi tohru',
            story: 'keep it simple',
        },
        {   
            bookid: 'MILF07',
            image: "./image/kmutt_library.jpg",
            bookname: "example book7",
            category: ['anime','action','horror'],
            type: 'manga',
            author: 'kobayashi tohru',
            story: 'keep it simple',
        },
    ]

    return (
        <>
            <div className="flex h-[60vh] w-full left-0 top-0">
                <div className="bg-fixed bg-library bg-cover top-0 left-0 h-full w-full"></div>
            </div>
            <div className='top-[60vh] w-full min-h-[7vh] bg-white'>
                <h1 className='font-bold font-poppins text-[#454545] text-3xl mt-[4rem] ml-36'>Recommendation</h1>
                <div className="w-full h-[800px] bg-whitebrown m-auto mt-[2.5rem] drop-shadow-brown pt-16 pl-32 pr-32">
                <AliceCarousel 
                    mouseTracking
                    disableButtonsControls
                    autoWidth
                    disableDotsControls
                    responsive={responsive}
                    items={
                   bookdata.map((data) => (
                            <Book 
                            key={data.bookid}
                            image={data.image} 
                            bookname={data.bookname}
                            category={data.category}
                            type={data.type}
                            author={data.author}
                            story={data.story}
                            />
                        ))} 
                />
                </div>
            </div>
        </>
    )
    

}
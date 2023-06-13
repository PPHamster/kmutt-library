import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetch } from '@/utils/Fetch';
import NavbarStatic from "@/components/navbarStatic";

export const BookPage = () => {
  const { bookid } = useParams();

  const [book, setBook] = useState(null);

  //style
  const headStyle = "font-poppins font-semibold text-2xl mb-2"
  const textStyle = "font-kanit font-light text-lg"

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch.get(`/books/${bookid}`)
      setBook(response.data)
    }

    fetchData();
  }, []);

  if (!book) {
    return (
      <div className="min-h-screen bg-white">
        <NavbarStatic
        bgcolor = 'bg-white hover:drop-shadow-md' 
        textcolor = 'text-black'
      />
      </div>
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
          <img className="w-[20vw] h-[375px] object-scale-down drop-shadow-lg" alt='book cover' draggable="false" src={book.image} />
          <div className="flex flex-col ml-[5vw] mt-1">
            <p className={headStyle}>{book.title}</p>
            <p className={textStyle}>ผู้แต่ง 　 {book.author}</p>
            <p className={textStyle}>ผู้จัดจำหน่าย 　 {book.publisher}</p>
            <p className={textStyle}>ประเภท 　 {book.categories.map(cat => cat.name).join(" / ")}</p>
            <p className={textStyle}>ISBN-13 　 {book.isbn}</p>
            <p className={textStyle}>วันที่จำหน่าย 　 {new Date(book.publishDate).toLocaleString("en-EN", {dateStyle: 'long'})}</p>
            <p className={textStyle}>ภาษา 　 {book.language}</p>
            <p className='mt-4 font-light text-lg font-kanit whitespace-normal w-[700px] h-[36px] max-h-[290px] border-b-2 mb-2'>
              [เรื่องย่อ]
              </p>
            <p className='font-light text-lg font-kanit whitespace-normal w-[720px] min-h-[120px] max-h-[290px] overflow-auto pr-[20px]'>
              {book.description}
              </p>
          </div>
        </div>
      </div>
      
    </>
  );
}

import { useState, useEffect } from 'react';
import Book from '@/components/Book';
import Room from '@/components/Room';
import Bookpopup from '@/components/Bookoverlay';
import { Checkbox } from '@mui/material';
import { fetch } from '@/utils/Fetch';
export default function Borrowbook() {

  //subset function
  function isArraySubset(subset, superset) {
    return subset.every(item => superset.includes(item));
  }

  //book selected
  const [selectedBook, setSelectedBook] = useState(null)
  const [filteredBook, setFilteredBook] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [download, setDownload] = useState({
    books: true,
    categories: true,
    rooms: true,
  });

  // book data handling
  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  // key press handling
  const handleKeyDown = (event) => {
    const keyword = event.target.value;
    setSearchTerm(keyword);
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
    setChecked(updatedList)
  }

  // year publisher 
  const [startYear, setStartYear] = useState(0);
  const [endYear, setEndYear] = useState(new Date().getFullYear());
  const allow = /^[0-9\b]+$/;
  const handleYearStart = (event) => {
    if (event.target.value === '' || allow.test(event.target.value)) setStartYear(event.target.value)

  }
  const handleYearEnd = (event) => {
    if (event.target.value === '' || allow.test(event.target.value)) setEndYear(event.target.value)
  }
  // publisher
  const [publisher, setPublisher] = useState('');

  // language 
  const Language = ["English", "Japanese", "Thai"]
  //find unique language in bookdata
  books.forEach(book => {
    if (!Language.includes(book.language)) {
      Language.push(book.language);
    }
  });
  //language state 
  const [language, setLanguage] = useState([])

  //language on change update
  const handleLanguage = (event) => {
    var updatedLanguage = [...language];
    if (event.target.checked) {
      updatedLanguage = [...language, event.target.value];
    } else {
      updatedLanguage.splice(language.indexOf(event.target.value), 1);
    }
    setLanguage(updatedLanguage);
  }

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch.get('/books');
      setBooks(response.data);
      setDownload((prev) => {
        return { ...prev, books: false }
      });
    }

    const fetchCategories = async () => {
      const response = await fetch.get('/categories');
      setCategories(response.data.map(cat => cat.name));
      setDownload((prev) => {
        return { ...prev, categories: false }
      });
    }

    const fetchRooms = async () => {
      const response = await fetch.get('/rooms');
      setRooms(response.data);
      setDownload((prev) => {
        return { ...prev, rooms: false }
      });
    }

    fetchBooks();
    fetchCategories(); 
    fetchRooms();
  }, []);

  useEffect(() => {
    //filter data
    function matchingbook() {
      //text search
      const filteredBySearch = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      //category search
      const filteredByCategory = checked.length > 0 ? filteredBySearch.filter(book =>
        isArraySubset(checked, book.categories.map(cat => cat.name))
      ) : filteredBySearch;

      //publish date search
      const filteredByPublishDate = startYear && endYear
        ? filteredByCategory.filter(book => {
          const publishYear = new Date(book.publishDate).getFullYear();
          return publishYear >= startYear && publishYear <= endYear;
        })
        : filteredByCategory;
      //publisher
      const filteredByPublisher = publisher ? filteredByPublishDate.filter(book =>
        book.publisher.toLowerCase().includes(publisher.toLowerCase())
      )
        : filteredByPublishDate;
      //language
      const filteredByLanguage = language.length > 0 ? filteredByPublisher.filter(book =>
        language.some(item => book.language === item)
      ) : filteredByPublisher;
      //return
      return filteredByLanguage
    }
    setFilteredBook(matchingbook());
  }, [checked, searchTerm, startYear, endYear, publisher, language, books]);

  //reversation room
  const [selectedRoom, setSelectedRoom] = useState(null);

  //handle room select
  const handleRoomClick = (room) => {
    setSelectedRoom(room);
  };

  const readyToShowPage = Object.keys(download).every(key => !download[key]);

  if (!readyToShowPage) {
    return (
      <div className="min-h-screen"></div>
    );
  }

  return (
    <>
      <div className='relative flex flex-col min-h-[7vh] mb-64 top-[120px]'>
        <p className='font-kanit font-semibold text-3xl ml-[100px] mb-[22px] text-gray-800'>ยืมหนังสือ</p>
        <div className='flex flex-row'>
          <div className='min-w-[310px] w-[310px] flex flex-col ml-[120px]'>
            <p className='font-kanit text-xl text-gray-700 font-medium mb-3'>หมวดหมู่</p>
            <div className='max-h-[222px] px-3 pb-3 mb-3 overflow-y-scroll text-sm text-gray-700'>
              {categories.map((item, index) => (
                <div key={index} className="p-1 flex flex-row">
                  <div className="flex items-center mr-4 mb-0">
                    <Checkbox value={item}
                      className='h-8 w-8'
                      onChange={handleCheck} />
                  </div>
                  <p className='font-light font-roboto text-md mt-[6px]'>{item}</p>
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
                    <div className="flex flex-row mr-4 mb-2">
                      <Checkbox
                        value={item}
                        className="h-8 w-8"
                        onChange={handleLanguage} />
                      <p className='font-light font-roboto text-md ml-4 mt-[6px]'>{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='flex flex-col min-w-[512px]'>
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
                    onChange={handleKeyDown}
                  />
                </div>
              </div>
            </div>
            <div className='w-full min-h-[7vh] left-0 bg-white mt-4 '>
              <div className='max-w-[80vw] min-w-[40vw] h-[77vh] grid gap-0 grid-auto-fit-[241px] overflow-y-scroll overflow-x-hidden pt-3 px-9'>
                {filteredBook.map((data) => (
                  <Book
                    key={data.id}
                    image={data.image}
                    title={data.title}
                    onClick={() => handleBookClick(data)}
                  />))}
              </div>
            </div>
          </div>

        </div>
        <p className='font-kanit font-semibold text-3xl mt-12 ml-[100px] mb-[30px] text-gray-800'>จองห้อง co-working</p>
        <div className='w-[90vw] h-[70vh] grid gap-4 grid-auto-fit-[33rem] overflow-y-scroll overflow-x-hidden pb-12 px-12'>
          {rooms.map((data) => (
            <Room
              key={data.id}
              id={data.id}
              image={data.image}
              status={data.status}
              name={data.name}
              onclick={() => handleRoomClick(data)}
            />
          ))}

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

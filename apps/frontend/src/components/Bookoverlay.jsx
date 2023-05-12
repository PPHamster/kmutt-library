import React from "react";
import { Link } from "react-router-dom";

export default function Bookpopup(props) {
    const imageStyle = 'h-[260px] w-[225px] rounded-lg object-scale-down ml-12 mt-12';
    const textStyle = 'font-md font-kanit text-[#696969]';
    if(!(props.open)) return null
    return (
        <>
        <div className="relative top-0 left-0 right-0 bottom-0 w-[100vw] h-[100vh] bg-black/50 z-[40]">
            <div className="fixed flex w-[800px] min-h-[400px] top-[50%] left-[50%] rounded-lg bg-white shadow-lg shadow-gray-700 translate-y-[-50%] translate-x-[-50%]">
            <img src={props.book.image} className={imageStyle}/>
                <div className='fixed top-[8px] right-[18px] p-2' onClick={props.onClose}><p  className="select-none">X</p></div>
                <div className="flex flex-col mt-[42px] ml-[64px]">
                    <div>
                        <p className='text-lg font-kanit font-medium mr-6'>{props.book.title}</p>
                        <p className={textStyle}>ประเภท: {(props.book.category).join(" / ")}</p>
                        <p className={textStyle}>ต้นฉบับ: {props.book.type}</p>
                        <p className={textStyle}>สิขสิทธิ์: {props.book.publisher}</p>
                        <p className={textStyle}>ผู้แต่ง: {props.book.author}</p>
                        <p className='text-md font-kanit whitespace-normal w-[400px] min-h-[120px] max-h-[290px] overflow-hidden text-ellipsis text-[#696969] resize-none'>[เรื่องย่อ] {<br/>}{props.book.description + ' ...'}</p>
                    </div>
                    <div className="flex">
                        <button className="m-1 mt-4 mb-6 pt-1 pb-1 pl-4 pr-4 bg-white border-black border-2 rounded-full">
                            <p className="font-roboto font-bold">Burrow</p>
                        </button>
                        <div className="m-1 mt-4 mb-6 ml-3">
                            <Link to={`/book/${props.book.bookid}`}>
                                <div className="pt-1 pb-1 pl-4 pr-4 bg-white border-black border-2 rounded-full">
                                    <p className="font-roboto font-bold">Visit page</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                
            </div>
            
        </div>
        </>
    )

}

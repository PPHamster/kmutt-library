import React from "react";

export default function Bookpopup(props) {
    const imageStyle = 'h-[260px] w-[225px] rounded-lg object-scale-down ml-12 mt-6';
    const textStyle = 'text-md font-kanit text-[#696969]';
    if(!(props.open)) return null
    return (
        <>
        <div className="relative top-0 left-0 right-0 bottom-0 w-[100vw] h-[100vh] bg-black/50 z-[40]">
            <div className="fixed flex w-[800px] h-[400px] top-[40%] left-[50%] bg-white shadow-lg shadow-gray-700 translate-y-[-50%] translate-x-[-50%]">
            <img src={props.book.image} className={imageStyle}/>
                <div className='fixed top-[8px] right-[18px] p-2' onClick={props.onClose}><p  className="select-none">X</p></div>
                <div className="flex flex-col mt-[42px] ml-[64px]">
                    <div>
                        <p className='text-lg font-kanit font-medium'>{props.book.bookname}</p>
                        <p className={textStyle}>ประเภท: {(props.book.category).join(" / ")}</p>
                        <p className={textStyle}>ต้นฉบับ: {props.book.type}</p>
                        <p className={textStyle}>สิขสิทธิ์: {props.book.publisher}</p>
                        <p className={textStyle}>ผู้แต่ง: {props.book.author}</p>
                        <div className='text-md font-kanit whitespace-normal w-[215px] h-[120px] text-[#696969]'>[เรื่องย่อ] {<br/>}{props.book.story}</div>
                    </div>
                    <div className="flex p-1">
                        <button className="width-full m-1 p-4 bg-white ml-8">burrow</button>
                    </div>
                </div>
                
            </div>
            
        </div>
        </>
    )

}

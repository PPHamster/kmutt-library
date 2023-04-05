import React from "react";

export default function Bookpopup(props) {
    const imageStyle = 'h-[260px] w-[225px] rounded-lg object-scale-down';
    const textStyle = 'text-lg';
    if(!(props.open)) return null
    return (
        <>
        <div className="absolute w-full h-full bg-black opacity-50 z-40">
            <div className="fixed flex max-w-[600px] top-[40%] left-[50%] bg-white shadow-lg shadow-gray-700 translate-y-1/2 translate-x-1/2">
            <img src={props.image} className={imageStyle}/>
                <p onClick={props.onClose} className="fixed top-[8px] right-[8px]">X</p>
                <div className="flex flex-col justify-center text-center">
                    <div>
                        <p className={textStyle}>{props.pbookname}</p>
                        <p className={textStyle}>ประเภท: {(props.pcategory).join(" / ")}</p>
                        <p className={textStyle}>ต้นฉบับ: {props.ptype}</p>
                        <p className={textStyle}>สิขสิทธิ์: {props.pbookname}</p>
                        <p className={textStyle}>ผู้แต่ง: {props.pauthor}</p>
                        <p className={textStyle}>[เรื่องย่อ] {<br/>}{props.pbookname}</p>
                    </div>
                    <div className="flex p-1">
                        <button className="width-full m-1 p-4 bg-white"></button>
                    </div>
                </div>
                
            </div>
            
        </div>
        </>
    )

}

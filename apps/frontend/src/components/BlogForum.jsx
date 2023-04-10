import React from "react";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function blogForum(props) {

    const createtime = new Date(props.blog.createAt).toLocaleString("en-EN", {dateStyle: 'long'});

    return (
        <>
            <div className="w-[80vw] ml-[5vw] mt-[40px] min-h-[333px] max-h-[400px] bg-white rounded-md drop-shadow-md">
                <div className="flex flex-row">
                    <img src={props.book.image} className='m-[30px] w-[160px] min-h-[240px] object-scale-down rounded-lg drop-shadow-md'/>
                    <div className="flex flex-col">
                        <p className="w-[400px] whitespace-normal overflow-hidden mt-7 font-kanit text-lg text-gray-700">{props.blog.topic}</p>
                        <p className="font-kanit text-md text-light text-gray-500">เรื่อง: {props.book.title}</p>
                        <div className="mt-2">
                            <Stack direction="row" spacing={1}>
                                {props.blog.tag.map((item, index) => (
                                    <Chip key={index} label={item} color="primary" variant="outlined" size='small' />                             
                                ))}
                            </Stack>
                        </div>
                        <div className="h-1 w-[50vw] ml-1 border-b-2 mt-2" />
                        <p className="w-[50vw] max-h-[170px] font-kanit font-light text-md whitespace-normal truncate    text-gray-500 mt-3 ml-2">{props.blog.article}</p>
                        <button className="w-[90px] h-[30px] m-1 mt-3 mb-4 pb-1 pl-4 pr-4 text-center bg-white border-black border-2 rounded-full">
                            <p className="font-kanit text-md">อ่านต่อ</p>
                        </button>
                        <div className="flex flex-row mb-3">
                            <p className="font-kanit font-extralight text-sm text-gray-400 ml-2">create at {createtime}</p>
                            <p className="font-kanit font-extralight text-sm text-gray-400 ml-2">create by {props.blog.userId}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
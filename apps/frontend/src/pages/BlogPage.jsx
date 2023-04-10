import React from "react";
import NavbarStatic from "@/components/navbarStatic";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import BlogForum from "@/components/BlogForum";
import { bookdata } from "@/utils/bookdata";
import { blogdata } from "@/utils/blogdata";

export default function BlogPage() {

    return (
        <>
            <NavbarStatic
               bgcolor = 'bg-white hover:drop-shadow-md' 
               textcolor = 'text-black'
            />
            <div className="relative max-w-[95vw] top-[15vh] ml-[60px]">
                <div className="flex flex-row">
                    <p className="ml-[120px] mt-[25px] font-poppins font-semibold text-4xl text-[#494949]">Blog</p>
                    <div className="absolute right-32 top-8">
                        <Fab variant="extended" color='primary' size='medium' sx={{ pr: 3 }}>
                            <AddIcon sx={{ mr: 1 }} />
                            Add
                        </Fab> 
                    </div> 
                </div>
                <div className='relative flex flex-col mt-14 ml-[1vw] w-[90vw] min-h-[500px] bg-[#f4f4f4] rounded-lg'>
                {blogdata.map((item, index) => (
                <BlogForum
                    key={index}
                    book={item.book}
                    blog={item}
                />
                ))}   
                </div>
            </div>
        </>
    )
}
import React from "react";
import NavbarStatic from "@/components/NavbarStatic";
import { Link } from "react-router-dom"
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import BlogForum from "@/components/BlogForum";
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
                    <p className="ml-[120px] mt-[25px] font-poppins font-semibold text-[48px] text-[#494949]">Blog</p>
                    <div className="absolute right-32 top-[44px]">
                    <Link to="/blog/create">
                        <Fab variant="extended" color='primary' size='medium' sx={{ pr: 3 }}>
                            <AddIcon sx={{ mr: 1 }} />
                            Add
                        </Fab> 
                    </Link>
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
                
                <img src='https://media.tenor.com/IapIQOnrTFUAAAAC/karyl-kyaru.gif' className="mt-12 m-auto h-[250px]"/>
                </div>
            </div>
            <footer>
                <div className="mt-32 flex flex-col w-full h-[150px] bg-[#8D4120] columns-2">
                <div className="mt-6 ml-40">
                    <p className="font-semi-bold font-poppins text-white text-lg">CONTACT US</p>
                    <div className="columns-2">
                    <p className="font-regular font-roboto text-white text-md">
                        Tel. 02-423-5522 {<br/>}
                        Email : kmutt_library@kmutt.ac.th
                    </p>
                    <p className="font-regular font-kanit text-white text-md">
                        Location : 91 ถนน พุทธบูชา {<br/>}
                        แขวงบางมด เขตทุ่งครุ {<br/>}
                        กรุงเทพมหานคร 10140
                    </p>
                    </div>
                </div>
                </div>
            </footer>
        </>
    )
}
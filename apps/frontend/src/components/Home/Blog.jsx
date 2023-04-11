import React from "react";
import { Link } from "react-router-dom";
import BlogForum from "@/components/BlogForum";
import { blogdata } from "@/utils/blogdata";

export default function Blog() {

    return (
        <>
            <div className="flex flex-row w-full h-[800px] bg-[#729ad2] mt-[9rem]">
                <div className="ml-2 mt-[9rem] flex-col">
                    <h1 className='ml-[12vw] font-bold font-poppins text-5xl text-[#454545]'>Blog</h1>
                    <div className='max-h-[200px] w-[35vw] font-normal font-kanit text-xl whitespace-normal text-[#454545] mt-8 ml-[14vw]'>
                    KMUTT Community ใช้พูดคุย แลกเปลี่ยน ความคิดและความเห็นเกี่ยวกับหนังสือ
                    </div>
                    <BlogForum
                        book={blogdata[0].book}
                        blog={blogdata[0]}
                    />
                    
                    <div className="ml-[8vw] mt-12">
                        <Link to='/blog'>
                            <div className='w-[120px] h-[40px] ml-[20px] text-center pt-[5px] rounded-full border-transparent hover:border-[#3e5679] border-2 hover:bg-[#3e5679] ease-out duration-300 bg-[#5f81af]'>
                                <p className="font-kanit font-regular text-white">see more</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
};
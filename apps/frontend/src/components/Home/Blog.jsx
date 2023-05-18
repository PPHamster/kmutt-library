import React from "react";
import { Link } from "react-router-dom";
import BlogForum from "@/components/BlogForum";
import { useEffect } from 'react';
import { fetch } from '@/utils/Fetch';
import { useState } from 'react';

export default function Blog() {

  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    const fetchData = async() => {
      const response = await fetch.get('/blogs');
      setBlogs(response.data);
    }

    fetchData();
  }, []);

  if (!blogs) {
    return (
      <div className="flex flex-row w-full h-[800px] bg-[#729ad2] mt-[9rem]"></div>
    );
  }

  return (
    <>
      <div className="flex flex-row w-full h-[800px] bg-[#729ad2] mt-[9rem]">
        <div className="ml-2 mt-[9rem] flex-col">
          <h1 className='ml-[12vw] font-bold font-poppins text-5xl text-white'>Blog</h1>
          <div className='max-h-[200px] w-[35vw] font-normal font-kanit text-xl whitespace-normal text-white mt-8 ml-[14vw]'>
            KMUTT Community ใช้พูดคุย แลกเปลี่ยน ความคิดและความเห็นเกี่ยวกับหนังสือ
          </div>
          {blogs[0] ? <BlogForum
            book={blogs[0].book}
            blog={blogs[0]}
          /> : null}

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

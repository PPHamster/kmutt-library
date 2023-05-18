import React, { useState, useEffect } from "react";
import NavbarStatic from "@/components/NavbarStatic";
import { Link } from "react-router-dom"
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import BlogForum from "@/components/BlogForum";
import { fetch } from '@/utils/Fetch';
import Footer from '@/components/Footer';

export default function BlogPage() {

  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch.get('/blogs');
      setBlogs(response.data);
    }

    fetchData();
  }, []);

  if (!blogs) {
    return (
      <>
        <div className="min-h-screen"></div>
        <NavbarStatic
          bgcolor='bg-white hover:drop-shadow-md'
          textcolor='text-black'
        />
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavbarStatic
        bgcolor='bg-white hover:drop-shadow-md'
        textcolor='text-black'
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
          {blogs.map((item) => (
            <BlogForum
              key={item.id}
              book={item.book}
              blog={item}
            />
          ))}

          <img src='https://media.tenor.com/IapIQOnrTFUAAAAC/karyl-kyaru.gif' className="mt-12 m-auto h-[250px]" />
        </div>
      </div>
      <Footer />
    </>
  )
}

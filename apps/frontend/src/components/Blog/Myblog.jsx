import React, { useState, useEffect } from "react";
import NavbarStatic from "@/components/NavbarStatic";
import Footer from '@/components/Footer';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { fetch } from '@/utils/Fetch';
import { popup } from '@/utils/Popup';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { WithUser } from '@/components/Hoc/WithUser';

export default WithUser(function Myblog() {

  const navigate = useNavigate();

  const { user } = useAuth();

  const [myblogs, setMyblogs] = useState(null);

  const [topicblog, setTopic] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [text, setText] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);

  const [downloadBlogs, setDownloadBlogs] = useState(true);
  const [downloadTags, setDownloadTags] = useState(true);

  const handleChange = (event) => {
    setTopic(event.target.value);
  };
  const handleTag = (event, newValue) => {
    setSelectedTags(newValue);
  }
  const handleText = (event) => {
    setText(event.target.value)
  }

  const [openEdit, toggleOpenEdit] = useState(false);

  const handleOpenEdit = (blog) => {
    setSelectedBlog(blog);
    setTopic(blog.topic);
    setText(blog.article);
    setSelectedTags(blog.tags);
    toggleOpenEdit(true);
  }

  const handleCloseEdit = () => {
    toggleOpenEdit(false);
    setSelectedBlog(null);
  };

  const handleSubmitEdit = (event) => {
    event.preventDefault();
    submitEdit();
    handleCloseEdit();
  };

  const submitEdit = async () => {

    const data = {
      topic: topicblog,
      article: text,
      tags: selectedTags.map(tag => tag.name),
    }

    try {
      await fetch.put(`/blogs/${selectedBlog.id}`, data);

      setDownloadBlogs(true);
      setDownloadTags(true);
      await popup.fire({
        icon: 'success',
        title: 'Update successful!',
        text: `Update ${selectedBlog.topic} successfully`,
      })
    } catch (error) {
      const thisError = error.response.data.message;
      await popup.fire({
        icon: 'error',
        title: 'Update Failed!',
        text: Array.isArray(thisError) ? thisError.join(' / ') : thisError,
      })
    }
  };


  const [tags, setTags] = useState(null);

  //add tag
  const [open, toggleOpen] = useState(false);
  const [inputEditValue, setInputEditValue] = useState('');

  const handleClose = () => {
    setInputEditValue('');
    toggleOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleClose();
    addtag(inputEditValue);
  };

  function addtag(newtag) {
    setTags((prev) => {
      return [...prev, { id: NaN, name: newtag }];
    });
  }

  //Blogdel
  const [opendel, toggleOpendel] = useState(false);

  const handleOpendel = (blog) => {
    setSelectedBlog(blog)
    toggleOpendel(true);
  }

  const handleClosedel = () => {
    toggleOpendel(false);
    setSelectedBlog(null);
  };

  const handleSubmitdel = (event) => {
    event.preventDefault();
    handleClosedel();
  };

  async function Delblog() {
    try {
      await fetch.delete(`/blogs/${selectedBlog.id}`);

      setDownloadBlogs(true);

      await popup.fire({
        icon: 'success',
        title: 'Delete successful!',
        text: `Delete ${selectedBlog.topic} successfully`,
      })
    } catch (error) {
      await popup.fire({
        icon: 'error',
        title: 'Failed to delete blog!',
        text: `${error.response.data.message}`,
      })
    }
  }

  useEffect(() => {
    const fetchBlogs = async () => {
      if (downloadBlogs) {
        const response = await fetch.get(`/blogs?userId=${user.id}`);
        setMyblogs(response.data);
        setDownloadBlogs(false);
      }
    }

    const fetchTags = async () => {
      if (downloadTags) {
        const response = await fetch.get('/tags');
        setTags(response.data);
        setDownloadTags(false);
      }
    }

    fetchBlogs();
    fetchTags();
  }, [downloadBlogs, downloadTags]);

  if (!myblogs || !tags) {
    return (
      <>
        <NavbarStatic
          bgcolor='bg-white hover:drop-shadow-md'
          textcolor='text-black'
        />
      </>
    );
  }

  return (
    <>
      <NavbarStatic
        bgcolor='bg-white hover:drop-shadow-md'
        textcolor='text-black'
      />
      <div className="relative max-w-[95vw] top-[15vh] ml-[60px] mb-[200px] ">
        <div>
          <p className="ml-[120px] mt-[25px] font-poppins font-semibold text-[48px] text-[#494949]">My Blog</p>
        </div>
        <div className='relative flex flex-col mt-14 pb-14 ml-[1vw] w-[90vw] min-h-[500px] bg-[#f4f4f4] rounded-lg'>
          {myblogs.map((blog) => {
            const createTime = new Date(blog.createdAt).toLocaleString("en-EN", { dateStyle: 'long' });
            const updateTime = new Date(blog.updatedAt).toLocaleString("en-EN", { dateStyle: 'long' });

            return (
              <div className="w-[80vw] ml-[5vw] mt-[40px] min-h-[333px] max-h-[400px] bg-white rounded-md drop-shadow-md" key={blog.id}>
                <div className="flex flex-row">
                  <img src={blog.book.image} className="m-[30px] w-[160px] min-h-[240px] object-scale-down rounded-lg drop-shadow-md" />
                  <div className="flex flex-col">
                    <p className="w-[400px] whitespace-normal overflow-hidden mt-7 font-kanit text-lg text-gray-700">{blog.topic}</p>
                    <p className="font-kanit text-md text-light text-gray-500">เรื่อง: {blog.book.title}</p>
                    <div className="mt-2">
                      <Stack direction="row" spacing={1}>
                        {Array.isArray(blog.tags) &&
                          blog.tags.map((tag) => (
                            <Chip key={tag.id} label={tag.name} color="primary" variant="outlined" size="small" />
                          ))}
                      </Stack>
                    </div>
                    <div className="h-1 w-[50vw] ml-1 border-b-2 mt-2" />
                    <p className="w-[50vw] max-h-[170px] font-kanit font-light text-md whitespace-normal truncate text-gray-500 mt-3 ml-2">{blog.article}</p>
                    <button className="w-[90px] h-[30px] m-1 mt-3 mb-4 pb-1 pl-4 pr-4 text-center bg-white border-black border-2 rounded-full">
                      <p className="font-kanit text-md">อ่านต่อ</p>
                    </button>
                    <div className="flex flex-row mb-3">
                      <p className="font-kanit font-extralight text-sm text-gray-400 ml-2">Created at: {createTime} / Updated at: {updateTime}</p>
                    </div>
                    <button
                      className="w-[80px] p-3 rounded-full bg-[#0092BF]  hover:bg-[#007396] border-2 font-regular font-poppins text-white ease-out duration-300"
                      onClick={() => { handleOpenEdit(blog) }}>Edit</button>
                    <button
                      className="absolute w-auto p-3 mx-[100px] bottom-0 mb-[35px] rounded-full bg-[#F44336] border-2 hover:bg-[#c5342a] font-regular font-poppins text-white text-md ease-out duration-300"
                      onClick={() => { handleOpendel(blog) }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          <Dialog open={openEdit} onClose={handleCloseEdit} className="max-w-[100%] ">
            <form>
              <DialogTitle className='text-center'>แก้ไข Blog</DialogTitle>
              <hr />
              <DialogContent >
                <DialogContentText className=''>
                  <Box
                    component="form"
                    sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' }, }}
                    noValidate
                    autoComplete="off"
                  >
                    <div className="my-[3vh] mx-[5vh]">
                      <TextField
                        required
                        id="outlined-multiline-flexible"
                        label="Topic"
                        onChange={handleChange}
                        multiline
                        maxRows={2}
                        defaultValue={selectedBlog?.topic}
                      />
                      {/* add tag */}
                      <Dialog open={open} onClose={handleClose}>
                        <form onSubmit={handleSubmit}>
                          <DialogTitle className='text-center'>เพิ่ม Tag</DialogTitle>
                          <hr />
                          <DialogContent>
                            <DialogContentText className='px-5'>
                              โปรดระบุ Tag ใหม่
                            </DialogContentText>
                            <div className='flex justify-center'>
                              <TextField
                                autoFocus
                                margin="dense"
                                value={inputEditValue}
                                type="text"
                                variant="standard"
                                onChange={(e) =>
                                  setInputEditValue(e.target.value)
                                }
                              /></div>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose}>ยกเลิก</Button>
                            <Button type="submit">ยืนยัน</Button>
                          </DialogActions>
                        </form>
                      </Dialog>

                      <Autocomplete
                        multiple
                        options={tags}
                        inputlabelprops={{
                          shrink: true,
                        }}
                        getOptionLabel={(option) => option.name}
                        filterSelectedOptions
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Tag"
                            placeholder='ระบุ Tag'
                          />
                        )}
                        onChange={(event, value) => {
                          setSelectedTags(value)
                        }}
                        defaultValue={tags.filter(tag => selectedBlog?.tags.map(t => t.name).includes(tag.name))}
                      />
                      <div>
                        <Button onClick={() => toggleOpen(true)}>
                          เพิ่ม Tag
                        </Button>
                      </div>
                      <p className="font-poppins text-lg ml-4">Article</p>
                      <TextField
                        InputProps={{
                          style: {
                            width: '50ch',
                            height: '250px',
                            padding: '16px'
                          }
                        }}
                        id="outlined-multiline-static"
                        multiline
                        rows={10}
                        placeholder="write something .."
                        onChange={handleText}
                        defaultValue={selectedBlog?.article}
                      />
                    </div>
                  </Box>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseEdit}>ยกเลิก</Button>
                <Button type="button" onClick={handleSubmitEdit}>ยืนยัน</Button>
              </DialogActions>
            </form>
          </Dialog>

          {/* Del */}
          <Dialog open={opendel} onClose={handleClosedel}>
            <form onSubmit={handleSubmitdel}>
              <DialogTitle className='text-center'>ลบ Blog</DialogTitle>
              <hr />
              <DialogContent>
                <DialogContentText className='px-5'>
                  คุณแน่ใจหรือไม่ว่าต้องการลบ Blog
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClosedel}>ยกเลิก</Button>
                <Button type="submit" onClick={Delblog}>ยืนยัน</Button>
              </DialogActions>
            </form>
          </Dialog>
        </div>
      </div>
      <Footer />
    </>
  )
})

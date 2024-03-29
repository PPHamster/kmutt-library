import React, { useState, useEffect } from "react";
import { fetch } from '@/utils/Fetch';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { InputLabel, Select, MenuItem, FormHelperText, FormControl } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import NavbarStatic from "@/components/navbarStatic";
import { blogdata } from "@/utils/blogdata";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { popup } from '@/utils/Popup';
import { useNavigate } from 'react-router-dom';
import { WithUser } from '@/components/Hoc/WithUser';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      minWidth: 250,
    },
  },
};

function Newblog() {

  const navigate = useNavigate();

  const [books, setBooks] = useState(null);
  const [tags, setTags] = useState(null);

  const Tag = [];
  //find unique category in bookdata
  blogdata.forEach(blog => {
    blog.tag.forEach(tag => {
      if (!Tag.includes(tag)) {
        Tag.push(tag);
      }
    });
  });

  //add tag
  const [open, toggleOpen] = useState(false);
  const [inputEditValue, setInputEditValue] = useState('');

  const handleClose = () => {
    setInputEditValue(null);
    toggleOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleClose();
    addtag(inputEditValue);
  };

  function addtag(newtag) {
    // Generate a unique id for the new category
    const newTagId = NaN;

    // Create a new category object with the generated id and the new category name
    const newTagBlog = {
      id: newTagId,
      name: newtag
    };

    // Add the new category to the categories array
    setTags((prev) => {
      return [...prev, newTagBlog]
    });
  }

  //element state
  const [topic, setTopic] = useState("");
  const [selectionBook, setSelectedBook] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [text, setText] = useState("");

  //element handle on change
  const handleChange = (event) => {
    setTopic(event.target.value);
  };
  const handleBook = (event) => {
    setSelectedBook(event.target.value);
  };
  const handleTag = (event, newValue) => {
    setSelectedTags(newValue);
  }
  const handleText = (event) => {
    setText(event.target.value)
  }
  // submit new blog
  const submit = async (event) => {
    event.preventDefault();

    const data = {
      topic: topic,
      tags: selectedTags,
      article: text,
    };

    try {
      const response = await fetch.post(`/blogs/${selectionBook.id}`, data);

      await popup.fire({
        icon: 'success',
        title: 'Create successful!',
        text: `${response.data.msg}`,
      })

      navigate('/blog')
    } catch (error) {
      const thisError = error.response.data.message;
      await popup.fire({
        icon: 'error',
        title: 'Create Failed!',
        text: Array.isArray(thisError) ? thisError.join(' / ') : thisError,
      })
    }

  }

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch.get('/books/no-blog');
      setBooks(response.data);
    }

    const fetchTags = async () => {
      const response = await fetch.get('/tags');
      setTags(response.data);
    }

    fetchBooks();
    fetchTags();
  }, []);

  if (!books || !tags) {
    return (
      <>
        <div className="absolute w-screen h-screen top-0 left-0 bg-gray-50">{ }</div>
        <NavbarStatic
          bgcolor='bg-white hover:drop-shadow-md'
          textcolor='text-black'
        />
      </>
    );
  }

  return (
    <>
      <div className="absolute w-screen h-screen top-0 left-0 bg-gray-50">{ }</div>
      <NavbarStatic
        bgcolor='bg-white hover:drop-shadow-md'
        textcolor='text-black'
      />
      <div id='top' className="relative w-[90vw] min-h-[70vh] top-20 left-10 bg-white rounded-sm drop-shadow-md p-12">
        <div className="flex flex-col">
          <p className="font-poppins text-lg ml-4">Blog topic</p>
          <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' }, }}
            noValidate
            autoComplete="off"
          >
            <div className="mt-2 mb-6 ml-8">
              <TextField
                required
                id="outlined-multiline-flexible"
                label="Topic"
                onChange={handleChange}
                multiline
                maxRows={2}
              />
              <div className="absolute mt-[1.5%] ml-[44%]">
                <Button onClick={() => toggleOpen(true)}>
                  เพิ่ม Tag
                </Button>
              </div>
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
                id="tags-outlined"
                options={tags.map(tag => tag.name)}
                value={selectedTags}
                onChange={handleTag}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tag"
                    placeholder="Blog tag"
                  />
                )}
              />
            </div>
            <p className="font-poppins text-lg ml-4">Select book topic</p>
            <div className="mt-3 mb-6 ml-8">
              <FormControl required sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-required-label">Book</InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={selectionBook}
                  label="Book *"
                  onChange={handleBook}
                  MenuProps={MenuProps}
                >
                  {books.map((item, index) => (
                    <MenuItem
                      key={index}
                      value={item}
                    >
                      <div className="min-w-[200px] min-h-[40px] p-4 bg-slate-100 rounded-md drop-shadow-md flex flex-row">
                        <div className="p-1">
                          <img src={item.image} className="h-[110px] object-scale-down rounded-sm drop-shadow-md mr-3" />
                        </div>
                        <div className="h-[115px] w-[1px] border-l-2 border-gray-200 mr-4 mt-1"></div>
                        <div className="flex flex-col">
                          <p className="font-poppins text-gray-700">{item.title}</p>
                          <p className="font-poppins font-light text-sm text-gray-500 ml-1">{item.author}</p>
                        </div>

                      </div>

                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>

            </div>
            <div className="mt-2 ml-4">
              <p className="font-poppins text-lg ml-4">Article</p>
              <TextField
                InputProps={{
                  style: {
                    width: '1000px',
                    height: '250px',
                    padding: '16px'
                  }
                }}
                id="outlined-multiline-static"
                multiline
                rows={10}
                placeholder="write something .."
                onChange={handleText}
              />
            </div>
            <button
              className="w-[90px] h-[30px] ml-14 mt-6 mb-4 pb-1 pl-4 pr-4 text-center bg-white border-black border-2 rounded-full"
              onClick={submit}
            >
              <p className="font-kanit text-md">create</p>
            </button>
          </Box>
          <img src='https://media.tenor.com/0UfdkJsImH4AAAAi/pat.gif' className="mt-[30rem] h-[200] w-[200] m-auto" />
        </div>
      </div>
    </>
  )
}

export default WithUser(Newblog);

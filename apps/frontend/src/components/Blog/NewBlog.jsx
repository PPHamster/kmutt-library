import React , { useState } from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { InputLabel , Select , MenuItem , FormHelperText , FormControl } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import { bookdata } from '@/utils/bookdata'
import NavbarStatic from "../NavbarStatic";
import { blogdata } from "@/utils/blogdata";

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

export default function Newblog() {

    const Tag = [];
    //find unique category in bookdata
    blogdata.forEach(blog => {
        blog.tag.forEach(tag => {
          if (!Tag.includes(tag)) {
            Tag.push(tag); 
          }
        });
      });

    const [topic, setTopic] = useState("");
    const [selectionBook, setSelectedBook] = useState([]);
    const [selectedTags , setSelectedTags] = useState([]);
    const [text, setText] = useState("");

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
    const submit = (event) => { 
        event.preventDefault();
        console.log({topic: topic,
            book: selectionBook,
            tag: selectedTags, 
            article: text,
            createAt: (new Date().toISOString().slice(0, 10)) })

    }
    return (
        <>  
            <div className="absolute w-screen h-screen top-0 left-0 bg-gray-50">{}</div>
            <NavbarStatic
               bgcolor = 'bg-white hover:drop-shadow-md' 
               textcolor = 'text-black'
            />
            <div className="relative w-[90vw] min-h-[70vh] top-20 left-10 bg-white rounded-sm drop-shadow-md p-12">
            <div className="flex flex-col">
                <p className="font-poppins text-lg ml-4">Blog topic</p>
                    <Box
                        component="form"
                        sx={{'& .MuiTextField-root': { m: 1, width: '50ch' }, }}
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
                                 <Autocomplete
                                    multiple
                                    id="tags-outlined"
                                    options={Tag}
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
                                    {bookdata.map((item, index) => (
                                        <MenuItem
                                            key={index}
                                            value={item}
                                        >
                                            <div className="min-w-[200px] min-h-[40px] p-4 bg-slate-100 rounded-md drop-shadow-md flex flex-row">
                                                <div className="p-1">
                                                    <img src={'../' + item.image} className="h-[110px] object-scale-down rounded-sm drop-shadow-md mr-3"/>
                                                </div>
                                                <div className="h-[115px] w-[1px] border-l-2 border-gray-200 mr-4 mt-1"></div>
                                                <div className="flex flex-col">
                                                    <p className="font-poppins text-gray-700">{item.title}</p>
                                                    <p className="font-poppins font-light text-sm text-gray-500 ml-1">{item.author} - {item.type}</p>
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
                                        }}}
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
                    <img src='https://media.tenor.com/0UfdkJsImH4AAAAi/pat.gif' className="mt-[30rem] h-[200] w-[200] m-auto"/>
             </div>
            </div>
        </>
    )
}
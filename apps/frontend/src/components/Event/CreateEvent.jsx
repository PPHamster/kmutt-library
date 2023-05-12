import React, { useEffect, useState } from "react";
import NavbarStatic from "../navbarStatic";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Autocomplete from '@mui/material/Autocomplete';
import { eventcategory } from "@/utils/Eventcategory";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Button from '@mui/material/Button';

export default function CreateEvent() {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [textdes, setText] = useState("");

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const handleText = (event) => {
        setText(event.target.value)
    };

    //add cat
    const [open, toggleOpen] = useState(false);
    const [inputEditValue, setInputEditValue] = useState('');

    const handleClose = () => {
        setInputEditValue(null);
        toggleOpen(false);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        handleClose();
        addCategory(inputEditValue);
    };

    function addCategory(newcat) {
        // Generate a unique id for the new category
        const newCategoryId = NaN;

        // Create a new category object with the generated id and the new category name
        const newCategory = {
            id: newCategoryId,
            name: newcat
        };

        // Add the new category to the categories array
        eventcategory.push(newCategory);
    }

    //upload image
    const [images, setImages] = useState([]);
    const [imageURLs, setImageURLs] = useState([]);

    useEffect(() => {
        if (images.length < 1) return;
        const newImageURLs = []
        images.forEach(image => newImageURLs.push(URL.createObjectURL(image)));
        setImageURLs(newImageURLs);
    }, [images]);

    function onImageChange(e) {
        setImages([...e.target.files]);
    }

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDateEnd, setSelectedDateEnd] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleDateEndChange = (dateend) => {
        setSelectedDateEnd(dateend);
    };

    const submit = (event) => {
        event.preventDefault();
        console.log({
            title: name,
            category: selectedCategory,
            description: textdes,
            image: imageURLs,
            location: location,
            meetingtime: selectedDate,
            endtime: selectedDateEnd,
        })

    }

    return (
        <>
            <div className='w-full h-full bg-gray-50'>
                <NavbarStatic
                    bgcolor='bg-white hover:drop-shadow-md'
                    textcolor='text-black'
                />
                <div className="w-[80%] mx-[10%] mb-[12.8%] pt-[20vh]">
                    <div className="py-[10vh] px-[5vh] min-h-[70vh] bg-white rounded-sm drop-shadow-md">
                        <div className="flex flex-col">
                            <p className="font-poppins text-lg ml-4">Create new event</p>
                            <Box
                                component="form"
                                sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' }, }}
                                noValidate
                                autoComplete="off"
                            >
                                <div className="my-[3vh] mx-[5vh]">
                                    <TextField
                                        required
                                        label="ชื่อกิจกรรม"
                                        onChange={handleNameChange}
                                        multiline
                                        maxRows={2}
                                    />
                                    <TextField
                                        label="สถานที่จัดกิจกรรม"
                                        onChange={handleLocationChange}
                                        multiline
                                        maxRows={1}
                                    />
                                    <div className="absolute mt-[1.5%] ml-[44%]">
                                        <Button onClick={() => toggleOpen(true)}>
                                            เพิ่ม Category
                                        </Button>
                                    </div>
                                    {/* add category */}
                                    <Dialog open={open} onClose={handleClose}>
                                        <form onSubmit={handleSubmit}>
                                            <DialogTitle className='text-center'>เพิ่ม Event Category</DialogTitle>
                                            <hr />
                                            <DialogContent>
                                                <DialogContentText className='px-5'>
                                                    โปรดระบุ Category ใหม่
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
                                        onChange={(event, value) => {
                                            setSelectedCategory(value)
                                        }}
                                        options={eventcategory}
                                        getOptionLabel={(option) => option.name}
                                        filterSelectedOptions
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Category"
                                                placeholder="โปรดระบุ Category หรือกด เพิ่ม Category"
                                            />
                                        )}
                                    />
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DateTimePicker']}>
                                            <DateTimePicker label="วัน-เวลาเริ่มกิจกรรม" ampm={false} value={selectedDate} onChange={handleDateChange} />

                                            <DateTimePicker label="วัน-เวลาสิ้นสุดกิจกรรม" ampm={false} value={selectedDateEnd} onChange={handleDateEndChange} />

                                        </DemoContainer>
                                    </LocalizationProvider>
                                    <TextField
                                        InputProps={{
                                            style: {
                                                width: '204%',
                                                height: '250px',
                                                padding: '16px'
                                            }
                                        }}
                                        id="outlined-multiline-static"
                                        multiline
                                        rows={10}
                                        onChange={handleText}
                                        label="รายละเอียด"
                                        placeholder="เรื่องย่อหรือรายละเอียดหนังสือ .."
                                    />
                                </div>
                                <div className="my-[3vh] ml-[11.5vh]">
                                    <input type="file"
                                        className=" file:rounded-full file:bg-white
                                file:hover:bg-gray-200 file:font-normal 
                                  file:font-poppins file:text-black file:ease-out 
                                  file:duration-300 file:border-2 font-poppins file:p-[8px] 
                                  file:px-[20px] file:mr-5"
                                        multiple
                                        accept="image/*"
                                        onChange={onImageChange} />
                                    {imageURLs.map((imageSrc, idx) => (
                                        <img key={idx} className=" w-3/12" src={imageSrc} />
                                    ))}
                                </div>
                                <button
                                    className="ml-[11.5vh] text-center bg-[#0092BF] text-white hover:bg-[#007396] border-black border-2 rounded-full"
                                    onClick={submit}
                                >
                                    <p className="font-poppins text-md p-[8px] px-[20px]">Create</p>
                                </button>
                            </Box>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


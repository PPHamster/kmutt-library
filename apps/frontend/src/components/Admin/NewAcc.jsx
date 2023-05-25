import React, { useEffect, useState } from "react";
import NavbarAdmin from "@/components/NavbarAdmin";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { WithUser } from '@/components/Hoc/WithUser';

function NewAcc() {



    //upload image
    const [images, setImages] = useState([]);
    const [imageData, setImageData] = useState([]);

    useEffect(() => {
        if (images.length < 1) return;
        const newImageData = [];
        images.forEach(image => {
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onloadend = () => {
                const base64Data = reader.result;
                newImageData.push(base64Data);
                setImageData(newImageData);
            }
        });
    }, [images]);

    function onImageChange(e) {
        setImages([...e.target.files]);
    }

    const submit = async (event) => {
        event.preventDefault();

        const data = {
            image: imageData[0].split(',')[1],
        };
    }

    return (
        <>
            <div className='w-full h-full bg-gray-50'>
                <NavbarAdmin
                    bgcolor='bg-white hover:drop-shadow-md'
                    textcolor='text-black'
                />
                <div className="w-[80%] mx-[10%] mb-[12.8%] pt-[20vh]">
                    <div className="py-[10vh] px-[5vh] min-h-[70vh] bg-white rounded-sm drop-shadow-md">
                        <div className="flex flex-col">
                            <p className="font-poppins text-lg ml-4">Create new account</p>
                            <Box
                                component="form"
                                sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' }, }}
                                noValidate
                                autoComplete="off"
                            >
                                <div className="my-[3vh] mx-[5vh]">

                                </div>
                                <div className="my-[3vh] ml-[11.5vh]">
                                    <input type="file"
                                        className=" file:rounded-full file:bg-white
                              file:hover:bg-gray-200 file:font-normal 
                                file:font-poppins file:text-black file:ease-out 
                                file:duration-300 file:border-2 font-poppins file:p-[8px] 
                                file:px-[20px] file:mr-5"
                                        accept="image/*"
                                        onChange={onImageChange} />
                                    {imageData.map((dataURL, idx) => (
                                        <img key={idx} className="w-3/12" src={dataURL} />
                                    ))}
                                </div>
                                <button
                                    className="ml-[11.5vh] text-center bg-[#0092BF] text-white hover:bg-[#007396] border-black border-2 rounded-full"
                                    onClick={submit}
                                >
                                    <p className="font-poppins text-md p-[8px] px-[20px]">Submit</p>
                                    
                                </button>
                            </Box>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WithUser(NewAcc);

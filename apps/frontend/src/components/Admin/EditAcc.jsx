import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavbarAdmin from "@/components/NavbarAdmin";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { Link, useNavigate } from "react-router-dom";
import { fetch } from '@/utils/Fetch';
import { popup } from '@/utils/Popup';
import { WithUser } from '@/components/Hoc/WithUser';
import Button from '@mui/material/Button';

const roles = [
  { id: 1, name: 'User' }, { id: 2, name: 'Staff' }, { id: 3, name: 'Admin' }
]

const branchs = [
  { id: 1, name: 'COMPUTER ENGINEERING' }, { id: 2, name: 'MECHANICAL ENGINEERING' }, { id: 3, name: 'CIVIL ENGINEERING' }
]

function EditAcc() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [Acc, setAcc] = useState(null);
  const [Id, setId] = useState("");
  const [Fname, setFName] = useState("");
  const [Lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState("");
  const [year, setYear] = useState("");
  const [branch, setBranch] = useState(null);
  const [role, setRole] = useState(null);
  const [blacklist, setBlacklist] = useState("")

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handleFNameChange = (event) => {
    setFName(event.target.value);
  };

  const handleLNameChange = (event) => {
    setLName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleTelChange = (event) => {
    setTel(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  //add
  const [open, toggleOpen] = useState(false);
  const [inputEditValue, setInputEditValue] = useState('');

  const handleClose = () => {
    setInputEditValue(null);
    toggleOpen(false);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    handleClose();
    addBranch(inputEditValue);
  };

  function addBranch(newbranch) {
    console.log('testo!')
  }

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

  const submit = (event) => {
    event.preventDefault();
    console.log(
      Id,
      Fname,
      Lname,
      email,
      password,
      tel,
      year,
      branch,
      role,
      imageData,
    );

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
              <p className="font-poppins text-lg ml-4">Edit account</p>
              <Box
                component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' }, }}
                noValidate
                autoComplete="off"
              >
                <div className="my-[3vh] mx-[5vh]">
                  <TextField
                    required
                    label="Id"
                    type={"number"}
                    multiline
                    maxRows={2}
                    onChange={handleIdChange}
                  // defaultValue={}
                  />
                  <TextField
                    required
                    label="ชื่อ"
                    multiline
                    maxRows={2}
                    onChange={handleFNameChange}
                    // defaultValue={}
                  />
                  <TextField
                    required
                    label="นามสกุล"
                    multiline
                    maxRows={2}
                    onChange={handleLNameChange}
                  />
                  <TextField
                    required
                    label="อีเมล"
                    autoComplete="email"
                    autoFocus
                    onChange={handleEmailChange}
                    // defaultValue={}
                  />
                  <TextField
                    required
                    label="รหัสผ่าน"
                    type="password"
                    autoComplete="current-password"
                    onChange={handleEmailChange}
                    // defaultValue={}
                  />
                  <TextField
                    label="เบอร์โทรศัพท์"
                    type="tel"
                    maxRows={1}
                    onChange={handleTelChange}
                    // defaultValue={}
                  />
                  <TextField
                    label="ปีเข้าศึกษา"
                    type="text"
                    maxRows={1}
                    onChange={handleYearChange}
                    // defaultValue={}
                  />
                  <div className="absolute mt-[1.5%] ml-[44%]">
                    <Button onClick={() => toggleOpen(true)}>
                      เพิ่มสาขาวิชา
                    </Button>
                  </div>
                  {/* add */}
                  <Dialog open={open} onClose={handleClose}>
                    <form onSubmit={handleSubmit}>
                      <DialogTitle className='text-center'>เพิ่มสาขาวิชา</DialogTitle>
                      <hr />
                      <DialogContent>
                        <DialogContentText className='px-5'>
                          โปรดระบุสาขาวิชาใหม่
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
                    id="tags-standard"
                    options={branchs}
                    getOptionLabel={(option) => option.name}
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="สาขาวิชา"
                        placeholder="ระบุสาขาวิชาหรือกด เพิ่มสาขาวิชา"
                      />
                    )}
                    onChange={(event, value) => {
                      setBranch(value)
                    }}
                    // defaultValue={}
                  />
                  <Autocomplete
                    onChange={(event, newValue) => {
                      setRole(newValue);
                    }}
                    options={roles}
                    getOptionLabel={(option) => option.name}
                    filterSelectedOptions
                    renderInput={(params) => <TextField {...params} label='Role' />}
                    // defaultValue={}
                  />
                </div>
                <div className="my-[3vh] ml-[11.5vh]">
                <h2 className=' font-normal font-kanit text-orange-600 text-sm text-left mb-2'>หากไม่ต้องการเปลี่ยนรูป ไม่ต้อง Upload รูปใด ๆ</h2>
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
                  <p className="font-poppins text-md p-[8px] px-[20px]">Save change</p>

                </button>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default WithUser(EditAcc);

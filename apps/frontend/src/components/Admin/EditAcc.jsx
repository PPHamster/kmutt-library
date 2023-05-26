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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function EditAcc() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [Id, setId] = useState("");
  const [Fname, setFName] = useState("");
  const [Lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState("");
  const [year, setYear] = useState("");
  const [branch, setBranch] = useState(null);
  const [role, setRole] = useState(null);
  const [blacklist, setBlacklist] = useState(1)//ใส่ defaultValue ตรงนี้

  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState(null);
  const [branchs, setBranchs] = useState(null);

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

  const handleBlacklistChange = (event) => {
    setBlacklist(event.target.value);
  }

  //add
  const [open, toggleOpen] = useState(false);
  const [inputEditValue, setInputEditValue] = useState('');

  const [openRole, toggleOpenRole] = useState(false);
  const [inputRoleEditValue, setInputRoleEditValue] = useState('');

  const handleClose = () => {
    setInputEditValue('');
    toggleOpen(false);
  };

  const handleCloseRole = () => {
    setInputRoleEditValue('');
    toggleOpenRole(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    handleClose();
    addBranch(inputEditValue);
  };

  const handleRoleSubmit = (event) => {
    event.preventDefault();
    handleCloseRole();
    addRole(inputRoleEditValue);
  }

  function addBranch(newbranch) {
    setBranchs((prev) => {
      return [...prev, { id: NaN, name: newbranch }];
    });
  }

  function addRole(newrole) {
    setRoles((prev) => {
      return [...prev, { id: NaN, name: newrole }];
    });
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

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch.get(`/users/${id}`);
      const resUser = response.data;
      setUser(resUser);
      setId(resUser.id);
      setFName(resUser.firstname);
      setLName(resUser.lastname);
      setEmail(resUser.email);
      setTel(resUser.tel);
      setYear(resUser.registYear);
      setBranch(resUser.branch);
      setRole(resUser.role);
      setBlacklist(resUser.isBlacklist);
    }

    const fetchRoles = async () => {
      const response = await fetch.get('/roles');
      setRoles(response.data);
    }

    const fetchBranchs = async () => {
      const response = await fetch.get('/branchs');
      setBranchs(response.data);
    }

    fetchUser();
    fetchRoles();
    fetchBranchs();
  }, []);

  function onImageChange(e) {
    setImages([...e.target.files]);
  }

  const submit = async (event) => {

    event.preventDefault();

    const data = {
      id: Id,
      firstname: Fname,
      lastname: Lname,
      email: email,
      password: password === '' ? undefined : password,
      tel: tel,
      registYear: +year,
      branch: branch.name,
      role: role.name,
      isBlacklist: blacklist === 1,
    };

    try {
      const response = await fetch.put(`/users/${id}/admin`, data);

      if (imageData.length > 0) {
        await fetch.put(`/users/${id}/image`, { image: imageData[0].split(',')[1] });
      }

      await popup.fire({
        icon: 'success',
        title: 'Update successful!',
        text: `${response.data.msg}`,
      })

      navigate('/admin');
    } catch (error) {
      const thisError = error.response.data.message;
      await popup.fire({
        icon: 'error',
        title: 'Update Failed!',
        text: Array.isArray(thisError) ? thisError.join(' / ') : thisError,
      })
    }
  }

  if (!user || !roles || !branchs) {
    return (
      <div className="w-full h-screen bg-gray-50">
        <NavbarAdmin
          bgcolor='bg-white hover:drop-shadow-md'
          textcolor='text-black'
        />
      </div>
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
                    defaultValue={user.id}
                  />
                  <TextField
                    required
                    label="ชื่อ"
                    multiline
                    maxRows={2}
                    onChange={handleFNameChange}
                    defaultValue={user.firstname}
                  />
                  <TextField
                    required
                    label="นามสกุล"
                    multiline
                    maxRows={2}
                    onChange={handleLNameChange}
                    defaultValue={user.lastname}
                  />
                  <TextField
                    required
                    label="อีเมล"
                    autoComplete="email"
                    autoFocus
                    onChange={handleEmailChange}
                    defaultValue={user.email}
                  />
                  <TextField
                    required
                    label="รหัสผ่าน (ไม่ใส่คือไม่เปลี่ยน)"
                    type="password"
                    autoComplete="current-password"
                    onChange={handlePasswordChange}
                  />
                  <TextField
                    label="เบอร์โทรศัพท์"
                    type="tel"
                    maxRows={1}
                    onChange={handleTelChange}
                    defaultValue={user.tel}
                  />
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id='blacklistLebel'>Blacklist</InputLabel>
                    <Select
                      labelId="blacklistLabel"
                      value={blacklist}
                      label="Blacklist"
                      onChange={handleBlacklistChange}
                    >
                      <MenuItem value={0}>False</MenuItem>
                      <MenuItem value={1}>True</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    label="ปีเข้าศึกษา"
                    type="text"
                    maxRows={1}
                    onChange={handleYearChange}
                    defaultValue={user.registYear}
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
                    isOptionEqualToValue={(option, value) => option.name === value.name}
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
                    defaultValue={branchs.find(branch => branch.name === user.branch)}
                  />
                  <div className="absolute mt-[1.5%] ml-[44%]">
                    <Button onClick={() => toggleOpenRole(true)}>
                      เพิ่มตำแหน่ง
                    </Button>
                  </div>
                  {/* add role */}
                  <Dialog open={openRole} onClose={handleCloseRole}>
                    <form onSubmit={handleRoleSubmit}>
                      <DialogTitle className='text-center'>เพิ่มตำแหน่ง</DialogTitle>
                      <hr />
                      <DialogContent>
                        <DialogContentText className='px-5'>
                          โปรดระบุตำแหน่งใหม่
                        </DialogContentText>
                        <div className='flex justify-center'>
                          <TextField
                            autoFocus
                            margin="dense"
                            value={inputRoleEditValue}
                            type="text"
                            variant="standard"
                            onChange={(e) => {
                              setInputRoleEditValue(e.target.value)
                            }}
                          /></div>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleCloseRole}>ยกเลิก</Button>
                        <Button type="submit">ยืนยัน</Button>
                      </DialogActions>
                    </form>
                  </Dialog>
                  <Autocomplete
                    isOptionEqualToValue={(option, value) => option.name === value.name}
                    onChange={(event, newValue) => {
                      setRole(newValue);
                    }}
                    options={roles}
                    getOptionLabel={(option) => option.name}
                    filterSelectedOptions
                    renderInput={(params) => <TextField {...params} label='ตำแหน่ง' />}
                    defaultValue={roles.find(role => role.name === user.role)}
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

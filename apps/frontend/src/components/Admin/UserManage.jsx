import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

// Sample data
const data = [
    { id: 69070501001, firstname: 'Haahahahahahaaa', lastname: 'Mairuruururururuur', email: 'john@example.com', tel: '1234567890', role: 'User', branch: 'COMPUTER ENGINEERING', registYear: 2020, blacklist: false },
    { id: 69070501002, firstname: 'John', lastname: 'Doe', email: 'johnnathanlnwza007@example.com', tel: '1234567890', role: 'Admin', branch: 'Branch A', registYear: 2020, blacklist: false },
    { id: 69070501003, firstname: 'John', lastname: 'Doe', email: 'john@example.com', tel: '1234567890', role: 'User', branch: 'Branch A', registYear: 2020, blacklist: false },
    { id: 69070501004, firstname: 'John', lastname: 'Doe', email: 'john@example.com', tel: '1234567890', role: 'User', branch: 'Branch A', registYear: 2020, blacklist: false },
    { id: 69070501005, firstname: 'John', lastname: 'Doe', email: 'john@example.com', tel: '1234567890', role: 'User', branch: 'Branch A', registYear: 2020, blacklist: false },
    { id: 69070501006, firstname: 'John', lastname: 'Doe', email: 'john@example.com', tel: '1234567890', role: 'User', branch: 'Branch A', registYear: 2020, blacklist: false },
    { id: 69070501007, firstname: 'John', lastname: 'Doe', email: 'john@example.com', tel: '1234567890', role: 'User', branch: 'Branch A', registYear: 2020, blacklist: false },
    { id: 69070501008, firstname: 'John', lastname: 'Doe', email: 'john@example.com', tel: '1234567890', role: 'User', branch: 'Branch A', registYear: 2020, blacklist: false },
    { id: 69070501009, firstname: 'John', lastname: 'Doe', email: 'john@example.com', tel: '1234567890', role: 'User', branch: 'Branch A', registYear: 2020, blacklist: false },
    { id: 69070501010, firstname: 'John', lastname: 'Doe', email: 'john@example.com', tel: '1234567890', role: 'Admin', branch: 'Branch A', registYear: 2020, blacklist: false },
    { id: 69070501011, firstname: 'John', lastname: 'Doe', email: 'john@example.com', tel: '1234567890', role: 'Staff', branch: 'Branch A', registYear: 2020, blacklist: false },
    { id: 69070501012, firstname: 'John', lastname: 'Doe', email: 'john@example.com', tel: '1234567890', role: 'User', branch: 'Branch A', registYear: 2020, blacklist: false },
    { id: 69070501013, firstname: 'John', lastname: 'Doe', email: 'john@example.com', tel: '1234567890', role: 'User', branch: 'Branch A', registYear: 2020, blacklist: false },
    { id: 69070501014, firstname: 'John', lastname: 'Doe', email: 'john@example.com', tel: '1234567890', role: 'User', branch: 'Branch A', registYear: 2020, blacklist: false },
    { id: 69070501015, firstname: 'John', lastname: 'Doe', email: 'john@example.com', tel: '1234567890', role: 'Staff', branch: 'Branch A', registYear: 2020, blacklist: false },
    { id: 69070501016, firstname: 'John', lastname: 'Doe', email: 'john@example.com', tel: '1234567890', role: 'Staff', branch: 'Branch A', registYear: 2020, blacklist: false },
    { id: 69070501017, firstname: 'John', lastname: 'Doe', email: 'john@example.com', tel: '1234567890', role: 'User', branch: 'Branch A', registYear: 2020, blacklist: false },
    { id: 69070501018, firstname: 'John', lastname: 'Doe', email: 'john@example.com', tel: '1234567890', role: 'Admin', branch: 'Branch A', registYear: 2020, blacklist: false },
    { id: 69070501019, firstname: 'John', lastname: 'Doe', email: 'john@example.com', tel: '1234567890', role: 'User', branch: 'Branch A', registYear: 2020, blacklist: false },
    { id: 69070501020, firstname: 'John', lastname: 'Doe', email: 'john@example.com', tel: '1234567890', role: 'User', branch: 'Branch A', registYear: 2020, blacklist: false },
];


export default function UserManage() {

    const [AccountData, setAccountData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleKeyDown = (event) => {
        const keyword = event.target.value;
        setSearchTerm(keyword);
    }

    useEffect(() => {

        function matchingacc() {

            if (!data) return [];

            const filteredData = data.filter((data) => {
                const key = `${data.id} ${data.firstname} ${data.lastname}`.toLowerCase();
                const searchTermLower = searchTerm.toLowerCase();
                return key.includes(searchTermLower);
              });

            const sortedData = filteredData.sort((a, b) => {
                if (a.role !== b.role) {
                  return a.role.localeCompare(b.role);
                } else {
                  return a.id - b.id;
                }
              });
          
              return sortedData;
        }

        setAccountData(matchingacc());
    }, [searchTerm, data]);

    //Del
    const [openDel, toggleOpenDel] = useState(false);

    const handleCloseDel = () => {
        toggleOpenDel(false);
    };

    const handleSubmitDel = (event) => {
        event.preventDefault();
        handleCloseDel();
      };

    function delacc(Id) {
        console.log('test');
    }

    return (
        <div className="translate-y-[16vh] w-[80%] mx-[10%] mb-[13%] min-h-[550px] bg-white border rounded-md">
            <div className='py-[50px]'>
                <h1 className='font-medium font-kanit text-3xl text-[#454545] ml-[50px]'>Account Management</h1>
                <div className='mx-[100px]'>
                    <div className="container">
                        <p className='font-medium font-kanit text-xl text-[#454545] mt-[30px]'><span style={{ color: 'rgb(234,88,12)', fontSize: '38px', paddingRight: '10px' }}>{AccountData.length}</span> Account</p>
                        <Link to={'/admin/newaccount'}>
                            <button className="absolute -translate-y-[5px] right-[33%] w-auto p-[8px] h-auto border-2 rounded-full bg-[#3AAF3C]  hover:bg-[#2e9330] font-semibold font-poppins text-white my-[20px] ease-out duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </button>
                        </Link>
                        <h1 className=' font-medium font-kanit text-xl text-[#454545] mt-[20px]'>ค้นหาบัญชีผู้ใช้</h1>
                        <div className="relative flex items-center ml-[14%] -translate-y-8 h-10 w-[50%] rounded-lg focus-within:shadow-lg
                         bg-white overflow-hidden border-2">
                            <div className="grid place-items-center h-full w-12 text-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                                type="text"
                                id="search"
                                placeholder="ระบุบัญชีผู้ใช้ที่ต้องการแก้ไขหรือลบ.."
                                onChange={handleKeyDown}
                            />
                        </div>
                    </div>
                </div>
                <div className='mx-[40px]'>
                    <table className="w-[100%] border text-left">
                        <thead className='bg-gray-200 h-[50px]'>
                            <tr>
                                <th className='border'></th>
                                <th className='px-[20px] font-medium text-base border'>Id</th>
                                <th className='px-[20px] font-medium text-base border'>Firstname</th>
                                <th className='px-[20px] font-medium text-base border'>lastname</th>
                                <th className='px-[20px] font-medium text-base border'>Email</th>
                                <th className='px-[20px] font-medium text-base border'>Tel</th>
                                <th className='px-[20px] font-medium text-base border'>Role</th>
                                <th className='px-[20px] font-medium text-base border'>Branch</th>
                                <th className='px-[20px] font-medium text-base border'>RegistYear</th>
                                <th className='px-[20px] font-medium text-base border'>Blacklist</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {AccountData.map((row) => (
                                <tr key={row.id}>
                                    <td className='flex justify-center items-center px-[10px] border-b w-20'><img src='./image/PAX.jpg' className="w-12 h-12 rounded-full my-[10px]" /></td>
                                    <td className='border px-[10px]'>{row.id}</td>
                                    <td className='border px-[10px]'>{row.firstname}</td>
                                    <td className='border px-[10px]'>{row.lastname}</td>
                                    <td className='border px-[10px]'>{row.email}</td>
                                    <td className='border px-[10px]'>{row.tel}</td>
                                    <td className='border px-[10px]'>{row.role}</td>
                                    <td className='border px-[10px]'>{row.branch}</td>
                                    <td className='border px-[10px]'>{row.registYear}</td>
                                    <td className='border px-[10px]'>{row.blacklist ? 'Yes' : 'No'}</td>
                                    <td>
                                        <Link to={`/admin/${row.id}/edit`}>
                                            <button
                                                className=" w-[80px] h-[35px] mx-[10px] rounded-full border-2 bg-[#0092BF]  hover:bg-[#007396] font-regular font-poppins text-white text-md ease-out duration-300"
                                            >edit</button>
                                        </Link>
                                    </td>
                                    <td><button
                                        className="w-auto p-[10px] mx-[10px] rounded-full bg-[#F44336] border-2 hover:bg-[#c5342a] font-regular font-poppins text-white text-md ease-out duration-300"
                                        onClick={toggleOpenDel}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* del */}
                    <Dialog open={openDel} onClose={handleCloseDel}>
                        <form onSubmit={handleSubmitDel}>
                            <DialogTitle className='text-center'>ลบบัญชีผู้ใช้</DialogTitle>
                            <hr />
                            <DialogContent>
                                <DialogContentText className='px-5'>
                                    คุณแน่ใจหรือไม่ว่าต้องการลบ {data.firstname} ออก
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseDel}>ยกเลิก</Button>
                                <Button type="submit" onClick={() => delacc(data.id)}>ยืนยัน</Button>
                            </DialogActions>
                        </form>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}

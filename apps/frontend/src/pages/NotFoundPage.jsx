import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="w-full h-screen bg-slate-100 p-20">
      <h1 className="text-center text-black text-6xl">Not Found This Page!</h1>
      <img className="mx-auto mt-20 mb-20" src="https://media.tenor.com/_aPf1OKG3egAAAAC/ijiranaide-nagatoro-san-nagatoro.gif" alt="Not Found" />
      <div className="flex justify-center items-center">
        <Link to="/">
          <Button variant="contained" className="mx-auto">Back To Home Page</Button>
        </Link>
      </div>
    </div>
  );
}

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { EventPage } from '@/pages/EventPage';
import { ServicePage } from '@/pages/ServicePage';
import BlogPage from '@/pages/BlogPage';
import EventbyId from './pages/EventbyId';
import RoomService from '@/pages/RoomService';
import { BookPage } from '@/pages/BookPage';
import Newbook from './components/Staff/Newbook';
import NewRoom from './components/Staff/NewRoom';
import NewEvent from './components/Staff/NewEvent';
import { StaffPage } from '@/pages/StaffPage';
import Newblog from '@/components/Blog/NewBlog';
import SignIn from '@/pages/SigninPage';
import { AuthProvider } from '@/contexts/AuthContext';

export const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={ <HomePage /> } />
          <Route path='/event' element={ <EventPage /> } />
          <Route path='/service' element={ <ServicePage /> } />
          <Route path="/service/room/:roomid" element={ <RoomService/> } />
          <Route path="/blog" element={ <BlogPage/> }/>
          <Route path="/blog/create" element={ <Newblog/> }/>
          <Route path="/book/:bookid" element={ <BookPage/> } /> 
          <Route path='/book/create' element={ <Newbook/>} /> 
          <Route path='/room/create' element={ <NewRoom/>} /> 
          <Route path='/event/create' element={ <NewEvent/>} /> 
          <Route path='/event/:eventid' element={ <EventbyId/>} />
          <Route path='/staff' element={ <StaffPage /> } />
          <Route path='/signin' element= { < SignIn />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

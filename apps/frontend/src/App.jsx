import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { EventPage } from '@/pages/EventPage';
import { ServicePage } from '@/pages/ServicePage';
import BlogPage from '@/pages/BlogPage';
import EventbyId from './pages/EventbyId';
import RoomService from '@/pages/RoomService';
import { BookPage } from '@/pages/BookPage';
import Newbook from '@/components/Staff/Newbook';
import NewRoom from '@/components/Staff/NewRoom';
import CreateEvent from '@/components/Event/CreateEvent';
import NewEvent from '@/components/Staff/NewEvent';
import StaffPage from '@/pages/StaffPage';
import Newblog from '@/components/Blog/NewBlog';
import SignIn from '@/pages/SigninPage';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import Editbook from '@/components/Staff/Editbook';
import Editevent from '@/components/Staff/Editevent';
import Editroom from '@/components/Staff/Editroom';
import AdminPage from '@/pages/AdminPage';
import NewAcc from '@/components/Admin/NewAcc';
import EditAcc from './components/Admin/EditAcc';
import ProfilePage from '@/pages/ProfilePage';
import NotFound from '@/pages/NotFoundPage';

export const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter basename='/'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/event' element={<EventPage />} />
            <Route path='/service' element={<ServicePage />} />
            <Route path="/service/room/:roomid" element={<RoomService />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/create" element={<Newblog />} />
            <Route path="/book/:bookid" element={<BookPage />} />
            <Route path='/staff/book/create' element={<Newbook />} />
            <Route path='/staff/book/:bookid/edit' element={<Editbook />} />
            <Route path='/staff/room/create' element={<NewRoom />} />
            <Route path='/staff/room/:roomid/edit' element={<Editroom />} />
            <Route path='/event/create' element={<CreateEvent />} />
            <Route path='/event/:eventid' element={<EventbyId />} />
            <Route path='/staff/event/create' element={<NewEvent />} />
            <Route path='/staff/event/:eventid/edit' element={<Editevent />} />
            <Route path='/staff' element={<StaffPage />} />
            <Route path='/signin' element={< SignIn />} />
            <Route path='/admin' element={< AdminPage />} />
            <Route path='/admin/newaccount' element={< NewAcc />} />
            <Route path='/admin/:id/edit' element={< EditAcc />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
};

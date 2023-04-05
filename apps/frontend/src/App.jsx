import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { EventPage } from './pages/EventPage';

export const App = () => {
  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route path='/' element={ <HomePage /> } />
        <Route path='/event' element={ <EventPage /> } />
      </Routes>
    </BrowserRouter>
  );
};

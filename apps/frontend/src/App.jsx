import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';

export const App = () => {
  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route path='/' element={ <HomePage /> } />
      </Routes>
    </BrowserRouter>
  );
};

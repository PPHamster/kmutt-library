import { fetch } from '@/utils/Fetch';
import { useAuth } from '@/contexts/AuthContext';
import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [download, setDownload] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const getCartItem = async () => {
      try {
        const response = await fetch.get('/books/cart');
        setCart(response.data);
        setDownload(false);
      } catch {
        setDownload(false);
      }
    }
    getCartItem();
  }, [download, user]);

  const addCart = async (bookId) => {
    try {
      const response = await fetch.post(`/books/${bookId}/select`);
      setDownload(true);
      return response;
    } catch (error) {
      return error;
    }
  }

  const deleteCart = async (bookId) => {
    try {
      const response = await fetch.delete(`/books/${bookId}/select`);
      setDownload(true);
      return response;
    } catch (error) {
      return error;
    }
  }

  return (
    <CartContext.Provider
      value={{ cart, setCart, addCart, deleteCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
}

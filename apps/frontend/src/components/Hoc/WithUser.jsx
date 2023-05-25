import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { fetch } from '@/utils/Fetch';

export const WithUser = (WrappedComponent) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    const { user, setUser } = useAuth();

    useEffect(() => {
      const getUserData = async () => {
        try {
          const response = await fetch.get('/auth/me');
          setUser(response.data);
        } catch {
          navigate('/');
        }
      }
      getUserData();
    }, []);

    if (!user) return <div className="w-full h-screen bg-slate-200"></div>;

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
}

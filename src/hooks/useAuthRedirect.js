import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const useAuthRedirect = () => {

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/') {
      if (!(localStorage.getItem('my-accessToken'))) {
        navigate('/login');
      }
    }
  }, [location, navigate]);
  
};

export default useAuthRedirect;
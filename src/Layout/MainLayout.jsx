import { Outlet } from "react-router-dom";
import NavbarFunc from "../components/Navbar";
import FooterFunc from "../components/Footer";
import { GlobalContext } from "../context/AppContext";
import { useContext, useState, useEffect } from "react";
import Alert from "../components/Alert";
import useAuthRedirect from "../hooks/useAuthRedirect";
const MainLayout = () => {
  const { theme } = useContext(GlobalContext);
  useAuthRedirect();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  return (
    <div data-theme={theme}>
      <Alert />
      {isOnline === true ?
        (
          ""
        ) : (
          <div className="text-center text-xl bg-red-500 text-white w-full fixed top-16 z-50">
            No Internet Connection
          </div>
        )
      }
      <NavbarFunc />
      <Outlet />
      <FooterFunc />
    </div>
  );
};

export default MainLayout;

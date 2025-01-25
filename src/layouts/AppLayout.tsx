import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css';
import { jwtDecode } from "jwt-decode";

import { getUser, refreshToken } from "@/services/AuthService";
import Logo from "@/components/Logo";
import NavMenu from "@/components/NavMenu";
import { useQuery } from "@tanstack/react-query";

export default function AppLayout() {
  const navigate = useNavigate();
  useEffect(() => {
    const refreshTokenHandler = async () => {
      try {
        const session = await refreshToken();
        localStorage.setItem('token', session.token);
      } catch (error) {
        navigate('/auth/login');
      }
    };

    const setupTokenRefresh = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/auth/login');
        return;
      }
      try {
        const { exp }: { exp: number } = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        const timeUntilExpiration = exp - currentTime;
        const refreshTime = (timeUntilExpiration - 60) * 1000;
        setTimeout(refreshTokenHandler, refreshTime);        
      } catch (error) {
        navigate('/auth/login');
      }
    };

    setupTokenRefresh();

    window.addEventListener('focus', setupTokenRefresh);
    return () => {
      window.removeEventListener('focus', setupTokenRefresh);
    };
  }, [navigate]);

  const { data } = useQuery({
    queryKey: ["getUser"],
    queryFn: getUser
  });

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <header className="bg-gray-800 py-5 px-8">
        <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className="w-64">
            <Link to={'/'}>
              <Logo/>
            </Link>
          </div>
          <NavMenu username={data?.username}/>
        </div>
      </header>
      <section className="w-full max-w-screen-2xl mx-auto mt-10 p-5">
        <Outlet/>
      </section>
      <footer className="py-5">
        <p className="text-center">
          Todos los derechos reservados { new Date().getFullYear() }
        </p>
      </footer>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </div>
  )
}

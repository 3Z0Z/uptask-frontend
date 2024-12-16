import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css';
import Logo from "@/components/Logo";
import NavMenu from "@/components/NavMenu";

export default function AppLayout() {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <header className="bg-gray-800 py-5 px-8">
        <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className="w-64">
            <Link to={'/'}>
              <Logo/>
            </Link>
          </div>
          <NavMenu/>
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

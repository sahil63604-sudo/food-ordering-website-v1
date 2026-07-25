import { NavLink, Outlet ,useLocation,Navigate,useNavigate} from "react-router-dom";
import logo from "../src/assets/logo.png";
import { useEffect } from "react";

const Adminpage = ({bell,setBell}) => {
  const navStyle = ({ isActive }) =>
    `block px-4 py-3 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-orange-500 text-white font-semibold shadow-md"
        : "text-gray-700 hover:bg-gray-100 hover:text-orange-500"
    }`;

  const navigate = useNavigate();

useEffect(() => {
  if (!document.cookie.includes("token=")) {
    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, 3000);

    return () => clearTimeout(timer);
  }
}, [navigate]);

if (!document.cookie.includes("token=")) {
  return <h2>Session expired. Redirecting to home...</h2>;
}
  

  return (

    <div className="h-screen flex flex-col bg-gray-100">
      
      {/* Top Navbar */}
      <nav className="h-20 bg-white shadow-md flex items-center justify-between px-8 z-50 ">
        <img
          src={logo}
          alt="Logo"
          className="h-14 md:h-16 rounded-full"
          />

        <div className="flex items-center gap-6">
       <div className="relative" onClick={()=>setBell(!bell)}>
          <img
      src="https://img.icons8.com/?size=100&id=11642&format=png&color=FD7E14"
      alt="Order History"
      className="w-8 h-8"
    />
  <p className={` rounded-full  absolute top-0 right-0 ${bell ? "w-2 h-2 animate-ping bg-red-700" : "w-0 h-0 animate-none"}`} ></p>
     
       </div>

          <div className="flex items-center gap-3 bg-orange-50 px-4 py-1 rounded-xl border border-orange-100 shadow-sm">

  <div className="relative">
    <img
      src="https://img.icons8.com/?size=100&id=FAYM3LUVoMeE&format=png&color=FD7E14"
      alt="Admin"
      className="w-11 h-11 rounded-full"
    />
 </div>

  <div className="leading-tight">
    <h3 className="font-semibold text-gray-800">
      Preet Singh
    </h3>

    <p className="text-xs text-gray-500">
      Restaurant Admin
    </p>

    <div className="flex items-center gap-1 mt-1">
      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
      <span className="text-xs font-medium text-green-600">
        Online
      </span>
    </div>
  </div>

</div>
        </div>
      </nav>

      {/* Main Section */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
       <aside className="w-44 shrink-0 bg-white shadow-md space-y-3 p-2 overflow-y-auto">
          <NavLink to="dashboard" className={navStyle}>
            Dashboard
          </NavLink>

          <NavLink to="menu" className={navStyle}> 
            Menu
          </NavLink>

          <NavLink to="orders" className={navStyle}>
            Orders
          </NavLink>

          <NavLink to="reservation" className={navStyle}>
            Reservations
          </NavLink>
        </aside>

        {/* Main Content */}
       <main className="flex-1 min-w-0 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );

};

export default Adminpage;

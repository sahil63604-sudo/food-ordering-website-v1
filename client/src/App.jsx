import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import { Routes, Route, useLocation } from "react-router-dom";
import HomeSection from '../Pages/homePage'
import Reservation from '../Components/Reservation'
import Navbar from '../Components/Navbar'
import Footer from '../Components/footer'
import Menupage from '../Pages/MenuPage'
import Adminpage from '../Components/adminpage'
import Loader from "../Components/Loader";
import AdminDashboard from '../Components/AdminDashboard';
import AdminMenusection from '../Components/AdminMenusection';
import AdminOrders from '../Components/AdminOrders';
import AdminReservation from '../Components/AdminReservation';
import Cart from '../Components/cart'
import LoginPage from '../Pages/loginPage'
import CheckoutModal from '../Components/CheckOutPage'
import NotFound from '../Components/NotFound'
function App() {
  const myId = useRef(crypto.randomUUID());
  window.scrollTo(0, 0);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [adminlogin, setAdminlogin] = useState(false)
  const [statusTrack, setStatus] = useState({
    orderPlaced: false,
    Confirmed: false,
    Preparing: false,
    ReadyForPickup: false,
    OutForDilivery: false,
    Deliverd: false

  });
  const [form, setForm] = useState(false);
  const [bell, setBell] = useState(false);
  const [categoryMenu, setCategoryMenu] = useState(false);
  const isAdmin = location.pathname.startsWith("/Admin");
  const [confirm,setConfirm]=useState(false);
  const [type,setType]=useState('')

  const socket = useRef()

  useEffect(() => {

    const timer = setTimeout(() => {

      setLoading(false);

    }, 1000);
    socket.current = new WebSocket('ws://localhost:3000')
    socket.current.onopen = () => {
      console.log('ws connected');
    }
    let userId = localStorage.getItem("userId");

    if (!userId) {
      userId = crypto.randomUUID();
      localStorage.setItem("userId", userId);
    }
    return () => clearTimeout(timer);

  }, []);

  if (loading) {
    return <Loader />
  }
  console.log(confirm);

  if (adminlogin) {
    return <LoginPage setadminlogin={setAdminlogin} adminlogin={adminlogin} />
  }

  return (
    <>
      {!isAdmin && <Navbar
        statusTrack={statusTrack}
        setadminlogin={setAdminlogin}
        adminlogin={adminlogin}
        socket={socket}
      />}
      <Routes >
        <Route path="/" element={<HomeSection socket={socket} />} />
        <Route path="/Cart" element={<Cart userId={myId} setStatus={setStatus} statusTrack={statusTrack} confirm={confirm} setConfirm={setConfirm}  type={type} setType={setType}  />} />
        <Route path="/Checkout" element={<CheckoutModal setBell={setBell} />} />

        <Route path="/Menu" element={<Menupage socket={socket} />} />
        <Route path="/Reservations" element={<Reservation bell={bell} setBell={setBell} />} />


        <Route path="/Admin" element={<Adminpage bell={bell} setBell={setBell} />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="menu" element={<AdminMenusection form={form} setForm={setForm} categoryMenu={categoryMenu} setCategoryMenu={setCategoryMenu} type={type} setType={setType} confirm={confirm} setConfirm={setConfirm} />} />
          <Route path="orders" element={<AdminOrders socket={socket}/>} />
          <Route path="reservation" element={<AdminReservation socket={socket} confirm={confirm} setConfirm={setConfirm}  type={type} setType={setType}/>} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAdmin && <Footer />}

    </>

  )
}

export default App

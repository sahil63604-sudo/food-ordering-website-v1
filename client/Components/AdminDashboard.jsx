import React, { useState } from 'react'
import Admin from './AdminMenuForm'
import { useEffect } from 'react';
import RevenueChart from "./RevenueChart";
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  
  const [dashboard,setDashboard]=useState({});
  const [order,setOrder]=useState([]);
  const [reservation,setReservation]=useState([]);
  const navigate = useNavigate()

  useEffect(() => {
  getDashboard(); 
  getOrder();
  getReservation(); 
}, []);

  const getDashboard = async() =>{
    let res = await fetch("http://localhost:3000/dashboard");
    let data = await res.json();
    setDashboard(data)
  }

  const getOrder = async() =>{

    let res = await fetch(`http://localhost:3000/getAdminCartData`);
    let data = await res.json();
    setOrder(data.data)
  }

  const getReservation = async() =>{
    let res = await fetch('http://localhost:3000/get-Reservation');
    let data = await res.json();
    setReservation(data.data)
  }

  const pieData = dashboard.orderStatusChart?.map(item => ({
  name: item._id,
  value: item.count
}));
  return (
    <>
    <section className='bg-[#fff8dd] px-4 sm:px-6 py-6'>
      <div className="flex flex-col sm:flex-row sm:items-center gap-5 bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-orange-100 mb-6">

  <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-2xl bg-orange-100">
    <img
      src="https://img.icons8.com/?size=100&id=15HuPyEJyD8J&format=png&color=FD7E14"
      alt="Order History"
      className="w-10 h-10 sm:w-12 sm:h-12"
    />
  </div>

  <div>
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
      Dashboard
    </h1>

    <p className="text-sm sm:text-base text-gray-500 mt-1">
      Welcome back! Here's an overview of your restaurant's performance,
      orders, revenue, menu, and reservations.
    </p>
  </div>

</div>

<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 *:bg-white *:rounded-2xl">
      <div onClick={()=>navigate('/Admin/orders')} className="cursor-pointer px-4 py-5 flex flex-row sm:flex-row items-center sm:justify-evenly gap-4 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-orange-100">
        <div className='self-center'> <img width="48" height="48" src="https://img.icons8.com/?size=100&id=ySRi3OLgoOJX&format=png&color=FD7E14" alt="ticket-confirmed"/></div>
        <div>
          <h1 className="font-bold text-sm md:text-base text-gray-700">Total Orders</h1>
<p className="text-xl sm:text-2xl font-extrabold"> {dashboard.totalOrders}</p>
<p className="font-bold text-sm text-gray-700"> All customer orders received</p>
        </div>
      </div>
       <div  className=" px-4 py-5 flex flex-row sm:justify-evenly gap-4 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-orange-100">
        <div  className='self-center'><img width="52" height="52" className='' src="https://img.icons8.com/?size=100&id=68426&format=png&color=FD7E14" alt="data-pending"/></div>
        <div>
          <h1 className="font-bold text-sm md:text-base text-gray-700">Total Revenue</h1>
          <p className="text-xl sm:text-2xl font-extrabold">₹ {dashboard.totalRevenue}</p>
          <p className='font-bold text-sm text-gray-700'>Total earnings from  orders.</p>
        </div>
      </div>
       <div onClick={()=>navigate('/Admin/menu')} className="cursor-pointer px-4 py-5 flex flex-row sm:flex-row items-center sm:justify-evenly gap-4 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-orange-100">
        <div className='self-center'><img width="48" height="48" src="https://img.icons8.com/?size=100&id=QiAIVvJZ1woO&format=png&color=FD7E14" alt="ticket-confirmed"/></div>
        <div>
          <h1 className="font-bold text-sm md:text-base text-gray-700"> Menu Items</h1>
          <p className="text-xl sm:text-2xl font-extrabold">{dashboard.totalMenuItems}</p>
          <p className='font-bold text-sm text-gray-700'>Currently available dishes</p>
        </div>
      </div>
       <div onClick={()=>navigate('/Admin/reservation')} className="px-4 py-5 flex flex-row sm:flex-row items-center sm:justify-evenly gap-4 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-orange-100">
        <div className='self-center'><img width="48" height="48" src="https://img.icons8.com/?size=100&id=qXfHicSrtSY4&format=png&color=FD7E14" alt="checked-truck"/></div>
        <div>
          <h1 className="font-bold text-sm md:text-base text-gray-700"> Reservations</h1>
          <p className="text-xl sm:text-2xl font-extrabold">{dashboard.totalReservations}</p>
          <p className='font-bold text-sm text-gray-700'>Total table bookings</p>
        </div>
      </div>
      
    </div>

   <div className="hidden md:block mt-7 pb-4 overflow-x-auto">
    <RevenueChart
        data={dashboard.revenueChart}
        pieData={pieData}
    />
</div>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

  {/* Recent Orders */}
  <div className="bg-white rounded-2xl shadow-md border border-orange-100 overflow-hidden">
    <div className="flex items-center justify-between px-6 py-4 border-b border-orange-100">
      <div>
        <h2 className="text-xl font-bold text-gray-800">
          Recent Orders
        </h2>
        <p className="text-sm text-gray-500">
          Latest customer orders
        </p>
      </div>

      <button className="text-orange-500 font-semibold hover:text-orange-600 transition cursor-pointer" 
      onClick={()=>navigate('/Admin/orders')}>
        View All
      </button>
    </div>

    <div className="overflow-x-auto md:overflow-visible">
    <table className="min-w-[650px] md:min-w-full w-full">
      <thead className="bg-orange-50">
        <tr className="text-gray-700">
          <th className="px-5 py-3 text-left">Order ID</th>
          <th className="px-5 py-3 text-left">Name</th>
          <th className="px-5 py-3 text-left">Amount</th>
          <th className="px-5 py-3 text-center">Status</th>
        </tr>
      </thead>

      <tbody>
        {order.slice(0,4).map((item)=>{
          return <tr className="border-b hover:bg-gray-50 transition">
          <td className="px-5 py-4 font-medium">#{item._id.slice(-6)}</td>
          {item.cartItems.map((data) => (
      <p
        key={data._id}
        className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs "
      >
        {data.name}
      </p>
    ))}
          <td className="px-5 py-4 font-semibold text-green-600">₹{item.grandTotal}</td>
          <td className="px-5 py-4 text-center">
            <p className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
              {item.orderStatus}
            </p>
          </td>
        </tr>
        })}
      </tbody>
    </table>
  </div>
  </div>

  {/* Recent Reservations */}
  <div className="bg-white rounded-2xl shadow-md border border-orange-100 overflow-hidden">
    <div className="flex items-center justify-between px-6 py-4 border-b border-orange-100">
      <div>
        <h2 className="text-xl font-bold text-gray-800">
          Recent Reservations
        </h2>
        <p className="text-sm text-gray-500">
          Latest table bookings
        </p>
      </div>

      <button className="text-orange-500 font-semibold hover:text-orange-600 transition cursor-pointer" 
       onClick={()=>navigate('/Admin/reservation')}>
        View All
      </button>
    </div>

    <div className="overflow-x-auto md:overflow-visible">
    <table className="min-w-[650px] md:min-w-full w-full">
      <thead className="bg-orange-50">
        <tr className="text-gray-700">
          <th className="px-5 py-3 text-left">ID</th>
          <th className="px-5 py-3 text-left">Guests</th>
          <th className="px-5 py-3 text-left">Date</th>
          <th className="px-5 py-3 text-left hidden md:block">Time</th>
          <th className="px-5 py-3 text-center">Status</th>
        </tr>
      </thead>

      <tbody>
       {reservation.slice(0,4).map((info)=>{
        return  <tr className="border-b hover:bg-gray-50 transition">
          <td className="px-5 py-4 font-medium">#{info._id.slice(-6)}</td>
          <td className="px-5 py-4">{info.guests}</td>
          <td className="px-5 py-4">{new Date(info.date).toLocaleDateString("en-IN")}</td>
          <td className="px-5 py-4 hidden md:block">{info.time}</td>
          <td className="px-5 py-4 text-center">
            <p className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
              {info.state}
            </p>
          </td>
        </tr>
       })}
      </tbody>
    </table>
  </div>
  </div>

</div>
    </section>
    </>
  )
}

export default AdminDashboard
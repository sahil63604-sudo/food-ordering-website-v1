import React, { useEffect, useState } from 'react'
import Swal from "sweetalert2";
import { FaUserCircle } from 'react-icons/fa';
const AdminOrders = ({socket}) => {

  const statusOptions = [
    {
      title: "Update Status"
    },
    {
      title: "Order Placed"
    },
    {
      title: "Confirmed"
    },
    {
      title: "Preparing"
    },
    {
      title: "Ready for Pickup"
    },
    {
      title: "Out for Delivery"
    },
    {
      title: "Delivered"
    }
  ]

  const statusStyle = (status) => {
    switch (status) {
      case "Order Placed":
        return "bg-blue-100 text-blue-700";

      case "Confirmed":
        return "bg-indigo-100 text-indigo-700";

      case "Preparing":
        return "bg-yellow-100 text-yellow-700";

      case "Ready for Pickup":
        return "bg-purple-100 text-purple-700";

      case "Out for Delivery":
        return "bg-cyan-100 text-cyan-700";

      case "Delivered":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  const [order, setOrder] = useState([]);
  const [orderCount, setOrderCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectorvalue,setSelectorvalue]=useState('All');

  const selector=order.filter((item)=>{if (selectorvalue=='All') {
    return order
  }else if (item.orderStatus===selectorvalue) {
    return item
  }
});
  
  


  useEffect(() => {
    
    foodOrder();
    let interval = setInterval(() => {
       foodOrder();
    },5000);
    return ()=> clearInterval(interval)
  }, [pageNumber])

  const foodOrder = async () => {
  try {
        let res = await fetch(`http://localhost:3000/getAdminCartData?page=${pageNumber}`);
        let data = await res.json();
        setOrder(data.data);
        setOrderCount(data.count)
        setTotalPages(data.totalPages)
      }
     catch (error) {
      console.log(error);
      
    }
  }
  const updateOrderStatus = async (id, status) => {
    
    try {
      let res = await fetch(`http://localhost:3000/order-status/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          orderStatus: status
        })
      });
      
   socket.current.send(JSON.stringify({
    type:'Order_added'
   }))
      if (res.ok) {
        setOrder((prev) => {
          return prev.map((item) => item._id === id ? { ...item, orderStatus: status } : item)
        })
      }

      Swal.fire({
        icon: "success",
        title: "Status Updated",
        text: `Order status changed to ${status}`,
        timer: 1500,
        showConfirmButton: false,
      });
     
    } catch (error) {
      console.log(error);

    }
  }

  const orderDelivered = order.filter(item => item.orderStatus === "Delivered").length
  const orderPlaced = order.filter(item => item.orderStatus === "Order Placed").length
  const readyToPickup = order.filter(item => item.orderStatus === "Ready for Pickup").length;


  return (
    <>
      <section className="bg-[#fff8dd] px-4 sm:px-6 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-orange-100 mb-6">

          {/* Icon */}
          <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-orange-100">
            <img
              src="https://img.icons8.com/officel/80/order-history.png"
              alt="Order History"
              className="w-10 h-10"
            />
          </div>

          {/* Text */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Order History
            </h1>

            <p className="text-sm sm:text-base text-gray-500 mt-1">
              View, track, and manage all customer orders in one place.
            </p>
          </div>

        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 *:bg-white *:rounded-2xl">
          <div onClick={()=>setSelectorvalue('All')} className=' px-1 cursor-pointer py-4 w-full flex justify-evenly "bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-orange-100'>
            <div className='self-center'><img width="48" height="48" src="https://img.icons8.com/pastel-glyph/64/FD7E14/paper-bag--v2.png" alt="paper-bag--v2" /></div>
            <div >
              <h1 className='font-bold
           text-sm text-gray-700'>Total Orders</h1>
              <p className='text-xl sm:text-2xl font-extrabold'>{orderCount}</p>
              <p className='font-bold text-sm text-gray-700'>All time orders</p>
            </div>
          </div>
          <div onClick={()=>setSelectorvalue('Order Placed')} className=' px-1 cursor-pointer py-4 w-full  flex justify-evenly "bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-orange-100'>
            <div className='self-center'><img width="48" height="48" className='' src="https://img.icons8.com/parakeet-line/48/FD7E14/data-pending.png" alt="data-pending" /></div>
            <div >
              <h1 className='font-bold text-sm text-gray-700'>Placed Orders </h1>
              <p className='text-xl sm:text-2xl font-extrabold'>{orderPlaced}</p>
              <p className='font-bold text-sm text-gray-700'>Need atention</p>
            </div>
          </div>
          <div onClick={()=>setSelectorvalue('Delivered')} className=' px-1 cursor-pointer py-4 w-full  flex justify-evenly "bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-orange-100'>
            <div className='self-center'><img width="48" height="48" src="https://img.icons8.com/ios/50/FD7E14/checked-truck.png" alt="checked-truck" /></div>
            <div >
              <h1 className='font-bold text-sm text-gray-700'>Delivered Orders</h1>
              <p className='text-xl sm:text-2xl font-extrabold'>{orderDelivered}</p>
              <p className='font-bold text-sm text-gray-700'>Successfully delivered</p>
            </div>
          </div>
          <div onClick={()=>setSelectorvalue('Ready for Pickup')} className="px-1 cursor-pointer py-4 w-full flex justify-evenly bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-orange-100">
            <div className="self-center">
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/?size=100&id=112481&format=png&color=FD7E14"
                alt="Ready for Pickup"
              />
            </div>

            <div >
              <h1 className="font-bold text-sm text-gray-700">Ready for Pickup</h1>
              <p className="text-xl sm:text-2xl font-extrabold"> {readyToPickup} </p>
              <p className="font-bold text-sm text-gray-700">Waiting for customer </p>
            </div>
          </div>
        </div>

       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6 py-6">
  {selector.map((food) => {

    const details = food.PaymentDetails?.[0];

    return (
      <div
        key={food._id}
        className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-orange-100 overflow-hidden"
      >
        {/* Customer Info */}
        <div className="p-5 border-b border-gray-200">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center">
              <FaUserCircle className="text-5xl text-orange-500" />
            </div>

            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-800">
                {details?.name}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                📞 {details?.phone}
              </p>

              <p className="text-sm text-gray-500 mt-1 break-words w-32 truncate">
                📍 {details?.address}, {details?.city} - {details?.pincode}
              </p>
            </div>

            <span
              className={`${statusStyle(
                food.orderStatus
              )} text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap`}
            >
              {food.orderStatus}
            </span>
          </div>
        </div>

        {/* Order Details */}
        <div className="p-5 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">
              Order ID
            </span>

            <span className="font-semibold">
              #{food._id.slice(-6)}
            </span>
          </div>

          <div className="flex justify-between items-center mt-3">
            <span className="text-gray-500 text-sm">
              Date
            </span>

            <span className="font-medium">
              {new Date(food.createdAt).toLocaleDateString("en-IN")}
            </span>
          </div>

          <div className="flex justify-between items-center mt-2">
            <span className="text-gray-500 text-sm">
              Time
            </span>

            <span className="font-medium">
              {new Date(food.createdAt).toLocaleTimeString("en-IN")}
            </span>
          </div>
        </div>

        {/* Ordered Items */}
        <div className="p-5 border-b border-gray-200">
          <h3 className="font-semibold text-gray-700 mb-3">
            Ordered Items
          </h3>

          <div className="space-y-3 h-44 overflow-y-auto">
            {food.cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-xl object-cover border"
                  />

                  <div>
                    <p className="font-medium text-gray-800">
                      {item.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      ₹{item.price}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-orange-500">
                    × {item.quantity}
                  </p>

                  <p className="text-sm font-semibold">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment */}
        <div className="p-5 border-b border-gray-200 space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">
              Delivery
            </span>

            <span className="font-semibold text-orange-500">
              {details?.delivery}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">
              Payment
            </span>

            <span className="font-semibold">
              {details?.payment}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">
              Payment Status
            </span>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                details?.payment === "Cash on Delivery"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {details?.payment === "Cash on Delivery"
                ? "Pending"
                : "Paid"}
            </span>
          </div>

          <div className="flex justify-between items-center pt-2 border-t">
            <span className="font-semibold text-gray-700">
              Grand Total
            </span>

            <span className="text-2xl font-bold text-orange-500">
              ₹{food.grandTotal}
            </span>
          </div>
        </div>

        {/* Update Status */}
        <div className="p-5">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Update Order Status
          </label>

          <select
            value={food.orderStatus}
            onChange={(e) =>
              updateOrderStatus(food._id, e.target.value)
            }
            className="w-full rounded-xl border-2 border-orange-300 bg-orange-50 px-4 py-3 text-sm font-semibold text-orange-600 outline-none focus:border-orange-500"
          >
            {statusOptions.map((status) => (
              <option
  key={status.title}
  value={status.title}
  disabled={
    status.title === "Update Status" ||
    statusOptions.findIndex((item) => item.title === status.title) <
      statusOptions.findIndex((item) => item.title === food.orderStatus)
  }
>
  {status.title}
</option>
            ))}
          </select>
        </div>
      </div>
    );
  })}
</div>
               <div className="flex justify-center items-center gap-6 mt-12 pb-6">

  {/* Previous */}
  <button
    disabled={pageNumber === 1}
    onClick={() => setPageNumber(pageNumber - 1)}
    className="
      px-6 py-3 rounded-full
      bg-gradient-to-r from-orange-500 to-red-500
      text-white font-semibold
      shadow-lg
      transition-all duration-300
      hover:scale-105 hover:shadow-orange-400/40
      active:scale-95
      disabled:bg-gray-300
      disabled:shadow-none
      disabled:cursor-not-allowed
      disabled:hover:scale-100
    "
    title='Previous'
  >
    ← 
  </button>

  {/* Page Number */}
  <div
    className="
      min-w-[130px]
      px-6 py-3
      rounded-full
      bg-white
      border border-orange-200
      shadow-md
      text-lg
      font-bold
      text-orange-600
      flex justify-center items-center
      transition-all duration-300
      hover:shadow-lg hover:scale-105
    "
    
  >
     {pageNumber}
    <span className="mx-2 text-gray-400">/</span>
    {totalPages}
  </div>

  {/* Next */}
  <button
    disabled={pageNumber === totalPages}
    onClick={() => setPageNumber(pageNumber + 1)}
    className="
      px-6 py-3 rounded-full
      bg-gradient-to-r from-orange-500 to-red-500
      text-white font-semibold
      shadow-lg
      transition-all duration-300
      hover:scale-105 hover:shadow-orange-400/40
      active:scale-95
      disabled:bg-gray-300
      disabled:shadow-none
      disabled:cursor-not-allowed
      disabled:hover:scale-100
    "
    title='Next'
  >
     →
  </button>

</div>
      </section>
    </>
  )
}

export default AdminOrders
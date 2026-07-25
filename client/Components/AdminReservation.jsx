import React, { useEffect, useState } from 'react'
import ConfirmationModel from './confirmationModel';

const AdminReservation = ({ confirm, Cancel, setConfirm, socket, setType, type }) => {

  const [reservationData, setReservationData] = useState([])
  const [reservationCount, setReservationCount] = useState(0)
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [id, setId] = useState(null);
  const [cancelId, setCancelId] = useState(null);
  // const [type,setType]=useState('')
  const [status, setStatus] = useState("all")
  const state = reservationData.filter((item) => {
    if (status == 'all') {
      return reservationData
    }
    else if (item.state === status) {
      return item;
    }
  })

  useEffect(() => {
    showReservation();
    socket.current.onmessage = (event) => {
      const data = JSON.parse(event.data)

      if (event.data.type === "RESERVATION STATUS UPDATE") {
        showReservation()
      }
    }
  }, [pageNumber]);

  const showReservation = async () => {
    try {
      let res = await fetch(`http://localhost:3000/get-Reservation?page=${pageNumber}`);
      let data = await res.json();
      setReservationData(data.data);
      setReservationCount(data.count);
      setTotalPages(data.totalPages)
    }
    catch (error) {
      console.log(error);
    }

  }

  const confirmStatus = async (id) => {
    try {
      let res = await fetch(`http://localhost:3000/Reservation/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            state: "Confirmed"
          })
        }
      )
      let data = await res.json()

      if (res.ok) {
        setReservationData(prev =>
          prev.map(item =>
            item._id === id
              ? { ...item, state: "Confirmed" }
              : item
          )
        );
      }
      socket.current.send(JSON.stringify({
        type: 'RESERVATION STATUS UPDATE'
      }))
    } catch (error) {
      console.log(err);
    }
  };

  const CancelStatus = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/Reservation/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            state: "Cancelled",
          }),
        }
      );

      if (res.ok) {
        setReservationData((prev) =>
          prev.map((item) =>
            item._id === id
              ? { ...item, state: "Cancelled" }
              : item
          )
        );

      }
      socket.current.send(JSON.stringify({
        type: 'RESERVATION STATUS UPDATE'
      }))
    } catch (err) {
      console.log(err);
    }
  };

  if (confirm) {
    return <ConfirmationModel id={id} cancelId={cancelId} confirmStatus={confirmStatus} confirm={confirm} setConfirm={setConfirm} type={type} CancelStatus={CancelStatus} />
  }



  const confirmedCount = reservationData.filter(item => item.state === "Confirmed").length
  const canceledCount = reservationData.filter(item => item.state === "Cancelled").length
  const pendingCount = reservationData.filter(item => item.state === "Pending").length
  return (
    <>
      <section className="bg-[#fff8dd] px-4 sm:px-6 py-6 " >
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-orange-100 mb-6">

          {/* Icon */}
          <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-orange-100">
            <img
              src="https://img.icons8.com/comic/100/FD7E14/restaurant-table.png"
              alt="Order History"
              className="w-12 h-12"
            />
          </div>

          {/* Text */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">      Reservation Requests
            </h1>

            <p className="text-sm sm:text-base text-gray-500 mt-1">      View, review, and manage all table reservation requests from customers in one place.
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 *:bg-white *:rounded-2xl">
          <div onClick={()=>setStatus('all')} className=' px-1 py-4 w-full flex justify-evenly "bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-orange-100 cursor-pointer' >
            <div className='self-center'> <img width="48" height="48" src="https://img.icons8.com/?size=100&id=g6FfrEql0mPQ&format=png&color=FD7E14" alt="ticket-confirmed" /></div>
            <div>
              <h1 className="font-bold text-sm text-gray-700">  Total Reservations</h1>
              <p className="text-xl sm:text-2xl font-extrabold">{reservationCount}</p>
              <p className="font-bold text-sm text-gray-700"> All reservation requests</p>
            </div>
          </div>
          <div onClick={()=>setStatus('Pending')} className=' px-1 py-4 w-full  flex justify-evenly "bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-orange-100 cursor-pointer'>
            <div className='self-center'><img width="48" height="48" className='' src="https://img.icons8.com/?size=100&id=15849&format=png&color=FD7E14" alt="data-pending" /></div>
            <div>
              <h1 className='font-bold text-sm text-gray-700'>Pending Requests</h1>
              <p className='text-xl sm:text-2xl font-extrabold'>{pendingCount}</p>
              <p className='font-bold text-sm text-gray-700'>Awaiting confirmation</p>
            </div>
          </div>
          <div onClick={()=>setStatus('Confirmed')} className=' px-1 py-4 w-full  flex justify-evenly "bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-orange-100 cursor-pointer'>
            <div className='self-center'><img width="48" height="48" src="https://img.icons8.com/dotty/80/FD7E14/ticket-confirmed.png" alt="ticket-confirmed" /></div>
            <div>
              <h1 className='font-bold text-sm text-gray-700'> Confirmed Bookings</h1>
              <p className='text-xl sm:text-2xl font-extrabold'>{confirmedCount}</p>
              <p className='font-bold text-sm text-gray-700'>Ready for guests</p>
            </div>
          </div>
          <div onClick={()=>setStatus('Cancelled')} className=' px-1 py-4 w-full  flex justify-evenly bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-orange-100 cursor-pointer'>
            <div className='self-center'><img width="48" height="48" src="https://img.icons8.com/?size=100&id=42223&format=png&color=FD7E14" alt="checked-truck" /></div>
            <div>
              <h1 className='font-bold text-sm text-gray-700'>Cancelled Reservations</h1>
              <p className='text-xl sm:text-2xl font-extrabold'>{canceledCount}</p>
              <p className='font-bold text-sm text-gray-700'>Cancelled bookings</p>
            </div>
          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-6 gap-5">
          {state.map((customer) => {

            return <div key={customer._id} className="bg-white rounded-3xl border border-orange-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 h-full flex flex-col">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 pb-4">    <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 break-all">
                  id #{customer._id?.slice(-6)}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Reservation Details
                </p>
              </div>

                <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap self-start sm:self-auto ${customer.state === "Confirmed"
                  ? "bg-green-100 text-green-700"
                  : customer.state === "Cancelled"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                  }`}>
                  {customer.state || "Pending"}
                </span>
              </div>

              {/* Details */}
              <div className="space-y-3 py-5">

                <div className="flex justify-between items-start gap-3">
                  <span className="text-gray-500">👤 Customer</span>
                  <span className="font-semibold text-gray-800 text-right break-words">{customer.fullName}</span>
                </div>

                <div className="flex justify-between items-start gap-3">
                  <span className="text-gray-500">📧 Email</span>
                  <span
                    className="font-semibold text-gray-800 text-right truncate max-w-[175px] "
                    title={customer.email}
                  >
                    {customer.email}
                  </span>
                </div>

                <div className="flex justify-between items-start gap-3">
                  <span className="text-gray-500">📞 Phone</span>
                  <span className="font-semibold text-gray-800 text-right">
                    {customer.phone}

                  </span>
                </div>

                <div className="flex justify-between items-start gap-3">
                  <span className="text-gray-500">👥 Guests</span>
                  <span className="font-semibold text-gray-800 text-right">
                    {customer.guests}

                  </span>
                </div>

                <div className="flex justify-between items-start gap-3">
                  <span className="text-gray-500">📅 Date</span>
                  <span className="font-semibold text-gray-800 text-right">
                    {new Date(customer.date).toLocaleDateString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between items-start gap-3">
                  <span className="text-gray-500">🕒 Time</span>
                  <span className="font-semibold text-gray-800 text-right">
                    {customer.time}
                  </span>
                </div>

                <div className="flex justify-between items-start gap-3">
                  <span className="text-gray-500">🎉 Occasion</span>
                  <span className="font-semibold text-gray-800 text-right">
                    {customer.occasion}
                  </span>
                </div>

              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 mt-auto">

                {(customer.state === "Pending") ? (
                  <>

                    <button
                      className="w-full sm:flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition"
                      onClick={() => {
                        setConfirm(true)
                        setCancelId(customer._id)
                        setType('cancel')
                      }}
                    >
                      ✕ Cancel
                    </button>

                    <button
                      className="w-full sm:flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition"
                      // onClick={() => confirm(customer._id)}
                      onClick={() => {
                        setConfirm(true)
                        setId(customer._id)
                        setType('confirm')
                      }}
                    >
                      ✓ Confirm
                    </button>
                  </>
                ) : (
                  <div className="w-full text-center text-sm sm:text-base font-semibold text-gray-500 py-2">    Reservation {customer.state}
                  </div>
                )}
              </div>
            </div>
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

export default AdminReservation

import React, { useEffect, useRef } from 'react'
import Admin from './AdminMenuForm';
import { useState } from 'react';
import { FaHeart, FaPlus } from 'react-icons/fa';
import AdminCategories from './AdminCategories';
import confirmationModel from './confirmationModel'
import ConfirmationModel from './confirmationModel';
import { Link } from 'react-router-dom';

const AdminMenusection = ({ form, setForm, categoryMenu, setCategoryMenu, type,setType ,confirm,setConfirm}) => {

  const [menu, setMenu] = useState([]);
  const [menuCount, setMenuCount] = useState(0);
  const [like, setLike] = useState(false)
  const [updateId, setUpdateId] = useState(null)
  const ref = useRef()
  const [editData, setEditData] = useState(null)
  const [countCategory, setCountCategory] = useState(0);
  const [search, setSearch] = useState("")
  const [pageNumber,setPageNumber]=useState(1);
  const [totalPages,setTotalPages]=useState(1);
  const [dltId,setDltId]=useState(null)
  const [status,setStatus]=useState(null)

  const show = menu.filter((item)=>{if (status === null) {
    return menu
  }
else if (item.isAvailable === status) {
  return item
}
})

  useEffect(() => {
    const getMenu = async () => {
      try {
        let res = await fetch(`http://localhost:3000/menu?page=${pageNumber}`);
        let data = await res.json();
        setMenu(data.data);
        setMenuCount(data.count);
        setTotalPages(data.totalPages)
      }
      catch (error) {
        console.log(error);
      }
    }
    getMenu()

  }, [pageNumber])

  useEffect(() => {
    categoryData()
  }, [])

  const categoryData = async () => {
    try {
      let res = await fetch('http://localhost:3000/get-category');
      let data = await res.json()
      setCountCategory(data.count)
    } catch (error) {
      console.log(error);
    }
  }


  const deleteItem = async (id) => {
    setMenu(prev => {
      return prev.filter(item => item._id !== id)
    })
    try {
      let res = await fetch(`http://localhost:3000/removerMenu/${id}`, {
        method: 'DELETE'
      });

    } catch (error) {
      console.log(error);
    }
  }

  const edit = async (food) => {


    setUpdateId(food._id)

    setForm(true)
    setEditData(food)
  }


  const find = menu.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase()))


  if (form) {
    return <Admin form={form} setForm={setForm} editData={editData} setEditData={setEditData} updateId={updateId} setUpdateId={setUpdateId} confirm={confirm} setConfirm={setConfirm}/>
  }
  if (categoryMenu) {
    return <AdminCategories categoryMenu={categoryMenu} setCategoryMenu={setCategoryMenu} categoryData={categoryData} type={type} setType={setType} confirm={confirm}  setConfirm={setConfirm} />
  }

  const Available = menu.filter(item => item.isAvailable === true).length
  const unavailable = menu.filter(item => item.isAvailable === false).length


  return (
    <>
      <section className="bg-[#fff8dd] px-4 sm:px-6 py-6">
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-orange-100 mb-6 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">

            {/* Icon */}
            <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-orange-100">
              <img
                src="https://img.icons8.com/?size=100&id=G736SmolvT3J&format=png&color=FD7E14"
                alt="Order History"
                className="w-12 h-12"
              />
            </div>

            {/* Text */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Menu Menagement
              </h1>

              <p className="text-sm sm:text-base text-gray-500 mt-1">
                View, review, and manage all table reservation requests from customers in one place.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">

            <button
              onClick={() => setCategoryMenu(!categoryMenu)}
              className="flex items-center gap-2 w-full sm:w-auto px-4 py-2.5 bg-white border-2 border-orange-400 text-orange-600 rounded-xl font-semibold shadow-sm hover:bg-orange-50 transition cursor-pointer"
            >
              <FaPlus className="text-xs" />
              Category
            </button>

            <button
              onClick={() => setForm(!form)}
              className="flex items-center gap-2 w-full sm:w-auto px-4 py-2.5 bg-orange-500 text-white rounded-xl font-semibold shadow-sm hover:bg-orange-600 transition cursor-pointer"
            >
              <FaPlus className="text-xs" />
              Menu Item
            </button>

          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white border border-orange-100 rounded-2xl shadow-md p-5 my-6">

          {/* Left */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Menu Items
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Search and manage your restaurant menu.
            </p>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3 w-full md:w-auto">

            <div className="relative flex-1 md:w-80">
              <input
                type="text"
                placeholder="Search by name or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-orange-200 bg-orange-50 focus:outline-none focus:border-orange-500"
              />

              <img
                src="https://img.icons8.com/fluency-systems-filled/48/FD7E14/search.png"
                alt="search"
                className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2"
              />
            </div>

            <button
              onClick={() => setSearch("")}
              className="px-5 py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
            >
              Clear
            </button>

          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 *:bg-white *:rounded-2xl">
          <div onClick={()=>setStatus(null)} className=' px-1 py-4 w-full flex justify-evenly "bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-orange-100 cursor-pointer'>
            <div className='self-center'> <img width="48" height="48" src="https://img.icons8.com/?size=100&id=24555&format=png&color=FD7E14" alt="ticket-confirmed" /></div>
            <div>
              <h1 className="font-bold text-sm text-gray-700">  Total Menu Item</h1>
              <p className="text-2xl font-extrabold"> {menuCount}</p>
              <p className="font-bold text-sm text-gray-700"> Available on Menu</p>
            </div>
          </div>
          <div onClick={()=>setStatus(true)} className=' px-1 py-4 w-full  flex justify-evenly "bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-orange-100 cursor-pointer'>
            <div className='self-center'><img width="48" height="48" className='' src="https://img.icons8.com/?size=100&id=bmIB2pcxPHgU&format=png&color=FD7E14" alt="data-pending" /></div>
            <div>
              <h1 className='font-bold text-sm text-gray-700'>Available Items</h1>
              <p className='text-2xl font-extrabold'>{Available}</p>
              <p className='font-bold text-sm text-gray-700'>Ready to order</p>
            </div>
          </div>
          
          <div  className=' px-1 py-4 w-full  flex justify-evenly "bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-orange-100 '>
            <div className='self-center'><img width="48" height="48" src="https://img.icons8.com/?size=100&id=2828&format=png&color=FD7E14" alt="ticket-confirmed" /></div>
            <div>
              <h1 className='font-bold text-sm text-gray-700'> Categories</h1>
              <p className='text-2xl font-extrabold'>{countCategory}</p>
              <p className='font-bold text-sm text-gray-700'>Food categories</p>
            </div>
          </div>
          <div onClick={()=>setStatus(false)} className=' px-1 py-4 w-full  flex justify-evenly "bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-orange-100 cursor-pointer'>
            <div className='self-center'><img width="48" height="48" src="https://img.icons8.com/?size=100&id=Zg39Op7xYb6E&format=png&color=FD7E14" alt="checked-truck" /></div>
            <div>
              <h1 className='font-bold text-sm text-gray-700'>Out of Stock</h1>
              <p className='text-2xl font-extrabold'>{unavailable}</p>
              <p className='font-bold text-sm text-gray-700'>Currently unavailable</p>
            </div>
          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 py-5">
          {show.map((food) => {
            return <div key={find._id} className="bg-white rounded-3xl border border-orange-100 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden ">

              {/* Food Image */}
              <div className="relative">
                <img
                  src={`${food.image}`}
                  alt="Pizza"
                  className="w-full h-52 sm:h-56 object-cover"
                />
              </div>

              {/* Card Content */}
              <div className="p-5">

                {/* Title */}
                <div className="flex justify-between items-start gap-3">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800 break-words">
                    {food.name}
                  </h2>
                  <span className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                    {food.category}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-500 text-sm mt-2 leading-6 line-clamp-3 min-h-[72px]">
                  {food.description}
                </p>

                {/* Price */}
                <div className="flex justify-between items-center mt-5 gap-2">

                  <span className=" font-bold text-xl text-gray-800">
                    Price :
                  </span>

                  <span className="text-xl sm:text-2xl font-bold text-orange-500">
                    ₹{food.price}
                  </span>

                </div>

                <div className="flex justify-between items-center mt-5 gap-2">
                  <span className=" font-bold text-xl text-gray-800">
                    Stock :
                  </span>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-bold ${food.isAvailable
                        ? "bg-green-600 text-white"
                        : "bg-orange-400 text-white"
                      }`}
                  >
                    {food.isAvailable ? "Available" : "Unavailable"}
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 my-5"></div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">

                  <button className="w-full sm:flex-1 hover:cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
                    onClick={() => {
                      edit(food)
                    }}
                  >
                    ✏️ Edit
                  </button>

                  <button className="w-full sm:flex-1 hover:cursor-pointer bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition"
                    onClick={() => {
                      setConfirm(true)
                      setDltId(food._id)
                      setType('dlt')
                    }}
                  >
                    🗑 Delete
                  </button>

                </div>

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
       {confirm && ( <ConfirmationModel type={type} setConfirm={setConfirm} dltId={dltId} setDltId={setDltId} deleteItem={deleteItem} />
  )}
    </>
  )
}

export default AdminMenusection
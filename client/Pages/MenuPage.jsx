import React, { useEffect, useState } from 'react'
import Hero from '../src/assets/hero.png'
import chicken from '../src/assets/chickenicon.png'
import burger from '../src/assets/burgericon.png'
import Herochutteny from '../src/assets/herochutteny.png'
import heroMenu from '../src/assets/heroMenu.png'
import Home from '../Components/Home'
import { useNavigate, useLocation } from 'react-router-dom'
import { FaArrowRight, FaCcDinersClub, FaFire, FaMotorcycle, FaTruck, FaUtensils, FaUtensilSpoon } from 'react-icons/fa'


function Menupage({ socket }) {

  const [item, setItem] = useState([]);
  const [search, setSearch] = useState("")
  const [addedItems, setAddedItems] = useState([]);
  const [pageNumber, setPageNumber] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const userId = localStorage.getItem("userId");
  let location = useLocation()
  const Navigate=useNavigate()
  
  async function getMenu() {
    try {
      const response = await fetch(`http://localhost:3000/menu?page=${pageNumber}`);
      const data = await response.json();
      setItem(data.data);
      setTotalPages(data.totalPages)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getMenu();
  }, [pageNumber]);

  const handleAddToCart = async (food) => {
    setAddedItems((prev) => [...prev, food._id]);

    setTimeout(() => {
      setAddedItems([]);
    }, 3000);

    try {
      await fetch("http://localhost:3000/get-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          item: food,
        }),
      });
    } catch (err) {
      console.log(err);
    }
    socket.current.send(JSON.stringify({
    type:'CartItem_ADD'
   }))  
  };

  const find = item.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase()))

  

  return (
    <>
      <div className='bg-[#fff8dd]   px-5 sm:px-15 md:px-15 lg:px-26 transition-all duration-300 '>
        <div className='flex justify-between gap-10 max-w-6xl'>

          <div className='space-y-4 flex-1 py-25'>

            <div className=' text-5xl font-bold tracking-wide leading-12 '>

              Discover Our <br /> <span className='text-[#ff8800]'>Delicious <br /></span>  Menu🍽️

            </div>
            <p className=" text-sm text-gray-600  max-w-sm">
              From juicy burgers and cheesy pizzas to refreshing drinks and tasty desserts,
              explore our freshly prepared dishes made with premium ingredients for every craving.
            </p>

            <div className=" flex flex-wrap items-center gap-4">

              {/* Primary Button */}
              <button onClick={() => window.scroll(0, 480)}
                className="
         group flex items-center gap-3
         bg-black text-white
         px-7 py-3 rounded-full
         font-semibold tracking-wide
         shadow-lg shadow-black/20
         transition-all duration-300
         hover:bg-neutral-900
         hover:shadow-2xl hover:-translate-y-1
         active:scale-95
         focus:outline-none focus:ring-4 focus:ring-black/20
         cursor-pointer
         "
              >
                Browse Menu

                <FaArrowRight
                  className="
           transition-transform duration-300
           group-hover:translate-x-1
           "
                />
              </button>

              

            </div>

          </div>
          <div className='flex-1 relative pt-30 left-10 hidden xl:block'>
            <div className="relative w-68 h-80 ">
              {/* Background Shape */}
              <div
                className="absolute inset-0 bg-[#641919]"
                style={{
                  clipPath: "polygon(0 0, 25% 0, 100% 35%, 100% 100%, 0 100%)",
                  borderRadius: "30px",
                }}
              ></div>

              {/* Burger */}
              <img
                src={`${heroMenu}`}
                alt=""
                className="h-100 absolute -top-25 left-33 -translate-x-1/2 z-10"
              />
            </div>
          </div>
          <div className=' flex flex-col justify-center items-center space-y-3'>
            <div className='flex space-x-2 h-20 w-55  items-center'>
              <div>
                <FaMotorcycle className='h-12 w-12 px-2 py-2 rounded-full bg-gray-100' />
              </div>
              <div className='flex flex-col'>
                <span className='font-bold text-lg'>Fast delivery</span>
                <span className='text-gray-400'>promise to deliver within 30 mins</span>
              </div>
            </div>
            <div className='flex space-x-2 h-20 w-55  items-center'>
              <div>
                <FaTruck className='h-12 w-12 px-2 py-2 rounded-full bg-gray-100' />
              </div>
              <div className='flex flex-col'>
                <span className='font-bold text-lg'>Fast Pickup</span>
                <span className='text-gray-400'>promise to deliver within 30 mins</span>
              </div>
            </div>
            <div className='flex space-x-2 h-20 w-55  items-center'>
              <div>
                <FaUtensils className='h-12 w-12 px-2 py-2 rounded-full bg-gray-100' />
              </div>
              <div className='flex flex-col'>
                <span className='font-bold text-lg'>Dine in</span>
                <span className='text-gray-400'>promise to deliver within 30 mins</span>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className='bg-[#fff8dd]  transition-all duration-500 '>
        <div className="text-center py-12  px-6">
          <p className="text-orange-500 font-semibold uppercase tracking-[4px]">
            Our Menu
          </p>

          <h2 className="text-4xl md:text-5xl font-extrabold text-[#39364b] mt-3">
            Delicious Food Crafted With Passion
          </h2>

          <p className="max-w-2xl mx-auto text-gray-600 mt-5 text-base md:text-lg leading-7">
            Discover our carefully curated selection of freshly prepared dishes made
            with premium ingredients. Whether you're craving a quick snack or a
            complete meal, we have something delicious for everyone.
          </p>

          <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full mt-6"></div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white border border-orange-100 rounded-2xl shadow-md p-5 my-6 mx-6  lg:mx-22">

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
          </div>
        </div>

        <div className='py-12 pb-10 grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4  gap-18 md:gap-10 md:pb-5 px-6  lg:px-22 lg:pb-12 '>
          {find.map((food) => {
            
            return (
              <div
                key={food._id}
                className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden group"
              >
                {/* Category */}
                <div className="absolute top-5 right-5 z-20">
                  <span className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                    {food.category}
                  </span>
                </div>

                {/* Image */}
                <div className="flex justify-center mt-8">
                  <div className="w-40 h-40 rounded-full bg-orange-50 flex items-center justify-center shadow-lg group-hover:scale-110 transition duration-500 ">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-36 h-36 object-cover  rounded-full p-1 "
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="px-6 pb-6 pt-4">



                  {/* Name */}
                  <h2 className="text-2xl font-bold text-center text-[#39364b] mt-3 h-14 flex items-center justify-center">
                    {food.name}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-500 text-sm text-center h-18 overflow-hidden leading-6 mt-2">
                    {food.description}
                  </p>

                  {/* Price + Stock */}
                  <div className="flex justify-between items-center mt-5">

                    <div>
                      <p className="text-xs text-gray-400">
                        Starting From
                      </p>

                      <h2 className="text-3xl font-extrabold text-orange-500">
                        ₹{food.price}
                      </h2>
                    </div>

                    <span
                      className={`px-4 py-2 rounded-full text-xs font-bold ${food.isAvailable
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                        }`}
                    >
                      {food.isAvailable ? "🟢 Available" : "🔴 Unavailable"}
                    </span>

                  </div>

                  {/* Button */}
                 {food.isAvailable === true ?  <button
                    onClick={() => handleAddToCart(food)}
                    disabled={addedItems.includes(food._id)}
                    className={`w-full mt-6 py-3 rounded-full font-bold transition-all duration-300 ${addedItems.includes(food._id)
                        ? "bg-green-500 text-white"
                        : "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:scale-105 hover:shadow-xl"
                      }`}
                  >
                    {addedItems.includes(food._id)
                      ? "✓ Added to Cart"
                      : "🛒 Add to Cart"}
                  </button>
                  : <button
  disabled
  className="w-full mt-6 py-3 rounded-full font-bold bg-gradient-to-r from-gray-400 to-gray-500 text-white cursor-not-allowed opacity-80 flex items-center justify-center gap-2"
>
  <span>🚫</span>
  <span>Currently Unavailable</span>
</button>}
                </div>
              </div>
            );
          })}


        </div>

              <div className="flex justify-center items-center gap-6 mt-5 pb-42">

  {/* Previous */}
  <button
    disabled={pageNumber === 1}
    onClick={() => {setPageNumber(pageNumber - 1)
       window.scroll(0,800)
    }}
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
    onClick={() =>{ setPageNumber(pageNumber + 1)
      window.scroll(0,800)
    }}
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
  </div>

    </>
  )

}

export default Menupage

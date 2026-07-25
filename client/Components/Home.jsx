import React, { useState } from 'react'
import { FaArrowRight, FaFire, FaCalendarAlt, FaClock, FaUserFriends, FaCheckCircle } from "react-icons/fa";

import Hero from '../src/assets/hero.png'
import chicken from '../src/assets/chickenicon.png'
import burger from '../src/assets/burgericon.png'
import pizza from '../src/assets/pizza.png'
import { useNavigate } from 'react-router-dom';

const Home = () => {
 
const navigate = useNavigate()

  return (
    <>
      <div className="relative h-full bg-cover bg-center mx-auto bg-[#fff8dd] pb-10">
        <div className='px-5 sm:px-15 md:px-15 lg:px-26 transition-all duration-300'>

          {/* --- HERO SECTION --- */}
          <div className='w-full flex flex-col md:flex-row md:items-center md:justify-between '>
            <div className='space-y-4 flex-1'>
              <div className='text-5xl font-bold tracking-wide leading-12'>
                Your <span className='text-[#ff8800]'>Gateway <br /> to</span> Gourmet <br /> Burgers🍔
              </div>
              <p className="text-sm text-gray-600 max-w-sm">
                Crafted with fresh ingredients and packed with unforgettable flavors, every
                meal at Hunger Town is prepared to satisfy your cravings.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                {/* Primary Button */}
                <button  className="group flex items-center gap-3 bg-black text-white px-7 py-3 rounded-full font-semibold tracking-wide shadow-lg shadow-black/20 transition-all duration-300 hover:bg-neutral-900 hover:shadow-2xl hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-4 focus:ring-black/20 cursor-pointer" onClick={()=>window.scroll(0,2370)}>
                  About Us
                  <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                {/* Secondary Button */}
                <button className="group flex items-center gap-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-7 py-3 rounded-full font-semibold tracking-wide shadow-lg shadow-orange-400/40 transition-all duration-300 hover:from-orange-600 hover:to-amber-600 hover:shadow-2xl hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-4 focus:ring-orange-300 cursor-pointer" onClick={()=>navigate('/Reservations')}>
                  <FaFire className="text-lg transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125" />
                  Reservation 
                </button>
              </div>
            </div>

            <div className='mt-4 flex-1 lg:flex ms-20'>
              <img className='h-100 mt-16 hidden md:inline-block hover:scale-105 cursor-pointer duration-400' src={Hero} alt="" />
            </div>
          </div>

          {/* --- FEATURES SECTION --- */}
          <div className="pb-10 mt-4 relative flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10">
            <div className="absolute hidden lg:flex shrink-0">
              <img src={pizza} alt="Pizza" className="w-75 xl:w-95 h-auto" />
            </div>

            <div className="md:mt-4 grid grid-cols-1 sm:grid-cols-2 lg:flex lg:justify-end gap-6 w-full lg:gap-4">
              {/* Feature 1 */}
              <div className="flex items-center bg-white p-5 rounded-2xl shadow-md lg:w-fit hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="p-3 bg-[#F5E9D7] rounded-full shrink-0">
                  <img className="w-12 h-12 object-contain" src={chicken} alt="Chicken" />
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-base md:text-lg">Farm Sourced Meat</h3>
                  <p className="text-gray-500 text-sm mt-1">Healthiest meat ever</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-center bg-white p-5 rounded-2xl shadow-md lg:w-fit hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="p-3 bg-[#F5E9D7] rounded-full shrink-0">
                  <img className="w-12 h-12 object-contain" src={burger} alt="Burger" />
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-base md:text-lg">Freshly Prepared</h3>
                  <p className="text-gray-500 text-sm mt-1">Tasteful spices & divine flavour</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Home;

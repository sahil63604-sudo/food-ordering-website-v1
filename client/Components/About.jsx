import React from "react";
        import { FaArrowRight, FaUtensils,FaCrown } from "react-icons/fa";
        import { useNavigate } from "react-router-dom";

import bgimg from "../src/assets/burgerwithonionrings2.jpeg";
import crown from "../src/assets/icons8-crown-48.png";

const About = () => {
  let navigator=useNavigate()
  return (
    <div className="bg-[#fff8dd] py-20 pb-50">

      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center px-6 sm:px-10 lg:px-20">

      
        <div className="flex justify-center">
          <div className="relative">

            
            <div
              className=" relative shadow-white shadow-2xl w-64 h-90 sm:w-74 sm:h-[430px] lg:w-84 lg:h-[500px] rounded-full  bg-gradient-to-r from-orange-500 to-amber-500"
             
            >
              <img className="absolute   h-90 sm:h-110 scale-150  lg:w-84 lg:h-125 transform -rotate-6  transition-all duration-500" src={`${bgimg}`} alt="" />
            </div>

            
            <div className="absolute top-10 -right-20 bg-[#a8a184] text-white rounded-2xl p-4 w-36 shadow-lg ">
              <img src={crown} alt="" className="w-10 h-10 mb-2" />
              <p className="text-sm font-semibold">
                30+ Years of Experience
              </p>
            </div>

          </div>
        </div>

        
        <div className="space-y-6 text-center lg:text-left">

          <div className="uppercase tracking-[5px] text-[#ff8800]  font-semibold  flex flex-col justify-center items-center lg:items-start">
            About Us
           <div className=" w-29 h-1 bg-orange-500  rounded-full mt-2 "></div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            OUR COMMITMENT TO
            <br />
            AUTHENTICITY &
            <span className="text-[#ff8800]"> EXCELLENCE</span>
          </h1>

          <p className="text-gray-500 leading-7 max-w-lg mx-auto lg:mx-0">
            Every dish we create is a celebration of connection, crafted with
            passion and inspired by diverse flavours. Join us in an inviting
            space where every bite sparks joy and every moment becomes a
            cheerful memory.
          </p>

        
          
<div className="space-y-4 justify-self-center lg:justify-self-start
">

  <a href="#" className="flex items-center gap-3 group">
    <span className="w-3 h-3 rounded-full bg-[#ff8800]"></span>
    <span className="text-gray-600 group-hover:text-[#ff8800] transition">
      Seasonal & Locally Sourced Ingredients
    </span>
  </a>

  <a href="#" className="flex items-center gap-3 group">
    <span className="w-3 h-3 rounded-full bg-[#ff8800]"></span>
    <span className="text-gray-600 group-hover:text-[#ff8800] transition">
      Vegetarian & Dietary Friendly Options
    </span>
  </a>

  <a href="#" className="flex items-center gap-3 group">
    <span className="w-3 h-3 rounded-full bg-[#ff8800]"></span>
    <span className="text-gray-600 group-hover:text-[#ff8800] transition">
      Exclusive Pairings & Unique Flavours
    </span>
  </a>

</div>


<div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">

  {/* Primary Button */}
  <button onClick={()=>navigator('/Menu')}
    className="
      group flex items-center justify-center gap-3
      px-7 py-3
      bg-gradient-to-r from-orange-500 to-amber-500
      text-white font-semibold
      rounded-full
      shadow-lg shadow-orange-400/40
      transition-all duration-300
      hover:-translate-y-1 hover:shadow-2xl
      hover:from-orange-600 hover:to-amber-600
      active:scale-95
      cursor-pointer
    "
  >
    <FaUtensils className="group-hover:rotate-12 transition-transform duration-300" />
    Order Now
    <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
  </button>

  {/* Secondary Button */}
 

</div>

        </div>
      </div>
      

      
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 mt-14">

        <div className="border-t border-[#a8a184]/40 pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

         <div className="bg-[#FFF8EE] rounded-2xl p-8 border border-orange-100 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
    <FaCrown className="text-4xl text-orange-500 mb-5" />

    <h3 className="text-2xl font-bold text-gray-800 mb-3">
        Premium Quality
    </h3>

    <p className="text-gray-600 leading-7">
        We use only fresh ingredients and carefully selected recipes to create unforgettable dining experiences.
    </p>
</div>

          <div className="bg-[#FFF8EE] rounded-2xl p-8 border border-orange-100 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
    <FaCrown className="text-4xl text-orange-500 mb-5" />
   
    <h3 className="text-2xl font-bold text-gray-800 mb-3">
       Expert Chefs
    </h3>
            <p className="text-gray-600 leading-7">
       Our chefs bring decades of culinary expertise, blending tradition
              with creativity in every dish.
    </p>
            
          </div>

          <div className="bg-[#FFF8EE] rounded-2xl p-8 border border-orange-100 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
    <FaCrown className="text-4xl text-orange-500 mb-5" />

    <h3 className="text-2xl font-bold text-gray-800 mb-3">
        Best Dinning
    </h3>
             <p className="text-gray-600 leading-7">
       Experience a warm atmosphere, exceptional service, and delicious
              meals that bring family and friends together.
    </p>
             
          </div>

        </div>

      </div>
    </div>
  );
};

export default About;
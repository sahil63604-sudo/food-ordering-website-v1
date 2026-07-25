import React from 'react'
import pizza from '../src/assets/pizza.png'
import logo from "../src/assets/logo.png";
import { useState } from 'react';


function SignUp() {
   const [signUp,setSignUp]=useState({
       name:"",
       email:"",
       password:""
   })
   const [showPassword,setShowPassword]=useState(null)
      
     const handleSubmit = ()=>{
       console.log(signUp);
       
     }
     return (
       <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans antialiased mb-50">
         <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl m-4 border border-gray-100 min-h-[650px]">
   
           <div className="w-full md:w-1/2 p-8 sm:p-14 flex flex-col justify-center">
             
             <div className="md:hidden mb-3 flex justify-center ite">
              <img className="h-22 sm:h-16 md:h-20 w-auto rounded-full" src={logo}alt="logo" />
             </div>
   
             <div className="mb-8">
             <h2 className="text-3xl font-bold text-gray-900 mb-2">
  Create Your Account 🍕
</h2>

<p className="text-gray-500 text-sm">
  Join us today and enjoy delicious food delivered to your doorstep.
</p> </div>
   
             <form onSubmit={handleSubmit} className="space-y-5">
   
               <div>
                 <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                  Name
                 </label>
                 <input
                   type="text"
                   value={signUp.name}
                   onChange={(e)=>setSignUp({...signUp,name:e.target.value})}
                   placeholder="Enter your full name"
                   className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-200"
                   required
                 />
               </div>
   
               <div>
                 <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                   Email Address
                 </label>
                 <input
                   type="email"
                   value={signUp.email}
                   onChange={(e)=>setSignUp({...signUp,email:e.target.value})}
                  placeholder="Enter your email"
                   className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-200"
                   required
                 />
               </div>
   
               <div>
                 <div className="flex justify-between items-center mb-2">
                   <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                     Password
                   </label>
                 
                 </div>
   
                <div className="relative">
     <input
       type={showPassword ? "text" : "password"}
       value={signUp.password}
       onChange={(e)=>setSignUp({...signUp,password:e.target.value})}
      placeholder="Create a strong password"
       className="w-full px-4 py-3.5 pr-12 rounded-xl border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-200"
       required
       minLength={8}
       maxLength={10}
     />
     
     <button
       type="button" // Always keep type="button" so it doesn't submit the form
       onClick={() => setShowPassword(!showPassword)}
       className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none select-none hover:cursor-pointer"
     >
       {showPassword ? (
         // Eye Off Icon (Hidden state)
         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
         </svg>
       ) : (
         // Eye Icon (Visible state)
         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
         </svg>
       )}
     </button>
   </div>
               </div>
   
               <button
                 type="submit"
                 className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-95 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-all duration-150 text-sm tracking-wide hover:cursor-pointer"
               >
                 Sign Up
               </button>
             </form>
   
             <p className="mt-8 text-center text-sm text-gray-600">
  Already have an account?{" "}
  <a
    href="#login"
    className="font-bold text-orange-500 hover:text-orange-600 transition-colors"
  >
    Sign In
  </a>
</p>
   </div>
    <div className="hidden md:flex md:w-1/2 bg-linear-to-r from-orange-500 via-[#ff8800] to-amber-500 relative flex-col justify-between p-12 text-white overflow-hidden">
             
             <div className="relative z-10 -mt-9 -ms-15 ">
               <img className="h-32 rounded-full" src={logo}alt="logo" />
             </div>
   
             <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center">
              
             <img 
    src={`${pizza}`} 
     alt="3D Burger" 
     className="w-[300px] h-auto object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.25)] filter contrast-105"
   />
             </div>
   
             <div className="relative z-10 space-y-3 pointer-events-none bg-black/20 p-4 rounded-xl backdrop-blur-xs">
               <h1 className="text-3xl font-extrabold leading-tight">
  Join Our Hunger <br />Town Community 
</h1>

<p className="text-gray-100 text-base leading-relaxed">
  Create your account to order delicious food, track deliveries,
  save your favorite meals, and enjoy exclusive offers.
</p>
             </div>
           </div>
         
       </div>
       </div>
     );
   };

export default SignUp
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaArrowRight,
} from "react-icons/fa";

import logo from "../src/assets/logo.png";
import pizza from '../src/assets/pizza.png'
import { useNavigate } from "react-router-dom";
export default function Footer() {
  let navigator=useNavigate()
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/Menu" },
    { name: "Reservations", path: "/Reservations" },
  ];

  return (
    <footer className="relative bg-[#1B1612] text-white ">

      
      <div className="absolute left-1/2 -top-30 sm:-top-24 -translate-x-1/2 w-[92%] max-w-7xl z-20">

        <div className="bg-linear-to-r from-orange-500 via-[#ff8800] to-amber-500 rounded-[30px] shadow-[0_25px_60px_rgba(0,0,0,.35)] px-8 py-8 lg:px-14 lg:pt-20 lg:pb-10">

          <div className="relative flex flex-col lg:flex-row justify-between items-center gap-8">
                <div className=" absolute -top-42 hidden md:block">
                    <img className="h-52" src={`${pizza}`} alt="" />
                </div>
            <div>

             

              <p className="text-orange-100 mt-3 max-w-xl leading-7">
                Fresh meals, amazing taste, and lightning-fast delivery.
                Order your favourite dishes today and enjoy every bite.
              </p>

            </div>

            <div className="flex flex-wrap gap-4">

            

              <button onClick={()=>navigator('/Menu')} className="border border-white text-white px-7 py-3 rounded-full hover:bg-white hover:text-orange-600 transition duration-300">
                View Menu
              </button>

            </div>

          </div>

        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-44 pb-12">

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-14">

       

          <div>

            <div className="flex items-center gap-4">

              <div className="w-16 h-16 rounded-2xl bg-white overflow-hidden shadow-xl">

                <img
                  src={logo}
                  alt="Hunger Town"
                  className="w-full h-full object-cover"
                />

              </div>

              <div>

                <h2 className="text-3xl font-black text-orange-400">
                  Hunger Town
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  Delicious Delivered Fast
                </p>

              </div>

            </div>

            <p className="mt-7 text-gray-400 leading-8">
              Hunger Town connects you with the best local restaurants,
              delivering hot and delicious meals directly to your doorstep.
              Great food. Fast delivery. Happy moments.
            </p>

          </div>

          

          <div>

            <h3 className="text-2xl font-bold mb-8">
              Navigation
            </h3>

            <ul className="space-y-5">

              {navLinks.map((item) => (

                <li key={item.name}>

                  <Link
                    to={item.path}
                    className="group flex items-center gap-3 text-gray-300 hover:text-orange-400 transition"
                  >

                    <FaArrowRight className="group-hover:translate-x-1 transition duration-300" />

                    {item.name}

                  </Link>

                </li>

              ))}

            </ul>

          </div>
                    

          <div>

            <h3 className="text-2xl font-bold mb-8">
              Contact
            </h3>

            <div className="space-y-6">

              

              <div className="flex items-start gap-4">

                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
                  <FaPhoneAlt className="text-orange-400" />
                </div>

                <div>

                  <p className="font-semibold">
                    Phone
                  </p>

                  <a
                    href="tel:+917087831409"
                    className="text-gray-400 hover:text-orange-400 transition"
                  >
                    +91 70878 31409
                  </a>

                </div>

              </div>

             

              <div className="flex items-start gap-4">

                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
                  <FaEnvelope className="text-orange-400" />
                </div>

                <div>

                  <p className="font-semibold">
                    Email
                  </p>

                  <a
                    href="mailto:hungertown@gmail.com"
                    className="text-gray-400 hover:text-orange-400 transition break-all"
                  >
                    hungertown@gmail.com
                  </a>

                </div>

              </div>

            </div>

           

            <div className="flex gap-4 mt-10">

              <a
                href="#"
                className="group w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-orange-500 hover:-translate-y-1 transition-all duration-300"
              >
                <FaFacebookF className="group-hover:scale-110 transition" />
              </a>

              <a
                href="#"
                className="group w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-pink-500 hover:-translate-y-1 transition-all duration-300"
              >
                <FaInstagram className="group-hover:scale-110 transition" />
              </a>

              <a
                href="#"
                className="group w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-green-500 hover:-translate-y-1 transition-all duration-300"
              >
                <FaWhatsapp className="group-hover:scale-110 transition" />
              </a>

            </div>

          </div>

        </div>


        <div className="border-t border-white/10 mt-16 pt-8">

          <div className="flex flex-col md:flex-row items-center justify-between gap-5">

            <p className="text-gray-500 text-center md:text-left">
              © {new Date().getFullYear()} <span className="text-orange-400 font-semibold">Hunger Town</span>. All Rights Reserved.
            </p>

            

          </div>

        </div>

      </div>

    </footer>
  );
}
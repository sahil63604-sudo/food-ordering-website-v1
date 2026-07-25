import React, { useState } from "react";
import pizza from "../src/assets/pizza.png";
import logo from "../src/assets/logo.png";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";

const LoginPage = ({ setadminlogin, adminlogin }) => {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email:"",
    password:"",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: login.email,
        password: login.password,
      }),
    });

    const data = await response.json();
    
    if (data.token) {
      
     document.cookie = `token=${data.token}; max-age=600; path=/`;
console.log(document.cookie);
      swal.fire({
        title: "Access Granted ✅",
        text: "Redirecting to the Admin Dashboard...",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      navigate("/Admin");
      setadminlogin(!adminlogin);
    } else {
      swal.fire({
        icon: "error",
        title: "Login Failed",
        text: data.message || "Invalid administrator credentials.",
        confirmButtonColor: "#f97316",
      });
    }
  };

  return (
    <div className="fixed w-full flex items-center justify-center bg-gray-50 font-sans antialiased">
      <a
        title="Back to Home"
        onClick={() => setadminlogin(!adminlogin)}
        className="absolute z-10 top-4 left-6 p-2 bg-gray-200/50 rounded-2xl cursor-pointer font-bold text-orange-400 hover:text-orange-500 transition-colors"
      >
        <FaArrowLeft className="size-8" />
      </a>

      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl m-4 border border-gray-100">

        {/* LEFT SIDE */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-r from-orange-500 via-[#ff8800] to-amber-500 relative flex-col justify-between p-12 text-white overflow-hidden">

          <div className="relative z-10 -mt-9 -ms-15">
            <img
              className="h-32 rounded-full"
              src={logo}
              alt="logo"
            />
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={pizza}
              alt="Food"
              className="w-[300px] h-auto object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.25)]"
            />
          </div>

          <div className="relative z-10 bg-black/20 backdrop-blur-xs rounded-xl p-5 space-y-4">
            <h1 className="text-4xl font-extrabold leading-tight">
              Restaurant
              <br />
              Admin Dashboard
            </h1>

            <p className="text-gray-100 leading-7 text-base">
              Securely manage your restaurant from one place.
              Monitor customer orders, update menu items,
              manage reservations, and keep daily operations
              running smoothly with real-time controls.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 p-8 sm:p-14 flex flex-col justify-center">

          <div className="md:hidden mb-4 flex justify-center">
            <img
              className="h-22 rounded-full"
              src={logo}
              alt="logo"
            />
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Admin Login 🔐
            </h2>

            <p className="text-gray-500 text-sm leading-6">
              Sign in with your administrator credentials to access
              the dashboard, manage orders, update the menu,
              and oversee restaurant operations.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                Email Address
              </label>

              <input
                type="email"
                value={login.email}
                onChange={(e) =>
                  setLogin({
                    ...login,
                    email: e.target.value,
                  })
                }
                placeholder="Admin email address"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-200"
                required
              />
            </div>

            {/* Password */}
                        <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Password
                </label>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={login.password}
                  onChange={(e) =>
                    setLogin({
                      ...login,
                      password: e.target.value,
                    })
                  }
                  placeholder="Admin password"
                  className="w-full px-4 py-3.5 pr-12 rounded-xl border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-200"
                  required
                  minLength={8}
                  maxLength={20}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-95 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-all duration-150 tracking-wide cursor-pointer"
            >
              Access Dashboard
            </button>
          </form>

          <div className="mt-8 border-t border-gray-200 pt-5">
            <p className="text-center text-xs text-gray-500 leading-5">
              This portal is restricted to authorized restaurant administrators.
              Unauthorized access attempts may be monitored and logged.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
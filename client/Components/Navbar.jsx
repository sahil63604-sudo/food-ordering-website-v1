import React, { useState, useEffect } from "react";
import { FaCar, FaCheck, FaChevronDown, FaClock, FaDropbox, FaRegCalendar, FaRegCalendarAlt, FaRegCalendarPlus, FaRegCalendarTimes, FaRoad, FaTimes, FaUserShield } from "react-icons/fa";
import { Link, NavLink, useFetcher } from "react-router-dom";

import logo from "../src/assets/logo.png";
import menu from "../src/assets/menu.png";
import { FaClipboardCheck, FaUtensils, FaCheckCircle } from "react-icons/fa";
import Menu from "./Menu";
import LoginPage from "../Pages/loginPage";
import { useLocation, useNavigate } from "react-router-dom";



const Navbar = ({ setadminlogin, adminlogin, socket, statusTrack }) => {
    const [scrolled, setScrolled] = useState(false);
    const [cart, setCart] = useState(false);
    const [status, setStatus] = useState(false);
    const [orderStatus, setOrderStatus] = useState([])
    const [sidebar, setSidebar] = useState(false);
    const [ATC_data, setATC_data] = useState([]);
    const [expandedOrder, setExpandedOrder] = useState(null);

    const statusStyles = {
        "Order Placed": "bg-orange-100 text-orange-700",
        "Confirmed": "bg-blue-100 text-blue-700",
        "Preparing": "bg-yellow-100 text-yellow-700",
        "Ready for Pickup": "bg-purple-100 text-purple-700",
        "Out for Delivery": "bg-indigo-100 text-indigo-700",
        "Delivered": "bg-green-100 text-green-700",
    };

    const totalPrice = ATC_data.reduce((total, cart) => {
        return total + cart.item.price * cart.item.quantity;
    }, 0);

    const location = useLocation();
    let navigator = useNavigate()
    useEffect(() => {
        setCart(false);
        setStatus(false);
        getCartItem();
        Status();
    }, [location.pathname]);

    const totalQuantity = ATC_data.reduce((total, cart) => {
        return total + cart.item.quantity;
    }, 0);
    async function increaseItem(id) {

        const cart = ATC_data.find(i => i._id === id);

        await fetch(`http://localhost:3000/cart/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                quantity: cart.item.quantity + 1,
            }),
        });

        getCartItem();

    }
    async function decreaseItem(id) {

        const cart = ATC_data.find(i => i._id === id);

        if (cart.item.quantity === 1) return;

        await fetch(`http://localhost:3000/cart/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                quantity: cart.item.quantity - 1,
            }),
        });

        getCartItem();

    }
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };

        window.addEventListener("scroll", handleScroll);
        getCartItem()
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    // orders status                      ////////////////////////////////
    async function Status() {
        const userId = localStorage.getItem("userId");

        let res = await fetch(
            `http://localhost:3000/showStatusOrders/${userId}`
        );
        let data = await res.json();
        setOrderStatus(data.data)

        // console.log(orderStatus.map((cart)=>{
        //       return cart.cartItems.map((item)=>{
        //     return item
        // })
        // }));

        // console.log(orderStatus.data.map((item)=>{
        //     return item._id,item.orderStatus
        // }));

    }
    useEffect(() => {

        Status();
    }, [])

    async function getCartItem() {
        let userId = localStorage.getItem('userId')
        const response = await fetch(`http://localhost:3000/get-cartItem/${userId}`);
        const data = await response.json();

        setATC_data(data);

    }

    socket.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data.type);

        switch (data.type) {
            case "CartItem_ADD":
                getCartItem();
                break;

            case "Order_added":
                Status();
                break;

            default:
                break;
        }
    };



    return (
        <div
            className={`sticky top-0 z-50 bg-[#fff8dd] transition-all duration-500 ${scrolled
                ? "px-0"
                : "px-3 sm:px-5 md:px-8 lg:px-10 pt-3 md:pt-4"
                }`}
        >
            <nav
                className={`flex items-center justify-between bg-[#F8F1E7] py-2 transition-all duration-500 ${scrolled
                    ? "rounded-none shadow-2xl"
                    : "rounded-2xl shadow-lg"
                    } px-4 sm:px-6 md:px-8 lg:px-16`}
            >
                <div className="-ml-2 sm:-ml-4 md:-ml-7">
                    <img
                        className="h-14 sm:h-16 md:h-20 w-auto rounded-full"
                        src={logo}
                        alt="logo"
                    />
                </div>

                <ul className="hidden md:flex items-center gap-5 lg:gap-8 text-lg font-semibold">

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `relative group transition-all duration-300 ${isActive ? "text-[#ff8800]" : "text-gray-800"
                            }`
                        }
                    >
                        <li className="py-2 hover:scale-105 transition-transform duration-300">
                            Home
                        </li>

                        <span
                            className="
              absolute left-0 -bottom-1
              h-[3px] w-0
              bg-[#ff8800]
              rounded-full
              transition-all duration-300
              group-hover:w-full
            "
                        ></span>
                    </NavLink>

                    <NavLink
                        to="/Menu"
                        className={({ isActive }) =>
                            `relative group transition-all duration-300 ${isActive ? "text-[#ff8800]" : "text-gray-800"
                            }`
                        }
                    >
                        <li className="py-2 hover:scale-105 transition-transform duration-300">
                            Menu
                        </li>

                        <span
                            className="
              absolute left-0 -bottom-1
              h-[3px] w-0
              bg-[#ff8800]
              rounded-full
              transition-all duration-300
              group-hover:w-full
            "
                        ></span>
                    </NavLink>

                    <NavLink
                        to="/Reservations"
                        className={({ isActive }) =>
                            `relative group transition-all duration-300 ${isActive ? "text-[#ff8800]" : "text-gray-800"
                            }`
                        }
                    >
                        <li className="py-2 hover:scale-105 transition-transform duration-300">
                            Reservations
                        </li>

                        <span
                            className="
              absolute left-0 -bottom-1
              h-[3px] w-0
              bg-[#ff8800]
              rounded-full
              transition-all duration-300
              group-hover:w-full
            "
                        ></span>
                    </NavLink>


                    <button onClick={() => {
                        setStatus(prev => !prev);
                        setCart(false);
                    }}
                        className="relative
                        flex items-center
                        gap-2
                        px-5
                        py-2
                        rounded-full
                        bg-white
                        border-2
                        border-orange-300
                        text-orange-400
                         hover:text-orange-600
                        hover:cursor-pointer
                        transition  "
                    >
                        <FaClipboardCheck />
                        Status
                    </button>

                    <div className={`${status == false ? 'hidden' : 'block'} absolute  text-black  py-5 px-5 flex flex-col justify-center top-25 right-90 `}>
                        <div className="bg-white rounded-2xl shadow-lg p-6 w-140 h-120 overflow-y-auto scrollbar-thin">
                            <div className="flex ">
                                <h2 className="flex-1 text-xl font-bold mb-6 text-gray-800">
                                Order Status
                            </h2>
                            <div onClick={()=>{setStatus(false)}}><FaTimes className="self-center size-6 cursor-pointer"/></div>
                            </div>
                            {orderStatus.length === 0 ? (<><div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                                <div className="text-6xl mb-4">📦</div>

                                <h2 className="text-xl font-bold text-gray-800">
                                    No Orders Yet
                                </h2>

                                <p className="text-gray-500 mt-2 max-w-xs">
                                    Looks like you haven't placed any orders yet.
                                    Once you order something, its status will appear here.
                                </p>

                                <Link
                                    to="/Menu"

                                    className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium transition"
                                >
                                    🍔 Browse Menu
                                </Link>
                            </div></>)
                                :


                                orderStatus.map((order) => (
                                    <div
                                        key={order._id}
                                        className="mb-5 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg"
                                    >
                                        {/* Header */}
                                        <div className="flex items-center justify-between p-5">
                                            <div>
                                                <p className="text-xs uppercase tracking-wider text-gray-400">
                                                    Order ID
                                                </p>

                                                <h2 className="font-semibold text-gray-800">
                                                    #{order._id.slice(-6)}
                                                </h2>

                                                <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                                                    <span>
                                                        📅 {new Date(order.createdAt).toLocaleDateString("en-IN")}
                                                    </span>

                                                    <span>
                                                        🕒 {new Date(order.createdAt).toLocaleTimeString("en-IN")}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-end gap-3">
                                                <span
                                                    className={`rounded-full px-4 py-1 text-xs font-semibold ${statusStyles[order.orderStatus]
                                                        }`}
                                                >
                                                    {order.orderStatus}
                                                </span>

                                                <button
                                                    onClick={() =>
                                                        setExpandedOrder(
                                                            expandedOrder === order._id ? null : order._id
                                                        )
                                                    }
                                                    className="flex items-center gap-2 rounded-lg border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-600 transition hover:bg-orange-100"
                                                >
                                                    {expandedOrder === order._id ? "Hide Items" : "View Items"}

                                                    <FaChevronDown
                                                        className={`transition-transform duration-300 ${expandedOrder === order._id ? "rotate-180" : ""
                                                            }`}
                                                    />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Body */}
                                        {expandedOrder === order._id && (
                                            <div className="border-t bg-gray-50 p-5">
                                                <div className="space-y-4">
                                                    {order.cartItems.map((item) => (
                                                        <div
                                                            key={item._id}
                                                            className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm"
                                                        >
                                                            <div className="flex items-center gap-4">
                                                                <img
                                                                    src={item.image}
                                                                    alt={item.name}
                                                                    className="h-16 w-16 rounded-lg object-cover"
                                                                />

                                                                <div>
                                                                    <h3 className="font-semibold text-gray-800">
                                                                        {item.name}
                                                                    </h3>

                                                                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                                                                        {item.description}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <div className="text-right">
                                                                <p className="text-sm text-gray-500">
                                                                    Qty
                                                                </p>

                                                                <p className="font-bold text-orange-600">
                                                                    × {item.quantity}
                                                                </p>

                                                                <p className="mt-2 font-semibold text-gray-800">
                                                                    ₹{item.price}
                                                                </p>

                                                                <p className="text-sm font-bold text-green-600">
                                                                    ₹{item.price * item.quantity}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="mt-6 flex items-center justify-between border-t pt-4">
                                                    <span className="text-lg font-semibold text-gray-700">
                                                        Grand Total
                                                    </span>

                                                    <span className="text-2xl font-bold text-orange-600">
                                                        ₹{order.grandTotal}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>

                </ul>

                <div className="flex items-center gap-3 sm:gap-4 md:gap-5">

                    <div className="flex items-center gap-3 md:gap-4">
                        <div className={`relative ${location.pathname == '/Cart' ? 'hidden' : 'block'
                            }`} >

                            <div className="absolute z-10 -top-2 -right-2 h-5 w-5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold flex items-center justify-center">
                                {totalQuantity}
                            </div>

                            <div
                                className={`absolute top-18.5 right-0 md:-right-12 lg:-right-30
    w-[90vw] sm:w-80 max-w-sm
    bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden
    z-50 transition-all duration-300
    ${cart ? "block" : "hidden"}`}
                            >
                                {totalQuantity === 0 ? (
                                    <>
                                        <div className="p-6  flex flex-col items-center">

                                            <img
                                                className="h-24 mb-4 opacity-70"
                                                src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                                                alt="Empty Cart"
                                            />

                                            <h3 className="text-lg font-semibold text-gray-800">
                                                Your Cart is Empty
                                            </h3>

                                            <p className="text-sm text-gray-500 text-center mt-2">
                                                Looks like you haven't added any delicious food yet.
                                            </p>

                                        </div>

                                        <div className="border-t p-4">
                                            <button onClick={() => navigator('/Menu')}
                                                className="w-full py-3 rounded-full
            bg-gradient-to-r from-orange-500 to-amber-500
            text-white font-semibold
            hover:from-orange-600 hover:to-amber-600
            transition duration-300"
                                            >
                                                Browse Menu
                                            </button>
                                        </div>
                                    </>
                                ) : (<div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden w-[90vw] sm:w-80 max-w-sm">

                                    {/* Header */}
                                    <div className="px-5 py-4 border-b bg-orange-50">
                                        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                            🛒 Your Cart
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {totalQuantity} {totalQuantity > 1 ? "items" : 'item'}
                                        </p>
                                    </div>

                                    {/* Cart Items */}
                                    <div className="max-h-80 overflow-y-auto px-5 py-4 space-y-4 scrollbar-thin scrollbar-thumb-orange-300">

                                        {ATC_data.map((cartdata) => (
                                            <div
                                                key={cartdata.item._id}
                                                className="flex justify-between items-center pb-4 border-b last:border-none"
                                            >
                                                <div className="flex-1">

                                                    <h4 className="font-semibold text-gray-800">
                                                        {cartdata.item.name}
                                                    </h4>

                                                    <p className="text-orange-500 font-bold mt-1">
                                                        ₹{cartdata.item.price}
                                                    </p>

                                                    {/* Quantity */}
                                                    <div className="flex items-center gap-3 mt-3">

                                                        <button onClick={() => decreaseItem(cartdata._id)}
                                                            className="h-8 w-8 rounded-full bg-gray-100 hover:bg-orange-500 hover:text-white transition"
                                                        >
                                                            −
                                                        </button>

                                                        <span className="font-semibold">
                                                            {cartdata.item.quantity}
                                                        </span>

                                                        <button onClick={() => increaseItem(cartdata._id)}
                                                            className="h-8 w-8 rounded-full bg-gray-100 hover:bg-orange-500 hover:text-white transition"
                                                        >
                                                            +
                                                        </button>

                                                    </div>
                                                </div>

                                            </div>
                                        ))}

                                    </div>


                                    <div className="border-t bg-white px-5 py-4">

                                        <div className="flex justify-between items-center text-lg font-bold mb-4">
                                            <span>Total</span>
                                            <span className="text-orange-500">₹{totalPrice}</span>
                                        </div>

                                        <Link to="/Cart">
                                            <button



                                                className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300"
                                            >
                                                Go to Cart →
                                            </button>
                                        </Link>

                                    </div>

                                </div>)}
                            </div>

                            <img
                                onClick={() => {
                                    setCart(prev => !prev);
                                    setStatus(false);
                                }}
                                className="h-7 sm:h-8 cursor-pointer hover:scale-110 transition duration-300"
                                src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
                                alt="cart"
                            />

                        </div>
                        <div className="relative">

                            <img onClick={() => setSidebar(!sidebar)}
                                className="h-7 sm:h-8 md:hidden cursor-pointer"
                                src={menu}
                                alt="menu"
                            />
                            {!sidebar ? (<></>) : (<>

                                <div className="bg-white absolute top-14 h-125 w-2xs -right-4  transition-all  duration-300 rounded-s-3xl px-3 pb-4 pt-2 flex flex-col  ">
                                    <div className="relative mb-6">

                                        {/* Logo */}
                                        <div className="flex items-center gap-3">

                                            <div className="ps-2">
                                                <h2 className="text-2xl font-extrabold text-gray-800 tracking-wide">
                                                    Hunger
                                                    <span className="text-orange-500">Town</span>
                                                </h2>

                                                <p className="text-xs text-gray-400">
                                                    Fresh • Fast • Delicious
                                                </p>
                                            </div>

                                            {/* Close Button */}
                                            <button
                                                onClick={() => setSidebar(false)}
                                                className="
        ml-auto
        w-10 h-10
        rounded-xl
        bg-gray-100
        flex justify-center items-center
        text-gray-600
        hover:bg-orange-500
        hover:text-white
        hover:rotate-90
        transition-all duration-300
      "
                                            >
                                                ✕
                                            </button>

                                        </div>

                                        {/* Divider */}
                                        <div className="mt-5 h-[2px] w-full bg-gradient-to-r from-orange-500 via-orange-200 to-transparent rounded-full"></div>

                                    </div>
                                    <ul className="  text-lg font-semibold pt-5   *:space-y-4 flex-1">

                                        <NavLink
                                            to="/"
                                            className={({ isActive }) =>
                                                `relative group transition-all duration-300 ${isActive ? "text-[#ff8800]" : "text-gray-800"
                                                }`
                                            }
                                        >
                                            <li
                                                className=" py-3 px-1 rounded-xl hover:bg-orange-50 hover:text-orange-500 transition-all duration-300 hover:translate-x-2"
                                            >
                                                Home
                                            </li>
                                        </NavLink>

                                        <NavLink
                                            to="/Menu"
                                            className={({ isActive }) =>
                                                `relative group transition-all duration-300 ${isActive ? "text-[#ff8800]" : "text-gray-800"
                                                }`
                                            }
                                        >
                                            <li
                                                className=" py-3 px-1 rounded-xl hover:bg-orange-50 hover:text-orange-500 transition-all duration-300 hover:translate-x-2"
                                            >
                                                Menu
                                            </li>
                                        </NavLink>

                                        <NavLink
                                            to="/Reservations"
                                            className={({ isActive }) =>
                                                `relative group transition-all duration-300  ${isActive ? "text-[#ff8800]" : "text-gray-800"
                                                }`
                                            }
                                        >
                                            <li
                                                className=" py-3 px-1 rounded-xl hover:bg-orange-50 hover:text-orange-500 transition-all duration-300 hover:translate-x-2"
                                            >
                                                Resevation
                                            </li>
                                        </NavLink>

                                    </ul>


                                    <div >
                                        <button
                                            onClick={() => setadminlogin(!adminlogin)}
                                            className="  w-full  py-3  rounded-xl  bg-gradient-to-r from-orange-500 to-amber-500  text-white  font-bold  flex items-center justify-center gap-2  shadow-lg  hover:shadow-orange-400/40  hover:scale-105  transition-all duration-300"
                                        >
                                            <FaUserShield />
                                            Admin Panel
                                        </button>
                                    </div>

                                </div>
                            </>)}
                        </div>

                    </div>

                    <button onClick={() => setadminlogin(!adminlogin)}
                        className="
                hidden lg:flex items-center gap-2
                px-6 py-2.5
                bg-gradient-to-r from-orange-500 to-amber-500
                text-white font-semibold
                rounded-full
                shadow-lg shadow-orange-400/30
                transition-all duration-300
                hover:from-orange-600 hover:to-amber-600
                hover:shadow-xl hover:-translate-y-1
                active:scale-95
                focus:outline-none
                focus:ring-4
                focus:ring-orange-300
                cursor-pointer
              "
                    >
                        <FaUserShield className="transition-transform duration-300" />
                        Admin
                    </button>

                </div>
            </nav>

        </div>

    );
};

export default Navbar;

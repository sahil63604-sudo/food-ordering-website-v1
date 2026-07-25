import React, { useState, useEffect } from 'react'
import { FaChevronLeft, FaChevronRight, FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert2';
import CheckoutModal from './CheckOutPage';

const Cart = ({ setStatus, statusTrack ,confirm,
  setConfirm,
  type,
  setType}) => {
  const [CartItem, setCartItem] = useState([])


  let navigator = useNavigate()
  const totalItems = CartItem.length;

  const totalQuantity = CartItem.reduce((total, cart) => {
    return total + cart.item.quantity;
  }, 0);

  const grandTotal = CartItem.reduce((total, cart) => {
    return total + cart.item.price * cart.item.quantity;
  }, 0);

  const deliveryFee = grandTotal > 500 ? 0 : 40;

  const finalTotal = grandTotal + deliveryFee;


  async function increaseItem(id) {

    const cart = CartItem.find(i => i._id === id);

    const res = await fetch(`http://localhost:3000/cart/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: cart.item.quantity + 1,
      }),
    });

    if (res.ok) {

      setCartItem(prev =>
        prev.map(cart =>
          cart._id === id
            ? {
              ...cart,
              item: {
                ...cart.item,
                quantity: cart.item.quantity + 1,
              },
            }
            : cart
        )
      );

    }
  

  }
  async function decreaseItem(id) {

    const cart = CartItem.find(i => i._id === id);

    if (cart.item.quantity === 1) return;

    const res = await fetch(`http://localhost:3000/cart/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: cart.item.quantity - 1,

      }),
    });

    if (res.ok) {

      setCartItem(prev =>
        prev.map(cart =>
          cart._id === id
            ? {
              ...cart,
              item: {
                ...cart.item,
                quantity: cart.item.quantity - 1,

              },
            }
            : cart
        )
      );
    }
  
  }
  useEffect(() => {


    async function getMenu() {
      const userId = localStorage.getItem("userId");

      const response = await fetch(
        `http://localhost:3000/get-cartItem/${userId}`
      );
      const data = await response.json();

      setCartItem(data);


    }
    getMenu();

  }, [])




  async function deleteItem(id) {

    let response = await fetch(`http://localhost:3000/delete-cartItem/${id}`, {
      method: 'DELETE'
    })
    if (response.ok) {
      setCartItem(prev => prev.filter(item => item._id !== id));
    }
   
  }

  let userId = localStorage.getItem("userId");



  async function handelCheckout(formData) {
    console.log(formData);

    if (CartItem.length > 0) {


      let res = await fetch(
        "http://localhost:3000/postAdminCartData",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId, 
            PaymentDetails:formData
          })
        }

      );
      swal.fire({
        title: "🍽️ Order Placed!",
        text: "Thanks for your order! We're preparing it now. You'll be notified once it's confirmed.",
        icon: "success",
        showConfirmButton: false,
        timer: 3500,
        timerProgressBar: true,
      });
      setStatus({
        ...statusTrack,
        orderPlaced: true,

      })
      setCartItem([])
      setTimeout(() => {
        navigator("/");
      }, 3500);
    }

  }
  useEffect(() => {
    if (CartItem.length === 0) {
      const timer = setTimeout(() => {
        navigator("/");
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [CartItem]);
  const [open, setOpen] = useState(false);
  if (open) {
    return (
      <CheckoutModal open={open} setOpen={setOpen} handelCheckout={handelCheckout} grandTotal={grandTotal} confirm={confirm} setConfirm={setConfirm} type={type} setType={setType} />
    )
  }
  return (
    <div className="min-h-screen bg-orange-50 pt-10 pb-60 ">
      <div className="max-w-7xl mx-auto px-6 flex flex-col xl:flex-row gap-8">

        {/* Cart */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-6">
            Cart Items
          </h2>

          <div className="overflow-y-scroll max-h-[600px] rounded-xl ">
            {CartItem.length !== 0 ?
              (<table className="w-full ">

                <thead className="bg-gray-100 sticky top-0">
                  <tr className="text-gray-700 *:py-2">
                    <th className="min-w-[120px]">Item</th>
                    <th className="min-w-[180px]">Name</th>
                    <th className="min-w-[200px] hidden lg:table-cell">Description</th>
                    <th className="min-w-[150px]">Quantity</th>
                    <th className="min-w-[120px]">Price</th>
                    <th className="min-w-[120px]">Delete</th>
                  </tr>
                </thead>

                <tbody className=''>

                  {CartItem.map((item) => (

                    <tr
                      key={item._id}
                      className="border-b hover:bg-gray-50 transition "
                    >

                      <td className="p-4 flex justify-center">
                        <img
                          src={item.item.image}
                          className="w-16 h-16 rounded-lg object-cover"
                          alt=""
                        />
                      </td>

                      <td className="font-semibold px-8">
                        {item.item.name}
                      </td>

                      <td className="text-gray-500 text-sm  overflow-y-hidden ">
                        {item.item.description}
                      </td>

                      <td>
                        <div className="flex justify-center items-center gap-3">

                          <button
                            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition"
                          >
                            <FaMinus className='text-orange-500' onClick={() => {
                              if (item.item.quantity > 1) {

                                decreaseItem(item._id)
                              }
                            }
                            } />
                          </button>

                          <span className="font-semibold">
                            {item.item.quantity}
                          </span>

                          <button
                            className="w-8 h-8 rounded-full bg-orange-500 text-white hover:bg-orange-600 flex items-center justify-center transition"
                          >
                            <FaPlus onClick={() => increaseItem(item._id)} />
                          </button>

                        </div>
                      </td>

                      <td className="text-center font-bold text-orange-600">

                        ₹{item.item.price * item.item.quantity}
                      </td>
                      <td className="  font-bold text-orange-600">

                        <FaTrash className=' w-full text-red-500 cursor-pointer hover:text-red-500/70 ' onClick={() => deleteItem(item._id)} />
                      </td>
                    </tr>

                  ))}

                </tbody>
              </table>
              ) :
              (<>
                <div className=' text-center flex w-full h-50 justify-center items-center '>
                  <div className=''>cart is empty
                  </div>
                  <div className=' h-6 w-6 border-t-4 border-t-orange-500 rounded-t-full animate-spin'>
                  </div>
                  Redirecting to Home page
                </div>
              </>
              )
            }


          </div>

        </div>

        {/* Summary */}
        {CartItem.length !== 0 &&

          (<div className="w-full xl:w-[380px]">

            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">

              <h2 className="text-2xl font-bold mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">

                <div className="flex justify-between text-gray-600">
                  <span>Items</span>
                  <span>{totalItems}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Total Quantity</span>
                  <span>{totalQuantity}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{grandTotal}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-green-600 font-semibold">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>

                <div className="border-t pt-4 flex justify-between text-2xl font-bold">
                  <span>Total</span>
                  <span className="text-orange-600">₹{finalTotal}</span>
                </div>

                {deliveryFee !== 0 && (
                  <p className="text-sm text-gray-500">
                    Add ₹{500 - grandTotal} more for free delivery.
                  </p>
                )}


                <button
                  onClick={() => setOpen(!open)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition mt-4"
                >
                  Checkout • ₹{finalTotal}
                </button>


              </div>

            </div>

          </div>)
        }
      </div>
    </div>
  );
}

export default Cart
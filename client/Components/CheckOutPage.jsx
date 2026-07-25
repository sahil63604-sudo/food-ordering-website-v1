import {
  FaTimes,
  FaMapMarkerAlt,
  FaUser,
  FaStickyNote,
  FaMoneyBillWave,
  FaQrcode,
  FaCopy,
} from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";
import { useState } from "react";
import Swal from "sweetalert2";
import ConfirmationModel from "./confirmationModel";

export default function CheckoutModal({
  open,
  setOpen,
  handelCheckout,
  grandTotal,
  setBell,
  confirm,
  setConfirm,
  type,
  setType
}) {
  const deliveryCharge =
    grandTotal >= 500 ? 0 : 40;

  const finalTotal =
    grandTotal + deliveryCharge;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    delivery: "Home Delivery",  
    payment: "Cash on Delivery",
    notes: "",
  });

  if (!open) return null;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const copyUpi = () => {
    navigator.clipboard.writeText(
      "sahil63604@oksbi"
    );

    Swal.fire({
      icon: "success",
      title: "UPI ID Copied",
      timer: 1200,
      showConfirmButton: false,
    });
  };

  const placeOrder = () => {

    handelCheckout(form);

    setOpen(false);
  };

  const alert = ()=>{

    if (
      !form.name ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.pincode
    ) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Details",
        text: "Please fill all required fields.",
      });

      return;
    }

    if (form.phone.length !== 10) {
      Swal.fire({
        icon: "error",
        title: "Invalid Phone Number",
      });
      return;
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-sm p-4">

      <div className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden">

        {/* Header */}

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-5 flex justify-between items-center">

          <div>
            <h2 className="text-3xl font-bold">
              Complete Your Order
            </h2>

            <p className="text-orange-100">
              Almost there 🍔
            </p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="text-3xl hover:rotate-90 duration-300"
          >
            <FaTimes />
          </button>

        </div>

        {/* Body */}

        <form className="bg-[#FFF8DD] p-8 max-h-[70vh] overflow-y-auto space-y-6">

          {/* Customer */}

          <div className="bg-white rounded-2xl shadow p-6">

            <h3 className="font-bold text-xl flex gap-2 items-center mb-5">
              <FaUser className="text-orange-500" />
              Customer Information
            </h3>

            <div className="grid md:grid-cols-2 gap-4">

              <input
                type="text"
                placeholder="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="border rounded-xl p-4"
                required
              />

              <input
                type="tel"
                placeholder="Phone Number"
                name="phone"
                value={form.phone}
                maxLength={10}
                onChange={handleChange}
                className="border rounded-xl p-4"
                 required
              />

              <input
                type="email"
                placeholder="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="border rounded-xl p-4 md:col-span-2"
                 required
              />

            </div>

          </div>

          {/* Address */}

          <div className="bg-white rounded-2xl shadow p-6">

            <h3 className="font-bold text-xl flex gap-2 items-center mb-5">

              <FaMapMarkerAlt className="text-orange-500" />

              Delivery Address

            </h3>

            <textarea
              rows="3"
              placeholder="Full Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="border rounded-xl w-full p-4"
               required
            />

            <div className="grid md:grid-cols-2 gap-4 mt-4">

              <input
                type="text"
                placeholder="City"
                name="city"
                value={form.city}
                onChange={handleChange}
                className="border rounded-xl p-4"
                 required
              />

              <input
                type="tel"
                placeholder="Pincode"
                name="pincode"
                value={form.pincode}
                maxLength={6}
                onChange={handleChange}
                className="border rounded-xl p-4"
                 required
              />

            </div>

          </div>

          {/* Delivery */}

          <div className="bg-white rounded-2xl shadow p-6">

            <h3 className="font-bold text-xl flex gap-2 items-center mb-5">

              <MdDeliveryDining className="text-orange-500 text-2xl" />

              Delivery Method

            </h3>

            <div className="flex gap-8">

              <label className="flex gap-2">

                <input
                  type="radio"
                  value="Home Delivery"
                  name="delivery"
                  checked={
                    form.delivery ===
                    "Home Delivery"
                  }
                  onChange={handleChange}
                />

                Home Delivery

              </label>

              <label className="flex gap-2">

                <input
                  type="radio"
                  value="Self Pickup"
                  name="delivery"
                  checked={
                    form.delivery ===
                    "Self Pickup"
                  }
                  onChange={handleChange}
                />

                Self Pickup

              </label>

            </div>

          </div>

          {/* Payment */}

          <div className="bg-white rounded-2xl shadow p-6">

            <h3 className="font-bold text-xl flex gap-2 items-center mb-5">

              <FaMoneyBillWave className="text-green-600" />

              Payment Method

            </h3>

            <div className="space-y-4">

              <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer">

                <input
                  type="radio"
                  name="payment"
                  value="Cash on Delivery"
                  checked={
                    form.payment ===
                    "Cash on Delivery"
                  }
                  onChange={handleChange}
                />

                Cash on Delivery

              </label>

              <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer">

                <input
                  type="radio"
                  name="payment"
                  value="UPI"
                  checked={
                    form.payment ===
                    "UPI"
                  }
                  onChange={handleChange}
                />

                UPI Payment

              </label>

              {form.payment === "UPI" && (
                <div className="rounded-xl bg-orange-50 p-5 border">

                  <div className="flex justify-center">

                    <img
                      src="https://storage.googleapis.com/dara-c1b52.appspot.com/daras_ai/media/a3202e58-17ef-11ee-9a70-8e93953183bb/cleaned_qr.png"
                      alt="UPI QR"
                      className="w-52 rounded-xl"
                    />

                  </div>

                  <div className="mt-5 flex justify-between items-center border rounded-lg p-3 bg-white">

                    <span className="font-semibold">
                      sahil63604@oksbi
                    </span>

                    <button
                      onClick={copyUpi}
                      className="text-black flex items-center gap-2"
                    >
                      <FaCopy />
                      Copy
                    </button>

                  </div>

                </div>
              )}

            </div>

          </div>
                    {/* Order Notes */}

          <div className="bg-white rounded-2xl shadow p-6">

            <h3 className="font-bold text-xl flex gap-2 items-center mb-5">

              <FaStickyNote className="text-orange-500" />

              Order Notes

            </h3>

            <textarea
              rows="4"
              placeholder="Any special instructions..."
              name="notes"
              value={form.notes}
              onChange={handleChange}
              className="border rounded-xl w-full p-4 resize-none"
            />

          </div>

          {/* Free Delivery Banner */}

          {form.delivery === "Home Delivery" &&
            (deliveryCharge === 0 ? (
              <div className="bg-green-100 border border-green-300 rounded-2xl p-4 text-green-700 font-semibold text-center">
                🎉 Congratulations! You unlocked FREE Delivery.
              </div>
            ) : (
              <div className="bg-orange-100 border border-orange-300 rounded-2xl p-4 text-orange-700 font-semibold text-center">
                🚚 Add ₹{500 - grandTotal} more to get FREE Delivery.
              </div>
            ))}

          {/* Order Summary */}

          <div className="bg-white rounded-2xl shadow p-6">

            <h3 className="text-xl font-bold mb-5">
              Order Summary
            </h3>

            <div className="space-y-3">

              <div className="flex justify-between">
                <span>Items Total</span>
                <span>₹{grandTotal}</span>
              </div>

              {form.delivery === "Home Delivery" ? (
                <div className="flex justify-between">
                  <span>Delivery Charge</span>

                  {deliveryCharge === 0 ? (
                    <span className="text-green-600 font-semibold">
                      FREE
                    </span>
                  ) : (
                    <span>₹40</span>
                  )}
                </div>
              ) : (
                <div className="flex justify-between">
                  <span>Pickup</span>

                  <span className="text-green-600 font-semibold">
                    FREE
                  </span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Payment</span>
                <span>{form.payment}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>
                <span>{form.delivery}</span>
              </div>

              <hr />

              <div className="flex justify-between text-2xl font-bold text-orange-600">

                <span>Total</span>

                <span>
                  ₹
                  {form.delivery === "Self Pickup"
                    ? grandTotal
                    : finalTotal}
                </span>

              </div>

              <div className="text-center text-gray-500 mt-4">
                ⏱ Estimated Delivery Time: <b>30–40 Minutes</b>
              </div>

            </div>

          </div>

        </form>

        {/* Footer */}

        <div className="bg-white border-t px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-5">

          <div>

            <p className="text-gray-500">
              Grand Total
            </p>

            <h2 className="text-3xl font-bold text-orange-500">

              ₹
              {form.delivery === "Self Pickup"
                ? grandTotal
                : finalTotal}

            </h2>

          </div>

          <button
            // onClick={placeOrder}
            onClick={()=>{if ( !form.name ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.pincode) {
              return alert()
            } 
            else{setConfirm(true)
              setType('Order')
            }}}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:scale-105 duration-300 text-white px-12 py-4 rounded-full text-lg font-semibold shadow-lg"
          >
            🍽️ Place Order
          </button>

        </div>

      </div>
      {confirm === true && (<ConfirmationModel placeOrder={placeOrder} type={type} setType={setType} confirm={confirm} setConfirm={setConfirm}  />)}
    </div>
  );
}
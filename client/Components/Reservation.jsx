import React, { useState } from "react";
import reservation from "../src/assets/ReservationHero.png";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Reservation = ({ bell, setBell }) => {
  let navigator = useNavigate()
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    guests: '',
    date: '',
    time: '',
    occasion: '',
    state: 'Pending'
  });
  const today = new Date().toISOString().split("T")[0]
  console.log(today);


  const submit = async (e) => {
    e.preventDefault()
    try {
      let res = await fetch('http://localhost:3000/add-Reservation', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "🍽️ Table Reserved!",
          html: `
    <p>Thank you for your reservation.</p>
    <p>We look forward to serving you!</p>
  `,
          confirmButtonText: "Awesome!",
          confirmButtonColor: "#ff8800",
          timer: "3000"
        });
        setForm({
          fullName: '',
          email: '',
          phone: '',
          guests: '',
          date: '',
          time: '',
          occasion: ''
        })
      }
      setBell(true)
    } catch (error) {
      console.log(error);

    }
  }
  return (
    <>
      <section className="w-full bg-[#fff8dd]  py-8 px-5 sm:px-1.5 lg:px-26
        ">
        <div className="w-8xl  mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-14">

          {/* Left Content */}
          <div className="lg:w-1/2">

            <span className="inline-block bg-orange-100 text-[#ff8800] px-5 py-2 rounded-full font-semibold shadow-sm">
              ⭐ Reserve • Relax • Enjoy
            </span>

            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mt-6 text-gray-900">
              Reserve Your
              <span className="block text-[#ff8800]">
                Table Today
              </span>
            </h1>

            <p className="text-gray-600 text-lg mt-6 leading-8 max-w-xl">
              Experience exceptional flavors, warm hospitality, and an
              unforgettable dining atmosphere. Book your table in just a few
              clicks and enjoy a memorable dining experience with your loved
              ones.
            </p>

            {/* Buttons */}
            <div className="flex gap-5 mt-10">

              <button onClick={() => window.scroll(0, 640)} className="bg-[#ff8800] hover:bg-orange-600 duration-300 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-orange-300">
                🍽️ Book Now
              </button>

              <button onClick={() => navigator('/Menu')} className="border-2 border-[#ff8800] text-[#ff8800] hover:bg-[#ff8800] hover:text-white duration-300 px-8 py-4 rounded-full font-semibold">
                📖 View Menu
              </button>

            </div>

            {/* Features */}

            <div className="flex flex-wrap gap-8 mt-12">

              <div>
                <h2 className="text-2xl font-bold text-[#ff8800]">
                  500+
                </h2>
                <p className="text-gray-500">
                  Happy Customers
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#ff8800]">
                  4.9★
                </h2>
                <p className="text-gray-500">
                  Customer Rating
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#ff8800]">
                  24/7
                </h2>
                <p className="text-gray-500">
                  Online Booking
                </p>
              </div>

            </div>

          </div>

          {/* Right Image */}

          <div className="lg:w-1/2 flex justify-center relative">

            {/* Background Circle */}

            <div className="absolute w-[480px] h-[480px] rounded-full bg-orange-200 blur-3xl opacity-40"></div>

            <img
              src={reservation}
              alt="Reservation"
              className="relative w-full max-w-lg drop-shadow-2xl hover:scale-105 duration-500"
            />

          </div>

        </div>
      </section>

      <div className="bg-[#fff8dd]  py-8 px-5 sm:px-1.5 lg:px-26">
        <form
          onSubmit={submit}
          className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl p-8 md:p-12 mb-24 border border-orange-100"
        >
          <h2 className="text-4xl font-bold text-center text-[#ff8800] mb-3">
            Book Your Table
          </h2>

          <p className="text-center text-gray-500 mb-10">
            Fill in your details and reserve your table in just a few seconds.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                required
                value={form.fullName}
                onChange={(e) =>
                  setForm({ ...form, fullName: e.target.value })
                }
                className="w-full border border-orange-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#ff8800]"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="w-full border border-orange-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#ff8800]"
                placeholder="example@gmail.com"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                required
                maxLength={10}
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
                className="w-full border border-orange-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#ff8800]"
                placeholder="9876543210"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Guests
              </label>
              <input
                type="number"
                required
                min="1"
                value={form.guests}
                onChange={(e) =>
                  setForm({ ...form, guests: e.target.value })
                }
                className="w-full border border-orange-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#ff8800]"
                placeholder="Number of guests"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Reservation Date
              </label>
              <input
                type="date"
                required
                value={form.date}
                min={today}
                onChange={(e) =>
                  setForm({ ...form, date: e.target.value })
                }
                className="w-full border border-orange-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#ff8800]"
              />
            </div>


            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Reservation Time
              </label>
              <input
                type="time"
                required
                min="09:00"
                max="23:00"
                value={form.time}
                onChange={(e) =>
                  setForm({ ...form, time: e.target.value })
                }
                className="w-full border border-orange-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#ff8800]"
              />
            </div>

          </div>

          <div className="mt-6">
            <label className="block mb-2 font-semibold text-gray-700">
              Occasion
            </label>

            <select
              value={form.occasion}
              onChange={(e) =>
                setForm({ ...form, occasion: e.target.value })
              }
              className="w-full border border-orange-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#ff8800]"
            >
              <option value="">Select Occasion</option>
              <option>Birthday</option>
              <option>Anniversary</option>
              <option>Family Dinner</option>
              <option>Business Meeting</option>
              <option>Other</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full mt-10 bg-[#ff8800] hover:bg-orange-600 text-white py-4 rounded-xl text-lg font-bold transition duration-300 shadow-lg hover:shadow-orange-300"
          >
            🍽️ Reserve Now
          </button>
        </form>
      </div>

      <section id="contact" className="bg-[#fff8dd] pt-20 pb-32 py-8 px-5 sm:px-1.5 lg:px-26">
        <div className="w-8xl mx-auto grid lg:grid-cols-2 gap-22 items-center pb-20">

          <div className="overflow-hidden rounded-3xl shadow-xl ">

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55015.777993749056!2d76.5522773632518!3d30.478990097019935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fdc7c202e6489%3A0xf2b1d67562f68349!2sRajpura%2C%20Punjab!5e0!3m2!1sen!2sin!4v1783355083142!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>


          <div className="ms-10">

            <span className="bg-orange-100 text-[#ff8800] px-5 py-2 rounded-full font-semibold">
              Contact Us
            </span>

            <h2 className="text-4xl font-bold mt-6 text-gray-900">
              Visit Our Restaurant
            </h2>

            <p className="text-gray-500 mt-5 leading-8">
              We'd love to welcome you. Reserve your table online or visit us <br />
              directly for an unforgettable dining experience.
            </p>

            <div className="space-y-6 mt-10">

              <div className="flex items-center gap-5">

                <div className="bg-[#ff8800] w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl">
                  📍
                </div>

                <div>
                  <h3 className="font-bold text-lg">
                    Address
                  </h3>

                  <p className="text-gray-500">
                    Rajpura, Punjab
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-5">

                <div className="bg-[#ff8800] w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl">
                  📞
                </div>

                <div>
                  <h3 className="font-bold text-lg">
                    Phone
                  </h3>

                  <p className="text-gray-500">
                    +91 87385 73387
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-5">

                <div className="bg-[#ff8800] w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl">
                  📧
                </div>

                <div>
                  <h3 className="font-bold text-lg">
                    Email
                  </h3>

                  <p className="text-gray-500">
                    hello@foodie.com
                  </p>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Reservation;



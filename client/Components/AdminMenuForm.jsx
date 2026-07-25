import React, { useEffect } from 'react'
import { useState } from 'react'
import { FaCross, FaTimes } from 'react-icons/fa';

function Admin({ form, setForm, editData,setEditData,updateId,setUpdateId,confirm,setConfirm }) {

  const [getCategory,setGetCategory]=useState([])
  const [foodDetail, setFoodDetail] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    quantity:1,
    isAvailable: ''
  });

  useEffect(() => {
    if (editData) {
      setFoodDetail({
        name: editData.name,
        description:editData.description ,
        price: editData.price,
        category: editData.category,
        image: editData.image,
        quantity:editData.quantitiy,
        isAvailable: editData.isAvailable
      })
      setEditData(false )
    }
    getcategoryName()
  }, [editData])


  async function addFoodItem() {
    let response = await fetch('http://localhost:3000/addMenu', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(foodDetail)
    });
    let data = await response.json();
    setFoodDetail(data)
   
    setForm(!form)
  }
   const editFoodItem = async()=>{
    let res= await fetch(`http://localhost:3000/updateMenu/${updateId}`,{
      method:'PUT',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(foodDetail)
    })
     
      setForm(!form)
  
  }

  const cross = () => {
    setForm(!form)
    setUpdateId(null)
  }

 const getcategoryName = async() =>{
  try {
    let res = await fetch('http://localhost:3000/get-category');
    let data = await res.json();
    setGetCategory(data.data)
  } catch (error) {
    console.log(error);
    
  }
 }
  
  return (
    <>
      <div className="h-screen overflow-y-auto scrollbar-none py-10 px-6 absolute inset-0  backdrop-blur-md mt-12  ">
        <form className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8 m">

          <div className='flex justify-end' onClick={cross}>
            <img className='w-12 h-12 hover:cursor-pointer' src="https://img.icons8.com/?size=100&id=gykZ2Zai2dlQ&format=png&color=FD7E14" alt="" />
          </div>

          <div className="text-center mb-8">


            <h1 className="text-4xl font-extrabold text-[#39364b] mt-2">
              {updateId === null ?'Add New Item' :'Edit Item Data'}
            </h1>

            <p className="text-gray-500 mt-3">
              Fill in the details below to add a new menu item.
            </p>

            <div className="w-24 h-1 bg-orange-500 rounded-full mx-auto mt-5"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="block mb-2 font-semibold text-[#39364b]">
                Food Name
              </label>

              <input
                type="text"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-orange-500 focus:outline-none"
                value={foodDetail.name}
                onChange={(e) => setFoodDetail({ ...foodDetail, name: e.target.value })}
                placeholder="Burger"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-[#39364b]">
                Price
              </label>

              <input
                type="number"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-orange-500 focus:outline-none"
                value={foodDetail.price}
                onChange={(e) => setFoodDetail({ ...foodDetail, price: e.target.value })}
                placeholder="₹20"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 font-semibold text-[#39364b]">
                Description
              </label>

              <textarea

                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3  focus:border-orange-500 focus:outline-none"
                value={foodDetail.description}
                onChange={(e) => setFoodDetail({ ...foodDetail, description: e.target.value })}
                placeholder="Write food description..."
              />
            </div>

            <select
              value={foodDetail.category}
              defaultValue={"Select Category"}
              onChange={(e) =>
                setFoodDetail({ ...foodDetail, category: e.target.value })
              }
              className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:border-orange-500 outline-none"
            >
              <option value="">Select Category</option>
             {getCategory.map((item)=>(
                <option key={item._id} >{item.name}</option>
             ))}
            </select>
            <div>
              <label className="block mb-2 font-semibold text-[#39364b]">
                Image URL ( PNG IMG REQUIRED )
              </label>

              <input
                type="text"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-orange-500 focus:outline-none"
                value={foodDetail.image}
                onChange={(e) => setFoodDetail({ ...foodDetail, image: e.target.value })}
                placeholder="https://..."
              />
            </div>


            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={foodDetail.isAvailable}
                onChange={(e) =>
                  setFoodDetail({
                    ...foodDetail,
                    isAvailable: e.target.checked,
                  })
                }
                className="sr-only"
              />

              <div
                className={`w-14 h-7 rounded-full relative transition ${foodDetail.isAvailable
                    ? "bg-green-500"
                    : "bg-gray-300"
                  }`}
              >
                <span
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition ${foodDetail.isAvailable ? "translate-x-7" : ""
                    }`}
                ></span>
              </div>

              <span className="ml-3 font-semibold text-[#39364b]">
                {foodDetail.isAvailable ? "Available" : "Unavailable"}
              </span>
            </label>    </div>

          <button
            onClick={()=>{updateId===null ?addFoodItem() : editFoodItem() }}
            className="w-full mt-8 bg-[#39364b] text-white py-4 rounded-xl text-lg font-semibold border-2 border-[#39364b] hover:bg-white hover:text-orange-500 hover:border-orange-500 transition-all duration-300"
          >
            {updateId===null ?'🍔 Add Food Item ': `📝 edit Food Item`}
            
          </button>

        </form>
      </div>
    </>
  )
}

export default Admin

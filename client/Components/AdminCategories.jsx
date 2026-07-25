import React, { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import ConfirmationModel from './confirmationModel'

function AdminCategories({categoryMenu,setCategoryMenu,categoryData,confirm,setConfirm,type,setType}) {

    const [category,setCategory]=useState('')
    const [getCategory,setGetCategory]=useState([])
    const [itemId,setItemId]=useState(null)
    

useEffect(()=>{
        categoryDataGet()
},[])

const categoryDataGet = async() =>{
    try {
        let res = await fetch('http://localhost:3000/get-category');
        let data = await res.json()
        setGetCategory(data.data);
    } catch (error) {
         console.log(error);
    }
}

const addCategory = async() =>{
    try {
        let res = await fetch("http://localhost:3000/add-category",{
            method:"POST",
            headers:{
            'Content-type':'application/json'
            },
            body:JSON.stringify({
                name:category})
        })
        setCategory('');
        categoryDataGet()
        await categoryData();
    } catch (error) {
        console.log(error);   
    }
}

const dltCategory = async(id) =>{
    try {
        let res = await fetch(`http://localhost:3000/remove-category/${id}`,{
            method:'DELETE'
        })
        categoryDataGet()
        await categoryData();
    } catch (error) {
        console.log(error);   
    }
}

  return (
    <>
<div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
        <div className='flex flex-col justify-center items-center h-screen ' >
    <div className=' bg-white px-5 py-4 w-94 rounded-2xl '>
        <div className=' flex space-x-6  '>
        <div className=''><img className='w-12 h-12' src="https://img.icons8.com/?size=100&id=35oo0tJZ03jT&format=png&color=FD7E14" alt="" /></div>
        <div>
            <p className='font-bold  text-xl text-gray-600'>Add New Category</p>
            <span className='text-sm text-gray-500'>Create a new menu categores.</span>
        </div>
    </div>

    <div className='py-4'>
        <label className='font-bold  text-gray-600' htmlFor="">Category Name : </label> <br />
        <input  type="text" placeholder='e.g.,Italian Pastas, Burger' required className="w-full rounded-xl border border-orange-200 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400" value={category} onChange={(e)=>setCategory(e.target.value)}/>
    </div>

    <div>
        <p className='font-bold  text-gray-600'>Category List :</p>
       <div className="mt-3">
  <ul className="space-y-2  h-42 overflow-y-scroll">
    {getCategory.map((item) => (
      <li
        key={item._id}
        className="flex items-center justify-between bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 hover:bg-orange-100 transition"
      >
        <span className="font-medium text-gray-700">
          🍽️ {item.name}
        </span>

        <button className="text-red-500 hover:text-red-600">
          {/* <FaTrash className='cursor-pointer' onClick={()=>dltCategory(item._id)}/> */}
          <FaTrash className='cursor-pointer'
           onClick={()=>{setConfirm(true)
                setType('category')
                setItemId(item._id)
          }}/>
        </button> 
      </li>
    ))}
  </ul>
</div>
    </div>

    <div className='flex justify-end space-x-5 pt-7'>
        <button className='text-gray-500 px-3 py-2 rounded-xl bg-gray-100 border-2 border-r-gray-700 font-bold cursor-pointer' onClick={()=>setCategoryMenu(!categoryMenu)}>Close</button>
        <button className='bg-orange-500 px-3 py-2 rounded-xl text-white font-bold cursor-pointer' onClick={addCategory}>+ Save Category</button>
    </div>
    </div>
    </div>
</div>
{confirm && (<ConfirmationModel confirm={confirm} setConfirm={setConfirm} dltCategory={dltCategory} type={type} setType={setType} setItemId={setItemId} itemId={itemId}/>)}
    </>
  )
}

export default AdminCategories
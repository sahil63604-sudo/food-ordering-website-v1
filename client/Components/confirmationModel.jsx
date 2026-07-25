import React from 'react'

function ConfirmationModel(
  {id,confirmStatus, setConfirm,confirm,CancelStatus,cancelId,dltId,deleteItem, dltCategory,type,setType,setItemId,itemId,placeOrder}) {

  console.log(type);
  const modalContent = () => {
  switch (type) {
    case "edit":
  return {
    title: "Edit Menu Item",
    subtitle: "Please review your changes before updating.",
    message: "Are you sure you want to update this menu item?",
    warning: "The changes will be saved immediately."
  };

    case "dlt":
      return {
        title: "Delete Menu Item",
        subtitle: "Please confirm before deleting this menu item.",
        message: "Are you sure you want to delete this menu item?",
        warning: "This action cannot be undone."
      };

    case "confirm":
      return {
        title: "Confirm Reservation",
        subtitle: "Please verify before proceeding.",
        message: "Are you sure you want to confirm this reservation?",
        warning: "This action cannot be undone."
      };

    case "cancel":
      return {
        title: "Cancel Reservation",
        subtitle: "Please verify before proceeding.",
        message: "Are you sure you want to cancel this reservation?",
        warning: "This action cannot be undone."
      };

      case "category":
  return {
    title: "Delete Category",
    subtitle: "Please confirm before deleting this category.",
    message: "Are you sure you want to delete this category?",
    warning: "This action cannot be undone. All menu items linked to this category may be affected."
  };

  case "Order":
  return {
    title: "Place Your Order",
    subtitle: "Ready to enjoy your meal?",
    message: "Do you want to place this order now?",
    warning: "After confirmation, the restaurant will start preparing your order."
  };

    default:
      return {
        title: "",
        subtitle: "",
        message: "",
        warning: "",
        buttonText: "",
        buttonColor: ""
      };
  }
};

const content = modalContent();

const handleConfirm  = () => {
  switch (type) {
    case 'category':
         dltCategory(itemId);
      break; 
   
      case 'dlt':
         deleteItem(dltId);
      break; 
      
      case 'cancel':
        CancelStatus(cancelId)
      break;

       case 'confirm':
        confirmStatus(id)
      break;

       case 'Order':
        placeOrder()
      break;  

    default:
      break;
  }
}


  return (
    <>
    {/* Confirmation Modal */}
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

  <div className="w-[90%] max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">

    {/* Header */}
    <div className="flex items-center gap-3 border-b px-6 py-5">
      <div className="flex h-12 w-12 items-center justify-center rounded-full">
        <span className="text-2xl">⚠️</span>
      </div>

      <div>
        <h2 className={`text-xl font-bold text-gray-800`}>
            {content.title}
        </h2>
        <p className="text-sm text-gray-500">
         {content.subtitle}
        </p>
      </div>
    </div>

    {/* Body */}
    <div className="px-6 py-6">
      <p className="text-gray-600 leading-7">
         {content.message}
        <span className={`font-semibold text-orange-600`}>
           {/* {content.warning} */}
        </span>
        ?
      </p>

      <p className="mt-3 text-sm text-red-500">
        {content.warning}
      </p>
    </div>

    {/* Footer */}
    <div className="flex justify-end gap-3 border-t bg-gray-50 px-6 py-4">

      <button
        className="rounded-lg border border-gray-300 px-5 py-2.5 font-medium text-gray-700 transition hover:bg-gray-100 cursor-pointer"
        onClick={()=>setConfirm(false)}
      >
        Cancel
      </button>

       <button
        className="rounded-lg bg-orange-500 px-5 py-2.5 font-medium text-white transition hover:bg-orange-600 cursor-pointer"
      onClick={()=>{handleConfirm()
         setConfirm(false)
         
      }}
     >
        Confirm
      </button>

    </div>

  </div>

</div>
    </>
  )
}

export default ConfirmationModel
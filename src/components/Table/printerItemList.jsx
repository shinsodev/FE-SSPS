import { NavLink } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { enablePrinter, disablePrinter } from "../../services/AdminService";
function ItemPriter(props) {
  const { printerID, printerLocation, availableDocType, papersLeft, status } = props.item;
  const { editPrinter } = props;

  const [currentStatus, setCurrentStatus] = useState(status);

  function handleEditPrinter() {
    const printer = {
      printerID: printerID,
      printerLocation: printerLocation,
      availableDocType: availableDocType,
      papersLeft: papersLeft,
      status: currentStatus
    };
    editPrinter(printer);
  }

  const handleStatusChange = async() => {
    const confirmChange = window.confirm(
      `Are you sure you want to change the status to ${currentStatus === "ONLINE" ? "OFFLINE" : "ONLINE"}?`
    );
    if (confirmChange) {
      //dung try catch 
      if (currentStatus === "ONLINE") {
        const token = localStorage.getItem('token');
        const response = await disablePrinter(token, printerID);
        console.log("res", response)
        if (response.data.result === "Printer disabled successfully") {
          setCurrentStatus("OFFLINE");
        }
        else {
          //hien thi enable that bai
        }
      }
      else {
        const token = localStorage.getItem('token');
        const response = await enablePrinter(token, printerID);
        console.log("res", response)
        if (response.data.result === "Printer enabled successfully") {
          setCurrentStatus("ONLINE");
        }
        else {
          //hien thi enable that bai
        }
      }
      //goi sv
    }
  }

  useEffect(() => {
    console.log("Current printer ID:", printerID);
  }, [printerID]);

  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <td className="px-6 py-4">{printerID}</td>
      <td className="px-6 py-4">{printerLocation}</td>
      <td className="px-6 py-4">{availableDocType.join("/")}</td>
      <td className="px-6 py-4">{papersLeft}</td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className={`h-2.5 w-2.5 rounded-full me-2 ${currentStatus === "ONLINE" ? "bg-green-500" : "bg-red-500"}`}></div>
          <span onClick={handleStatusChange} className="cursor-pointer text-sm text-blue-500">{currentStatus}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-center">
        <div className="flex items-center gap-3">
          <NavLink to="#" type="button" className="font-medium text-indigo-500">
            <FaEye size={20} />
          </NavLink>
          <button
            className="font-medium text-green-500"
            onClick={handleEditPrinter}
          >
            <FaEdit size={20} />
          </button>
          <button className="font-medium text-red-500">
            <FaTrash size={20} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default ItemPriter;



// import { NavLink } from "react-router-dom";
// import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
// import { useEffect } from "react";
// function ItemPriter(props) {

//   const { printerID, printerLocation, availableDocType, papersLeft, status } = props.item;
//   const { editPrinter } = props;

//   //
//   function handleEditPrinter() {
//     const printer = {
//       printerID: printerID,
//       printerLocation: printerLocation,
//       availableDocType: availableDocType,
//       papersLeft: papersLeft,
//       status: status
//     }
//     editPrinter(printer );
//   }
// //
//   useEffect(() => {
//     console.log("oke", printerID)
//   }, [])
//   return (
//     <tr className="bg-white border-b hover:bg-gray-50">
//       <td className="px-6 py-4">{printerID}</td>
//       <td className="px-6 py-4">{printerLocation}</td>
//       <td className="px-6 py-4">{availableDocType.join("/")}</td>
//       <td className="px-6 py-4">
//         {papersLeft}
//         {/* <img className="w-10 h-10" src={imgSrc} alt="" /> */}
//       </td>
//       <td className="px-6 py-4">
//         <div className="flex items-center">
//           <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
//           {status}
//         </div>
//       </td>
//       <td className="px-6 py-4 text-center">
//         <div className="flex items-center gap-3">
//           <NavLink to="#" type="button" className="font-medium text-indigo-500">
//             <FaEye size={20} />
//           </NavLink>
//           <button
//             className="font-medium text-green-500"
//             onClick={handleEditPrinter}
//           >
//             <FaEdit size={20} />
//           </button>
//           <button className="font-medium text-red-500">
//             <FaTrash size={20} />
//           </button>
//         </div>
//       </td>
//     </tr>
//   );
// }
// export default ItemPriter;

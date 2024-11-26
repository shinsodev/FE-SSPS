import { NavLink } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { enablePrinter, disablePrinter } from "../../services/AdminService";



const listType = [
  { value: "application/pdf", name: "pdf" },
  { value: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", name: "excel" },
  { value: "image/tiff", name: "TIFF" },
  { value: "image/jpeg", name: "jpeg" },
  { value: "image/gif", name: "gif" },
];
function ItemPriter(props) {
  const { printerID, printerLocation, availableDocType, papersLeft, status } = props.item;
  const { editPrinter } = props;

  const [currentStatus, setCurrentStatus] = useState(status);


    // Chuyển đổi `availableDocType` từ value sang name
    const getReadableDocTypes = (types) => {
      return types
        .map((type) => {
          const docType = listType.find((item) => item.value === type);
          return docType ? docType.name : type;
        })
        .join(", ");
    };


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
      `Bạn có muốn thay đổi trạng thái máy in thành ${currentStatus === "ONLINE" ? "OFFLINE" : "ONLINE"}?`
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
      <td className="px-6 py-4">{getReadableDocTypes(availableDocType)}</td>
      {/* <td className="px-6 py-4">{availableDocType.join("/")}</td> */}
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




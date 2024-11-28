import { NavLink } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import printer1 from "../../assets/img/printer1.webp";
import DeleteDialog from "./InformDelete";
import { useState, useEffect } from "react";
import { enablePrinter, disablePrinter } from "../../services/AdminService";
function ItemPriter(props) {
  const { printerID, printerLocation, status, papersLeft, availableDocType } =
    props.item;
  const [currentStatus, setCurrentStatus] = useState(status);

  const { editPrinter, deletePrinter } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  function handleEditPrinter() {

    editPrinter(printerID);

  }
  const getReadableDocTypes = (types) => {
    return types
      .map((type) => {
        const docType = listType.find((item) => item.value === type);
        return docType ? docType.title : type;
      })
      .join(", ");
  };
  const handleStatusChange = () => {
    setIsModalOpen(true);
  };
  const [newStatus, setNewStatus] = useState("");
  // const listType = [
  //   { value: "application/pdf", name: "pdf" },
  //   { value: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", name: "excel" },
  //   { value: "image/tiff", name: "TIFF" },
  //   { value: "image/jpeg", name: "jpeg" },
  //   { value: "image/gif", name: "gif" },
  // ];
  const listType = [
    { value: "application/pdf", title: "pdf" },
    {
      value: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      title: "excel",
    },
    { value: "image/tiff", title: "TIFF" },
    { value: "image/jpeg", title: "jpeg" },
    { value: "image/gif", title: "gif" },
    { value: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", title: "doc" },
  ];
  const [open, setOpen] = useState(false);
  function handleDeletePrinter() {
    setOpen(true);
  }
  function closeDialog() {
    setOpen(false);
  }
  async function submitDelete() {
    try {
      await deletePrinter(printerID);
      setOpen(false);
    } catch (err) {
      console.error(err.message);
    }
  }
  // function handStatus(){
  //  if(status==="ONLINE"){

  //  }
  // }
  useEffect(() => {

  }, [status]);

  const confirmStatusChange = async () => {
    const token = localStorage.getItem("token");
    if (currentStatus === "ONLINE") {
      const response = await disablePrinter(token, printerID);
      if (response.data.result === "Printer disabled successfully") {
        setCurrentStatus("OFFLINE");

      }
    } else {
      const response = await enablePrinter(token, printerID);
      if (response.data.result === "Printer enabled successfully") {
        setCurrentStatus("ONLINE");
      }
    }
    setIsModalOpen(false);
  };
  useEffect(() => {
  }, [currentStatus]);
  return (
    <>
      <tr className="bg-white border-b hover:bg-gray-50">
        <td className="px-6 py-4">{printerID}</td>
        <td className="px-6 py-4">{printerLocation}</td>
        <td className="px-6 py-4">{getReadableDocTypes(availableDocType)}</td>
        <td className="px-6 py-4">{papersLeft}</td>
        <td className="px-6 py-4">
          <img className="w-10 h-10" src={printer1} alt="" />
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center" onClick={handleStatusChange}>
            {currentStatus === "ONLINE" ? (
              <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
            ) : (
              <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>
            )}
            {currentStatus}
          </div>
        </td>
        <td className="px-6 py-4 text-center">
          <div className="flex items-center gap-3">
            <NavLink
              to="#"
              type="button"
              className="font-medium text-indigo-500"
            >
              <FaEye size={20} />
            </NavLink>
            <button
              className="font-medium text-green-500"
              onClick={handleEditPrinter}
            >
              <FaEdit size={20} />
            </button>
            <button
              className="font-medium text-red-500"
              onClick={handleDeletePrinter}
            >
              <FaTrash size={20} />
            </button>
          </div>
        </td>
      </tr>
      <DeleteDialog
        openD={open}
        printerId={printerID}
        closeDialog={closeDialog}
        submitDelete={submitDelete}
      />
    {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Thông báo!</h2>
            <p>
              Bạn có muốn thay đổi trạng thái máy in thành <strong>{newStatus}</strong>?
            </p>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                onClick={confirmStatusChange}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Xác Nhận
              </button>
            </div>
          </div>
        </div>
      )}
      </>

  );
}
export default ItemPriter;

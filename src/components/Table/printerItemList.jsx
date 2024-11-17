import { NavLink } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import printer1 from "../../assets/img/printer1.webp";
import DeleteDialog from "./InformDelete";
import { useState } from "react";

function ItemPriter(props) {
  const { printerID, printerLocation, status, papersLeft, availableDocType } =
    props.item;
  const { editPrinter, deletePrinter } = props;
  function handleEditPrinter() {
    editPrinter(printerID);
  }

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

  return (
    <>
      <tr className="bg-white border-b hover:bg-gray-50">
        <td className="px-6 py-4">{printerID}</td>
        <td className="px-6 py-4">{printerLocation}</td>
        <td className="px-6 py-4">{papersLeft}</td>
        <td className="px-6 py-4">
          <img className="w-10 h-10" src={printer1} alt="" />
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            {status === "ONLINE" ? (
              <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
            ) : (
              <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>
            )}
            {status}
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
    </>
  );
}
export default ItemPriter;

import { useState, useEffect } from "react";
import printer1 from "../../assets/img/printer1.webp";
import EditDialog from "./EditPrinter";
import ItemPriter from "./printerItemList";
import { fetchAllPrinters } from "../../services/AdminService";

const Table = ({ currentPage, size, getTotalPages }) => {
  const [selectedPrinter, setSelectedPrinter] = useState(null);
  const [listPrinter, setListPrinter] = useState([]);
  const [isEdit, setEdit] = useState(false);

  const handleSetTotalPages = (totalPages) => {
    getTotalPages(totalPages);
  }

  function EditPrinter(printer) {
    setSelectedPrinter(printer); // Store selected printer
    setEdit(true); // Open the dialog
  }
  
  // function EditPrinter(id) {
  //   console.log("Edit printer with id: ", id);
  //   setEdit(true);
  // }
  function setOpenEdit(open) {
    setEdit(open);
  }


  const fecthAllDataPrinters = async () =>{
    const token = localStorage.getItem('token');
    ///
    const response = await fetchAllPrinters(token, currentPage, size);
    console.log(">>page", currentPage)
    handleSetTotalPages(response.data.totalPages);
    //
        
    setListPrinter(response.data.result)
  }

  useEffect(()=>{
    fecthAllDataPrinters();
  }, [currentPage])

  return (
    <>
      <div className="relative overflow-x-auto rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-5">
                Printer ID
              </th>
              <th scope="col" className="px-6 py-3">
                Location
              </th>
              <th scope="col" className="px-6 py-3">
                AvailableDocType
              </th>
              <th scope="col" className="px-6 py-3">
                paperLeft
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {listPrinter.map((item) => (
              <ItemPriter item={item} key={item.printerID} editPrinter={EditPrinter}  />
            ))}
          </tbody>
        </table>
      </div>
      <EditDialog 
  open={isEdit} 
  setOpenEdit={setOpenEdit} 
  printer={selectedPrinter} // Pass the selected printer
/>

      {/* <EditDialog open={isEdit} setOpenEdit={setOpenEdit} /> */}
    </>
  );
};



export default Table;

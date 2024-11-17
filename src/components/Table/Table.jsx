import { useEffect, useState } from "react";
import printer1 from "../../assets/img/printer1.webp";
import EditDialog from "./EditPrinter";
import ItemPriter from "./printerItemList";
import axios from "axios";
import ReactPaginate from "react-paginate";

const listPrinter = [
  {
    id: 1,
    location: "Di an",
    color: "Mono/Color",
    imgSrc: printer1,
    status: "Success",
  },
  {
    id: 2,
    location: "Di an",
    color: "Mono/Color",
    imgSrc: printer1,
    status: "Success",
  },
  {
    id: 3,
    location: "Di an",
    color: "Mono/Color",
    imgSrc: printer1,
    status: "Success",
  },
  {
    id: 4,
    location: "Di an",
    color: "Mono/Color",
    imgSrc: printer1,
    status: "Success",
  },
  {
    id: 5,
    location: "Di an",
    color: "Mono/Color",
    imgSrc: printer1,
    status: "Success",
  },
];

const Table = () => {

  // const [printerList, setPrinterList] = useState([])
  // const [totalPages, setTotalPages] = useState(10)

  // async function getListPrinter(pageN){
  //   const token = localStorage.getItem("token")
  //   try {
  //     const data = await axios.get("http://localhost:8080/ssps/admin/get-all-printers", {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     })
  //     console.log("data: ", data.data.result)
  //     setPrinterList(data.data.result)
  //   } catch(err){
  //     console.log("Error")
  //   }
  // }

  // useEffect(()=>{
  //   getListPrinter()
  // },[])

  // async function handlePageClick(e){
  //   try{
  //     await getListPrinter(e.selected)
  //     console.log("oke")
  //   } catch(err){
  //     console.log("Failed")
  //   }
  // }

  const [isEdit, setEdit] = useState(false);
  function EditPrinter(id) {
    console.log("Edit printer with id: ", id);
    setEdit(true);
  }
  function setOpenEdit(open) {
    setEdit(open);
  }

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
                Color
              </th>
              <th scope="col" className="px-6 py-3">
                Image
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
              <ItemPriter item={item} key={item.id} editPrinter={EditPrinter} />
            ))}
          </tbody>
        </table>
      </div>
      <EditDialog open={isEdit} setOpenEdit={setOpenEdit} />
      {/* <ReactPaginate
       breakLabel="..."
       nextLabel="NEXT →"
       onPageChange={handlePageClick}
       pageRangeDisplayed={5}
       pageCount={totalPages}
       previousLabel="← PREVIOUS"
       className="flex space-x-2 items-center justify-center my-8"
       pageClassName="page-item"
       pageLinkClassName="page-link px-4 py-2 hover:bg-gray-900/10 rounded-md shadow-2xl"
       activeLinkClassName="active bg-black text-white" // Active page style
       previousClassName="page-item"
       previousLinkClassName="page-link hover:bg-gray-900/10 px-4 py-2 rounded-md"
       nextClassName="page-item"
       nextLinkClassName="page-link hover:bg-gray-900/10 px-4 py-2 rounded-md"
       breakClassName="page-item"
       breakLinkClassName="page-link"
       disabledLinkClassName="text-gray-400 cursor-not-allowed"
       containerClassName="pagination"
     /> */}
    </>
  );
};

export default Table;

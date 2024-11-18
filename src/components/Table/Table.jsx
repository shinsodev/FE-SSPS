import { useEffect, useState } from "react";
import EditDialog from "./EditPrinter";
import ItemPriter from "./printerItemList";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { deletePrinter } from "../../services/AdminService";
import { notifyError } from "../Notification/NotifyError";
import { notifySuccess } from "../Notification/NotifySuccess";

const Table = () => {
  const [printerList, setPrinterList] = useState([]);
  const [totalPages, setTotalPages] = useState(10);
  const [pageCurr, setPageCurr] = useState(0);

  async function getListPrinter(pageN) {
    const token = localStorage.getItem("token");
    try {
      const data = await axios.get(
        "http://localhost:8080/ssps/admin/get-all-printers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: pageN,
            size: 5,
          },
        }
      );
      if (data.status === 200) {
        setPrinterList(data.data.result);
      } else {
        throw "Error from fetching data";
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getListPrinter(0);
  }, []);

  async function handlePageClick(e) {
    try {
      setPageCurr(e.selected);
      await getListPrinter(e.selected);
    } catch (err) {
      console.error(err.message);
    }
  }

  const [isEdit, setEdit] = useState(false);
  function EditPrinter(id) {
    setEdit(true);
  }
  function setOpenEdit(open) {
    setEdit(open);
  }

  async function deletePrinterWithId(id) {
    const token = localStorage.getItem("token");
    if (!token) {
      notifyError("token missing");
    }

    try {
      const result = await deletePrinter(token, id);
      if (result.success) {
        setPageCurr(0);
        await getListPrinter(0);
        notifySuccess("Delete printer success!!!!");
      } else {
        throw "Delete failed!!!";
      }
    } catch (err) {
      console.error(err.message);
      notifyError(err.message);
    }
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
                Paper left
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
            {printerList.map((item) => (
              <ItemPriter
                item={item}
                key={item.printerID}
                editPrinter={EditPrinter}
                deletePrinter={deletePrinterWithId}
              />
            ))}
          </tbody>
        </table>
      </div>
      <EditDialog open={isEdit} setOpenEdit={setOpenEdit} />
      <ReactPaginate
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
        forcePage={pageCurr}
      />
    </>
  );
};

export default Table;

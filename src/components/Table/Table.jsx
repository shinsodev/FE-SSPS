import { useEffect, useState } from "react";
import EditDialog from "./EditPrinter";
import ItemPriter from "./printerItemList";
import axios from "../../services/customize-axios";
import ReactPaginate from "react-paginate";
import { deletePrinter } from "../../services/AdminService";
import { notifyError } from "../Notification/NotifyError";
import { notifySuccess } from "../Notification/NotifySuccess";
import FilterPrinter from "./FilterPrinter";

const Table = () => {
  const [printerList, setPrinterList] = useState([]);
  const [totalPages, setTotalPages] = useState(10);
  const [pageCurr, setPageCurr] = useState(0);
  const [isFilter, setFilter] = useState(false);
  const [editPrinterId, setEditPrinterId] = useState();
  async function getListPrinter(pageN) {
    const token = localStorage.getItem("token");
    try {
      const data = await axios.get("/ssps/admin/get-all-printers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: pageN,
          size: 5,
        },
      });
      if (data.status === 200) {
        setPrinterList(data.data.result);
        setPageCurr(pageN);
        setTotalPages(data.data.totalPages)
      } else {
        throw "Error from fetching data";
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  async function getListPrinterFilter(listFilter) {
    const token = localStorage.getItem("token");

    try {
      const result = await axios.post(
        "/ssps/admin/match-printers",
        listFilter,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: 0,
            size: 5
          }
        }
      );

      if (result.status === 200) {
        setPrinterList(result.data.result);
        setFilter(true);
      } else {
        throw "Error from querying match printers";
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getListPrinter(0);
  }, []);

  async function handlePageClick(e) {
    try {
      await getListPrinter(e.selected);
    } catch (err) {
      console.error(err.message);
    }
  }

  const [isEdit, setEdit] = useState(false);
  function EditPrinter(id) {
    console.log("id", id);
    setEditPrinterId(id);
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

  async function restoreOrigin() {
    try {
      await getListPrinter(0);
      setFilter(false);
    } catch (err) {
      console.log(err);
    }
  }

  async function setFilterType(data) {
    try {
      // Khong loc
      if (data.length === 0 && isFilter === false) {
        return;
      } else if (data.length === 0 && isFilter === true) {
        await restoreOrigin();
      } else {
        let listData = [];
        data.map((item) => {
          listData.push(item.value);
        });
        await getListPrinterFilter(listData);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <FilterPrinter setFilterType={setFilterType} />
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
                Paper left
              </th>
              {/* <th scope="col" className="px-6 py-3">
                Image
              </th> */}
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
      <EditDialog open={isEdit} setOpenEdit={setOpenEdit} printerID={editPrinterId} />
      {!isFilter && (
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
      )}
    </>
  );
};

export default Table;
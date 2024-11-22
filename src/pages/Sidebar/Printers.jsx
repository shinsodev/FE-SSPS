import React, { useEffect, useState } from "react";
import printer1 from "../../assets/img/printer1.webp";
import UploadFilePage from "./UploadFile";
import ReactPaginate from "react-paginate";
import axios from "axios";
import PrinterDetail from "../Printer/PrinterDetail";
const Printers = () => {
  const [selectPrinter, setSelectPrinter] = useState(null);
  const [totalPages, setTotalPages] = useState(10);
  const [pageCurr, setPageCurr] = useState(0);
  const [printerDetail, setPrinterDetail] = useState(null);
  const [listPrinter, setListPrinter] = useState([]);

  function handleSelectPrinter(printerId) {
    setSelectPrinter({ id: printerId });
  }

  function handleDetailPrinter(index) {
    setPrinterDetail(listPrinter[index]);
  }

  async function getListPrinter(pageN) {
    const token = localStorage.getItem("token");
    try {
      const data = await axios.get(
        "http://localhost:8080/ssps/students/get-all-printers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: pageN,
            size: 3,
          },
        }
      );
      if (data.status === 200) {
        setListPrinter(data.data.result);
      } else {
        throw "Error from fetching data";
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  async function handlePageClick(e) {
    try {
      setPageCurr(e.selected);
      await getListPrinter(e.selected);
    } catch (err) {
      console.error(err.message);
    }
  }

  function closeDetailDialog() {
    setPrinterDetail(null);
  }

  useEffect(() => {
    getListPrinter(0);
  }, []);

  return (
    <>
      {selectPrinter === null && (
        <>
          <section className="py-10 rounded-2xl bg-gray-100 h-full">
            <h3 className="h3 text-[40px] text-primary text-center pb-12 pt-2">
              Printer list
            </h3>
            <div className="container mx-auto lg:px-0">
              <div className="grid lg:grid-cols-3 gap-5 px-8">
                {listPrinter.map((item, index) => (
                  <div
                    className="bg-white min-h-[420px] min-w-[330px] rounded-2xl shadow-lg border border-gray-300"
                    key={item.printerID}
                  >
                    <div className="overflow-hidden flex items-center justify-center py-6">
                      <img
                        src={printer1}
                        alt=""
                        className="w-[80%] h-48 object-cover rounded-2xl shadow-lg transition-all duration-300"
                      />
                    </div>

                    <div className="flex justify-end mx-6 mb-3">
                      {item.status === "ONLINE" ? (
                        <div className="px-4 py-2 rounded-3xl bg-green-300">
                          {item.status}
                        </div>
                      ) : (
                        <div className="px-4 py-2 rounded-3xl bg-red-300">
                          {item.status}
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="h3 text-center">
                        Printer {item.printerID}
                      </h3>

                      <div className="text-gray-500 flex flex-col mx-10">
                        <ul>
                          <li>Color: Mono/Color</li>
                          <li>Location: {item.printerLocation}</li>
                        </ul>
                      </div>

                      <div className="flex items-center justify-center my-6">
                        <button
                          className="py-3 px-8 mr-3 rounded-lg bg-blue-500 text-[17px] font-medium text-white hover:opacity-60"
                          onClick={() => handleDetailPrinter(index)} //index of printer in printer List
                        >
                          Detail
                        </button>
                        <button
                          className="py-3 px-8 ml-3 rounded-lg bg-green-500 text-[17px] font-medium text-white hover:opacity-60"
                          onClick={() => handleSelectPrinter(item.printerID)}
                        >
                          Select
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <ReactPaginate
              breakLabel="..."
              nextLabel="NEXT →"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
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
          </section>
        </>
      )}
      {selectPrinter !== null && (
        <>
          <UploadFilePage />
        </>
      )}
      {printerDetail !== null && (
        <>
          <PrinterDetail
            open={printerDetail !== null ? true : false}
            closeDetailDialog={closeDetailDialog}
            detailPrinter={printerDetail}
          />
        </>
      )}
    </>
  );
};

export default Printers;

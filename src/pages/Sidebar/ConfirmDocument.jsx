import React, { useState, useEffect } from "react";
import { getPrintRequests, confirmReceive } from "../../services/UserService";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";

const ConfirmDocument = () => {
  const [completedPrints, setCompletedPrints] = useState([]);
  const [isPendingPrints, setIsPendingPrints] = useState([]);
  const [selectedData, setSelectData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPrintRequests = async () => {
      try {
        const response = await getPrintRequests(token);
        if (response.data.result) {
          setCompletedPrints(response.data.result.completedPrints || []);
          setIsPendingPrints(response.data.result.pendingPrints || []);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Failed to fetch print requests!");
      }
    };

    fetchPrintRequests();
  }, [isConfirm]);
  useEffect(() => {
    setIsEmpty(completedPrints.length === 0 && isPendingPrints.length === 0);
  }, [completedPrints, isPendingPrints]);

  const handleOpenModal = (print) => {
    setIsOpen(true);
    setSelectData(print);
  };

  const handleConfirmReceive = async (printingId) => {
    try {
      const response = await confirmReceive(token, printingId);
      if (response.data.result) {
        toast.success("Confirmation successful!");
      } else {
        toast.error("Error confirming receive.");
      }
    } catch (error) {
      toast.error(`Error confirming receive: ${error.message || "Unknown error"}`);
    } finally {
      setIsOpen(false);
      setIsConfirm(!isConfirm);
    }
  };

  const handleConfirmAll = async () => {
    let successCount = 0;
    let errorOccurred = false;
    
    if (completedPrints.length === 0) {
      toast.error("No documents are complete yet.");
      return;
    }
    for (const print of completedPrints) {
      try {
        const response = await confirmReceive(token, print.printingId);
        if (response.data.result) {
          successCount++;
        } else {
          errorOccurred = true;
        }
      } catch (error) {
        errorOccurred = true;
      }
    }
    if (successCount > 0) {
      toast.success(`${successCount} confirmations successful!`);
    }
    if (errorOccurred) {
      toast.error("Some confirmations failed.");
    }
    setIsConfirm(!isConfirm);
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const displayedPrints = [...isPendingPrints, ...completedPrints].slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );
  
  const pageCount = Math.ceil([...isPendingPrints, ...completedPrints].length / itemsPerPage);

  return (
    <section className="p-8">
      <div>
        <h2 className="font-medium text-3xl text-center">Document confirmation</h2>
      </div>
      <hr className="my-5" />
      <div className="flex justify-between mb-4">
        <div className="flex-grow"></div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={handleConfirmAll}
        >
          Confirm All
        </button>
      </div>
      <div className="relative overflow-x-auto rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-6 py-5">ID</th>
              <th className="px-6 py-5">Expired Time</th>
              <th className="px-6 py-5">Printer ID</th>
              <th className="px-6 py-5">File Name</th>
              <th className="px-6 py-5">Page Count</th>
              <th className="px-6 py-5">Paper Size</th>
              <th className="px-6 py-5">Sided Type</th>
              <th className="px-6 py-5">Copies</th>
              <th className="px-6 py-5">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  <div className="flex items-center justify-center h-full py-10">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
                    <span className="ml-3 text-lg font-medium text-blue-600">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : (
              displayedPrints.map((print, index) => (
                <tr
                  key={index}
                  className={`border-b hover:bg-gray-50 ${completedPrints.includes(print) ? "cursor-pointer" : "cursor-default"}`}
                  onClick={() => completedPrints.includes(print) && handleOpenModal(print)}
                >
                  <td className="px-6 py-4">{index + 1 + currentPage * itemsPerPage}</td>
                  <td className="px-6 py-4">{print.expiredTime ? new Date(print.expiredTime).toLocaleDateString("vi-VN") : "N/A"}</td>
                  <td className="px-6 py-4">{print.printerId}</td>
                  <td className="px-6 py-4">{print.fileName}</td>
                  <td className="px-6 py-4">{print.pageCount}</td>
                  <td className="px-6 py-4">{print.paperSize}</td>
                  <td className="px-6 py-4">{print.sidedType}</td>
                  <td className="px-6 py-4">{print.numberOfCopies}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {completedPrints.includes(print) ? (
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                      ) : (
                        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500 me-2"></div>
                      )}
                      {completedPrints.includes(print) ? "Completed" : "Pending"}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {isEmpty && (
          <div className="text-sm text-gray-700 px-6 py-4 text-center">
              No data found.
          </div>
        )}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-xl font-bold text-center mb-4">Details</h2>
            <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 space-y-2">
              <div>
                <span className="font-semibold">Printing ID: </span>
                <span>{selectedData.printingId}</span>
              </div>
              <div>
                <span className="font-semibold">Admin Email: </span>
                <span>{selectedData.printingAdminMail}</span>
              </div>
              <div>
                <span className="font-semibold">Expired Time: </span>
                <span>{selectedData.expiredTime}</span>
              </div>
              <div>
                <span className="font-semibold">Student Email: </span>
                <span>{selectedData.studentUploadMail}</span>
              </div>
              <div>
                <span className="font-semibold">Document ID: </span>
                <span>{selectedData.documentId}</span>
              </div>
              <div>
                <span className="font-semibold">File Name: </span>
                <span>{selectedData.fileName}</span>
              </div>
              <div>
                <span className="font-semibold">Copies: </span>
                <span>{selectedData.numberOfCopies}</span>
              </div>
              <div>
                <span className="font-semibold">Page Count: </span>
                <span>{selectedData.pageCount}</span>
              </div>
              <div>
                <span className="font-semibold">Paper Size: </span>
                <span>{selectedData.paperSize}</span>
              </div>
              <div>
                <span className="font-semibold">Sided Type: </span>
                <span>{selectedData.sidedType}</span>
              </div>
              <div>
                <span className="font-semibold">Printer ID: </span>
                <span>{selectedData.printerId}</span>
              </div>
              <div>
                <span className="font-semibold">Start Time: </span>
                <span>{new Date(selectedData.printingStartTime).toLocaleDateString("vi-VN")}</span>
              </div>
              <div>
                <span className="font-semibold">End Time: </span>
                <span>{new Date(selectedData.printingEndTime).toLocaleDateString("vi-VN")}</span>
              </div>
            </div>
            <div className="mt-3 flex justify-between">
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                onClick={() => handleConfirmReceive(selectedData.printingId)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      <ReactPaginate
        breakLabel="..."
        nextLabel="NEXT →"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        forcePage={currentPage}
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
      />
    </section>
  );
};

export default ConfirmDocument;
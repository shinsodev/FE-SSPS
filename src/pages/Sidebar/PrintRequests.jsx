import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import {
  fetchPrintRequests,
  fetchApprovePrint,
} from "../../services/AdminService";
import { toast } from "react-toastify";

const PrintRequests = () => {
  const [printRequests, setPrintRequests] = useState([]);
  const [empty, setEmpty] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPrinterId, setSelectedPrintId] = useState(null);
  const [printerIdInput, setPrinterIdInput] = useState("1"); 

  const [page, setPage] = useState(0); // Số trang hiện tại
  const [totalPages, setTotalPages] = useState(0); // Tổng số trang từ API

  const token = localStorage.getItem("token");

  // Fetch print requests from the API on component mount
  useEffect(() => {
    const getPrintRequests = async () => {
      if (!printerIdInput) return; 

      try {
        setLoading(true);
        const response = await fetchPrintRequests(token, printerIdInput, page, 5);
        setPrintRequests(response.data.result);

        setTotalPages(10); // Đảm bảo totalPages được cập nhật chính xác

        setEmpty(response.data.result.length === 0);
        setError(null);
      } catch (err) {
        setError(err.message || "Unknown error occurred.");
        if (err.response && err.response.status === 400) {
          setEmpty(true);
        }
      } finally {
        setLoading(false);
      }
    };

    getPrintRequests();
    const intervalId = setInterval(getPrintRequests, 10000);
    return () => clearInterval(intervalId);
  }, [printerIdInput,page]);

  const approvePrintRequest = async (printerId) => {
    try {
      await fetchApprovePrint(token, printerId);
      toast.success("Print request approved successfully!");
    } catch (err) {
      toast.error(`Error approving print request: ${err.message || "Unknown error"}`);
    }
    setShowModal(false);
  };

  const handleApprove = (printerId) => {
    setSelectedPrintId(printerId);
    setShowModal(true);
  };
  const handlePageClick = (event) => {
    setPage(event.selected);
  };
 

  return (
    <section className="p-8">
      <div>
        <h2 className="font-medium text-3xl">User Print Requests</h2>
      </div>
      <hr className="my-5" />
      <div className="mt-4 mb-6">
        <label htmlFor="printerIdInput" className="mr-2 font-medium">
          Enter Printer ID:
        </label>
        <input
          type="text"
          id="printerIdInput"
          value={printerIdInput}
          onChange={(e) => setPrinterIdInput(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Enter printer ID"
        />
      </div>

      <div className="relative overflow-x-auto rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-6 py-3">Print ID</th>
              <th className="px-6 py-3">File Name</th>
              <th className="px-6 py-3">Page Count</th>
              <th className="px-6 py-3">Paper Size</th>
              <th className="px-6 py-3">Sided Type</th>
              <th className="px-6 py-3">Copies</th>
              <th className="px-6 py-3">Color</th>
              <th className="px-6 py-3">Student Email</th>
              <th className="px-6 py-3">Start Time</th>
            </tr>
          </thead>
          <tbody>
            {!empty &&
              printRequests.map((request) => (
                <tr
                  key={request.id}
                  className="border-b hover:bg-gray-50"
                  onClick={() => handleApprove(request.printerToPrintID)}
                >
                  <td className="px-6 py-4">{request.printerToPrintID}</td>
                  <td className="px-6 py-4">{request.document.fileName}</td>
                  <td className="px-6 py-4">{request.document.pageCount}</td>
                  <td className="px-6 py-4">{request.document.paperSize}</td>
                  <td className="px-6 py-4">{request.document.sidedType}</td>
                  <td className="px-6 py-4">
                    {request.document.numberOfCopies}
                  </td>
                  <td className="px-6 py-4">
                    {request.document.colorPrint ? "Colorful" : "Normal"}
                  </td>
                  <td className="px-6 py-4">{request.studentUploadMail}</td>
                  <td className="px-6 py-4">
                    {new Date(request.printingStartTime).toLocaleString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {loading && (
          <div className="flex items-center justify-center h-full py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
            <span className="ml-3 text-lg font-medium text-blue-600">
              Loading...
            </span>
          </div>
        )}

        {error && !empty && (
          <div className="flex items-center justify-center h-full py-10">
            <div className="bg-red-100 text-red-600 p-4 rounded-lg shadow-md flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.366-.446.964-.446 1.33 0l5.993 7.293A1 1 0 0115.993 12H4.007a1 1 0 01-.587-1.608l5.993-7.293zM5.18 11h9.64l-4.82 5.874L5.18 11z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-lg font-medium">Error: {error}</span>
            </div>
          </div>
        )}
        {!loading && empty && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md">
            Hiện tại chưa có yêu cầu in nào.
          </div>
        )}
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Xác nhận in</h2>
            <p>Xác nhận yêu cầu in của máy in {selectedPrinterId}</p>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => approvePrintRequest(selectedPrinterId)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Xác nhận
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Hủy
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
     />
    </section>
  );
};

export default PrintRequests;

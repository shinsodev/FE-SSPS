import React, { useState, useEffect } from "react";
import { getPrintRequests, confirmReceive } from "../../services/UserService";
import { toast } from "react-toastify";

const ConfirmDocument = () => {
  const [completedPrints, setCompletedPrints] = useState([]);
  const [selectedData, setSelectData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false); 
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPrintRequests = async () => {
      try {
        const response = await getPrintRequests(token);

        if (response.data.result && response.data.result.completedPrints) {
          setCompletedPrints(response.data.result.completedPrints);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Failed to fetch print requests!");
      }
    };

    fetchPrintRequests();
  }, [isConfirm]);

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
      toast.error(
        `Error confirming receive: ${error.message || "Unknown error"}`
      );
    }
    finally {
      setIsOpen(false);
      setIsConfirm(!isConfirm);
    }
  };

  return (
    <section className="p-8">
      <div>
        <h2 className="font-medium text-3xl text-center">
          Document confirmation
        </h2>
      </div>
      <hr className="my-5" />
      <div className="relative overflow-x-auto rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-6 py-5">ID</th>
              <th className="px-6 py-5">Expired Time</th>
              <th className="px-6 py-5">File Name</th>
              <th className="px-6 py-5">Page Count</th>
              <th className="px-6 py-5">Paper Size</th>
              <th className="px-6 py-5">Sided Type</th>
              <th className="px-6 py-5">Copies</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                <div className="flex items-center justify-center h-full py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
            <span className="ml-3 text-lg font-medium text-blue-600">
              Loading...
            </span>
          </div>
                </td>
              </tr>
            ) : (
              completedPrints.map((print, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleOpenModal(print)}
                >
                  <td className="px-6 py-4">{index+1}</td>
                  <td className="px-6 py-4">
                    {print.expiredTime
                      ? new Date(print.expiredTime).toLocaleDateString("vi-VN")
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4">{print.fileName}</td>
                  <td className="px-6 py-4">{print.pageCount}</td>
                  <td className="px-6 py-4">{print.paperSize}</td>
                  <td className="px-6 py-4">{print.sidedType}</td>
                  <td className="px-6 py-4">{print.numberOfCopies}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
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
                <span>
                  {new Date(selectedData.printingStartTime).toLocaleDateString(
                    "vi-VN"
                  )}
                </span>
              </div>
              <div>
                <span className="font-semibold">End Time: </span>
                <span>
                  {new Date(selectedData.printingEndTime).toLocaleDateString(
                    "vi-VN"
                  )}
                </span>
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
    </section>
  );
};

export default ConfirmDocument;

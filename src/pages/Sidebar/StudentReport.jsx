import React, { useState, useRef, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { MdSearch, MdFilterList } from "react-icons/md";
import { getPrintLogs } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const StudentReport = () => {
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [initialData, setInitialData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const [page, setPage] = useState(0);
  const itemsPerPage = 7; // Số dòng mỗi trang

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = initialData.filter(
      (item) =>
        item.logId.toString().includes(value) ||
        item.documentName.toLowerCase().includes(value) ||
        item.pagesPrinted.toLowerCase().includes(value) ||
        item.printingStartTime.toLowerCase().includes(value) ||
        item.printingEndTime.toLowerCase().includes(value) ||
        item.printerToPrintID.toString().includes(value)
    );

    setFilteredData(filtered);
  };

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleFilterClick = () => {
    setIsFilterVisible(true); // Hiển thị các trường lọc khi nhấn nút lọc
  };

  const handleApplyFilter = () => {
    const startDateObj = startDate ? new Date(startDate) : null;
    const endDateObj = endDate ? new Date(endDate) : null;

    if (startDateObj) {
      startDateObj.setHours(0, 0, 0, 0); // Set to midnight
    }
    if (endDateObj) {
      endDateObj.setHours(23, 59, 59, 999); // Set to end of day
    }

    const filtered = initialData.filter((item) => {
      const itemDate = new Date(item.printingStartTime);
      return (
        (!startDateObj || itemDate >= startDateObj) &&
        (!endDateObj || itemDate <= endDateObj)
      );
    });

    setFilteredData(filtered);
    setIsFilterVisible(false);
  };

  const handlePageClick = (event) => {
    setPage(event.selected); // Chuyển sang trang mới
  };

  useEffect(() => {
    const handleGetPrintLogs = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. Please log in again.");
        return;
      }

      try {
        const response = await getPrintLogs(token);
        if (response.data.result) {
          setInitialData(response.data.result);
          setFilteredData(response.data.result);
        } else {
          console.error("No result data found in API response.");
        }
      } catch (error) {
        console.error(
          "Failed to fetch print logs:",
          error.response?.data || error.message
        );
      }
    };

    handleGetPrintLogs();
  }, []);

  const displayedData = filteredData.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  ); // Lấy dữ liệu của trang hiện tại

  return (
    <section className="p-8">
      <div>
        <h2 className="font-medium text-3xl text-center">Printing History</h2>
      </div>
      <hr className="my-5" />

      <div className="flex justify-center mb-6">
        <div className="flex items-center border border-gray-300 rounded-lg w-full max-w-[600px] group">
          <div
            className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-l-lg border border-gray-300 group-focus-within:border-blue-400 transition-colors duration-200 ease-in-out cursor-pointer"
            onClick={handleIconClick}
          >
            <MdSearch className="w-5 h-5 text-gray-600" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search..."
            ref={inputRef}
            className="px-4 py-2 w-full rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div
            className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-r-lg border border-gray-300 transition-colors duration-200 ease-in-out cursor-pointer"
            onClick={handleFilterClick}
          >
            <MdFilterList className="w-5 h-5 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Date filter fields */}
      {isFilterVisible && (
        <div className="mb-4">
          <label className="mr-2">From:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-1 rounded"
          />
          <label className="mx-2">To:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-1 rounded"
          />
          <button
            onClick={handleApplyFilter}
            className="bg-blue-500 text-white px-4 py-2 ml-4 rounded-lg hover:bg-blue-600"
          >
            Apply
          </button>
        </div>
      )}

      <div className="relative overflow-x-auto rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-5">
                Log ID
              </th>
              <th scope="col" className="px-6 py-5">
                File Name
              </th>
              <th scope="col" className="px-6 py-5">
                Page number
              </th>
              <th scope="col" className="px-6 py-5">
                Start time
              </th>
              <th scope="col" className="px-6 py-3">
                End time
              </th>
              <th scope="col" className="px-6 py-3">
                Printer ID
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Rating
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedData.length > 0 ? (
              displayedData.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 ">{item.logId}</td>
                  <td className="px-6 py-4 capitalize ">{item.documentName}</td>
                  <td className="px-6 py-4 ">{item.pagesPrinted}</td>
                  <td className="px-6 py-4 ">
                    {new Date(item.printingStartTime).toLocaleString("vi-VN")}
                  </td>
                  <td className="px-6 py-4 ">
                    {new Date(item.printingEndTime).toLocaleString("vi-VN")}
                  </td>
                  <td className="px-6 py-4 ">{item.printerToPrintID}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        navigate(`/student/rating/${item.logId}`);
                      }}
                      className="bg-gray-300 text-gray-800 px-4 py-2 ml-4 rounded-lg hover:bg-blue-500 hover:text-white"
                    >
                      Rating
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <ReactPaginate
          breakLabel="..."
          nextLabel="NEXT →"
          pageRangeDisplayed={5}
          pageCount={Math.ceil(filteredData.length / itemsPerPage)}
          onPageChange={handlePageClick}
          forcePage={page}
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
      </div>
    </section>
  );
};

export default StudentReport;

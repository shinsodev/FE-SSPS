import { MdSearch } from "react-icons/md";
import React, { useState, useEffect, useRef } from "react";
import { viewPrintLogs } from "../../services/AdminService";
import { Link } from "react-router-dom";

const Report = () => {
  const inputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchId, setSearchId] = useState(""); // State for searching by Id
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(3);

  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const responseData = await viewPrintLogs(
        token,
        startDate || "2023-01-01",
        endDate || "2025-12-31",
        page,
        size
      );
      setData(responseData.result.content);
      setFilteredData(responseData.result.content);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate, page, size]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = data.filter(
      (item) =>
        item.printingLogId.toString().includes(value) ||
        item.adminPrintMail?.toLowerCase().includes(value) ||
        item.printerId.toString().includes(value) ||
        item.documentId?.toString().includes(value) ||
        item.fileName?.toLowerCase().includes(value) ||
        item.studentId.toString().includes(value) ||
        item.email?.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  const handleSearchById = (event) => {
    const value = event.target.value;
    setSearchId(value);
    const filtered = data.filter((item) =>
      item.printingLogId.toString().includes(value)
    );
    setFilteredData(filtered);
  };

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <section className="p-8">
      <div>
        <h2 className="font-medium text-3xl text-center">Printing Log</h2>
      </div>
      <hr className="my-5" />

      <div className="flex flex-col gap-4 mb-6 items-center">
        <div className="flex flex-wrap justify-center gap-4 mb-6 w-full">
          {/* Search by Term */}
          <div className="flex items-center border border-gray-300 rounded-lg w-full max-w-[280px] group">
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
          </div>

          {/* Search by ID */}
          <div className="flex items-center border border-gray-300 rounded-lg w-full max-w-[280px] group">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-l-lg border border-gray-300 group-focus-within:border-blue-400 transition-colors duration-200 ease-in-out cursor-pointer">
              <MdSearch className="w-5 h-5 text-gray-600" />
            </div>
            <input
              type="text"
              id="searchId"
              value={searchId}
              onChange={handleSearchById}
              placeholder="Search by Id..."
              className="px-4 py-2 w-full rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 w-full max-w-[800px] mt-10">
          <div className="flex flex-col">
            <label htmlFor="size" className="mb-2 text-sm text-black font-bold">
              Start Date:
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="size" className="mb-2 text-sm text-black font-bold">
              End Date:
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="size" className="mb-2 text-sm text-black font-bold">
              Page Number:
            </label>
            <input
              type="number"
              id="page"
              value={page}
              onChange={(e) => setPage(Number(e.target.value))}
              min="0"
              className="px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="size" className="mb-2 text-sm text-black font-bold">
              Rows per Page:
            </label>

            <input
              type="number"
              id="size"
              value={size}
              onChange={(e) => {
                const value = e.target.value;
                const newSize =
                  value === "" || isNaN(value) || Number(value) < 1
                    ? 3
                    : Number(value);
                setSize(newSize);
              }}
              min="1"
              className="px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="relative overflow-x-auto rounded-lg">
        {loading ? (
          <div className="text-center py-6">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-6">{error}</div>
        ) : (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="px-6 py-5 text-center font-bold">Id</th>
                <th className="px-6 py-5 text-center font-bold">Admin Email</th>
                <th className="px-6 py-5 text-center font-bold">Printer Id</th>
                <th className="px-6 py-5 text-center font-bold">Document Id</th>
                <th className="px-6 py-5 text-center font-bold">File Name</th>
                <th className="px-6 py-5 text-center font-bold">
                  Expired Time
                </th>
                <th className="px-6 py-5 text-center font-bold">Student Id</th>
                <th className="px-6 py-5 text-center font-bold">
                  Student Email
                </th>
                <th className="px-6 py-5 text-center font-bold">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr
                    key={item.printingLogId}
                    className="bg-white border-b-2 border-gray-300 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-center">
                      {item.printingLogId}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {item.adminPrintMail}
                    </td>
                    <td className="px-6 py-4 text-center">{item.printerId}</td>
                    <td className="px-6 py-4 text-center">{item.documentId}</td>
                    <td className="px-6 py-4 text-center">{item.fileName}</td>
                    <td className="px-6 py-4 text-center">
                      {item.expiredTime}
                    </td>
                    <td className="px-6 py-4 text-center">{item.studentId}</td>
                    <td className="px-6 py-4 text-center">{item.email}</td>
                    <td className="px-6 py-4 text-center">
                      <Link to={`/admin/rating/${item.printingLogId}`}>
                        Rating
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default Report;

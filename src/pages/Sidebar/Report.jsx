import React, { useState, useRef } from "react";
import { MdSearch, MdHistory, MdFilterList } from 'react-icons/md';

const initialData = [
    {
        id: 2212880,
        name: "Li Thuong Kiet",
        faculty: "CSE",
        used: "150",
        history: [
            { printerId: '10', fileName: 'Bài giảng 1.pdf', paperUsed: 26, copies: 1, time: '2024-12-03 01:59:17', status: 'Completed' },
            { printerId: '18', fileName: 'Slide.pdf', paperUsed: 2, copies: 1, time: '2024-1-03 2:00:15', status: 'Completed' },
            { printerId: '1', fileName: 'BTL.pdf', paperUsed: 1, copies: 5, time: '2024-2-5 2:00:15', status: 'Completed' },
            { printerId: '1', fileName: 'Báo cáo.pdf', paperUsed: 1, copies: 5, time: '2023-8-7 2:00:15', status: 'Completed' }
        ]
    },
    { id: 2212111, name: "Nguyen Ngoc Chau Phuc", faculty: "FME", used: "15", history: [] },
    {
        id: 2101212,
        name: "Nguyen Van Doan",
        faculty: "DEE",
        used: "50",
        history: [{ printerId: '1', fileName: 'Bài giảng chương 2.pdf', paperUsed: 30, copies: 1, time: '2023-10-20 10:30:00', status: 'Completed' }]
    }
];

const Report = () => {
    const inputRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState(initialData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedHistory, setSelectedHistory] = useState(null);
    const [historySearchTerm, setHistorySearchTerm] = useState("");
    const [startDate, setStartDate] = useState(""); // State for start date
    const [endDate, setEndDate] = useState(""); // State for end date
    const [showFilters, setShowFilters] = useState(false); // Toggle filter visibility

    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);

        const filtered = initialData.filter(item =>
            item.id.toString().includes(value) ||
            item.name.toLowerCase().includes(value) ||
            item.faculty.toLowerCase().includes(value) ||
            item.used.toString().includes(value)
        );
        setFilteredData(filtered);
    };

    const handleHistorySearch = (event) => {
        const value = event.target.value.toLowerCase();
        setHistorySearchTerm(value);
    };

    const handleIconClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleHistoryClick = (history) => {
        setSelectedHistory(history);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedHistory(null);
        setHistorySearchTerm("");
        setStartDate(""); // Clear start date
        setEndDate(""); // Clear end date
        setShowFilters(false); // Hide filters on close
    };

    // Filter history based on the search term and date range
    const filteredHistory = selectedHistory?.filter(historyItem => {
        const historyDate = new Date(historyItem.time);
        const isWithinDateRange = (!startDate || historyDate >= new Date(startDate)) &&
            (!endDate || historyDate <= new Date(endDate));

        return (
            (
                historyItem.fileName.toLowerCase().includes(historySearchTerm) ||
                historyItem.status.toLowerCase().includes(historySearchTerm) ||
                historyItem.time.toLowerCase().includes(historySearchTerm) ||
                historyItem.printerId.toLowerCase().includes(historySearchTerm) // Search by printer ID
            ) && isWithinDateRange
        );
    }) || [];

    return (
        <section className="p-8">
            <div>
                <h2 className="font-medium text-3xl text-center">Printing</h2>
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
                </div>
            </div>

            <div className="relative overflow-x-auto rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th scope="col" className="px-6 py-5 text-center font-bold">ID Student</th>
                            <th scope="col" className="px-6 py-5 text-center font-bold">Name</th>
                            <th scope="col" className="px-6 py-5 text-center font-bold">Faculty</th>
                            <th scope="col" className="px-6 py-5 text-center font-bold">Amount of paper used</th>
                            <th scope="col" className="px-6 py-5 text-center font-bold">History</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((item) => (
                                <tr key={item.id} className="bg-white border-b-2 border-gray-300 hover:bg-gray-50">
                                    <td className="px-6 py-4 text-center font-bold">{item.id}</td>
                                    <td className="px-6 py-4 capitalize font-bold">{item.name}</td>
                                    <td className="px-6 py-4 text-center font-bold">{item.faculty}</td>
                                    <td className="px-6 py-4 capitalize text-center font-bold">{item.used}</td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center items-center">
                                            <MdHistory
                                                className="w-5 h-5 text-blue-600 cursor-pointer"
                                                onClick={() => handleHistoryClick(item.history)}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4">No results found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>


            {isModalOpen && selectedHistory && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-lg" style={{ maxHeight: '90vh', marginTop: '30px' }}>
                        <h2 className="text-xl font-semibold mb-4 text-center">Transaction History</h2>

                        {/* Filter icon */}
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg">Filter by Date</h3>
                            <MdFilterList
                                className="w-6 h-6 text-blue-600 cursor-pointer"
                                onClick={() => setShowFilters(!showFilters)}
                            />
                        </div>

                        {/* Conditionally render date filter fields */}
                        {showFilters && (
                            <div className="flex mb-4">
                                <div className="mr-2">
                                    <label className="block text-sm font-medium mb-1">From:</label>
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="border border-gray-300 rounded-lg p-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">To:</label>
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className="border border-gray-300 rounded-lg p-2"
                                    />
                                </div>
                            </div>
                        )}

                        <div style={{ maxHeight: '55vh', overflowY: 'auto' }}>
                            <input
                                type="text"
                                value={historySearchTerm}
                                onChange={handleHistorySearch}
                                placeholder="Search history..."
                                className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
                            />
                            {filteredHistory.length > 0 ? (
                                <ul>
                                    {filteredHistory.map((historyItem, index) => (
                                        <li key={index} className="mb-2">
                                            <div className="bg-gray-100 p-2 rounded-lg border border-gray-300 shadow-md">
                
                                                <div className="flex">
                                                    <p className="font-semibold w-40">Printer ID:</p>
                                                    <p>{historyItem.printerId}</p>
                                                </div>
                                                <div className="flex">
                                                    <p className="font-semibold w-40">File Name:</p>
                                                    <p>{historyItem.fileName}</p>
                                                </div>
                                                <div className="flex">
                                                    <p className="font-semibold w-40">Paper Used:</p>
                                                    <p>{historyItem.paperUsed}</p>
                                                </div>
                                                <div className="flex">
                                                    <p className="font-semibold w-40">Copies:</p>
                                                    <p>{historyItem.copies}</p>
                                                </div>
                                                <div className="flex">
                                                    <p className="font-semibold w-40">Status:</p>
                                                    <p>{historyItem.status}</p>
                                                </div>
                                                <div className="flex">
                                                    <p className="font-semibold w-40">Time:</p>
                                                    <p>{historyItem.time}</p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No history found.</p>
                            )}
                        </div>

                        <button onClick={handleCloseModal} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Report;

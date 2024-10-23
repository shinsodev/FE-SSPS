import { NavLink } from "react-router-dom";

import React, { useState, useRef } from "react";
import { MdSearch, MdFilterList } from 'react-icons/md';

const initialData = [
    { id: 1, location: "Li Thuong Kiet", building: "A1", floor: 1, fileName: "Network layer", date: "Dec 20 2024", pages: 35, size: "A4", status: "Success" },
    { id: 2, location: "Di An", building: "B6", floor: 4, fileName: "Transport layer", date: "Nov 2 2024", pages: 30, size: "A3", status: "Success" },
    { id: 3, location: "Di An", building: "H1", floor: 6, fileName: "Database systerm", date: "Sepc 5 2024", pages: 35, size: "A2", status: "Fail" },
];

const Report = () => {
    const inputRef = useRef(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState(initialData);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);

        const filtered = initialData.filter(item =>
            item.id.toString().includes(value) ||
            item.location.toLowerCase().includes(value) ||
            item.building.toLowerCase().includes(value) ||
            item.fileName.toLowerCase().includes(value) ||
            item.date.toLowerCase().includes(value) ||
            item.pages.toString().includes(value) ||
            item.size.toLowerCase().includes(value) ||
            item.status.toLowerCase().includes(value)
        );

        setFilteredData(filtered);
    };

    const handleIconClick = () => {
        if (inputRef.current) {
            inputRef.current.focus(); // Focus the input when the icon is clicked
        }
    };

    const handleFilterClick = () => {
        setIsModalOpen(true); // Open the modal when the filter icon is clicked
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Close the modal
    };

    const handleApplyFilter = () => {
        // Add your filter application logic here
        console.log('Filter applied');
        handleCloseModal();
    };

    return (
        <section className="p-8">
            <div>
                <h2 className="font-medium text-3xl text-center">System Statistics</h2>
            </div>
            <hr className="my-5" />


            <div className="flex justify-center mb-6">
                <div className="flex items-center border border-gray-300 rounded-lg w-full max-w-[600px] group">
                    {/* Search Icon Container */}
                    <div
                        className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-l-lg border border-gray-300 group-focus-within:border-blue-400 transition-colors duration-200 ease-in-out cursor-pointer"
                        onClick={handleIconClick} // Focus input on search icon click
                    >
                        <MdSearch className="w-5 h-5 text-gray-600" />
                    </div>
                    {/* Search Input */}
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Search..."
                        ref={inputRef} // Attach the ref to the input
                        className="px-4 py-2 w-full rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-400" // Right rounded for seamless integration with the icons
                    />
                    {/* Filter Icon Container */}
                    <div
                        className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-r-lg border border-gray-300 transition-colors duration-200 ease-in-out cursor-pointer"
                        onClick={handleFilterClick} // Open modal on filter icon click
                    >
                        <MdFilterList className="w-5 h-5 text-gray-600" />
                    </div>
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white rounded-lg p-6 w-96">
                            <h2 className="text-lg font-semibold mb-4">Tìm kiếm trong khoảng thời gian</h2>
                            <div className="mb-4">
                                <label className="block mb-1">Ngày bắt đầu:</label>
                                <input
                                    type="date"
                                    className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Ngày kết thúc:</label>
                                <input
                                    type="date"
                                    className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                                />
                            </div>
                            <button
                                onClick={handleApplyFilter}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                            >
                                Áp dụng
                            </button>
                            <button
                                onClick={handleCloseModal}
                                className="mt-2 text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg" // Changed to red
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                )}
            </div>


            {/* list */}
            <div className="relative overflow-x-auto rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th scope="col" className="px-6 py-5 text-center">ID Printer</th>
                            <th scope="col" className="px-6 py-5 text-center">Location</th>
                            <th scope="col" className="px-6 py-5 text-center">Building</th>
                            <th scope="col" className="px-6 py-5 text-center">Floor</th>
                            <th scope="col" className="px-6 py-5 text-center">File Name</th>
                            <th scope="col" className="px-6 py-3 text-center">Date</th>
                            <th scope="col" className="px-6 py-3 text-center">Pages Number</th>
                            <th scope="col" className="px-6 py-3 text-center">Size</th>
                            <th scope="col" className="px-6 py-3 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((item) => (
                                <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 text-center">{item.id}</td>
                                    <td className="px-6 py-4 capitalize text-center">{item.location}</td>
                                    <td className="px-6 py-4 text-center">{item.building}</td>
                                    <td className="px-6 py-4 capitalize text-center">{item.floor}</td>
                                    <td className="px-6 py-4 capitalize text-center">{item.fileName}</td>
                                    <td className="px-6 py-4 text-center">{item.date}</td>
                                    <td className="px-6 py-4 text-center">{item.pages}</td>
                                    <td className="px-6 py-4 text-center">{item.size}</td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center">
                                            <div
                                                className={`h-2.5 w-2.5 rounded-full ${item.status === "Success" ? "bg-green-500" : "bg-red-500"} mr-2`}
                                            ></div>
                                            {item.status}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center py-4">No results found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default Report

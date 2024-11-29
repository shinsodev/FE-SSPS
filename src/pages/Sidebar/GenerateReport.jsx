
import React, { useState, useEffect } from "react";
import { generateUsageReports } from "../../services/AdminService";

const GenerateReport = () => {
    const [frequency, setFrequency] = useState("MONTHLY");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchMonth, setSearchMonth] = useState("");
    const [searchQuarter, setSearchQuarter] = useState("");

    // Gọi API khi component được mount hoặc khi frequency thay đổi
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem("token");
                const result = await generateUsageReports(token, frequency);

                if (result.code === 0) {
                    setData(result.result.items);
                } else {
                    setError("Invalid response code from API");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [frequency]); // Gọi lại mỗi khi frequency thay đổi

    // Lọc dữ liệu theo tháng và quý
    const filteredData = data?.filter((item) => {
        const matchesMonth =
            !searchMonth || item.month?.toString().includes(searchMonth);
        const matchesQuarter =
            !searchQuarter || item.quarter?.toString().includes(searchQuarter);
        return matchesMonth && matchesQuarter;
    });

    return (
        <section className="p-8">
            <div>
                <h2 className="font-medium text-3xl text-left">Generate Usage Report</h2>
            </div>
            <hr className="my-5" />
            {/* Hàng ngang chứa Dropdown và ô tìm kiếm */}
            <div className="min-h-screen">
                <div className="flex flex-wrap items-center gap-8 mb-4">
                    {/* Dropdown chọn tần suất */}
                    <div className="flex-1">
                        <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">
                            Select Frequency:
                        </label>
                        <select
                            id="frequency"
                            value={frequency}
                            onChange={(e) => setFrequency(e.target.value)}
                            className="block w-4/5 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="MONTHLY">MONTHLY</option>
                            <option value="QUARTERLY">QUARTERLY</option>
                            <option value="YEARLY">YEARLY</option>
                        </select>
                    </div>

                    {/* Tìm kiếm theo tháng */}
                    <div className="flex-1">
                        <label htmlFor="searchMonth" className="block text-sm font-medium text-gray-700 mb-1">
                            Search by Month:
                        </label>
                        <input
                            id="searchMonth"
                            type="text"
                            value={searchMonth}
                            onChange={(e) => setSearchMonth(e.target.value)}
                            placeholder="Enter month"
                            className="block w-4/5 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Tìm kiếm theo quý */}
                    <div className="flex-1">
                        <label htmlFor="searchQuarter" className="block text-sm font-medium text-gray-700 mb-1">
                            Search by Quarter:
                        </label>
                        <input
                            id="searchQuarter"
                            type="text"
                            value={searchQuarter}
                            onChange={(e) => setSearchQuarter(e.target.value)}
                            placeholder="Enter quarter"
                            className="block w-4/5 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* Hiển thị trạng thái */}
                {loading && <p className="text-blue-500">Loading data...</p>}
                {error && <p className="text-red-500">Error: {error}</p>}

                {/* Hiển thị bảng dữ liệu */}
                {filteredData && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse border border-gray-300">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-600">
                                        Year
                                    </th>
                                    <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-600">
                                        Month
                                    </th>
                                    <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-600">
                                        Quarter
                                    </th>
                                    <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-600">
                                        User Count
                                    </th>
                                    <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-600">
                                        Total Page Count
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item, index) => (
                                    <tr key={index} className="odd:bg-white even:bg-gray-50">
                                        <td className="border border-gray-300 px-4 py-2">{item.year}</td>
                                        <td className="border border-gray-300 px-4 py-2">{item.month || "N/A"}</td>
                                        <td className="border border-gray-300 px-4 py-2">{item.quarter || "N/A"}</td>
                                        <td className="border border-gray-300 px-4 py-2">{item.userCount}</td>
                                        <td className="border border-gray-300 px-4 py-2">{item.totalPageCount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    );
};

export default GenerateReport;

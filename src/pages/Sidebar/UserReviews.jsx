import React, { useState, useEffect } from "react";
import { getRatingByPrintingId, getAllRating, getRatingByStudentId } from "../../services/AdminService";

const UserReviews = () => {
    const [activeTab, setActiveTab] = useState("all"); // "all", "printingRequest", "student"
    const [ratings, setRatings] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(3);
    const [totalPages, setTotalPages] = useState(0);

    const fetchRatingByPrintingId = async (printingId) => {
        const token = localStorage.getItem("token");
        const response = await getRatingByPrintingId(token, printingId, page, size);
        setTotalPages(response.data.totalPages);
        setRatings(response.data.result);
    };

    const fetchAllRating = async () => {
        const token = localStorage.getItem("token");
        const response = await getAllRating(token, page, size);
        setTotalPages(response.data.totalPages);
        setRatings(response.data.result);
    };

    const fetchRatingByStudentId = async (studentId) => {
        const token = localStorage.getItem("token");
        const response = await getRatingByStudentId(token, studentId, page, size);
        setTotalPages(response.data.totalPages);
        setRatings(response.data.result);
    };

    // States for filtering
    const [printingRequestId, setPrintingRequestId] = useState("");
    const [studentId, setStudentId] = useState("");

    // Fetch ratings based on active tab
    useEffect(() => {
        setRatings([]);
        if (activeTab === "printingRequest" && printingRequestId) {
            fetchRatingByPrintingId(printingRequestId);
        } else if (activeTab === "student" && studentId) {
            fetchRatingByStudentId(studentId);
        } else {
            fetchAllRating();
        }
    }, [activeTab, page, size, printingRequestId, studentId]);

    // Handle pagination
    const handleNextPage = () => {
        if (page < totalPages - 1) setPage(page + 1);
    };

    const handlePreviousPage = () => {
        if (page > 0) setPage(page - 1);
    };

    // Render pagination
    const renderPagination = () => {
        const pages = [...Array(totalPages).keys()]; // Create array of page numbers [0, 1, 2, ...]

        return (
            <div className="flex items-center justify-center space-x-2 mt-6">
                {/* Previous Button */}
                <button
                    onClick={handlePreviousPage}
                    disabled={page === 0}
                    className={`px-4 py-2 rounded ${
                        page === 0 ? "bg-gray-200 text-gray-400" : "bg-blue-500 text-white"
                    }`}
                >
                    Previous
                </button>

                {/* Page Numbers */}
                {pages.map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => setPage(pageNumber)}
                        className={`px-4 py-2 rounded ${
                            pageNumber === page
                                ? "bg-blue-700 text-white"
                                : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                    >
                        {pageNumber + 1}
                    </button>
                ))}

                {/* Next Button */}
                <button
                    onClick={handleNextPage}
                    disabled={page === totalPages - 1}
                    className={`px-4 py-2 rounded ${
                        page === totalPages - 1
                            ? "bg-gray-200 text-gray-400"
                            : "bg-blue-500 text-white"
                    }`}
                >
                    Next
                </button>
            </div>
            
        );
    };

    // Render ratings list
    const renderRatings = () => {
        return ratings.map((rating) => (
            <div
                key={rating.id}
                className="bg-gray-200 p-8 shadow-md rounded-md flex items-center space-x-8 mb-6"
            >
                {/* Mã Sinh Viên */}
                <div className="flex-shrink-0">
                    <p className="font-semibold text-lg">Mã Sinh Viên:</p>
                    <p className="text-base">{rating.studentId}</p>
                </div>
    
                {/* Yêu cầu in */}
                <div className="flex-shrink-0">
                    <p className="font-semibold text-lg">Yêu cầu in:</p>
                    <p className="text-base">{rating.printingRequestId}</p>
                </div>
    
                {/* Bình luận */}
                <div className="flex-grow flex items-center">
                    <p className="font-semibold text-lg mr-2">Bình luận:</p>
                    <p className="text-base">{rating.comment || "Không có bình luận"}</p>
                </div>
    
                {/* Đánh giá */}
                <div className="flex items-center space-x-2">
                    <p className="font-semibold text-lg">Đánh giá:</p>
                    <div className="flex">
                        {[...Array(rating.rating)].map((_, index) => (
                            <span key={index} className="text-yellow-500 text-xl">⭐</span>
                        ))}
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold text-center mt-4 mb-4 pb-2 border-b border-gray-300">
                User reviews
            </h1>
            <div className="flex justify-center space-x-4 mt-9 mb-12">
                <button
                    className={`px-4 py-2 rounded ${
                        activeTab === "all"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-800"
                    }`}
                    onClick={() => {
                        setActiveTab("all");
                        setPage(0);
                    }}
                >
                    Tất cả Đánh giá
                </button>
                <button
                    className={`px-4 py-2 rounded ${
                        activeTab === "printingRequest"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-800"
                    }`}
                    onClick={() => {
                        setRatings([]);
                        setActiveTab("printingRequest");
                        setPage(0);
                    }}
                >
                    Theo Yêu cầu in
                </button>
                <button
                    className={`px-4 py-2 rounded ${
                        activeTab === "student"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-800"
                    }`}
                    onClick={() => {
                        setRatings([]);
                        setActiveTab("student");
                        setPage(0);
                    }}
                >
                    Theo Sinh viên
                </button>
            </div>

            {/* Filters */}
            {activeTab === "printingRequest" && (
                <div className="flex space-x-4 mb-6">
                    <input
                        type="text"
                        placeholder="Nhập mã yêu cầu in"
                        className="p-2 border border-gray-300 rounded flex-grow"
                        value={printingRequestId}
                        onChange={(e) => setPrintingRequestId(e.target.value)}
                    />
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={() => setPage(0)}
                    >
                        Tìm kiếm
                    </button>
                </div>
            )}
            {activeTab === "student" && (
                <div className="flex space-x-4 mb-6">
                    <input
                        type="text"
                        placeholder="Nhập mã sinh viên"
                        className="p-2 border border-gray-300 rounded flex-grow"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                    />
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={() => setPage(0)}
                    >
                        Tìm kiếm
                    </button>
                </div>
            )}

            {/* Rating List */}
            <div className="space-y-4">
                {ratings.length > 0 ? (
                    renderRatings()
                ) : (
                    <p className="text-center text-gray-500">Không có đánh giá nào.</p>
                )}
            </div>

            {/* Pagination */}
            <div>{renderPagination()}</div>
        </div>
    );
};

export default UserReviews;

import React, { useState, useEffect } from "react";
import { getRatingByPrintingLogId, getAllRating, getRatingByStudentId, deleteRatingAdmin, } from "../../services/AdminService";
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ReactPaginate from "react-paginate";
const Rating = () => {
    const [activeTab, setActiveTab] = useState("all"); // "all", "printingRequest", "student"
    const [ratings, setRatings] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(4);
    const [totalPages, setTotalPages] = useState(0);
    // States for filtering
    const [studentId, setStudentId] = useState("");
    const [printingLogId, setPrintingLogId] = useState("");

    const fetchRatingByPrintingLogId = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await getRatingByPrintingLogId(token, printingLogId, page, size);
            setTotalPages(response.data.totalPages);
            setRatings(response.data.result);
            console.log(response);

        } catch (error) {
            console.error("Error fetching ratings by printing ID:", error.message);
            // Handle error (display message, reset ratings, etc.)
            setRatings([]);
            setTotalPages(0);  // Reset total pages on error
        }
    };

    const fetchAllRating = async () => {
        try {
            console.log("page", page)
            const token = localStorage.getItem("token");
            const response = await getAllRating(token, page, size);

            setTotalPages(response.data.totalPages);
            setRatings(response.data.result);


        } catch (error) {
            console.error("Error fetching all ratings:", error.message);
            // Handle error (display message, reset ratings, etc.)
            setRatings([]);
            setTotalPages(0);  // Reset total pages on error
        }
    };

    const fetchRatingByStudentId = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await getRatingByStudentId(token, studentId, page, size);
            console.log(response)
            setTotalPages(response.data.totalPages);
            setRatings(response.data.result);


        } catch (error) {
            console.error("Error fetching ratings by student ID:");
            // Handle error (display message, reset ratings, etc.)
            setRatings([]);
            setTotalPages(0);  // Reset total pages on error
        }
    };





    const handleOnSearch = () => {
        if (activeTab === "printingRequest") {
            fetchRatingByPrintingLogId();
        }
        else {
            fetchRatingByStudentId();
        }
    }
    // const handlePreviousPage = () => {
    //     if (page > 0) setPage(page - 1);
    // };
    const handleAllRating = () => {
        setActiveTab("all") 
    }

    const handlePrintingRequestId = () => {
        setActiveTab("printingRequest")
        setPage(0);
        setTotalPages(0)
        setRatings([]);
        setPrintingLogId();
    }

    const handleStudentId = () => {
        setActiveTab("student")
        setPage(0);
        setTotalPages(0)
        setRatings([]);
setStudentId();
    }

    // Fetch ratings based on active tab
    useEffect(() => {

        if (activeTab === "printingRequest") {
            if (printingLogId) {
                fetchRatingByPrintingLogId();
            }

        } else if (activeTab === "student") {
            if (studentId) {
                fetchRatingByStudentId();
            }
        } else {
            fetchAllRating();
        }

    }, [activeTab, page, size]);

    // Handle pagination
    // const handleNextPage = () => {
    //     if (page < totalPages - 1) setPage(page + 1);
    // };
    const handlePageClick = (event) => {
        setPage(event.selected);
        console.log(event.selected);
    };



    // Render pagination
    // const renderPagination = () => {
    //     const generatePageNumbers = () => {
    //         const pageNumbers = [];
    //         const totalDisplayedPages = 5;

    //         if (totalPages <= totalDisplayedPages) {
    //             for (let i = 0; i < totalPages; i++) {
    //                 pageNumbers.push(i);
    //             }
    //         } else {
    //             if (page <= 2) {
    //                 for (let i = 0; i < totalDisplayedPages - 1; i++) {
    //                     pageNumbers.push(i);
    //                 }
    //                 pageNumbers.push("ellipsis");
    //                 pageNumbers.push(totalPages - 1);
    //             } else if (page >= totalPages - 3) {
    //                 pageNumbers.push(0);
    //                 pageNumbers.push("ellipsis");
    //                 for (let i = totalPages - (totalDisplayedPages - 1); i < totalPages; i++) {
    //                     pageNumbers.push(i);
    //                 }
    //             } else {
    //                 pageNumbers.push(0);
    //                 pageNumbers.push("ellipsis");
    //                 pageNumbers.push(page - 1);
    //                 pageNumbers.push(page);
    //                 pageNumbers.push(page + 1);
    //                 pageNumbers.push("ellipsis");
    //                 pageNumbers.push(totalPages - 1);
    //             }
    //         }

    //         return pageNumbers;
    //     };

    //     const pageNumbers = generatePageNumbers();

    //     return (
    //         <div className="flex items-center justify-center space-x-3 mt-8">
    //             {/* Previous Button */}
    //             <button
    //                 onClick={handlePreviousPage}
    //                 disabled={page === 0}
    //                 className={`text-lg px-4 py-2 ${page === 0
    //                     ? "text-gray-400 cursor-not-allowed"
    //                     : "text-black hover:text-blue-600"
    //                     }`}
    //             >
    //                 ← PREVIOUS
    //             </button>

    //             {/* Page Numbers */}
    //             {pageNumbers.map((pageNumber, index) =>
    //                 pageNumber === "ellipsis" ? (
    //                     <span
    //                         key={index}
    //                         className="text-lg text-gray-500 px-3"
    //                     >
    //                         ...
    //                     </span>
    //                 ) : (
    //                     <button
    //                         key={index}
    //                         onClick={() => setPage(pageNumber)}
    //                         className={`w-10 h-10 flex items-center justify-center rounded-lg text-lg font-medium ${pageNumber === page
    //                             ? "bg-black text-white"
    //                             : "bg-white text-black border border-gray-300 hover:bg-gray-100"
    //                             }`}
    //                     >
    //                         {pageNumber + 1}
    //                     </button>
    //                 )
    //             )}

    //             {/* Next Button */}
    //             <button
    //                 onClick={handleNextPage}
    //                 disabled={page === totalPages - 1}
    //                 className={`text-lg px-4 py-2 ${page === totalPages - 1
    //                     ? "text-gray-400 cursor-not-allowed"
    //                     : "text-black hover:text-blue-600"
    //                     }`}
    //             >
    //                 NEXT →
    //             </button>
    //         </div>
    //     );
    // };

    // delete rating
    const handleDeleteRating = async (idRating) => {
        try {
            await deleteRatingAdmin(idRating);
            if (activeTab === "all") {
                fetchAllRating();
            }
            // Nếu đang ở tab "printingRequest"
            else if (activeTab === "printingRequest") {
                fetchRatingByPrintingLogId();
            }
            // Nếu đang ở tab "student"
            else if (activeTab === "student") {
                fetchRatingByStudentId();
            }
            // handle fetch data again
            // fetch data again
            // setPage(1)
            // if(activeTab === "all") {
            //     await fetchAllRating();
            // } else if( activeTab === "printingRequest"){
            //     await fetchRatingByPrintingLogId()
            // } else if (activeTab === "student") {
            //     await fetchRatingByStudentId()
            // }
        } catch (err) {
            console.error(err.message)
        }
    }

    // Render ratings list
    const renderRatings = () => {
        return ratings.map((rating) => (
            <div
                key={rating.id}
                className="bg-gray-200 p-8 rounded-md shadow-md grid items-center mb-5"
                style={{
                    gridTemplateColumns: "3fr 1.5fr 1fr 2fr 2fr 1fr", // Tùy chỉnh khoảng cách
                    columnGap: "15px", // Khoảng cách giữa các cột
                }}
            >
                {/* Student Email */}
                <div className="flex items-center">
                    <span className="font-semibold text-sm">Student Email:</span>
                    <span className="text-sm ml-2">{rating.studentEmail}</span>
                </div>

                {/* Document ID */}
                <div className="flex items-center">
                    <span className="font-semibold text-sm">Document Id:</span>
                    <span className="text-sm ml-2">{rating.documentId}</span>
                </div>

                {/* Printing ID */}
                <div className="flex items-center">
                    <span className="font-semibold text-sm">Mã in:</span>
                    <span className="text-sm ml-2">{rating.printingLogId}</span>
                </div>

                {/* Bình luận */}
                <div className="flex items-center">
                    <span className="font-semibold text-sm flex-shrink-0 whitespace-nowrap">Bình luận:</span>
                    <span
                        className="text-sm ml-2"
                        title={rating.comment} // Hiển thị đầy đủ comment khi hover
                    >
                        {rating.comment?.length > 15
                            ? `${rating.comment.substring(0, 15)}...` // Cắt chuỗi và thêm dấu "..."
                            : rating.comment || "Không có bình luận"}
                    </span>
                </div>




                {/* Đánh giá */}
                {/* Đánh giá */}
                <div className="flex items-center">
                    <span className="font-semibold text-sm">Đánh giá:</span>
                    <div className="flex ml-2">
                        {Array.from({ length: 5 }, (_, index) => {
                            if (index + 1 <= Math.floor(rating.rating)) {
                                return <span key={index} className="text-yellow-500 text-lg">★</span>;
                            } else if (index < rating.rating) {
                                return (
                                    <span key={index} className="text-yellow-500 text-lg relative">
                                        ★
                                        <span
                                            className="absolute left-0 top-0 text-gray-300"
                                            style={{
                                                clipPath: "polygon(0 0, 50% 0, 50% 100%, 0% 100%)",
                                                display: "inline-block",
                                            }}
                                        >
                                            ★
                                        </span>
                                    </span>
                                );
                            } else {
                                return <span key={index} className="text-gray-300 text-lg">★</span>;
                            }
                        })}
                    </div>
                </div>
                <div className="flex items-center">
                    <Button color="error" startIcon={<DeleteIcon />} onClick={() => handleDeleteRating(rating.id)}>DELETE</Button>
                </div>


            </div>
        ));
    };




    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold text-center mt-4 mb-4 pb-2 border-b border-gray-300">
                Rating
            </h1>
            <div className="flex justify-center space-x-4 mt-9 mb-12">
                <button
                    className={`px-4 py-2 rounded ${activeTab === "all"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-800"
                        }`}
                    onClick={handleAllRating}
                >
                    Tất cả Đánh giá
                </button>
                <button
                    className={`px-4 py-2 rounded ${activeTab === "printingRequest"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-800"
                        }`}
                    onClick={handlePrintingRequestId}
                >
                    Theo Yêu cầu in
                </button>
                <button
                    className={`px-4 py-2 rounded ${activeTab === "student"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-800"
                        }`}
                    onClick={handleStudentId}
                >
                    Theo Mã Sinh Viên
                </button>
            </div>

            {/* Filters */}
            {activeTab === "printingRequest" && (
                <div className="flex space-x-4 mb-6">
                    <input
                        type="text"
                        placeholder="Nhập mã yêu cầu in"
                        className="p-2 border border-gray-300 rounded flex-grow max-w-[300px] w-full"
                        value={printingLogId}
                        onChange={(e) => setPrintingLogId(e.target.value)}
                    />
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={handleOnSearch}

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
                        className="p-2 border border-gray-300 rounded flex-grow max-w-[300px] w-full"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                    />
                    <button
                        className=" bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={handleOnSearch}
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
            {/* <div>{renderPagination()}</div> */}
            <ReactPaginate
                breakLabel="..."
                nextLabel="NEXT →"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
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

    );
};

export default Rating;
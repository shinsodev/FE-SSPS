import { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import { Link } from "react-router-dom";

const AdminPrinterList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [size, setSize] = useState(3);
  const [totalPages, setTotalPages] = useState(1);

  const handleSetTotalPage = (totalPages) => {
    setTotalPages(totalPages);
  }
  const handlePageChange = (pageNumber) => {
    
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      console.log(pageNumber);
      setCurrentPage(pageNumber);
    }
  };


  return (
    <>
      <section className="p-8 flex flex-col justify-between min-h-screen">
        <div>
          <h2 className="font-medium text-3xl">User Lists</h2>
          <hr className="my-5" />
          <div className="flex items-center justify-end">
            <Link
              to="/admin/addprinter"
              className="px-6 py-3 bg-blue-500 text-white font-medium text-[17px] rounded-lg hover:bg-blue-600 transition-all mb-4"
            >
              Add printer
            </Link>
          </div>
          {/* Bảng hiển thị */}
          <Table currentPage={currentPage} size={size} getTotalPages={handleSetTotalPage} />
        </div>

        {/* Thanh phân trang */}
        <div className="flex justify-center items-center mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className={`px-4 py-2 mx-1 rounded-lg ${
              currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 mx-1 rounded-lg ${
                currentPage === page ? "bg-blue-600 text-white" : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className={`px-4 py-2 mx-1 rounded-lg ${
              currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </section>
    </>
  );
};

export default AdminPrinterList;




// // import { Title } from "../../router";
// import Table from "../../components/Table/Table";
// import { Link } from "react-router-dom";

// const AdminPrinterList = () => {
//   return (
//     <>
//       <section className="p-8">
//         <div>
//           <h2 className="font-medium text-3xl">User Lists</h2>
//         </div>
//         <hr className="my-5" />
//         <div className="flex items-center justify-end">
//           <Link
//             to="/admin/addprinter"
//             className="px-6 py-3 bg-blue-500 text-white font-medium text-[17px] rounded-lg hover:bg-blue-600 transition-all mb-4"
//           >
//             Add printer
//           </Link>
//         </div>
//         <Table />
//       </section>
//     </>
//   );
// };

// export default AdminPrinterList;

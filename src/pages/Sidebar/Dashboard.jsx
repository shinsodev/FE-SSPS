import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import admin from "../../assets/img/admin.webp"
const data = [
  { name: '09/2023', số_lượt_đăng_nhập: 10 },
  { name: '10/2023', số_lượt_đăng_nhập: 20 },
  { name: '11/2023', số_lượt_đăng_nhập: 100 },
  { name: '12/2023', số_lượt_đăng_nhập: 11 },
  { name: '1/2024', số_lượt_đăng_nhập: 15 },
  { name: '2/2024', số_lượt_đăng_nhập: 40 },
  { name: '3/2024', số_lượt_đăng_nhập: 50 },
  { name: '4/2024', số_lượt_đăng_nhập: 17 }
];

export const Dashboard = () => {
  const role = "admin";
  return (
    <div className="min-h-screen bg-gray-100 p-8 lg:rounded-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-1 ">

          <div className="w-full lg:w-100 rounded-lg shadow-lg overflow-hidden">
            
            <div className="p-4 bg-slate-500">
              <h2 className="text-xl font-semibold mb-2 text-white text-center">Thông tin sinh viên</h2>
            </div>

            <div className="p-4 bg-white">
              <p className="text-black">
                <span className="font-bold">Họ tên:</span> Trần Hải Đăng
              </p>
              <p className="text-black">
                <span className="font-bold">MSSV:</span> 2211666
              </p>
              <p className="text-black">
                <span className="font-bold">Khoa:</span> KH&KT Máy tính
              </p>
              <p className="text-black">
                <span className="font-bold">Lớp:</span> MT22KH06
              </p>
              <p className="text-black">
                <span className="font-bold">Số trang còn lại:</span> 15
              </p>
              <p className="text-black">
                <span className="font-bold">Số dư BK Pay:</span> 12,000 VND
              </p>

              <button className="mt-4 bg-blue-500 hover:opacity-60 transition-all text-white px-4 py-2 rounded-lg">
                Mua thêm giấy
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg">
            <div className="p-4 rounded-lg shadow-md w-full lg:w-100 mt-4 border border-gray-300">
              <h2 className="text-sm font-bold">LƯỢT ĐĂNG NHẬP GẦN NHẤT</h2>
              <p className="text-sm text-gray-600 mt-1">2024/10/16 19:57:20</p>
              <p><span className="text-sm text-gray-600 mt-1 font-bold">Tổng lượt đăng nhập:</span> 154</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg max-h-[420px] overflow-y-auto">

            <div className="sticky top-0 bg-slate-500 mb-4 p-5 z-10 shadow-md rounded-t-lg">
              <h2 className="text-xl font-bold text-white text-center">Thông Báo chung</h2>
            </div>

            <div className="px-4 bg-white pt-4">
              <div className="bg-white p-4 rounded-lg mb-4 shadow-lg border border-gray-300">
                <div className="flex items-center">
                  <div className="mr-4">
                    <img src={admin} alt="avatar" className="w-12 h-12 rounded-full" />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold">Admin</h2>
                    <p className="text-sm text-gray-500">5:35:55 PM 4/15/2024</p>
                  </div>
                </div>
                {/* <hr className="border-t-1 border-gray-400 my-1" /> */}

                <div className="mt-4">
                  <h3 className="text-base font-semibold">Thông báo nghỉ lễ ngày 30/4 1/5</h3>
                  <p className="text-gray-600 mt-2 break-words">
                    BQL xin thông báo tất cả cán bộ y tế được nghỉ lễ 5 ngày từ 20/04/2024 - 25/04/2024
                    
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg mb-4 shadow-lg border border-gray-300">
                <div className="flex items-center">
                  <div className="mr-4">
                    <img src={admin} alt="avatar" className="w-12 h-12 rounded-full" />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold">Admin</h2>
                    <p className="text-sm text-gray-500">5:35:55 PM 4/15/2024</p>
                  </div>
                </div>
                {/* <hr className="border-t-4 border-gray-400 my-1" /> */}
                <div className="mt-4">
                  <h3 className="text-base font-semibold">Thông báo nghỉ lễ ngày 30/4 1/5</h3>
                  <p className="text-gray-600 mt-2 break-words">
                    BQL xin thông báo tất cả cán bộ y tế được nghỉ lễ 5 ngày từ 20/04/2024 - 25/04/2024
                    hiều 23/10, theo giờ địa phương, nhân chuyến công tác tham dự Hội nghị các Nhà lãnh đạo Nhóm BRICS mở rộng năm 2024 tại Liên bang Nga, Thủ tướng Chính phủ Phạm Minh Chính đã tiếp Bộ trưởng Năng lượng Liên bang Nga Sergey Tsiviliev.

                    Tại cuộc tiếp, Thủ tướng Chính phủ Phạm Minh Chính khẳng định Việt Nam luôn coi trọng quan hệ hữu nghị, truyền thống, Đối tác chiến lược toàn diện với Nga và mong muốn củng cố, làm sâu sắc hơn hợp tác với Nga trong các lĩnh vực vì lợi ích của nhân dân hai nước.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="flex justify-center">
        <div className="mt-16 w-[90%] grid grid-cols-1 gap-8">

          <div className="w-full">
            <h2 className="text-xl font-semibold mb-5">Thống kê sử dụng</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
              
                <Bar dataKey="số_lượt_đăng_nhập" fill="rgba(75, 192, 192, 0.8)" /> 
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </div>
  );
};

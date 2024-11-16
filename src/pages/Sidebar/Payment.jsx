import React, { useState, useContext, useEffect } from 'react';
import { buyPaper } from '../../services/UserService'; // Import hàm buyPaper từ UserService.js
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
const Payment = () => {
    const [pages, setPages] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [message, setMessage] = useState('');
    const [historyVisible, setHistoryVisible] = useState(false);
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [remainingPages, setRemainingPages] = useState(0);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const {user, fetchStudentData} = useContext(AuthContext);

    // Hàm xử lý thanh toán

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetchStudentData(token)
      }, []);

    const handlePurchase = () => {
        if (!pages || !paymentMethod) {
            setMessage('Vui lòng nhập số trang và chọn phương thức thanh toán.');
        } else {
            setIsConfirmModalOpen(true); // Hiển thị modal xác nhận
        }
    };

    // Hàm xác nhận thanh toán, gọi API từ UserService.js
    const confirmPayment = async (pages) => {
        try {
            setMessage('');

            // Gửi yêu cầu đến API thông qua buyPaper
            const token = localStorage.getItem("token"); 
            const page = pages*1000;
            const response = await buyPaper(token, page);
            //  console.log(response)
            if (response.status === 200) {
                fetchStudentData(token);
              } else {
                console.log("Failed to fetch userList",response.status);
              }

            // Reset form và hiển thị modal thành công
            setPages(0);
            setPaymentMethod('');
            setIsConfirmModalOpen(false);
            setIsSuccessModalOpen(true);
            
        } catch (error) {
            console.error('Lỗi khi thanh toán:', error);
            setMessage('Đã xảy ra lỗi khi thực hiện thanh toán. Vui lòng thử lại sau.');
            setIsConfirmModalOpen(false);
        }

        
    };

    const closeSuccessModal = () => {
        setIsSuccessModalOpen(false);
    };

    return (
        <div className="max-w-3xl mx-auto border-2 border-gray-300 rounded-lg p-8 mt-10 bg-gray-50">
            <h2 className="text-center text-2xl font-semibold mb-6">Mua thêm trang in</h2>

            {/* Chọn số trang */}
            <div className="border-2 border-gray-400 p-6 mb-6">
                <label className="block mb-4 font-semibold text-lg">Chọn số trang</label>
                <div className="flex items-center justify-between mb-6">
                    <input
                        type="number"
                        value={pages}
                        onChange={(e) => setPages(e.target.value)}
                        className="border border-gray-300 p-3 w-full mr-4 text-lg"
                        placeholder="Nhập số trang"
                    />
                    <span className="text-gray-700 text-lg">1000đ/trang</span>
                </div>

                {/* Phương thức thanh toán */}
                <label className="block mb-4 font-semibold text-lg">Phương thức thanh toán</label>
                <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="border border-gray-300 p-3 w-full mb-6 text-lg"
                >
                    <option value="">Tài khoản thanh toán</option>
                    <option value="visa">Visa</option>
                    <option value="momo">Momo</option>
                    <option value="BK Pay">BK Pay</option>
                </select>

                {/* Tổng số tiền thanh toán */}
                <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-700 text-lg">Tổng số tiền thanh toán :</span>
                    <span className="font-semibold text-lg">{pages ? pages * 1000 : 0}đ</span>
                </div>

                {/* Nút Thanh toán */}
                <div className="flex justify-end gap-4">
                    <button
                        onClick={handlePurchase}
                        className="bg-green-300 px-6 py-3 rounded-md text-lg hover:bg-green-400 transition-all transform hover:scale-105"
                    >
                        Thanh toán
                    </button>
                </div>
            </div>

            {/* Hiển thị thông báo thanh toán */}
            {message && (
                <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md">
                    {message}
                </div>
            )}

            {/* Nút hiển thị lịch sử giao dịch */}
            <div className="flex justify-between items-center mt-6">
                <p className="text-lg">Số trang còn lại : <span className="font-semibold">{user?.numOfPages}</span></p>
                <button
                    onClick={() => setHistoryVisible(!historyVisible)}
                    className="bg-blue-200 px-4 py-2 rounded-md text-lg text-blue-600 hover:bg-blue-300 transition-all"
                >
                    Lịch sử giao dịch
                </button>
            </div>

            {/* Bảng lịch sử giao dịch */}
            {historyVisible && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-4">Lịch sử giao dịch</h3>
                     <table className="min-w-full bg-white border">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border">STT</th>
                                <th className="px-4 py-2 border">Số lượng trang mua</th>
                                <th className="px-4 py-2 border">Ngày mua</th>
                                <th className="px-4 py-2 border">Đơn giá (đ/trang)</th>
                                <th className="px-4 py-2 border">Tổng số tiền</th>
                                <th className="px-4 py-2 border">Thanh toán bằng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paymentHistory.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center p-4">Chưa có giao dịch nào</td>
                                </tr>
                            ) : (
                                paymentHistory.map((payment, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-2 border text-center">{index + 1}</td>
                                        <td className="px-4 py-2 border text-center">{payment.pagesBought}</td>
                                        <td className="px-4 py-2 border text-center">{payment.purchaseDate}</td>
                                        <td className="px-4 py-2 border text-center">{payment.unitPrice}đ</td>
                                        <td className="px-4 py-2 border text-center">{payment.totalAmount}đ</td>
                                        <td className="px-4 py-2 border text-center">{payment.paymentMethod}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table> 
                </div>
            )}

            {/* Modal xác nhận thanh toán */}
            {isConfirmModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full">
                        <h2 className="text-xl font-semibold mb-4">Xác nhận thanh toán</h2>
                        <p>Bạn có chắc chắn muốn thanh toán {pages} trang với tổng số tiền {pages * 1000}đ không?</p>
                        <div className="flex justify-end gap-4 mt-6">
                            <button
                                onClick={() => confirmPayment(pages)}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Xác nhận
                            </button>
                            <button
                                onClick={() => setIsConfirmModalOpen(false)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal thông báo thành công */}
            {isSuccessModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full text-center">
                        <h2 className="text-xl font-semibold mb-4">Thanh toán thành công!</h2>
                        <p>Bạn đã thanh toán thành công.</p>
                        <button
                            onClick={closeSuccessModal}
                            className="bg-green-500 text-white px-4 py-2 mt-6 rounded hover:bg-green-600"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Payment;

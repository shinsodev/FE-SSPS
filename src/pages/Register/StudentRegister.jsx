import { useState } from "react";
import { Link } from "react-router-dom";
import RegisterImg from "../../assets/img/login1.jpg"; // Đổi hình ảnh nếu cần
import { toast } from "react-toastify";
import { apiUserRegister } from "../../services/UserService"; // Hàm đăng ký cho sinh viên
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Import icon mắt

const StudentRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [studentID, setStudentID] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Kiểm tra xem mật khẩu và xác nhận mật khẩu có khớp không
    if (password !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      // Gọi API đăng ký
      let res = await apiUserRegister(email, password, fullName, studentID);
      if (res.ok) {
        toast.success("Đăng ký thành công!");
      } else {
        toast.error("Đăng ký thất bại, vui lòng thử lại.");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau.");
    }
  };

  return (
    <section className="flex items-center justify-center bg-blue-200 h-screen relative">
      <div className="bg-white flex rounded-2xl shadow-2xl max-w-[900px] max-h-[600px] items-center justify-center">
        {/* Hình ảnh chỉ hiển thị trên màn hình trung bình và lớn hơn */}
        <div className="hidden md:block h-[450px] w-[400px] overflow-hidden ml-10 rounded-2xl">
          <img
            src={RegisterImg}
            alt="Register Background"
            className="h-[500px] w-full object-cover rounded-2xl"
          />
        </div>

        <div className="w-[380px] px-10">
          <h2 className="font-bold text-4xl text-primary text-center my-10">
            Đăng Ký Sinh Viên
          </h2>

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <input
              className="p-2 rounded-xl border bg-gray-200"
              type="text"
              placeholder="Họ và tên"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <input
              className="p-2 rounded-xl border bg-gray-200"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="p-2 rounded-xl border bg-gray-200"
              type="text"
              placeholder="Mã số sinh viên"
              value={studentID}
              onChange={(e) => setStudentID(e.target.value)}
              required
            />
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full bg-gray-200"
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                className="absolute right-2 top-[10px] cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiFillEye size={20} />
                ) : (
                  <AiFillEyeInvisible size={20} />
                )}
              </div>
            </div>
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full bg-gray-200"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Xác nhận mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <div
                className="absolute right-2 top-[10px] cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <AiFillEye size={20} />
                ) : (
                  <AiFillEyeInvisible size={20} />
                )}
              </div>
            </div>
            <button className="bg-blue-500 rounded-xl text-white py-2 hover:opacity-60 transition-all">
              Đăng Ký
            </button>
          </form>

          <div className="mt-3 text-xs flex justify-between items-center mb-10">
            <div>{"Bạn đã có tài khoản?"}</div>
            <Link
              to="/login"
              className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300 border-gray-400"
            >
              Đăng Nhập
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentRegister;

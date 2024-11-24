import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import RegisterImg from "../../assets/img/login3.jpg"; // Đổi hình ảnh nếu cần
import LogoHCMUT from "../../assets/img/logo.png";
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
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Kiểm tra điều kiện cho studentID và password
    if (!/^\d{7}$/.test(studentID)) {
      toast.error("Mã số sinh viên phải có đúng 7 số.");
      return;
    }

    if (password.length < 8) {
      toast.error("Mật khẩu phải có ít nhất 8 ký tự.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      // Gọi API đăng ký
      const response = await apiUserRegister(
        email,
        password,
        fullName,
        studentID
      );

      if (response.status === 200) {
        navigate("/login");
        toast.success("Đăng ký thành công!");
      } else {
        toast.error("Đăng ký thất bại, vui lòng thử lại.");
      }
    } catch (error) {
      toast.error("Đăng ký thất bại, vui lòng kiểm tra lại thông tin.");
    }
  };

  return (
    <section className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200">
      <div className="bg-white flex rounded-2xl shadow-2xl max-w-[900px] max-h-[600px] items-center justify-center">
        <div className="hidden md:block w-[500px] h-[500px] relative rounded-3xl overflow-hidden">
          {/* Nội dung */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
            {/* Logo */}
            <img
              src={LogoHCMUT}
              alt="HCMUT Logo"
              className="w-80 drop-shadow-2xl mb-4"
            />

            {/* Tiêu đề */}
            <p className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 leading-tight">
              Student Smart Printing Service
            </p>
          </div>
        </div>

        <div className="w-[380px] px-10">
          <h2 className="font-extrabold text-4xl text-blue-600 text-center my-10">
            Đăng Ký Sinh Viên
          </h2>

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <input
              className="p-4 rounded-full border bg-gray-100 focus:ring-2 focus:ring-blue-400 w-full"
              type="text"
              placeholder="Họ và tên"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <input
              className="p-4 rounded-full border bg-gray-100 focus:ring-2 focus:ring-blue-400 w-full"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="p-4 rounded-full border bg-gray-100 focus:ring-2 focus:ring-blue-400 w-full"
              type="text"
              placeholder="Mã số sinh viên"
              value={studentID}
              onChange={(e) => setStudentID(e.target.value)}
              required
            />
            <div className="relative">
              <input
                className="p-4 rounded-full border bg-gray-100 focus:ring-2 focus:ring-blue-400 w-full"
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
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
                className="p-4 rounded-full border bg-gray-100 focus:ring-2 focus:ring-blue-400 w-full"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Xác nhận mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <div
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <AiFillEye size={20} />
                ) : (
                  <AiFillEyeInvisible size={20} />
                )}
              </div>
            </div>
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-full font-bold text-lg hover:opacity-90 transition-all">
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

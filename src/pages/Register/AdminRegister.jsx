import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import RegisterImg from "../../assets/img/login4.jpg"; // Đổi hình ảnh nếu cần
import { toast } from "react-toastify";
import { apiAdminRegister } from "../../services/AdminService"; // Hàm đăng ký cho quản trị viên
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Import icon mắt

const AdminRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Kiểm tra điều kiện cho password
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
      const response = await apiAdminRegister(email, password, fullName);

      if (response.status === 200) {
        navigate("/login");
        toast.success("Đăng ký quản trị viên thành công!");
      } else {
        toast.error("Đăng ký thất bại, vui lòng thử lại.");
      }
    } catch (error) {
      toast.error("Đăng ký thất bại, vui lòng kiểm tra lại thông tin.");
    }
  };

  return (
    <section className="flex items-center justify-center bg-blue-200 h-screen relative">
      <div className="bg-white flex rounded-2xl shadow-2xl max-w-[900px] max-h-[600px] items-center justify-center">
        <div className="hidden md:block h-[450px] w-[500px] overflow-hidden ml-4 rounded-2xl">
          <img
            src={RegisterImg}
            alt="Register Background"
            className="h-full w-full object-cover rounded-2xl"
          />
        </div>

        <div className="w-[380px] px-10">
          <h2 className="font-bold text-4xl text-primary text-center my-10">
            Đăng Ký Quản Lý
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

export default AdminRegister;

import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/img/login5.jpg";
import LogoHCMUT from "../../assets/img/logo.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { AuthContext } from "../../context/AuthContext";
import { apiLogin } from "../../services/UserService";
import { toast } from "react-toastify";
import ModalConfirmBasic from "../../components/ModalConfirmBasic/ModalConfirmBasic"; // Import ModalConfirmBasic

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false); // State cho modal
  const navigate = useNavigate();
  const { fetchStudentData, fetchAdminData, getRoleFromToken } =
    useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await apiLogin(email, password);

      if (response.status === 200) {
        const data = response.data.result;
        localStorage.setItem("token", data.token);
        const role = getRoleFromToken(data.token);

        if (role === "ROLE_STUDENT") {
          await fetchStudentData(data.token);
        } else if (role === "ROLE_ADMIN") {
          await fetchAdminData(data.token);
        }

        toast.success("Đăng nhập thành công!");
        navigate("/dashboard");
      } else {
        toast.error("Đăng nhập thất bại.");
      }
    } catch (error) {
      toast.error("Đăng nhập thất bại. Vui lòng kiểm tra email và mật khẩu.");
    }
  };

  const handleRegisterClick = () => {
    setModalOpen(true); // Mở modal khi nhấn vào Đăng Ký
  };

  const handleModalConfirmBasic = (role) => {
    setModalOpen(false);
    navigate(`/register/${role}`); // Điều hướng đến trang đăng ký tương ứng
  };

  return (
    <section className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200">
      <div className="bg-white flex rounded-3xl shadow-2xl max-w-[900px] max-h-[600px] items-center overflow-hidden">
        <div className="w-[400px] p-10">
          <h2 className="font-extrabold text-5xl text-blue-600 text-center my-10">
            Đăng Nhập
          </h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div className="relative">
              <input
                className="p-4 rounded-full border bg-gray-100 focus:ring-2 focus:ring-blue-400 w-full"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
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
                  <AiFillEye size={24} />
                ) : (
                  <AiFillEyeInvisible size={24} />
                )}
              </div>
            </div>
            <Link to="/" className="text-sm text-blue-500 hover:underline">
              Quên mật khẩu?
            </Link>
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-full font-bold text-lg hover:opacity-90 transition-all">
              Đăng Nhập
            </button>
          </form>
          <div className="mt-6 text-sm flex justify-between items-center">
            <span>Bạn chưa có tài khoản?</span>
            <button
              onClick={handleRegisterClick}
              className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300 border-gray-400"
            >
              Đăng Ký
            </button>
          </div>
        </div>

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
      </div>

      {/* Modal xác nhận đăng ký */}
      <ModalConfirmBasic
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Xác Nhận Đăng Ký"
        message="Bạn muốn đăng ký dưới vai trò nào?"
        onConfirm={(role) => handleModalConfirmBasic(role)}
      />
    </section>
  );
};

export default Login;

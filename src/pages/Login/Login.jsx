import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/img/login5.jpg";
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
    <section className="flex items-center justify-center bg-blue-200 h-screen relative">
      <div className="bg-white flex rounded-2xl shadow-2xl max-w-[900px] max-h-[500px] items-center justify-center">
        <div className="w-[380px] px-10">
          <h2 className="font-bold text-4xl text-primary text-center my-10">
            Đăng Nhập
          </h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              className="p-2 rounded-xl border bg-gray-200"
              type="text"
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

            <Link to="/" className="text-xs text-gray-500">
              <div className="hover:underline">Quên mật khẩu?</div>
            </Link>

            <button className="bg-blue-500 rounded-xl text-white py-2 hover:opacity-60 transition-all">
              Đăng Nhập
            </button>
          </form>

          <div className="mt-3 text-xs flex justify-between items-center mb-10">
            <div>{"Bạn chưa có tài khoản?"}</div>
            <button
              onClick={handleRegisterClick} // Mở modal khi nhấn vào Đăng Ký
              className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300 border-gray-400"
            >
              Đăng Ký
            </button>
          </div>
        </div>

        {/* Image only visible on medium screens and larger */}
        <div className="hidden md:block h-[400px] w-[400px] overflow-hidden">
          <img
            src={Logo}
            alt=""
            className="h-full w-full object-cover rounded-r-2xl"
          />
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

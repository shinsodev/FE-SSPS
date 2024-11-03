import { useState } from "react";
import { toast } from "react-toastify";
import { apiUserRegister } from "../../services/UserService";

const AdminRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await apiUserRegister(email, password, fullName);
      if (res.status === 201) {
        toast.success("Đăng ký quản trị viên thành công!");
      }
    } catch (error) {
      toast.error("Đăng ký thất bại, vui lòng thử lại sau.");
    }
  };

  return (
    <section className="register-section">
      <h2>Admin Registration</h2>
      <form onSubmit={handleRegister}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </section>
  );
};

export default AdminRegister;

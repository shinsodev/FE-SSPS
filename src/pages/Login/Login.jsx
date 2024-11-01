import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginImg from "../../assets/img/login.jpg";
import LoginImg1 from "../../assets/img/login1.jpg";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // Toggle for admin login
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginUrl = isAdmin
      ? 'http://localhost:8080/auth/admin/login'
      : 'http://localhost:8080/auth/login';

    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        setError('Login failed. Please check your username and password.');
      }
    } catch (error) {
      setError('Failed to login');
      console.error('Error:', error);
    }
  };

  return (
    <section className="bg-blue-200 flex items-center justify-center h-screen">
      <div
        className={`bg-white flex rounded-2xl shadow-2xl max-w-[900px] max-h-[500px] lg:h-[400px] lg:w-[800px] items-center overflow-hidden transition-transform duration-700`}
      >
        {/* Form Section */}
        <div className={`md:w-1/2 px-10 transition-all duration-700 ${isAdmin ? 'order-2' : ''}`}>
          <h2 className="font-bold text-4xl text-primary h2 text-center mb-10 pt-10 lg:pt-0">
            {isAdmin ? 'Admin Login' : 'Student Login'}
          </h2>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              className="p-2 rounded-xl border bg-gray-200"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full bg-gray-200"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="bg-blue-500 rounded-xl text-white py-2 hover:scale-105 duration-300">
              Login
            </button>
          </form>

          <div className="text-xs py-4 text-gray-500 hover:underline">
            <Link to="/">Forgot your password?</Link>
          </div>
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className="text-xs text-blue-500 underline mt-2"
          >
            {isAdmin ? 'Switch to Student Login' : 'Switch to Admin Login'}
          </button>
        </div>

        {/* Image Section */}
        <div
          className={`md:w-1/2 hidden md:block overflow-hidden transition-transform duration-700 ${
            isAdmin ? 'transform -translate-x-0' : ''
          }`}
        >
          <img
            className="rounded-2xl object-cover w-full h-full"
            src={isAdmin ? LoginImg1 : LoginImg}
            alt="Login Background"
          />
        </div>
      </div>
    </section>
  );
};

export default Login;

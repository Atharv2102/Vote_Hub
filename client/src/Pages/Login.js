import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem('rememberedEmail');
    const storedPass = localStorage.getItem('rememberedPass');
    if (storedEmail) {
      setEmail(storedEmail);
      setPassword(storedPass);
    }
  }, []);

  async function loginUser(ev) {
    ev.preventDefault();

    try {
      const { data } = await axios.post('http://localhost:5002/api/auth/login', { email, password }, { withCredentials: true });

      alert('Login success');

      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
        localStorage.setItem('rememberedPass', password);
      } else {
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberedPass');
      }

      setRedirect(true);
    } catch (e) {
      console.error('Login failed:', e.response ? e.response.data : e.message);
      alert('Login failed');
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex w-full h-full px-10 py-10 justify-center mt-20 bg-gray-100">
      <div className="bg-white w-full sm:w-full md:w-1/2 lg:w-1/3 px-7 py-7 rounded-xl shadow-lg">
        <form className="flex flex-col w-auto items-center" onSubmit={loginUser}>
          <h1 className="font-extrabold mb-5 text-gray-800 text-2xl">Sign In</h1>

          <div className="w-full mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </div>

          <div className="relative w-full mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className="text-gray-500" />
            </button>
          </div>

          <div className="flex w-full mt-4 justify-between items-center px-1">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe((prev) => !prev)}
                className="form-checkbox"
              />
              <span className="text-gray-700">Remember Me</span>
            </div>
            <Link to="/forgotpassword" className="text-blue-500 hover:underline">Forgot Password?</Link>
          </div>

          <div className="w-full py-4">
            <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">Sign in</button>
          </div>

          <div className="w-full py-2">
            <Link to="/signin">
              <button type="button" className="w-full py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-300">Sign Up</button>
            </Link>
          </div>

          <Link to="/" className="w-full">
            <button className="flex items-center gap-2 w-full py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-300">
              <FontAwesomeIcon icon={faArrowLeft} className="text-gray-500" />
              Back
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

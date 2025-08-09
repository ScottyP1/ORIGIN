import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FiGithub } from "react-icons/fi";

import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function LoginPage() {
  const { setAccessToken, setUser } = useContext(AuthContext);

  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setError(null);
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ...payload } = data;
    try {
      const response = await api.post("auth/token/", payload);
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      setAccessToken(response.data.access);
      setUser(response.data.user);

      setData({ username: "", password: "" });

      navigate("/dashboard");
    } catch (e) {
      setError(e.response.data);
      console.log(e.response.data);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 text-white -mt-32 animate-fade-in">
      <h1 className="text-4xl font-[Mokoto] tracking-widest mb-8 ">Login</h1>

      <div className="flex flex-col gap-6 p-8 w-full max-w-md rounded-3xl bg-gradient-to-br from-[#511f87]/[.4] via-[#302b63]/[.4] to-[#0b0b65]/[.4] backdrop-blur-md shadow-xl animate-slide-up">
        {/* Email */}
        <InputField
          label="Email"
          placeholder="Email"
          type="text"
          name="email"
          onChange={handleChange}
        />
        {error?.email && (
          <span className="text-red-500 text-sm">{error.email[0]}</span>
        )}
        {/* Password */}
        <InputField
          label="Password"
          placeholder="*********"
          name="password"
          type="password"
          onChange={handleChange}
        />
        {error?.password && (
          <span className="text-red-500 text-sm">{error.password[0]}</span>
        )}
        <div className="text-sm text-center text-white/70 hover:text-white transition">
          <Link to="#" className="underline">
            Forgot Password?
          </Link>
        </div>

        {/* Submit button */}
        <SubmitButton label="Sign In" onClick={handleSubmit} />
        {error?.detail && (
          <span className="text-red-500 text-sm text-center">
            {error.detail}
          </span>
        )}

        {/* <span className="text-center">or</span> */}
        {/* <SubmitButton icon={<FiGithub size={25} />} label="Login with Github">
          <a href="https://github.com/login/oauth/authorize?client_id=Ov23lieEn97vtUEbV4YA&redirect_uri=http://localhost:5173/github-callback&scope=user"></a>
        </SubmitButton> */}

        {/* Extra links */}
        <div className="text-sm text-center text-white/70 hover:text-white transition">
          <Link to="/register" className="underline">
            Dont have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
}

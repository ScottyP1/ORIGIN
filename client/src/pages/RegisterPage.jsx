import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiGithub } from "react-icons/fi";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function RegisterPage() {
  const { setAccessToken, setUser } = useContext(AuthContext);
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [passwordError, setPasswordError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setError(null);
    setPasswordError("");
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { confirmPassword, ...payload } = data;

    if (!payload.email || !payload.password) {
      setError({ detail: "Email and password are required." });
      return;
    }
    if (payload.password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    try {
      setSubmitting(true);
      const { data: res } = await api.post("auth/signup/", payload); // or auth/register/ if that's your route

      // backend returns { user, access, refresh }
      localStorage.setItem("access", res.access);
      localStorage.setItem("refresh", res.refresh);
      setAccessToken(res.access);
      setUser(res.user);

      setData({ email: "", password: "", confirmPassword: "" });
      navigate("/dashboard");
    } catch (err) {
      const apiErr = err.response?.data || { detail: "Registration failed." };
      setError(apiErr);
      console.error("Register failed:", apiErr);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 text-white -mt-32 animate-fade-in">
      <h1 className="text-4xl mb-4 font-[Mokoto]">Register</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 p-8 w-full max-w-md rounded-3xl bg-gradient-to-br from-[#511f87]/40 via-[#302b63]/40 to-[#0b0b65]/40 backdrop-blur-md shadow-xl"
      >
        <InputField
          label="Email"
          placeholder="you@example.com"
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
        {error?.email && (
          <span className="text-red-500 text-sm">{error.email[0]}</span>
        )}

        <InputField
          label="Password"
          placeholder="*********"
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
        />
        {error?.password && (
          <span className="text-red-500 text-sm">{error.password[0]}</span>
        )}

        <InputField
          label="Confirm Password"
          placeholder="*********"
          type="password"
          name="confirmPassword"
          value={data.confirmPassword}
          onChange={handleChange}
        />
        {passwordError && (
          <span className="text-red-500 text-sm">{passwordError}</span>
        )}

        {/* General / non-field errors */}
        {error?.non_field_errors && (
          <span className="text-red-500 text-sm">
            {error.non_field_errors[0]}
          </span>
        )}
        {error?.detail && (
          <span className="text-red-500 text-sm text-center">
            {error.detail}
          </span>
        )}

        <SubmitButton
          label={submitting ? "Signing up..." : "Sign up"}
          onClick={handleSubmit}
          disabled={submitting}
        />

        <div className="text-sm text-center text-white/70 hover:text-white transition">
          <Link to="/login" className="underline">
            Already have an account? Login
          </Link>
        </div>
      </form>
    </div>
  );
}

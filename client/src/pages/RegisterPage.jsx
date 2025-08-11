import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

import Step1Email from "../components/register/Step1";
import Step2Code from "../components/register/Step2";
import Step3Password from "../components/register/Step3";

export default function RegisterPage() {
  const { setAccessToken, setUser } = useContext(AuthContext);
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    email: "",
    code: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setError(null);
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const sendCode = async () => {
    if (!data.email) {
      setError({ detail: "Email is required." });
      return;
    }
    try {
      setSubmitting(true);
      await api.post("auth/send-code/", { email: data.email });
      setStep(2);
    } catch (err) {
      setError(err.response?.data || { detail: "Failed to send code." });
    } finally {
      setSubmitting(false);
    }
  };

  const verifyCode = async () => {
    if (!data.code) {
      setError({ detail: "Verification code is required." });
      return;
    }
    try {
      setSubmitting(true);
      await api.post("auth/verify-code/", {
        email: data.email,
        code: data.code,
      });
      setStep(3);
    } catch (err) {
      setError(err.response?.data || { detail: "Invalid verification code." });
    } finally {
      setSubmitting(false);
    }
  };

  const registerUser = async () => {
    if (!data.password || data.password !== data.confirmPassword) {
      setError({ detail: "Passwords do not match" });
      return;
    }
    try {
      setSubmitting(true);
      const { data: res } = await api.post("auth/signup/", {
        email: data.email,
        password: data.password,
      });
      localStorage.setItem("access", res.access);
      localStorage.setItem("refresh", res.refresh);
      setAccessToken(res.access);
      setUser(res.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data || { detail: "Registration failed." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 text-white -mt-32 animate-fade-in">
      <h1 className="text-4xl mb-4 font-[Mokoto]">Register</h1>

      {step === 1 && (
        <Step1Email
          email={data.email}
          onChange={handleChange}
          onNext={sendCode}
          submitting={submitting}
          error={error}
        />
      )}
      {step === 2 && (
        <Step2Code
          email={data.email}
          code={data.code}
          onChange={handleChange}
          onNext={verifyCode}
          submitting={submitting}
          error={error}
        />
      )}
      {step === 3 && (
        <Step3Password
          password={data.password}
          confirmPassword={data.confirmPassword}
          onChange={handleChange}
          onNext={registerUser}
          submitting={submitting}
          error={error}
        />
      )}

      <div className="text-sm text-center text-white/70 hover:text-white transition mt-4">
        <Link to="/login" className="underline">
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
}

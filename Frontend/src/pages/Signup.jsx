import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import CustomAlert from "../components/CustomAlert.jsx"; // Adjust path if needed

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  // Alert states
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorAlert(false);
    setSuccessAlert(false);
    setErrorMessage("");
    setLoading(true);

    try {
      const response = await fetch("https://unused-item-donation.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      localStorage.setItem("token", data.token);
      setSuccessAlert(true);

      // Redirect after showing alert for 1.5s
      setTimeout(() => {
        setSuccessAlert(false);
        navigate("/login");
      }, 1500);
    } catch (err) {
      setErrorMessage(err.message);
      setErrorAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1F1F1F] px-4">
      <form
        className="w-full max-w-lg border border-gray-600 rounded-2xl px-10 py-12 bg-[#1F1F1F] text-white shadow-lg"
        onSubmit={handleSubmit}
      >
        <h1 className="text-green-400 text-4xl font-semibold text-center">Sign Up</h1>
        <p className="text-gray-400 text-sm text-center mt-2">Create a new account to get started</p>

        {/* Success Alert */}
        {successAlert && (
          <CustomAlert
            title="Signup Successful!"
            message="You can now login to your account."
            onClose={() => setSuccessAlert(false)}
          />
        )}

        {/* Error Alert */}
        {errorAlert && (
          <CustomAlert
            title="Signup Failed!"
            message={errorMessage}
            onClose={() => setErrorAlert(false)}
          />
        )}

        {/* Name Field */}
        <div className="flex items-center w-full mt-8 border border-gray-700 h-14 rounded-full overflow-hidden pl-6 gap-3 bg-[#1F1F1F]">
          <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-400" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9.003 9.003 0 0112 15c2.117 0 4.06.735 5.879 1.96M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-transparent text-white placeholder-gray-400 outline-none text-base w-full h-full"
            required
          />
        </div>

        {/* Email Field */}
        <div className="flex items-center w-full mt-5 border border-gray-700 h-14 rounded-full overflow-hidden pl-6 gap-3 bg-[#1F1F1F]">
          <svg width="18" height="12" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" fill="#9CA3AF"/>
          </svg>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent text-white placeholder-gray-400 outline-none text-base w-full h-full"
            required
          />
        </div>

        {/* Password Field */}
        <div className="flex items-center mt-5 w-full border border-gray-700 h-14 rounded-full pl-6 pr-4 bg-[#1F1F1F]">
          <div className="flex items-center gap-3 w-full">
            <svg width="14" height="18" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="#9CA3AF"/>
            </svg>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent text-white placeholder-gray-400 outline-none text-base w-full h-full"
              required
            />
          </div>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.025.152-2.012.438-2.94M6.67 6.67A7.5 7.5 0 0112 5c4.135 0 7.5 3.365 7.5 7.5a7.48 7.48 0 01-1.014 3.707M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 6L3 3" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>

        {/* Signup Button */}
        <button
          type="submit"
          disabled={loading}
          className={`mt-6 w-full h-12 rounded-full text-[#1F1F1F] bg-[#B6F09C] transition-opacity text-lg font-semibold ${
            loading ? "opacity-60 cursor-not-allowed" : "hover:opacity-90"
          }`}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        {/* Login Link */}
        <p className="text-gray-400 text-sm mt-5 text-center">
          Already have an account? <Link to="/login" className="text-green-400 hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
}

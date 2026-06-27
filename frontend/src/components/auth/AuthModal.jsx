import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function AuthModal({ onClose, defaultMode = "login" }) {
  const [mode, setMode] = useState(defaultMode); // "login" | "register"
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    full_name: "", email: "", password: "", confirm_password: "", programme: "",
  });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async () => {
    setError("");
    if (!form.email.endsWith("@st.knust.edu.gh")) {
      setError("Only @st.knust.edu.gh email addresses are allowed.");
      return;
    }
    if (mode === "register" && form.password !== form.confirm_password) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      if (mode === "register") {
        await api.post("/auth/register", {
          full_name: form.full_name,
          email: form.email,
          password: form.password,
          programme: form.programme,
        });
        toast.success("Account created! Please log in.");
        setMode("login");
      } else {
        const res = await api.post("/auth/login", {
          email: form.email,
          password: form.password,
        });
        login(res.data.access_token);
        toast.success("Welcome back! 🎓");
        navigate("/home");
      }
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col justify-end bg-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-t-3xl p-6 w-full max-w-md mx-auto"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {mode === "login" ? "Welcome Back" : "Create your account"}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {mode === "login" ? "Log in to continue" : "Join thousands of students"}
              </p>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <div className="space-y-3">
            {mode === "register" && (
              <input
                name="full_name"
                placeholder="Full Name"
                className="input-field"
                value={form.full_name}
                onChange={handleChange}
              />
            )}
            <input
              name="email"
              type="email"
              placeholder="name@st.knust.edu.gh"
              className="input-field"
              value={form.email}
              onChange={handleChange}
            />
            <input
              name="password"
              type="password"
              placeholder="Create a strong password"
              className="input-field"
              value={form.password}
              onChange={handleChange}
            />
            {mode === "register" && (
              <>
                <input
                  name="confirm_password"
                  type="password"
                  placeholder="Repeat your password"
                  className="input-field"
                  value={form.confirm_password}
                  onChange={handleChange}
                />
                <input
                  name="programme"
                  placeholder="Programme (e.g. Computer Engineering)"
                  className="input-field"
                  value={form.programme}
                  onChange={handleChange}
                />
              </>
            )}

            {error && (
              <p className="text-red-500 text-sm bg-red-50 border border-red-100 rounded-xl px-4 py-2">
                {error}
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn-gold mt-2 disabled:opacity-60"
            >
              {loading ? "Please wait..." : mode === "login" ? "Log In" : "Sign Up"}
            </button>

            <p className="text-center text-sm text-gray-500 pt-1">
              {mode === "login" ? (
                <>Don't have an account?{" "}
                  <button onClick={() => setMode("register")} className="text-primary-600 font-semibold">
                    Sign Up
                  </button>
                </>
              ) : (
                <>Already have an account?{" "}
                  <button onClick={() => setMode("login")} className="text-primary-600 font-semibold">
                    Log In
                  </button>
                </>
              )}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

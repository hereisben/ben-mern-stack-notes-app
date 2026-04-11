import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, authUser } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      toast.error("Please enter email and password.");
      return;
    }

    try {
      setIsSubmitting(true);
      await login(formData);
      toast.success(`Logged in successfully`);
      navigate("/");
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || "Failed to logged in";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (authUser) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-base-100 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-primary mb-2">
          Welcome back
        </h1>

        <p className="text-center text-base-content/70 mb-6">
          Log in to continue managing your notes.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full mt-1.5"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full mt-1.5"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="divider text-base-content/50">or</div>

        <button
          type="button"
          className="btn btn-outline w-full"
          onClick={() => {
            window.location.href = `${import.meta.env.VITE_API_URL || "http://localhost:5001/api"}/auth/google`;
          }}
        >
          Continue with Google
        </button>

        <p className="text-sm text-center mt-6 text-base-content/70">
          Do not have an account?{" "}
          <Link to="/register" className="link link-primary font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

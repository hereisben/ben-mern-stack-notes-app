import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, authUser } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      toast.error(`Please fill in all fields`);
      return;
    }

    if (formData.password.trim() < 6) {
      toast.error(`Password must be at least 6 characters`);
      return;
    }

    try {
      setIsSubmitting(true);
      await register(formData);
      toast.success(`Account created successfully`);
      navigate("/login");
    } catch (err) {
      console.error("Register failed:", err);
      const message = err.response?.data?.message || "Failed to create account";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authUser) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-base-100 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-primary mb-2">
          Create account
        </h1>

        <p className="text-center text-base-content/70 mb-6">
          Sign up to start creating and managing your notes.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Name</span>
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="input input-bordered w-full mt-1.5"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

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
              placeholder="Create a password"
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
            {isSubmitting ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="divider text-base-content/50">or</div>

        <button type="button" className="btn btn-outline w-full" disabled>
          Continue with Google
        </button>

        <p className="text-sm text-center mt-6 text-base-content/70">
          Already have an account?{" "}
          <Link to="/login" className="link link-primary font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

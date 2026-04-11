import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router";
import { useAuth } from "../hooks/useAuth";
import api from "../lib/axios";

const OAuthSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setAuthUser } = useAuth();

  useEffect(() => {
    const handleGoogleLogin = async () => {
      try {
        const token = searchParams.get("token");

        if (!token) {
          toast.error("Google login failed.");
          navigate("/login");
          return;
        }

        localStorage.setItem("token", token);

        const res = await api.get("/auth/me");
        console.log("auth/me response:", res.data);
        setAuthUser(res.data.user);

        toast.success("Logged in with Google");
        navigate("/");
      } catch (error) {
        console.error("OAuth success page error:", error);
        localStorage.removeItem("token");
        toast.error("Failed to complete Google login.");
        navigate("/login");
      }
    };

    handleGoogleLogin();
  }, [navigate, searchParams, setAuthUser]);

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4">
      <div className="bg-base-100 rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-primary mb-2">
          Signing you in...
        </h1>
        <p className="text-base-content/70">
          Please wait while we complete your Google login.
        </p>
      </div>
    </div>
  );
};

export default OAuthSuccessPage;

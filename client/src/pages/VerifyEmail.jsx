import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import Container from "../components/layout/Container";
import api from "../api/axios";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      verifyEmail(token);
    } else {
      setStatus("error");
      setMessage("No verification token provided");
    }
  }, [searchParams]);

  const verifyEmail = async (token) => {
    try {
      const response = await api.get(`/auth/verify/${token}`);
      setStatus("success");
      setMessage(response.data.message);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setStatus("error");
      setMessage(error.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12">
      <Container>
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm p-8 text-center">
          {status === "loading" && (
            <>
              <Loader2 className="w-16 h-16 text-blue-600 mx-auto animate-spin" />
              <h2 className="text-xl font-bold text-slate-800 mt-4">Verifying your email...</h2>
              <p className="text-slate-500 mt-2">Please wait while we verify your account.</p>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              <h2 className="text-xl font-bold text-slate-800 mt-4">Email Verified! ✅</h2>
              <p className="text-slate-600 mt-2">{message}</p>
              <p className="text-sm text-slate-400 mt-4">Redirecting to login...</p>
              <Link
                to="/login"
                className="inline-block mt-6 text-blue-600 hover:underline"
              >
                Go to Login
              </Link>
            </>
          )}

          {status === "error" && (
            <>
              <XCircle className="w-16 h-16 text-red-500 mx-auto" />
              <h2 className="text-xl font-bold text-slate-800 mt-4">Verification Failed</h2>
              <p className="text-slate-600 mt-2">{message}</p>
              <Link
                to="/login"
                className="inline-block mt-6 text-blue-600 hover:underline"
              >
                Back to Login
              </Link>
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default VerifyEmail;
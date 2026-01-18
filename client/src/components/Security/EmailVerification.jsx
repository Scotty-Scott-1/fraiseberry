import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useVerifyEmail } from "./useVerifyEmail";

const EmailVerify = () => {
  const [status, setStatus] = useState("Verifying...");
  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token");

  const { verifyEmail, loading } = useVerifyEmail();

  useEffect(() => {
    if (!token) {
      setStatus("Verification token missing.");
      return;
    }
    const verify = async () => {
      const result = await verifyEmail(token);
      console.log(result);
      setStatus(result.message);
    };
    verify();
  }, [token, verifyEmail]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Email Verification</h1>
      <p>{loading ? "Verifying..." : status}</p>
      <p>
        Already verified? <Link to="/signin">Sign in</Link>
      </p>
    </div>
  );
};

export default EmailVerify;

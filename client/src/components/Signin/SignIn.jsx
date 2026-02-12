import React, { useState } from "react";
 import { useLoginUser } from "./useLoginUser";
import styles from "./SignIn.module.css";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Security/authContext";

const SignIn = () => {
  const navigate = useNavigate();
  const { login, tempMfaToken, clearTempMfaToken } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [mfaMode, setMfaMode] = useState(false);
  const [mfaCode, setMfaCode] = useState("");

  const { loginUser, loading, error } = useLoginUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const result = await loginUser(formData);

      if (result && result.status === 200 && result.message === "normal login") {
        navigate("/dashboard")
      } else if (result && result.message === "mfa required") {
        setMfaMode(true);
      } else {
      }
    } catch(err) {
      console.error("handleSubmit: Error caught:", err.message);
    }
  };

  const verifyMfa = async () => {
    try {
      if (!mfaCode) return;
      const res = await fetch("/api/mfa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ tempToken: tempMfaToken, token: mfaCode }),
      });
      const data = await res.json();
      if (res.status === 200) {
        const { accessToken: token } = data;
        if (token) login(token);
        clearTempMfaToken();
        navigate("/dashboard");
      } else {
        console.error(data.message || "Invalid MFA code");
      }
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className={styles.container}>
      <section className={styles.signInSection}>

        {/* Back Button */}
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => navigate("/")}
        >
          <ArrowLeftIcon className={styles.backIcon} />
          Back
        </button>

        <h2 className={styles.signInTitle}>Welcome Back</h2>

        <form className={styles.signInForm} onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            className={styles.input}
            value={formData.email}
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className={styles.input}
            value={formData.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            className={styles.primaryBtn}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {mfaMode && (
          <div style={{ marginTop: 12 }}>
            <p>Enter authentication code from your authenticator app</p>
            <input
              name="mfa"
              type="text"
              placeholder="123456"
              className={styles.input}
              value={mfaCode}
              onChange={(e) => setMfaCode(e.target.value)}
            />
            <button className={styles.primaryBtn} onClick={verifyMfa}>
              Verify
            </button>
          </div>
        )}

        { error && <p className={styles.error}>{error}</p> }
      </section>
    </div>
  );
};

export default SignIn;

import React, { useState } from "react";
 import { useLoginUser } from "./useLoginUser";
import styles from "./SignIn.module.css";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const { loginUser, loading } = useLoginUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const result = await loginUser(formData);

    console.log(result)
    if (result?.tempToken) return; // MFA

    navigate("/dashboard"); // normal login
  } catch (err) {
    setError(err.message);
    console.error(err.message); // log error
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

        { error && <p className={styles.error}>{error}</p> }
      </section>
    </div>
  );
};

export default SignIn;

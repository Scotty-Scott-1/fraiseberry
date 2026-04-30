import React, { useState, } from 'react';
import { useCreateUser } from "./useCreateUser";
import styles from "./SignUp.module.css";
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import BackButton from "../Utils/Buttons/BackButton/BackButton";
import PrimaryButton from "../Utils/Buttons/primaryButton/primaryButton";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    agree: false,
  });

  const { createUser, loading, error } = useCreateUser();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUser(formData);

      toast.success(
        `A confirmation email has been sent to ${formData.email}.`,
        { position: "bottom-center", autoClose: 4000 }
      );

      setTimeout(() => {
        navigate("/signin");
      }, 1200);

    } catch {};
  };

  return (
    <div className={styles.container}>
      <section className={styles.card}>
        <BackButton onClick={() => navigate("/")} />
        <h2 className={styles.title}>Join Now</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
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
          <label className={styles.checkboxLabel}>
            <input
              name="agree"
              type="checkbox"
              checked={formData.agree}
              onChange={handleChange}
            />{" "}Agree to terms
          </label>
          <PrimaryButton disabled={loading}>
            {loading ? "Loading..." : "Create Account"}
          </PrimaryButton>
        </form>

        {error && <p className={styles.error}>{error}</p>}
      </section>
    </div>
  );
};

export default SignUp;

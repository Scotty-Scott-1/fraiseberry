import React, { useState, useEffect } from 'react';
import { useCreateUser } from "./useCreateUser";
import styles from "./SignUp.module.css";
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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
    const msg = await createUser(formData);
    navigate("/signin");
  } catch {

  }
};

  return (
    <div className={styles.container}>
      <section className={styles.signUpSection}>

        {/* Back Button */}
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => navigate("/")}
        >
          <ArrowLeftIcon className={styles.backIcon} />
          Back
        </button>



        <h2 className={styles.signUpTitle}>Join Now</h2>
        <form className={styles.signUpForm} onSubmit={handleSubmit}>
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            className={styles.input}
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            className={styles.input}
            value={formData.lastName}
            onChange={handleChange}
          />
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
          <label>
            <input
              name="agree"
              type="checkbox"
              checked={formData.agree}
              onChange={handleChange}
            />{" "}Agree to terms
          </label>
          <button type="submit" className={styles.primaryBtn} disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        {error && <p className={styles.error}>{error}</p>}
      </section>
    </div>
  );
};

export default SignUp;

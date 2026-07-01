import { useState } from "react";
import styles from "./SignIn.module.css";
import { useNavigate } from "react-router-dom";
import {
  useLoginUser,
  BackButton,
  Title,
  PrimaryButton,
  useHandleSubmit,
  useVerifyMfa,
  SignInForm,
  MfaMode
 } from "./index.js";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [mfaMode, setMfaMode] = useState(false);
  const [mfaCode, setMfaCode] = useState("");
  const [error, setError] = useState("");
  const { loginUser, loading } = useLoginUser(setError);
  const { handleSubmit } = useHandleSubmit({
    loginUser,
    formData,
    setMfaMode
  });
  const { verifyMfa } = useVerifyMfa({ mfaCode, setError });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const renderMfaMode = () => {
    if (mfaMode) {
      return (
        <MfaMode
          mfaCode={mfaCode}
          setMfaCode={setMfaCode}
          verifyMfa={verifyMfa}
        />
      );
    }
  };

  const renderError = () => {
    if (error) {
      return <p className={styles.error}>{error}</p>;
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.card}>
        <BackButton onClick={() => navigate("/")} />
        <Title>Welcome Back</Title>
        <SignInForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
        />
        {renderMfaMode()}
        {renderError()}
      </section>
    </div>
  );
};

export default SignIn;

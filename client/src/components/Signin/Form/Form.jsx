import styles from "../SignIn.module.css";
import { PrimaryButton } from "../../Utils/Buttons/primaryButton/primaryButton";

const SignInForm = ({
  formData,
  handleChange,
  handleSubmit,
  loading,
}) => {
  return (
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

      <PrimaryButton type="submit" disabled={loading}>
        {loading ? "Signing in..." : "Sign In"}
      </PrimaryButton>
    </form>
  );
};

export default SignInForm;

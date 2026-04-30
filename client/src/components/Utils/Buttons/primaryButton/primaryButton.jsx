import { useState } from "react";
import styles from "./primaryButton.module.css";

const PrimaryButton = ({ children, disabled }) => {
  const [loadingAnim, setLoadingAnim] = useState(false);

  const handleClick = () => {
    if (disabled) return;

    setLoadingAnim(true);

    setTimeout(() => {
      setLoadingAnim(false);
    }, 2000);
  };

  return (
    <button
      type="submit"
      disabled={disabled}
      onClick={handleClick}
      className={`${styles.primaryBtn} ${
        loadingAnim ? styles.loading : ""
      }`}
    >
      {children}
    </button>
  );
};
export default PrimaryButton;

import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import styles from "./BackButton.module.css";

const BackButton = ({ onClick }) => {
  return (
    <button type="button" className={styles.backBtn} onClick={onClick}>
      <ArrowLeftIcon className={styles.backIcon} />
      Back
    </button>
  );
};

export default BackButton;

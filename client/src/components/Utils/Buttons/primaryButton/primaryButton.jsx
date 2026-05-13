import styles from "./primaryButton.module.css";

export const PrimaryButton = ({
  children,
  disabled,
  type = "button",
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={styles.primaryBtn}
      {...props}
    >
      {children}
    </button>
  );
};


export const SecondaryButton = ({
  children,
  disabled,
  type = "button",
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={styles.secondaryBtn}
      {...props}
    >
      {children}
    </button>
  );
};

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
      className={[styles.buttonBase, styles.primaryBtn].join(" ")}
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
      className={[styles.buttonBase, styles.secondaryBtn].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
};

import styles from "../SignIn.module.css";

const MfaMode = ({
  mfaCode,
  setMfaCode,
  verifyMfa,
}) => {
  return (
    <div>
      <p>Enter authentication code from your authenticator app</p>

      <input
        name="mfa"
        type="text"
        placeholder="123456"
        className={styles.input}
        value={mfaCode}
        onChange={(e) => setMfaCode(e.target.value)}
      />

      <button
        className={styles.primaryBtn}
        onClick={verifyMfa}
      >
        Verify
      </button>
    </div>
  );
};

export default MfaMode;

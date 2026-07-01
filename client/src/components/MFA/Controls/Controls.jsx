import QRCode from "react-qr-code";
import styles from "./Controls.module.css";

const Controls = ({
  message,
  mfaEnabled,
  qrCode,
  secret,
  mfaCode,
  setMfaCode,
  loading,
  setup,
  enable,
  disable,
}) => {
  const renderMessage = () => {
    if (!message) return null;

    return (
      <p style={{ color: mfaEnabled ? "green" : "red" }}>
        {message}
      </p>
    );
  };

  const renderActionButton = () => {
    if (!mfaEnabled && !qrCode) {
      return (
        <button onClick={setup} disabled={loading}>
          {loading ? "Generating..." : "Enable MFA"}
        </button>
      );
    }

    if (mfaEnabled) {
      return (
        <button onClick={disable}>
          Disable MFA
        </button>
      );
    }

    return null;
  };

  const renderQrCodeSection = () => {
    if (!qrCode) return null;

    return (
      <div className={styles.qrCodeBox}>
        <QRCode value={qrCode} size={200} />

        <p className={styles.secretText}>
          {secret}
        </p>

        <input
          placeholder="Enter 6-digit code"
          value={mfaCode}
          onChange={(e) => setMfaCode(e.target.value)}
          className={styles.input}
        />

        <button
          onClick={enable}
        >
          Verify MFA
        </button>
      </div>
    );
  };

  return (
    <>
      {renderMessage()}
      {renderActionButton()}
      {renderQrCodeSection()}
    </>
  );
};

export default Controls;

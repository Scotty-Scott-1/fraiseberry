import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";
import { useApiCall } from "../../services/useApiCall";
import { useAuth } from "../Security/authContext";
import { useGetStatus } from "./hooks/useGetStatus";
import { useSetup } from "./hooks/useSetup";
import { useEnable } from "./hooks/useEnable";
import { useDisable } from "./hooks/useDisable";
import DashboardHeader from "../Utils/DashboardHeader/DashboardHeader";
import Container from "../Utils/MessageContainer/MessageContainer";
import ContentWrapper from "../Utils/ContentWrapper/ContentWrapper";
import styles from "./mfa.module.css";

const MFA = () => {
  const { accessToken, login, tempMfaToken, clearTempMfaToken } = useAuth();
  const { apiCall } = useApiCall();
  const navigate = useNavigate();

  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [secret, setSecret] = useState(null);
  const [mfaCode, setMfaCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useGetStatus(apiCall, setMfaEnabled);

  const { setup } = useSetup({
    setLoading,
    setQrCode,
    setSecret,
    setMessage
  });

  const { enable } = useEnable({
    apiCall,
    mfaCode,
    setMfaEnabled,
    setMessage,
    setQrCode,
    setSecret,
    setMfaCode,
});

  const { disable } = useDisable({
    apiCall,
    setMfaEnabled,
    setMessage,
    setQrCode,
    setSecret,
    setMfaCode
  });


  const renderContent2 = () => {
    if (!mfaEnabled && !qrCode) {
      return (
          <button onClick={setup} disabled={loading}>
            {loading ? "Generating..." : "Enable MFA"}
          </button>
      );
    } else if (mfaEnabled) {
      return <button onClick={disable}> Disable MFA</button>;
    }
  }

  const renderContent = () => {
    if (message) {
      return <p style={{ color: mfaEnabled ? "green" : "red" }}>{message}</p>;
    }
  };

  return (
    <Container>
      <DashboardHeader title="Multi-Factor Authentication" navTo="/dashboard" />
        <ContentWrapper>

        {renderContent()}
        {renderContent2()}

        <div>
              {qrCode && (
                <div className={styles.qrCodeBox}>
                  <QRCode value={qrCode} size={200} />
                  <p className={styles.secretText}>{secret}</p>
                  <input
                    placeholder="Enter 6-digit code"
                    value={mfaCode}
                    onChange={(e) => setMfaCode(e.target.value)}
                    className={styles.input}
                    />
                  <button
                    onClick={enable}
                    style={{ marginTop: 12, width: "100%" }}
                    >
                    Verify MFA
                  </button>
                </div>
              )}
        </div>

        </ContentWrapper>
      </Container>
  );
};

export default MFA;

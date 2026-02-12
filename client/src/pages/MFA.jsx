import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { useAuth } from "../components/Security/authContext";
import { useNavigate } from "react-router-dom";

const MfaPage = () => {
  const { accessToken, login, tempMfaToken, clearTempMfaToken } = useAuth();
  const navigate = useNavigate();

  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [secret, setSecret] = useState(null);
  const [mfaCode, setMfaCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch MFA status when logged in
  const fetchMfaStatus = async () => {
    try {
      const res = await fetch("/api/mfa/status", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        const data = await res.json();
        setMfaEnabled(data.mfaEnabled || false);
      }
    } catch (err) {
      console.error("Error fetching MFA status:", err);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchMfaStatus();
    }
  }, [accessToken]);

  const fetchSetup = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/mfa/setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      });
      const data = await res.json();
      if (res.status === 200) {
        setQrCode(data.otpauth_url);
        setSecret(data.base32);
        setMessage("Scan the QR code with your authenticator app and enter the 6-digit code below.");
      } else {
        setMessage(data.message || "Error generating secret");
      }
    } catch (err) {
      setMessage("Server error");
    } finally {
      setLoading(false);
    }
  };

  const enableMfa = async () => {
    try {
      if (!mfaCode) {
        setMessage("Please enter the code");
        return;
      }
      const res = await fetch("/api/mfa/enable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
        body: JSON.stringify({ token: mfaCode }),
      });
      const data = await res.json();
      if (res.status === 200) {
        setMfaEnabled(true);
        setMessage("MFA enabled successfully!");
        setQrCode("");
        setSecret(null);
        setMfaCode("");
      } else {
        setMessage(data.message || "Invalid code");
      }
    } catch (err) {
      setMessage("Server error");
    }
  };

  const disableMfa = async () => {
    try {
      const res = await fetch("/api/mfa/disable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      });
      const data = await res.json();
      if (res.status === 200) {
        setMfaEnabled(false);
        setMessage("MFA disabled.");
        setQrCode("");
        setSecret(null);
        setMfaCode("");
      } else {
        setMessage(data.message || "Failed to disable MFA.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to disable MFA.");
    }
  };

  const verifyDuringLogin = async () => {
    try {
      const tempToken = tempMfaToken;
      if (!tempToken) return setMessage("No temp token, please sign in again");

      const res = await fetch("/api/mfa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ tempToken, token: mfaCode }),
      });
      const data = await res.json();
      if (res.status === 200) {
        const { accessToken: token } = data;
        if (token) login(token);
        clearTempMfaToken();
        navigate("/dashboard");
      } else {
        setMessage(data.message || "Invalid code");
      }
    } catch (err) {
      setMessage("Server error");
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 600, margin: "0 auto" }}>
      <h2>Multi-Factor Authentication</h2>
      {message && <p style={{ color: mfaEnabled ? "green" : "red" }}>{message}</p>}

      {accessToken ? (
        <div>
          {!mfaEnabled ? (
            <>
              <button onClick={fetchSetup} disabled={loading}>
                {loading ? "Generating..." : "Enable MFA"}
              </button>

              {qrCode && (
                <div style={{ marginTop: 16, textAlign: "center" }}>
                  <QRCode value={qrCode} size={200} />
                  <p style={{ marginTop: 12 }}>
                    <strong>Backup secret:</strong> {secret}
                  </p>
                  <input
                    placeholder="Enter 6-digit code"
                    value={mfaCode}
                    onChange={(e) => setMfaCode(e.target.value)}
                    style={{ marginTop: 12, padding: 8, width: "100%", boxSizing: "border-box" }}
                  />
                  <button
                    onClick={enableMfa}
                    style={{ marginTop: 12, width: "100%" }}
                  >
                    Verify MFA
                  </button>
                </div>
              )}
            </>
          ) : (
            <button onClick={disableMfa}>
              Disable MFA
            </button>
          )}
        </div>
      ) : (
        <div>
          <p>Verify your authentication code to complete sign-in.</p>
          <input
            placeholder="Enter 6-digit code"
            value={mfaCode}
            onChange={(e) => setMfaCode(e.target.value)}
            style={{ padding: 8, width: "100%", boxSizing: "border-box" }}
          />
          <button
            onClick={verifyDuringLogin}
            style={{ marginTop: 12, width: "100%" }}
          >
            Verify and Continue
          </button>
        </div>
      )}
    </div>
  );
};

export default MfaPage;

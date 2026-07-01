import React, { useState } from "react";
import QRCode from "react-qr-code";
import {
  useGetStatus,
  useSetup,
  useEnable,
  useDisable,
  DashboardHeader,
  Container,
  ContentWrapper,
  Controls
} from "./index.js";

const MFA = () => {

  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [secret, setSecret] = useState(null);
  const [mfaCode, setMfaCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useGetStatus(setMfaEnabled);

  const { setup } = useSetup({
    setLoading,
    setQrCode,
    setSecret,
    setMessage
  });

  const { enable } = useEnable({
    mfaCode,
    setMfaEnabled,
    setMessage,
    setQrCode,
    setSecret,
    setMfaCode,
});

  const { disable } = useDisable({
    setMfaEnabled,
    setMessage,
    setQrCode,
    setSecret,
    setMfaCode
  });

  return (
    <Container>
      <DashboardHeader title="Multi-Factor Authentication" navTo="/dashboard" />
        <ContentWrapper>
          <Controls
            message={message}
            mfaEnabled={mfaEnabled}
            qrCode={qrCode}
            secret={secret}
            mfaCode={mfaCode}
            setMfaCode={setMfaCode}
            loading={loading}
            setup={setup}
            enable={enable}
            disable={disable}
          />
        </ContentWrapper>
      </Container>
  );
};

export default MFA;

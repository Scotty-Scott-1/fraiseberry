import { useNavigate } from "react-router-dom";

export const useHandleSubmit = ({
  loginUser,
  formData,
  setMfaMode,
}) => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const result = await loginUser(formData);

      if (result?.status === 200 && result.message === "normal login") {
        navigate("/dashboard");
      } else if (result?.message === "mfa required") {
        setMfaMode(true);
      }
    } catch (err) {
      console.error("handleSubmit: Error caught:", err.message);
    }
  };

  return { handleSubmit };
};

import { Routes, Route } from 'react-router-dom';
import SignUpPage from "./pages/Signup";
import SignInPage from "./pages/SignIn";
import PageHome from "./pages/Home";
import VerifyEmailPage from "./pages/VerifyEmail";
import DashboardPage from "./pages/Dashboard";
import ProtectedRoute from "./components/Security/ProtectedRoute";



const App = () => (
    <Routes>
      <Route path="/" element={<PageHome />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/email" element={<VerifyEmailPage />} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
    </Routes>
);

export default App

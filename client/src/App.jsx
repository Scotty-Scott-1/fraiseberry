import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpPage from "./pages/Signup";
import SignInPage from "./pages/SignIn";
import PageHome from "./pages/Home";
import VerifyEmailPage from "./pages/VerifyEmail";
import DashboardPage from "./pages/Dashboard";


const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<PageHome />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/email" element={<VerifyEmailPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  </Router>
);

export default App

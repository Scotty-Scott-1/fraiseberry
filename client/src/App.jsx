import { Routes, Route } from 'react-router-dom';
import SignUpPage from "./pages/Signup";
import SignInPage from "./pages/SignIn";
import PageHome from "./pages/Home";
import VerifyEmailPage from "./pages/VerifyEmail";
import DashboardPage from "./pages/Dashboard";
import ProtectedRoute from "./components/Security/ProtectedRoute";
import ProfilePage from "./pages/Profile";
import PreferencesPage from "./pages/Preferences";
import DiscoverPage from "./pages/Discover";
import ChatPage from "./pages/Chat";

const App = () => (
    <Routes>
      <Route path="/" element={<PageHome />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/email" element={<VerifyEmailPage />} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/preferences" element={<ProtectedRoute><PreferencesPage /></ProtectedRoute>} />
      <Route path="/discover" element={<ProtectedRoute><DiscoverPage /></ProtectedRoute>} />
      <Route path="/chat/:otherUserId" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
    </Routes>
);

export default App

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpPage from "./pages/Signup"
import SignInPage from "./pages/SignIn"
import PageHome from "./pages/Home"


const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<PageHome />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signin" element={<SignInPage />} />
    </Routes>
  </Router>
);

export default App

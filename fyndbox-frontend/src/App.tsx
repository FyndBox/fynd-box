import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import AuthGuard from './components/AuthGuard';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import LanguageSelector from './components/LanguageSelector/LanguageSelector';

const App: FC = () => {
  return (
    <BrowserRouter>
      <LanguageSelector />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/dashboard"
          element={
            <AuthGuard>
              <DashboardPage />
            </AuthGuard>
          }
        />
        {/* 
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" />} />  */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;

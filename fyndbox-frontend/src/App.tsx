import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import UserGuidePage from './pages/UserGuidePage/UserGuidePage';
import AuthGuard from './components/AuthGuard';
import BoxPage from './pages/BoxPage/BoxPage';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <AuthGuard>
              <DashboardPage />
            </AuthGuard>
          }
        />
        <Route
          path="/box/:storageId/:boxId"
          element={
            <AuthGuard>
              <BoxPage />
            </AuthGuard>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/userguide" element={<UserGuidePage />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

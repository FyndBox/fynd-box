import { FC } from "react";
import LandingPage from "./pages/LandingPage/LandingPage";

const App: FC = () => {
  return <LandingPage />;
};

export default App;

/* const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}; */

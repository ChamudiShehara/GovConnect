import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OAuthSuccess from "./pages/OAuthSuccess";
import GoogleSelectRole from "./pages/GoogleSelectRole";
import MinisterDashboard from "./pages/minister/MinisterDashboard";
import DepartmentPage from "./pages/minister/DepartmentPage";
import NewComplaint from "./pages/complaints/NewComplaint";
import Departments from "./pages/departments/Departments";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route path="/google-select-role" element={<GoogleSelectRole />} />
        <Route path="/minister/dashboard" element={<MinisterDashboard />} />
        <Route path="/departments/:id" element={<DepartmentPage />} />
        <Route path="/complaints/new" element={<NewComplaint />} />
        <Route path="/departments" element={<Departments />} />
      </Routes>
    </BrowserRouter>
  );
}

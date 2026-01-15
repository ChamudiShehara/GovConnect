import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OAuthSuccess from "./pages/OAuthSuccess";
import GoogleSelectRole from "./pages/GoogleSelectRole";
import MinisterDashboard from "./pages/minister/MinisterDashboard";
import NewComplaint from "./pages/complaints/NewComplaint";
import Departments from "./pages/departments/Departments";
import DepartmentPage from "./pages/departments/DepartmentPage";

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
        <Route path="/complaints/new" element={<NewComplaint />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/departments/:id" element={<DepartmentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

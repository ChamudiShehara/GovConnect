import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";

export default function DepartmentPage() {
  const { id } = useParams();
  const [department, setDepartment] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDept = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/departments/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDepartment(res.data);
    };
    fetchDept();
  }, [id]);

  if (!department) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{department.name}</h1>
        <p className="text-gray-600 mb-6">
          Minister: <span className="font-semibold">{department.createdBy.name}</span>
        </p>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-3">
            Complaints (Coming Next)
          </h2>
          <p className="text-gray-500">
            Complaints related to this department will appear here.
          </p>
        </div>
      </main>
    </div>
  );
}

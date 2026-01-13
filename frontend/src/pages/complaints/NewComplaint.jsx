import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function NewComplaint() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    phoneNumber: "",                // ✅ FIXED
    address: "",
    thirdPartyName: "",
    thirdPartyPhoneNumber: "",      // ✅ FIXED
    thirdPartyAddress: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitComplaint = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/complaints/create",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Complaint submitted successfully ✅");
      navigate("/");
    } catch (err) {
      console.error("Create complaint error:", err);
      alert(err.response?.data?.message || "Failed to submit complaint");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-3xl mx-auto bg-white p-6 mt-10 rounded shadow">
        <h2 className="text-2xl font-bold mb-6">Submit a Complaint</h2>

        <form onSubmit={submitComplaint} className="space-y-4">
          <h3 className="font-semibold text-lg">Your Details</h3>

          <input
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <input
            name="phoneNumber"          // ✅ FIXED
            placeholder="Phone Number"
            value={form.phoneNumber}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <textarea
            name="address"
            placeholder="Home Address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <textarea
            name="description"
            placeholder="Complaint Description"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <h3 className="font-semibold text-lg mt-6">
            Third Party Details (Optional)
          </h3>

          <input
            name="thirdPartyName"
            placeholder="Third Party Name"
            value={form.thirdPartyName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="thirdPartyPhoneNumber"     // ✅ FIXED
            placeholder="Third Party Phone"
            value={form.thirdPartyPhoneNumber}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <textarea
            name="thirdPartyAddress"
            placeholder="Third Party Address"
            value={form.thirdPartyAddress}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded mt-4"
          >
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
}

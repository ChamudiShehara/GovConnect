import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="flex flex-col items-center justify-center py-24">
        {user ? (
          <>
            <h2 className="text-3xl font-bold mb-4">
              Welcome, {user.name} 👋
            </h2>

            <p className="text-gray-600 mb-6">
              You are logged in as{" "}
              <span className="font-semibold">{user.role}</span>
            </p>

            {user.role === "CITIZEN" && (
              <Link
                to="/complaints/new"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg"
              >
                Submit a Complaint
              </Link>
            )}

            {user.role === "AGENT" && (
              <Link
                to="/agent/dashboard"
                className="px-6 py-3 bg-purple-600 text-white rounded-lg"
              >
                Agent Dashboard
              </Link>
            )}

            {user.role === "MINISTER" && (
              <Link
                to="/minister/dashboard"
                className="px-6 py-3 bg-orange-600 text-white rounded-lg"
              >
                Minister Dashboard
              </Link>
            )}
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-4">
              Welcome to GovConnect
            </h2>
            <p className="text-gray-600">
              Connecting citizens with government services
            </p>
          </>
        )}
      </main>
    </div>
  );
}

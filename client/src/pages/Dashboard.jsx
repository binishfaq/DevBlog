import { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[450px]">
        <h1 className="text-3xl font-bold mb-6">
          Dashboard
        </h1>

        {user && (
          <>
            <p><strong>Name:</strong> {user.fullName}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
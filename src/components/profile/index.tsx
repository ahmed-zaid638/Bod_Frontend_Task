import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();
  console.log(user);
  const displayName = user?.displayName || "User Name";
  const email = user?.email || "email@example.com";

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 py-8">
      <div className="relative w-full max-w-4xl h-48 md:h-64 bg-gradient-to-r from-green-400 to-blue-500 rounded-b-2xl shadow">
        <img
          src="/cover-placeholder.jpg"
          alt="Cover"
          className="absolute inset-0 w-full h-full object-cover rounded-b-2xl opacity-70"
        />
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-lg bg-gray-200">
            <img
              src={user?.photoURL || "/profile-placeholder.png"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="w-full max-w-2xl bg-white rounded-xl shadow mt-20 p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">{displayName}</h1>
        <p className="text-gray-500 mt-1">{email}</p>

        <div className="mt-6 space-y-4">
          <div className="flex justify-between border-b pb-2 text-gray-600">
            <span className="font-medium">Phone</span>
            <span>-</span>
          </div>
          <div className="flex justify-between border-b pb-2 text-gray-600">
            <span className="font-medium">Joined</span>
            <span>{user?.metadata?.creationTime || "-"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

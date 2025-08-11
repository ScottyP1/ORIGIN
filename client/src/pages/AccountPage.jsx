import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";

import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";

export default function AccountPage() {
  const { user, loading, logout, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [email, setEmail] = useState(user?.email || "");
  const [error, setError] = useState("");

  if (loading) return <h1>Loading</h1>;

  const handleDeleteAccount = async () => {
    try {
      await api.delete("auth/user/");
      logout();
      navigate("/");
    } catch (e) {
      setError("Failed to delete account. Try again.");
      console.error(e);
    }
  };

  const handleUpdateEmail = async () => {
    try {
      const { data } = await api.put("auth/user/", { email });
      setUser((prev) => ({ ...prev, email: data?.email ?? email }));
      setEditingEmail(false);
    } catch (e) {
      setError(e.response.data.error);
      console.error(e.response.data.error);
    }
  };

  const handleRemoveGithub = async () => {
    await api.delete("auth/unlink/");
    const response = await api.get("auth/user/");
    setUser(response.data);
  };

  return (
    <div className="text-white font-[Mokoto] bg-black/60 backdrop-blur-md md:border md:border-white/20 p-6 md:p-8 rounded-2xl w-full md:w-2/3 lg:w-1/2 mx-auto opacity-0 animate-fade-in">
      {/* Email row */}
      <AccountItem
        label="Email"
        value={user.email}
        onEdit={() => setEditingEmail(!editingEmail)}
      >
        {editingEmail && (
          <div className="mt-3 grid grid-cols-3 gap-3 items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border border-white/30 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#ADDCF2] col-span-2"
              placeholder="Enter new email"
            />
            <button
              onClick={handleUpdateEmail}
              className="cursor-target px-4 py-2 rounded-lg border border-white/30 hover:bg-white/10 disabled:opacity-50"
            >
              Save
            </button>
            {error && <span className="text-red-500 text-sm">{error}</span>}
          </div>
        )}
      </AccountItem>

      {/* Password row (masked, you can wire a modal/form later) */}
      <AccountItem label="Password" value="***************" />

      {/* GitHub + Name */}
      <AccountItem label="GitHub Username" value={user.username || "—"} />
      <AccountItem label="Full Name" value={user.full_name || "—"} />

      {/* Actions */}
      {!confirmDelete ? (
        <div className="flex flex-col md:flex-row gap-4 mt-10">
          <button
            onClick={() => setConfirmDelete(true)}
            className="cursor-target bg-red-500 hover:bg-red-600 px-4 py-3 rounded-xl w-full"
          >
            Delete Account
          </button>
          {user.github_connected && (
            <button
              onClick={handleRemoveGithub}
              className="cursor-target border border-red-500 px-4 py-3 rounded-xl w-full hover:bg-red-600 disabled:opacity-50"
            >
              Remove GitHub
            </button>
          )}
        </div>
      ) : (
        <div className="mt-10">
          <h1 className="text-center">
            Are you sure you want to delete your account?
          </h1>
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <button
              onClick={handleDeleteAccount}
              className="cursor-target border border-red-500 hover:bg-red-600 px-4 py-3 rounded-xl w-full disabled:opacity-50"
            >
              Delete Account
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="cursor-target px-4 py-3 rounded-xl w-full bg-red-500 hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function AccountItem({ label, value, onEdit, children }) {
  return (
    <div className="py-3 border-b border-white/10">
      <div className="grid grid-cols-[160px_1fr_auto] items-center gap-3">
        <h2 className="text-gray-400">{label}:</h2>
        <span className="truncate">{value}</span>
        {onEdit && (
          <button
            onClick={onEdit}
            className="cursor-target inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/20 hover:bg-white/10"
          >
            <FaRegEdit size={18} />
            <span className="hidden sm:inline">Edit</span>
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

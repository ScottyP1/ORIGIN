import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { BiMessageSquareAdd } from "react-icons/bi";

import api from "../api/axios";

const AddRepoButton = () => {
  const [toggle, setToggle] = useState(false);
  const [loadingId, setLoadingId] = useState(null);
  const { allRepos, setAllRepos, setUser } = useContext(AuthContext);

  useEffect(() => {}, [allRepos]);

  const handleAdd = async (repo) => {
    setLoadingId(repo.id);
    try {
      const response = await api.post("repos/add/", repo);
      await api.get("activity/sync/");

      setUser((prevUser) => ({
        ...prevUser,
        tracked_repos: [...prevUser.tracked_repos, response.data],
      }));
      setAllRepos((prev) => prev.filter((r) => r.id !== repo.id));
    } catch (e) {
      console.error("Failed to add repo:", e);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="absolute -top-20 right-30">
      <BiMessageSquareAdd
        size={60}
        className="cursor-pointer text-purple-400"
        onClick={() => setToggle(!toggle)}
      />

      {toggle && (
        <div
          className="fixed inset-0 bg-black/[.7] bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setToggle(false)}
        >
          <div
            className=" rounded-lg p-8 max-w-6xl w-full max-h-[70vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal content here */}
            <h2 className="text-white text-3xl mb-4 text-center font-[Mokoto]">
              Select a Repo to Add
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {allRepos && allRepos.length > 0 ? (
                allRepos.map((repo) => (
                  <div
                    key={repo.id}
                    className="cursor-target p-4 border border-gray-600 rounded bg-gray-900 flex flex-col"
                  >
                    <h3 className="text-white font-semibold text-center">
                      {repo.name}
                    </h3>
                    <button
                      disabled={loadingId === repo.id}
                      className={`mt-4 rounded px-4 py-2 font-semibold ${
                        loadingId === repo.id
                          ? "bg-gray-500 cursor-not-allowed"
                          : "bg-[#ADDCF2] text-black hover:bg-[#8bbcd9]"
                      }`}
                      onClick={() => handleAdd(repo)}
                    >
                      {loadingId === repo.id ? "Adding..." : "Add Repo"}
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 ">No repos found</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddRepoButton;

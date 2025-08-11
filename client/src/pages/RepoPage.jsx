import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import AddRepoButton from "../components/AddRepoButton";
import RepoCard from "../components/RepoCard";

export default function RepoPage() {
  const { user, setUser, loading, setAllRepos } = useContext(AuthContext);

  if (loading) return <h1>Loading</h1>;

  return (
    <div className="px-8 md:px-24 py-24 opacity-0 animate-fade-in transition-opacity duration-500 ease-in">
      <div className="flex mb-6 absolute top-50 -right-25">
        <AddRepoButton />
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 overflow-y-auto pr-2"
        style={{
          maxHeight: "calc(100vh - 220px)",
        }}
      >
        {user &&
          user.tracked_repos.map((repo) => (
            <RepoCard
              key={repo.id}
              repo={repo}
              setUser={setUser}
              setAllRepos={setAllRepos}
            />
          ))}
      </div>
      {user.tracked_repos.length < 1 && (
        <h1 className="text-white text-center font-[Mokoto] text-4xl -mt-4">
          No Repos Tracked
        </h1>
      )}
    </div>
  );
}

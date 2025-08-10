import { useState } from "react";
import { Link } from "react-router-dom";
import { PiGearSixLight } from "react-icons/pi";
import api from "../api/axios";
import RepoSettings from "./RepoSettings";

const RepoCard = ({ repo, setUser, setAllRepos }) => {
  const [toggle, setToggle] = useState(false);
  const [removing, setRemoving] = useState(false);

  const refreshAllRepos = async () => {
    try {
      const { data } = await api.get("repos/all/");
      setAllRepos(data);
    } catch (e) {
      console.error("Failed to refresh all repos", e);
    }
  };

  const handleRemove = async () => {
    setRemoving(true);
    try {
      await api.delete(`repos/tracked/${repo.id}/`);
      setUser((prev) => ({
        ...prev,
        tracked_repos: prev.tracked_repos.filter((r) => r.id !== repo.id),
      }));
    } catch (e) {
      console.error(e);
      setRemoving(false);
    }
  };

  return (
    <>
      {toggle && <RepoSettings repo={repo} onClick={() => setToggle(false)} />}
      <div className="cursor-target bg-black/30 border border-white/10 backdrop-blur-md p-5 rounded-xl flex flex-col gap-2 font-[Mokoto] shadow-md hover:border-purple-300 transition duration-300">
        <div className="flex items-center">
          <h1 className="text-white text-lg tracking-wider">{repo.name}</h1>
          <button
            className="ml-auto p-1 rounded hover:bg-white/10"
            onClick={() => setToggle((t) => !t)}
            aria-label="Open settings"
          >
            <PiGearSixLight color="white" size={24} />
          </button>
        </div>

        <div className="text-sm text-gray-400 mt-2 space-y-1">
          <p>Commits: {repo.commit_count}</p>
          <p>PRs: {repo.open_pr_count}</p>
          <p>Issues: {repo.open_issue_count}</p>
        </div>

        <Link
          to={repo.html_url}
          target="_blank"
          className="mt-auto text-sm text-purple-300/[.8] hover:underline text-center"
        >
          [ VIEW ON GITHUB ]
        </Link>

        <button
          className="text-red-500 hover:text-red-400 disabled:opacity-50"
          onClick={handleRemove}
          disabled={removing}
        >
          {removing ? "Removing..." : "Remove"}
        </button>
      </div>
    </>
  );
};

export default RepoCard;

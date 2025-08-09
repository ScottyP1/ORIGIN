import { useEffect, useState } from "react";
import FilterIcon from "../assets/filterIcon.png";

const AlertSummary = ({ user }) => {
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(user.tracked_repos || []);
  }, [user]);

  const handleFilter = (repo) => {
    setData(repo);
  };

  const totalEvents = user?.tracked_repos.reduce(
    (total, repo) => total + (repo.repo_activities.length || 0),
    0
  );

  return (
    <div className="ml-20 relative flex justify-center gap-4 text-white font-[Mokoto]">
      <div className="flex flex-col justify-center items-center text-yellow-400 text-xl">
        <h1>
          Showing {totalEvents || 0} new events across{" "}
          {user.tracked_repos.length || 0} repositories
        </h1>
        <div className="flex gap-4 justify-center">
          <span>[ prs: {user.total_open_prs || 0} ]</span>
          <span>[ commits: {user.total_commits || 0} ]</span>
        </div>
      </div>

      <button
        onClick={() => setToggle(!toggle)}
        className="cursor-pointer hover:scale-95"
      >
        <img src={FilterIcon} width={80} />
      </button>
      {toggle && (
        <div className="border border-white absolute right-0 p-4 rounded-xl flex flex-col justify-center items-center gap-2 bg-black/80 backdrop-blur">
          <h3 className="mb-4">Filter By Repo</h3>
          {data.map((repo) => (
            <button
              key={repo.id}
              className="hover:bg-purple-400 p-4 rounded-xl w-full text-center hover:cursor-pointer"
              onClick={() => handleFilter(repo)}
            >
              {repo.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlertSummary;

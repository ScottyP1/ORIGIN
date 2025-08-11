import { useEffect, useMemo, useState } from "react";
import FilterIcon from "../assets/filterIcon.png";

const AlertSummary = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);

  useEffect(() => {
    setRepos(user?.tracked_repos || []);
  }, [user]);

  // Flatten activities (and carry the repo name for the "all" view)
  const visibleActivities = useMemo(() => {
    if (!user?.tracked_repos?.length) return [];
    if (selectedRepo) {
      return (selectedRepo.repo_activities || []).map((a) => ({
        ...a,
        __repoName: selectedRepo.name,
      }));
    }
    return user.tracked_repos.flatMap((r) =>
      (r?.repo_activities || []).map((a) => ({ ...a, __repoName: r.name }))
    );
  }, [user, selectedRepo]);

  const totalAcrossAll =
    user?.tracked_repos?.reduce(
      (total, repo) => total + (repo?.repo_activities?.length || 0),
      0
    ) || 0;

  return (
    <div className="relative text-white font-[Mokoto]">
      {/* Summary row */}
      <div className="flex flex-col items-center gap-2 text-yellow-400 text-sm sm:text-base text-center px-4">
        <h1 className="leading-snug">
          Showing {visibleActivities.length} events
          {selectedRepo ? (
            <>
              {" "}
              in <span className="text-white">[{selectedRepo.name}]</span>
            </>
          ) : (
            <> across {user?.tracked_repos?.length || 0} repositories</>
          )}
        </h1>
        <div className="flex gap-3 flex-wrap justify-center text-xs sm:text-sm text-white/80">
          <span>[ prs: {user?.total_open_prs || 0} ]</span>
          <span>[ commits: {user?.total_commits || 0} ]</span>
          <span className="hidden xs:inline">[ total: {totalAcrossAll} ]</span>
        </div>

        {/* Filter button */}
        <button
          onClick={() => setIsOpen(true)}
          className="mt-2 inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 backdrop-blur px-4 py-2 active:scale-95 transition"
          aria-label="Filter by repository"
        >
          <img src={FilterIcon} alt="" className="h-6 w-6 mr-2" />
          <span className="tracking-wider">Filter</span>
        </button>

        {selectedRepo && (
          <button
            onClick={() => setSelectedRepo(null)}
            className="mt-1 text-xs underline text-white/70"
          >
            Clear filter
          </button>
        )}
      </div>

      {/* Activities list */}
      <div className="mt-6 mx-auto w-full max-w-4xl px-4">
        {visibleActivities.length === 0 ? (
          <div className="text-center text-white/60 py-8">
            No activity to show.
          </div>
        ) : (
          <ul className="space-y-3">
            {visibleActivities.map((a, i) => (
              <li
                key={a.id ?? `${a.__repoName}-${a.type || "evt"}-${i}`}
                className="rounded-xl border border-white/10 bg-white/5 backdrop-blur px-4 py-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-sm sm:text-base truncate">
                      {a.title || a.message || a.type || "Activity"}
                    </div>
                    <div className="text-[11px] sm:text-xs text-white/60 mt-0.5">
                      {a.__repoName}
                      {a.author ? ` • ${a.author}` : ""}
                      {a.number ? ` • #${a.number}` : ""}
                    </div>
                  </div>
                  <div className="text-[11px] sm:text-xs text-white/60 shrink-0">
                    {a.created_at
                      ? new Date(a.created_at).toLocaleString()
                      : ""}
                  </div>
                </div>
                {a.url && (
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs underline text-blue-300/90 mt-2 inline-block"
                  >
                    View on GitHub
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Filter modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative w-full sm:max-w-md bg-black/85 border border-white/15 rounded-t-2xl sm:rounded-2xl p-4 pt-5">
            <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-white/20 sm:hidden" />
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base sm:text-lg">Filter By Repo</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 text-sm underline"
              >
                Close
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto pr-1">
              {repos.map((repo) => (
                <button
                  key={repo.id}
                  onClick={() => {
                    setSelectedRepo(repo);
                    setIsOpen(false);
                  }}
                  className="w-full text-left rounded-xl px-4 py-3 mb-2 active:scale-98 transition bg-white/5 hover:bg-white/10 border border-white/10"
                  style={{ minHeight: 44 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{repo.name}</span>
                    <span className="text-xs text-white/60">
                      {repo?.repo_activities?.length || 0} events
                    </span>
                  </div>
                </button>
              ))}
              {repos.length === 0 && (
                <p className="text-sm text-white/60 text-center py-6">
                  No repositories found
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertSummary;

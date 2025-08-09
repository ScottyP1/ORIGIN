const RepoSettings = ({ repo, onClick }) => {
  console.log(repo);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="w-[520px] rounded-2xl bg-black/70 p-5 text-white font-[Mokoto]  border border-white">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-center w-full">
            <h1 className="text-2xl">{repo?.name || "Settings"}</h1>
            <p className="text-xs text-gray-300">NOTIFICATIONS</p>
          </div>
          <button
            onClick={onClick}
            className="ml-3 rounded bg-white/10 px-3 py-1"
          >
            Close
          </button>
        </div>
        {repo.notifications}
        {/* Your notification rows here */}
      </div>
    </div>
  );
};

export default RepoSettings;

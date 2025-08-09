const UserStatsPanel = ({ user }) => {
  return (
    <div className="cursor-target bg-black/30 border border-gray-600 rounded-xl backdrop-blur-md p-6 font-[Mokoto] text-white w-full h-[400px] flex flex-col justify-center gap-6 shadow-lg">
      <div className="flex justify-center items-center gap-3">
        <h2 className="text-2xl uppercase">GitHub Status</h2>
        <div
          className={`${
            user?.github_connected ? "bg-green-500" : "bg-red-500"
          }  w-6 h-6 rounded-full animate-pulse`}
        />
      </div>
      {user?.github_connected && (
        <div className="grid grid-cols-2 gap-4 text-lg mt-4 text-center">
          <InfoItem label="User" value={`@${user?.username}`} />
          <InfoItem label="Tracked Repos" value={user?.tracked_repos?.length} />
          <InfoItem label="GitHub Repos" value={user?.total_repos} />
          <InfoItem label="Repo Issues" value={user?.total_open_issues} />
          <InfoItem label="Followers" value={user?.followers || 0} />
          <InfoItem label="Following" value={user?.following || 0} />
        </div>
      )}
    </div>
  );
};

const InfoItem = ({ label, value }) => (
  <div className="text-gray-300">
    <span className="text-gray-500">{label}:</span> {value}
  </div>
);

export default UserStatsPanel;

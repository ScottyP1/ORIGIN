const SkeletonItem = () => (
  <li className="flex flex-col gap-1 animate-pulse">
    <span className="h-4 w-1/3 bg-gray-700 rounded"></span>
    <span className="h-4 w-2/3 bg-gray-700 rounded"></span>
    <span className="h-3 w-1/4 bg-gray-600 rounded"></span>
  </li>
);

const ActivityPanel = ({ data, loading }) => {
  return (
    <div className="cursor-target h-[400px] w-full bg-black/30 border border-gray-600 rounded-xl backdrop-blur-md p-6 font-[Mokoto] text-white overflow-y-auto">
      <h2 className="text-2xl text-white mb-4">Recent GitHub Activity</h2>
      <ul className="space-y-3">
        {loading
          ? Array(5)
              .fill()
              .map((_, i) => <SkeletonItem key={i} />)
          : (data || []).map((item, index) => (
              <li key={index} className="flex flex-col text-sm text-gray-300">
                <span className="text-purple-400">[{item?.repo_name}]</span>
                <span>
                  {item?.type} -{" "}
                  <span className="text-gray-400">{item?.author}</span>
                </span>
                <span className="text-gray-500 text-xs">{item?.time_ago}</span>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default ActivityPanel;

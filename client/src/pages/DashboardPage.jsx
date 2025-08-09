import { useContext } from "react";
import { useLoaderData } from "react-router-dom";

import ActivityPanel from "../components/ActivityPanel";
import StatCard from "../components/StatCard";
import UserStatsPanel from "../components/UserStatsPanel";

import { AuthContext } from "../context/AuthContext";

export default function DashBoardPage() {
  const { user, loading } = useContext(AuthContext);
  const activityData = useLoaderData();

  if (loading) return <h1>Loading</h1>;

  return (
    <div className="opacity-0 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8 py-6">
        <UserStatsPanel user={user} />
        <ActivityPanel data={activityData} loading={loading} />
      </div>

      <div className="grid grid-cols-3 gap-8 px-8 mt-8">
        <StatCard title="Total Commits" value={user?.total_commits} />
        <StatCard title="Open PRs" value={user?.total_open_prs} />
        <StatCard title="Open Issues" value={user?.total_open_issues} />
      </div>
    </div>
  );
}

import { redirect } from "react-router-dom";
import api from "../api/axios";

export async function DashBoardLoader() {
  const token = localStorage.getItem("access");

  if (!token) {
    return redirect("/");
  }

  try {
    const user = await api.get("auth/user/");
    if (user.data.github_connected) {
      await api.get("activity/sync/");
      const response = await api.get("activity/recent/");

      return response.data;
    }
    return null;
  } catch (err) {
    console.error("Failed to load activity:", err);
    return [];
  }
}

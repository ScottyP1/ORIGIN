import { redirect } from "react-router-dom";

export function IndexLoader() {
  const token = localStorage.getItem("access");

  if (token) {
    return redirect("/dashboard");
  }

  return null;
}

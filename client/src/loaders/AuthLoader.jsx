import { redirect } from "react-router-dom";

export function AuthLoader() {
  const token = localStorage.getItem("access");

  if (!token) {
    return redirect("/");
  }
}

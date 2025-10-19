import { pb } from "@/api/pocketbase";
import { useUser } from "@/helpers/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function index() {
  const [user] = useUser();
  const nav = useNavigate();
  useEffect(() => {
    if (!user) {
      nav("/auth/login");
    }
  }, [user]);
  if (!user) return;
  return (
    <div className="container mx-auto min-h-screen">
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}

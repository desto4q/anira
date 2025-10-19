import { pb } from "@/api/pocketbase";

export default function index() {
  const user = pb.authStore.record;
  return <div>{JSON.stringify(user)}</div>;
}

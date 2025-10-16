import TestPlayer from "@/components/TestPlayer.client";
import { Suspense } from "react";

export default function index() {
  return (
    <div className="container mx-auto">
      <Suspense fallback={<>loading</>}>
        <TestPlayer />
      </Suspense>
    </div>
  );
}

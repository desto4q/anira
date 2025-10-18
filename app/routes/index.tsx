import Hero from "@/components/Hero";
import Trending from "@/components/Trending";
import type { MetaFunction } from "react-router";
import { ClientOnly } from "remix-utils/client-only";
export const meta: MetaFunction = () => {
  return [
    { title: "Aniraa" },
    {
      name: "Aniraa",
      // content: "This is an example page",
    },
  ];
};
export default function index() {
  return (
    <div>
      <ClientOnly>{() => <Hero />}</ClientOnly>
      <Trending />
    </div>
  );
}

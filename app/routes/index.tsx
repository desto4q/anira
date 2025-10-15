import Hero from "@/components/Hero";
import Trending from "@/components/Trending";
import { ClientOnly } from "remix-utils/client-only";
export default function index() {
  return (
    <div>
      <ClientOnly>{() => <Hero />}</ClientOnly>
      <Trending />
    </div>
  );
}

import Card from "@/components/Card";
import type { TV_INFO_INTERFACE } from "@/constants";

export default function TvRelatedShows({
  shows,
}: {
  shows: TV_INFO_INTERFACE["relatedAnime"];
}) {
  return (
    <div className="mt-4 p-4 bg-base-200">
      <div className="text-xl font-bold mb-4">Related Shows</div>
      <div className="p-2 grid-cols-[repeat(auto-fill,minmax(150px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] grid gap-4 rounded-md">
        {shows.map((show) => {
          return <Card post={show} key={show.id} />;
        })}
      </div>
    </div>
  );
}

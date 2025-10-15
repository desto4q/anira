import type { TV_INFO_INTERFACE } from "@/constants";
import { AudioLinesIcon, Subtitles } from "lucide-react";

export default function TvRecommendations({
  items,
}: {
  items: TV_INFO_INTERFACE["recommendations"];
}) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Recommendations</h2>
      <div className="space-y-4 ">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex bg-base-100 shadow-xl hover:shadow-2xl transition duration-200"
          >
            <figure className="h-22 aspect-[9/12] flex-shrink-0">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="ml-2 h-20 flex flex-col justify-center">
              <h3 className="font-bold text-sm line-clamp-1 h-[1lh]">
                {item.title}
              </h3>
              <div className="text-sm text-base-content/80 space-x-2 mt-1">
                <div className="badge badge-soft badge-primary badge-sm">
                  {item.type}
                </div>
                <span className="text-xs">{item.duration}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs label">
                  Episodes: <span className="font-medium">{item.episodes}</span>
                </span>
                <div className="join">
                  <div className="join-item badge badge-primary badge-soft badge-xs">
                    <Subtitles />
                    {item.sub && (
                      <span className="text-success">{item.sub}</span>
                    )}
                  </div>
                  <div className="join-item badge badge-accent badge-soft badge-xs">
                    <AudioLinesIcon />
                    {item.sub && (
                      <span className="text-success">{item.dub}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

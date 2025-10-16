import type { QUERY_RESULTS } from "@/constants";
import { Mic, SubtitlesIcon } from "lucide-react";
import { Link } from "react-router";

export default function Card({ post }: { post: QUERY_RESULTS }) {
  const type = "tv";
  // post.type === "Movie" || post.type === "Special" ? "movie" : "tv";
  const link = `/${type}/${post.id}/info`;

  return (
    <div>
      <Link
        //@ts-ignore
        to={link}
        key={post.id}
        className="card card-compact group bg-base-300 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
      >
        <figure className="relative aspect-[9/12] overflow-hidden">
          <img
            loading="lazy"
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="badge badge-primary absolute right-2 top-2">
            {post.type}
          </div>
        </figure>
        <div className="card-body p-3">
          <h2 className="card-title text-sm font-semibold line-clamp-2 h-[2lh]">
            {post.title}
          </h2>
          {/*<p>{post.nsfw && <>true</>}</p>*/}
          <div className="mt-auto flex items-center justify-between pt-2 text-xs text-base-content/70">
            <span>{post.duration || `${post.episodes} eps`}</span>
            <div className="flex gap-2">
              {post.sub > 0 && (
                <div className="badge badge-primary badge-soft">
                  Sub
                  {/*<SubtitlesIcon></SubtitlesIcon>*/}
                </div>
              )}
              {post.dub > 0 && (
                <div className="badge badge-accent badge-soft">
                  {/*<Mic />*/}Dub
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

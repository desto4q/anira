import { pb } from "@/api/pocketbase";
import GridContainer from "@/components/GridContainer";
import { useUser } from "@/helpers/hooks";
import type { WatchHistory } from "@/helpers/types";
import { useQuery } from "@tanstack/react-query";
import type { ListResult } from "pocketbase";
import { Link } from "react-router";

export default function WatchHistory() {
  const [user] = useUser();
  const query = useQuery<ListResult<WatchHistory>>({
    queryKey: ["watchHistory", user?.id],
    queryFn: async () => {
      let resp = await pb.collection("history").getList<WatchHistory>(1, 10);
      return resp;
    },
    enabled: !!user,
  });
  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl text-base-content">
        Please log in to view your watch history.
      </div>
    );
  if (query.isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  if (query.isError)
    return (
      <div className="min-h-screen flex items-center justify-center text-error text-2xl">
        Error loading watch history.
      </div>
    );
  if (!query.data?.items || query.data.items.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl text-base-content">
        No watch history found.
      </div>
    );

  return (
    <GridContainer>
      {query.data?.items.map((item) => (
        <div
          key={item.id}
          className="card card-compact w-full bg-base-100 shadow-xl image-full transition-transform duration-300 hover:scale-105 group"
        >
          <figure className="relative overflow-hidden rounded-box">
            <img
              src={item.img_url}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              alt={item.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-base-300 via-transparent to-transparent opacity-70"></div>
          </figure>
          <div className="card-body justify-end p-4 relative z-10">
            <Link to={`/tv/${item.info_id}/info`}>
              <h2 className="card-title text-base-content text-lg md:text-xl line-clamp-2">
                {item.title}
              </h2>
              <p className="text-base-content text-sm md:text-base opacity-90">
                Episode: {item.episode_number}
              </p>
            </Link>
            <div className="card-actions justify-end mt-2">
              <Link
                to={item.url}
                className="btn btn-primary btn-sm md:btn-md transition-all duration-300 group-hover:btn-accent"
              >
                Continue Watching
              </Link>
            </div>
          </div>
        </div>
      ))}
    </GridContainer>
  );
}

import { client } from "@/api/client";
import type { TV_INFO_INTERFACE } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import TvRecommendations from "../../../_components/Recommendations";
import TvSkeleton from "../../../_components/Skeleton";
import TvEpisodesList from "../../../_components/TvEpisodesList";
import TvWatchSkeleton from "../../../_components/TvWatchSkeleton";
import TvDetails from "../../../_components/TvDetails";
import SimplePlayer from "@/components/VideoPlayer.client";
import { useParams } from "react-router";
import { ClientOnly } from "remix-utils/client-only";
import { useTimer } from "use-timer";
import { useEffect } from "react";
import { pb } from "@/api/pocketbase";
import type { HistoryModel } from "@/helpers/types";
import { useUser } from "@/helpers/hooks";
import { toast } from "sonner";

export default function index() {
  const { id, episode, number } = useParams();
  const [user] = useUser();

  const query = useQuery<TV_INFO_INTERFACE>({
    queryKey: [id],
    queryFn: async () => {
      let resp = await client.get("info", {
        params: {
          id,
        },
      });
      return resp.data;
    },
  });

  if (query.isLoading) return <TvWatchSkeleton />;

  const tv_data = query.data;
  const clean = id.replace(/-\d+$/, "").replace(/-/g, " ");
  return (
    <div className="">
      <div className="container mx-auto flex gap-2">
        <div className="flex-1 ">
          <div className=" p-4 rounded-md mb-4 bg-base-200">
            <span>Watch:</span> {clean} Episode:{number}
          </div>
          <div className="w-full  ">
            <ClientOnly fallback={<>loading player</>}>
              {() => <SimplePlayer />}
            </ClientOnly>
            {/*<iframe
              src={`https://megaplay.buzz/stream/s-2/${episode}/sub`}
              width="100%"
              height="100%"
            ></iframe>*/}
          </div>
          <TvEpisodesList episodes={tv_data.episodes || []} />
          <TvDetails info={tv_data} />
        </div>
        <div className="flex-1 hidden lg:block max-w-xs bg-base-200">
          <TvRecommendations items={tv_data?.recommendations} />
        </div>
        {/*{id}
        {episode}*/}
      </div>
    </div>
  );
}

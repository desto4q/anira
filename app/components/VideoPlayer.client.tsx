import { client } from "@/api/client";
import type { STREAM_RESPONSE } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useParams } from "react-router";
import videojs from "video.js";
import "@videojs/http-streaming";
import "video.js/dist/video-js.css";
import "videojs-hls-quality-selector/src/plugin";
import DownloadLinks from "./DownloadLinks";

export default function SimplePlayer() {
  const { id, episode } = useParams();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<any>(null);

  const episode_link = id + "$episode$" + episode;
  const query = useQuery<STREAM_RESPONSE>({
    queryKey: ["episode", episode_link],
    queryFn: async () => {
      let resp = await client.get("https://yuma-anime-api.vercel.app/watch", {
        params: {
          episodeId: episode_link,
        },
      });
      return resp.data;
    },
  });

  const stream = query.data;

  useEffect(() => {
    if (!containerRef.current || !stream?.sources?.length) return;

    // Find the highest quality HLS source
    const hlsSource =
      stream.sources.find((source) => source.isM3U8) || stream.sources[0];

    if (!playerRef.current) {
      // Create video element programmatically
      const videoElement = document.createElement("video");
      videoElement.className = "video-js vjs-default-skin w-full h-full";
      containerRef.current.appendChild(videoElement);

      playerRef.current = videojs(videoElement, {
        autoplay: false,
        controls: true,
        fluid: true,
        responsive: true,
        preload: "auto",
        sources: [
          {
            src: `/stream?url=${encodeURIComponent(hlsSource.url)}`,
            type: "application/x-mpegURL",
          },
        ],
      });

      // Enable quality selector plugin
      playerRef.current.ready(() => {
        if (playerRef.current.hlsQualitySelector) {
          playerRef.current.hlsQualitySelector({
            displayCurrentQuality: true,
          });
        }
      });
    } else {
      const player = playerRef.current;
      player.src({
        src: hlsSource.url,
        type: "application/x-mpegURL",
      });
    }

    return () => {
      if (playerRef.current && !playerRef.current.isDisposed()) {
        try {
          playerRef.current.dispose();
        } catch (error) {
          console.warn("Error disposing video.js player:", error);
        }
        playerRef.current = null;
      }
    };
  }, [stream]);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (playerRef.current && !playerRef.current.isDisposed()) {
        try {
          playerRef.current.dispose();
        } catch (error) {
          console.warn("Error disposing video.js player on unmount:", error);
        }
        playerRef.current = null;
      }
    };
  }, []);

  if (query.isLoading)
    return (
      <div className="flex-1 bg-base-200 aspect-video grid place-items-center">
        <div>
          <span className="loading loading-spinner"></span>Loading
        </div>
      </div>
    );

  return (
    <div className="flex-1">
      <div className="aspect-video" ref={containerRef}></div>
      <DownloadLinks data={stream} />
    </div>
  );
}

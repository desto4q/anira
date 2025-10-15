import { client } from "@/api/client";
import type { API_RESULTS, SPOTLIGHT_RESULT } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import {
  Bike,
  Calendar1Icon,
  Mic2Icon,
  MoveLeft,
  MoveRight,
  PlayIcon,
  SubtitlesIcon,
  TimerIcon,
} from "lucide-react";
import BackgroundGrid from "./BackgrounGrid";
import Autoplay from "embla-carousel-autoplay";

interface RESULTS extends API_RESULTS<SPOTLIGHT_RESULT> {}

export default function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const query = useQuery<RESULTS>({
    queryKey: ["top-airing"],
    queryFn: async () => {
      let response = await client.get(`spotlight`);
      let data = await response.data;
      return data;
    },
  });

  const trending_items = query.data?.results;

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  // useEffect(() => {
  //   if (!emblaApi) return;
  //   onSelect();
  //   emblaApi.on("select", onSelect);
  // }, [emblaApi, onSelect]);

  // useEffect(() => {
  //   if (emblaApi && trending_items && trending_items.length > 0) {
  //     const intervalId = setInterval(() => {
  //       emblaApi.scrollNext();
  //     }, 5000);

  //     return () => clearInterval(intervalId);
  //   }
  // }, [emblaApi, trending_items]);

  if (query.isLoading) {
    return (
      <div className="bg-base-200 place-items-center grid h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (query.isError || !trending_items || trending_items.length === 0) {
    return (
      <div className="bg-base-200 place-items-center grid h-screen">
        <div className="text-error">Failed to load trending items.</div>
      </div>
    );
  }
  const current_item = trending_items[selectedIndex];

  return (
    <div className=" flex px-3 md:px-0  h-[calc(100dvh-100px)]">
      <div className=" mx-auto flex flex-1  rounded-md isolate  ">
        <BackgroundGrid />
        <div className="relative flex-1  flex">
          <div className="absolute right-0 z-20 flex gap-2 p-2">
            <button
              onClick={() => emblaApi?.scrollPrev()}
              className="btn btn-square btn-lg"
            >
              <MoveLeft />
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              className="btn btn-square btn-lg"
            >
              <MoveRight />
            </button>
          </div>
          <section
            className="embla flex-1 bg-base-200 shadow-2xl rounded-xl overflow-hidden flex "
            ref={emblaRef}
          >
            <div className="embla__container flex-1">
              {query.data?.results.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="embla__slide  flex   flex-1 relative"
                  >
                    <div className="flex-1 flex  relative">
                      <div className="bg-gradient-to-t from-base-100 to-base-100 via-base-200/20 absolute size-full"></div>
                      <img
                        loading="lazy"
                        src={item.banner}
                        className="object-cover flex-1  "
                        alt=""
                      />
                    </div>
                    <div className="absolute bottom-0 h-full w-full max-w-3xl pb-12 bg-gradient-to-r via-base-200 from-base-200  p-4 space-y-6 pl-12 grid place-content-end-safe via-70%">
                      <p className="text-xl font-bold text-primary">
                        Spotlight #{item.rank}
                      </p>
                      <h2 className="text-4xl font-bold">{item.title}</h2>
                      <div className=" flex gap-4">
                        <span className="flex gap-2 items-center">
                          <PlayIcon />
                          {item.type}
                        </span>
                        <span className="flex gap-2 items-center">
                          {" "}
                          <TimerIcon />
                          {item.duration}
                        </span>
                        <span className="badge badge-accent badge-soft">
                          {item.quality}
                        </span>
                        <span className="flex gap-2 items-center">
                          <Calendar1Icon />
                          {item.releaseDate}
                        </span>
                        <span className="join">
                          <span className="badge join-item badge-primary">
                            <SubtitlesIcon />
                            {item.sub}
                          </span>
                          <span className="badge join-item badge-accent">
                            <Mic2Icon />
                            {item.dub}
                          </span>
                        </span>
                      </div>
                      <p className=" line-clamp-3 overflow-ellipsis">
                        {item.description}
                      </p>

                      <div className="space-x-2">
                        <button className="btn btn-primary">Watch Now</button>
                        <button className="btn btn-soft btn-accent">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

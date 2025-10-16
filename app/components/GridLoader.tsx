import type { PropsWithChildren } from "react";
import SimplePaginator from "./SimplePaginator";
import GridSearchBar from "./GridSearchBar";
import SkeletonCard from "./SkeletonCard";
interface GridContainerProps {
  children?: React.ReactNode;
  title?: string;
  searchBar?: boolean;
  totalPages?: number;
}

export default function GridLoader(props: GridContainerProps) {
  const arr = Array.from({ length: 20 }).fill(null);
  return (
    <div className="">
      <div className="flex items-center ">
        {props?.title?.trim() && (
          <h2 className="text-xl font-bold">{props.title}</h2>
        )}
        {props.searchBar && (
          <div className="ml-auto">
            <GridSearchBar />
          </div>
        )}
      </div>
      <section className="mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {arr.map((_, index) => (
          <SkeletonCard />
        ))}
      </section>
      <div className="mt-8 mb-20 grid place-items-center">
        <SimplePaginator totalPage={props.totalPages} />
      </div>
    </div>
  );
}

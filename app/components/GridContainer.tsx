import type { PropsWithChildren } from "react";
import SimplePaginator from "./SimplePaginator";
import GridSearchBar from "./GridSearchBar";
interface GridContainerProps {
  children: React.ReactNode;
  title?: string;
  searchBar?: boolean;
  totalPages?: number;
}

export default function GridContainer(props: GridContainerProps) {
  return (
    <div className="px-3 md:px-0">
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
      <section className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2">
        {props.children}
      </section>
      <div className="mt-8 mb-20 grid place-items-center">
        <SimplePaginator totalPage={props.totalPages} />
      </div>
    </div>
  );
}

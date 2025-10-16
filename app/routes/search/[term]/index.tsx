import { client } from "@/api/client";
import Card from "@/components/Card";
import GridContainer from "@/components/GridContainer";
import SkeletonCard from "@/components/SkeletonCard";
import type { API_RESULTS, QUERY_RESULTS } from "@/constants";
import { usePagination } from "@/helpers/hooks";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export default function index() {
  const { term } = useParams<string>();
  const { currentPage } = usePagination();
  const query = useQuery<API_RESULTS<QUERY_RESULTS>>({
    queryKey: ["search", term, currentPage],
    queryFn: async () => {
      const response = await client.get(`/${term}`, {
        params: {
          page: currentPage,
        },
      });
      return response.data;
    },
  });
  const temp_arr = Array.from({ length: 10 }, (_, i) => i + 1);
  if (query.isLoading)
    return (
      <div className="mx-auto container mt-4">
        <div className="p-4 text-xl font-bold bg-base-200">
          Loading Results for "{term}"
        </div>
        <GridContainer>
          {temp_arr.map((item) => {
            return <SkeletonCard key={item} />;
          })}
        </GridContainer>
      </div>
    );

  return (
    <div>
      <div className="container mx-auto mt-4">
        <div className="p-4 text-xl font-bold bg-base-200">
          Search Results for "{term}"
        </div>
        <GridContainer totalPages={query.data.totalPages}>
          {query.data.results.map((item) => {
            return <Card post={item} key={item.id} />;
          })}
        </GridContainer>
      </div>
      sss <>s</>
    </div>
  );
}

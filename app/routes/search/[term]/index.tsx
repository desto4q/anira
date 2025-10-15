import { client } from "@/api/client";
import Card from "@/components/Card";
import GridContainer from "@/components/GridContainer";
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

  if (query.isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="container mx-auto">
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

import { client } from "@/api/client";
import BackgroundGrid from "@/components/BackgrounGrid";
import Card from "@/components/Card";
import GridContainer from "@/components/GridContainer";
import GridLoader from "@/components/GridLoader";
import MainLayout from "@/components/layouts/MainLayout";
import SimpleContainer from "@/components/SimpleContainer";
import type { API_RESULTS, QUERY_RESULTS } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export default function index() {
  const query = useQuery<API_RESULTS<QUERY_RESULTS>, AxiosError>({
    queryKey: ["category", "movies"],
    queryFn: async () => {
      let resp = await client.get("/movies");
      return resp.data;
    },
  });

  if (query.isLoading) {
    return (
      <MainLayout>
        <GridLoader />
      </MainLayout>
    );
  }
  const results = query.data.results;
  return (
    <div className="container mx-auto">
      <BackgroundGrid />
      <div>{/*<h2 className="">category: Movies</h2>*/}</div>
      <MainLayout>
        <GridContainer title="Category: Movies">
          {results.map((item, _) => (
            <Card post={item} />
          ))}
        </GridContainer>
      </MainLayout>
      {/*<div className="">
        {
          <GridContainer title="Category: Movies">
            {results.map((item, _) => (
              <Card post={item} />
            ))}
          </GridContainer>
        }
      </div>*/}
    </div>
  );
}

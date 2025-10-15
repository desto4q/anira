import NavBar from "@/components/NavBar";
import { Outlet, ScrollRestoration } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});
export default function layout() {
  return (
    <>
      <QueryClientProvider client={client}>
        <ScrollRestoration />
        <Toaster richColors position="top-right" />
        <NavBar />
        <Outlet />
      </QueryClientProvider>
    </>
  );
}

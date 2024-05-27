import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {
  QueryClient as BaseQueryClient,
  InvalidateOptions,
  InvalidateQueryFilters,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { broadcastQueryClient } from "./broadcast-query-client.ts";

class QueryClient extends BaseQueryClient {
  constructor() {
    super();
  }

  invalidateQueries(
    filters: InvalidateQueryFilters = {},
    options: InvalidateOptions = {}
  ) {
    // if we don't have an observer for this querykey...
    if (filters.queryKey) {
      const q = this.getQueryCache().find({ queryKey: filters.queryKey });
      if (!q || !q.observers.length) {
        // ...then we need to notify the mutation cache that the query is invalidated
        this.getQueryCache().notify({
          type: "invalidated",
          query: {
            options: { queryKey: filters },
          },
        } as any);
      }
    }

    return super.invalidateQueries(filters, options);
  }
}

export const queryClient = new QueryClient();

broadcastQueryClient({
  queryClient,
  broadcastChannel: "example_channel",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

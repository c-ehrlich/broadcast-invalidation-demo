import { useState } from "react";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { queryClient } from "./main";

const timeQuery = queryOptions({
  queryKey: ["time"],
  queryFn: async () => {
    console.log("fetching time");

    await new Promise((resolve) => setTimeout(resolve, 2000));

    return { time: new Date().toISOString() };
  },
  staleTime: 1000,
  gcTime: 3000,
});

function App() {
  const [renderQuery, setRenderQuery] = useState(true);

  return (
    <div>
      <h1>after</h1>
      <button onClick={() => queryClient.invalidateQueries(timeQuery)}>
        invalidate
      </button>

      <div style={{ border: "1px solid black", padding: "8px" }}>
        <h3>useQuery</h3>
        <button onClick={() => setRenderQuery((s) => !s)}>
          {renderQuery ? "hide" : "show"}
        </button>
        {renderQuery && <Query />}
      </div>
    </div>
  );
}

function Query() {
  const query = useQuery(timeQuery);

  return (
    <div>
      <pre>{query.data ? JSON.stringify(query.data.time) : "loading..."}</pre>
    </div>
  );
}

export default App;

# Instructions to replicate

## Current state
- `cd ./before`, `pnpm i`, `pnpm dev`
- open two windows of `localhost:5173` and open RQ devtools
- invalidation across tabs will work
- hide the query in one tab, see in devtools that the query is removed in both tabs - invalidation across tabs no longer works
- show the query again, invalidation across tabs will still be broken even though the query has an observer in both tabs again

## My (bad) fix
- `cd ./after`, `pnpm i`, `pnpm dev`
- same as above, but the query will now no longer be removed from the tab that needs it, and invalidation will continue to work across tabs
- see diff: https://github.com/c-ehrlich/broadcast-invalidation-demo/commit/e2133b9bb01876d31d9b259933b212002becd705 (the initial version of broadcast-query-client is just copy pasted from `@tanstack/query-broadcast-client-experimental@5.38.0`)
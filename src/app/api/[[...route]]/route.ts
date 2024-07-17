import { Hono } from "hono"
import { handle } from "hono/vercel"

import work from "./work"

export const runtime = "edge"

const app = new Hono().basePath("/api")

app.notFound((c) => {  
  return c.text('Custom 404 msg', 404)
})

app.post('/post', (c) => c.text('Created!', 201))



const routes = app
  .route("/work", work)

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);


export type AppType = typeof routes;
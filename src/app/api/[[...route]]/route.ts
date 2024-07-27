import { Hono } from "hono"
import { handle } from "hono/vercel"

export const runtime = "edge"

const app = new Hono().basePath("/")

app.notFound((c) => {  
  return c.text('Custom 404 msg', 404)
})

app.post('/post', (c) => c.text('Created!', 201))



const routes = app
  

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);


export type AppType = typeof routes;
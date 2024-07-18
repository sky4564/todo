import { Hono } from 'hono'
import { db } from "../../../../db/drizzle"
import { work } from "../../../../db/schema"



import { z } from "zod"
import { zValidator } from "@hono/zod-validator";

const app = new Hono()



app.get('/', (c) => c.json('list work'))



app.post(
  '/:todo',

  zValidator(
    'form',
    z.object({
      todo: z.string()
    })
  ),

  async (c) => {
    const data = await db.insert(work).values({
      todo: c.req.param('todo')
    })

    return c.json(
      {
        ok: true,
        msg: `insert data to db == ${c.req.param('todo')}`
      },
      201
    )

  }

)



app.get('/:id', (c) => c.json(`get ${c.req.param('id')}`))

export default app
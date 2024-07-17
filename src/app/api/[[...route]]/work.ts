import { Hono } from 'hono'
import { db } from "../../../../db/drizzle"
import { work } from "../../../../db/schema"

const app = new Hono()



app.get('/', (c) => c.json('list work'))
app.post('/', (c) => c.json('create an work', 201))
app.post('/:todo',
  async (c) => {
    const data = await db.insert(work).values({
      todo: c.req.param('todo')
    }).returning()
    return c.json(`insert data to db == ${c.req.param('todo')}`, 201)
  }
)



app.get('/:id', (c) => c.json(`get ${c.req.param('id')}`))

export default app
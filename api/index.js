import { Hono } from 'hono';

const app = new Hono();

app.get('/api', (c) => {
  return c.text('hi');
})

app.get('/api/products', async (c) => {
  let { results } = await c.env.DB.prepare("SELECT * FROM products").all()
  return c.json(results)
})

app.post('/api/products', async (c) => {
  const input = await c.req.json()
  const query = `INSERT INTO products(name,price) values ("${input.name}","${input.price}")`
  const newData = await c.env.DB.exec(query)
  return c.json(newData)
})

app.get('/api/products/:id', async (c) => {
  const id = c.req.param('id')
  let { results } = await c.env.DB.prepare('SELECT * FROM products WHERE id = ?').bind(id).all()
  return c.json(results[0])
})

app.put('/api/products/:id', async (c) => {
  const id = c.req.param('id')

  const input = await c.req.json()
  const query = `UPDATE products SET name = "${input.name}", price = "${input.price}" WHERE id = "${id}"`
  const data = await c.env.DB.exec(query)

  return c.json(data)
})

app.delete('/api/products/:id', async (c) => {
  const id = c.req.param('id')

  const query = `DELETE FROM products WHERE id = "${id}"`
  const data = await c.env.DB.exec(query)

  return c.json(data)
})

app.get('*', (c) => c.env.ASSETS.fetch(c.req.raw));

export default app;

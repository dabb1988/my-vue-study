import Koa from 'koa'
const app = new Koa()
const m = (c) => {
  c.response.type = "type"
  c.response.body = "<p>Hello world</p>"
}

app.use(m)
app.listen(3000)
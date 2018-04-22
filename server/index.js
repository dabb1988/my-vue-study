import Koa from 'koa'
// koa1 generator
// koa2 aysnc await
import Async from './demos/async'


const app = new Koa()
const m = (c) => {
  c.response.type = "type"
  c.response.body = "<p>Hello world</p>"
} 

// console.log(Async.eventDemo())
// 

app.use(m)
app.listen(3000)
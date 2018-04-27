import Koa from 'koa'
import fs from 'fs'
import path from 'path'
import Static from 'koa-static'

// koa1 generator
// koa2 aysnc await
import Async from './demos/async'
import router from './routes/'

const app = new Koa()
// 静态资源，join可以支持../
const main = Static(path.join(__dirname, "../assets/"))


app
  .use(main)
  .use(router.routes())
  .use(router.allowedMethods())

// const main = async (c) => {
//   console.log(c.request.path)
//   if (c.request.path !== "/") {
//     c.response.type = "html"
//     c.response.body = '<a href="/">index page</a>'
//   } else {
//     c.response.body = '<h1>index</h1>'
//   }
//   // c.response.type = "html"
//   // c.response.body = fs.createReadStream('./template/index.html', {start:20,end:100})
// } 
// app.use(main)



// console.log(Async.eventDemo())
// console.log(Async.promiseDemo())
// var all = Async.yieldFn()
// all.next().value.then(function(data){
//   console.log(data.toString())
// })
// all.next().value.then(function(data){
//   console.log(data.toString())
// })




// app.use(async (ctx, next) => {
//   const start = Date.now()
//   console.log('1.1')
//   await next()
//   console.log('1.2')
//   const ms = Date.now() - start
//   ctx.set('X-Response-Time', `10ms`)
// })

// app.use(async (ctx, next) => {
//   const start = Date.now()
//   console.log('2.1')
//   await next()
//   console.log('2.2')
//   const ms = Date.now() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}`)
// })

// app.use(async ctx => {
//   console.log(3)
//   ctx.response.type = "html"
//   ctx.response.body = fs.createReadStream('./template/index.html', {start:20,end:100})
// })


app.listen(3000)
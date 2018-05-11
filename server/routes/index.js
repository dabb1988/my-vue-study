import Router from 'koa-router'
import pathToRegExp from 'path-to-regexp'
import md5 from 'blueimp-md5'
import sha1 from 'js-sha1'

const router = new Router({
	prefix: '/active'
})

const newsIndex = (ctx, next) => {
  ctx.response.type = "html"
  ctx.response.body = "new index"
}

const news = (ctx, next) => {
  var reg = pathToRegExp('/news/:newsid')
  const urlArray = reg.exec(ctx.request.path)
  ctx.response.type = "html"
  ctx.response.body = urlArray[1]
}


// *不能处理hash模式
// * get post put del all
router
  .get("/a", (ctx, next) => {
    console.log(ctx.request)
    ctx.response.type = "html"
    ctx.response.body = ctx.request.href + "<br />" +
                        ctx.request.host + "<br />" +
                        ctx.request.hostname + "<br />" +
                        ctx.request.path + "<br />" +
                        ctx.request.querystring + "<br />" +
                        ctx.request.ip + "<br />"
  })
  .get("/user/*", (ctx, next) => {
    var reg = pathToRegExp('/user/:id/:a')
    console.log(reg)
    console.log(reg.exec(ctx.request.path))

    ctx.response.type = "html"
    ctx.response.body = reg.toString()
  })
  .get("/news", newsIndex)  
  .get("/news/*", news)
  .get("/index*", (ctx, next) => {
    // 重定向
    ctx.response.redirect('news/1111')
  })
  .get("/", (ctx, next) => {
    const {signature, echostr, timestamp, nonce} = ctx.request.query

    let array = [nonce , timestamp , "ajia945"]
    array = array.sort()
    const sha1_str = sha1(array[0]+array[1]+array[2]) 
    if (sha1_str === signature) {
      ctx.response.type = "text"
      ctx.response.body = echostr
    } else {
      ctx.response.type = "text"
      ctx.response.body = "!!!"
    }
  })
  .post("/api/xhr", (ctx, next) => {
    console.log(ctx.request)
    console.log(ctx.request.body)
    console.log(ctx.request.body.name)

    ctx.response.type = "json",
    ctx.response.body = {
      msg: 'haha',
      code: "0"
    }
  })
  .get("*", (ctx, next) => {
    ctx.response.type = "html",
    ctx.response.body = "<h1>404</h1>"
  })


export default router
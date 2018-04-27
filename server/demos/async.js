// 回调
// 事件监听
// promise
// yield function*
// async await
import path from 'path'
import events from 'events'
import util from '../../common/utils/index.js'

const Async = Object.create(null)
// #事件监听
Async.eventDemo = () => {
  const obj = new events.EventEmitter()
  obj.addListener("look", function(){
  console.log("你愁啥")
})
  obj.emit("look")
}
// #Promise
Async.promiseDemo = () => {
  util.readFile(path.resolve(__dirname + "/a.txt")).then(function(success){
    console.log("successa:")
    console.log(success)
  })

  util.readFile(path.resolve(__dirname + "/b.txt")).then(function(success){
    console.log("successb:")
    console.log(success)
  })
}
// #yield function*  ES7
Async.yieldFn = function* (){
  const fa = yield util.readFile(path.resolve(__dirname + "/a.txt"))
  const fb = yield util.readFile(path.resolve(__dirname + "/b.txt"))
}

Async.d


export default Async
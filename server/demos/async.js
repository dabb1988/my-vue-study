// 回调
// 事件监听
// promise
// yield function*
// async await
import path from 'path'

let Async = Object.create(null)

// *事件监听
import events from 'events'
const obj = new events.EventEmitter()
obj.addListener("look", function(){
  console.log("你愁啥")
})

Async.eventDemo = () => {
  obj.emit("look")
}

import fs from 'fs'
console.log(__dirname)
fs.readFile(path.resolve(__dirname + "/a.txt"), function(err, data){
  if (err) return console.error(err)
  const ss = data
  console.log('hello world' + data)
})


export default Async
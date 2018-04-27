import fs from 'fs'

const util = {}

util.readFile = (fileUrl) => {
  // promise 等待（pending）、已完成（fulfilled）、已拒绝（rejected）
  const promise = new Promise(function(resolve, reject){
    fs.readFile(fileUrl, function(err, data){
      if (err) return console.error(err)
      const txt = data.toString()
      if (txt.length > 0) {
        resolve(txt)
      } else {
        reject(txt)
      }
    })
  })
  return promise
}

export default util
# 实现Promise.all

```javascript
function myPromiseAll(promises) {
  if (!Array.isArray(promises)) {
    throw new TypeError('promises must be an array');
  }
  if (promises.length === 0) {
    return Promise.resolve([]);
  }
  return new Promise((resolve, reject) => {
    let result = []
    for (let i = 0; i< promises.length; i += 1) {
      const currentPromise = promises[i]
      currentPromise.then((res) => {
        // 按顺序保存结果
        result[i] = res
        // 当所有promise都执行完毕时，resolve
        if (result.length === promises.length) {
          resolve(result)
        }
      }).catch((err) => {
        // 有一个promise失败，就reject
        reject(err)
      }) 
    }
  })
}
  
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p1')
  }, 1000)
})
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p2')
  }, 2000)
})
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p3')
  }, 3000)
})
myPromiseAll([p1, p2, p3]).then((res) => {
  console.log(res)
}).catch((err) => {
  console.log(err)
})
```

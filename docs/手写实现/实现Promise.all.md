# 实现Promise.all

`Promise.all` 方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。所有子 Promise 都成功，父 Promise 才成功；只要有一个失败，父 Promise 就失败。

分析：
1. `Promise.all` 接收一个数组参数，数组的每一项都是一个 Promise 实例。
2. 返回一个新的 Promise 实例，该实例在所有子 Promise 都成功时才成功，只要有一个失败就失败。
3. 返回的 Promise 实例的结果是一个数组，数组的每一项是对应子 Promise 的结果。



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

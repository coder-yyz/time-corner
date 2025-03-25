# 实现Promise.race

`Promise.race` 方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。只要有一个子 Promise 实例率先改变状态，父 Promise 的状态就跟着改变。如果这个率先改变的 Promise 是 fulfilled 状态，则父 Promise 的状态就变成 fulfilled，如果是 rejected 状态，则父 Promise 的状态就变成 rejected。

分析：
1. `Promise.race` 接收一个数组参数，数组的每一项都是一个 Promise 实例。
2. 返回一个新的 Promise 实例，该实例在所有子 Promise 中有一个率先 settled 时就 settled。
3. 返回的 Promise 实例的结果是第一个 settled 的子 Promise 的结果。

```javascript
const myPromiseRace = (promises) => {
  if (!Array.isArray(promises)) {
    throw new TypeError('promises must be an array');
  }
  if (!promises.length) {
    return Promise.resolve();
  }
  
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i += 1) {
      const currentPromise = promises[i]
      // 只要有一个子 Promise 实例率先改变状态，父 Promise 的状态就跟着改变
      currentPromise.then((res) => {
        resolve(res)
      }).catch((e) => {
        reject(e)
      })
    }
  })
}   

// 测试
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
    reject('p3')
  }, 3000)
})

myPromiseRace([p1, p2, p3]).then((res) => {
  console.log(res) // p1
}).catch((e) => {
  console.log(e)
})
```

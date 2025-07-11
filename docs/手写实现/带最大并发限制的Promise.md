# 带最大并发限制的Promise

```javascript
// 最大并发数
const MAX_LIMIT = 2
// promsie队列
const promiseQueue = []
// 进行中的数量
let activePromises = 0

function limitPromise(promiseFn) {
  return new Promise((resolve, reject) => {
    // 每个resolve和reject只会被调用一次
    const excuteRequest = async () => {
      activePromises++;
      try {
        const res = await promiseFn();
        resolve(res);
      } catch (error) {
        reject(error);
      } finally {
        activePromises--;
        if (promiseQueue.length > 0) {
          promiseQueue.shift()()
        }
      }
    }
    if (activePromises >= MAX_LIMIT) {
      // 加入队列的是一个函数，而不是直接执行的Promise，这个函数包含了reslove和reject
      promiseQueue.push(excuteRequest)
    } else {
      excuteRequest()
    }
  })
}

setInterval(() => {
  const promiseFn = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Promise resolved at ${new Date().toLocaleTimeString()}`);
      }, 3000);
    })
  }
  // 这里传入的promiseFn是一个函数，返回一个Promise，不能直接传入一个Promise对象
  // 直接传入一个Promise对象的话，传入的时候就会执行，而不是等到需要的时候才执行
  limitPromise(promiseFn).then((result) => {
    console.log(result);
  })

}, 1000);
```

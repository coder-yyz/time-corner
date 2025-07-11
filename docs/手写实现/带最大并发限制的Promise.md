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
    // excuteRequest是一个闭包，包含了执行promiseFn，resolve和reject控制等逻辑
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
      // 入队整个 excuteRequest（而不是 promiseFn）的原因是：队列里需要的是“完整的执行流程”，而不仅仅是要执行的异步函数本身。
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

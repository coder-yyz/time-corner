# 实现Promise.any

`Promise.any`方法接收一个 Promise 数组，只要其中一个 Promise 状态变为 `fulfilled`，就返回这个 Promise 的值。如果所有 Promise 都失败，返回一个 AggregateError 类型的错误。

```javascript
const myPromiseAny = (promises) => {
  return new Promise((resolve, reject) => {
    const errors = [];
    for (let i = 0; i < promises.length; i++) {
      const currentPromise = promises[i];
      // 只要有一个成功 直接resolve
      currentPromise.then(resolve, (error) => {
        // 失败的Promise收集错误
        errors.push(error);
        if (errors.length === promises.length) {
          reject(new AggregateError('All promises were rejected', errors));
        }
      });
    }
  });
};

// 测试
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p1');
  }, 1000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('p2');
  }, 2000);
});

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('p3');
  }, 3000);
});

myPromiseAny([p1, p2, p3])
  .then((res) => {
    console.log(res); // p1
  })
  .catch((e) => {
    console.log(e); // AggregateError: All promises were rejected
  });
```

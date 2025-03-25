# 实现Promise.settled

`Promise.settled` 方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。所有子 Promise 都 settled（即不是 pending 状态）时，父 Promise 才 settled；只要有一个 pending，父 Promise 就 pending。   

分析：
1. `Promise.settled` 接收一个数组参数，数组的每一项都是一个 Promise 实例。
2. 返回一个新的 Promise 实例，该实例在所有子 Promise 都 settled 时才 settled，只要有一个 pending 就 pending。
3. 返回的 Promise 实例的结果是一个数组，数组的每一项是对应子 Promise 的结果。
4. 结果数组的每一项是一个对象，包含两个属性：status 和 value/reason。status 为 'fulfilled' 时，value 为子 Promise 的结果；status 为 'rejected' 时，value 为子 Promise 的拒因。
5. 无论子 Promise 是 fulfilled 还是 rejected，都会执行 finally 方法，当所有子 Promise settled 时，resolve 结果数组。
6. 如果传入的数组为空，则直接返回一个 resolved 状态的 Promise，结果为空数组。

```javascript
const myPromiseSettled = (promises) => {
  if (!Array.isArray(promises)) {
    throw new TypeError('promises must be an array');
  }
  
  if (promises.length === 0) {
    return Promise.resolve([]);
  }
  
  return new Promise(async (resolve, reject) => {
    const result = []
    for (let i = 0; i< promises.length; i += 1) {
      const currentPromise = promises[i]
      currentPromise.then((res) => {
        // 成功 按顺序保存结果
        result.push({
          status: 'fulfilled',
          value: res
        })
      }).cath((e) => {
        // 失败 按顺序保存结果
        result.push({
          status: 'rejected',
          reason: e
        })
      }).finally(() => {
        // 当所有promise都执行完毕时，resolve
        if (result.length === promises.length) {
          resolve(result)
        }
      })
    }
  })
}

  
const p1 = Promise.resolve(3);
const p2 = 42;
const p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});
const p4 = new Promise((resolve, reject) => {
  setTimeout(reject, 100, 'bar');
});

myPromiseSettled([p1, p2, p3, p4]).then((values) => {
  console.log(values);
});
```

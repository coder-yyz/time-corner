# 实现Promise.settled

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
        result.push({
          status: 'fulfilled',
          value: res
        })
      }).cath((e) => {
        result.push({
          status: 'rejected',
          reason: e
        })
      }).finally(() => {
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

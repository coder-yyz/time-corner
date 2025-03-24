# 带最大并发限制的Promise

```javascript
const MAX_LIMIT = 3;
const excutedQueue = [];
let activeRequests = 0;

const myPromise = (func) => {
  return new Promise(async (resolve, reject) => {
    const executeRequest = async () => {
      activeRequests += 1;
      try {
        const res = await func();
        resolve(res);
      } catch (e) {
        reject(e);
      } finally {
        activeRequests -= 1;
        if (excutedQueue.length) {
          excutedQueue.shift()();
        }
      }
    }
    
    if (activeRequests >= MAX_LIMIT) {
      excutedQueue.push(executeRequest);
    } else {
      executeRequest();
    }
  })
}

// 测试
const urls = Array.from({ length: 10 }, (v, k) => k);
urls.map((url) => {
  myPromise(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(url);
      }, 1000);
    });
  }).then((data) => {
    console.log('url', data);
  });
});
```

# 实现一个带最大并发限制的fetch请求函数

```js
const MAX_LIMIT = 3;
const excutedQueue = [];
let activeRequests = 0;
const myFetch = (url, options) => {
  return new Promise(async (reslove, reject) => {
    const executeRequest = async () => {
      // 执行请求 更新正在执行的请求数量
      activeRequests += 1;
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        reslove(data);
      } catch (e) {
        reject(e);
      } finally {
        setTimeout(() => {
          // 请求结束 更新正在执行的请求数量
          activeRequests -= 1;
          // 如果队列中还有请求，继续执行
          if (excutedQueue.length) {
            excutedQueue.shift()();
          }
        }, 1000);
      }
    };
    // 如果正在执行的请求数量超过最大限制，将请求推入队列
    if (activeRequests >= MAX_LIMIT) {
      excutedQueue.push(executeRequest);
    } else {
      // 否则直接执行请求
      executeRequest();
    }
  });
};

// 测试
const urls = Array.from({ length: 10 }, (v, k) => k);
urls.map((url) => {
  myFetch(`https://jsonplaceholder.typicode.com/posts/${url}`).then((data) => {
    console.log('url', data);
  });
});
```

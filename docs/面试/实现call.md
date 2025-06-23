# 实现call

## 实现思路
1. 首先判断调用`myCall`的对象是否是一个函数，如果不是，则抛出错误。
2. 如果传入的`context`为`null`或`undefined`，则将其指向全局对象（在浏览器中是`window`，在Node.js中是`global`）。
3. 保存原函数到一个变量中。
4. 创建一个唯一的属性名，避免与其他属性冲突。
5. 将原函数绑定到`context`上。
6. 传入`args`参数调用原函数。
7. 删除临时属性。
8. 返回原函数的执行结果。


```js
Function.prototype.myCall = function(context, ...args) {
  // 如果调用myCall的不是函数，则抛出错误
  if (typeof this !== 'function') {
    throw new Error("myCall的调用者必须是一个函数");
  }
  // 如果没有传入context，则默认指向全局对象
  if (context === null || context === undefined) {
    context = (typeof window !== 'undefined' ? window : global);
  }
  const originFunc = this; // 保存原函数
  // 创建一个唯一的属性名，避免冲突
  const uniqueSymbol = Symbol('myCall');
  // 将原函数绑定到context上
  context[uniqueSymbol] = originFunc;
  // 调用原函数，并传入args参数
  const result = context[uniqueSymbol](...args);
  // 删除临时属性
  delete context[uniqueSymbol];
  // 返回原函数的执行结果
  return result;
}

const obj = {
  name: '张三',
  age: 20,
}

const fn = function(...args) {
  console.log(this.name, this.age, args);
}

fn()
fn.myCall(obj); // 张三 20
fn.myCall(obj, 30); // 张三 20
fn.myCall(obj, 30, 40); // 张三 20
```

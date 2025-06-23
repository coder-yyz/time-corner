# 实现apply

## 实现思路
1. 首先判断调用`myApply`的对象是否是函数，如果不是则抛出错误。
2. 如果传入的`context`为`null`或`undefined`，则将其指向全局对象（在浏览器中是`window`，在Node.js中是`global`）。
3. 如果`args`不是数组或类数组对象，则抛出错误。
4. 保存原函数到一个变量中。
5. 创建一个唯一的属性名，避免与其他属性冲突。
6. 将原函数绑定到`context`上。
7. 传入`args`参数调用原函数。
8. 删除临时属性。
9. 返回原函数的执行结果。


```js
Function.prototype.myApply = function(context, args) {
  if (typeof this !== 'function') {
    throw new TypeError('myApply的调用者必须是一个函数');
  }
  if (context === null || context === undefined) {
    context = (typeof window !== 'undefined' ? window : global);
  }
  // 如果args不是数组或类数组，则抛出错误
  if (!Array.isArray(args) && !(args && typeof args === 'object' && typeof args.length === 'number')) {
    throw new TypeError('myApply的第二个参数必须是一个数组或类数组对象');
  }
  // 保存原函数
  const originFunc = this;
  // 创建一个唯一的属性名，避免冲突
  const uniqueSymbol = Symbol('myApply');
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

function fn(name, age) {
  this.name = name || this.name;
  this.age = age || this.age;
  console.log(this.name, this.age);
}

fn.myApply(obj, ['李四', 50]); // 李四 50
```

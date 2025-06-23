# 实现bind

## 实现思路

1. 首先判断调用`myBind`的对象是否是函数，如果不是则抛出错误。
2. 如果传入的`context`为`null`或`undefined`，则将其指向全局对象（在浏览器中是`window`，在Node.js中是`global`）。
3. 保存原函数到一个变量中。
4. 返回一个新的函数，这个函数会在调用时判断是否是通过`new`关键字调用的。
5. 如果是通过`new`调用的，则使用`new`关键字创建一个新的实例，并将原函数的参数和绑定的参数传入。
6. 如果是普通调用，则使用`apply`方法将原函数的`this`指向绑定的`context`，并传入所有参数。
7. 最后，绑定新函数的原型为原函数的原型，以确保继承关系正确。
8. 返回这个新的函数。

## 代码实现

```js
Function.prototype.myBind = function (context, ...args) {
  // 如果调用myBind的不是函数，则抛出错误
  if (typeof this !== 'function') {
    throw new TypeError('myBind的调用者必须是一个函数');
  }
  // 如果没有传入context，则默认指向全局对象
  if (context === null || context === undefined) {
    context = (typeof window !== 'undefined' ? window : global);
  }
  // 保存原函数 是原函数调用的myBind方法 所以myBind的this指向原函数
  const originFunc = this;

  // 返回一个新的函数
  const bindFunc = function (...bindArgs) {
    // 如果是new调用的
    if (this instanceof bindFunc) {
      return new originFunc(...args, ...bindArgs);
    }
    // 如果是普通调用
    return originFunc.apply(context, [...args, ...bindArgs]);
  }
  
  // 绑定函数的原型
  bindFunc.prototype = Object.create(originFunc.prototype);
  bindFunc.prototype.constructor = bindFunc;
  return bindFunc;
  
}

function fn(...args){
  this.age = [...args][0];
  console.log(this.name, this.age, args);
}

let obj = {
  name:"张三"
}

let newFn = fn.myBind(obj, 0); // 返回一个新的函数，this会变成传入的obj
newFn(1, 2, 3); // 张三 [1, 2, 3]


```

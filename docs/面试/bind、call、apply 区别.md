# bind、call、apply 区别

## 作用

`bind`、`call` 和 `apply` 都是 JavaScript 中的函数方法，用于改变函数的执行上下文（即 `this` 的指向）。

什么时候需要改变`this`指向呢？

当函数被调用时，默认情况下 `this` 指向调用该函数的对象。如果需要在不同的上下文中调用同一个函数，就需要使用这些方法来改变 `this` 的指向。

比如：
```js
var name = "lucy";
var obj = {
    name: "martin",
    say: function () {
        console.log(this.name);
    }
};
obj.say(); // martin，this 指向 obj 对象
setTimeout(obj.say,0); // 在浏览器中，this 指向 window 对象，输出 "lucy"，在 Node.js 中，this 指向 global 对象，输出 undefined
```

## 区别

### apply

apply接受两个参数，第一个参数是this的指向，第二个参数是函数接受的参数，以数组的形式传入

改变this指向后原函数会立即执行，且此方法只是临时改变this指向一次

```js
function fn(...args){
  console.log(this.name);
}

let obj = {
  name:"张三"
}

fn.apply(obj,[1,2]); // this会变成传入的obj，传入的参数必须是一个数组；
fn(1,2) // this指向window

// 当第一个参数为null、undefined的时候，默认指向window(在浏览器中)
fn.apply(null,[1,2]); // this指向window
fn.apply(undefined,[1,2]); // this指向window
```
### call

call与apply类似，区别在于传入的参数不是数组，而是一个个的参数

```js
function fn(...args){
  console.log(this.name);
}
let obj = {
  name:"张三"
}
fn.call(obj,1,2); // this会变成传入的obj，传入的参数可以是一个个的参数
fn(1,2) // this指向window
// 当第一个参数为null、undefined的时候，默认指向window(在浏览器中)
fn.call(null,1,2); // this指向window
fn.call(undefined,1,2); // this指向window
```

### bind

bind与apply和call的区别在于，bind不会立即执行函数，而是返回一个新的函数，这个新的函数可以在以后调用。

```js
function fn(...args){
  console.log(this.name);
}
let obj = {
  name:"张三"
}
let newFn = fn.bind(obj, 1, 2); // 返回一个新的函数，this会变成传入的obj，传入的参数可以是一个个的参数
newFn(); // this指向obj，输出 "张三"
// 当第一个参数为null、undefined的时候，默认指向window(在浏览器中)
let newFn2 = fn.bind(null, 1, 2); // this指向window
newFn2(); // this指向window，输出 "undefined"
```

### 总结

- 三者都可以改变函数的this对象指向 
- 三者第一个参数都是this要指向的对象，如果如果没有这个参数或参数为undefined或null，则默认指向全局对象（在浏览器中是window，在Node.js中是global）
- 三者都可以传参，但是apply是数组，而call是参数列表，且apply和call是一次性传入参数，而bind可以分为多次传入
bind是返回绑定this之后的函数，apply、call 则是立即执行

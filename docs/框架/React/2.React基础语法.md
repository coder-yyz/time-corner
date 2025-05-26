## *JSX* 基础语法

在 *React* 中，使用 *JSX* 来描述页面。

```js
function App() {
  return (
    <div>Hello React~</div>
  );
}
```

可以把类似于 *HTML* 的代码单独提取出来，例如：

```js
function App() {
  const ele = <div>Hello React~</div>
  return (
    ele
  );
}
```

这种类似于 *HTML* 的语法在 *React* 中称之为 *JSX*， 这是一种 *JavaScript* 的语法扩展。在 *React* 中推荐使用 *JSX* 来描述用户界面。*JSX* 乍看起来可能比较像是模版语言，但事实上它完全是在 *JavaScript* 内部实现的。



使用 *JSX* 来描述页面时，有如下的一些语法规则：

- 根元素只能有一个
- *JSX* 中使用 *JavaScript* 表达式。表达式写在大括号 *{}* 中
- 属性值指定为字符串字面量，或者在属性值中插入一个 *JavaScript* 表达式
- *style* 对应样式对象，*class* 要写作 *className*
- 注释需要写在大括号
- *JSX* 允许在模板中插入数组，数组会自动展开所有成员



## *createElement* 方法

*JSX* 是一种 *JavaScript* 的语法扩展，*Babel* 会把 *JSX* 转译成一个名为 *React.createElement* 函数调用。

```js
React.createElement(type, [props], [...children]);
```

参数说明：

- *type*：创建的 *React* 元素类型（可选的值有：标签名字符串、*React* 组件）。
- *props*（可选）：*React* 元素的属性。
- *children*（可选）：*React* 元素的子元素。

例如，下面两种代码的作用完全是相同的：

```js
const element1 = (
    <h1 className="greeting">
    	Hello, world!
    </h1>
);
const element2 = React.createElement(
    'h1',
    {className: 'greeting'},
    'Hello, world!'
);
```

这些对象被称为 “*React* 元素”。它们描述了你希望在屏幕上看到的内容。

可以看出，*JSX* 的本质其实就是 *React.createElement* 方法的一种语法糖。

---

## *React* 中的组件

在 *React* 中，可以使用类的方式来声明一个组件。

```js
class 类名 extends React.Component{
  render(){
    return (
    	// 一段 JSX
    )
  }
}
```

除了类组件，*React* 中还支持使用函数来创建组件，同样需要返回一段 *JSX*，来表示这个组件的 *UI* 是什么样的。

```js
function 组件名(){
  return (
  	// 一段 JSX
  );
}
```

**早期**的函数组件被称之为无状态组件，一般仅仅用来做纯 *UI* 的展示，里面不会有复杂的逻辑。

但是从 *React 16.8* 推出 *Hooks* 后，现在更多的是使用函数组件了。

这不仅仅是语法的改变，同时也代表着整个 *React* 编程思想的一种转变。



## 为组件绑定事件

在 *React* 中绑定事件的写法如下：

```jsx
<button onClick={activateLasers}>Activate Lasers</button>
```

在 *React* 中无法通过 *return false* 来阻止默认行为，所以只有使用 *e.preventDefault* 的方式来阻止默认行为。

```jsx
function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log('You clicked submit.');
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}
```

如果是类组件，那么事件处理函数写作一个类方法。

```jsx
class Welcome extends React.Component {
  // 事件处理函数
  eventHandler(e){
    window.alert('Hello');
    e.preventDefault();
  }
  
  render() {
    return (
      <a href="https://www.baidu.com/" onClick={this.eventHandler}>this is a test</a>
    );
  }
}
```

在 *React* 的事件处理函数中所传入的事件对象，是一个合成事件对象。

*React* 也提供了访问原生事件对象的方式。如下：

```jsx
eventHandler(e){
    e.nativeEvent // 原生事件对象
}
```



## *this* 的指向

由于 *JS* 中 *this* 的特殊性，事件处理函数中的 *this* 并不会指向当前的组件，这就需要我们自行对 *this* 进行指向的修正。

this指向问题的三种解决方式：

- 将事件处理函数修改为箭头函数
- 将事件绑定修改为箭头函数
- 使用 *bind* 方法来强制绑定 *this* 的指向



## 向事件处理程序传参

另外还有一个非常重要的问题，就是如何向事件处理函数传递参数。

如果要传递参数，可以使用下面的两种方式来进行传参：

- 通过 *bind* 方法在绑定 *this* 指向时向事件处理函数进行传参
- 绑定事件时，通过书写箭头函数的形式来传参

---

## 组件状态

早期类组件被称之为有状态组件，就是因为在类组件中能够维护组件数据。

```js
class 类名 extends React.Component{
  constructor(){
    super();
    // 设置组件自身的数据状态
    this.state = {
      xxx : xxx
    }
  }
  render(){
    return (
    	// 通过 {this.state.xxx} 来获取状态数据
    )
  }
}

// 或者
class 类名 extends React.Component{
  state = {
      xxx : xxx
  }
  render(){
    return (
    	// 通过 {this.state.xxx} 来获取状态数据
    )
  }
}
```



不要直接去修改状态值，而是应该通过 *setState* 方法修改组件的 *state* 状态数据。

```js
this.setState({
  xxx: 新值
})
```

*setState*，它对状态的改变，**可能**是异步的。

> 如果改变状态的代码处于某个 *HTML* 元素的事件中，则其是异步的，否则是同步

如果在事件处理函数里面想拿到 *setState* 执行后的数据，可以提前使用一个变量来存储计算结果，或者使用 *setState* 的第二个参数，它是一个函数，这个函数会在 *state* 更新后被调用。



最佳实践：

1. 把所有的 *setState* 当作是异步的
2. 永远不要信任 *setState* 调用之后的状态
3. 如果要使用改变之后的状态，需要使用回调函数（*setState* 的第二个参数）
4. 如果新的状态要根据之前的状态进行运算，使用函数的方式改变状态（*setState* 的第一个函数）



*React* 会对异步的 *setState* 进行优化，将多次 *setState* 进行合并（将多次状态改变完成后，再统一对 *state* 进行改变，然后触发 *render*）



## *props*

和 *Vue* 一样，在 *React* 中组件会存在层级关系，那么自然会涉及到组件之间进行数据的传递。

如果是父组件向子组件传递数据，则使用 *props*。

如果是函数组件，*props* 作为函数的一个参数传入：

```jsx
function 组件名(props) {
  return (
    // 一段 JSX
    // 通过 props.xxx 获取传入的值
    <div>
      <p>姓名：{props.name}</p>
      <p>年龄：{props.age}</p>
      <p>性别：{props.gender}</p>   
    </div>
  );
}
```

如果是类组件，则需要在 *constructor* 中将 *props* 通过 *super* 传递给父类，然后通过 *this.props* 的方式来获取传入的值：

```jsx
class 组件名 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
       // 一段 JSX
    	 // 通过 this.props.xxx 获取传入的值
        <div>
          <p>姓名：{this.props.name}</p>
          <p>年龄：{this.props.age}</p>
          <p>性别：{this.props.gender}</p>   
        </div>
     );
	}
}
```



通过 *props.children*，可以实现类似于 *Vue* 中插槽的功能，例如：

```jsx
class 组件B extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div>
          {this.props.children}
      </div>
    );
  }
}
class 组件A extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <组件B>
        <p>Hello, React</p>
        <p>Hello, Redux</p>
        <p>Hello, Facebook</p>
        <p>Hello, Google</p>
      </组件B>
    );
  }
}
```



## *props* 验证

在 *Vue* 中，可以对传入的 *props* 设置默认值，以及验证 *props* 的有效性，在 *React* 中，针对 *props* 也可以做这些事。

通过 *defaultProps* 就可以对 *props* 设置默认值。

```jsx
function Greeting(props) {
  const { name, age, gender } = props;
  return (
    <div>
      <p>姓名：{name}</p>
      <p>年龄：{age}</p>
      <p>性别：{gender}</p>   
    </div>
   );
}
// 设置默认的 props 值，当组件没有传值时会使用默认值
Greeting.defaultProps = {
  name : 'zhangsan',
  age : 18,
  gender : 'male'
};
```

```jsx
class Greeting extends React.Component {
  constructor(props) {
    super(props);
  }
  // 设置默认的 defaultProps 属性值
  static defaultProps = {
    name : "zhangsan",
    age : 18,
    gender : 'male' 
  }
  render() {
    return (
      <div>
        <p>姓名：{this.props.name}</p>
        <p>姓名：{this.props.age}</p>
        <p>姓名：{this.props.gender}</p>
      </div>
    );
  }
}
// 或者
Greeting.defaultProps = {
    name : "zhangsan",
    age : 18,
    gender : 'male' 
}
```



关于 *props* 的类型检查，从 *React v15.5* 版本开始，移入到了 [`prop-types` 库](https://www.npmjs.com/package/prop-types) 。

```jsx
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string
};
```

```jsx
import PropTypes from 'prop-types'

function HelloWorldComponent({ name }) {
  return (
    <div>Hello, {name}</div>
  )
}

HelloWorldComponent.propTypes = {
  name: PropTypes.string
}

export default HelloWorldComponent
```



## 状态提升

在 *Vue* 中，父传子通过 *props*，子传父通过触发自定义事件。

在 *React* 中，如果子组件需要向父组件传递数据，同样是通过触发父组件传递给子组件的事件来进行传递。

这在官网中被称之为“状态提升”：*https://zh-hans.reactjs.org/docs/lifting-state-up.html*

---

## 受控组件

在以前 *jQuery* 时代，开发人员需要获取到 *DOM* 节点，然后进行操作。而在现代前端开发中，采用的是 *MVVM* 的模式，将视图和视图模型进行绑定，视图模型的改变，会自然的带来视图的改变。开发人员需要专注在视图模型上面。


在 *React* 中，表单控件的值是由组件的状态来控制的，也就是说，表单控件的值是由组件的状态来决定的，而不是由 *DOM* 节点来决定的。


因此，这里所谓的受控组件，本质上其实就是将表单中的控件和视图模型（状态）进行绑定，之后都是针对状态进行操作。

## 非受控组件

大多数情况下，在 *React* 中推荐使用受控组件来对表单进行操作，这样能够对表单控件的数据进行一个统一管理。

但是在某些特殊情况下，需要使用以前传统的 *DOM* 方案进行处理，此时替代的方案就是非受控组件。

非受控组件的实现方式是通过 *ref* 来获取到 *DOM* 节点，然后直接对 *DOM* 节点进行操作。

```jsx
function MyComponent() {
  // 创建一个 ref
  const inputRef = React.useRef(null);

  function handleSubmit(event) {
    event.preventDefault();
    // 通过 ref 获取到 DOM 节点
    alert('A name was submitted: ' + inputRef.current.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        {/* 将 ref 绑定到 DOM 节点上 */}
        <input type="text" ref={inputRef} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
```

关于受控组件和非受控组件，可以参阅：*https://goshacmd.com/controlled-vs-uncontrolled-inputs-react/*

---

## 生命周期(仅限于类组件)

所谓生命周期，指的是组件从诞生到销毁会经历一系列的过程，该过程就叫做生命周期。

*React* 在组件的生命周期中提供了一系列的钩子函数（类似于事件），可以让开发者在函数中注入代码，这些代码会在适当的时候运行。

**生命周期钩子函数是属于类组件所独有的东西**，但是从 *React 16.8* 推出 *Hooks* 以来，整体已经开始以函数组件为主，因此仅介绍一些常用的生命周期钩子函数。

完整的生命周期图谱，可以参阅官网：*https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/*


## 常用的生命周期钩子函数

有关生命周期钩子函数的介绍，可以参阅官网：*https://zh-hans.reactjs.org/docs/react-component.html*

官网中在介绍这些钩子函数时，也是分为了**常用**和**不常用**两大块来介绍的。

常用的生命周期钩子函数如下：

- *constructor*
    - 同一个组件对象只会创建一次
    - 不能在第一次挂载到页面之前，调用 *setState*，为了避免问题，构造函数中严禁使用 *setState*

- *render*
    - *render* 是整个类组件中必须要书写的生命周期方法
    - 返回一个虚拟 *DOM*，会被挂载到虚拟 *DOM* 树中，最终渲染到页面的真实 *DOM* 中
    - *render* 可能不只运行一次，只要需要重新渲染，就会重新运行
    - 严禁使用 *setState*，因为可能会导致无限递归渲染

```jsx
import React from "react";

// 类组件
class App extends React.Component {

  constructor() {
    super();
    // 主要做一些初始化操作，例如该组件的状态
    this.state = {
      value : 1
    }
    console.log("constructor");
  }


  clickHandle=()=>{
    this.setState({
      value : this.state.value + 1
    })
  }

  render() {
    console.log("render");
    return (
      <div>
        <div>{this.state.value}</div>
        <button onClick={this.clickHandle}>+1</button>
      </div>
    )
  }

}

export default App;

```

- *componentDidMount*
    - 类似于 *Vue* 里面的 *mounted*
    - 只会执行一次
    - 可以使用 *setState*
    - 通常情况下，会将网络请求、启动计时器等一开始需要的操作，书写到该函数中
- *componentWillUnmount*
    - 通常在该函数中销毁一些组件依赖的资源，比如计时器

---

## *Hooks* 基本介绍

> *Hook* 是 *React 16.8* 的新增特性。它可以让你在不编写 *class* 的情况下使用 *state* 以及其他的 *React* 特性。



*Hooks* 的出现，首先能解决如下的一些问题：

- 告别令人疑惑的生命周期
    - 例如下面的例子，相同的代码在不同的生命周期中存在了两份

```jsx
import React from "react";

// 类组件
class App extends React.Component {

  constructor() {
    super();
    this.state = {
      count : 0
    }
  }

  componentDidMount(){
    document.title = `你点击了${this.state.count}次`;
  }

  componentDidUpdate(){
    document.title = `你点击了${this.state.count}次`;
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    )
  }
}

export default App;

```

- 告别类组件中烦人的 *this*
    - 在类组件中，会存在 *this* 的指向问题，例如在事件处理函数中，不能直接通过 *this* 获取组件实例，需要修改 *this* 指向
- 告别繁重的类组件，回归前端程序员更加熟悉的函数


另外，*Hooks* 的出现，还有更加重要的一个信号，那就是整个 *React* 思想上面的转变，从“面向对象”的思想开始转为“函数式编程”的思想。这是编程范式上面的转变。

编程范式：

- 命令式编程：告诉计算机怎么做（*How*），我们需要给计算机指明每一个步骤
    - 面向过程
    - 面向对象
- **声明**式编程：告诉计算机我要什么（*What*）
    - 函数式编程
    - *DSL*（领域专用语言，*HTML、CSS、SQL*）

声明式编程并不是新的产物，它是和命令式编程同期出现的。但是，早期更加流行命令式编程。不过随着近几年整个项目工程越来越复杂，以前的命令式编程就有点力不从心，所以现在慢慢开始流行声明式编程。


“面向对象”和“函数式编程”有什么区别：*https://www.imaginarycloud.com/blog/functional-programming-vs-oop/*



*Hook* 就是 *JavaScript* 函数，但是使用它们会有两个额外的规则：

- 只能在**函数最外层**调用 *Hook*。不要在循环、条件判断或者子函数中调用。
- 只能在 ***React* 的函数组件**中调用 *Hook*。不要在其他 *JavaScript* 函数中调用。


## *useState*
*useState* 是 *React* 中最常用的 *Hook*，它可以让函数组件拥有自己的状态。

```jsx
import React, { useState } from "react";
function App() {
  // 声明一个叫 "count" 的 state 变量，初始值为 0
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
````

*useState* 的参数可以是一个函数，这个函数的返回值会作为初始值传入。

```jsx
import React, { useState } from "react";
function App() {
  // 声明一个叫 "count" 的 state 变量，初始值为 0
  const [count, setCount] = useState(() => {
    return 0;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```


## *useEffect*
*useEffect* 是 *React* 中最常用的 *Hook*，它可以让函数组件在某些特定的时机执行一些副作用操作。从而替代类组件中的生命周期钩子函数。

```jsx
import React, { useState, useEffect } from "react";
function App() {
  const [count, setCount] = useState(0);

  // 相当于 componentDidMount 和 componentDidUpdate
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]); // 依赖项，只有当 count 改变时才会执行

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

*useEffect* 的第一个参数是一个函数，这个函数会在组件渲染后执行。该函数可以返回一个函数，这个函数会在组件卸载时执行。 这个返回的函数可以用来清理副作用，例如清除定时器、取消网络请求等。
*useEffect* 的第二个参数是一个数组，表示依赖项，只有当依赖项发生变化时，才会重新执行第一个参数的函数。如果不传入第二个参数，则表示每次渲染后都会执行第一个参数的函数。如果传入空数组，则表示只在组件挂载和卸载时执行第一个参数的函数。

```jsx
import React, { useState, useEffect } from "react";
function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;

    // 返回一个函数，这个函数会在组件卸载时执行
    return () => {
      document.title = "React App";
    };
  }, [count]); // 依赖项，只有当 count 改变时才会执行

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

## *useRef*
*useRef* 用于声明一个可变的引用，类似于类组件中的 *ref*。它可以用来获取 *DOM* 节点或者存储任意可变值。

```jsx
import React, { useRef } from "react";
function App() {
  const inputRef = useRef(null);

  const focusInput = () => {
    // 通过 ref 获取到 DOM 节点
    inputRef.current.focus();
  };

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}
```

## 自定义 *Hook*

除了使用官方内置的 *Hook*，我们还可以自定义 *Hook*，自定义 *Hook* 的本质其实就是函数，但是和普通函数还是有一些区别，主要体现在以下两个点：

- 自定义 *Hook* 能够调用诸如 *useState*、*useRef* 等，普通函数则不能。由此可以通过内置的 *Hooks* 获得 *Fiber* 的访问方式，可以实现在组件级别存储数据的方案等。
- 自定义 *Hooks* 需要以 *use* 开头，普通函数则没有这个限制。使用 *use* 开头并不是一个语法或者一个强制性的方案，更像是一个约定。

*App.jsx*

```jsx
import { useState } from 'react';
import useMyBook from "./useMyBook"

function App() {

  const {bookName, setBookName} = useMyBook();
  const [value, setValue] = useState("");


  function changeHandle(e){
    setValue(e.target.value);
  }

  function clickHandle(){
    setBookName(value);
  }

  return (
    <div>
      <div>{bookName}</div>
      <input type="text" value={value} onChange={changeHandle}/>
      <button onClick={clickHandle}>确定</button>
    </div>
  )
  
}

export default App;
```

*useMyBook*

```jsx
import { useState } from "react";

function useMyBook(){
    const [bookName, setBookName] = useState("React 学习");
    return {
        bookName, setBookName
    }
}

export default useMyBook;
```



# class和构造函数

## class

*class*是*ES6*新增的语法糖，实际上是基于原型链的继承方式。它提供了一种更清晰、更简洁的方式来创建对象和处理继承。

使用`class`关键字可以定义一个类，类中可以包含构造函数、方法、静态方法、属性、静态属性等。

```javascript
class Computer {
    // 定义静态属性
  static type = "计算机"
  
  // 定义构造函数
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  // 定义静态方法
  static getInfo() {
    console.log(`这是一台${ this.type }`);
  }

  // 定义实例方法
  getInfo() {
    console.log(`${Computer.type}名称: ${ this.name }, 价格: ${ this.price }`);
  }
}

```

创建类的实例

```javascript

const apple = new Computer("Apple", 10000);
apple.getInfo(); // 计算机名称: Apple, 价格: 10000
Computer.getInfo(); // 这是一台计算机
console.log(apple instanceof Computer); // true1
```

## 构造函数

构造函数本质上也是一个函数，用于创建对象实例。它通常以大写字母开头，以区分普通函数。

构造函数可以通过`new`关键字调用，创建一个新的对象实例，并将`this`指向该实例。

通过构造函数来模拟类，实例方法挂在原型上面，静态方法就挂在构造函数上。

```javascript
function Computer(name, price) {
  this.name = name;
  this.price = price;
}
// 定义静态属性
Computer.type = "计算机";
// 定义静态方法
Computer.getInfo = function () {
  console.log(`这是一台${this.type}`);
};
// 定义实例方法
Computer.prototype.getInfo = function () {
  console.log(`${Computer.type}名称: ${this.name}, 价格: ${this.price}`);
};

const apple = new Computer("Apple", 10000);
apple.getInfo(); // 计算机名称: Apple, 价格: 10000
Computer.getInfo(); // 这是一台计算机
console.log(apple instanceof Computer); // true


```

## 区别

| 特性       | class 语法                          | 构造函数语法                     |
|------------|-------------------------------------|----------------------------------|
| 定义方式   | 使用 `class` 关键字定义             | 使用函数定义                     |
| 实例化方式 | 使用 `new` 关键字实例化             | 使用 `new` 关键字实例化           |
| 继承方式   | 使用 `extends` 关键字               | 使用原型链继承                   |
| 静态方法   | 使用 `static` 关键字定义             | 挂在构造函数上                   |
| 静态属性   | 使用 `static` 关键字定义             | 挂在构造函数上                   |
| 实例方法   | 定义在类的原型上                    | 定义在构造函数的原型上            |
| 继承链     | 更清晰，支持多层继承                | 通过原型链实现继承，较为复杂       |
| 兼容性     | ES6 及以上版本支持                  | 所有浏览器支持                     |

## 总结
`class` 语法是对构造函数和原型链继承的语法糖，提供了更清晰、更简洁的方式来创建对象和处理继承。它支持静态方法、静态属性、私有属性和方法等特性，使得代码更易读、更易维护。
构造函数是传统的创建对象实例的方式，使用函数和原型链来实现继承。虽然语法较为复杂，但在 ES6 之前是唯一的方式。
在实际开发中，推荐使用 `class` 语法来定义类和处理继承，因为它提供了更好的可读性和可维护性。但在需要兼容旧版本浏览器时，可以使用构造函数的方式来实现相同的功能。

## 注意

- 在静态方法中，`this` 指向的是类本身，而不是类的实例。因此，静态方法不能访问实例属性和方法，只能访问静态属性和方法。
- 在实例方法中，`this` 指向的是类的实例，可以访问实例属性和方法。也可以访问静态属性和方法，但需要通过类名来访问。
- 在类中定义的静态属性和方法是共享的，所有实例都可以访问，但不能通过实例访问静态属性和方法，只能通过类名访问。
- class类必须在`new`关键字后面使用，不能直接调用类名，否则会抛出错误。而构造函数可以直接调用，但会导致`this`指向全局对象或`undefined`（严格模式下）。这也是函数二义性的问题之一。

# Props

- Props
- 自定义事件
- 插槽

所谓 Props，其实就是外部在使用组件的时候，向组件传递数据。

## 快速入门

下面我们定义了一个 UserCard.vue 组件：

```vue
<template>
  <div class="user-card">
    <img :src="user.avatarUrl" alt="用户头像" class="avatar" />
    <div class="user-info">
      <h2>{{ user.name }}</h2>
      <p>{{ user.email }}</p>
    </div>
  </div>
</template>

<script setup>
// defineProps 是一个宏，用于声明组件接收哪些 props
const user = defineProps({
  name: String,
  email: String,
  avatarUrl: String
})
</script>

<style scoped>
.user-card {
  display: flex;
  align-items: center;
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
}

.user-info h2 {
  margin: 0;
  font-size: 20px;
  color: #333;
}

.user-info p {
  margin: 5px 0 0;
  font-size: 16px;
  color: #666;
}
</style>

```

在该组件中，接收 name、email 以及 avatrUrl 这三个 prop，使用 defineProps 来定义要接收的 props，defineProps 是一个宏，会在代码实际执行之前进行一个替换操作。

之后 App.vue 作为父组件，在父组件中使用上面的 UserCard.vue 组件（子组件）

```vue
<template>
  <div class="app-container">
    <!-- 父组件在使用 UserCard 这个组件的时候，向内部传递数据 -->
    <UserCard name="张三" email="123@gamil.com" avatar-url="src/assets/yinshi.jpg" />
    <UserCard name="莉丝" email="456@gamil.com" avatar-url="src/assets/jinzhu.jpeg" />
  </div>
</template>

<script setup>
import UserCard from './components/UserCard.vue'
</script>

<style scoped>
.app-container {
  max-width: 500px;
  margin: auto;
  padding: 20px;
}
</style>

```



## 使用细节

1. 命名方面

组件内部在声明 props 的时候，推荐使用驼峰命名法：

```js
defineProps({
  greetingMessage: String
})
```

```vue
<span>{{ greetingMessage }}</span>
```

不过父组件在使用子组件，给子组件传递属性的时候，推荐使用更加贴近 HTML 的书写风格：

```vue
<MyComponent greeting-message="hello" />
```



2. 动态的 Props

在上面的快速入门示例中，我们传递的都是静态的数据：

```vue
<UserCard name="张三" email="123@gamil.com" avatar-url="src/assets/yinshi.jpg" />
```

所谓动态的 Props，指的就是父组件所传递的属性值是和父组件本身的状态绑定在一起的：

UserCard.vue

```js
// defineProps 是一个宏，用于声明组件接收哪些 props
defineProps({
  user: {
    type: Object,
    required: true
  }
})
```

App.vue

```vue
<template>
  <div class="app-container">
    <!-- 父组件在使用 UserCard 这个组件的时候，向内部传递数据 -->
    <UserCard :user="user" />
    <div class="input-group">
      <input type="text" placeholder="请输入新的名字" v-model="newName" />
      <button @click="changeName">确定修改</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import UserCard from './components/UserCard.vue'
// 父组件所维护的一份数据
const user = ref({
  name: '张三',
  email: '123@gamil.com',
  avatarUrl: 'src/assets/yinshi.jpg'
})
const newName = ref('')

// 根据用户输入的新名字
// 更新 user 这个数据
function changeName() {
  if (newName.value.trim()) {
    user.value.name = newName.value
  }
}
</script>

<style scoped>
.app-container {
  max-width: 500px;
  margin: auto;
  padding: 20px;
}
.input-group {
  display: flex;
  margin-top: 20px;
}

input {
  flex: 1;
  padding: 10px;
  margin-right: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}
</style>
```

还需要注意一个细节：如果想要向组件传递 **非字符串** 类型的值，例如 number、boolean、array... 必须通过动态 Props 的方式来传递，不然组件内部拿到的是一个字符串。



3. 单向数据流

Props 会因为父组件传递的数据的更新而自身发生变化，这种数据的流向是从父组件流向子组件的，这个流向是单向的，这意味着你在子组件中不应该修改父组件传递下来的 Props 数据。

如果你强行修改，Vue 会在控制台抛出警告：

```js
const props = defineProps(['foo'])

// ❌ 警告！prop 是只读的！
props.foo = 'bar'
```

有些时候，我们期望子组件在局部保存一份父组件传递下来的数据，这种情况下，就在子组件中新定义一个子组件的数据存储 Props 上面的值即可。

```js
import {ref} from 'vue'
// defineProps 是一个宏，用于声明组件接收哪些 props
const prop = defineProps(['user', 'age'])
// 在子组件中，使用 ref 创建一个响应式数据
// 值为父组件传递过来的 props 值
const age = ref(prop.age)
```

还有一些时候，可能需要对父组件传递过来的数据进行二次计算，这个也是可以的，前提是在子组件内部自己创建一个计算属性，仅仅使用父组件传递的 props 值来做二次计算。

```js
const props = defineProps(['size'])

// 该 prop 变更时计算属性也会自动更新
const normalizedSize = computed(() => props.size.trim().toLowerCase())
```



## 校验

子组件在声明 Props 的时候，是可以书写校验要求的，如果父组件在传递值的时候不符合 Props 值的要求，开发阶段 Vue 会在控制台给出警告信息。

```js
defineProps({
  // 基础类型检查
  // （给出 `null` 和 `undefined` 值则会跳过任何类型检查）
  propA: Number,
  // 多种可能的类型
  propB: [String, Number],
  // 必传，且为 String 类型
  propC: {
    type: String,
    required: true
  },
  // Number 类型的默认值
  propD: {
    type: Number,
    default: 100
  },
  // 对象类型的默认值
  propE: {
    type: Object,
    // 对象或数组的默认值
    // 必须从一个工厂函数返回。
    // 该函数接收组件所接收到的原始 prop 作为参数。
    default(rawProps) {
      return { message: 'hello' }
    }
  },
  // 自定义类型校验函数
  // 在 3.4+ 中完整的 props 作为第二个参数传入
  propF: {
    validator(value, props) {
      // The value must match one of these strings
      return ['success', 'warning', 'danger'].includes(value)
    }
  },
  // 函数类型的默认值
  propG: {
    type: Function,
    // 不像对象或数组的默认，这不是一个
    // 工厂函数。这会是一个用来作为默认值的函数
    default() {
      return 'Default function'
    }
  }
```

例如我们对上面的 UserCard.vue 添加一个自定义的校验规则：

```js
defineProps({
  user: {
    type: Object,
    required: true,
    // 自定义校验规则
    validator: (value) => {
      return value.name && value.email && value.avatarUrl
    }
  },
  age: {
    type: [Number, String],
    default: 18
  }
})
```


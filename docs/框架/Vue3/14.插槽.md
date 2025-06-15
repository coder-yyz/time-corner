# 插槽

有些时候，我们有这样的需求：父组件需要向子组件传递模板内容，这个时候显然使用前面的 Props 是无法做到的，此时就需要本节课所介绍的插槽。

要使用插槽非常简单，首先在书写子组件的时候，添加上 slot 相当于就是设置了插槽，回头父组件在使用子组件的时候，在子组件元素之间书写的内容就会被插入到子组件 slot 的地方。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-04-16-075336.png" alt="image-20240416155335459" style="zoom:50%;" />

## 快速入门

首先是子组件 Card.vue

```vue
<template>
  <div class="card">
    <!-- 卡片的头部 -->
    <div class="card-header">
      <!-- 具名插槽 -->
      <slot name="header"></slot>
    </div>
    <!-- 卡片的内容 -->
    <div class="card-body">
      <!-- 默认插槽 -->
      <slot></slot>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  margin: 20px;
}

.card-header {
  background-color: #f7f7f7;
  border-bottom: 1px solid #ececec;
  padding: 10px 15px;
  font-size: 16px;
  font-weight: bold;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.card-body {
  padding: 15px;
  font-size: 14px;
  color: #333;
}
</style>
```

通过 slot 来设置插槽，上面的例子中，设置了两个插槽，一个是名为 header 的具名插槽，另外一个是默认插槽。

```vue
<template>
  <div>
    <Card>
      <!-- 中间的内容就会被放入到插槽里面 -->
      <template v-slot:header>我的卡片标题</template>
      这是卡片的内容
    </Card>
    <Card>
      <template v-slot:header>探险摄影</template>
      <div class="card-content">
        <img src="./assets/landscape.jpeg" class="card-image" />
        <p>探索未知的自然风光，记录下每一个令人惊叹的瞬间。加入我们的旅程，一起见证世界的壮丽。</p>
      </div>
    </Card>
  </div>
</template>

<script setup>
import Card from './components/Card.vue'
</script>

<style scoped>
.card-image {
  width: 100%; /* 让图片宽度充满卡片 */
  height: auto; /* 保持图片的原始宽高比 */
  border-bottom: 1px solid #ececec; /* 在图片和文本之间添加一条分隔线 */
}
</style>
```

父组件在插入模板内容的时候，可以通过 v-slot 来指定要插入到的具名插槽。如果没有指定，那么内容会被插入到默认插槽里面。



## 插槽相关细节

1. 插槽支持默认内容

可以在 slot 标签之间写一些默认内容，如果父组件没有提供模板内容，那么会渲染默认内容。

```vue
<slot>这是默认插槽的默认值</slot>
```



2. 具名插槽

插槽是可以有名字的，这意味着可以设置多个插槽，回头父组件可以根据不同的名字选择对应的内容插入到指定的插槽里面。

父组件在指定名字的时候，使用 v-slot:插槽名

```vue
<template v-slot:header>探险摄影</template>
```

这里有一个简写，直接写成 #插槽名

```vue
<template #header>探险摄影</template>
```

![image-20240416155242559](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-04-16-075242.png)

另外，当组件同时接收默认插槽和具名插槽的时候，位于顶级的非 template 节点的内容会被放入到默认插槽里面。



3. 父组件在指定插槽名的时候，可以是动态的

```vue
<template v-slot:[slotName]>探险摄影</template>
```

```vue
<template #[slotName]>探险摄影</template>
```



## 作用域

首先明确一个点：

- 父组件模板中的表达式只能访问父组件的作用域下的数据
- 子组件模板中的表达式只能访问子组件的作用域下的数据

父组件

```vue
<template>
  <div class="parent">
    <h1>父组件的标题</h1>
    <Card>
      <!-- 插槽内容可以访问父组件的数据 -->
      <template v-slot:default>
        <p>这是父组件的数据：{{ parentData }}</p>
        <!-- 以下行将会导致错误，因为试图在父组件中访问子组件的数据 -->
        <p>尝试访问子组件的数据：{{ childData }}</p>
      </template>
    </Card>
  </div>
</template>

<script setup>
import Card from '@/components/Card.vue'
import { ref } from 'vue'

// 父组件的数据
const parentData = ref('这是父组件的数据')
</script>

<style>
.parent {
  padding: 20px;
}
</style>
```

子组件

```vue
<template>
  <div class="child">
    <h2>子组件的标题</h2>
    <!-- 这里的插槽将展示从父组件传递的内容 -->
    <slot></slot>
    <p>子组件数据：{{ childData }}</p>
    <p>尝试访问父组件数据：{{ parentData }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 子组件的数据
const childData = ref('这是子组件的数据')
</script>

<style>
.child {
  border: 1px solid #ccc;
  padding: 20px;
  margin-top: 20px;
}
</style>
```

有些时候，我们需要将子组件作用域下的数据通过 **插槽** 传递给父组件，这就涉及到作用域插槽。

子组件：在设置插槽的时候，添加了一些动态属性

```vue
<!-- <MyComponent> 的模板 -->
<div>
  <slot :text="greetingMessage" :count="1"></slot>
</div>
```

父组件：通过 v-slot 并且将值设置为 slotProps，这样就可以拿到子组件传递过来的数据

```vue
<MyComponent v-slot="slotProps">
  {{ slotProps.text }} {{ slotProps.count }}
</MyComponent>
```

如下图所示：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-04-16-075301.png" alt="image-20240416155301318" style="zoom:50%;" />

父组件在接收作用域插槽传递过来的数据的时候，也是能够解构的：

```vue
<MyComponent v-slot="{text, count}">
  {{ text }} {{ count }}
</MyComponent>
```

下面是一个关于作用域插槽的实际使用场景：

子组件通过作用域插槽将数据传递给父组件：

```vue
<template>
  <div class="list-container">
    <ul>
      <li v-for="item in items" :key="item.id">
        <!-- li 里面渲染什么内容我不知道，通过父组件在使用的时候来指定 -->
        <!-- 下面的插槽中，:item=item 就是将子组件的数据传递给父组件的插槽内容 -->
        <slot name="item" :item="item">{{ item.defaultText }}</slot>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 子组件的数据，这个数据可能是通过请求得到的
const items = ref([
  { id: 1, name: 'Vue.js', defaultText: 'Vue.js 是一个渐进式 JavaScript 框架。' },
  { id: 2, name: 'React', defaultText: 'React 是一个用于构建用户界面的 JavaScript 库。' },
  { id: 3, name: 'Angular', defaultText: 'Angular 是一个开源的 Web 应用框架。' }
])
</script>

<style>
.list-container {
  max-width: 300px;
  background: #f9f9f9;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
  background: #fff;
  padding: 10px;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
```

父组件通过 v-slot 来接收到子组件传递过来的数据内容

```vue
<template>
  <div class="app-container">
    <Card>
      <template v-slot="{ item }">
        <!-- 在父组件中来决定子组件的插槽内容 -->
        <h3>{{ item.name }}</h3>
        <p>{{ item.defaultText }}</p>
      </template>
    </Card>
  </div>
</template>

<script setup>
import Card from '@/components/Card.vue'
</script>

<style>
.app-container {
  padding: 20px;
}
</style>
```

关于上面的例子，官方还有一个叫法：无渲染组件

>一些组件可能只包括了逻辑而不需要自己渲染内容，视图输出通过作用域插槽全权交给了消费者组件。我们将这种类型的组件称为**无渲染组件**。

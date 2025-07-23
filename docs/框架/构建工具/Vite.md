# Vite

## **Vite是什么**

是脚手架？是构建工具？

首先搞清楚这两者的定义：

1. 脚手架：帮助我们搭建开发环境的项目代码的工具
2. 构建工具：将代码从开发环境构建到生产环境

构建工具的发展：

1. 第一代构建工具：以 npm scripts、grunt、gulp 为代表的构建工具，这一代构建工具所做的事情主要就是编译、合并以及压缩等工作。
2. 第二代构建工具：以 browserify、webpack、parcel、rollup 为代表的构建工具。这一代构建工具加强了对模块的处理，能够对模块的依赖关系进行处理，对模块进行合并打包。
3. 第三代构建工具：主要就是使用 Rust 将前端工具链全部重构一遍
    - Babel ---> swc
    - PostCSS ---> lightingCSS
    - Electron ---> Tauri
    - ESLint ----> dprint
    - Webpack ---> Turbopack、Rspack
    - rollup ---> rolldown

脚手架的发展：本身是帮助开发者搭建开发环境项目的工具，但是现代脚手架往往内置构建工具

- VueCLI：内置了 webpack 作为构建工具
- CreateReactApp：内置了 webpack 作为构建工具

现在脚手架和构建工具的界限比较模糊了，你可以认为构建工作是脚手架工具里面的一部分。

Vite也是相同的情况：

1. 脚手架：可以搭建各种类型（Vue、React、Sevlte、Solid.js）的项目
2. 构建：包含两个构建工具
    - esbuild：用于开发环境
    - rollup：用于生产环境

**Vite核心原理**

1. webpack的痛点在哪里？

    - 在构建大型项目的时候，非常的慢

    - 因为在启动 webpack 项目的时候，webpack 会先对项目进行打包，然后运行的是打包后的文件

      <img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-07-28-031130.png" alt="image-20240728111129836" style="zoom:30%;" />

2. Vite是如何解决的？

    - 完全跳过打包步骤，利用浏览器的 imports 机制，按需获取内容

      <img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-07-28-031211.png" alt="image-20240728111211153" style="zoom:30%;" />

    - 浏览器针对 .vue 这样的模块文件，需要做编译，编译为 JS 文件再返回给浏览器

      <img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-11-07-124403.png" alt="image-20211107204402787" style="zoom:50%;" />

    - 关于 Vite 中热更新的实现，底层实际上使用的是 websocket 来实现的。


## **Vite配置文件**

在 Vite 中，配置文件**项目根目录下**的 vite.config.js 文件，最基本的格式为：

```js
export default {
  // 配置选项
}
```

如果 Vite 配置文件不在项目根目录下，也可以通过 --config 来进行指定：

```bash
vite --config my-config.js
```

Vite 提供了一个工具函数 defineConfig，通过它可以**方便的获取类型提示**，这对于使用 TS 编写配置尤其有用。

所以一般 Vite 配置文件的基本格式为：

```js
export default defineConfig({
  // 配置选项
})
```

在 Vite 中，配置大致分为这么几类：

1. 普通配置：设置项目的基本选项，别名、根目录、插件....
2. 开发服务器配置：开发服务器的功能，开发服务器的端口、代理、CORS....
3. 构建配置：构建生产版本时候的配置，输出目录、压缩、CSS代码拆分....
4. 预览配置：配置预览服务器的行为，端口、主机名...
5. 依赖优化配置：针对依赖预打包做一些配置，比如可以新增包或者排除包
6. SSR配置：服务器端渲染相关配置
7. Worker配置：Web Worker相关配置

### 普通配置

**1. root**

- 类型：string
- 默认值：process.cwd( ) ，默认就是**项目根目录**
- 描述：**index.html 所在位置**，可以是绝对路径，也可以是相对于当前工作目录的路径。

例如：

```
my-project/
├── public/
│   └── index.html
├── src/
│   ├── main.js
│   └── App.vue
└── vite.config.js
```

这个时候就可以使用 root 来进行配置：

```js
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'public', // 将项目根目录设置为 'public' 文件夹
});
```



**2. define**

- 类型：Record<string, any>

- 描述：**定义全局常量替换**。在开发过程中，这些条目将被定义为全局变量，被定义为全局变量后，意味着不需要通过 import 来导入，直接使用；在构建过程中会被静态替换。

  ```js
  export default defineConfig({
    define: {
      __APP_VERSION__: JSON.stringify('v1.0.0'),
      __API_URL__: 'window.__backend_api_url',
    },
  })
  ```

>注意：Vite 使用 esbuild 的 define 进行替换，因此值表达式必须是包含 **JSON 可序列化**的 值（null、boolean、number、string、array、object）的字符串或单个标识符。对于非字符串值，Vite 会自动将其转换为 JSON 字符串。



**3. resolve**

resolve 对应的值是一个**对象**，对象里面对应了好几项配置。

**alias**

用于配置**路径别名**，这样可以简化模块路径引用。

```js
// vite.config.js
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      // 将 '@' 指向 'src' 目录
      '@': path.resolve(__dirname, 'src'), 
      // 将 '@components' 指向 'src/components' 目录
      '@components': path.resolve(__dirname, 'src/components'), 
      // 将 '@utils' 指向 'src/utils' 目录
      '@utils': path.resolve(__dirname, 'src/utils'), 
    },
  },
});
```

之后在代码中就可以通过别名来指定目录：

```js
// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import HelloWorld from '@components/HelloWorld.vue'; // 使用 '@components' alias
import { helperFunction } from '@utils/helpers'; // 使用 '@utils' alias

createApp(App).mount('#app');
```



**extensions**

在导入时省略文件扩展名时，尝试的文件扩展名列表。

> 注意，不推荐对自定义导入类型（如 .vue）省略扩展名，因为这可能会干扰 IDE 和类型支持。

默认值为 `['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json']`

可以自定义扩展名的顺序，比如优先匹配 ts 类型：

```js
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'], // 自定义扩展名顺序
  },
});
```



**4. CSS**

CSS 配置项对应的值同样是一个**对象**，一个基本的格式如下：

```js
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    // 其他配置项
  }
});
```

下面是一个常见的配置项：

**postcss**：该配置项用于**配置 PostCSS 的行为**，可以是**内联的 PostCSS 配置**，也可以是**自定义目录**。

内联 PostCSS 配置：

```js
// vite.config.js
import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

export default defineConfig({
  css: {
    postcss: {
      // 在这里配置 postcss 相关信息，例如用哪个插件....
      plugins: [
        autoprefixer(),
        cssnano()
      ]
    }
  }
});
```

自定义目录：

```
my-project/
├── config/
│   └── postcss.config.js
├── src/
│   └── main.js
└── vite.config.js
```

这个时候直接指定 postcss 的目录就可以了：

```js
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    postcss: 'config' // 指定自定义目录
  }
});
```



**preprocessorOptions**：该配置项用于为 **CSS 预处理器**指定配置，**文件扩展名**用于**作为键**来设置选项。每个预处理器支持的选项可以在它们各自的文档中找到：

- [Sass/Scss](https://sass-lang.com/documentation/js-api/interfaces/legacystringoptions/) 支持的配置选项
- [Less](https://lesscss.org/usage/#less-options) 支持的配置选项
- styl/stylus - 目前仅支持 [define](https://stylus-lang.com/docs/js.html#define-name-node)，可以作为对象传递。

```js
export default defineConfig({
  css: {
    // 配置 css 预处理器
    preprocessorOptions: {
      less: {
        math: 'parens-division',
      },
      styl: {
        // 目前仅支持 define
        define: {
          $specialColor: new stylus.nodes.RGBA(51, 197, 255, 1),
        },
      },
    },
  },
})
```

**preprocessorOptions[extension].additionalData**：当你想要为 CSS 预处理器（如 SCSS、SASS、Less 等）添加全局样式、变量、或混合器时，该选项非常有用。

```js
import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        // 这里添加了一些全局变量，之后在任何的 Scss 文件中都可以使用这些全局变量
        additionalData: `$injectedColor: orange; $defaultMargin: 10px;`
      }
    }
  }
});
```

```js
import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        // 相当于给所有的 Scss 文件的头部都添加了这个引用，自动导入 mixins.scss 混合器文件
        additionalData: `@import "@/styles/mixins.scss";`
      }
    }
  }
});
```

**preprocessorMaxWorkers**：如果启用了这个选项，那么 CSS 预处理器会尽可能在 worker 线程中运行。可以设置 number 值，也可以设置布尔值，例如设置成 true 的话表示 CPU 数量减 1.



**devSourcemap**：在开发过程中是否启用 source maps，默认值为 false.

```js
export default defineConfig({
  css: {
    // 开启 source maps
    devSourcemap: true
  }
});
```

**transformer**：指定 CSS 处理的引擎，可以设置的值就两个，'postcss' 或者 'lightningcss'

> lightingcss 就是 postcss 的 rust 版本。

### 服务器配置

服务器配置是指**开发服务器**，对应的配置项是 server

一个基本的格式如下：

```js
export default defineConfig({
  server: {
    // 众多配置项
  },
})
```

下面是一个常见的配置项：

**host**

指定服务器应该监听哪个 IP 地址，默认是 localhost.

类型： string | boolean

默认： 'localhost'

思考🤔 正常情况下就是 localhost 就好了呀，什么情况下还存在要修改 host 的情况呢？

答案：除了 localhost 以外，我们经常还需要设置为 0.0.0.0 或者 true，表示监听所有的网络接口请求。有些时候需要多设备来测试应用。

**port**

监听的端口号，默认是 5173.

**strictPort**

如果设置为 true，Vite 将**严格使用指定的端口**。如果端口被占用，服务器启动将失败。

**proxy**

这个配置项非常常用，用于**配置代理服务器**。

```js
export default defineConfig({
  server: {
    proxy: {
      '/foo': 'http://localhost:4567', // 将 '/foo' 前缀的请求代理到 'http://localhost:4567'
    },
  },
});
```

对应的值也可以是对象的形式，对象形式能够包含更多的配置选项：

```js
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // 重写路径，将 '/api' 前缀去掉
      },
    },
  },
});
```

**open**

启动开发服务器时**是否自动在浏览器中打开应用**，默认值是 false.



**https**

是否启用 HTTPS。如果是一个对象，可以指定 **SSL 证书**和**私钥**的路径。

```js
export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync('/path/to/server.key'),
      cert: fs.readFileSync('/path/to/server.crt')
    }
  },
});
```



**watch**

自定义文件监视器的选项。这对于开发过程中的热模块替换（HMR）非常关键。背后其实使用的是 chokidar，一个 Node.js 的文件系统监听库，它提供了多种可配置的监听选项。

```js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    watch: {
      // 任何位于 ignored-directory 目录下的文件
      // 或者任何目录下面的 some-specific-file.txt 文件
      // 内容发生更改都不会触发 HMR
      ignored: ['**/ignored-directory/**', '**/some-specific-file.txt']
    }
  }
});
```

watch 还支持更加细粒度的控制：

```js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    watch: {
      ignored: '**/temp/**', // 忽略 temp 目录
      persistent: true,      // 持续监听变化
      usePolling: true,      // 使用轮询
      interval: 100,         // 轮询间隔 100 毫秒
      binaryInterval: 300    // 对于二进制文件的轮询间隔
    }
  }
});
```

如果想要关闭文件监听，直接设置为 null 即可：

```js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    watch: null
  }
});

```


## **依赖预构建**

**这是什么？**

一句话总结：在你**首次**使用 Vite 启动项目的时候，会把你的项目**依赖**预先构建一次。

思考🤔：前面不是说 Vite 相比 Webpack 的优点不就是不打包么？这里预构建又是怎么一回事儿？

存在的问题：

1. 依赖文件过多，导致请求过多
2. 某些依赖仍然是以 CommonJS 格式发布的，它们并不兼容原生 ESM 环境

为了解决上面的两个问题，Vite在第一次启动项目的时候，会针对 **依赖** 进行一个预构建（打包）

预构建阶段所使用的打包工具是 [esbuild](https://esbuild.github.io/)，这是一个用 Go 语言编写的构建工具，效率极高，**大部分工作都是并行处理的**，esbuild 能够迅速将依赖转换为有效的 ES 模块格式，并进行打包，从而优化依赖管理和加载效率。

esbuild 所做的事情：

1. 转换：将一些 CommonJS、UMD 格式的模块转换为 ES 模块格式。
2. 打包：针对依赖进行打包，减少浏览器在开发环境请求的次数。
3. 最小化和压缩：这个是在构建阶段，针对代码的最小化和压缩也是 esbuild 来做的。


**缓存**

缓存分为两种：

1. 文件缓存
2. 浏览器缓存

针对依赖项做构建后，会将构建产物做缓存，缓存到 node_modules/.vite 目录下面。

什么时候需要重新运行预构建步骤：

- 包管理器的锁文件内容，例如 package-lock.json，yarn.lock，pnpm-lock.yaml，或者 bun.lockb 发生了变化
- 补丁文件夹的修改时间发生了变化
- vite.config.js 中的相关字段发生了变化，在配置文件中也存在依赖预构建的相关配置，依赖预构建相关配置发生了变化，自然需要重新预构建。
- NODE_ENV 的值变动

上述任意一项发生更改时，需要重新运行预构建。


另外，已预构建的依赖，**在浏览器端也会存在缓存**。会使用 HTTP 头 max-age=31536000, immutable 进行**强缓存**，以提高开发期间页面重新加载的性能。一旦被缓存，这些请求将永远不会再次访问开发服务器。

如果安装了不同版本的依赖项（这反映在包管理器的 lockfile 中），则会通过附加版本查询把之前的强缓存自动失效。

例如：当前项目使用了 lodash，当前版本为 4.17.19

```
http://localhost:3000/node_modules/.vite/lodash.js?v=4.17.19
```

之后对 lodash 版本升级，升级到 4.17.20，lockfile文件内容变化会导致重新预构建

```
http://localhost:3000/node_modules/.vite/lodash.js?v=4.17.20
```

URL发生变化后，浏览器就会发生新的请求到开发服务器，而不再使用旧的缓存。



**自定义预构建行为**

在配置文件中，通过 optimizeDeps 对预构建行为进行配置。一个基本的格式：

```js
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    // 其他的配置
  }
});
```



**1. entries**

默认情况下，**Vite 会抓取 index.html 来检测需要预构建的依赖项**（忽略node_modules、build.outDir、\__tests__ 和 coverage）。**如果指定了 build.rollupOptions.input，Vite 将转而去抓取这些入口点**。

如果这两者都不合意，则可以使用 **entries 选项**指定自定义条目，在 Vite 中明确指定应当被预构建的**依赖入口**。

**示例 1：基本用法**

```
my-project/
├── src/
│   ├── main.js         // 主入口文件
│   ├── admin.js        // 管理员入口文件
│   └── vendor/
│       └── custom.js   // 自定义库
├── index.html
└── vite.config.js
```

配置如下：

```js
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    entries: ['src/main.js', 'src/admin.js']  // 显式指定入口文件
  }
});
```

**示例 2：使用 glob 模式**

```js
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    // vite会扫描src目录下面的所有的.js文件，之后会将这些文件引用的依赖做一个预构建处理
    entries: ['src/**/*.js']  // 使用 glob 模式匹配所有 JS 文件
  }
});
```

**示例 3：忽略特定目录**

```js
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    entries: [
      'src/**/*.js',              // 匹配所有 JS 文件
      '!src/experimental/**/*.js' // 但忽略 experimental 目录
    ]
  }
});
```



**2. include和exclude**

include用于包含某个包，exclude用于排除某个包。

默认情况下，预构建主要是针对依赖，也就是 node_modules 下面的包。

```js
export default defineConfig({
  optimizeDeps: {
    include: ['my-lib/components/**/*.vue'],
  },
})
```



**3. esbuildOptions**

Vite 使用 esbuild 来预构建项目依赖，以提高开发服务器的启动速度和整体构建性能。

在大多数情况下，Vite 的默认设置已经足够高效。然而，有时可能需要对 esbuild 的行为进行特定的调整，例如，更改源映射生成、定义宏替换等，以适应特定的项目需求或解决兼容性问题。

**示例 1：自定义源映射**

```js
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      sourcemap: 'inline'  // 将源映射直接嵌入到输出文件中
    }
  }
});
```

**示例 2：使用宏替换**

```js
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      define: {
        'process.env.NODE_ENV': '"production"',
        '__VERSION__': '"1.0.0"'
      }
    }
  }
});
```

**示例 3：调整目标 JavaScript 版本**

```js
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      // esbuild在对依赖进行预构建的时候，会将其编译为ES2015兼容的代码
      target: 'es2015'
    }
  }
});
```

**4. force**

设置为 true 可以强制依赖预构建，而忽略之前已经缓存过的、已经优化过的依赖。


## **构建生产版本**

**构建工具**

不同于 **依赖预构建** 用到的 esbuild，生产构建使用的工具是 rollup. 因为 rollup 提供了一些特性和优势，特别适合用于生产环境的代码打包和优化。

**1. 代码分割和动态导入**

rollup 支持高级的**代码分割**和**动态导入**功能，这对于现代前端应用尤为重要。它能够处理复杂的导入场景，例如**循环依赖**和**动态模块路径**，确保最终打包的文件大小最小且模块之间的依赖正确处理。这些功能在大型应用中可以显著提高加载性能和用户体验。

**2. Tree Shaking**

虽然 esbuild 也支持 tree shaking，但 rollup 的 tree shaking 能力通常被认为更为强大和精准。rollup 能够更有效地识别并剔除未使用的代码，这对于减少最终生产包的体积至关重要。

**3. 插件生态**

rollup 拥有一个成熟且广泛的**插件生态系统**，这使得开发者可以轻松地扩展其构建过程，以适应各种复杂和特定的构建需求。例如，可以通过插件支持各种 CSS 预处理器、图片优化、国际化等。这种灵活性对于生产环境的构建配置是非常有价值的。

**4. 输出控制和优化**

rollup 提供了**更细粒度的控制输出格式和结构的功能**，这对于需要精确控制文件结构和模块化方式的现代应用开发非常重要。例如，rollup 可以生成更为优化的 ES 模块代码，这有助于在现代浏览器中实现更好的性能。

**5. 生产优化**

虽然 esbuild 的构建速度非常快，但在生产环境中，构建速度虽重要，**代码质量**和**优化程度**更为关键。rollup 在这方面提供了更多的优化策略，如更复杂的代码分割和加载策略，这有助于提高应用的性能和可维护性。


总结起来：不同环境下的打包，我们的目标是不一样

- 开发环境：追求的是构建速度
- 生产环境：更多考虑的是打包出来的代码的质量


**自定义构建**

如果仅仅是要把项目构建为生产版本，那非常简单，直接 npm run build 即可，背后运行的是 vite build：

```
"scripts": {
  "build": "vite build"
}
```

不过构建生产版本时经常有一些自定义的需求，此时在配置文件里面的 build 配置项进行配置，一个基本的格式如下：

```js
export default defineConfig({
  build: {
    // 构建相关的配置
  }
})
```

这里介绍一些常用的配置。

**1. target**

该配置项用于定义最终构建产物的 JS 版本和浏览器兼容性。这个设置非常关键，因为它直接影响到代码在不同环境中的运行能力以及可能需要的转译级别。我们来看几个例子

**例子 1：默认设置**

build.target的默认值是 'modules'，这意味着构建出来的产物适用于现代支持 ESM 的浏览器，对应的浏览器版本：

- Edge 88+
- Firefox 78+
- Chrome 87+
- Safari 14+

**例子 2：指定 ES 版本**

```js
export default defineConfig({
  build: {
    target: 'es2015'
  }
});
```

**例子 3：支持特定浏览器版本**

```js
export default defineConfig({
  build: {
    target: 'chrome58'
  }
});
```

**例子 4：多目标设置**

```js
export default defineConfig({
  build: {
    target: ['es2020', 'firefox78', 'chrome87']
  }
});
```

**注意事项**

- esbuild 虽然很快，但可能不支持某些复杂的或尚未广泛采用的 JS 特性。如果遇到了这一类 esbuild 不支持的特性，那么需要是 Babel来做一个补充编译。
- 更改 build.target 会影响构建的输出大小和性能

**2. outDir**

用于指定构建产物的目录，默认是项目根目录下的 dist.



**3. assetsDir**

指定生成静态资源的存放路径，默认是 dist/assets.



**4. cssMinify**

build.cssMinify 配置项允许你单独控制 CSS 文件的最小化压缩方式，独立于 JS 的压缩设置。这个选项在优化构建输出时非常有用，尤其是当你需要精确控制 CSS 和 JS 压缩策略时。下面来举一些例子：

**例子 1：默认行为**

默认是使用 esbuild 来做 CSS 的压缩

**例子 2：使用 Lightning CSS 压缩 CSS**

```js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    cssMinify: 'lightningcss'
  }
});
```

**例子 3：禁用 CSS 压缩**

```js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    cssMinify: false
  }
});
```

**例子 4：独立配置 JS 和 CSS 压缩**

```js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    cssMinify: 'esbuild', // CSS压缩使用esbuild
    minify: 'terser' // JS压缩使用 terser
  }
});
```



**5. minify**

build.minify 用于控制构建过程中的 JS 代码压缩和混淆，这个设置对于优化生产环境的代码尺寸和性能至关重要。

**默认使用 esbuild 来进行压缩**，它比 terser 快 20-40 倍，压缩率只差 1%-2%

如果你需要更高级的压缩选项，或者在某些情况下 esbuild 的压缩结果不符合你的需求，你可以选择使用 terser。

terser 提供了更细致的控制和稍微更好的压缩率，尽管它的速度较慢。

```bash
npm install terser -D
```

```js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    minify: 'terser' // JS压缩使用 terser
  }
});
```



**6. sourcemap**

构建后是否生成 source map 文件。

- 如果为 true，将会创建一个独立的 source map 文件
- 如果为 'inline'，source map 将作为一个 data URI 附加在输出文件中。
- 'hidden' 的工作原理与 true 相似，只是 bundle 文件中相应的注释将不被保留。



**7. rollupOptions**

因为底层使用的是 rollup 进行打包，因此支持所有的 [rollup配置选项](https://rollupjs.org/configuration-options/)。

rollupOptions 配置项对应是一个对象，该对象和 rollup 配置文件导出的选项相同。

**示例**：

1. 添加一个 rollup 插件来处理图像
2. 指定 some-external-lib 为外部依赖
3. 为这个外部依赖提供一个可访问的全局变量 SomeExternalLib

配置如下：

```js
import { defineConfig } from 'vite';
import image from '@rollup/plugin-image'; // 假设这是一个用于处理图像的 Rollup 插件

export default defineConfig({
  build: {
    rollupOptions: {
      plugins:[
        images() // 通过这个rollup插件来处理图像
      ],
      external: ['some-external-lib'], // 指定some-external-lib为外部依赖，不会被打包进去
      output: {
      	globals: {
      		'some-external-lib': 'SomeExternalLib'
    		}
    	}
    }
  }
})
```



**公共基础路径**

该配置项**不属于 build 里面的配置项**，但也是一个非常重要的配置项，主要用于配置开发环境和生产环境的基本公共路径。

- 类型：string
- 默认值：/
- 描述：用于配置开发环境和生产环境的基本公共路径，有效值包括：
   - 绝对 URL 路径名，例如 /foo/
   - 完整 URL，例如 https://bar.com/foo/（开发环境中不会使用 origin 部分，因此其值与 /foo/ 相同）
   - 空字符串或 ./（用于嵌入式部署）

举例：

```
my-project/
├── public/
│   └── index.html
├── src/
│   ├── main.js
│   └── App.vue
├── vite.config.js
└── package.json
```

配置文件：

```js
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/my-app/', // 设置基本公共路径为 '/my-app/'
});
```

之后要访问静态资源的时候，全部会以 /my-app/作为前缀

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My App</title>
  </head>
  <body>
    <script type="module" src="/my-app/src/main.js"></script>
  </body>
</html>
```

假设项目打包：

```
my-project/
├── dist/
│   ├── assets/
│   │   ├── main.12345.js
│   │   └── style.67890.css
│   └── index.html
└── vite.config.js
```

dist/index.html，要访问静态资源，也需要添加公共路径：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My App</title>
    <link rel="stylesheet" href="/my-app/assets/style.67890.css">
  </head>
  <body>
    <script type="module" src="/my-app/assets/main.12345.js"></script>
  </body>
</html>
```

思考🤔：为什么要配置这么一个路径？

答案：因为有些时候我们的应用并非部署在根目录下面，而是部署在某一个子路径或者子目录下面，这个时候就需要通过 base 保证你的静态资源能够正确被加载。



**库模式**

库模式指的是将应用打包成一个依赖库，方便其他应用来使用。这里可以在 lib 配置项里面进行配置：

```js
// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      // ....
    },
  },
})
```

和普通模式区别：

1. 入口文件
   - 普通应用：一般是 index.html，所有的资源从这个入口 HTML 文件开始加载。
   - 库模式：入口文件通常是一个 JS 文件，因为库通常是作为一个资源被其他项目引用
2. 输出格式
   - 普通应用：通过只针对特定的运行环境（大多数浏览器支持即可）进行打包
   - 库模式：往往需要支持多种模块系统，包括 UMD、ESM、CommonJS 这些类型。
3. 外部依赖
   - 普通应用：将所有的依赖打包到一个或者多个文件里面
   - 库模式：往往需要将外部依赖排除掉

总结：在库模式中，需要配置**入口点、库的名称、输出文件名，以及如何处理外部依赖**。这些配置确保库被打包成适用于不同消费场景的格式。

假设有如下的项目目录：

```
my-lib/
├── lib/
│   ├── main.js        // 库的入口文件
│   ├── Foo.vue        // Vue 组件
│   └── Bar.vue        // 另一个 Vue 组件
├── index.html         // 用于开发测试的 HTML 文件
├── package.json
└── vite.config.js     // Vite 配置文件
```

接下来我们要将其打包成一个库，配置文件如下：

```js
// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.js'),
      name: 'MyLib',
      fileName: (format) => `my-lib.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
      },
    },
  },
})
```

- entry: 指定库的入口文件
- name：指定你的库在 UMD 或者 IIFE 环境下的全局变量的名称
- fileName: 最终生成的文件的文件名
- external：排除哪些外部依赖
- globals：外部依赖在 UMD 或者 IIFE 格式下全局变量的名称

配置文件完成后，就可以通过 vite build 进行库模式的构建

```
my-lib/
├── dist/
│   ├── my-lib.es.js        // ES 模块格式
│   ├── my-lib.umd.js       // UMD 格式
│   └── assets/             // 包含所有静态资源，如编译后的 CSS
└── ...
```

构建出来的产物是多种格式，因为要应对不同的环境下使用这个库。

最后还有一个非常重要的步骤：需要在 package.json 里面去配置不同环境的入口文件：

```json
{
  "name": "my-lib",
  "type": "module",
  "files": ["dist"],
  "main": "./dist/my-lib.umd.js",
  "module": "./dist/my-lib.es.js",
  "exports": {
    ".": {
      "import": "./dist/my-lib.es.js",
      "require": "./dist/my-lib.umd.js"
    }
  }
}

```


## **环境变量与模式**

**认识环境变量**

以最熟悉的 import.meta.env.BASE_URL 为例：

```js
// router/index.js
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    // ...
  ]
})
```

该变量在：

- 开发环境中，默认值通常是 '/'
- 生产环境中，这个值可以根据 vite.config.js 文件中的 base 配置项进行设置

Vite 其他内置环境变量：

- import.meta.env.MODE：获取当前应用运行的模式
- import.meta.env.PROD：应用是否运行在生产环境
- import.meta.env.DEV：应用是否运行在开发环境
- import.meta.env.SSR：应用是否运行在 server 上



**NODE_ENV和模式**

代码运行有不同的环境：

1. 开发环境
2. 测试环境
3. 生产环境

不同的环境，需要不同的配置来满足需求。

例如：

**数据库连接**

- 开发环境：通常连接到本地数据库或开发用的数据库服务器，这些数据库可能包含测试数据或模拟数据。
- 测试环境：连接到模拟真实运行状态的测试数据库，这些数据库中的数据结构和生产环境一致，但数据通常是匿名化或专为测试准备的。
- 生产环境：连接到包含真实用户数据的生产数据库，且通常具有高可用性和额外的安全配置。

**API密钥和凭证**

- 开发环境：可能使用具有限制权限的API密钥，这些密钥用于防止在开发过程中对真实数据造成影响。
- 测试环境：使用专为测试设计的密钥，这些密钥可能允许访问更多的测试接口或模拟数据。
- 生产环境：使用具有完整访问权限的API密钥，这些密钥通常需要严格保密，以保护应用和用户数据的安全。

**错误处理**

- 开发环境：错误可能直接显示详细的堆栈信息，便于开发者快速定位问题。
- 测试环境：错误处理可能包括将错误详细记录到日志文件，同时显示给定的错误消息以模拟生产环境的行为。
- 生产环境：错误处理旨在不泄露任何敏感信息，通常只提供一个用户友好的错误消息和一个错误代码，同时将详细信息记录在服务器的安全日志中。



如何指定代码运行的环境呢？

一般可以通过 NODE_ENV 这个环境变量，该变量可以**指定代码的运行环境**，比如 development、production 或 test

通过指定运行环境，从而能够：

- 控制代码行为：开发者可以根据 NODE_ENV 的值在代码中做一些判断，从而执行不同的逻辑

- 影响构建工具和库：很多工具和库也会根据 NODE_ENV 不同的值有不同的行为

  ```js
  if (process.env.NODE_ENV === 'production') {
    // 生产环境的特定逻辑
  }
  
  module.exports = {
    mode: 'development',
    // 其他配置...
  };
  ```



那 Vite 中的**模式**又是什么呢？

一句话总结：在 Vite 中，模式是一个可以在启动时设置的属性，**用来指导 Vite 如何加载 .env 文件**。

.env 的文件**用来存放环境变量**，之后在客户端源码中就可以通过 import.meta.env 来访问对应的值。

另外，**为了防止意外地将一些环境变量泄漏到客户端，只有以 VITE_ 为前缀的变量才会暴露给经过 vite 处理的代码。**

例如：

.env

```
VITE_SOME_KEY=123
DB_PASSWORD=foobar
```

这里只有 VITE_SOME_KEY 会暴露给客户端源码：

```js
console.log(import.meta.env.VITE_SOME_KEY) // "123"
console.log(import.meta.env.DB_PASSWORD) // undefined
```

.env 文件还可以有不同的类型：

```
.env                # 所有情况下都会加载
.env.local          # 所有情况下都会加载，但会被 git 忽略
.env.[mode]         # 只在指定模式下加载
.env.[mode].local   # 只在指定模式下加载，但会被 git 忽略
```

这里的 mode 指代的就是 Vite 里面的模式。

例如，我们可以在 .env.development 和 .env.production 文件中定义不同的环境变量，在使用 Vite 启动应用的时候可以指定对应的模式加载对应的 .env 文件。

```
my-vite-project/
├── .env               # 默认的环境变量
├── .env.development   # 开发环境的环境变量
├── .env.production    # 生产环境的环境变量
├── src/
│   └── main.js
└── vite.config.js
```

.env.development

```
VITE_API_URL=https://dev.api.example.com
DEBUG=true
```

.env.production

```
VITE_API_URL=https://api.example.com
DEBUG=false
```

之后使用 Vite 启动应用的时候，就可以指定特定的模式，从而加载不同的 .env 文件

```
# 开发环境
vite --mode development

# 生产环境构建
vite build --mode production
```



思考🤔：为什么有了 NODE_DEV 还需要 mode 模式？

答案：NODE_DEV 是在 Node.js 环境中最早被支持的一个环境变量，广泛的被用于各大工具和库。而模式是特定于某个构建工具，主要就是用于更加细粒度的场景控制。也就是说，使用 mode 可以在不影响 NODE_DEV 的前提下具备更高的灵活性。



## **CLI**

CLI 属于 HCI 里面的一种。

**计算机科学**

HCI，英语全称 Human-Computer Interaction，中文的意思是“**人机交互**”，也就是研究和设计人类与计算机之间交互的学科。

人机交互最常见的方式：

1. CLI：Command Line Interface，翻译成中文叫做命令行接口，主要通过输入一些文本命令来和计算机进行交互。
2. GUI：图形用户界面，用户使用一些图形元素（图表、按钮...）来和计算机进行交互。现在大多数时候都是采用 GUI 的方式和计算机进行交互，操作系统、办公软件、浏览器

其他的方式有哪些 ？

- 触摸屏
- 语音交互
- 虚拟现实VR以及增强现实AR
- 脑机接口（BCI）
- 可穿戴设备

思考🤔：人机交互方式和执行效率是成正比还是反比？

答案：人机交互方式和执行效率是成反比。早期的 CLI 虽然用户体验最差，但是效率是最高。



**CLI**

CLI 发展历史

1. 早期计算机系统
   - 1950s-1960s：CLI 起源于早期的计算机系统，当时的计算机没有显示器，用户通过纸带、打孔卡片或电传打字机与计算机进行交互。
   - 1960s：UNIX 操作系统的开发大大推动了 CLI 的发展，UNIX 提供了一个功能强大的 shell，用于用户与系统之间的交互。
2. 个人计算机时代
   - 1970s-1980s：随着个人计算机的兴起，CLI 成为主流的用户接口，用户通过命令行执行文件操作、程序运行等任务。
   - 1983年：微软推出MS-DOS（微软磁盘操作系统），这是一个基于 CLI 的操作系统，成为个人电脑上的标准操作系统之一。
3. GUI 的出现与发展
   - 1990s：图形用户界面（GUI）的出现减少了 CLI 在普通用户中的普及，但在专业领域（如开发、网络管理、服务器管理）CLI 仍然保持着重要地位。
   - 现代 CLI 环境：现代操作系统如 Windows、Linux 和 macOS 都提供了 CLI 接口（如 Windows 的 PowerShell 和 CMD，Linux 的 Bash），以满足开发者和系统管理员的需求。

CLI 优缺点

1. 优点：
   - 高效
   - 资源占用少
   - 功能强大

2. 缺点：
   - 学习曲线陡峭
   - 可视化不足



**Vite CLI**

Vite 的 CLI 分为 4 类：

1. 开发服务器
2. 构建生产版本
3. 依赖预构建
4. 本地预览构建产物

**1. 开发服务器**

直接使用 vite 就可以启动。例如使用 Vite 搭建的项目，脚本如下：

```
"scripts": {
  "dev": "vite",
},
```

其中 vite dev 和 vite serve 是 vite 的别名。

这里执行的 vite 其实是 **node modules/.bin** 目录下的可执行命令，所以也可以这样启动项目：

```bash
./node_modules/.bin/vite
```

该命令后面支持一系列的 [参数](https://cn.vitejs.dev/guide/cli.html#options)



**2. 构建生产版本**

通过 vite build 来构建生产版本。

```
"scripts": {
  "build": "vite build",
},
```

```bash
./node_modules/.bin/vite build
```

构建也提供了 [可选参数](https://cn.vitejs.dev/guide/cli.html#options-1)，当然最推荐的还是通过配置文件来进行配置，更加方便一些。

下面是一些常见的配置参数。

1. --target \<target>：指定编译目标，默认为 "modules"。可用于指定不同的浏览器支持。

   示例：vite build --target es2015 将代码编译为 ES2015 标准。

2. --outDir \<dir>：设置输出目录，默认为 dist。

   示例：vite build --outDir build 将构建输出到 build 目录。

3. --assetsDir \<dir>：在输出目录下设置资源目录，默认为 "assets"。

   示例：vite build --assetsDir static 将资源放在 static 目录中。

4. --manifest [name]：生成 manifest.json 文件，该文件用于描述构建后的资源文件与源文件之间的映射关系，这个文件对于服务器端渲染（SSR）或与后端框架集成时非常有用，因为它可以帮助动态引用生成后的静态资源。

   示例：vite build --manifest 在构建后生成 manifest.json 文件。

5. -c, --config \<file>：使用指定的配置文件。

   示例：vite build -c vite.config.custom.js 使用自定义配置文件 vite.config.custom.js。

6. --base \<path>：设置公共基础路径，默认为 /。

   示例：vite build --base /myapp/ 将基础路径设置为 /myapp/。

思考🤔：如果在 CLI 和配置文件中都指定了相同的参数，该如何处理？

答案：CLI 配置的参数的优先级更高，会覆盖配置文件里面的参数。



**3. 依赖预构建**

相当于手动执行一次依赖的预构建，大多数情况不太需要，这里不再赘述。具体的 CLI 命令项请参阅 [官网](https://cn.vitejs.dev/guide/cli.html#vite-optimize).



**本地预览构建产物**

```
"scripts": {
  "preview": "vite preview",
},
```

vite preview 命令在 Vite 中用于启动一个本地的静态预览服务器，这个服务器主要用来预览构建后的应用。

**作用和用途**

1. 预览生产构建

2. 检测部署问题


**使用示例**

假设你已经运行了 vite build 命令，构建了应用，并生成了 dist 文件夹。你可以使用以下命令来启动一个预览服务器：

```bash
vite preview
```

这个命令会启动一个本地服务器，默认监听 4173 端口（如果该端口被占用，会自动寻找下一个可用的端口），之后可以通过浏览器访问 http://localhost:4173 来查看应用。

**配置选项**

vite preview 支持一些命令行选项来自定义服务器的行为，例如：

- --port：指定服务器监听的端口。
- --host：指定服务器的主机名，设置为 0.0.0.0 可以允许外部访问。
- --https：启用 HTTPS。

例如，要在指定端口上启动预览服务器并允许外部设备访问，可以使用：

```bash
vite preview --host 0.0.0.0 --port 8080
```

这将使你的项目在本地网络中可见，方便在多种设备上进行测试。

一句话总结：通过 vite preview 可以检查打包后的代码是否工作正常。以前需要自己用 express 启动一个服务器，将 dist 目录扔进去，现在 vite 直接给你提供了这个预览服务器，更加方便。


## **Vite插件**

**Vite中使用插件**

1. 安装插件
2. 在**配置文件**中引入插件
3. 在 **plugins 数组**中配置插件

```js
// vite.config.js
import { defineConfig } from 'vite';
// 引入插件
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
  // 引入的插件一般是一个方法
  // 因为在使用插件的时候，需要调用一下
  // 调用后一般会返回一个对象
  plugins: [vue(), eslintPlugin()]
})
```



**相关细节**

**1. 传入配置选项**

有些插件在使用的时候支持传递配置选项。

```js
// vite.config.js
import legacy from '@vitejs/plugin-legacy'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    // 在使用插件的时候，向插件方法传入一个配置对象
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
})
```



**2. 执行顺序**

如果配置了多个插件，那么这些插件的执行是**有先后顺序**的，会**按照数组从前到后的顺序**执行。

```js
import { defineConfig } from 'vite';
import pluginA from './pluginA';
import pluginB from './pluginB';
import pluginC from './pluginC';

export default defineConfig({
  plugins: [
    pluginA(), // 先执行 pluginA
    pluginB(), // 然后执行 pluginB
    pluginC()  // 最后执行 pluginC
  ]
});
```



**3. 按需引用**

默认情况下插件在**开发 (serve) 和生产 (build) 模式中都会调用**。

如果插件在服务或构建期间按需使用，可以使用 **apply 属性**指明它们仅在 'build' 或 'serve' 模式时调用。

```js
// vite.config.js
import typescript2 from 'rollup-plugin-typescript2'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    // 这里其实核心就是为返回的对象增加一个属性
    {...typescript2(), apply: 'build'}
  ],
})
```



**常用Vite插件**

Vite插件分为这么几类：

1. 官方插件：就是由 Vite 官方团队开发和维护的，一般这些插件提供一些核心功能支持。
   - @vitejs/plugin-vue: 提供对 Vue 3 的支持，处理单文件组件（.vue 文件）
   - @vitejs/plugin-react: 提供对 React 的支持，包括快速的热模块替换（HMR）
   - @vitejs/plugin-legacy: 提供对旧浏览器的支持，通过为现代语法和特性提供传统浏览器兼容性脚本
2. 社区插件：由社区提供的插件，社区插件通常提供更多的和业务功能以及实用工具相关的支持。
   - vite-plugin-svelte: 用于在 Vite 项目中集成 Svelte。
   - vite-plugin-windicss: 集成 Windi CSS，类似于 Tailwind CSS，为 Vite 项目提供实用的样式工具。
   - vite-plugin-compression：这个插件用于在构建过程中自动压缩资源文件，支持 gzip 或者 brotli 压缩，有助于减小最终部署的文件大小。
   - vite-plugin-pwa: 用于将你的 Vite 项目转换成渐进式网络应用（PWA），包括自动管理 service worker 和 manifest 文件。
   - vite-plugin-svg-icons：用于将 SVG 文件导入并自动转换为 SVG symbol，方便在项目中作为图标使用。
3. rollup插件：因为 Vite 在生产阶段采用的是 rollup，因此 rollup 插件也可以在 Vite 中使用
   - @rollup/plugin-image: 允许导入 JPG, PNG, GIF, SVG, 和 WebP 文件。
   - @rollup/plugin-commonjs: 将 CommonJS 模块转换为 ES6，便于在 Vite 项目中使用更多的 npm 包。
   - rollup-plugin-dsv: 加载并解析 .csv 和 .tsv 文件。



**如何自定义 Vite 插件呢？**

1. Vite 插件扩展了 rollup 接口，然后带有一些 Vite 独有的配置项。所以想要自定义 Vite 插件，建议先了解 [rollup插件开发](https://rollupjs.org/plugin-development/)

2. 还需要了解一些生命周期钩子方法，不同的钩子在不同的时间点被调用，这为插件开发者提供了接入 Vite 内部机制的接口，允许在 Vite 的开发服务器和构建流程中实现更复杂和定制化的功能。

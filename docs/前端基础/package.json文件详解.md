# package.json文件详解

## 1. package.json文件是什么

package.json 文件是项目的清单，是配置和描述如何与程序交互和运行的中心。包管理器（npm, yarn, pnpm
...）用它来识别你的项目并了解如何处理项目的依赖关系。package.json文件使 npm 可以启动项目、运行脚本、安装依赖项、发布到NPM
注册表以及许多其他有用的任务。

## 2. package.json初始化

在项目根目录下运行 `npm init` 或 `yarn init` 命令，会生成一个 package.json 文件。在初始化过程中，会提示你输入项目的名称、版本、描述、入口文件、测试命令、git
仓库、关键字、作者、许可证等信息。

## 3. package.json属性

* `name`：项目名称，必须是小写字母，不能包含空格，可以使用连字符或下划线。
* `type`：项目类型，表示模块的类型，可以是 `commonjs` 或 `module`。如果不指定，默认值为 `commonjs`。
* `version`：项目版本，遵循语义化版本控制（semver）规范，格式为 `major.minor.patch`，例如1.0.1。
* `description`：项目描述，简要说明项目的功能和用途。
* `keywords`：项目关键字，数组形式，可以帮助其他人更容易地找到你的项目。
* `license`：项目许可证，表示项目的使用和分发权限。常用的许可证有 MIT、Apache-2.0、GPL 等。
* `author`：项目作者，可以是个人或组织的名称。
* `contributors`：项目贡献者，可以是个人或组织的名称，数组形式。
* `files`：项目包含的文件，数组形式，可以指定要包含的文件或目录。
* `bin`：项目的可执行文件，通常是一个 JavaScript 文件，可以在命令行中直接运行。
* `man`：项目的手册页，通常是一个文本文件，可以在命令行中使用 `man <command>` 来查看。
* `directories`：项目的目录结构，可以指定一些常用的目录，例如 `lib`、`bin`、`doc` 等。
* `config`：项目的配置选项，可以指定一些常用的配置，例如 `port`、`host` 等。
* `repository`：项目的代码仓库地址，通常是一个 URL 地址，可以是 GitHub、GitLab 等平台的地址。
* `url`：项目的主页地址，通常是项目的文档或演示地址。注意:
  这个项目主页url和homepage属性不同，如果填写了homepage属性，npm注册工具会认为把项目发布到其他地方了，获取模块的时候不会从npm官方仓库获取，而是会重定向到homepage属性配置的地址。
* `homepage`：项目的主页地址，通常是项目的文档或演示地址。注意:
  这个项目主页url和url属性不同，如果填写了url属性，npm注册工具会认为把项目发布到其他地方了，获取模块的时候不会从npm官方仓库获取，而是会重定向到url属性配置的地址。
* `private`：项目是否为私有项目，设置为 `true` 时，表示该项目不能被发布到 npm 注册表。
* `main`：项目的入口文件，默认值为 `index.js`，可以是相对路径或绝对路径。
* `scripts`：项目的脚本命令，可以自定义一些常用的命令，例如 `start`、`test`、`build` 等。可以使用 `npm run <script>` 或
  `yarn <script>` 来执行这些命令。
* `dependencies`：项目的生产依赖，包含项目运行时所需的所有依赖包。可以使用 `npm install <package>` 或 `yarn add <package>`
  来安装依赖包。
* `devDependencies`：项目的开发依赖，包含项目开发时所需的所有依赖包。可以使用 `npm install <package> --save-dev` 或
  `yarn add <package> --dev` 来安装开发依赖包。
* `peerDependencies`：项目的对等依赖，表示项目与其他库或框架的兼容性要求。通常用于插件或库的开发。
* `bundledDependencies`：项目的捆绑依赖，表示项目在发布时会将这些依赖包打包到一起。通常用于一些小型的库或工具。
* `optionalDependencies`：项目的可选依赖，表示这些依赖包不是必需的，如果安装失败不会影响项目的运行。
* `preferGlobal`：表示该项目是否优先安装到全局环境中，设置为 `true` 时，表示该项目优先安装到全局环境中。
* `bugs`：项目的 bug 反馈地址，可以是一个邮箱地址或一个 URL 地址。
* `engines`：项目所需的 Node.js 版本，可以指定一个范围，例如 `">=10.0.0"`，表示需要 Node.js 10.0.0 或更高版本。
* `os`：项目所需的操作系统，可以指定一个范围，例如 `["darwin", "linux"]`，表示支持 macOS 和 Linux 操作系统。
* `cpu`：项目所需的 CPU 架构，可以指定一个范围，例如 `["x64", "arm64"]`，表示支持 x64 和 arm64 架构的 CPU。 

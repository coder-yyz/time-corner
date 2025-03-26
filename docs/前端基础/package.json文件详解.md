# package.json文件详解

## 1. package.json文件是什么
package.json 文件是项目的清单，是配置和描述如何与程序交互和运行的中心。包管理器（npm, yarn, pnpm ...）用它来识别你的项目并了解如何处理项目的依赖关系。package.json文件使 npm 可以启动项目、运行脚本、安装依赖项、发布到NPM 注册表以及许多其他有用的任务。

## 2. package.json初始化
在项目根目录下运行 `npm init` 或 `yarn init` 命令，会生成一个 package.json 文件。在初始化过程中，会提示你输入项目的名称、版本、描述、入口文件、测试命令、git 仓库、关键字、作者、许可证等信息。

## 3. package.json属性
* `name`：项目名称，必须是小写字母，不能包含空格，可以使用连字符或下划线。

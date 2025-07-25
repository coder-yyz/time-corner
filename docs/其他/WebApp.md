# *WebApp* 介绍

## 什么是 *WebApp*

在早期功能机时代，根本不存在什么手机应用的概念。基本上就是你买一个手机，这个手机上面有什么功能，你就用什么功能。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-02-22-034244.png" alt="image-20220222114244141" style="zoom:50%;" />

后面慢慢的新款诺基亚手机，提出了扩展手机应用的概念，除了出厂时手机里面内置的功能以外，用户还可以通过网络下载其他的手机应用。

不过那个时期大多以游戏为主，数量也非常的有限，并且还是按照机型进行区分，一部分机型可以安装某个应用，一部分机型不可以安装。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-02-22-034307.png" alt="image-20220222114307559" style="zoom:50%;" />

后来，智能手机时代来临，*IOS* 和 *Andriod* 两大阵营各自占领了半壁江山，手机也演变成了以应用（*Application*）为主的形态，包括之前大家所熟悉的“电话”、“短信”、“电话簿”等功能，在智能手机中都是以应用的形式存在。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-02-22-034325.png" alt="image-20220222114325328" style="zoom:50%;" />

刚开始的时候智能手机的应用倒也不多，但是智能手机非常机智的提供了一个叫应用市场的平台，允许第三方开发者开发手机应用发布到应用市场上面。

这就带来了一个良好的循环。因为应用市场上有琳琅满目的应用，所以用户愿意用，渐渐用户越来越多；因为用户越来越多，就会让更多的开发者加入进来，为 *IOS* 和 *Andriod* 系统开发手机应用，从而使得应用越来越多。

早期要开发手机应用，需要**根据不同的手机系统使用不同的技术来开发**。

例如如果是开发 *IOS* 应用，早期是使用 *Objective-c*，后来苹果推出了自家的 *Swift* 语言，成为了开发 *IOS* 应用的标准语言。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-02-22-034408.png" alt="image-20220222114407748" style="zoom:50%;" />

而如果是开发 *Android* 应用，早期是使用 *Java* 来进行开发，后面 *JetBrains* 推出了 *Kotlin*，被称之为 *Android* 世界的 *Swift*。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-02-22-034430.png" alt="image-20220222114430152" style="zoom:50%;" />

使用这些技术所开发的手机应用，我们称之为原生应用（*Native App*）。

无论从性能和体验上来讲，都是最好的，唯一的缺点就是成本比较高，因为现在 *IOS* 和 *Andriod* 的使用人群都很多，导致一个公司如果想要推出一个产品，需要找两拨人开发两份。

另外，对于原生应用来讲，不管使用什么技术，都和我们前端是无关的。我们前端是一个使用 *HTML、CSS* 和 *JavaScript* 技术的 *Coder*，哪会掺合这些东西。

那么究竟是什么让我们前端工程师也能在开发手机应用的事情上插上一腿呢？

没错，那就是浏览器。智能手机上面有各种各样的应用，自然少不了浏览器。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-02-22-034452.png" alt="image-20220222114451575" style="zoom:50%;" />

实际上最初在诺基亚时代，手机上就已经提供了浏览器了，不过最初在手机上使用浏览器来浏览网页的体验并不好。

因为早期的网页是采用多页的形式，每点击一个地方就会导致页面整体刷新，而那个年代网速又慢，基本上你点击一个链接后可以放下手机去泡杯茶什么的，之后新的网页就打开了。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-02-22-034514.png" alt="image-20220222114514282" style="zoom:50%;" />

后来有一些在当时来说性能很好的手机，能够直接通过手机浏览器打开 *PC* 端的网页。但是这看上去很不错，实际的体验也很糟糕，因为直接将 *PC* 端的网页搬到手机上，文字会显得非常非常小。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-02-22-034531.png" alt="image-20220222114531339" style="zoom:50%;" />

到了 *2012* 年左右，随着智能手机时代的来临，使用手机浏览器浏览网页的体验才逐步上升。

伴随着 *HTML5*、*CSS3* 的推出，*SPA*（*Single Page Application*）开发模式的流行，*4G* 通信技术的出现，一个网站给用户带来的用户体验越来越好，让人愈发的感觉像是在使用一个手机应用，而非是一个网站。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-02-22-034549.png" alt="image-20220222114548575" style="zoom:50%;" />

因此现在所说的 *WebApp*，总结起来就是移动端的网站或 *H5* 应用，说白了就是特定运行在移动端浏览器上的网站应用。

因为 *SPA* 开发模式的出现，整个网页只有一个页面，所以给人的感觉像是一个应用一样，从而出现了 *WebApp* 的说法。另外由于现在开发一个 *Web* 网站一般都使用 *HTML5、CSS3* 等新的技术，因此 *WebApp* 又被称之为 *H5* 应用。

## *WebApp* 的优缺点

### 优点

1. 开发成本低，可以跨平台，调试方便，开发速度最快

   *WebApp* 一般只需要一个前端人员开发出一套代码，然后即可应用于各大主流浏览器（特殊情况可以代码进行下兼容），没有新的学习成本，而且可以直接在浏览器中调试。

2. 维护成本低

   同上，如果代码合理，只需要一名前端就可以维护多个 *WebApp*。

3. 更新最为快速

   由于 *WebApp* 资源是直接部署在服务器端的，所以只需要替换服务器端的文件，用户访问是就已经更新了（当然需要解决一些缓存问题）。

4. 无需安装 *App*，不会占用手机内存

   通过浏览器即可访问，无需安装，用户就会比较愿意去用。

### 缺点

1. 性能低，用户体验差

   由于是直接通过的浏览器访问，所以无法使用原生的 *API*，操作体验不好。

2. 依赖于网络，页面访问速度慢，耗费流量

   *WebApp* 每次访问都需要去服务端加载资源访问，所以必须依赖于网络，而且网速慢时访问速度很不理想，特别是在移动端，如果网站优化不好会无故消耗大量流量。

3. 功能受限，大量功能无法实现

   只能使用 *HTML5* 的一些特殊 *API*，无法调用原生 *API*，所以很多功能存在无法实现情况。

4. 临时性入口，用户留存率低

   这既是它的优点，也是缺点，优点是无需安装，缺点是用完后有时候很难再找到，或者说很难专门为某个 *WebApp* 留存一个入口，导致用户很难再次使用。

## 开发 *WebApp* 需要哪些技术

既然开发 *WebApp* 使用的就是前端技术，那么自然就离不开我们前端的三驾马车。

- *HTML*
- *CSS*
- *JS*

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-02-22-034613.png" alt="image-20220222114613073" style="zoom:50%;" />

当然前面也说了，之所以称之为 *WebApp*，离不开单页应用的开发模式。现在开发单页应用有非常成熟的框架，例如：*Angular、React、Vue*

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-02-22-034635.png" alt="image-20220222114635235" style="zoom:50%;" />

那么，既然开发 *WebApp* 用到的就是咱们的前端技术，那么是不是意味着就不需要学习其他任何知识了呢？

其实也不是。虽然主要使用的是前端技术，但是对比以前开发 *PC* 端网页，会有如下的区别：

1. 系统
    - *PC*：*Windows/Mac*（区别不大）
    - 移动端：*ios/Android/Windows*（有区别）

2. 浏览器
    - *PC*：区别很大
    - 移动端：区别不大

3. 分辨率（尺寸）
    - *PC*：有区别
    - 移动端：区别很大

因此在开发 *WebApp* 的时候，我们主要需要解决的有以下几方面的问题：

- 适配
- 响应式
- *H5* 调用原生接口
- 兼容性

这些问题就是在开发 *WebApp* 时比较典型的问题

const routerConfig = require('./router.config.json')

module.exports = {
  title: 'Time Corner',
  description: '前端学习笔记',
  base: '/',
  theme: 'reco',
  // head: [
  //   [
  //     'script',
  //     {},
  //     `var _hmt = _hmt || [];
  //     (function() {
  //       var hm = document.createElement("script");
  //       hm.src = "https://hm.baidu.com/hm.js?2f7c6e1628f708d263ab46ce7fac7777";
  //       var s = document.getElementsByTagName("script")[0];
  //       s.parentNode.insertBefore(hm, s);
  //     })();
  //     `,
  //   ],
  // ],
  locales: {
    '/': {
      lang: 'zh-CN',
    },
  },
  extraWatchFiles: [
    '.vuepress/router.config.json',
  ],
  themeConfig: {
    subSidebar: 'auto',
    nav: [
      { text: '首页', link: '/' },
      {
        text: '关于我',
        items: [
          { text: 'Github', link: 'https://github.com/coder-yyz' },
        ],
      },
    ],
    sidebar: routerConfig,
    sidebarDepth: 4,
  },
}

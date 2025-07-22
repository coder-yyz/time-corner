// 生成配置文件
const path = require('path')
const fs = require('fs')

/**
 * 对路由表进行排序，将名字中有数字的节点按数字排序
 * @param {Array} routes - 路由表数组
 * @returns {Array} - 排序后的路由表
 */
function sortRoutes(routes) {
  // 复制原数组，避免修改原始数据
  const sortedRoutes = [...routes];

  // 对当前层级的路由进行排序
  sortedRoutes.sort((a, b) => {
    const numA = extractNumber(a.title);
    const numB = extractNumber(b.title);

    // 如果两个节点都有数字，则按数字排序
    if (numA !== null && numB !== null) {
      return numA - numB;
    }
    // 如果只有A有数字，则A排在前面
    if (numA !== null) {
      return -1;
    }
    // 如果只有B有数字，则B排在前面
    if (numB !== null) {
      return 1;
    }
    // 如果都没有数字，则按原始顺序或字母顺序
    return 0;
  });

  // 递归处理子路由
  sortedRoutes.forEach(route => {
    if (route.children && route.children.length > 0) {
      route.children = sortRoutes(route.children);
    }
  });

  return sortedRoutes;
}

/**
 * 从字符串中提取第一个连续的数字部分
 * @param {string} str - 输入字符串
 * @returns {number|null} - 提取的数字，如果没有则返回null
 */
function extractNumber(str) {
  const match = str.match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
}


const docs_path = path.resolve(__dirname, './docs')

console.log('🚀🚀🚀 开始生成配置文件 🚀🚀', docs_path)


// 递归遍历文件夹生成 router 配置
const router = []
function gen_router_config(dir_path, ref, parent_router_path) {
  try {
    const file_or_dir_list = fs.readdirSync(dir_path)
    file_or_dir_list.forEach((file_or_dir_name) => {
      const current_path = path.join(dir_path, file_or_dir_name)
      const current_stat = fs.statSync(current_path)
      // .vuepress 文件夹 或者 assets 文件夹  或者 images 文件夹
      if (/^\./.test(file_or_dir_name) || file_or_dir_name === 'assets' || file_or_dir_name === 'images') {
        return
      }
      // 文件
      if (current_stat.isFile()) {
        if (file_or_dir_name === 'index.md') {
          return
        }
        const current_router_path = parent_router_path
          ? `${parent_router_path}${file_or_dir_name}`
          : `/${file_or_dir_name}`
        if (/^\README/.test(file_or_dir_name)) {
          return
        }
        const file = {
          title: file_or_dir_name.replace(/\.(md|vue)$/, ''), // 去掉文件后缀
          path: current_router_path
        }
        ref.push(file)
        return
      }
      // 文件夹
      if (current_stat.isDirectory()) {
        const current_router_path = parent_router_path
          ? `${parent_router_path}${file_or_dir_name}/`
          : `/${file_or_dir_name}/`
        // 创建分组
        const group = {
          title: file_or_dir_name,
          path: current_router_path,
          children: []
        }
        ref.push(group)
        gen_router_config(current_path, group.children, current_router_path)
      }
    })
  } catch (error) {
    console.error('💣 ERROR:: gen_router_config error',error)
  }
}
gen_router_config(docs_path, router, '')
router.unshift({ title: '主页', path: '/' })
// 对路由表进行排序
const sortedRouter = sortRoutes(router)
const json = JSON.stringify(sortedRouter)
fs.writeFile('./docs/.vuepress/router.config.json', json, (err) => {
  if (err){
    console.log('💣 ERROR:: node fs.writeFile', err)
    throw err
  }
  console.log('🚀🚀🚀 router 配置已生成 🚀🚀')
})

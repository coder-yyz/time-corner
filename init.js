// 生成配置文件
const path = require('path')
const fs = require('fs')

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
          title: file_or_dir_name,
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
// 递归排序 如果title中存在数字，则按照数字排序

const sort = (a, b) => {
  const aNum = parseInt(a.title.match(/\d+/)?.[0] || '0', 10)
  const bNum = parseInt(b.title.match(/\d+/)?.[0] || '0', 10)
  return aNum - bNum
}
router.sort((a, b) => {
  if (a.children && b.children) {
    return sort(a, b)
  }
  if (a.children) {
    return -1
  }
  if (b.children) {
    return 1
  }
  return sort(a, b)
})

const json = JSON.stringify(router)
fs.writeFile('./docs/.vuepress/router.config.json', json, (err) => {
  if (err){
    console.log('💣 ERROR:: node fs.writeFile', err)
    throw err
  }
  console.log('🚀🚀🚀 router 配置已生成 🚀🚀')
})

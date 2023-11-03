/**
 * 全局变量
 * 菜单配置放在util.js文件中
 */

$(function() {
  buildLinkDom('#zj-qxkb', qxkbList);
  buildLinkDom('#zj-tqsk', tqskList);
})

/**
 * 构建链接DOM
 * @param {*string} id 选择器
 * @param {*any} list 菜单数组
 */
function buildLinkDom(id, list) {
  $(id).empty();
  list.forEach(obj => {
    var dom = `
      <div class="site">
        <img src="${obj.icon}" alt="" />
        <div class="title">${obj.title}</div>
      </div>
    `
    $(id).append(dom);
  });
}
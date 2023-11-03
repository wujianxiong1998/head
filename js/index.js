/**
 * 全局变量
 * 菜单配置放在util.js文件中
 */
var areaName = '浙江省'
var areaCode = '330000000'
$(function() {
  initFiveSystem();
  initModule();
})

/**
 * 初始化各个链接网站
 */
function initFiveSystem() {
  $("#zj-fiveSystem").empty();
  var dom = '';
  fiveSystemList.forEach(function (obj) {
    var top = obj.top;
    var left = obj.left;
    dom += `
      <div
        class="box absolute cursor flex flex-col justify-center items-center"
        style="top: ${top}rem;left: ${left}rem;"
        onclick="onMenu('${obj.link}', '${obj.linkSign ? obj.linkSign : ''}')"
      >
        <div class="title">${obj.title}</div>
        <img class="icon slideTop" src="${obj.icon}" alt="">
      </div>`;
  });
  $("#zj-fiveSystem").append(dom);
}

/**
 * 初始化统计模板
 */
function initModule() {
  drawTQModule();
  drawModule(aiList, '#zj-ai');
  drawModule(appList, '#zj-app');
  drawModule(algList, '#zj-alg');
  drawModule(identifyList, '#zj-identify');
}

/**
 * 构建统计模块
 * @param {*any} list 数据
 * @param {*string} domStr DOM例如：#zj-xxx
 */
function drawModule(list, domStr) {
  $(domStr).empty();
  var dom = '';
  list.forEach(function (obj) {
    dom += `
      <div class="item flex justify-center">
        <img src="${obj.icon}" alt="">
        <div class="right flex flex-col justify-between">
          <div>${obj.title}</div>
          <div class="data flex items-center">
            <div class="num">${obj.num}</div>
            <div class="unit">${obj.unit}</div>
          </div>
        </div>
      </div>
    `;
  });
  $(domStr).append(dom);
}

/**
 * 构建天擎统计模块
 */
function drawTQModule() {
  var dom = '';
  tqList.forEach(function (obj) {
    dom += `
      <div class="item flex justify-center">
        <img src="${obj.icon}" alt="">
        <div class="flex flex-col justify-between">
          <div>${obj.title}</div>
          <div class="data flex items-center">
            <div class="num">${obj.nums[0]}${obj.units[0]}</div>
            <div class="num">${obj.nums[1]}${obj.units[1]}</div>
          </div>
        </div>
      </div>
    `;
  });
  $("#zj-tq").append(dom);

  /* 常用接口TOP5 */
  var infoDom = `
    <div class="title-bg flex justify-center items-center">
      <div style="color: #7CC0FF;">常</div>
      <div>用接口TOP5</div>
    </div>
    <div>接口总数18个</div>
    <div>调用总数18万次</div>
  `;
  $("#zj-interface-info").append(infoDom);

  /* 天擎接口统计 */
  var chartDom = '';
  var total = interfaceList.map(function (a) {
    return Number(a.num);
  }).reduce(function (p, n) {
    return Number(p) + Number(n);
  });
  interfaceList.forEach(function (obj, ids) {
    chartDom += `
      <div>
        <div class="element flex justify-between">
          <div class="flex items-center">
            <div class="label">${obj.title}</div>
            <div class="top">TOP${ids + 1}</div>
          </div>
          <div class="num">${obj.num}次</div>
        </div>
        <div class="bar-box"><div id="id${ids}" class="bar"></div></div>
      </div>
    `
  });
  $("#zj-interface-chart").append(chartDom);
  interfaceList.forEach(function (obj, ids) {
    var width = obj.num / total * 100;
    $(`#id${ids}`).css('width', width + '%');
  });
  interfaceList.forEach(function (obj, ids) {
    var width = obj.num / total * 100;
    $(`#id${ids}`)[0].animate([
      {
        width: '0%',
        opacity: 0.5
      },
      {
        width: `${width}%`,
        opacity: 1
      },
    ], {
      duration: 1200,
    });
  })
}

/**
 * 打开链接
 * @param {*string} url 跳转
 * @param {*string} sign 行政区划链接符号
 */
function onMenu(url, sign = '?') {
  if (!sign) {
    sign = '?'
  }
  var linkUrl = `${url}${sign}areaName=${areaName}&areacode=${areaCode}`;
  window.open(linkUrl);
}

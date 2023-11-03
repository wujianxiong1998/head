(function flexible(window, document) {
 var rate = 1920
 // flexible.js原代码
 var docEl = document.documentElement
 var dpr = window.devicePixelRatio || 1

 // adjust body font size
 function setBodyFontSize() {
     if (document.body) {
         document.body.style.fontSize = (16 * dpr) + 'px'
     } else {
         document.addEventListener('DOMContentLoaded', setBodyFontSize)
     }
 }
 setBodyFontSize();

 // set 1rem = viewWidth / 120
 function setRemUnit() {
     var rem = docEl.clientWidth / rate
     
     docEl.style.fontSize = rem + 'px'
 }

 setRemUnit()

 // reset rem unit on page resize
 window.addEventListener('resize', setRemUnit);
 window.addEventListener('pageshow', function(e) {
     if (e.persisted) {
         setRemUnit()
     }
 })

 // detect 0.5px supports
 if (dpr >= 2) {
     var fakeBody = document.createElement('body')
     var testElement = document.createElement('div')
     testElement.style.border = '.5px solid transparent'
     fakeBody.appendChild(testElement)
     docEl.appendChild(fakeBody)
     if (testElement.offsetHeight === 1) {
         docEl.classList.add('hairlines')
     }
     docEl.removeChild(fakeBody)
 }



}(window, document));

// 窗体变化监听
$(window).resize(function() {
// 查询窗口宽度并设置1rem的像素值
 var windowWidth = $(window).width() / 1920;
// 设置css
 $("html").css("font-size", windowWidth + "px!important")

})
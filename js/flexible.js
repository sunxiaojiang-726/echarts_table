;(function flexible(window, document) {
  // 获取html的根元素
  var docEl = document.documentElement
  // dpr物理像素比
  // 如果当前浏览器有物理像素比(比如移动端,iphone6-8的dpr为2),则直接拿到,否则就按照1处理(pc端dpr为1)
  var dpr = window.devicePixelRatio || 1

  // 设置body的字体大小
  function setBodyFontSize() {
    // 如果页面中有body这个元素,就设置body字体大小
    if (document.body) {
      document.body.style.fontSize = 12 * dpr + 'px'
    } else {
      // 如果页面中没有body这个元素(因为如果在病毒引入该flexible.js文件,此时DOM还没加载完毕)
      // 则等着我们页面的主要要素加载完毕再去设置body的字体大小.  document的DOMContentLoaded事件
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize()

  // 计算html节点字体大小 = html的宽度/10
  // set 1rem = viewWidth / 10
  function setRemUnit() {
    var rem = docEl.clientWidth / 20
    docEl.style.fontSize = rem + 'px'
  }

  setRemUnit()

  // 当页面大小发生变化时，重新设置rem的大小
  window.addEventListener('resize', setRemUnit)
  // pageshow是我们重新加载页面时触发的事件
  window.addEventListener('pageshow', function (e) {
    // 如果是从缓存中取过来的页面，也需要重新计算一下rem的大小
    if (e.persisted) {
      setRemUnit()
    }
  })

  // 解决有些移动端浏览器不支持0.5像素的写法
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
})(window, document)

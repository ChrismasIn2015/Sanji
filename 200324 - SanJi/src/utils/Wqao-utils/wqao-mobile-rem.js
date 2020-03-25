//动态设置页面根字体
(function(doc, win) {
  //1.找到HTML页面根结点
  let html = doc.getElementsByTagName("html")[0],
    //2.设置全局事件 = 屏幕发生改变事件
    reEvt = "orientationchange" in win ? "orientationchange" : "resize", //转屏/缩放
    //3.设置回调函数
    reFontSize = function() {
      var clientW = doc.documentElement.clientWidth || doc.body.clientWidth; //当前屏幕宽度
      if (!clientW) {
        return;
      }
      // 设计稿/字体 = 1920px/16px = 屏幕宽/1rem
      let rem = (clientW * 16) / 1920;
      rem = rem < 12 ? 12 : rem;
      html.style.fontSize = rem + "px";
    };
  //5.全局添加事件监听(全局事件/回调)
  win.addEventListener(reEvt, reFontSize);
  //6.DOMContentLoaded->dom加载完就执行,onload要dom/css/js都加载完才执行
  doc.addEventListener("DOMContentLoaded", reFontSize);
})(document, window);

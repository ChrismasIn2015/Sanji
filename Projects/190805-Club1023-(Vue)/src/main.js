//动态设置页面根字体
(function(doc, win){
    //1.找到HTML页面根结点
    let html = doc.getElementsByTagName("html")[0],
    //2.设置全局事件=屏幕发生改变事件
    reEvt = "orientationchange" in win ? "orientationchange" : "resize",//转屏/缩放
    //3.设置回调函数
    reFontSize = function() {
      var clientW = doc.documentElement.clientWidth || doc.body.clientWidth;//当前屏幕宽度
      if(!clientW) {return;}
      //设计稿字体/界面 = 16/1200,实际字体/界面 = 1rem/clientW
      // 1rem = 16*clientW/1200
      // 铺满界面 = 1rem*1200/16
      html.style.fontSize = 16*clientW/1200 + "px";
      // window.console.log(html.style.fontSize)
    }
    //5.全局添加事件监听(全局事件/回调)
    win.addEventListener(reEvt, reFontSize);
    //6.DOMContentLoaded->dom加载完就执行,onload要dom/css/js都加载完才执行
    doc.addEventListener("DOMContentLoaded", reFontSize);
})(document, window);

//使用VUE
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import router from './router/router.js';
new Vue({

  render: h => h(App),//函数式地添加一个模板,添加到#app下面

  router: router,

}).$mount('#app')//绑定对应的#app标签

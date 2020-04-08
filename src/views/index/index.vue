<template>
  <div class="index">
    <div class="index-entry">
      <div class="entry common-btn" @click.stop="toLibrary">笔记系统</div>
      <div class="entry common-btn blue-on">资源地图</div>
      <div class="entry common-btn blue-on" @click.stop="leetCode">Leet Code Test</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    toLibrary() {
      this.$router.push({ name: "library" });
    },
    leetCode() {
      // 1.
      function MyPromise(excutor) {
        var self = this;
        self.onResolvedCallback = [];
        function resolve(value) {
          setTimeout(() => {
            self.data = value;
            self.onResolvedCallback.forEach(callback => callback(value));
          });
        }
        excutor(resolve.bind(self));
      }
      MyPromise.prototype.then = function(onResolved) {
        var self = this;
        // 一定要返回一个新的promise
        // promise2
        var async2 = resolve => {
          console.log("执行then的同步代码");
          self.onResolvedCallback.push(function() {
            var result = onResolved(self.data);
            result instanceof Promise ? result.then(resolve) : resolve(result);
          });
        };

        return new MyPromise(async2);
      };
      // 2.
      function myAsync(resolve) {
        setTimeout(() => {
          console.log("执行用户的异步代码");
          resolve("async 500");
        }, 500);
      }
      var tt = new MyPromise(myAsync).then(res => {
        console.log("then res");
      });
      console.log("sync 0");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./styles/index.scss";
</style>

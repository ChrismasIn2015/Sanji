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
      // ++++++++++++++.++++++++++++++.++++++++++++++.++++++++++++++.++++++++++++++.++++++++++++++ 构造函数
      function MyPromise(excutor) {
        // 1.
        this.onResolvedCallback = [];

        // 2.
        function resolve(value) {
          setTimeout(() => {
            console.log("async resolve run !", value);
            this.data = value;
            this.onResolvedCallback.forEach(callback => callback(value));
          });
        }

        // 3.
        excutor(resolve.bind(this));
      }
      MyPromise.prototype.then = function(onResolved) {
        console.log("then wanner return a new Promise! ↓↓");
        let thenExcutor = temp => {
          this.onResolvedCallback.push(() => {
            let result = onResolved(this.data);
            result instanceof MyPromise2 ? result.then(temp) : temp(result);
          });
          console.log("excute when building !", this);
        };
        return new MyPromise2(thenExcutor);
      };
      function MyPromise2(excutor) {
        this.onResolvedCallback = [];
        function resolve(value) {
          setTimeout(() => {
            console.log("async resolve run !", value);
            this.data = value;
            this.onResolvedCallback.forEach(callback => callback(value));
          });
        }
        console.log("build a Promise!");
        excutor(resolve.bind(this));
      }
      MyPromise2.prototype.then = mythen;
      // ++++++++++++++.++++++++++++++.++++++++++++++.++++++++++++++.++++++++++++++.++++++++++++++ then 方法

      // 2.++++++++++++++.++++++++++++++.++++++++++++++.++++++++++++++.++++++++++++++.++++++++++++++ 实例
      function myAsync(resolve) {
        console.log("user excute when building !");
        setTimeout(() => {
          resolve("user result");
        }, 1000);
      }
      var tt = new MyPromise(myAsync);
      tt.then(res => {
        return "then 1";
      })
        .then(res => {
          return new MyPromise(function(resolve) {
            setTimeout(() => {
              resolve("then 2");
            }, 4000);
          });
          // return "then 2";
        })
        .then(res => {
          return new MyPromise(function(resolve) {
            setTimeout(() => {
              resolve("then 3");
            }, 4000);
          });
        })
        .then(res => {
          return "then 4";
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./styles/index.scss";
</style>

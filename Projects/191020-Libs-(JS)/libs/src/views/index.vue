<template>
  <div class='index'>
      <div class="index-item" @click="goto('tree')">Tree</div>
      <div class="index-item" @click="goto('canvas')">Canvas</div>
  </div>
</template>

<script>
export default {
    methods: {
        goto (index) {
            this.$router.push( { name: index} )
        }
    }
}
</script>

<style scoped>
    .index{
        width: 80%;
        height: 80%;
        border: 1px solid black;
        margin: 0 auto;

        display: flex;
        justify-content: center;
        align-items: center;
    }
    .index-item{
        width: 100px;
        height: 100px;
        border: 1px solid black;
        margin: 0px 20px;

        text-align: center;
        line-height: 100px;
    }
</style>
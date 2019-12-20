<template>
  <div class='index'>
      <div class="index-item" v-for='(item, index) in entry' :key='index' @click="goto(item.route)">{{ item.name }}</div>
  </div>
</template>

<script>

export default {
    data () {
        return {
            entry: [
                { name: 'Tree', route: 'tree' },
                { name: 'Canvas', route: 'canvas' },
                { name: 'Doc', route: 'doc' },
            ]
        }
    },
    created () {
        
    },
    methods: {
        goto (route) { this.$router.push(route) }
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
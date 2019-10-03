<template>
    <div class='o_nav'>
        <!-- 导航条 -->
        <div class="level clearfix">
            <!-- 旋转图片 -->
            <div class="sports">
                <div class="spotr_round">
                    <div class="sport adidas"></div>
                    <div class="sport converse"></div>
                    <div class="sport FILA"></div>
                    <div class="sport jodan"></div>
                    <div class="sport nb"></div>
                    <div class="sport nike"></div>
                    <div class="sport puma"></div>
                    <div class="sport vans"></div>
                </div>
            </div>
            <ul>
                <li v-for='i in items' :key="i.name">
                    <a>
                        <router-link :to="{ name:'index',params:{path:i.links} }">{{ i.name }}</router-link>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default{
        data:function(){
            return {
                items:[
                    {name:'首页',links:'/'},
                ]
            };
        }
    }
</script>

<style scoped>
    @import '../assets/css/index/nav_0.css';
</style>

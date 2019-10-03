<template>
    <div @wheel="addItem">
        <myNav></myNav>
        <div class="items">
            <div class="head">{{ name }}  系列:</div>
            <a class="itemCon" v-for='(arr,arrKey,index) in main' :key='index'>
                <div class="itemOne" >
                    <router-link to='/'>
                        <img :src='arr[1]' @click.prevent = routesAdd(name,arrKey)>
                    </router-link>
                    <div class="label">
                        <div>{{ arrKey }}</div>
                        <div>${{ arr[0] }}.00 </div>
                    </div>
                </div>
            </a>
        </div>
    </div>
</template>

<script>
    import myNav from '../components/myNav.vue'
    export default {
        data:function(){
            return{
                name:"",
                goods : {},//明细列表
                main:[],//辅助:明细列表
                count:0,//辅助:明细列表
            }
        },
        props:['DBfromApp'],//使用父组件App的DB数据
        methods:{
            addItem:function(){// 懒加载函数
                // 在main中放入current个数据
                // 1. 清空main
                this.main = {};
                // 2. 放入数据，然后就展示main里的数据
                this.count += 12;
                let countTemp = 0;
                for(let key in this.goods){
                    this.main[key] = this.goods[key];
                    countTemp++;
                    if(countTemp == this.count){
                        break;
                    }
                }
            },
            // 这个函数通过路由传递了参数
            routesAdd:function(name,good){
                this.$router.push(
                    {path:'/items/'+name+'/'+good}
                );
            },
        },
        components:{
            myNav,
        },
        created:function(){
            this.name = this.$route.params.name// 1.保存通过路由传递的参数
            this.goods = this.DBfromApp.getItems(this.name);//2.使用参数来在数据库中查找数据
            this.addItem();//进行一次懒加载
        },
    }
</script>

<style scoped>
    @import '../assets/css/items/items.css';
</style>

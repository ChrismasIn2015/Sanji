<template>
    <div class='good'>

        <!-- 左侧的轮播图 -->
        <div class="goodImg block" :style="imgSize">
            <img :src='images[1]'>
        </div>

        <!-- 右侧的信息页 -->
        <div class="goodMsg block" :style="imgSizeRight">
            <img src='../assets/image/detail/timg.jpg'>
        </div>
        <!-- 移动端信息页 -->
        <div class="goodMsg block mobileGMS">
            <img src='../assets/image/detail/timg.jpg'>
        </div>

        <!-- 按钮 -->
        <div class="goodBtns">
            <div @click='widthChange' class='divbtn no'>{{ imgMsg }}</div>
            <router-link :to="{ name:'items', params:{ name:name }}" class='divbtn'>返回</router-link>
            <div class='divbtn' v-show="btnView" @click="addGood()">加入购物车</div>
            <div class='divbtn' v-show="btnView" @click="showCar()">查看购物车</div>
            <router-link to='/login' class='divbtn' v-show="!btnView">登录</router-link>
            <!-- <div class='divbtn' v-show="!btnView" @click="addGood()">加入购物车</div> -->
        </div>

        <!-- 购物车 -->
        <myCar v-show="carView" 
            :DBfromApp='DBfromApp' 
            ref='carCom' 
        ></myCar>
    </div>
</template>

<script>
    import myCar from '../components/myCar.vue';
    export default {
        data:function(){
            return{

                // 商品数据
                name:"",
                good:"",
                images:{},

                // 左右页面控制
                imgMsg:'查看详情',
                imgNum:100,
                btnView:false,
                carView:false,//购物车
            }
        },
        props:['DBfromApp'],//使用父组件App的DB数据
        computed:{
            // 左右页面控制
            imgSize:function(){return{
                    width:(this.imgNum)+'%'
                }
            },
            imgSizeRight:function(){
                return{
                    width:(100-this.imgNum)+'%'
                }
            },
        },
        methods:{
            // 界面宽度函数
            widthChange:function(){
                if(this.imgNum==70){
                    this.imgNum=100;
                    this.imgMsg='查看详情';
                    return;
                }
                this.imgNum = 70;
                this.imgMsg='隐藏介绍';
            },
            showCar:function(){//展示购物车
                this.carView = !this.carView;
            },
            addGood:function(){//添加一条购物车数据并展示购物车
                //调用子组件的方法从数据库获得数据更新数据
                this.$refs.carCom.addCarData1(this.$route.params.name,this.$route.params.good);
                this.showCar();
            },
        },
        components:{
            myCar:myCar,
        },
        created(){
            if(localStorage.club1023User != ""){ this.btnView = !this.btnView }
            //获得路由参数初始化商品数据
            this.name = this.$route.params.name;//获得大分类
            this.good = this.$route.params.good;//获得单品名称
            this.images = this.DBfromApp.getItem(this.name,this.good);//这是单品数组[price,src]
        },
    }
</script>

<style scoped>
    @import '../assets/css/good/good.css';
</style>

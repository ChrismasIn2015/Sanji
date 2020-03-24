<template>
  <div class='main' >

    <!-- 顶部导航条 -->
    <myNav></myNav>

    <!-- 移动端按钮 -->
    <label for='downShowBtn' class='downShow'>菜单</label>
    <!-- 左菜单 -->
    <div class="layout2">
        <input type='checkbox' id='downShowBtn'>
        <div class="down_container">
            <div class="down" v-for='i in downs' :key='i.name'>
                <div class="down-btn">{{i.name}}</div>
                <div class="menu">
                    <router-link :to="{name:'good',params:{name:i.belone,good:m}}" 
                        v-for='m in i.menus' :key= m >{{ m }}</router-link>
                </div>
            </div>
        </div>

        <!-- 右轮播图 -->
        <div class="adImgs">
            <img v-for="(i,index) in images" :key=index :src='i.src' v-show="mark===index" @click.prevent>
        </div>
    </div>

    <!-- 商品汇总 -->
    <div class="indexGoods">
        <div v-for='(value,key,index) in goods' :key="index" class="goodsbox">
            <!-- value是商品数据汇总中的大分类对象 -->
            <!-- key是商品数据汇总中的大分类对象名称 -->
            
            <!-- 导航条 -->
            <a id="nav_a" @mouseenter='mouseIn(index)' :class="{active:index==current}">{{ key }}</a>
            
            <!-- 商品组合 -->
            <div class="content" v-show="index==current">
                <!-- 一级商品简略表 -->
                <div class="item" v-for='(goodVal,goodKey,valueIndex) in value' :key='valueIndex'>
                    <a>
                        <router-link :to="{name:'good',params:{name:key,good:goodKey}}">
                            <img :src='goodVal[1]'>
                        </router-link>
                        <div class="label">
                            <div>{{ goodKey }}</div>
                            <div>$ {{ goodVal[0] }}.00</div>
                        </div>
                    </a>
                </div>
                <div class="footerPos">
                    <!-- 进入一级商品明细表 -->
                    <a @click='routesAdd(key)' class="moreItem"> 
                        查看更多 {{ key }} 系列
                        <router-link to='/items'></router-link>
                    </a>
                    <!-- 底部 -->
                    <div class="footer">
                        <a>我的github: https://github.com/ChrismasIn2015</a>
                        <a>我的邮箱: wqao1023@qq.com</a>
                        <a>我的电话<label style="color:green;font-weight:bold;">( 微信 )</label> : 132 6391 1023 (黄文强)</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- 按钮 -->
    <loginBtns :DBfromApp='DBfromApp'></loginBtns>

  </div>
</template>

<script>
    import myNav from '../components/myNav.vue';
    import loginBtns from '../components/loginBtns.vue';

    export default {
        data: function(){
            return{
                // 左侧菜单数据
                downs:[
                    {
                        name:"今日推荐",
                        belone:'Adidas',
                        menus:['Adiads365','Adiadsfly','Adiads0020','Adiads0010']},
                    {
                        name:"女子",
                        belone:'nike',
                        menus:['Nike365','Nikefly','Nike0020','Nike0010']},
                    {
                        name:"男子",
                        belone:'NewBee',
                        menus:['NewBee365','NewBeefly','NewBee0020','NewBee0010']},
                    {
                        name:"成人",
                        belone:'Converse',
                        menus:['Converse365','Conversefly','Converse0020','Converse0010']},
                    {
                        name:"儿童",
                        belone:'Adidas',
                        menus:['Adidas365','Adidasfly','Adidas0020','Adidas0010']},
                ],
                //右侧轮播图数据
                mark:0,
                images:[
                    {src:require('../assets/image/ads/bc1.jpg')},
                    {src:require('../assets/image/ads/bc2.jpg')},
                    {src:require('../assets/image/ads/bc3.jpg')},
                    {src:require('../assets/image/ads/bc4.jpg')},
                ],
                //商品汇总数据
                current:0,
                goods : {},
            }
        },
        props:['DBfromApp'],//使用父组件App的DB数据
        methods:{
            //大分类数据辅助函数
            mouseIn:function(index){
                this.current = index;
            },
            // 这个函数通过路由传递了参数
            routesAdd:function(name){
                this.$router.push(
                    {path:'/items/'+name}
                );
            },
        },
        components: {
            myNav,
            loginBtns,
        },
        created(){
            // 轮播图辅助函数,这里使用箭头函数改变this指向
            this.timer = setInterval( ()=>{
                this.mark++;
                if(this.mark > (this.images.length-1)) this.mark=0;
            },2500);

            //从数据库获得商品大分类数据,但是只需要前14个
            this.goods = this.DBfromApp.get14Goods(14);
        },
    }
</script>

<style scoped>
    @import '../assets/css/index/menu_1.css';
    @import '../assets/css/index/ads_2.css';
    @import '../assets/css/index/goods_3.css';
    @import '../assets/css/index/footer_4.css';
</style>

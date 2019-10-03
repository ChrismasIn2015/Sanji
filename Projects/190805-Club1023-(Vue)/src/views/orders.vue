<template>
    <div class='orders'>
        <!-- 导航条 -->
        <myNav></myNav>

        <!-- 订单信息 -->
        <div class="order" v-for="(order,index) in myOrders" :key='index'>
            <!-- 图片 -->
            <img :src='order.goodMsg.img'>
            <!-- 信息 -->
            <div class="orderMsg">
                <div>{{ order.goodMsg.name }}</div>
                <div>￥ {{ order.goodMsg.price }}</div>
            </div>
            <div class="orderMsg">
                <div>数量</div>
                <div>{{ order.goodMsg.num+" 件" }}</div>
            </div>
            <!-- 按钮 -->
            <div class="orderBtn">
                <div>
                    <a style="cursor:default;">{{ states[order.state].msg0}}</a>
                </div>
                <div :class='orderCss[states[order.state].msg1[1]]' @click="stateChange(order.state,index)">
                    <a>{{ states[order.state].msg1[0]}}</a>
                </div>
                <div :class='orderCss[states[order.state].msg2[1]]' @click="cancelOrder(index)"
                    v-show="states[order.state].msg2[1]==3?false:true">
                    <a >{{ states[order.state].msg2[0]}}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import myNav from '../components/myNav.vue'
    export default {
        data:function(){
            return{
                states:[
                    {msg0:'待支付', msg1:['支付',1], msg2:['取消订单',0],},//0
                    {msg0:'已支付', msg1:['退款',2], msg2:['',3]},//1
                    {msg0:'已发货', msg1:['',3], msg2:['删除订单',0]},//2
                    {msg0:'已完成', msg1:['',3], msg2:['',3]},//3
                    {msg0:'已退款', msg1:['',3], msg2:['',3]},//4
                    {msg0:'待发货', msg1:['发货',1], msg2:['',3]},//5
                ],
                orderCss:['btnRed','btnPay','btnBack','btnNone'], 
                myOrders:[
                    // 订单状态，商品图片/名称/价格/连接 - 用于渲染页面
                    // { 
                    //     state:0, 
                    //     goodMsg:{
                    //         img:require('../assets/image/items/adidas/01.jpg'),
                    //         name:'adidas 365',
                    //         price:'199',
                    //         num:'1',
                    //     }, },
                ],
            }
        },
        props:['DBfromApp'],//使用父组件App的DB数据
        methods:{
            stateChange(stateNum,index){// = 更改订单数据
                switch(stateNum){
                    //支付订单
                    case 0:{
                        if(window.confirm("确认要支付吗")){// window.console.log('开始')
                            this.DBfromApp.getOrdersDB().changeState(localStorage.club1023User,index,stateNum);
                            // window.console.log('开始重新渲染')
                            this.upDataOrders();
                        }else{
                            return false;
                        }
                        break;
                    }
                    //退款
                    case 1:{
                        if(window.confirm("确认要退款吗")){// window.console.log('开始')
                            this.DBfromApp.getOrdersDB().changeState(localStorage.club1023User,index,stateNum);
                            // window.console.log('开始重新渲染')
                            this.upDataOrders();
                        }else{
                            return false;
                        }
                        break;
                    }
                }
            },
            cancelOrder(index){//删除订单
                if(window.confirm("确认要取消吗")){
                    // window.console.log('开始删除订单')
                    this.DBfromApp.getOrdersDB().delOrder(localStorage.club1023User,index);
                    // window.console.log('开始重新渲染')
                    this.upDataOrders();
                }
            },
            upDataOrders(){
                //从数据库获得数据 重新渲染页面
                if(localStorage.club1023User=="") return window.console.log("尚未登录");//防一手
                let dbData = this.DBfromApp.getOrdersDB().queryOrders(localStorage.club1023User);
                //返回[['单品名称',[价格/图片/数量/分类]],....]
                // window.console.log('此时的数据库是 ↓')
                // window.console.log(dbData)
                if(dbData.length==0){
                    this.myOrders = Object.assign([]);
                    return true;
                }
                let temp = [];
                for(let i=0;i<dbData.length;i++){
                    temp[i] = { 
                        state:dbData[i][1][4], 
                        goodMsg:{
                            img:dbData[i][1][1],
                            name:dbData[i][0],
                            price:dbData[i][1][0],
                            num:dbData[i][1][2]
                        }
                    }
                    // window.console.log(dbData[0])
                    // window.console.log(dbData.length)
                }
                this.myOrders = Object.assign([],this.myOrders, temp);
                
                // window.console.log('此时的渲染数据是 ↓')
                // window.console.log(this.myOrders)
            }
        },
        components:{
            myNav,
        },
        created(){
            // window.console.log('orders组件启动')
            this.upDataOrders();
        },
    }
</script>

<style scoped>
    @import '../assets/css/orders/orders.css';
</style>

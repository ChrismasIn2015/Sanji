<template>
  <div class='myCar'>
      <div class="car">
          <!-- 关闭按钮 -->
          <div class="close" >
              <img :src="require('../assets/image/detail/close.jpg')" @click='closeCar()'>
          </div>
          <!-- 购物车 -->
          <div class="orders" v-for='(goods,goodKey) in carData' :key='goodKey'>
              <input class='orderBox' type="checkbox" :value='[goodKey,goods]' v-model='ordersData'>
              <img :src='goods[1]'>
              <div class="msg">{{ goodKey+' - $'+goods[0]+'.00' }}</div>
              <div class="btns" @click='addCarData1(goods[3],goodKey)'>+</div>
              <div class="num">{{goods[2]}}</div>
              <div class="btns" @click='delCarData1(goodKey)'>-</div>
          </div>
          <!-- 底部按钮 -->
          <div class="carBtn">
              <div class="btns">-</div>
              <div class="num">1</div>
              <div class="btns">+</div>
              <a class="carBtns" @click="sendOrder()" >购买</a>
          </div>
      </div>
  </div>
</template>

<script>
    export default {
      data:function(){
        return {
            userName:localStorage.club1023User,
            ordersData:[],//准备发送给订单数据库 - [['单品名称',[价格/图片/数量/分类],....]
            carData:{},
        }
      },
      props:['DBfromApp'],//使用父组件App的DB数据
      methods:{
          sendOrder(){
            //bug : router-link 会直接跳转页面/再执行购物车组件的销毁-函数执行等等
            //bug : 所以需要先执行函数，再进行页面跳转
            //0.订单数据库添加数据
            this.DBfromApp.getOrdersDB().addOrder(localStorage.club1023User,this.ordersData);
            //1.删除购物车数据 - 重新渲染购物车
            for(let i=0;i<this.ordersData.length;i++){
              this.DBfromApp.getCarDB().delOrderItem(localStorage.club1023User,this.ordersData[i][0]);
            }
            this.updataCar();//渲染

            //2.页面跳转
            this.$router.push({ name:'orders',params:{ name:this.userName } });
          },
          closeCar:function(){//调用父组件方法隐藏购物车
              this.$parent.showCar();
          },

          addCarData1:function(name,good){//添加一条购物车数据
            if(this.checkUser){
                let arr = this.DBfromApp.getItem(name,good);
                arr[2] = name;//添加大分类数据
                this.DBfromApp.getCarDB().addItem(localStorage.club1023User,good,arr);//调用外部函数修改数据库
                let temp = this.DBfromApp.getCarDB().queryUserCar([localStorage.club1023User]);//查询数据库
                this.carData = Object.assign({},this.carData, temp);
            }
          },

          delCarData1:function(good){//删除一条购物车数据
            if(this.checkUser){
                this.DBfromApp.getCarDB().delItem(localStorage.club1023User,good);//调用外部函数修改数据库
                let temp = this.DBfromApp.getCarDB().queryUserCar([localStorage.club1023User]);//查询数据库
                if(!temp.hasOwnProperty(good)){//如果没有当前单品，就直接返回
                  this.carData = {};
                  this.carData = Object.assign({}, temp);//对象合并
                }else{
                  this.carData = Object.assign({}, this.carData, temp);//对象合并
                }
            }
          },
          checkUser(){
            if(localStorage.club1023User == ""){//未登录
                window.console.log('您尚未登录');
                return false;
            }
            return true;
          },
          updataCar(){
            let temp = this.DBfromApp.getCarDB().queryUserCar([localStorage.club1023User]);//查询数据库

            if(JSON.stringify(temp) == "{}"){//如果没有当前单品，就直接返回
              // window.console.log('test1')
              this.carData = {};
            }else{
              this.carData = Object.assign({}, temp);//对象合并
            }
          },
        },
        created(){
          //需要每次组件启动时会自动加载数据库数据
          // window.console.log('购物车组件启动')
          this.updataCar();
        },
    }
</script>

<style scoped>
  @import '../assets/css/App/myCar.css';
</style>

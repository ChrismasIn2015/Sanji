<template>
    <div class="board">
        <div class="login">
            <!-- 登录模板 -->
            <div class='login0' v-show='view0'>
                <h2>欢迎</h2>
                <form>
                    <input type="text" placeholder='请输入账号' v-model="userName">
                    <input type="password" placeholder='密码' v-model="password">
                </form>
                <div class="btnls">
                    <a class="btnl" @click='register()'>注册</a>
                    <!-- 使用LocalStorage来保存 已经登录的用户 -->
                    <a class="btnl" @click='login()'>登录</a>
                    <router-link to='/' class="btnl">返回</router-link>
                </div>
            </div>
            <!-- 提示信息模板 -->
            <div class='login0' v-show='view1'>
                <h2>{{ viewMsg }}</h2>
                <div class="btnls">
                    <router-link to='/login' class="btnl"
                        @click.native='back()'>返回</router-link>
                    <router-link to='/' class="btnl">首页</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data:function(){
            return{
                userName:"",
                password:"",
                view0:true,//提示用
                view1:false,
                viewMsg:"",
            }
        },
        props:['DBfromApp'],//使用父组件App的DB数据
        methods:{
            register:function(){
                if(this.nameCheck()){//向DB添加数据=注册
                    let msg = this.DBfromApp.addUser(this.userName,this.password);
                    this.message(msg);
                    window.console.log('用户注册-此时的数据库: '+this.DBfromApp.getUserDB());
                }
            },
            login:function(){//验证密码
                if(this.nameCheck()){
                    let msg = this.DBfromApp.examinePsw(this.userName,this.password);
                    if(this.message(msg)){
                        //下面通过在localStorage/sessionStorage保存用户名来确认登录状态
                        if(typeof(Storage)!=="undefined") localStorage.club1023User=this.userName;
                        else window.console.log('不支持本地存储');
                    }
                }
            },
            nameCheck:function(){
                if(this.userName=="" || this.password==""){
                    this.message('账号 或者 密码不能为空');
                    return false;
                }
                else return true;
            },
            message:function(msg){//提示信息
                if(msg[1]==0){//登录成功
                    this.viewMsg=msg[0];
                    this.view1=true;
                    this.view0=false;
                    return true;
                }else if(msg[1]==1){//密码错误
                    this.viewMsg=msg[0];
                    this.view1=true;
                    this.view0=false;
                }else{
                    this.viewMsg=msg;
                    this.view1=true;
                    this.view0=false;
                }
            },
            back:function(){//提示信息 然后返回
                // window.console.log('这是第er个函数')
                this.view0=true;
                this.view1=false;
            }
        },
    }
</script>

<style scoped>
    @import '../assets/css/login/login.css';
</style>

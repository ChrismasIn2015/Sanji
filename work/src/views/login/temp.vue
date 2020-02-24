<template>
  <!-- 
    #   登录页面架构
    1.头部 logo / 注册链接 
    2.登录区
      2.0 帮助：首次使用 / 绑定已有账号：手机号 / 密码
        - 绑定手机号：手机号/验证码/新密码/确认新密码
      2.1 微信扫码登录 / 账号登录
        - 注册：手机号/验证码/新密码/确认新密码
        - 登录：手机号/密码/服务条款（表单验证：#请输入11位手机号 #密码错误，请重新输入）
  -->
  <div class="login">
    <!-- 导航条 -->
    <div class="nav">
      <div class="nav-content">
        <!-- 左侧 Icon -->
        <div class="icon">
          <img src="../../static/images/logo.png" alt />
          <span class="icon-word">处处有码</span>
        </div>
        <!-- 右侧 按钮 -->
        <div class="menus">
          <div class="menu" @click.stop="goto('http://www.weixu88.com/')">微续官网</div>
        </div>
      </div>
    </div>

    <!-- 登录区 -->
    <div class="login-content">
      <!-- 左侧广告图 -->
      <!-- <div class="login-ad"></div> -->
      <!-- 右侧登录表单 -->
      <div class="login-form">
        <div class="form-title">{{ loginTypeName }}</div>
        <div class="form-input">
          <div class="name">手机号</div>
          <input v-model="loginPhone" />
        </div>
        <div class="form-input" v-show="loginType === 1 || loginType === 2">
          <div class="name">验证码</div>
          <input v-model="phoneCode" style="width: 30%;" />
          <div class="code-btn" @click.stop="sendPhoneCode">{{ phoneCodeCount }}</div>
        </div>
        <div class="form-input" v-show="loginType === 0 || loginType === 1">
          <div class="name">密码</div>
          <input v-model="loginPassword" type="password" />
        </div>
        <div class="form-input" v-show="loginType === 1">
          <div class="name">公司</div>
          <input v-model="companyName" />
        </div>
        <div class="form-input" v-show="loginType === 2">
          <div class="name">新密码</div>
          <input v-model="loginNewPassWord" type="password" />
        </div>
        <div class="form-btn" v-show="loginType === 0" @click.stop="login">登录</div>
        <div class="form-btn" v-show="loginType === 1" @click.stop="register">注册</div>
        <div class="form-btn" v-show="loginType === 2" @click.stop="newPassword">修改密码</div>
        <div class="form-btn-menus">
          <div class="left" v-show="loginType === 0" @click.stop="loginType = 1">立即注册</div>
          <div class="right" v-show="loginType === 0" @click.stop="loginType = 2">忘记密码?</div>
          <div
            class="right"
            v-show="loginType === 1 || loginType === 2"
            @click.stop="loginType = 0"
          >返回登录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  wx_login,
  wx_sendPhoneCode,
  wx_accountCheck,
  wx_register,
  wx_newPassword,
  checkUser
} from "@/utils/apis";
export default {
  data() {
    return {
      loginType: 0, // 0 登录 1 注册 2 忘记密码
      loginPhone: "",
      loginPassword: "",
      //
      phoneCode: "",
      phoneCodeTimer: null,
      phoneCodeCount: "点击获取",
      companyName: "",
      //
      loginNewPassWord: ""
    };
  },
  mounted() {},
  computed: {
    loginTypeName() {
      switch (this.loginType) {
        case 0:
          return "登录";
        case 1:
          return "注册";
        case 2:
          return "忘记密码";
        default:
          return "Net Error";
      }
    }
    // openId() {
    //   return this.$store.getters.getOpenId;
    // }
  },
  methods: {
    async login() {
      try {
        let result = await wx_login(this.loginPhone, this.loginPassword);
        this.$store.commit("setToken", result.Token);
        this.$store.commit("setOpenId", result.UserName + result.UserId);
        await checkUser(result.UserName + result.UserId);
        // console.log(
        //   "登录成功",
        //   result,
        //   this.$store.getters.getToken,
        //   this.$store.getters.getOpenId
        // );
        this.$router.push({ name: "qrCode" });
      } catch (e) {
        window.alert(e);
      }
    },
    async sendPhoneCode() {
      try {
        if (this.phoneCodeTimer !== null) return;
        let result = await wx_sendPhoneCode(this.loginPhone);
        console.log("已发送", result);
        this.phoneCodeCount = 60;
        this.phoneCodeTimer = setInterval(() => {
          this.phoneCodeCount--;
          if (this.phoneCodeCount === 0) {
            this.phoneCodeCount = "点击发送";
            this.phoneCodeTimer = null;
            clearInterval(this.phoneCodeTimer);
          }
        }, 1000);
      } catch (e) {
        window.alert(e);
      }
    },
    async register() {
      try {
        // 1.验证手机号
        await wx_accountCheck(this.loginPhone, this.phoneCode);
        // 2.进行注册
        let result = await wx_register(
          this.loginPhone,
          this.loginPassword,
          this.loginPhone,
          this.companyName
        );
        window.alert("注册成功", result);
        this.loginType = 0;
      } catch (e) {
        window.alert(e);
      }
    },
    async newPassword() {
      try {
        let result = await wx_newPassword(
          this.loginPhone,
          this.phoneCode,
          this.loginNewPassWord
        );
        window.alert("修改成功", result);
        this.loginType = 0;
      } catch (e) {
        window.alert(e);
      }
    },
    goto(url) {
      window.open(url);
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  min-height: 700px;
  // background-image: url("../../static/images/login-bc.png");
  // background-size: cover;
  // background-repeat: repeat;
  //
  .nav {
    background-color: rgb(34, 35, 37);
    height: 50px;
    margin-bottom: 50px;
    .nav-content {
      max-width: 1000px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      .icon {
        height: 50px;
        display: inline-flex;
        align-items: center;
        cursor: pointer;
        img {
          width: 30px;
          height: 30px;
          margin: 0px 10px;
        }
        .icon-word {
          color: $common-main;
          &:hover {
            color: white;
          }
        }
      }
      .menus {
        margin-left: auto;
        .menu {
          display: inline-block;
          line-height: 50px;
          height: 50px;
          color: $common-main;
          padding: 0 5px;
          cursor: pointer;
          &:hover {
            color: white;
          }
        }
      }
    }
  }
  //
  .login-content {
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-direction: row-reverse;
    .login-form {
      width: 320px;
      padding: 40px;
      background-color: rgba(34, 35, 37, 0.7);
      border: 1px solid rgb(34, 35, 37);
      border-radius: 15px;
      margin: 0 auto; // 老板的意思
      .form-title {
        font-size: 1.5rem;
        color: $common-main;
        font-weight: bold;
        padding: 30px 0px;
        cursor: default;
      }
      .form-input {
        display: flex;
        align-items: center;
        height: 50px;
        transition: all 0.5s;
        margin: 5px 0px;
        // border-bottom: 2px solid transparent;
        border-bottom: 2px solid $common-main;
        &:hover {
          border-bottom: 2px solid white;
        }
        .name {
          color: white;
          cursor: default;
          min-width: 70px;
          line-height: 50px;
        }
        input {
          color: white;
          line-height: 50px;
          font-size: 1rem;
          height: 80%;
          border: none;
          background-color: transparent;
        }
        .code-btn {
          color: white;
          background-color: $common-main;
          height: 30px;
          line-height: 30px;
          width: 100px;
          text-align: center;
          margin-left: auto;
          cursor: pointer;
          &:hover {
            background-color: white;
            color: $common-main;
          }
        }
      }
      .form-btn-menus {
        margin-top: 20px;
        padding: 0px 10px;
        display: flex;
        justify-content: space-between;
        color: $common-main;
        .left {
          cursor: pointer;
        }
        .right {
          cursor: pointer;
        }
      }
    }
  }
}
@media (max-width: 1000px) {
  /* 如果宽度不超过500px */
  .login-form {
    margin: 0 auto;
  }
}
</style>

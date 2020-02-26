<template>
  <div class="page-login flex-middle flex-y">
    <div class="login common-shadow">
      <!-- 头部 -->
      <div class="login-nav flex-side flex-middle-y">
        <div class="logo flex-middle-y">
          <img src="../../static/images/logo-green.png" alt />
          <span class="logo-title">微续</span>
        </div>
        <span
          class="common-link"
          v-show="pageType === 'login'"
          @click.stop="pageType = 'phone-register'"
        >免费注册</span>
        <span class="common-link" v-show="pageType !== 'login'" @click.stop="pageType = 'login'">登录</span>
      </div>
      <!-- 内容 -->
      <div class="login-content">
        <!-- 1.首次使用 -->
        <div v-if="pageType === 'first'">
          <div
            class="con-checkbox"
            :class="{ 'con-checkbox-on': checkBoxIndex === 0 }"
            @click.stop="checkBoxIndex = 0"
          >
            <div class="con-checkbox-point"></div>
            <div class="con-checkbox-line">首次使用</div>
            <div class="con-checkbox-line">请绑定手机号，以便使用更多功能</div>
            <div class="common-btn" @click.stop="pageType = 'phone-register'">确认绑定</div>
          </div>
          <div
            class="con-checkbox"
            :class="{ 'con-checkbox-on': checkBoxIndex === 1 }"
            @click.stop="checkBoxIndex = 1"
          >
            <div class="con-checkbox-point"></div>
            <div class="con-checkbox-line">绑定已有账号</div>
            <div class="con-checkbox-line">如果您已注册过神手软件，选择此项可将已有的账号绑定该账号，下次也可使用手机号登录</div>
            <commonInput :state="{  holder: '请输入您的神手云账号' }" />
            <commonInput :state="{ type: 'pass', holder: '请输入密码' }" />
            <div class="common-btn">确认绑定</div>
          </div>
        </div>
        <!-- 2.手机号/验证码 -->
        <div v-show="pageType === 'phone-register' || pageType === 'phone-newPassword'">
          <div class="con-form">
            <div class="con-form-title">{{ pageTypeName }}</div>
            <div class="con-form-line flex-side flex-middle-y">
              <div class="line-name">手机号：</div>
              <commonInput ref="myPhone" :state="{ holder: '请输入您的手机号', rule: 'phone' }" />
              <div class="line-name"></div>
            </div>
            <div class="con-form-line flex-side flex-middle-y">
              <div class="line-name">短信验证码：</div>
              <commonInput
                ref="myPhoneCode"
                :state="{ type: 'number', holder: '请输入验证码', plus: 'btn' }"
              />
              <div class="line-name"></div>
            </div>
            <div class="con-form-line flex-side flex-middle-y">
              <div class="line-name">新密码：</div>
              <commonInput ref="myPass" :state="{ type: 'password', holder: '请输入至少6位含字母和数字的密码' }" />
              <div class="line-name"></div>
            </div>
            <div class="con-form-line flex-side flex-middle-y">
              <div class="line-name">确认新密码：</div>
              <commonInput ref="myRePass" :state="{ type: 'password', holder: '请再次输入密码' }" />
              <div class="line-name"></div>
            </div>
            <div class="con-form-line flex-side flex-middle-y">
              <div class="line-name"></div>
              <div
                class="common-btn"
                v-show="pageType === 'phone-register'"
                @click.stop="register"
              >确认注册</div>
              <div
                class="common-btn"
                v-show="pageType === 'phone-newPassword'"
                @click.stop="setNewPass"
              >确认修改</div>
              <div class="line-name"></div>
            </div>
          </div>
        </div>
        <!-- 3.登录 -->
        <div class="con-login" v-show="pageType === 'login'">
          <div class="con-form">
            <div class="login-tabbar flex-side flex-middle-y">
              <!-- ** 20/02/27 暂时封闭微信登录 ** -->
              <!-- <div class="bar" :class="{'bar-on': loginBar === 0}" @click.stop="loginBar = 0">微信登录</div> -->
              <!-- <div class="bar-line"></div> -->
              <!-- <div class="bar" :class="{'bar-on': loginBar === 1}" @click.stop="loginBar = 1">账号登录</div> -->
              <!-- ** 20/02/27 暂时封闭微信登录 End ** -->
            </div>
            <div v-show="loginBar === 0">
              <img id="wx-img" src="../../static/images/logo-green.png" alt />
              <div>
                <span class="login-tip">登录即表示您已同意</span>
                <span class="login-tip common-link">《服务条款》</span>
              </div>
              <div class="login-footer flex-side flex-middle-y">
                <span class="footer-checkBox" :class="{'footer-checkBox-on': autoLogin}" />
                <span
                  class="login-tip"
                  :style="{'color':autoLogin ? 'black' : ''}"
                  @click.stop="autoLogin = !autoLogin"
                >下次自动登录</span>
                <span class="login-tip">微信扫一扫</span>
              </div>
            </div>
            <div v-show="loginBar === 1">
              <div>
                <commonInput ref="myPhone" :state="{ holder: '请输入您的手机号/神手云账号', rule: 'phone' }" />
                <commonInput ref="myPass" :state="{ type: 'password', holder: '请输入您的密码' }" />
              </div>
              <div>
                <span class="login-tip">登录即表示您已同意</span>
                <span class="login-tip common-link">《服务条款》</span>
              </div>
              <div class="common-btn" @click.stop="login">登录</div>
              <div class="login-footer flex-side flex-middle-y">
                <span class="footer-checkBox" :class="{'footer-checkBox-on': autoLogin}" />
                <span
                  class="login-tip"
                  :style="{'color':autoLogin ? 'black' : ''}"
                  @click.stop="autoLogin = !autoLogin"
                >下次自动登录</span>
                <span
                  class="login-tip common-link"
                  @click.stop="pageType = 'phone-newPassword'"
                >忘记密码</span>
              </div>
            </div>
          </div>
        </div>
        <!-- just margin -->
        <div style="height: 100px;"></div>
      </div>
    </div>
    <div class="login-bottom">Copyright 2016-2020 上海麦年智能科技有限公司 All Rights Reserved 沪ICP备 18013520号-7</div>
  </div>
</template>

<script>
import commonInput from "@/common-ui/common-input/common-input";
export default {
  beforeCreate() {
    let temp = this.$route.query.childId;
    window.alert(temp);
  },
  data() {
    return {
      // 页面
      pageType: "login", // 1.首次使用 first 2.手机号 phone-bind 绑定/  phone-register 注册/ phone-newPassword 忘记密码/ 3.登录 login
      // 1.首次登录
      checkBoxIndex: 0,
      // 2.
      // 3.登录
      loginBar: 1,
      autoLogin: false
    };
  },
  components: {
    commonInput
  },
  mounted() {},
  computed: {
    pageTypeName() {
      switch (this.pageType) {
        case "phone-bind":
          return "绑定手机号";
        case "phone-register":
          return "注册账号";
        case "phone-newPassword":
          return "修改密码";
        default:
          return "";
      }
    }
  },
  methods: {
    register() {
      // 验证
      for (let item in this.$refs) {
        if (this.$refs[item].inputVerify()) return;
      }
      // 跳转
      this.pageType = "login";
    },
    setNewPass() {},
    login() {
      this.$router.push({ name: "index" });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./login.scss";
</style>

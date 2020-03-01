<template>
  <div class="qrResult flex-middle">
    <div class="res-block">
      <div class="res-title">{{ childTitle }}</div>
      <div class="res-childTitle flex-middle-y">
        <div class="childLogo">
          <img :src="childLogo" alt />
        </div>
        <div class="childTitle">{{ childTitle }}</div>
      </div>
      <div class="childImage">
        <img :src="childImage" alt @touchstart="start" @touchmove="move" @touchend="end" />
      </div>
      <!-- <div class="childTip">{{ adminTip }}</div> -->
    </div>
  </div>
</template>

<script>
import { getTargetCode } from "@/utils/http/api-qrCode";
export default {
  data() {
    return {
      targetId: -1,
      childTitle: "获取失败",
      childImageType: 0,
      childImage: "",
      childImageName: "",
      childLogo: "",
      childTip: "",
      InvalidDate: "",
      //
      longClick: 0,
      timeOutEvent: null
    };
  },
  mounted() {
    this.targetId = this.$route.query.targetId;
    if (!this.targetId) {
      this.$router.push({ name: "login" });
    } else {
      this.getMyAdminCode(); // async
    }
  },
  methods: {
    async getMyAdminCode() {
      try {
        let adminCode = await getTargetCode(this.targetId);
        this.targetId = adminCode.targetId;
        this.childTitle = adminCode.childTitle;
        this.childImageType = adminCode.childImageType;
        this.childImage = adminCode.childImage;
        this.childLogo = adminCode.childLogo;
        this.childTip = adminCode.childTip;
        this.InvalidDate = adminCode.invalidDate;
      } catch (error) {
        window.alert(error);
      }
    },
    start() {
      this.longClick = 0;
      this.timeOutEvent = setTimeout(() => {
        this.longClick = 1;
        console.log("长按！");
      }, 500);
    },
    move(e) {
      clearTimeout(this.timeOutEvent);
      this.timeOutEvent = 0;
      e.preventDefault();
    },
    end() {
      clearTimeout(this.timeOutEvent);
      if (this.timeOutEvent != 0 && this.longClick == 0) {
        //点击
        //此处为点击事件----在此处添加跳转详情页
        console.log("这是点击");
      }
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
.qrResult {
  height: 100%;
  cursor: default;
  .res-block {
    padding: 10rem;
    background-color: $common-white;
    width: 100rem;
    text-align: center;
    .res-title {
      font-size: 12rem;
    }
    .res-childTitle {
      margin-top: 10rem;
      .childLogo {
        img {
          width: 20rem;
          height: 20rem;
          margin-right: 5rem;
        }
      }
      .childTitle {
        font-size: 8rem;
      }
    }
    .childImage {
      img {
        width: 80rem;
        height: 80rem;
        margin-top: 5rem;
      }
    }
  }
}
</style>

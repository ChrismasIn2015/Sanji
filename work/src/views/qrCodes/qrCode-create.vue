<template>
  <div class="index">
    <!-- 导航条 -->
    <div class="nav">
      <div class="nav-content">
        <!-- 左侧 Icon -->
        <div class="icon" @click.stop="toQrCode">
          <img src="../../static/images/logo.png" alt />
          <span class="icon-word">处处有码</span>
        </div>
        <!-- 右侧 按钮 -->
        <div class="menus">
          <div class="menu" @click.stop="goto('http://www.weixu88.com/')">微续官网</div>
          <div class="menu red-menu" @click.stop="accountReset">注销</div>
        </div>
      </div>
    </div>

    <!-- 制作流程 -->
    <div class="qrCode-create">
      <!-- 1.基本信息  -->
      <div class="create-content">
        <div class="create-title">{{ pageIsEdit ? "编辑 " : "制作 "}}您的营销二维码！</div>
        <div class="create-nav">
          <div class="nav-btns">
            <div class="form-btn form-btn-blue" @click.stop="addMyQrGroup" v-show="!pageIsEdit">制作!</div>
            <div class="form-btn form-btn-red" v-show="codeBtnShow" @click.stop="updateMyQrGroup">保存</div>
            <div class="form-btn" @click.stop="toQrCode">返回</div>
          </div>
        </div>
      </div>
      <div class="create-content">
        <div class="create-title">1.{{ pageIsEdit ? "编辑 " : "设置 " }}您的二维码基本信息</div>
        <div class="create-box">
          <div class="create-input">
            <div class="name-ico"></div>
            <div class="name">名称</div>
            <input v-model="codeName" placeholder="请输入营销二维码名称" @change.stop="judgeSaveBtn" />
          </div>
          <div class="create-input">
            <div class="name-ico"></div>
            <div class="name">上限</div>
            <input
              v-model="codeMax"
              placeholder="请输入每日扫码上限"
              type="number"
              @change.stop="judgeSaveBtn"
            />
          </div>
          <div class="create-input">
            <div class="name">扫码规则</div>
            <div
              class="check-box"
              :class="{ checked: codeType === 0 }"
              @click.stop="setCodeType(0)"
            >平均</div>
            <div
              class="check-box"
              :class="{ checked: codeType === 1 }"
              @click.stop="setCodeType(1)"
            >顺序</div>
            <div
              class="check-box"
              :class="{ checked: codeType === 2 }"
              @click.stop="setCodeType(2)"
            >权重</div>
          </div>
          <div class="create-input" v-show="!pageIsEdit">
            <div class="name">中央Logo</div>
            <div class="form-btn" @click.stop="setCenterImage">{{ centerImage ? "修改" : "添加"}}</div>
            <img class="input-img" :src="centerImage" alt />
            <input
              type="file"
              accept="image/*"
              ref="file"
              v-show="false"
              id="centerImage"
              @change="toSetCenterImage"
            />
          </div>
        </div>
      </div>

      <!-- 2.子二维码列表  -->
      <div class="create-content">
        <div class="create-title">2.{{ pageIsEdit ? "编辑 " : "设置 " }}您的二维码内容</div>
        <div class="create-nav">
          <div class="nav-tip">Tip: 请从您的二维码库中添加二维码</div>
        </div>
        <div class="create-table">
          <div class="table-row">
            <div class="table-column">名称</div>
            <div class="table-column">二维码</div>
            <!-- 新建 -->
            <!-- 编辑 -->
            <div class="table-column" v-show="codeType === 2">权重</div>
            <div class="table-column" v-show="pageIsEdit">当日/次</div>
            <div class="table-column" v-show="pageIsEdit">合计/次</div>
            <div class="table-column right">
              <div class="btn none">操作</div>
            </div>
          </div>
          <div
            class="table-row"
            style="border-top: 1px solid rgb(94, 206, 75);"
            v-for="(item, index) in qrCodeList"
            :key="index"
          >
            <div class="table-column">{{ item.name }}</div>
            <div class="table-column">
              <img :src="item.codeImg" alt="Error" />
            </div>
            <!-- 新建 -->
            <input
              :value="item.height"
              class="table-column"
              v-show="codeType === 2"
              @change.stop.prevent="_setPointHeight($event,item)"
              type="number"
            />
            <!-- 编辑 -->
            <div
              class="table-column"
              v-show="pageIsEdit"
            >{{ item.dayCount + "/" + item.maxShowCount }}</div>
            <div class="table-column" v-show="pageIsEdit">{{ item.useSumCount }}</div>
            <div class="table-column right">
              <div
                class="btn green"
                @click.stop="changeCodeIndex(true, index)"
                v-show="codeType === 1 && index !== 0"
              >上移</div>
              <div
                class="btn green"
                @click.stop="changeCodeIndex(false, index)"
                v-show="codeType === 1 && index !== qrCodeList.length-1"
              >下移</div>
              <div class="btn red" @click.stop="deleteMyQrCode(item.id)">删除</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3.历史二维码 -->
      <div class="create-content">
        <div class="create-title"># 您的二维码库</div>
        <div class="create-nav">
          <div
            class="nav-tip"
          >Tip: 请确保添加的二维码必须是微信的二维码（群二维码、个人号二维码、公众号二维码），上传其他跳转二维码或者上传非法色情等图片会被系统封号和删除。</div>

          <div class="nav-btns">
            <input
              type="file"
              accept="image/*"
              ref="file"
              v-show="false"
              id="uploadCode"
              @change="uploadCode"
            />
            <div class="form-btn form-btn-grange" @click.stop="toUploadCode">上传</div>
            <div
              class="form-btn"
              @click.stop="historyCodeShow = !historyCodeShow"
            >{{ historyCodeShow ? "收起" : "展开"}}</div>
          </div>
        </div>
        <div class="create-table">
          <div class="table-row">
            <div class="table-column">名称</div>
            <div class="table-column">二维码</div>
            <div class="table-column right">
              <div class="btn none">操作</div>
            </div>
          </div>
          <div v-show="historyCodeShow">
            <div
              class="table-row"
              style="border-top: 1px solid rgb(94, 206, 75);"
              v-for="(item, index) in qrCodeHistory"
              :key="index"
            >
              <input
                :value="item.name"
                class="table-column"
                @change.stop.prevent="_setPointName($event, item.id)"
              />
              <div class="table-column">
                <img :src="item.codeImg" alt="Error" />
              </div>
              <div class="table-column right">
                <div class="btn green" @click.stop="addMyQrCode(item)">添加</div>
                <div class="btn red" @click.stop="deleteHistory(item.id)">删除</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getCodeHistory,
  deleteCodeHistory,
  getImgUrl,
  getQrCodeList,
  addQrCode,
  postHistoryQrCode,
  deleteQrCode,
  addQrGroup,
  historyReName,
  updateQrGroup,
  updateQrGroupName,
  updateQrGroupMax
} from "@/utils/apis";
export default {
  data() {
    return {
      // 基本信息
      codeId: null,
      codeName: "",
      codeMax: 200,
      codeType: 0, // 0 平均 1 顺序 2 权重
      centerImage: "",
      // 子二维码列表
      qrCodeList: [],
      codeBtnShow: false,
      // 历史库
      qrCodeHistory: [],
      historyCodeShow: true
    };
  },
  computed: {
    openId() {
      return this.$store.getters.getOpenId;
    },
    tempData() {
      return this.$store.getters.getTempParams;
    },
    pageIsEdit() {
      if (!this.tempData) return false;
      return this.tempData.id !== null;
    }
  },
  mounted() {
    this.getMyQrGroupListItem(); // async
  },
  methods: {
    // 初始化页面
    async getMyQrGroupListItem() {
      try {
        if (this.pageIsEdit) {
          this.codeId = this.tempData.id;
          this.codeName = this.tempData.name;
          this.codeType = this.tempData.marketType;
          //
          let list = await getQrCodeList(this.openId, this.codeId);
          this.qrCodeList = Object.assign([], list);
          if (this.qrCodeList[0]) {
            this.codeType = this.qrCodeList[0].marketType;
          }
        }
        let list = await getCodeHistory(this.openId);
        this.qrCodeHistory = Object.assign([], list);
      } catch (e) {
        window.alert(e);
      }
    },
    // 设置中央Logo参数
    setCenterImage() {
      document.getElementById("centerImage").click();
    },
    async toSetCenterImage(event) {
      try {
        // 1.获取图片 Url
        let imageFile = event.target.files[0];
        let formdata = new FormData();
        formdata.append("file", imageFile, imageFile.name);
        let imgUrl = await getImgUrl(formdata);
        // 2.
        this.centerImage = imgUrl;
      } catch (e) {
        window.alert(e);
      }
    },
    // 新增父二维码
    async addMyQrGroup() {
      try {
        // 限制
        if (this.codeName === "") {
          window.alert("请输入二维码名称");
          return;
        }
        if (Number(this.codeMax) < 1) {
          window.alert("日扫码限制至少为 1");
          return;
        }
        if (!this.qrCodeList.length) {
          window.alert("您未添加二维码");
          return;
        }
        if (!this.centerImage) {
          window.alert("请上传中央Logo");
          return;
        }
        // 传参
        let Ids = [];
        this.qrCodeList.forEach((item, index) => {
          let tempHeight = this.codeType === 2 ? item.height : index + 1;
          Ids.push({ id: item.id, height: tempHeight });
        });
        await addQrGroup(
          this.openId,
          Ids,
          this.codeName,
          this.codeType,
          this.codeMax,
          this.centerImage // 2020/02/20 新增可选Logo
        );
        window.alert("制作成功！");
        this.$router.push({ name: "qrCode" });
      } catch (e) {
        window.alert(e);
      }
    },
    // 新增子二维码
    async addMyQrCode(item) {
      try {
        if (this.pageIsEdit) {
          // 编辑时 服务端添加
          await addQrCode(this.tempData.id, item.id, 1, 9999);
          this.codeBtnShow = false;
          // 渲染
          let list = await getQrCodeList(this.openId, this.codeId);
          this.qrCodeList = Object.assign([], list);
          window.alert("添加成功");
        } else {
          // 新增时 本地添加
          item["height"] = 1;
          this.qrCodeList.push(item);
        }
      } catch (e) {
        window.alert(e);
      }
    },
    // 删除子二维码
    async deleteMyQrCode(Id) {
      try {
        let temp = window.confirm("确认要删除吗？");
        if (temp) {
          if (this.pageIsEdit) {
            // 服务端删除
            await deleteQrCode(Id);
            this.codeBtnShow = false;
            // 渲染
            let list = await getQrCodeList(this.openId, this.codeId);
            this.qrCodeList = Object.assign([], list);
          } else {
            // 本地删除
            for (let i = 0; i < this.qrCodeList.length; i++) {
              if (this.qrCodeList[i].id === Id) {
                this.qrCodeList.splice(i, 1);
                this.qrCodeList = Object.assign([], this.qrCodeList);
                break;
              }
            }
          }
          window.alert("删除成功");
        }
      } catch (e) {
        window.alert(e);
      }
    },
    async uploadCode(event) {
      try {
        // 1.获取图片 Url
        let imageFile = event.target.files[0];
        let formdata = new FormData();
        formdata.append("file", imageFile, imageFile.name);
        let imgUrl = await getImgUrl(formdata);
        // 2.保存到历史库中
        let newCodeId = await postHistoryQrCode(
          imgUrl,
          imageFile.name,
          this.openId
        );
        let newQrCode = {};
        newQrCode["id"] = newCodeId;
        newQrCode["name"] = imageFile.name;
        newQrCode["codeImg"] = imgUrl;
        newQrCode["height"] = 1;
        //
        let list = await getCodeHistory(this.openId);
        this.qrCodeHistory = Object.assign([], list);
        // 3.新增子二维码
        // if (this.codeId === null) {
        //   // 新增时
        //   this.qrCodeList.push(newQrCode);
        // } else {
        //   // 编辑时
        //   await addQrCode(this.codeId, newQrCode.id, 1, this.codeMax);
        //   console.log("6.新增子二维码成功", this.qrCodeList);
        //   let list = await getQrCodeList(this.openId, this.codeId);
        //   console.log("4.获取该营销二维码的子二维码", list);
        //   this.qrCodeList = Object.assign([], list);
        // }
      } catch (e) {
        window.alert(e);
      }
    },
    // 子二维码本地排序
    changeCodeIndex(isPop, index) {
      let tempList = JSON.parse(JSON.stringify(this.qrCodeList));
      let targetIndex = isPop ? index - 1 : index + 1;
      console.log(index, targetIndex);
      // 交换
      let temp = tempList[index];
      tempList[index] = tempList[targetIndex];
      tempList[targetIndex] = temp;
      // 渲染
      this.qrCodeList = Object.assign([], tempList);
      this.judgeSaveBtn();
    },
    // 修改父二维码
    async updateMyQrGroup() {
      try {
        // 传参
        let tempList = [];
        this.qrCodeList.forEach((item, index) => {
          let tempHeight = index + 1;
          if (this.codeType === 2) {
            if (item.height < 1) throw new Error("权重请至少为 1");
            tempHeight = item.height;
          }
          tempList.push({ id: item.id, height: tempHeight });
        });
        await updateQrGroup(this.codeId, Number(this.codeType), tempList);
        await updateQrGroupName(this.codeId, this.codeName);
        await updateQrGroupMax(this.codeId, Number(this.codeMax));
        this.codeBtnShow = false;
        window.alert("修改成功");
      } catch (e) {
        window.alert(e);
      }
    },
    // 历史库中新增二维码
    toUploadCode() {
      document.getElementById("uploadCode").click();
    },
    // 历史库中删除二维码
    deleteHistory(Id) {
      let temp = window.confirm("确认要删除吗？");
      if (temp) {
        this.historyConfirm(Id);
      }
    },
    // 修改历史名称
    async _setPointName(event, id) {
      try {
        await historyReName(id, event.target.value);
        // ** fixbugs **
        if (this.pageIsEdit) {
          // 新建
        } else {
          this.qrCodeList.forEach(item => {
            if (item.id === id) {
              item.name = event.target.value;
            }
          });
          this.qrCodeList = Object.assign([], this.qrCodeList);
        }
        // ** fixbugs end **
        this.getMyQrGroupListItem(); // async
        window.alert("修改成功！");
      } catch (e) {
        window.alert(e);
      }
    },
    async historyConfirm(Id) {
      try {
        await deleteCodeHistory([Id]);
        this.codeBtnShow = false;
        // 渲染
        let list = await getCodeHistory(this.openId);
        this.qrCodeHistory = Object.assign([], list);
        list = await getQrCodeList(this.openId, this.codeId);
        this.qrCodeList = Object.assign([], list);
        window.alert("删除成功");
      } catch (e) {
        window.alert(e);
      }
    },
    // 编辑页面判断是否展示 保存
    judgeSaveBtn() {
      if (this.pageIsEdit) {
        this.codeBtnShow = true;
      }
    },
    // 样式
    setCodeType(type) {
      this.codeType = type;
      this.judgeSaveBtn();
    },
    toQrCode() {
      this.$router.push({ name: "qrCode" });
    },
    goto(url) {
      window.open(url);
    },
    accountReset() {
      this.$store.commit("setToken", null);
      this.$router.push({ name: "login" });
    },
    _setPointHeight(event, pointer) {
      pointer.height = Number(event.target.value);
      this.judgeSaveBtn();
    },
    reverseCodeList() {
      if (this.pageIsEdit) {
        // 编辑
      } else {
        // 新建
        let newList = this.qrCodeList.reverse();
        this.qrCodeList = Object.assign([], newList);
      }
      // window.alert("排序成功");
    }
  }
};
</script>

<style lang="scss" scoped>
.index {
  //
  .nav {
    background-color: rgb(34, 35, 37);
    height: 50px;
    margin-bottom: 50px;
    padding: 0px 10px;
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
          margin-right: 10px;
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
        .red-menu {
          color: red;
        }
      }
    }
  }
  //
  .qrCode-create {
    max-width: 1000px;
    margin: 0 auto;
    padding: 0px 10px;
    .create-content {
      margin-bottom: 15px;
      .create-title {
        color: $common-main;
        font-weight: bold;
        font-size: 32px;
        cursor: default;
      }
      .create-input {
        display: flex;
        align-items: center;
        line-height: 50px;
        height: 50px;
        transition: all 0.5s;
        margin: 5px 0px;
        border-bottom: 2px solid rgb(241, 241, 241);
        &:hover {
          .name-ico {
            display: block;
          }
          // border-bottom: 2px solid $common-main;
        }
        .name-ico {
          display: none;
          width: 20px;
          height: 20px;
          margin-right: 5px;
          background-color: $common-main;
        }
        .name {
          cursor: default;
          line-height: 50px;
          margin-right: 10px;
        }
        input {
          width: 80%;
          height: 80%;
          border: none;
          background-color: transparent;
          font-size: 1rem;
        }
        .input-img {
          width: 40px;
          height: 40px;
          margin: 0px 15px;
        }
        .check-box {
          text-align: center;
          padding: 5px;
          line-height: 30px;
          color: $common-main;
          margin: 0px 5px;
          background-color: white;
          border: 1px solid $common-main;
          cursor: pointer;
          &:hover {
            color: white;
            background-color: $common-main;
          }
        }
        .checked {
          color: white;
          background-color: $common-main;
        }
      }
      .create-nav {
        width: 90%;
        margin: 10px auto 20px;
        .nav-btns {
          display: flex;
          flex-direction: row-reverse;
          .form-btn {
            width: 15%;
            margin: 0px 5px;
          }
        }
        .nav-tip {
          margin: 10px 0px;
          cursor: default;
          color: rgb(234, 167, 16);
        }
      }
      .create-box {
        width: 90%;
        margin: 0 auto;
      }
      .create-table {
        width: 90%;
        margin: 0 auto;
        border: 1px solid $common-main;
        .table-row {
          height: 50px;
          display: flex;
          align-items: center;
          background-color: rgb(241, 241, 241);
          padding: 0px 10px;
          .table-column {
            width: 80px;
            text-align: center;
            // text-cut
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            img {
              width: 30px;
              height: 30px;
            }
          }
          input {
            border: none;
            height: 40px;
            line-height: 40px;
            background-color: white;
          }
          .fun-column {
            cursor: pointer;
            color: $common-main;
          }
          .btn {
            cursor: pointer;
            padding: 0px 4px;
            &:hover {
              color: white;
            }
          }
          .right {
            width: 120px;
            margin-left: auto;
            display: flex;
            justify-content: center;
            .none {
              cursor: default;
              &:hover {
                color: black;
              }
            }
          }
        }
      }
      // .create-footer {
      //   margin: 40px auto 150px;
      //   .form-btn {
      //     width: 50%;
      //     margin: 0 auto;
      //     margin-top: 10px;
      //   }
      // }
    }
  }
}
</style>

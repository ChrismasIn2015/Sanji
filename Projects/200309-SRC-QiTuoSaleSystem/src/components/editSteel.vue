<template>
  <div class="common-modal">
    <div class="common-modal-blank">
      <div class="steel-edit">
        <!-- 入库时 -->
        <div class="edit-btn" v-show="!isOut">
          <div
            class="common-btn-toggle"
            :class="{'common-btn-on': editSteelType === 0}"
            @click.self="editSteelType = 0"
          >板</div>
          <div
            class="common-btn-toggle"
            :class="{'common-btn-on': editSteelType === 1}"
            @click.self="editSteelType = 1"
          >卷</div>
        </div>
        <!-- 入库时 -->
        <div class="edit-Tip" v-show="isOut">请输入出库数据</div>
        <div class="edit-input">
          <div class="input-name">类别</div>
          <commonInput
            ref="editSteelName"
            :state="{ holder: editSteelType === 0 ? '板': '卷', disable: true}"
          />
        </div>
        <div class="edit-input">
          <div class="input-name">名称</div>
          <commonInput ref="editSteelName" :state="{ holder:'请输入钢材名称', disable: isOut}" />
        </div>
        <div class="edit-input">
          <div class="input-name">长度/cm</div>
          <commonInput
            ref="editSteelLength"
            :state="{ type:'number', holder:'请输入钢材长度', disable: isOut}"
          />
        </div>
        <div class="edit-input">
          <div class="input-name">宽度/cm</div>
          <commonInput
            ref="editSteelWidth"
            :state="{ type:'number', holder:'请输入钢材宽度', disable: isOut}"
          />
        </div>
        <div class="edit-input">
          <div class="input-name">厚度/cm</div>
          <commonInput
            ref="editSteelHeight"
            :state="{ type:'number', holder:'请输入钢材厚度', disable: isOut}"
          />
        </div>
        <div class="edit-input">
          <div class="input-name">数量/张</div>
          <commonInput ref="editSteelCount" :state="{ type:'number', holder:'请输入数量'}" />
        </div>
        <div class="edit-input-tip" v-show="isOut">重要：请输入实际出库数量</div>
        <div class="edit-input">
          <div class="input-name">重量/吨</div>
          <commonInput ref="editSteelWeight" :state="{ type:'number', holder:'请输入重量'}" />
        </div>
        <div class="edit-input-tip" v-show="isOut">重要：请输入实际出库重量</div>
        <div class="edit-input">
          <div class="input-name">{{ isOut ? "售价": "成本"}}/元</div>
          <commonInput ref="editSteelPrice" :state="{ type:'number', holder:'请输入加个'}" />
        </div>
        <div class="modal-btn">
          <div class="common-btn-toggle" @click.self="closeModal">返回</div>
          <div class="common-btn" v-show="!isOut" @click.self="steelAdd">入库</div>
          <div class="common-btn" v-show="isOut" @click.self="steelOut">出库</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commonInput from "@/common-ui/common-input/common-input";
export default {
  props: {
    isOut: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tempId: -1,
      editSteelType: 0 // 0 板 1 卷
    };
  },
  components: {
    commonInput
  },
  methods: {
    initSteel(Steel, id) {
      if (Steel) {
        this.$test.log("取得编辑值", Steel);
        this.editSteelType = Steel.steelType;
        this.$refs.editSteelName.inputValue = Steel.steelName;
        this.$refs.editSteelLength.inputValue = Steel.steelLength;
        this.$refs.editSteelWidth.inputValue = Steel.steelWidth;
        this.$refs.editSteelHeight.inputValue = Steel.steelHeight;
        this.$refs.editSteelCount.inputValue = Steel.count;
        this.$refs.editSteelWeight.inputValue = Steel.weight;
        this.$refs.editSteelPrice.inputValue = Steel.price;
        if (id) {
          this.tempId = id;
        }
      } else {
        this.editSteelType = 0;
        this.$refs.editSteelName.inputValue = "";
        this.$refs.editSteelLength.inputValue = "";
        this.$refs.editSteelWidth.inputValue = "";
        this.$refs.editSteelHeight.inputValue = "";
        this.$refs.editSteelCount.inputValue = "";
        this.$refs.editSteelWeight.inputValue = "";
        this.$refs.editSteelPrice.inputValue = "";
      }
    },
    getSteel() {
      // 表单校验
      for (let key in this.$refs) {
        let verify = this.$refs[key].inputVerify();
        if (verify) return;
      }
      // 返回一个 Steel 对象
      let type = this.editSteelType;
      let name = this.$refs.editSteelName.inputValue;
      let length = this.$refs.editSteelLength.inputValue;
      let width = this.$refs.editSteelWidth.inputValue;
      let height = this.$refs.editSteelHeight.inputValue;
      let count = this.$refs.editSteelCount.inputValue;
      let weight = this.$refs.editSteelWeight.inputValue;
      let price = this.$refs.editSteelPrice.inputValue;
      let mySteel = new this.$Steel(
        type,
        name,
        length,
        width,
        height,
        count,
        weight,
        price
      );
      return mySteel;
    },
    getTempId() {
      return this.tempId;
    },
    steelAdd() {
      this.$parent.steelIn();
    },
    steelOut() {
      this.$parent.steelOut();
    },
    closeModal() {
      this.$parent.closeSteelModal();
    }
  }
};
</script>

<style lang="scss" scoped>
//
.steel-edit {
  width: 40rem;
  .edit-input {
    margin-top: 1.2rem;
    display: flex;
    align-items: center;
    .input-name {
      width: 5rem;
    }
    .common-input {
      width: 100%;
    }
  }
  .edit-input-tip {
    margin-top: 1rem;
    color: $common-tip;
  }
  .edit-btn {
    margin-bottom: 1rem;
    .common-btn-toggle {
      margin-right: 1rem;
    }
    .common-btn-on {
      color: $common-white;
      background-color: $common-main;
    }
  }
  .modal-btn {
    margin: 1rem 0rem;
    float: right;
    .common-btn {
      margin-left: 1rem;
    }
  }
}
</style>

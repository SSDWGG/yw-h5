<template>
  <view class="container">
    <view class="flex" v-if="role == '吸毒人员'">
      <view class="uinput" @click="show1 = true">
        <u--input
          placeholder="风险等级"
          suffixIcon="arrow-down-fill"
          disabled
          v-model="fxdj.value"
          suffixIconStyle="color: #909399;font-size:28rpx"
        ></u--input>
      </view>
      <view class="uinput" @click="handlePcs">
        <u--input
          placeholder="户籍派出所"
          disabled
          v-model="hjpcs.value"
          suffixIcon="arrow-down-fill"
          suffixIconStyle="color: #909399;font-size:28rpx"
        ></u--input>
      </view>
      <view class="uinput" @click="show3 = true">
        <u--input
          placeholder="人员状态"
          disabled
          v-model="ryzt.value"
          suffixIcon="arrow-down-fill"
          suffixIconStyle="color: #909399;font-size:28rpx"
        ></u--input>
      </view>
    </view>
    <view v-else>
      <view class="uinput" @click="handlePcs">
        <u--input
          placeholder="派出所"
          suffixIcon="arrow-down-fill"
          disabled
          v-model="pcs.value"
          suffixIconStyle="color: #909399;font-size:28rpx"
        ></u--input>
      </view>
      <!-- <view class="uinput">
        <u--input
          placeholder="民警"
          v-model="keyword"
          @input="handleInput"
          suffixIconStyle="color: #909399;font-size:28rpx"
        ></u--input>
      </view>
      <card :isShadow="true" v-if="searchList.length > 0">
      <view class="mjList" v-for="(it,index) in searchList" :key="index" @click="handleClick(it)">
        <view>{{ it.name }}</view>
      </view>
    </card> -->
    </view>
    <view style="margin-top: 20rpx" class="sure">
      <view class="ubutton">
        <u-button type="error" text="确认" @click="handleSure"></u-button>
      </view>
    </view>
    <view class="content">
      <view
        class="card-box"
        :class="{ active: isActive == index }"
        v-for="(item, index) in tableData"
        :key="index"
      >
        <card :isShadow="true">
          <view class="box_row1" @click="selectRy(item, index)">
            <view class="flex">
              <img
                src="@/static/icon/头像.png"
                style="width: 120rpx; height: 120rpx"
                alt=""
              />
            </view>
            <view style="margin-left: 20rpx">
              <p>姓名：{{ item.name || item.nickName }}</p>
              <p>手机号：{{ item.telephone || item.phonenumber  }}</p>
            </view>
            <!-- <view class="flex" style="flex-shrink: 1;"> -->
            <text class="xq" @click="hangleDetail"></text>
            <!-- </view> -->
          </view>
          <view class="icon-check" v-if="isActive == index">
            <u-icon
              name="checkmark-circle"
              color="#3c9cff"
              @click="cancel"
            ></u-icon>
          </view>
        </card>
      </view>
      <view class="more" @click="loadingMore">
        <u-loadmore :status="loadStatus" height="50" :line="true" />
      </view>
    </view>
    <u-picker
      :show="show1"
      :columns="fxdjList"
      keyName="label"
      @confirm="confirm1"
      @cancel="show1 = false"
    ></u-picker>
    <u-picker
      :show="show2"
      :columns="pcsList"
      keyName="label"
      @confirm="confirm2"
      @cancel="show2 = false"
    ></u-picker>
    <u-picker
      :show="show3"
      :columns="ryztList"
      keyName="label"
      @confirm="confirm3"
      @cancel="show3 = false"
    ></u-picker>
    <u-picker
      :show="show4"
      :columns="pcsList"
      keyName="label"
      @confirm="confirm4"
      @cancel="show4 = false"
    ></u-picker>
    <u-notify message="Hi uView" ref="uNotify"></u-notify>
  </view>
</template>

<script>
import Card from "@/components/Card.vue";
export default {
  components: {
    Card,
  },
  data() {
    return {
      searchList: [],
      keyword: "",
      isActive: -1,
      form: {
        pageSize: 10,
        pageNum: 1,
        // userTypeEnum: '',
      },
      tableData: [],
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      fxdj: { value: "", id: "" },
      hjpcs: { value: "", id: "" },
      ryzt: { value: "", id: "" },
      pcs: { value: "", id: "" },
      mjList: [
        { name: "张三", id: 1 },
        { name: "李四", id: 2 },
        { name: "章鱼哥", id: 3 },
      ],
      fxdjList: [
        [
          { label: "高风险", id: "GFX" },
          { label: "中风险", id: "ZFX" },
          { label: "低风险", id: "DFX" },
          { label: "取消选择" },
        ],
      ],
      pcsList: [],
      ryztList: [
        [
          { label: "未复吸", id: "WEI_FU_XI" },
          { label: "社区戒毒", id: "JIE_DU" },
          { label: "社区康复", id: "KANG_FU" },
          { label: "强制戒毒", id: "QIANG_ZHI_JIE_DU" },
          { label: "服刑", id: "FU_XING" },
          { label: "失联", id: "SHI_LIAN" },
          { label: "取消选择" },
        ],
      ],
      loadStatus: "loadmore",
      checkList: [],
      role: "",
      arr: [],
    };
  },
  onLoad(options) {
    // console.log(options);
    if (options.role == '派出所民警') {
      this.role = '地方派出所'
    }else{
      this.role = options.role
    }
    // console.log(this.role);
    this.getData();
  },
  methods: {
    cancel() {
      // console.log("取消");
      this.isActive = -1;
    },
    filterParams() {
      let params = {};
      if( this.role == '地方派出所' ) {
        params = {
          ...this.form,
          userTypeEnum:'地方派出所',
          deptId: this.hjpcs.id,
        };
      } else {
        params = {
          ...this.form,
          deptId: this.hjpcs.id, // 派出所
          drugUserStatus: this.ryzt.id, // 状态
          riskLevel: this.fxdj.id, // 风险等级
        };
        if (this.hjpcs.id == '') delete params.localPoliceStation
        if (this.ryzt.id == '') delete params.drugUserStatus
        if (this.fxdj.id == '') delete params.riskLevel
      }
      return params
    },
    getData(i) {
      let params = this.filterParams()
      if( this.role == '地方派出所' ) {
        this.$service.personMange.getUserList(params).then((res) => {
          if (res.code == 200) {
            // console.log(res);
            this.tableData = res.rows
            if ((this.form.pageNum) * this.form.pageSize>=res.total) {
              this.loadStatus = "nomore";
            } else {
              this.loadStatus = "loadmore";
            }
          }
        });
      } else {
        this.$service.personMange.getxdryList(params).then((res) => {
          if (res.code == 200) {
            this.tableData = res.data.content
            if ((res.data.number + 1) * res.data.size >= res.data.totalElements) {
              this.loadStatus = "nomore";
            } else {
              this.loadStatus = "loadmore";
            }
          }
        });
      }
    },
    loadingMore() {
      if (this.loadStatus != "nomore") {
        this.form.pageNum++;
        this.loadStatus = "loading";
        let params = this.filterParams()
        if (this.role == "地方派出所") {
          this.$service.personMange.getUserList(params).then((res) => {
            if (res.code == 200) {
              // console.log(res);
              this.tableData.push(...res.rows);
              if ((this.form.pageNum) * this.form.pageSize>=res.total) {
                this.loadStatus = "nomore";
              } else {
                this.loadStatus = "loadmore";
              }
            }
          });
        } else {
          this.$service.personMange.getxdryList(params).then((res) => {
            if (res.code == 200) {
              // console.log(res);
              this.tableData.push(...res.data.content);
              if ((res.data.number + 1) * res.data.size >= res.data.totalElements) {
                this.loadStatus = "nomore";
              } else {
                this.loadStatus = "loadmore";
              }
            }
          });
        }
      }
    },
    confirm1(value) {
      uni.hideKeyboard();
      this.fxdj.value =
        value.value[0].label == "取消选择" ? "" : value.value[0].label;
      this.fxdj.id =
        value.value[0].label == "取消选择" ? "" : value.value[0].id;
      this.show1 = false;
      this.getData(this.fxdj.id)
    },
    confirm2(value) {
      this.hjpcs.value =
        value.value[0].label == "取消选择" ? "" : value.value[0].label;
      this.hjpcs.id =
        value.value[0].label == "取消选择" ? "" : value.value[0].id;
      this.show2 = false;
      this.getData(this.hjpcs.id)
    },
    confirm3(value) {
      // console.log(value);
      this.ryzt.value =
        value.value[0].label == "取消选择" ? "" : value.value[0].label;
      this.ryzt.id =
        value.value[0].label == "取消选择" ? "" : value.value[0].id;
      this.getData(this.ryzt.id)
      this.show3 = false;
    },
    confirm4(value) {
      this.pcs.value = value.value[0].label == "取消选择" ? "" : value.value[0].label;
      this.pcs.id = value.value[0].label == "取消选择" ? "" : value.value[0].id;
      // console.log(this.pcs.id);
      this.getData(this.pcs.id);
      this.show4 = false;
    },
    selectRy(item, i) {
      this.isActive = i;
      this.checkList = item;
    },
    // 确定人员
    handleSure() {
      if (this.checkList == "") {
        this.$refs.uNotify.show({
          type: "warning",
          message: "请选择人员",
          duration: 1000 * 3,
          safeAreaInsetTop: true,
        });
      } else {
        uni.navigateBack();
        uni.$emit("setData", {
          name: this.checkList.nickName || this.checkList.name,
          id: this.checkList.userId || this.checkList.userid,
        });
      }
    },
    // 派出所列表
    handlePcs() {
      if (this.role == "地方派出所") {
        this.show4 = true;
      } else {
        this.show2 = true;
      }
      this.$service.pushTask.chosePcs().then((e) => {
        if (e.code == 200) {
          this.pcsList = [this.filterArr(e.data)];
          this.pcsList[0].push({
            id:0,
            label:'取消选择'
          })
          // console.log(this.pcsList);
        }
      });
    },
    // let newarr = filterArr(arr)
    // 将子级循环遍历为同级
    filterArr(arr) {
      let newArr = [];
      arr.map((e) => {
        newArr.push({ label: e.label, id: e.id });
        if (e.children) {
          let arr2 = this.filterArr(e.children);
          newArr.push(...arr2);
        }
      });
      return newArr;
    },
    // 模糊查询
    handleInput() {
      if (this.keyword.trim() === "") {
        this.searchList = [];
        return;
      } else {
        this.searchList = this.mjList.filter((e) =>
          e.name.includes(this.keyword)
        );
      }
    },
    handleClick(i) {
      // console.log(i);
      this.keyword = i.name;
      this.getData(this.keyword);
      this.searchList = [];
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep.container {
  padding: 30rpx 30rpx 0 30rpx;
  // height: 100vh;
  position: relative;
  .ubutton {
    width: 100%;
  }
}
.sure {
  position: fixed;
  bottom: 68rpx;
  width: 90%;
  z-index: 100;
}
.flex {
  display: flex;
  align-items: flex-end;
}
::v-deep.uinput {
  width: 100%;
  .u-border {
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    background-color: #f8f9f9 !important;
  }
}
.uinput + .uinput {
  margin-top: 20rpx;
}
.ubutton {
  width: 50%;
}
::v-deep.content {
  margin-top: 30rpx;
  margin-bottom: 20rpx;
  max-height: calc(100vh - 300rpx);
  overflow: auto;
  .card-box.active {
    .card-container {
      border: 1px solid #3c9cff;
    }
  }
  .card-box {
    margin-bottom: 30rpx;
    position: relative;
    .icon-check {
      position: absolute;
      top: 20rpx;
      right: 30rpx;
    }
    .box_row1 {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .time {
        font-size: 28rpx;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.5);
      }
      .xq {
        width: 70rpx;
        margin-left: 20rpx;
        font-size: 28rpx;
        color: rgba(20, 127, 251, 1);
        cursor: pointer;
      }
    }
    .box_title {
      display: flex;
      align-items: center;
      font-size: 28rpx;
      img {
        width: 50rpx;
        height: 50rpx;
        margin-right: 20rpx;
      }
    }
    .btnBox {
      display: flex;
      margin-top: 40rpx;
      justify-content: flex-end;
    }
  }
}
::v-deep .content::-webkit-scrollbar {
  height: 0 !important;
}

::v-deep .content::-webkit-scrollbar-thumb {
  height: 0 !important;
}
</style>
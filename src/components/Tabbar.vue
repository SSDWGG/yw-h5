
<template>
	<view>
		<u-tabbar class="tabbar-ios-fix" activeColor='#205ba9' :value="current?current:0" :fixed="true"
			:placeholder="true" :safeAreaInsetBottom="true" @change="handleTabClick">
			<u-tabbar-item text="首页" name="首页" v-if="userType == '禁毒中队'">
				<img slot="inactive-icon" class="u-page__item__slot-icon" src="@/static/icon/index.png">
				<img slot="active-icon" class="u-page__item__slot-icon" src="@/static/icon/icon_index.png">
			</u-tabbar-item>
      <u-tabbar-item text="工作台" name="工作台">
				<img slot="inactive-icon" class="u-page__item__slot-icon" src="@/static/icon/workback.png">
				<img slot="active-icon" class="u-page__item__slot-icon" src="@/static/icon/icon_workback.png">
			</u-tabbar-item>
      <u-tabbar-item text="我的" name="我的">
				<img slot="inactive-icon" class="u-page__item__slot-icon" src="@/static/icon/me.png">
				<img slot="active-icon" class="u-page__item__slot-icon" src="@/static/icon/icon_me.png">
			</u-tabbar-item>
		</u-tabbar>
	</view>
</template>
<script>
export default {
  name:'Tabbar',
  props: {
    current: String
  },
  data() {
    return {
      tabList:[],
      userType: '',
    };
  },
  created(){
    this.userType = uni.getStorageSync('userType')
    // this.tabList = uni.getStorageSync('tabBar')
  },
  mounted(){
    
  },
  methods: {
    handleTabClick(index) {
      if (index == '我的') {
        uni.switchTab({
          url: '/pages/me/index',
        });
        return
      } else if (index == '工作台') {
        uni.switchTab({
          url: '/pages/index/index',
        });
        return
      } else {
        uni.navigateTo({
          url: '/pagesPack2/home/index',
        });
      }
      // 使用 uni.switchTab 方法切换页面
      

    },
  }
}
</script>

<style lang="scss" scoped>
.u-page__item__slot-icon {
  width: 50rpx;
  height: 50rpx;
}

.tabbar-ios-fix {
  // background: #ffffff;
  bottom: calc(120rpx + env(safe-area-inset-bottom));
}
.u-tabbar__placeholder{
  height: 0 !important;
}
</style>

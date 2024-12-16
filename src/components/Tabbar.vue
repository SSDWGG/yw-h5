
<template>
	<view>
		<u-tabbar class="tabbar-ios-fix" activeColor='#205ba9' :value="current?current:0" :fixed="true"
			:placeholder="true" :safeAreaInsetBottom="true" @change="handleTabClick">
			<u-tabbar-item text="首页" name="首页" >
				<img slot="inactive-icon" class="u-page__item__slot-icon" src="@/static/yw/icon/1.png">
				<img slot="active-icon" class="u-page__item__slot-icon" src="@/static/yw/icon/1_active.png">
			</u-tabbar-item>
      <u-tabbar-item text="购物车" name="购物车">
				<img slot="inactive-icon" class="u-page__item__slot-icon" src="@/static/yw/icon/2.png">
				<img slot="active-icon" class="u-page__item__slot-icon" src="@/static/yw/icon/2_active.png">
			</u-tabbar-item>
      <u-tabbar-item text="我的" name="我的">
				<img slot="inactive-icon" class="u-page__item__slot-icon" src="@/static/yw/icon/3.png">
				<img slot="active-icon" class="u-page__item__slot-icon" src="@/static/yw/icon/3_active.png">
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
    };
  },
  created(){
   
  },
  mounted(){
    
  },
  methods: {
    handleTabClick(index) {
      console.log(index);
      if (index == '我的') {
        uni.switchTab({
          url: '/yw/me/index',
        });
      } else if (index == '首页') {
        uni.switchTab({
          url: '/yw/menu/index',
        });
       
      } else {
        uni.switchTab({
          url: '/yw/car/index',
        });
      }
      

    },
  }
}
</script>

<style lang="scss" scoped>
.u-page__item__slot-icon {
  width: 24px;
  height: 24px;
}
::v-deep .u-tabbar-item__text{
  color: #999999 !important;
  font-size: 11px !important;
}
::v-deep .u-border-top{
  border: none;
}
::v-deep .u-tabbar-item__icon{
  margin-top: 14px;
}
::v-deep .u-tabbar-item__text{
  margin-top: 3px;
}


::v-deep .tabbar-ios-fix {
  // background: #ffffff;
  bottom: calc(120rpx + env(safe-area-inset-bottom));
}
::v-deep .u-tabbar__placeholder{
  // height: 0 !important;
}
</style>

<template>
    <view class="container">
        <view class="module">
            <view class="title">在线监测</view>
            <view class="item-module">
                <u-cell title="在线监测" value="点击前往" url="/pages/working/online-detection" :border="false" :isLink="true">
                    <u-icon slot="icon" size="32" :name="require('@/static/icon/icon-sbxt2.png')"></u-icon>
                </u-cell>
            </view>
        </view>
        <!-- <view class="module">
            <view class="title">过程监控</view>
            <view class="item-module">
                <u-cell title="过程监控" value="点击前往" url="/pages/declare/fill-course" :border="false" :isLink="true">
                    <u-icon slot="icon" size="32" :name="require('@/static/icon/icon-gcjk.png')"></u-icon>
                </u-cell>
            </view>
        </view> -->
        <view class="module">
            <view class="title">预报警管理</view>
            <view class="item-module">
                <u-cell title="预报警管理" value="点击前往" url="/pages/working/warning" :border="false" :isLink="true">
                    <u-icon slot="icon" size="32" :name="require('@/static/icon/icon-ybjgl.png')"></u-icon>
                </u-cell>
            </view>
        </view>
    </view>
</template>

<script>
export default{
    data(){
        return{
        }
    }
}
</script>

<style lang="scss" scoped>
.container{
    padding: 30rpx 30rpx 0 30rpx;
    background: #F9FAFA;
}
.module{
    margin-bottom: 30rpx;
    .title{
        font-size: 32rpx;
        font-weight: 600;
        color: #343434;
    }
    .item-module{
        background: #fff;
        border-radius: 24rpx;
        margin-top: 20rpx;
    }
}
</style>
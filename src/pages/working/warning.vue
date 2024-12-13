<template>
    <view class="container">
        <u-search v-model="queryParams.dwmc" placeholder="请输入点位名称" :show-action="false" bgColor="#fff" searchIconColor="#92939A" placeholderColor="#92939A"></u-search>
        <u-tabs :list="tabList"></u-tabs>
        <view class="card-box" v-for="(item,index) in tableData" :key="index">
            <card>
                <u--form labelPosition="left" labelWidth="80">
                    <u-form-item label="报警时间：">
                        <text>{{ item.bjsj || '' }}</text>
                    </u-form-item>
                    <u-form-item label="报警点位：">
                        <text>{{ item.jcdw || '' }}</text>
                    </u-form-item>
                    <u-form-item label="数据类型：">
                        <text>{{ item.sjlx || '' }}</text>
                    </u-form-item>
                    <u-form-item label="处置状态：">
                        <text>{{ item.zt || '' }}</text>
                    </u-form-item>
                    <u-form-item label="报警原因：">
                        <text>{{ item.ybjyy || '' }}</text>
                    </u-form-item>
                </u--form>
                <view slot="footer" >
                    <view class="flex-end">
                        <u-button type="primary" @click="handleAssign(item)" plain v-if="item.btns.indexOf('cz')>=0" size="mini" shape="circle" text="去整改"></u-button>
                        <u-button type="primary" @click="handleRectify(item)" v-if="item.btns.indexOf('xp')>=0" size="mini" shape="circle" text="去分派"></u-button>
                    </view>
                </view>
            </card>
        </view>
        <view class="more" @click="loadingMore">
            <u-loadmore :status="loadStatus" height="50" :line="true" />
        </view>

        
        <WarningRectify ref="warningRectifyRef" :bjbh="bjbh"></WarningRectify>
    </view>
</template>

<script>
import Card from '@/components/Card.vue'
import WarningRectify from './components/WarningRectify.vue'
export default{
    components:{
        Card,
        WarningRectify
    },
    data(){
        return{
            tabList:[
                {name: '短信预警'},
                // {name: '过控预警'},
            ],
            queryParams:{
                dwmc:'',
                pageSize:10,
                pageNo:1
            },
            popupShow:false,
            tableData:[],
            form:{},
            loadStatus: 'loadmore',
            bjbh:'',
            
        }
    },
    onShow(){
        this.getList()
    },
    methods:{
        getList(){
            let params = {
                ...this.queryParams,
            }
            this.loadStatus = 'loading'
            this.$service.working.getDxyjList(params).then(res=>{
                if(res.code == 200) {
                    this.tableData = res.data || []
                    if(res.pageNo*res.pageSize >= res.total) {
                        this.loadStatus = 'nomore'
                    } else {
                        this.loadStatus = 'loadmore'
                    }
                }
            })
        },
        loadingMore(){
            if(this.loadStatus != 'nomore') {
                this.queryParams.pageNo++
                this.loadStatus = 'loading'
                let params = {
                    ...this.queryParams,
                }
                this.$service.working.getDxyjList(params).then(res=>{
                    if(res.code == 200) {
                        this.tableData.push(...res.data)
                        if(res.pageNo*res.pageSize>=res.total) {
                            this.loadStatus = 'nomore'
                        } else {
                            this.loadStatus = 'loadmore'
                        }
                    }
                })
            }
        },
        handleRectify(item){
            this.bjbh = item.bjbh
            this.$refs.warningRectifyRef.open()
        },
        handleAssign(item){
            uni.setStorageSync('DxyjData',item)
            uni.navigateTo({
                url:'/pages/working/disposal-warning?bjbh='+item.bjbh
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.container {
    padding: 30rpx 30rpx 0 30rpx;
    background: #f9fafa;
}

::v-deep .u-button{
    width: 120rpx !important;
    margin: 0 !important;
}
::v-deep .u-button--plain{
    margin-right: 20rpx !important;
}

.flex-end{
    display: flex;
    justify-content: flex-end;
}
.card-box{
    margin-top: 30rpx;
}

</style>
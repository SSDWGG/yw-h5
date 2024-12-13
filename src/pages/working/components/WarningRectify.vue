<template>
    <view>
        <u-toast ref="uToast"></u-toast>
        <u-popup :show="show" mode="center" round="12" :safeAreaInsetBottom="false" @close="close" @open="open">
            <view class="popup-content">
                <view class="popup-body">
                    <u--form labelPosition="top" labelWidth="80" :model="form">
                        <u-form-item label="部门">
                            <u--input placeholder="请输入内容" border="surround" v-model="form.departName" @focus="openShow"></u--input>
                        </u-form-item>
                        <u-form-item label="人员">
                            <u--input placeholder="请输入内容" border="surround" v-model="form.userName" @focus="openShow2"></u--input>
                        </u-form-item>
                        <u-form-item label="完成时间">
                            <u--input placeholder="请输入内容" border="surround" v-model="form.wcsj" @focus="openShow3"></u--input>
                        </u-form-item>
                    </u--form>
                </view>
                <view class="popup-footer">
                    <view class="cancel" @click="cancel">取 消</view>
                    <view class="interval"></view>
                    <view class="confirm" @click="confirm">确 认</view>
                </view>
            </view>
        </u-popup>
        <u-picker :show="showflag" ref="uPicker" :columns="columns" @confirm="confirmShow" @cancel="cancelShow"  keyName="label"></u-picker>
        <u-picker :show="showflag2" ref="uPicker2" :columns="columns2" @confirm="confirmShow2" @cancel="cancelShow2"  keyName="label"></u-picker>
        <u-datetime-picker
                :show="showWcsj"
                v-model="wcsj"
                mode="date"
                @cancel="cancelWcsj"
                @confirm="confirmWcsj" 
        ></u-datetime-picker>
    </view>
    
</template>

<script>
export default {
    props:{
        bjbh: {
            type: String,
            default: ''
        },
    },
    data(){
        return{
            form:{
                departName:'',
                userName:'',
                wcsj:"",
            },
            show:false,
            showflag: false,
            columns:[
                [
                    {id:1,label:'1'},
                ],
            ],
            showflag2: false,
            columns2:[
                [
                    // {id:1,label:'1'},
                ],
            ],
            departId:"",
            userId:'',
            showWcsj: false,
            wcsj: Number(new Date()),
        }
    },
    mounted(){
        this.getDepart()
    },
    methods:{
        close(){
            this.form.departName = ""
            this.form.userName = ""
            this.form.wcsj = ""
            this.departId = ""
            this.userId = ''
        },
        getDepart(){
            this.$service.working.getListDepart().then(res=>{
                let arr = res.data.map(e=>{ 
                    return {id:e.departId,label:e.departName}
                }) || []
                this.$set(this.columns,0,arr)
            })
            
        },
        getUser(){
            let params = {
                departId: this.departId
            }
            this.$service.working.listUserByDepart(params).then(res=>{
                let ryArr =  res.data.map( e=>{ 
                    return {id:e.userId,label:e.yhxm}
                }) || []
                this.$set(this.columns2,0,ryArr)
            })
        },
        openShow(){
            this.showflag = true
        },
        confirmShow(e) {
            this.departId = e.value[0].id
            this.form.departName =  e.value[0].label
            this.showflag = false
            this.getUser()
        },
        cancelShow(){
            this.showflag = false
        },
        openShow2(){
            this.showflag2 = true
        },
        openShow3(){
            this.showWcsj = true
        },
        confirmShow2(e) {
            if(this.columns2[0].length>=1) {
                this.userId = e.value[0].id
                this.form.userName =  e.value[0].label
            }
            
            this.showflag2 = false
        },
        cancelShow2(){
            this.showflag2 = false
        },
        open(){
            this.show = true
        },
        cancel(){
            this.$emit('cancel')
            this.show = false
            this.form.departName = ""
            this.form.userName = ""
            this.departId = ""
            this.userId = ''
        },
        confirm(){
            if( this.userId ) {
                let params = {
                    bjbh: this.bjbh,
                    userId: this.userId,
                    wcsj: this.form.wcsj
                }
                this.$service.working.getDxyjPf(params).then(res=>{
                    if(res.code == 200) {
                        this.$refs.uToast.show({
                            type: 'success',
                            // title: '成功主题(带图标)',
                            message: "下派成功",
                        })
                    }
                    
                })
                this.$emit('confirm')
                this.show = false
            } else {
                this.$refs.uToast.show({
                    type: 'error',
                    message: "请派发人员",
                })
            }
        },
        cancelWcsj(){
            this.showWcsj = false
        },
        confirmWcsj(e){
            
            let time = this.formatDate(e.value)
            this.form.wcsj = time
            this.showWcsj = false
        },
        formatDate(str){
            let date = new Date(str);        //获取系统时间
            let year = date.getFullYear();
            let month= date.getMonth() + 1;
            month= month< 10 ? ('0' + month) : month;
            let day = date.getDate();
            day = day < 10 ? ('0' + day ) : day ;
            let h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            let m = date.getMinutes();
            m = m < 10 ? ('0' + m) : m;
            let s = date.getSeconds();
            s = s < 10 ? ('0' + s) : s;
            //let w = date.getDay();        //获取星期几
            // return year + '-' + month + '-' + day + ' ' + h + ':' + m + ':' + s;
            return year + '-' + month + '-' + day
        }
    }
}
</script>

<style lang="scss" scoped>
.popup-content{
    width: 600rpx;
}
.popup-body{
    padding: 20rpx 40rpx;
}
.popup-footer{
    display: flex;
    border-top: 1px solid #EBEDF0;
    .cancel,.confirm{
        flex: 1;
        text-align: center;
        line-height: 90rpx;
    }
    .interval{
        width: 1px;
        height: 90rpx;
        background: #EBEDF0;
    }
    .confirm{
        color: #1985FE;
    }
}
::v-deep .u-safe-area-inset-bottom{
    padding-bottom: 0px !important;
}
</style>
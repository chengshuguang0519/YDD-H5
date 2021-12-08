<template>
    <view class='login'>
		<view class="logo_s">
			<view class='logo'>
			    <image src='/static/images/logo.png' />
			</view>
		</view>
		<view class="title">
			<text>仓储人员</text>
		</view>
        <view class='from'>
			<view class="form_s" @click="scan_the_code">
				<u-icon name="scan" color="#F79C22" size="80"></u-icon>
			</view>
			<view class="from_text" >扫码发货</view>
        </view>

        <view class='buttonViewRound' @tap="login">
			退出登录
        </view>
      
    </view>
</template>

<script>
    export default {
        data() {
            return {
				isPassWord:true,
				type:2,
				mobile:'',
				password:''
            }
        },
        onLoad() {
			
        },
        methods: {
           
            //登录
           scan_the_code(){
			   // let url ='https://www.yin10000.com?order_no=310'
			   // let ur = url.split('=');
			   //  console.log(ur[1]);
			   var thia = this;
			   // uni.scanCode({
			   //     success: function (res) {
			   //         console.log('条码类型：' + res.scanType);
			   //         console.log('条码内容：' + res.result);
					   // let url = res.result.split('=')
					   // console.log(url[1]);
					   thia.$u.post(this.api.postScanOrder,{id:310}).then(ress=>{
						   console.log(ress);
						   if(ress.code == 1){
							   uni.navigateTo({
							   	url:'/pages/supplier/supplier_thedelivery/index?data='+JSON.stringify(ress.data)
							   })
						   }
					   })
			   //     }
			   // });
		   },
		   login(){
			   
		   }
        }
    }
</script>

<style>
.login{
    background: #fff;
}
.title{
	text-align: center;
	font-size: 36rpx;
	color: #333333;
	font-weight: 500;
	padding-top: 44rpx;
}
.from{
	padding-top: 206rpx;
	padding-bottom: 108rpx;
}
.form_s{
	width: 300rpx;
	height: 300rpx;
	line-height: 300rpx;
	text-align: center;
	background: rgba(247,156,34,0.10);
	border-radius: 150rpx;
	margin: 0 auto;
}
.from_text{
	text-align: center;
	font-size: 30rpx;
	color: #333333;
	font-weight: 500;
	padding-top: 40rpx;
}
.logo{
    width: 414rpx;
    height: 156rpx;
    margin: 0 auto;
}
.logo_s{
	padding-top: 106rpx;
}
.btn{
    padding: 39rpx 65rpx;
    font-size: 28rpx;
    display: flex;
    justify-content: space-between;
}
.btn .right{
    color: #F79C22;
}
.buttonViewRound{
    color: #fff;
    font-size: 30rpx;
    width: 619rpx;
    height: 88rpx;
    line-height: 88rpx;
    margin: 0 auto;
    margin-top: 70rpx;
    background: #F79C22;
}
.loginAll{
    font-size: 26rpx;
    text-align: center;
    margin-top: 112rpx;

}
.loginAll .img{
    width: 80rpx;
    height: 80rpx;
    margin: 0 auto;
    margin-bottom: 24rpx;
}
</style>
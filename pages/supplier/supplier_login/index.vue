<template>
    <view class='login'>
        <view class='logo'>
            <image src='/static/images/logo.png' />
        </view>
		<view class="title">
			<text>大象企采智能仓储系统</text>
		</view>
		
        <view class='from'>
            <view class="input1">
                <input type="text" v-model="mobile" placeholder="请输入手机号"/>
            </view>
            <view class="input2">
				<input v-if="isPassWord" type="password" v-model="password" placeholder="请输入密码"/>
				<input v-else type="text" v-model="password" placeholder="请输入密码"/>
                <image @tap="isPassWord = false" v-if="isPassWord" src='/static/images/icon/password.png' />
                <image @tap="isPassWord = true" v-else src='/static/images/icon/password_pre.png' />
            </view>
        </view>
		
        <view class='buttonViewRound' @tap="login">
            登录
        </view>
      
    </view>
</template>

<script>
    export default {
        data() {
            return {
				isPassWord:true,
				type:5,
				mobile:'',
				password:''
            }
        },
        onLoad() {
			
        },
        methods: {
           
        
            //登录
           login(){
           	let data = {
           		mobile:this.mobile,
           		password:this.password,
           		type:this.type
           	}
           	this.$u.post(this.api.login,data).then(res=>{
           		if(res.code == 1){
           			uni.showToast({
           				title:res.msg,
           				icon:'none'
           			})
           			uni.setStorageSync('userinfo', res.data.userinfo);
           			setTimeout(()=>{
           				uni.reLaunch({
           					url:'/pages/supplier/supplier_index/index'
           				})
           			},2000)
           		}else{
           			uni.showToast({
           				title:res.msg,
           				icon:'none'
           			})
           		}
           	})
               // uni.showToast({
               //     title:'登录',
               //     icon:'none',
               // })
           },
        }
    }
</script>

<style>
.login{
    background: #fff;
}
.title{
	text-align: center;
	font-size: 48rpx;
	color: #333333;
	font-weight: 500;
	padding-top: 44rpx;
}
.logo{
    width: 414rpx;
    height: 156rpx;
    margin: 0 auto;
    margin-top: 140rpx;
}
.from{
    margin-top: 100rpx;
}
.from>view{
    width: 619rpx;
    height: 128rpx;
    padding: 32rpx 0;
    margin: 0 auto;
    margin-top: 37rpx;
    border-bottom: 1px solid #EEEEEE;
}
.from>view>input{
    font-size: 28rpx;
    height: 100%;
}
.input2{
    position: relative;
    
}
.input2 image{
    width: 32rpx;
    height: 15rpx;
    position: absolute;
    top: 50%;
    right: 30rpx;
    transform: translateY(-50%);
    z-index: 999;
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
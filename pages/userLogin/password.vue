<template>
    <view class='password'>
        <view class='from' v-if="next">
            <view class='item'>
                <view class='left'>
                    手机号码
                </view>
                <view class='right'>
                    <input type="text" v-model="mobile" placeholder="请输入手机号">
                </view>
            </view>
            <view class='item'>
                <view class='left'>
                    验证码
                </view>
                <view class='right getCode'>
                    <input type="text" v-model="code" placeholder="请输入验证码">
                    <span class="color1" @click="getCode">{{codeText}}</span>
                </view>
            </view>
        </view>
        <view class='from' v-else>
            <view class='item'>
                <view class='left'>
                    新密码
                </view>
                <view class='right'>
                    <input type="text" v-model="password" placeholder="请输入新密码">
                </view>
            </view>
            <view class='item'>
                <view class='left'>
                    确认密码
                </view>
                <view class='right getCode'>
                    <input type="text" v-model="repassword" placeholder="请输入确认密码">
                </view>
            </view>
        </view>
         <view v-if="next" class='buttonViewRound' @tap="passwordNext">
            下一步
        </view>
        <view v-else class='buttonViewRound' @tap="tijiao">
            提交
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                next: true,
				codeText:'发送验证码',
				getCodeshow:true,
				mobile:'',
				code:'',
				password:'',
				repassword:''
            }
        },
        onLoad() {

        },
        methods: {
            passwordNext(){
                this.next = false
            },
            //提交新密码
            tijiao(){
                uni.showToast({
                    title:'提交新密码',
                    icon:'none',
                })
				let data = {
					mobile:this.mobile,
					code:this.code,
					password:this.password,
					repassword:this.repassword
				}
				this.$u.post(this.api.resetpwd,data).then(res=>{
					console.log(res)
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
					// if(res.code == 1){
					// 	setTimeout(()=>{
					// 		uni.navigateBack({
					// 			delta:1
					// 		})
					// 	},2500)
					// }
				})
            },	// 验证码
			getCode(){
				if(this.mobile == ''){
					uni.showToast({
						title:'手机号不能为空',
						icon:'none'
					})
					return;
				}else if(!(/^1[3456789]\d{9}$/.test(this.mobile))){
					uni.showToast({
						title:'手机号格式不正确',
						icon:'none'
					})
					return;
				}
				if(this.getCodeshow){
					this.getCodeshow = false
					this.codeText = 60;
					let data={
						phone:this.mobile,
						type:3
					}
					this.$u.post(this.api.sendSms,data).then(res=>{
						console.log(res);
					})
					let time = setInterval(()=>{
						this.codeText = this.codeText-1;
						if(this.codeText == 0){
							this.codeText = '发送验证码'
							this.getCodeshow = true;
							clearTimeout(time)
						}
					},1000)
				}
				
			},
        }
    }
</script>

<style>
.password{
    font-size: 28rpx;
}
.from{
    margin-top: 100rpx;
}
.from>.item{
    width: 619rpx;
    height: 106rpx;
    padding: 32rpx 0;
    margin: 0 auto;
    display: flex;
    align-content: center;
    border-bottom: 1px solid #EEEEEE;
}
.from>.item .left{
    width: 135rpx;
}
.from>.item .right{
    flex: 1;
}
.from>view input{
    font-size: 28rpx;
    height: 100%;
}
.getCode{
    position: relative;
}
.getCode span{
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
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
</style>
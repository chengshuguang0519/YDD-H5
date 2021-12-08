<template>
	<view class='register c333'>
		<view class='logo'>
			<image src='/static/images/logo.png' />
		</view>
		<view class='from'>
			<view class='item'>
				<!-- <view class='left'>
					手机号码
				</view>
				<view class='right'>
					<input type="text" placeholder="请输入手机号">
				</view> -->
				<u-field v-model="mobile" label="手机号码" placeholder="请输入手机号" :clearable="false">
				</u-field>
			</view>
			<view class='item'>
				<!-- <view class='left'>
                    验证码
                </view>
                <view class='right getCode'>
                    <input type="text" placeholder="请输入验证码">
                    <span class="color1">获取验证码</span>
                </view> -->
				<u-field v-model="code" label="验证码" placeholder="请填写验证码" :clearable="false">
					<u-button size="mini" slot="right" :hair-line="false" class="custom-style" @click="getCode">
						{{codeText}}
					</u-button>
				</u-field>
			</view>
			<view class='item'>
				<!-- <view class='left'>
					所属行业
				</view>
				<view class='right'>
					<input type="text" placeholder="请选择所属行业为">
				</view> -->
				<u-field v-model="edu_idn" label="所属行业" disabled placeholder="请选择所属行业为" :clearable="false"
					@click="showeducationCates">
				</u-field>
			</view>
			<view class='item'>
				<!-- <view class='left'>
					邮箱
				</view>
				<view class='right'>
					<input type="text" placeholder="请输入您的邮箱">
				</view> -->
				<u-field v-model="email" label="邮箱" placeholder="请输入您的邮箱" :clearable="false">
				</u-field>
			</view>
			<view class='item'>
				<!-- <view class='left'>
					密码
				</view>
				<view class='right'>
					<input type="text" placeholder="请设置6-20位登录密码">
				</view> -->
				<u-field v-model="password" label="密码" placeholder="请设置6-20位登录密码" :clearable="false">
				</u-field>
			</view>
			<view class='item'>
				<!-- <view class='left'>
					确认密码
				</view>
				<view class='right'>
					<input type="text" placeholder="请确认6-20位登录密码">
				</view> -->
				<u-field v-model="repassword" label="确认密码" placeholder="请确认6-20位登录密码" :clearable="false">
				</u-field>
			</view>
		</view>
		<view class='radio'>
			<view class='img'>
				<image src='/static/images/icon/yes.png' />
			</view>
			<view class='text c999'>
				我已阅读并同意<span class="color1" @tap="go('/pages/userLogin/book')">《用户服务协议》</span>
			</view>
		</view>
		<view class='buttonViewRound' @tap="login">
			注册
		</view>
		<view class='color1' @tap="go('/pages/userLogin/login')">已有账号? 立即登录</view>
		<u-select v-model="show" :list="list" @confirm="confirm"></u-select>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				codeText: '发送验证码',
				mobile: '',
				password: '',
				type: '',
				email: '',
				edu_id: '',
				repassword: '',
				code: '',
				invitation_code: '',
				getCodeshow: true,
				edu_idn:'',
				show: false,
				list: []
			}
		},
		onLoad() {
			this.geteducationCates();
			this.checkWeChatCode()
		},
		methods: {
			geteducationCates() {
				this.$u.get(this.api.educationCates).then(res => {
					if (res.code == 1) {
						this.list = res.data
					}
				})
			},
			getUrlCode(name) {
				return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1]
					.replace(/\+/g, '%20')) || null
			},
			//检查浏览器地址栏中微信接口返回的code
			checkWeChatCode() {
				let code = this.getUrlCode('self_invitation')
				console.log(code);
				if (code) {
					// this.getOpenidAndUserinfo(code)
					this.invitation_code = code
				}
			},
			//跳转
			go(path) {
				uni.navigateTo({
					url: path,
				})
			},
			// 验证码
			getCode() {
				if (this.mobile == '') {
					uni.showToast({
						title: '手机号不能为空',
						icon: 'none'
					})
					return;
				} else if (!(/^1[3456789]\d{9}$/.test(this.mobile))) {
					uni.showToast({
						title: '手机号格式不正确',
						icon: 'none'
					})
					return;
				}
				if (this.getCodeshow) {
					this.getCodeshow = false
					this.codeText = 60;
					let data = {
						phone: this.mobile,
						type: 2
					}
					this.$u.post(this.api.sendSms, data).then(res => {
						console.log(res);
						if(res.code!==1){
							uni.showToast({
								title:res.msg,
								icon:'none'
							})
							this.codeText = '发送验证码'
						}else{
							this.codeText = 60
							let time = setInterval(() => {
								this.codeText = this.codeText - 1;
								if (this.codeText == 0) {
									this.codeText = '发送验证码'
									this.getCodeshow = true;
									clearTimeout(time)
								}
							}, 1000)
						}
					})
					
				}
			},
			showeducationCates() {
				this.show = true
			},
			confirm(e){
				console.log(e[0]);
				this.edu_id = e[0].value;
				this.edu_idn =	e[0].label
			},
			login() {
				let data = {
					'mobile': this.mobile,
					'password': this.password,
					'type': this.type,
					'email': this.email,
					'edu_id': this.edu_id,
					'repassword': this.repassword,
					'code': this.code,
					'invitation_code': this.invitation_code,
				}
				this.$u.post(this.api.register, data).then(res => {
					console.log(res,'res')
					if (res.code == 1) {
						uni.showToast({
							title: res.msg,
							duration:2000
						})
						setTimeout(()=>{
							uni.navigateTo({
								url:'/pages/userLogin/login'
							})
						},2000)
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			},
		}
	}
</script>

<style>
	.register {
		font-size: 28rpx;
	}

	.logo {
		width: 414rpx;
		height: 156rpx;
		margin: 0 auto;
		margin-top: 140rpx;
	}

	.from {
		margin-top: 100rpx;
	}

	.from>.item {
		width: 619rpx;
		/* 	height: 106rpx; */
		/* padding:  0 24rpx; */
		margin: 0 auto;
		display: flex;
		align-content: center;
		border-bottom: 1px solid #EEEEEE;
	}

	.from>.item .left {
		width: 135rpx;
	}

	.from>.item .right {
		flex: 1;
	}

	.from>view input {
		font-size: 28rpx;
		height: 100%;
	}

	.getCode {
		position: relative;
	}

	.getCode span {
		position: absolute;
		top: 50%;
		right: 0;
		transform: translateY(-50%);
	}

	.radio {
		width: 619rpx;
		margin: 0 auto;
		margin-top: 38rpx;
		display: flex;
		align-items: center;
	}

	.radio .img {
		width: 28rpx;
		height: 28rpx;
		margin-right: 17rpx;
		position: relative;
		margin-right: 1;
		border-radius: 1px solid #f1f1f1;
	}

	.radio img image {
		position: absolute;
		top: 0;
		left: 0;
	}

	.buttonViewRound {
		color: #fff;
		font-size: 30rpx;
		width: 619rpx;
		height: 88rpx;
		line-height: 88rpx;
		margin: 0 auto;
		margin-top: 70rpx;
		background: #F79C22;
	}

	.color1 {
		text-align: center;
		margin-top: 29rpx;
	}

	.u-field {
		padding: 22rpx 0;
	}

	.custom-style {
		color: #F79C22 !important;
		border: 0;
	}
</style>

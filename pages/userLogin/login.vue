<template>
	<view class='login'>
		<view class='logo'>
			<image src='/static/images/logo.png' />
		</view>
		<view class='from'>
			<view class="input1">
				<input type="text" v-model="mobile" placeholder="请输入手机号" />
			</view>
			<view class="input2">
				<input v-if="isPassWord" type="password" v-model="password" placeholder="请输入密码" />
				<input v-else type="text" v-model="password" placeholder="请输入密码" />
				<image @tap="isPassWord = false" v-if="isPassWord" src='/static/images/icon/password.png' />
				<image @tap="isPassWord = true" v-else src='/static/images/icon/password_pre.png' />
			</view>
		</view>
		<view class='btn'>
	<!-- 		<view class="keep">
			<u-radio-group v-model="checkValue" @change="Readcheck">
				<u-radio shape="circle" active-color='#FF9C00' :name="0">
					<text class="c999">记住密码</text>
				</u-radio>
			</u-radio-group>
			</view> -->
			<view class="left c999" @tap="go('/pages/userLogin/password')">忘记密码</view>
			<view class="right" @tap="go('/pages/userLogin/register')">注册新用户</view>
		</view>
		<view @click="login">
			<view class='buttonViewRound' @click="login">
				登录
			</view>
		</view>
		<!-- <view class="loginAll">
			<view class="img">
				<image src='/static/images/weixin.png' />
			</view>
			<view class="c999">其他登录方式</view>
		</view> -->
		<!-- 		<u-modal v-model="KeepShow" show-cancel-button :content="content" 
		@confirm="KeepPass" @cancel="noKeep"></u-modal> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isPassWord: true,
				type: 2,
				mobile: '',
				password: '',
				code: '',
				isWeixin: false,
				content: '是否记住密码？',
				// KeepShow:false,
				// keepY:'',
				// checkValue: 0,
				// cheackShow: true,
				// keep: false,
			}
		},
		onLoad(opent) {
			// this.mobile = uni.getStorageSync('mobile')
			// this.password = uni.getStorageSync('password')
			let local = encodeURIComponent(window.location.href);
			let code = this.getUrlCode('code')
			console.log(code);
			this.code = code
			if (!code) {
				this.isWeixin = this.isWechat()
				if (this.isWeixin) {
					this.getcode()
					this.checkWeChatCode() //通过微信官方接口获取code之后，会重新刷新设置的回调地址【redirect_uri】
				}
			}
		},
		methods: {
			//跳转
			go(path) {
				uni.navigateTo({
					url: path,
				})
			},
			// //是否记住密码
			// Readcheck(e) {
			// 	console.log(e)
			// 	this.cheackShow = !this.cheackShow
			// 	this.checkValue = e
			// 	if (this.cheackShow) {
			// 		this.checkValue = 0
			// 	} else {
			// 		this.checkValue = 1
			// 	}
			// 	console.log(this.checkValue)
			// },
			//登录
			login() {
				// this.getcode()	
				let data = {
					mobile: this.mobile,
					password: this.password,
					type: this.type,
					code: this.code,
				}
				this.$u.post(this.api.login, data).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
						uni.setStorageSync('userinfo', res.data.userinfo);
						setTimeout(() => {
							
							if (res.data.userinfo.type == 5) {
								uni.reLaunch({
									url: '/pages/supplier/supplier_index/index'
								})
							} else {
								uni.reLaunch({
									url: '/pages/index/index'
								})
							}
						}, 2000)
						// uni.showModal({
						// 	title: '提示',
						// 	content: '是否记住密码？',
						// 	success: (ress) => {
						// 		if (ress.confirm) {
						// 			uni.setStorageSync('userinfo', res.data.userinfo);
						// 			uni.setStorageSync('mobile', this.mobile);
						// 			uni.setStorageSync('password', this.password);
						// 			setTimeout(() => {
						// 				if (res.data.userinfo.type == 5) {
						// 					uni.reLaunch({
						// 						url: '/pages/supplier/supplier_index/index'
						// 					})
						// 				} else {
						// 					uni.reLaunch({
						// 						url: '/pages/index/index'
						// 					})
						// 				}
						// 			}, 1000)
						// 		} else if (ress.cancel) {
						// 			uni.setStorageSync('userinfo', res.data.userinfo);
						// 			uni.removeStorageSync('mobile', this.mobile);
						// 			uni.removeStorageSync('password',this.password);
						// 			setTimeout(() => {
						// 				if (res.data.userinfo.type == 5) {
						// 					uni.reLaunch({
						// 						url: '/pages/supplier/supplier_index/index'
						// 					})
						// 				} else {
						// 					uni.reLaunch({
						// 						url: '/pages/index/index'
						// 					})
						// 				}
						// 			}, 1000)
						// 		}
						// 	}
						// })

					} else {
						uni.showToast({
							title: '账号密码不匹配',
							icon: 'none'
						})
					}
				})
			},
			// getuser(){

			// KeepPass(){
			//    	let data = {
			// 	mobile: this.mobile,
			// 	password: this.password,
			// 	type: this.type,
			// 	code:this.code
			//    }
			//    alert('123')
			//    this.$u.post(this.api.login, data).then(res => {
			// 		uni.showToast({
			// 			title: res.msg,
			// 			icon: 'none'
			// 		})
			// 		uni.setStorageSync('userinfo', res.data.userinfo);
			// 		uni.setStorageSync('mobile', this.mobile);
			// 		uni.setStorageSync('password',this.password);
			// 			setTimeout(() => {
			// 				if (res.data.userinfo.type == 5) {
			// 					uni.reLaunch({
			// 						url: '/pages/supplier/supplier_index/index'
			// 					})
			// 				} else {
			// 					uni.reLaunch({
			// 						url: '/pages/index/index'
			// 					})
			// 				}
			// 			}, 2000)

			// })
			// },


			// noKeep(){
			// 	let data = {
			// 		mobile: this.mobile,
			// 		password: this.password,
			// 		type: this.type,
			// 		code:this.code
			// 	   }
			// 	  this.$u.post(this.api.login, data).then(res => {
			// 			uni.showToast({
			// 				title: res.msg,
			// 				icon: 'none'
			// 			})
			// 			uni.setStorageSync('userinfo', res.data.userinfo);
			// 			uni.removeStorageSync('mobile', this.mobile);
			// 			uni.removeStorageSync('password',this.password);
			// 				setTimeout(() => {
			// 					if (res.data.userinfo.type == 5) {
			// 						uni.reLaunch({
			// 							url: '/pages/supplier/supplier_index/index'
			// 						})
			// 					} else {
			// 						uni.reLaunch({
			// 							url: '/pages/index/index'
			// 						})
			// 					}
			// 				}, 2000)
			// 	})
			// },
			// },
			/*微信登录相关  start*/
			//方法：用来判断是否是微信内置的浏览器
			isWechat() {
				return String(navigator.userAgent.toLowerCase().match(/MicroMessenger/i)) === "micromessenger";
			},
			//方法:用来提取code
			getUrlCode(name) {
				return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) ||
					[, ''
					])[1]
					.replace(/\+/g, '%20')) || null
			},
			//检查浏览器地址栏中微信接口返回的code
			checkWeChatCode() {
				let code = this.getUrlCode('code')
				console.log(code);
				if (code) {
					// this.getOpenidAndUserinfo(code)
					this.code = code
				}
			},
			//请求微信接口，用来获取code
			getcode() {
				// window.location.href ='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx94ea2fc5bddfb711&redirect_uri=https%3A%2F%2Fyhzcgw.dd371.com&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
				// 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx45a52b09d943be04&response_type=code&scope=snsapi_base&state=1&redirect_uri=https://www.yin10000.com#wechat_redirect'
				// window.location.href ='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx94ea2fc5bddfb711&redirect_uri=https%3A%2F%2Fyinduoduo.dd371.com&response_type=code&scope=snsapi_base&state=1#wechat_re'
				let local = encodeURIComponent(window.location.href); //获取当前页面地址作为回调地址
				let appid = 'wx94ea2fc5bddfb711'
				//通过微信官方接口获取code之后，会重新刷新设置的回调地址【redirect_uri】
				window.location.href =
					"https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
					appid +
					"&redirect_uri=" +
					local +
					"&response_type=code&scope=snsapi_base&state=1#wechat_redirect";
			}

		}
	}
</script>

<style>
	.login {
		background: #fff;
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

	.from>view {
		width: 619rpx;
		height: 128rpx;
		padding: 32rpx 0;
		margin: 0 auto;
		margin-top: 37rpx;
		border-bottom: 1px solid #EEEEEE;
	}

	.from>view>input {
		font-size: 28rpx;
		height: 100%;
	}

	.input2 {
		position: relative;

	}

	.input2 image {
		width: 32rpx;
		height: 15rpx;
		position: absolute;
		top: 50%;
		right: 30rpx;
		transform: translateY(-50%);
		z-index: 999;
	}

	.btn {
		padding: 39rpx 65rpx;
		font-size: 28rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.btn .keep {
		
	}
	.btn .right {
		color: #F79C22;
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

	.loginAll {
		font-size: 26rpx;
		text-align: center;
		margin-top: 112rpx;

	}

	.loginAll .img {
		width: 80rpx;
		height: 80rpx;
		margin: 0 auto;
		margin-bottom: 24rpx;
	}
</style>

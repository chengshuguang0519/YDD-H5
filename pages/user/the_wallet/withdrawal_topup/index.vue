<template>
	<view class="wt">
		<view v-if="type == 2">
			<u-radio-group v-model="value" class="wt_radio" active-color="#F79C22">
				<u-radio active-color="#FE8109" name='0'>到账银行卡 </u-radio>
				<u-radio active-color="#FE8109" name='1'>到账微信钱包</u-radio>
			</u-radio-group>
		</view>
		<u-gap height="20" bg-color="#F7F7F7"></u-gap>

		<view class="wallet">
			<view class="wallet_title">
				{{type == 1?'充值金额':'提现金额'}}
			</view>
			<view class="wallet_input">
				<view>
					￥
				</view>
				<view>
					<input type="digit" :placeholder="type == 1?'您要充值金额为':'可提现余额为'+userinfo.money" v-model="money" />
				</view>
				<view v-if="type == 2" @click="quanbu">
					全部提现
				</view>
			</view>
			<view class="prompt" v-if="type == 2">
				有{{userinfo.withdrawal}}元为平台赠送金额不可提现，提现需收取手续费
			</view>


			<view class="wallet_btn">
				<view class="btn" @click="save">
					{{type == 2?'我要提现':'我要充值'}}
				</view>
			</view>
		</view>
		<u-gap height="20" bg-color="#F7F7F7" v-if="type == 2"></u-gap>
		<view class="wallet" v-if="type == 2">
			<view class="wallet_title">
				订单记录
			</view>
			<view class="walletlist">
				<view class="walletlist_item" v-for="(i,index) in listwithdrawLog" :key="index">
					<view class="walletlist_left">
						<view>订单号：{{i.order_no}}提现</view>
						<view>{{i.update_time}}</view>
					</view>
					<view class="walletlist_right">
						-{{i.price}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: 0,
				type: 1,
				userinfo: {},
				listwithdrawLog: [],
				money: ''
			}
		},
		onLoad(opent) {
			this.type = opent.type
			if (opent.type == 1) {
				uni.setNavigationBarTitle({
					title: '充值'
				})
			}
			this.getuser();
			this.getlist();
			this.getwithdrawLog();
		},
		methods: {
			getuser() {
				this.$u.get(this.api.getuserindex).then(res => {
					this.userinfo = res.data
				})
			},
			quanbu(){
				this.money = this.userinfo.money
			},
			getlist() {
				this.$u.get(this.api.withdrawinfo).then(res => {
					console.log(res);
				})
			},
			getwithdrawLog() {
				let data = {
					page: 1,
					pagesize: 50
				}
				this.$u.post(this.api.withdrawLog, data).then(res => {
					if (res.code == 1) {
						this.listwithdrawLog = res.data
					}
				})
			},
			save() {
				if (this.type == 1) {
					let data = {
						price: this.money,
						port: 'wxpay',
						type: 1
					}
					this.$u.post(this.api.userRecharge, data).then(res => {
							if (res.code == 1) {
								// #ifdef MP-WEIXIN
								uni.requestPayment({
									provider: 'wxpay',
									timeStamp: String(Date.now()),
									nonceStr: res.msg.pay_info.nonceStr,
									package: res.msg.pay_info.package,
									signType: res.msg.pay_info.signType,
									paySign: res.msg.pay_info.paySign,
									success: function(resr) {
										console.log('success:' + JSON.stringify(resr));
									},
									fail: function(err) {
										console.log('fail:' + JSON.stringify(err));
									}
								});
								//  #endif

								// #ifdef H5
								var thia = this;
								
								WeixinJSBridge.invoke('getBrandWCPayRequest',{
									appId: res.msg.pay_info.appId,
									timeStamp: res.msg.pay_info.timeStamp,
									nonceStr: res.msg.pay_info.nonceStr,
									package: res.msg.pay_info.package,
									signType: res.msg.pay_info.signType,
									paySign: res.msg.pay_info.paySign,
									success: () => {
										// 支付成功后
										console.log('支付成功后');
										uni.navigateBack({
											delta:1
										})
									},
									fail: err => {
										// 支付失败
										console.log('支付失败');
									},
									cancel: err => {
										// 支付取消
										console.log('支付取消');
									}
								});
								// jweixin.config({
								// 	debug: true,
								// 	appId: res.msg.pay_info.appId,
								// 	timestamp: res.msg.pay_info.timestamp,
								// 	nonceStr: res.msg.pay_info.nonceStr,
								// 	signature: res.msg.pay_info.signature,
								// 	jsApiList: ['chooseWXPay']
								// });
								// jweixin.ready(function() {
								// 	jweixin.checkJsApi({
								// 		jsApiList: ['chooseWXPay'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
								// 		success: function(res) {
								// 			console.log('checkjsapi Success')
								// 			console.log(res);
								// 		},
								// 		fail: function(res) {
								// 			console.log('res')
								// 			console.log(res);
								// 		}
								// 	});
								// 	jweixin.chooseWXPay({
								// 		timestamp: res.msg.pay_info.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
								// 		nonceStr: res.msg.pay_info.nonceStr, // 支付签名随机串，不长于 32 位
								// 		package: res.msg.pay_info.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
								// 		signType: res.msg.pay_info.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
								// 		paySign: res.msg.pay_info.paySign, // 支付签名
								// 		success: function(res) {
								// 			// 支付成功后的回调函数
								// 			console.log('paysuccess')
								// 			console.log(res)
								// 			var route = 'payResult' + '?type=1'
								// 			uni.navigateTo({
								// 				url: route
								// 			});

								// 		},
								// 		cancel: function(r) {
								// 			var route = 'payResult' + '?type=2'
								// 			uni.navigateTo({
								// 				url: route
								// 			});
								// 		},
								// 		fail: function(res) {
								// 			console.log('payfail')
								// 			console.log(res)
								// 			var route = 'payResult' + '?type=0'
								// 			uni.navigateTo({
								// 				url: route
								// 			});
								// 		}
								// 	});
								// });
								// jweixin.error(function(res) {
								// 	console.log('error')
								// 	console.log(res)
								// 	uni.showToast({
								// 		icon: 'error',
								// 		title: '支付失败了',
								// 		duration: 4000
								// 	});
								// });
										// jweixin.ready(function(){
										//     // TODO
										// 	wx.chooseWXPay({
										// 	  timestamp: 0, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
										// 	  nonceStr: '', // 支付签名随机串，不长于 32 位
										// 	  package: '', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
										// 	  signType: '', // 微信支付V3的传入RSA,微信支付V2的传入格式与V2统一下单的签名格式保持一致
										// 	  paySign: '', // 支付签名
										// 	  success: function (res) {
										// 	    // 支付成功后的回调函数
										// 	  }
										// 	});
										// });

										//  #endif
									}
								})
						}else{
							if(this.money > 0){
								let data = {
									type:this.value==0?1:3,
									money:this.money,
									master_type:3
								}
								this.$u.post(this.api.postTixian,data).then(res=>{
									wx.showToast({
										title:res.msg,
										icon:'none'
									})
									if(res.code == 1){
										uni.navigateBack({
											delta:0
										})
									}
								})
							}
						}
					}
				}
			}
</script>

<style lang="less">
	.wt {
		.wt_radio {
			display: flex;
			width: 100%;
			justify-content: space-between;
			padding: 32rpx;
		}

		.wallet_input {
			display: flex;
			padding: 38rpx;
			align-items: center;

			view:nth-child(1) {
				font-size: 72rpx;
				color: #333333;
				font-weight: 500;
			}

			view:nth-child(2) {
				width: 70%;
			}

			view:nth-child(3) {
				color: #F79C22;
			}
		}

		.wallet_btn {
			padding: 0 38rpx;

			.btn {
				height: 88rpx;
				line-height: 88rpx;
				background-color: #F79C22;
				border-radius: 44rpx;
				text-align: center;
				font-weight: 700;
				font-size: 30rpx;
				color: #FFFFFF;
			}
		}

		.prompt {
			padding: 30rpx 38rpx 60rpx 38rpx;
			font-size: 26rpx;
			color: #999999;
			border-top: 2rpx solid #F2F2F2;
		}

		.wallet {
			// padding: 38rpx;
			padding: 38rpx 0;

			.wallet_title {
				color: #000000;
				font-size: 32rpx;
				font-weight: 700;
				padding: 0 38rpx 0 38rpx;
			}

			.wallettabs {
				position: relative;
			}

			.walletlist {
				padding: 0 38rpx 38rpx 38rpx;
			}

			.wallettabs::after {
				content: '';
				border-bottom: 0.5px solid #FE8009;
				width: 88%;
				left: 6%;
				bottom: 2px;
				position: absolute;
			}

			.walletlist_item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 35rpx 0;
				border-bottom: 1rpx solid #F7F7F7;

				.walletlist_left {
					view:nth-child(1) {
						color: #333333;
						font-weight: 500;
						font-size: 26rpx;
					}

					view:nth-child(2) {
						color: #999999;
						font-weight: 500;
						font-size: 26rpx;
						padding-top: 10rpx;
					}
				}
			}
		}
	}
</style>

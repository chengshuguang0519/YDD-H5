<template>
	<view class="advance">
		<view class="top_css">
			<view :class="topindex == 0?'topave':''" @click="onclicktop(0)">
				自提
			</view>
			<view :class="topindex == 1?'topave':''" @click="onclicktop(1)">
				快递
			</view>
			<view :class="topindex == 2?'topave':''" @click="onclicktop(2)">
				送货上门
			</view>
		</view>
		<!-- 自提地址 -->
		<view v-if="topindex == 0 && selfAdd!==''" class="selfadd">
			<text>{{selfAdd.name}}</text>
			<view>
				<text>{{selfAdd.address}}</text>
				<text>{{selfAdd.phone}}</text>
			</view>
		</view>
		<!-- 快递和送货上门 -->
		<view>
			<view class="advance_address" @click="changeAddress"
				v-if="(topindex==1&&showAddress) ||(topindex==2&&showAddress)">
				<view class="name_phone"><text>{{addressList.name}}</text><text>{{addressList.phone}}</text></view>
				<view class="city">
					<view>
						<text>默认</text>
						<text>{{addressDetails}}</text>
					</view>
					<view style="margin-left: 20rpx;" @click='getAddress'>
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
			<view v-if="(topindex==1&&!showAddress) ||(topindex==2&&!showAddress)">
				<button type="primary" plain style="margin:30rpx" @click='getAddress'>请选择收货地址</button>
			</view>
		</view>
		<u-gap height="14" bg-color="#EEEEEE"></u-gap>

		<!-- 		<view class="advance_goods" v-for="(item,i) in orderData.good_snap">
			<view class="exc_box_top"> -->

		<view class="advance_goods" v-for="(item,index) in orderData.good_snap " :key="index">
			<view class="exc_box_top">

				<view class="excBoxTop_right">
					<view class="image">
						<image :src="item.cover_image" mode=""></image>
					</view>
					<view class="text">
						<view>
							<view class="title">{{item.title}}</view>
							<view class="titlee">{{item.spec_name}}</view>
						</view>
						<view>
							<!-- *{{item.number}} -->
							<!-- <u-number-box v-model="orderData.good_snap[0].number" @change="valChange"></u-number-box> -->
						</view>
					</view>
				</view>
			</view>
			<u-cell-item title="配送方式" :value="topindex==0?'自提':topindex==1 ? '普通快递':'送货上门'" :border-bottom="false"
				:arrow="false"></u-cell-item>
			<u-cell-item title="印刷文件" value="印刷文件" :border-bottom="false" :arrow="false"></u-cell-item>
			<!-- <u-cell-item title="备注" value="选填" :border-bottom="false" :arrow="false">
				
			</u-cell-item> -->
			<view class="bz">
				<text>备注</text>
				<u-input v-model="item.desc" class="ipt" :clearable='false' />
			</view>
		</view>
		<u-gap height="14" bg-color="#EEEEEE"></u-gap>
		<view class="meyte">
			<u-cell-item title="商品金额" :value="'￥' + goodsPrice.toFixed(2)" :border-bottom="false" :arrow="false">
			</u-cell-item>
			<u-cell-item title="运费" :value="'￥' + orderData.shipping" :border-bottom="false" :arrow="false">
			</u-cell-item>
			<u-cell-item title="优惠券" :value="'-' + orderData.coupon_price" :border-bottom="false" :arrow="false">
			</u-cell-item>
			<view class="meyte_cemt">
				<view><text>总计 :</text><text>¥{{orderData.total_price}}</text></view>
			</view>
		</view>
		<u-gap height="14" bg-color="#EEEEEE"></u-gap>
		<view class="way">
			<u-radio-group v-model="value" @change="radioGroupChange" style="width: 100%;" active-color="#F69B21">
				<u-cell-item title="微信支付" :arrow="false">
					<u-icon slot="icon" size="40" name="weixin-circle-fill" color="#09BB06"></u-icon>
					<u-radio @change="radioChange(0)" name="0"></u-radio>
				</u-cell-item>
				<u-cell-item title="余额支付" :arrow="false">
					<u-icon slot="icon" size="40" name="moments-circel-fill" color="#F79C22"></u-icon>
					<u-radio @change="radioChange(1)" name="1"></u-radio>
				</u-cell-item>
			</u-radio-group>
		</view>
		<u-gap height="14" bg-color="#EEEEEE"></u-gap>
		<view class="bottom">
			<view class="left">
				<text>总计 :</text>
				<text>¥{{orderData.total_price}}</text>
				<!-- 	<text>¥{{orderData.total_price}}</text> -->
			</view>
			<view class="right" @click="goPay">
				<view>立即支付</view>
			</view>
		</view>
		<view class="pswPop">
			<u-popup v-model="show" mode="center" closeable>
				<view class="pswPop-item">
					<view>请输入支付密码</view>
					<view>支付金额</view>
					<view><text>￥</text><text>{{orderData.total_price}}</text></view>
					<view>
						<text>钱包余额</text>
						<text>￥{{userPrice}}</text>
					</view>
					<view>
						<u-message-input dot-fill :focus="true" :maxlength='6' font-size='40rpx' :breathe="false"
							@finish="finish"></u-message-input>
					</view>
				</view>
			</u-popup>
		</view>

	</view>
</template>

<script>
	//自提是1  其余为2 
	export default {
		data() {
			return {
				userPrice: '',
				value: 0,
				topindex: 0,
				orderData: '',
				addressList: {},
				addressId: '',
				selfAdd: {},
				addressDetails: '',
				showAddress: true,
				desc: '',
				getPriceData: {},
				getPriceDataStr: '',
				specId: '',
				payList: '',
				order_id: '',
				show: false,
				pwd: '',
				weChactPay: {},
				ids: '',
				good_type: '',
				postData: {},
				buyData: {},
				totalPrice: 0,
				goodsPrice:0,
				cartList: ''
			}
		},
		onShow() {
			this.getSelfMentionAddress()
			this.changeAddress()
		},
		onLoad(options) {
			console.log(options,'options')
			// buyData
			this.changeAddress()
			this.getSelfAdd()
			this.getSelfMentionAddress()
			console.log(JSON.parse(options.option), '预订单参数')
			console.log(JSON.parse(options.buyData), 'buyData')
			// console.log(JSON.parse(options.data), '预订单参数')
			this.payObj = JSON.parse(uni.getStorageSync('payObj'))
			this.buyData = JSON.parse(options.buyData)
			console.log(this.buyData,'options')

			if (options.cart) {
				this.cartList = JSON.parse(options.cart)
			} else {
				this.cartList = ''
			}
			console.log(this.cartList, 'cartlist')
			if (options.data) {
				this.postData = JSON.parse(options.data)
			} else {
				this.postData = {}
			}

			var data = JSON.parse(options.option)
			console.log(data, 'data')
			data.good_snap.forEach(item => {
				item.desc = ''
			})
			this.orderData = data
			this.good_type = data.good_snap[0].good_type
			if(options.cart){
				this.orderData.good_snap.forEach(v=>{
					this.goodsPrice += v.price
				})
			}else{
				this.goodsPrice  =this.orderData.good_snap[0].price
			}
			if (options.specId) {
				this.specId = options.specId
			}
			if (options.ids) {
				this.ids = options.ids
			}

			let user = uni.getStorageSync('userinfo')
			this.userPrice = user.money
		},
		computed: {
			totalPrice() {
				let price = 0
				return this.orderData.total_price
			}
		},
		methods: {
			valChange() {

			},
			//获取自提地址
			getSelfMentionAddress() {
				this.$u.get('/order/getSelfMentionAddress').then(res => {
					console.log(res.data)
					this.selfAdd = res.data
				})
				this.$forceUpdate()
			},
			radioGroupChange(e) {},
			radioChange(e) {
				console.log(e)
				//0 微信支付  1 余额支付
				this.payList = e
			},
			onclicktop(index) {
				console.log(index);
				this.topindex = index;
				if (index == 0) {
					this.buyData.address_id = 0
					this.$u.post(this.api.buynow, this.buyData).then(res => {
						console.log(res, 'res0')
						this.orderData.shipping = 0
						this.orderData.total_price = res.data.total_price
					})
				} else {
					this.buyData.address_id = this.addressId
					this.$u.post(this.api.buynow, this.buyData).then(res => {
						console.log(res, 'res12')
						this.orderData.shipping = res.data.shipping
						this.orderData.total_price = res.data.total_price
					})
				}

				if (index == 0 && this.cartList == 1) {
					this.buyData.address_id = 0
					this.$u.post(this.api.cartConfirm, this.buyData).then(res => {
						this.orderData.shipping = 0
						this.orderData.total_price = res.data.total_price
					})
				} else if ((index == 1 || index == 2) && this.cartList == 1) {
					this.buyData.address_id = this.addressId
					this.$u.post(this.api.cartConfirm, this.buyData).then(res => {
						this.orderData.shipping = res.data.shipping
						this.orderData.total_price = res.data.total_price
					})
				}
			},
			changeAddress() {
				this.$u.get('user/getDefaultAddress').then(res => {
					console.log(res, 'address')
					if (res.code == 0) {
						this.showAddress = false
					} else {
						this.addressId = res.data.id
						this.addressList = res.data
						this.addressDetails = this.addressList.province + this.addressList.city + this.addressList
							.area + this.addressList.address
						this.onclicktop(this.topindex)
					}
					this.$forceUpdate()
				})
			},
			// 获取支付密码
			finish(e) {
				console.log(e)
				this.pwd = e
				this.show = false
				this.payOrder()
			},
			getAddress() {
				uni.navigateTo({
					url: "/pages/Shipping_address/index"
				})
			},
			getSelfAdd() {
				this.$u.get(this.api.getSelfAdd).then(res => {
					console.log(res.data, 'self')
					this.selfAdd = res.data
				})
			},
			goPay() {
				var _this = this;
				if (this.ids) {
					let descArr = []
					this.orderData.good_snap.forEach(item => {
						descArr.push(item.desc)
					})
					var data = {
						cart_ids: this.ids,
						coupon_id: '',
						address_id: this.topindex != 0 ? this.addressId : 0,
						receipt_type: this.topindex == 0 ? 2 : 1,
						desc: JSON.stringify(descArr),
					}
					console.log(data)
					this.$u.post('/order/AddCartOrder', data).then(res => {
						console.log(res,'cartpay')
						if (res.code == 1) {
							if (this.payList == 1) {
								this.payid = res.data.order_id.join(',')
								this.show = true
							}
							this.$u.post('order/payOrder', {
								order_id: res.data.order_id.join(','),
								pay_method: 2,
								pay_type: 1,
								port: 'jspay',
							}).then(res => {
								this.weChactPay = res.data
								if (res.code == 1) {
									WeixinJSBridge.invoke('getBrandWCPayRequest', {
										appId: res.data.appId,
										timeStamp: res.data.timeStamp,
										nonceStr: res.data.nonceStr,
										package: res.data.package,
										signType: res.data.signType,
										paySign: res.data.paySign,
										success: () => {
											// 支付成功后
											console.log('支付成功后');
											uni.navigateTo({
												url: 'pages/order/the_order/index?index=2'
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
								} else {
									uni.showToast({
										title: res.msg,
										icon: 'none'
									})
								}
							})
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none',
								duration: 3000
							})
						}
					})
				} else if (this.good_type == 2) {
					// var _this = this
					this.payObj.address_id = this.topindex != 0 ? this.addressId : 0
					this.payObj.receipt_type = this.topindex == 0 ? 2 : 1
					// this.$u.post(this.api.buyAddorder, this.payObj).then(res => {
					// 	this.payid = res.data.order_id.join(',')
					// })
					this.$u.post(this.api.NormalSpec, {
						good_type: this.orderData.good_snap[0].good_type,
						spec_name: this.orderData.good_snap[0].spec_name,
						good_id: this.orderData.good_snap[0].good_id,
						number: this.orderData.good_snap[0].number
					}).then(res => {
						if (res.code == 1) {
							console.log(res.data, '价格')
							let {
								good_id,
								number,
								good_type,
								spec_name
							} = this.orderData.good_snap[0]
							let data1 = {
								good_id: good_id,
								number: number,
								spec: JSON.stringify(res.data),
								spec_id: _this.specId ? this.specId : 1,
								good_type: good_type,
								craft_id: '',
								coupon_id: '',
								address_id: this.topindex != 0 ? this.addressId : 0,
								design_file: '',
								sample_file: '',
								spec_name: spec_name,
								type: 1,
								receipt_type: this.topindex == 0 ? 2 : 1,
								decs: _this.desc,
							}
							_this.$u.post(this.api.buyAddorder, data1).then(ress => {
								if (ress.code == 0) {
									uni.showToast({
										title: "支付失败",
										icon: 'none'
									})
								} else {
									console.log(ress, 'resssss', )
									this.order_id = ress.data.order_id[0]
									uni.setStorageSync('order_id', this.order_id)
								}
								//余额支付
								if (this.payList == 1) {
									this.show = true
								} else {
									//微信支付
									this.$u.post('order/payOrder', {
										order_id: uni.getStorageSync('order_id'),
										pay_method: 2,
										pay_type: 1,
										port: 'jspay',
									}).then(res => {
										this.weChactPay = res.data
										console.log(res.data, '123')
										if (res.code == 1) {
											WeixinJSBridge.invoke('getBrandWCPayRequest', {
												appId: res.data.appId,
												timeStamp: res.data.timeStamp,
												nonceStr: res.data.nonceStr,
												package: res.data.package,
												signType: res.data.signType,
												paySign: res.data.paySign,
												success: () => {
													// 支付成功后
													console.log('支付成功后');
													uni.navigateTo({
														url: 'pages/order/the_order/index?index=2'
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
										} else {
											uni.showToast({
												title: res.msg,
												icon: 'none'
											})
										}
									})
								}
							})
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none',
								duration: 3000
							})
						}
					})
				} else if (this.good_type == 1 ||this.good_type == 3) {
					this.$u.post('/goods/postPrice', this.postData).then(res => {
						console.log(res, 'postDate')
						if (res.code == 1) {
							console.log(res.data, '价格')
							let {
								good_id,
								number,
								good_type,
								spec_name
							} = this.orderData.good_snap[0]
							let data1 = {
								good_id: good_id,
								number: number,
								spec: JSON.stringify(res.data[0].this),
								spec_id: _this.specId ? this.specId : 1,
								good_type: good_type,
								// craft_id: '',
								// coupon_id: '',
								address_id: this.topindex != 0 ? this.addressId : 0,
								receipt_type: this.topindex == 0 ? 2 : 1
								// design_file: '',
								// sample_file: '',
								// spec_name: spec_name,
								// type: 1,
								// receipt_type: this.topindex == 0 ? 2 : 1,
								// decs: _this.desc,
							}
							_this.$u.post(this.api.buyAddorder, data1).then(ress => {
								if (ress.code == 0) {
									uni.showToast({
										title: "支付失败",
										icon: 'none'
									})
								} else {
									console.log(ress.data.order_id[0], )
									this.order_id = ress.data.order_id[0]
									uni.setStorageSync('order_id', this.order_id)
								}
								//余额支付
								if (this.payList == 1) {
									this.show = true
								} else {
									//微信支付
									this.$u.post('order/payOrder', {
										order_id: uni.getStorageSync('order_id'),
										pay_method: 2,
										pay_type: 1,
										port: 'jspay',
									}).then(res => {
										this.weChactPay = res.data
										console.log(res.data, '123')
										if (res.code == 1) {
											WeixinJSBridge.invoke('getBrandWCPayRequest', {
												appId: res.data.appId,
												timeStamp: res.data.timeStamp,
												nonceStr: res.data.nonceStr,
												package: res.data.package,
												signType: res.data.signType,
												paySign: res.data.paySign,
												success: () => {
													// 支付成功后
													console.log('支付成功后');
													uni.navigateTo({
														url: 'pages/order/the_order/index?index=2'
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
										} else {
											uni.showToast({
												title: res.msg,
												icon: 'none'
											})
										}
									})
								}
							})
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none',
								duration: 3000
							})
						}
					})
				} else if (this.good_type == 11) {
					this.$u.post('goods/OtherPrice', this.postData).then(res => {
						console.log(res, 'postDate')
						if (res.code == 1) {
							console.log(res.data, '价格')
							let {
								good_id,
								number,
								good_type,
								spec_name
							} = this.orderData.good_snap[0]
							let data1 = {
								good_id: good_id,
								number: number,
								spec: JSON.stringify(res.data[0].this),
								spec_id: _this.specId ? this.specId : 1,
								good_type: good_type,
								// craft_id: '',
								// coupon_id: '',
								address_id: this.topindex != 0 ? this.addressId : 0,
								receipt_type: this.topindex == 0 ? 2 : 1
								// design_file: '',
								// sample_file: '',
								// spec_name: spec_name,
								// type: 1,
								// receipt_type: this.topindex == 0 ? 2 : 1,
								// decs: _this.desc,
							}
							_this.$u.post(this.api.buyAddorder, data1).then(ress => {
								if (ress.code == 0) {
									uni.showToast({
										title: "支付失败",
										icon: 'none'
									})
								} else {
									console.log(ress.data.order_id[0], )
									this.order_id = ress.data.order_id[0]
									uni.setStorageSync('order_id', this.order_id)
								}
								//余额支付
								if (this.payList == 1) {
									this.show = true
								} else {
									//微信支付
									this.$u.post('order/payOrder', {
										order_id: uni.getStorageSync('order_id'),
										pay_method: 2,
										pay_type: 1,
										port: 'jspay',
									}).then(res => {
										this.weChactPay = res.data
										console.log(res.data, '123')
										if (res.code == 1) {
											WeixinJSBridge.invoke('getBrandWCPayRequest', {
												appId: res.data.appId,
												timeStamp: res.data.timeStamp,
												nonceStr: res.data.nonceStr,
												package: res.data.package,
												signType: res.data.signType,
												paySign: res.data.paySign,
												success: () => {
													// 支付成功后
													console.log('支付成功后');
													uni.navigateTo({
														url: 'pages/order/the_order/index?index=2'
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
										} else {
											uni.showToast({
												title: res.msg,
												icon: 'none'
											})
										}
									})
								}
							})
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none',
								duration: 3000
							})
						}
					})
				}

			},
			// onBridgeReady(res){
			// 	console.log(res,'res')
			// 	WeixinJSBridge.invoke(
			// 	     'getBrandWCPayRequest', {
			// 	        "appId":res.data.appId,     //公众号ID，由商户传入     
			// 	        "timeStamp":res.data.timeStamp,         //时间戳，自1970年以来的秒数     
			// 	        "nonceStr":res.data.nonceStr, //随机串     
			// 	        "package":res.data.package,     
			// 	        "signType":res.data.signType,         //微信签名方式：     
			// 	        "paySign":res.data.paySign //微信签名 
			// 	     },
			// 	     function(res){
			// 	     if(res.err_msg == "get_brand_wcpay_request:ok" ){
			// 		  console.log('支付成功')
			// 	     // 使用以上方式判断前端返回,微信团队郑重提示：
			// 	           //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
			// 	     }else {
			// 		  console.log('支付失败')
			// 	    } 
			// 	}); 
			// 	if (typeof WeixinJSBridge == "undefined"){
			// 	   if( document.addEventListener ){
			// 	       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
			// 	   }else if (document.attachEvent){
			// 	       document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
			// 	       document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
			// 	   }
			// 	}else{
			// 	   onBridgeReady();
			// 	}
			// },
			payOrder() {
				console.log(this.pwd, this.payid)
				this.$u.post(this.api.payOrder, {
						order_id: this.payid,
						pay_method: 1,
						pay_type: 1,
						pwd: this.pwd
					})
					.then(res => {
						if (res.code == 0) {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						} else {
							uni.navigateBack({
								delta: 1,
							})
							uni.showToast({
								title: '付款成功',
								icon: 'none'
							})
						}
					})
			}
		}
	}
</script>

<style lang="less">
	.advance {
		.top_css {
			display: flex;
			padding: 20rpx 40rpx;

			&>view {
				width: 33.3%;
				display: flex;
				justify-content: center;
				font-size: 28rpx;
				color: #999999;
				background-color: #F7F7F7;
				border-radius: 50rpx;
				line-height: 64rpx;
				height: 64rpx;
			}

			.topave {
				position: relative;
				background-color: #F79C22;
				color: #FFFFFF;
			}

			.topave::after {
				content: '';
				position: absolute;
				width: 16rpx;
				height: 16rpx;
				background-color: #F79C22;
				bottom: -6rpx;
				transform: rotate(40deg);
			}
		}

		.advance_address {
			// border-bottom: 4rpx dashed;
			position: relative;
			padding: 6rpx 38rpx 34rpx 46rpx;

			&::before {
				content: '';
				position: absolute;
				right: 0;
				bottom: 0;
				left: 0;
				height: 6rpx;
				background: repeating-linear-gradient(-90deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 46%, transparent 0, transparent 50%); //最重要是这行
				background-size: 160rpx;

			}

			.name_phone {
				font-size: 26rpx;
				color: #333333;
				font-weight: 700;

				text {
					padding-right: 16rpx;
				}
			}

			.city {
				display: flex;
				justify-content: space-between;
				padding-top: 14rpx;

				&>view:nth-child(1) {

					display: flex;

					&>text:nth-child(1) {
						height: 35rpx;
						line-height: 28rpx;
						white-space: nowrap;
						color: #FF0000;
						border: 2rpx solid #FF0000;
						border-radius: 6rpx;
						font-size: 18rpx;
						padding: 4rpx;
						margin-right: 10rpx;
					}
				}

				&>view:nth-child(2) {
					padding: 0 10rpx;
					font-size: 26rpx;
					color: #666666;
					line-height: 36rpx;
				}
			}
		}

		.advance_goods {
			.exc_box_top {
				display: flex;
				align-items: center;
				border-bottom: 2rpx solid #EFEFEF;
				padding: 24rpx 54rpx;

				.excBoxTop_right {
					display: flex;
					width: 100%;

					.image {
						width: 194rpx;
						height: 180rpx;
					}

					.text {
						width: 74%;
						padding-left: 25rpx;
						display: flex;
						flex-wrap: wrap;
						align-content: space-between;

						&>view {
							width: 100%;
						}

						&>view:nth-child(2) {
							display: flex;
							justify-content: flex-end;
						}

						.titlee {
							color: #999999;
							font-size: 24rpx;
						}
					}
				}
			}
		}

		.meyte {
			.meyte_cemt {
				padding: 10rpx 54rpx;

				view {
					text-align: right;

					text:nth-child(1) {
						font-size: 24rpx;
						color: #585858;
					}

					text:nth-child(2) {
						font-size: 32rpx;
						color: #FF3000;
					}
				}
			}
		}

		.bottom {
			padding: 10rpx 54rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.left {
				color: #666666;

				text:nth-child(1) {
					font-size: 28rpx;
				}

				text:nth-child(2) {
					font-size: 38rpx;
				}
			}

			.right {
				width: 190rpx;
				height: 62rpx;
				background: #fe8109;
				border-radius: 30rpx;
				color: #FFFFFF;
				line-height: 62rpx;
				font-weight: 700;
				text-align: center;
			}
		}
	}

	.bz {
		display: flex;
		color: #909399;
		margin-left: 55rpx;

		.ipt {
			margin: -18rpx 0 30rpx 60rpx;
		}

	}

	.pswPop {
		width: 360rpx;
		text-align: center;

		.pswPop-item {
			margin-top: 60rpx;

			view:nth-child(1) {
				font-size: 36rpx;
				font-weight: bold;
				margin-top: 20rpx;
			}

			view:nth-child(2) {
				font-size: 35rpx;
				margin: 20rpx 0;

			}

			view:nth-child(3) {
				font-size: 35rpx;
				margin: 20rpx 5rpx 20rpx 0;

				text:nth-child(1) {
					font-size: 30rpx;
				}

				text:nth-child(2) {
					font-size: 50rpx;
					font-weight: bold;
				}
			}

			view:nth-child(4) {
				width: 90%;
				height: 60rpx;
				padding: 0 30rpx;
				margin-left: 20rpx;
				display: flex;
				justify-content: space-around;
				border-bottom: 1px solid #eee;
			}

			view:nth-child(5) {
				margin-top: 20rpx;
			}
		}
	}

	.selfadd {
		padding: 0 20rpx;

		>text {
			font-size: 35rpx;
			margin-top: 20rpx;
		}

		>view {
			display: flex;
			justify-content: space-between;
			margin: 20rpx 0;

			&::after {
				content: '';
				display: inline-block;
				width: 20rpx;
				height: 20rpx;
				border-top: 1px solid #000;
				border-right: 1px solid #000;
				transform: rotate(45deg);
				margin-top: 8rpx;
			}
		}
	}
</style>
<style>
	.advance_goods /deep/ .u-cell {
		padding: 10rpx 54rpx;
	}

	.meyte /deep/ .u-cell {
		padding: 10rpx 54rpx;
	}

	.way /deep/ .u-cell {
		padding: 10rpx 54rpx;
	}

	.way /deep/ .u-radio__label {
		display: none;
	}

	.u-mode-center-box[data-v-17becaea] {
		min-width: 80% !important;
		min-height: 42%;
		border-radius: 15rpx;
	}

	.u-char-flex[data-v-0e1e7f9a] {
		margin-top: 60rpx !important;
	}

	/deep/.uni-scroll-view {
		height: 280px !important;
	}

	.uni-scroll-view {
		height: 300px !important;
	}
</style>

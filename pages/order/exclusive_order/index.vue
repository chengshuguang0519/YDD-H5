<template>
	<view class="advance">
		<view class="advance_address">
			<view class="name_phone"><text>{{address.name}}</text><text>{{address.phone}}</text></view>
			<view class="city">
				<view><text>默认</text></view>
				<view class="">
					<view>{{address.province}}{{address.city}}{{address.area}}{{address.address}}</view>
					<view @click="changeAddress">
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<u-gap height="14" bg-color="#EEEEEE"></u-gap>
		<block v-for="(i,index) in objdata.good_snap" :key="index">
			<view class="advance_goods">
				<view class="exc_box_top">
					<view class="excBoxTop_right">
						<view class="image">
							<image :src="i.cover_image" mode=""></image>
						</view>
						<view class="text">
							<view>
								<view>{{i.title}}</view>
								<!-- <view>双铜纸48P过膜</view> -->
							</view>
							<view>
								<u-number-box v-model="i.num" @change="valChange" @minus='getMin(i.id,index)'
									@plus='getMax(i.id,index)' disabled></u-number-box>
							</view>
						</view>
					</view>
				</view>
				<u-cell-item title="配送方式" value="普通快递" :border-bottom="false" :arrow="false"></u-cell-item>
				<!-- 	<u-cell-item title="印刷文件" value="大象企采纸杯.cdr" :border-bottom="false" :arrow="false"></u-cell-item>
				<u-cell-item title="个人设置" value="选填" :border-bottom="false" :arrow="false"></u-cell-item> -->
			</view>
			<u-gap height="14" bg-color="#EEEEEE"></u-gap>
			<view class="meyte">
				<u-cell-item title="商品金额" :value="'￥'+i.good_price" :border-bottom="false" :arrow="false"></u-cell-item>
				<!-- <u-cell-item title="运费（重量:0.4kg)" value="+￥0" :border-bottom="false" :arrow="false"></u-cell-item> -->
				<!-- <u-cell-item title="优惠券" value="ー￥100" :border-bottom="false" :arrow="false"></u-cell-item> -->
				<view class="meyte_cemt">
					<view><text>总计 :</text><text>¥{{i.good_price}}</text></view>
				</view>
			</view>
			<u-gap height="14" bg-color="#EEEEEE"></u-gap>
		</block>

		<view class="way">
			<u-radio-group v-model="value" @change="radioGroupChange" style="width: 100%;" active-color="#F69B21">
				<u-cell-item title="微信支付" name="0" :arrow="false">
					<u-icon slot="icon" size="40" name="weixin-circle-fill" color="#09BB06"></u-icon>
					<u-radio name="0"></u-radio>
				</u-cell-item>
				<u-cell-item title="余额支付" name="1" :arrow="false">
					<u-icon slot="icon" size="40" name="moments-circel-fill" color="#F79C22"></u-icon>
					<u-radio name="1"></u-radio>
				</u-cell-item>
			</u-radio-group>
		</view>

		<u-gap height="14" bg-color="#EEEEEE"></u-gap>

		<view class="" style="height: 100rpx;"></view>

		<view class="bottom">
			<view class="left">
				<text>总计: </text>
				<text>¥{{totalPrice}}</text>
			</view>
			<view class="right">
				<view @click="immediately"> 立即支付 </view>
			</view>
		</view>

		<view class="pswPop">
			<u-popup v-model="show" mode="center" closeable>
				<view class="pswPop-item">
					<view>请输入支付密码</view>
					<view>支付金额</view>
					<view><text>￥</text><text>{{totalPrice}}</text></view>
					<view>
						<text>钱包余额</text>
						<text>￥{{userNumber}}</text>
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
	export default {
		data() {
			return {
				value: 1,
				id: '',
				num: '',
				objdata: {},
				address: {},
				desc: '',
				type: '',
				address_id: '',
				onlist:[],
				params: [],
				show: false,
				pwd: '',
				userNumber: 0,
				totalPrice: 0
			}
		},
		onShow() {
			this.loadgetDefaultAddress()
		},
		onLoad(opent) {
			this.userNumber = uni.getStorageSync('userinfo').money
			this.address_id = opent.address_id;
			this.onlist = JSON.parse(opent.param)
			for (var i = 0; i < this.onlist.length; i++) {
				if (this.onlist[i].checked) {
					this.params.push({
						"good_id": this.onlist[i].id,
						"number": this.onlist[i].num,
						"spec_id": this.onlist[i].specs[0].id,
						"design_file": "",
						"sample_file": "",
						"checked": this.onlist[i].checked
					})
					this.params = this.getFilterList(this.params)
					console.log(this.params,this.onlist,'1111')
				} else {
					console.log(this.onlist[i], '111')
					const index = this.params.findIndex(v => {
						return v.good_id == this.onlist[i].id
					})
					console.log(index, 'index')
					if (index !== -1) {
						this.params.splice(index, 1)
					}
				}
			}
			console.log(this.params)
			this.loadgetDefaultAddress()
			this.onloadData();
			
		},
		computed: {
			totalPrice() {

			}
		},
		methods: {
			getFilterList(obj) {
				var uniques = [];
				var stringify = {};
				for (var i = 0; i < obj.length; i++) {
					var keys = Object.keys(obj[i]);
					keys.sort(function(a, b) {
						return (Number(a) - Number(b));
					});
					var str = '';
					for (var j = 0; j < keys.length; j++) {
						str += JSON.stringify(keys[j]);
						str += JSON.stringify(obj[i][keys[j]]);
					}
					if (!stringify.hasOwnProperty(str)) {
						uniques.push(obj[i]);
						stringify[str] = true;
					}
				}
				uniques = uniques;
				return uniques;
			},
			//获取支付密码
			finish(e) {
				console.log(e)
				this.pwd = e
				this.show = false
				this.payOrder()
			},
			payOrder(i) {
				console.log(this.pwd)
				
			},
			onloadData() {
				this.$u.post(this.api.exclusiveconfirm, {
					address_id: this.address_id,
					param: JSON.stringify(this.params)
				}).then(res => {
					console.log(res,'res')
					if (res.code == 1) {
						console.log(res.data, '00')
						this.objdata = res.data
						console.log(this.objdata, '111')
						this.totalPrice = this.objdata.good_snap.reduce((pre, v) => {
							return pre +  v.good_price
						}, 0)
					}
				})
			},
			loadgetDefaultAddress() {
				this.$u.get(this.api.getDefaultAddress).then(res => {
					if (res.code == 1) {
						this.address = res.data
						this.address_id = res.data.id
					}
				})
			},
			valChange(e) {
				this.num = e.value;
				this.onloadData();
			},
			radioGroupChange(e) {
				//0 微信支付  1余额支付
				this.value = e
				console.log(this.value)
			},
			immediately() {
				if(this.value == 1){
					this.show = true

					
				}else{
					console.log('123')
				}
				let data = {
					address_id: this.address_id,
					param: this.param,
					desc: ''
				}
				this.$u.post(this.api.exclusiveplace, data).then(res => {
					console.log(res);
					this.order_id = res.data.order_id
					if (this.value == 1) {
						this.show = true
						if(this.pwd !==''){
							this.$u.post(this.api.payOrder, {
									order_id: this.order_id.join(','),
									pay_method: 1,
									pay_type: 1,
									pwd: this.pwd
								})
								.then(res => {
									console.log(res, 1111)
									if (res.code == 0) {
										uni.showToast({
											title: res.msg,
											icon: 'none',
											duration:3000
										})
									} else {
										uni.showToast({
											title: '支付成功！',
											icon: 'none'
										})
										setTimeout(() => {
											uni.navigateBack({
												delta: 2
											})
										}, 2000)
									}
								})
						}
					}else{
						this.$u.post(this.api.payOrder, {
								order_id: this.order_id.join(','),
								pay_method: 2,
								pay_type: 1,
								pwd: this.pwd,
								port:'jspay'
							}).then(res =>{
								console.log(res)
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
												url: 'pages/'
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
				
				
				
				// if(this.type == 1){
				// 	let data={
				// 		good_id:this.objdata.id,
				// 		num:this.num,
				// 		total:this.objdata.total,
				// 		address_id:this.address.id,
				// 		coupon_id:this.objdata.coupon_id,
				// 		score:this.objdata.score,
				// 		desc:this.desc
				// 	}
				// 	uni.showModal({
				// 		content:'是否确定兑换?',
				// 		success: (res) => {
				// 			if(res.confirm){
				// 				this.$u.post(this.api.postConfirm,data).then(res=>{
				// 					if(res.code == 1){
				// 						uni.navigateTo({
				// 							url:'/pages/order/integral_order/index'
				// 						})
				// 					}else{
				// 						uni.showToast({
				// 							title:res.msg,
				// 							icon:'none'
				// 						})
				// 					}
				// 				})
				// 			}
				// 		}
				// 	})
				// }else{
				console.log("12222222222222222");
				// }
			},
			changeAddress() {
				uni.navigateTo({
					url: "/pages/Shipping_address/index",
				})

			},
			getMin(id, index) {
				this.objdata.forEach(v => {
					var that = this
					if (v.id == id) {
						if (v.specs[0].num != 0) {
							v.specs[0].num--
						} else {
							uni.showModal({
								title: '温馨提示',
								content: '您是否要删除该商品',
								success: function(res) {
									
									if (res.confirm) {
										that.$u.post('cart/delCart',{
											id:id
										}).then(res =>{
											console.log(res,'444')
										})
										// that.objdata.splice(index, 1)
										// uni.showToast({
										// 	title: '删除成功'
										// })
									} else if (res.cancel) {
										uni.showToast({
											title: '取消成功'
										})
									}
								}
							});
						}


					}
				})
			},
			getMax(id, index) {
				this.objdata.forEach(v => {
					var that = this
					if (v.id == id) {
						v.specs[0].num++
					}
				})
			},
		}
	}
</script>

<style lang="less">
	.advance {
		.advance_address {
			// border-bottom: 4rpx dashed;
			position: relative;
			padding: 38rpx 38rpx 20rpx 46rpx;

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
				padding-top: 14rpx;

				&>view:nth-child(1) {
					text {
						white-space: nowrap;
						color: #FF0000;
						border: 2rpx solid #FF0000;
						border-radius: 6rpx;
						font-size: 18rpx;
						padding: 0 4rpx;
					}
				}

				&>view:nth-child(2) {
					padding: 0 10rpx;
					font-size: 26rpx;
					color: #666666;
					line-height: 36rpx;
					width: 92%;
					display: flex;
					justify-content: space-between;
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
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			background: #fff;
			z-index: 99;
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

	/deep/.uni-scroll-view {
		height: 280px !important;
	}
</style>

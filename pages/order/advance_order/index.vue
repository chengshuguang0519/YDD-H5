<template>
	<view class="advance">
		<view class="advance_address" @click="changeAddress">
			<view class="name_phone"><text>{{address.name}}</text><text>{{address.phone}}</text></view>
			<view class="city">
				<view><text>默认</text></view>
				<view class="">
					<view>{{address.province}}{{address.city}}{{address.area}}{{address.address}}</view>
					<view @click='getAddress'>
						<u-icon name="arrow-right" ></u-icon>
					</view>
				</view>
			</view>
		</view>
		<u-gap height="14" bg-color="#EEEEEE"></u-gap>
		<view class="advance_goods">
			<view class="exc_box_top">
				<view class="excBoxTop_right">
					<view class="image">
						<image :src="objdata.cover_image" mode=""></image>
					</view>
					<view class="text">
						<view>
							<view>{{objdata.title}}</view>
							<!-- <view>双铜纸48P过膜</view> -->
						</view>
						<view>
							<u-number-box v-model="num" @change="valChange"></u-number-box>
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
			<u-cell-item title="商品金额" :value="'￥'+objdata.score" :border-bottom="false" :arrow="false"></u-cell-item>
			<u-cell-item title="运费（重量:0.4kg)" value="+￥0" :border-bottom="false" :arrow="false"></u-cell-item>
			<!-- <u-cell-item title="优惠券" value="ー￥100" :border-bottom="false" :arrow="false"></u-cell-item> -->
			<view class="meyte_cemt">
				<view><text>总计 :</text><text>¥{{objdata.total}}</text></view>
			</view>
		</view>
		<u-gap height="14" bg-color="#EEEEEE"></u-gap>
		<view class="way" v-if="type == 2">
			<u-radio-group v-model="value" @change="radioGroupChange" style="width: 100%;" active-color="#F69B21" >
				<u-cell-item title="微信支付" name="0" :arrow="false">
					<u-icon slot="icon" size="40" name="weixin-circle-fill" color="#09BB06"></u-icon>
					<u-radio name="0"></u-radio>
				</u-cell-item>
				<u-cell-item title="余额支付" name="1" :arrow="false" v-if="type != 2">
					<u-icon slot="icon" size="40" name="moments-circel-fill"  color="#F79C22"></u-icon>
					<u-radio name="1"></u-radio>
				</u-cell-item>
			</u-radio-group>
		</view>
		<u-gap height="14" bg-color="#EEEEEE"></u-gap>
		<view class="bottom">
			<view class="left">
				<text>总计 :</text>
				<text>¥{{objdata.total}}</text>
			</view>
			<view class="right">
				<view @click="immediately">立即支付</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: 0,
				id:'',
				num:'',
				objdata:{},
				address:{},
				desc:'',
				type:''
			}
		},
		onShow() {
			this.changeAddress()
		},
		onLoad(opent) {
			this.id = opent.id;
			this.num = opent.num;
			this.type = opent.type;
			this.onloadData();
			this.loadgetDefaultAddress()
		},
		methods: {
			onloadData(){
				if(this.type == 1){
					this.$u.get(this.api.getConfirm,{id:this.id,num:this.num}).then(res=>{
						console.log(res,'resss')
						if(res.code == 1){
							this.objdata = res.data;
						}
					})					
				}else {
					this.$u.get(this.api.DirectgetConfirm,{id:this.id,num:this.num}).then(res=>{
						if(res.code == 1){
							this.objdata = res.data;
						}
					})
				}
			},
			loadgetDefaultAddress(){
				this.$u.get(this.api.getDefaultAddress).then(res=>{
					if(res.code == 1){
						this.address = res.data
					}
				})
			},
			getAddress() {
				uni.navigateTo({
					url: "/pages/Shipping_address/index"
				})
			},
			changeAddress() {
				this.$u.get('user/getDefaultAddress').then(res => {
					console.log(res)
					if (res.code == 0) {
						this.showAddress = false
					} else {
						this.address= res.data
					}
					this.$forceUpdate()
				})
			},
			valChange(e) {
				this.num = e.value;
				this.onloadData();
			},
			radioGroupChange(e){
				this.value = e
			},
			immediately(){
				if(this.type == 1){
					let data={
						good_id:this.objdata.id,
						num:this.num,
						total:this.objdata.total,
						address_id:this.address.id,
						coupon_id:this.objdata.coupon_id,
						score:this.objdata.score,
						desc:this.desc
					}
					uni.showModal({
						content:'是否确定兑换?',
						success: (res) => {
							if(res.confirm){
								this.$u.post(this.api.postConfirm,data).then(res=>{
									if(res.code == 1){
										uni.navigateTo({
											url:'/pages/order/integral_order/index'
										})
									}else{
										uni.showToast({
											title:res.msg,
											icon:'none'
										})
									}
								})
							}
						}
					})
				}else{
					let data ={
						good_id:this.objdata.id,
						num:this.objdata.num,
						address_id:this.address.id,
						express_price:this.objdata.express_price,
						total:this.objdata.total,
						desc:this.desc,
						port:1
					}
					this.$u.post(this.api.DirectOrder,data).then(res=>{
						console.log(res,this.objdata,'res');
						if(res.code == 1){
							WeixinJSBridge.invoke('getBrandWCPayRequest',{
								appId: res.data.param.appId,
								timeStamp: res.data.param.timeStamp,
								nonceStr: res.data.param.nonceStr,
								package: res.data.param.package,
								signType: res.data.param.signType,
								paySign: res.data.param.paySign,
								success: () => {
									// 支付成功后
									console.log('支付成功后');
									uni.navigateTo({
										url:'pages/order/the_order/index?index=2'
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
							// let info = {
							// 	debug: false, // 调试，发布的时候改为false
							// 	appId: res.data.param.appId,
							// 	timeStamp: res.data.param.timeStamp,
							// 	nonceStr: res.data.param.nonceStr,
							// 	signature: res.data.param.paySign,
							// 	jsApiList: ['chooseWXPay']
							// }
							// jweixin.config(info);
							// jweixin.error(err=>{
							// 	console.log('config fail:', err);
							// })
							// jweixin.ready(()=>{
							// 	jweixin.chooseWXPay({
							// 		appId: res.data.param.appId,
							// 		timeStamp: res.data.param.timeStamp,
							// 		nonceStr: res.data.param.nonceStr,
							// 		package: res.data.param.package,
							// 		signType: res.data.param.signType,
							// 		paySign: res.data.param.paySign,
							// 		success: () => {
							// 			// 支付成功后
							// 			console.log('支付成功后');
							// 		},
							// 		fail: err => {
							// 			// 支付失败
							// 			console.log('支付失败');
							// 		},
							// 		cancel: err => {
							// 			// 支付取消
							// 			console.log('支付取消');
							// 		}
							// 	});
							// })
						}else{
							uni.showToast({
								title:res.msg,
								icon:'none'
							})
						}
					})
					
			
				}
			}
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
			.left{
				color: #666666;
				text:nth-child(1){
					font-size: 28rpx;
				}
				text:nth-child(2){
					font-size: 38rpx;
				}
			}
			.right{
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
	.way /deep/ .u-radio__label{
		display: none;
	}
</style>

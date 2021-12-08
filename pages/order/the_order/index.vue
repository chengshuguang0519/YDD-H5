<template>
	<view class="order">
		<u-tabs :list="list" :is-scroll="true" active-color="#FE8009" :current="current"  @change="change"></u-tabs>
		<view class="order_content">
			<view class="order_list" v-if="listData.length != 0">
				<view class="list">
					<view class="list_items" v-for="(i,index) in listData" :key="index" >
						<view class="list_item_type">
							{{i.status_text}}
						</view>
						<view class="list_item_content" @click="ondetails(i.id)">
							<view class="item_content_image">
								<image :src="i.good_snap.cover_image" mode=""></image>
							</view>
							<view class="item_content_con">
								<view class="one">
									<view>{{i.good_snap.title}}</view>
									<view><text>￥{{i.total_price}}</text></view>
								</view>
								<view class="oner">
									<text>{{i.good_snap.design_name}}</text>
									<text>X{{i.good_snap.num}}</text>
								</view>
								<view class="oners">
									<text>实付:￥{{i.total_price}}</text>
								</view>
							</view>
						</view>
						<view class="list_btn">
							<view v-if="i.status == 5 ">
								联系客服
							</view>
							<view v-if="i.status == 4  " @click="Clickonthe(2,i)">
								查看物流
							</view>
						<!--<view v-if="current != 6 && current != 5&&current != 9&current != 8&current != 1 &current != 2">
								提醒发货
							</view> -->
							<view v-if="i.status == 1" @click="pay(i.id)">
								立即付款
							</view>
						<!--<view v-if="current == 2">
								提醒审核
							</view> -->
							<view v-if="i.status == 5" @click="aftersales(i)">
								申请售后
							</view>
							<view v-if="i.status == 6">
								再次购买
							</view>
							<view v-if="i.status == 6" @click="Clickonthe(4,i)">
								立即评价
							</view>
							<view v-if="i.status == 5" @click="goPay(i.id)">
								确认收货
							</view>
							<view v-if="i.status == 1||current == 2 " @click="cancelOrder(i.id)">
								取消订单
							</view>
							<view v-if="i.status == 0" @click="deleteOrder(i.id)">
								删除订单
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="order_empty" v-else>
				<u-empty text="你暂时还没有相关订单~" src="/static/user/order_empty.png" icon-size="200"></u-empty>
			</view>
			<view class="Guess_you">
				<view class="text">
					你可能还喜欢
				</view>
				<view class="the_list">
					<view class="listr">
						<view class="list_item" v-for="(i,index) in listDatas" :key="index"
							@click="goGoodsdetails(i.id)" @longpress="longpress(i)">
							<view class="iten_image">
								<image :src="i.cover_image" mode=""></image>
							</view>
							<view class="item_text_content">
								<view>{{i.title}}</view>
								<view><text v-for="(r,index) in i.tags" :key="index">{{r}}</text></view>
								<view><text>￥{{i.price}}</text><!-- <text>/张</text> -->
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import the_list from '../../../components/the_list/index.vue'
	export default {
		data() {
			return {
				list: [{
					i: -1,
					name: '全部'
				}, {
					i: 1,
					name: '待付款'
				}, {
					i:3,
					name:'未分配'
				},{
					i: 2,
					name: '待审核'
				}, {
					i: 4,
					name: '生产中'
				}, {
					i: 7,
					name: '待发货'
				}
				, {
					i: 8,
					name: '售后完成'
				}, {
					i: 0,
					name: '已取消'
				},{
					i: 5,
					name: '待收货'
				}, {
					i: 6,
					name: '已完成'
				} ],
				current: 0,
				listData: [],
				listDatas: [],
				page: 1,
				pageSize: 10,
				next: true,
				orderId:'',

			}
		},
		components: {
			'thelist': the_list
		},
		onLoad(opent) {
			if (opent.index != '') {
				this.current = opent.index
				this.getList(this.list[opent.index].i)
			}
			this.orderId = uni.getStorageSync('order_id')
		},
		onReachBottom() {
			console.log(1)
		},
		methods: {
			getList(i) {
				this.listData = []
				this.$u.post(this.api.getlists, {
					type: i,
					page: this.page,
					pagesize: this.pageSize
				}).then(res => {
					if (res.code == 1) {
						console.log(res.data, '商品列表')
						if (res.data.length > 0) {
							this.next = true
						} else {
							this.next = false
						}
						if (this.page == 1) {
							this.listData = res.data.data
							this.listDatas = res.data.recommend
						} else {
							this.listData = this.listData.concat(res.data.data)
						}
					}
				})
			},
			pay(id){
				var thia = this;
				this.$u.post('order/payOrder', {
					order_id: id,
					pay_method: 2,
					pay_type: 1,
					port:'jspay'
				}).then(res => {
					this.weChactPay = res.data
					
					if(res.code == 1){
						WeixinJSBridge.invoke('getBrandWCPayRequest',{
							appId: res.data.appId,
							timeStamp: res.data.timeStamp,
							nonceStr: res.data.nonceStr,
							package: res.data.package,
							signType: res.data.signType,
							paySign: res.data.paySign,
							success: () => {
								// 支付成功后
								console.log('支付成功后');
								thia.getList(this.current)
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
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
					}
					// let info = {
					// 	debug: false, // 调试，发布的时候改为false
					// 	appId: res.data.appId,
					// 	timeStamp: res.data.timeStamp,
					// 	nonceStr: res.data.nonceStr,
					// 	signature: res.data.paySign,
					// 	jsApiList: ['chooseWXPay']
					// }
					// jweixin.config(info);
					// jweixin.error(err=>{
					// 	console.log('config fail:', err);
					// })
					// jweixin.ready(()=>{
					// 	jweixin.chooseWXPay({
					// 		appId: res.data.appId,
					// 		timeStamp: res.data.timeStamp,
					// 		nonceStr: res.data.nonceStr,
					// 		package: res.data.package,
					// 		signType: res.data.signType,
					// 		paySign: res.data.paySign,
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
				})
			},
			// tabs切换
			change(e) {
				console.log(e)
				this.current = e;
				this.page = 1
				this.getList(this.list[e].i)
			},
			//确认收货
			goPay(id){
				this.$u.post(this.api.orderPut,{
					id:id
				}).then(res =>{
						console.log(res)
						if(res.code = 1){
							this.getList(this.list[this.current].i)
						}else{
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})		
						}
				})
			},
			//取消订单
			cancelOrder(id){
				this.$u.post(this.api.orderCancel,{
					id:id
				}).then(res => {
					console.log(res)
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})	
					if(res.code == 1){
						this.getList(-1)
					}
				})
			},

			deleteOrder(id){
				console.log(id)
				console.log(this.current);
				this.$u.post(this.api.deleteOrder,{
					id:id
				}).then(res =>{
					console.log(res)
					if(res.code ==1){
						uni.showToast({
							title: '删除成功',
							icon: 'none'
						})		
						
						this.getList(this.list[this.current].i)
					}
				})
			},
			Clickonthe(index,event){
				if(index==2){
					uni.navigateTo({
						url:'/pages/logistics/index?sn='+event.order_no
					})
				}else if(index == 4){
					uni.navigateTo({
						url:'/pages/evaluation/index?id='+event.id
					})
				}
			},
			// 详情
			ondetails(id) {
				uni.navigateTo({
					url: `/pages/order/order_details/index?id=${id}`
				})
			},
			goGoodsdetails(id) {
				uni.navigateTo({
					url: `/pages/goods_details/selection/index?id=${id}`
				})
			},
			aftersales(event){
				console.log(event);
				uni.navigateTo({
					url:'/pages/user/after_sales/index?id='+event.id
				})
			}
		}
	}
</script>

<style lang="less">
	.order_content {
		background-color: #EFEFEF;
		height: calc(100vh - 88px);
		overflow: hidden;
		overflow-y: auto;

		.order_list {
			.list {
				padding: 32rpx 32rpx 0 32rpx;
				.list_items {
					background-color: #FFFFFF;
					margin-bottom: 20rpx;
					border-radius: 20rpx;
					padding: 26rpx;

					.list_item_type {
						text-align: right;
						color: #FE8009;
						font-size: 28rpx;
						font-weight: 500;
						padding-bottom: 20rpx;
					}

					.list_item_content {
						display: flex;

						.item_content_image {
							width: 164rpx;
							height: 164rpx;
						}

						.item_content_con {
							padding-left: 16rpx;
							width: 74%;

							.one {
								display: flex;
								justify-content: space-between;

								view:nth-child(1) {
									font-size: 32rpx;
									color: #333333;
									font-weight: 500;
									width: 72%;
								}

								view:nth-child(2) {
									text:nth-child(1) {
										font-size: 20rpx;
										color: #000000;
										font-weight: 500;
									}

									text:nth-child(2) {
										font-size: 30rpx;
										color: #000000;
										font-weight: 500;
									}
								}
							}

							.oner {
								display: flex;
								justify-content: space-between;
								padding-top: 12rpx;
								font-size: 28rpx;
								color: #999999;
								font-weight: 500;
							}

							.oners {
								color: #333333;
								font-size: 26rpx;
								font-weight: 500;
								text-align: right;
								padding-top: 76rpx;
							}
						}
					}

					.list_btn {
						display: flex;
						justify-content: flex-end;
						padding-top: 14rpx;

						view {
							border: 2rpx solid #595757;
							border-radius: 10rpx;
							color: #666666;
							margin-left: 14rpx;
							padding: 8rpx 10rpx;
						}

						view:last-child {
							border: 2rpx solid #FE8009;
							border-radius: 10rpx;
							color: #FE8009;
							margin-left: 14rpx;
							padding: 10rpx 20rpx;
						}
					}
				}
			}

			.Guess_you {
				padding: 32rpx;

				.text {
					color: #FF8109;
					font-size: 19px;
					font-weight: 700;
					text-align: center;
					padding-bottom: 32rpx;
				}
			}
		}

		.order_empty {
			min-height: 60vh;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	.the_list {
		.listr {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.list_item {
				width: 49%;
				height: 498rpx;
				background-color: #FFFFFF;
				margin-bottom: 20rpx;
				border-radius: 10rpx;
				overflow: hidden;

				.iten_image {
					height: 338rpx;
					width: 100%;
				}

				.item_text_content {
					padding: 22rpx 16rpx;

					view:nth-child(1) {
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
						font-size: 28rpx;
						color: #323333;
						font-weight: 700;
					}

					view:nth-child(2) {
						height: 48rpx;
						font-size: 24rpx;
						color: #999899;
						padding: 12rpx 0;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
						text {
							padding-right: 10rpx;
						}
					}

					view:nth-child(3) {
						text:nth-child(1) {
							font-size: 32rpx;
							color: #F73622;
							font-weight: 700;

						}

						text:nth-child(2) {
							font-size: 24rpx;
							color: #999899;
						}
					}
				}
			}
		}

	}

	.Guess_you {
		padding: 32rpx;
		
		.text {
			color: #FF8109;
			font-size: 19px;
			font-weight: 700;
			text-align: center;
			// margin-left: 50%;
			// transform: translate(-40%);
			padding-bottom: 32rpx;
		}
	}
</style>

<template>
	<view class="order">
		<u-tabs :list="list"  :is-scroll="true" active-color="#FE8009"  
		:current="current" @change="change"></u-tabs>
		<view class="order_content">
			<view class="order_list" v-if="listData.length != 0">
				<view class="list">
					<view class="list_items" v-for="(i,index) in listData" :key="index" >
						<view class="list_item_type">
							{{i.delivery_type_text}}
						</view>
						<view class="list_item_content" @click="ondetails(i.id)">
							<view class="item_content_image">
								<image :src="i.good_snap.cover_image" mode=""></image>
							</view>
							<view class="item_content_con">
								<view class="one">
									<view>{{i.good_snap.title}}</view>
									<view></view>
								</view>
								<view class="oner">
									<text>粉色</text>
									<text>X1</text>
								</view>
								<!-- <view class="oners">
									
								</view> -->
							</view>
						</view>
						<view class="list_btn">
							
						</view>
					</view>
				</view>


			</view>
			<view class="order_empty" v-else>
				<u-empty text="你暂时还没有相关订单~" src="/static/user/order_empty.png" icon-size="200"></u-empty>
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
					name: '全部'
				}, {
					name: '换货重印'
				}, {
					name: '退货退款'
				}, {
					name: '补货'
				},{
					name: '退款(不退货)'
				}],
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
			this.orderId = uni.getStorageSync('order_id')
			this.getList(0)
		},
		onReachBottom() {
			console.log(1)
		},
		methods: {
			getList(i) {
				this.listData = []
				this.$u.post(this.api.getRefundList, {
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
			// tabs切换
			change(e) {
				console.log(e)
				this.current = e;
				this.page = 1
				this.getList(this.current)
			},
			//确认收货
			goPay(id){
				this.$u.post(this.api.orderPut,{
					id:id
				}).then(res =>{
					console.log(res)
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})					
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
				})
			},
			// 详情
			ondetails(id) {
				uni.navigateTo({
					url:`/pages/user/arefund/arefund_details/index?id=${id}`
				})
			},
			goGoodsdetails(id) {
				uni.navigateTo({
					url: `/pages/goods_details/selection/index?id=${id}`
				})
			},
			
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
							padding: 10rpx 20rpx;
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
						font-size: 28rpx;
						color: #323333;
						font-weight: 700;
					}

					view:nth-child(2) {
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
			margin-left: 50%;
			transform: translate(-40%);
			padding-bottom: 32rpx;
		}
	}
</style>

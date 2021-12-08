<template>
	<view class="order">
		<u-tabs :list="list" gutter="50" :is-scroll="true" active-color="#FE8009" :current="current" @change="change">
		</u-tabs>
		<view class="order_content">
			<view class="order_list" v-if="objdata.length != 0">
				<view class="list">
					<view class="list_items" v-for="(i,index) in objdata" :key="index">
						<view class="list_item_type">
							待收货
						</view>
						<view class="list_item_content">
							<view class="item_content_image">
								<image :src="i.good_snap.cover_image" mode=""></image>
							</view>
							<view class="item_content_con">
								<view class="one">
									<view>{{i.good_snap.title}}</view>
									<view><text>积分</text><text>{{i.good_snap.score}}</text></view>
								</view>
								<view class="oner">
									<text>粉色</text>
									<text>X{{i.good_snap.num}}</text>
								</view>
								<view class="oners">
									<text>兑换积分: {{i.good_snap.total}}</text>
								</view>
							</view>
						</view>
						<view class="list_btn" v-if="i.status == 2">
							<view @click="confirm(i)">
								确认收货
							</view>
						</view>
					</view>
				</view>

				<!-- <view class="Guess_you">
					<view class="text">
						你可能还喜欢
					</view>
					<thelist></thelist>
				</view> -->
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
					name: '待发货'
				}, {
					name: '发货中'
				}, {
					name: '已完成'
				}],
				current: 0,
				objdata: []
			}
		},
		components: {
			'thelist': the_list
		},
		onLoad(opent) {
			this.onloadData()
		},
		methods: {
			onloadData() {
				this.$u.post(this.api.ScoreList, {
					status: this.current
				}).then(res => {
					console.log(res);
					if (res.code) {
						this.objdata = res.data
					} else {
						this.objdata = []
					}
				})
			},
			confirm(e) {
				console.log(e.id);
				uni.showModal({
					content: '确认收货？',
					success: (res) => {
						if (res.confirm) {
							this.$u.get(this.api.putConfirm, {
								id: e.id
							}).then(res => {
								console.log(res);
								if (res.code == 1) {
									this.onloadData()
								} else {
									uni.showToast({
										title: res.msg,
										icon: 'none'
									})
								}
							})
						}
					}
				})
			},
			// tabs切换
			change(e) {
				this.current = e;
				this.onloadData()
			}
		}
	}
</script>

<style lang="less">
	.order_content {
		background-color: #EFEFEF;
		height: calc(100vh - 100px);
		overflow: hidden;
		overflow-y: auto;

		.order_list {
			.list {
				padding: 32rpx 32rpx 0 32rpx;
				;

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
</style>

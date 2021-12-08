<template>
	<view class="shopping">
		<view class="shopping_search">
			<view class="icon">
				<u-icon name="arrow-left" size="40" @click="navBack"></u-icon>
			</view>
			<view class="left">
				<u-search placeholder="请输入搜索内容" v-model="keyword" :show-action="false" @search="search"></u-search>
			</view>
			<view class="right">
				<u-icon name="/static/icon/The_session.png" size="40"> </u-icon>
				<view class="right_text">
					<text>消息提示</text>
				</view>
				<u-badge v-if="msnum" type="error" :count="msnum" :offset='[20,40]'></u-badge>
			</view>
		</view>
		<view class="shoping_content">
			<view class="content_top">
				<view class="content_background"></view>
				<view class="content_conten">
					<view>
						<view>我的积分</view>
						<view>{{score}}</view>
					</view>
					<view>
						<view @click="integral(1)">积分明细</view>
						<view @click="integral(2)">积分订单</view>
					</view>
				</view>
			</view>

			<view class="content_list">
				<view class="list_title">
					<u-icon name="/static/icon/lefticon.png" size="40"></u-icon><text>兑换专区</text>
					<u-icon name="/static/icon/righticon.png" size="40"></u-icon>
				</view>
				<view class="list">
					<view class="list_item" v-for="(i,index) in list" :key="index" @click="navdateil(i)">
						<view class="item_n">
							<view class="item_n_image">
								<image :src="i.cover_image" mode=""></image>
							</view>
							<view class="item_n_brd">
								<view class="one">
									<text>{{i.title}}</text><text>{{i.sale}}人已兑换</text>
								</view>
								<view class="one_two">
									<view>
										<view>
											<text>积分:</text><text>{{saler(i.price)}}</text>
										</view>
										<view>
											￥{{saler(i.market_price)}}
										</view>
									</view>
									<view>
										<text>兑换</text>
									</view>
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
	export default {
		data() {
			return {
				keyword: '',
				list: [],
				score: '',
				msnum: ''
			}
		},
		onLoad() {
			this.loadData();
			this.score = uni.getStorageSync('userinfo').score;
		},
		onShow() {
			this.getmessagenum();
		},
		methods: {
			search(e){
				console.log(e);
				this.keyword = ''
				uni.navigateTo({
					url:'/pages/list/index?keyword='+e
				})
			},
			loadData() {
				let data = {
					size: '',
					keyword: '',
					type: 1
				}
				this.$u.post(this.api.getScore_Good, data).then(res => {
					if (res.code == 1) {
						this.list = res.data;
					}
				})
			},
			navdateil(e){
				console.log(e);
				uni.navigateTo({
					url:'/pages/goods_details/mall/index?id='+e.id
				})
			},
			integral(index) {
				if (index == 1) {
					uni.navigateTo({
						url: '/pages/user/integral/index'
					})
				} else {
					uni.navigateTo({
						url: '/pages/order/integral_order/index'
					})
				}
			},
			saler(e) {
				let moeny = Math.round(e)
				return moeny
			},
			getmessagenum() {
				let uid = uni.getStorageSync('userinfo').user_id
				this.$u.get(this.api.messagenum, {
					uid: uid
				}).then(res => {
					this.msnum = res.data
				})
			},
			navBack() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="less">
	.shopping {
		background-color: #EFEFEF;

		.shopping_search {
			display: flex;
			padding: 36rpx 36rpx 16rpx;
			background: #fff;
			align-items: center;

			.left {
				width: 84%;
			}

			.icon {
				padding-right: 20rpx;
			}

			.right {
				width: 16%;
				text-align: center;

				.right_text {
					font-size: 20rpx;
					color: #999999;
				}
			}
		}

		.shoping_content {
			height: calc(100vh - 70px);
			overflow: hidden;
			overflow-y: auto;

			.content_top {
				height: 334rpx;
				width: 100%;
				position: relative;
				overflow: hidden;

				.content_background {
					position: absolute;
					left: -20%;
					right: 20%;
					bottom: 0;
					height: 100%;
					width: 140%;
					display: -webkit-box;
					display: -webkit-flex;
					display: flex;
					background-color: #FF8109;
					border-radius: 502%;
				}

				.content_conten {
					height: 83%;
					background-color: #FF8109;
					position: relative;
					display: flex;
					justify-content: space-between;
					padding: 58rpx 0 0 58rpx;
					color: #EFEFEF;

					&>view:nth-child(1) view:nth-child(1) {
						font-size: 36rpx;
					}

					&>view:nth-child(1) view:nth-child(2) {
						font-size: 110rpx;
					}

					&>view:nth-child(2) view:nth-child(1) {
						width: 170rpx;
						height: 60rpx;
						opacity: 1;
						border: 4rpx solid #efefef;
						border-radius: 16rpx 0rpx 0rpx 16rpx;
						text-align: center;
						line-height: 60rpx;
						border-right: 0;
					}

					&>view:nth-child(2) view:nth-child(2) {
						width: 170rpx;
						height: 60rpx;
						opacity: 1;
						border: 4rpx solid #efefef;
						border-radius: 16rpx 0rpx 0rpx 16rpx;
						text-align: center;
						line-height: 60rpx;
						margin-top: 22rpx;
						border-right: 0;
					}
				}
			}

			.content_list {
				.list_title {
					display: flex;
					justify-content: center;
					color: #FF8109;
					font-size: 38rpx;
					font-weight: 700;
					padding-top: 30rpx;
				}

				.list {
					padding: 30rpx;
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;

					.list_item {
						background-color: #fff;
						width: 334rpx;
						height: 452rpx;
						padding: 9rpx;
						margin-bottom: 18rpx;
						border-radius: 30rpx;

						.item_n {
							padding: 14rpx;

							.item_n_image {
								width: 306rpx;
								height: 306rpx;
							}

							.item_n_brd {
								.one {
									display: flex;
									justify-content: space-between;
									padding-top: 12rpx;
									align-items: center;

									text:nth-child(1) {
										color: #333;
										font-size: 30rpx;
										font-weight: 500;
										width: 50%;
										white-space: nowrap;
										overflow: hidden;
										text-overflow: ellipsis;
									}

									text:nth-child(2) {
										color: #858585;
										font-size: 22rpx;
										font-weight: 500;
									}
								}

								.one_two {
									display: flex;
									justify-content: space-between;

									&>view:nth-child(1) view:nth-child(1) text:nth-child(1) {
										font-size: 24rpx;
										color: #3E3A39;
									}

									&>view:nth-child(1) view:nth-child(1) text:nth-child(2) {
										font-size: 36rpx;
										color: #FF8109;
									}

									&>view:nth-child(1) view:nth-child(2) {
										font-size: 22rpx;
										color: #858585;
										text-decoration-line: line-through;
									}

									&>view:nth-child(2) {
										display: flex;
										align-items: center;
									}

									&>view:nth-child(2) text {
										background: #FF8109;
										color: #fff;
										padding: 4rpx 20rpx;
										border-radius: 50rpx;
									}
								}
							}
						}
					}
				}
			}
		}
	}
</style>

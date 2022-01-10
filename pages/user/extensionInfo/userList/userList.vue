<template>
	<view class="userList">
		<view class="user-top" v-if="userList.length>0">
			<text>用户信息</text>
			<text>累计佣金</text>
			<text>注册时间</text>
		</view>
		<view class="user-item" v-for="(item,index) in userList" v-if="userList.length>0">
			<view>
				<image :src="item.headimg"></image>
				
				<view>
					<text>{{item.nickname}}</text>
					<text>{{item.phone}}</text>
				</view>
			</view>
			<text>￥{{item.total}}</text>
			<text>{{item.create_at.slice(0,10)}}</text>
		</view>
		<view class="noUser" v-if="userList.length<=0">暂无数据</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				pagesize: 12,
				userList: []
			}
		},
		onLoad() {
			this.getList()
		},
		onReachBottom() {
			this.page++
			this.getList()
			console.log('111')
		},
		methods: {
			getList() {
				this.$u.get('/user/getList', {
					page: this.page,
					pagesize: this.pagesize
				}).then(res => {
					if (res.data.length > 1) {
						console.log(res, 'num')
						this.userList = this.page == 1 ? res.data : this.userList.concat(res.data)
					} else {
						uni.showToast({
							title: '没有更多数据了~',
							icon: 'none'
						})
					}

				})
			},
		}
	}
</script>

<style lang="scss">
	.userList {
		padding-bottom: 10rpx;

		.user-top {
			width: 100%;
			display: flex;
			padding: 0 30rpx 10rpx;
			>text:nth-child(1){
				white-space: nowrap;
				margin-left: 100rpx;
			}
			>text:nth-child(2){
				white-space: nowrap;
				margin-left: 160rpx;
			}
			>text:nth-child(3){
				white-space: nowrap;
				margin-left: 80rpx;
			}
		}

		.user-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 120rpx;
			width: 100%;
			padding: 0 30rpx;
			border-bottom: 1px solid #999;

			>view:nth-child(1) {
				display: flex;
				>image:nth-child(1) {
					width: 90rpx;
					height: 90rpx;
					border-radius: 50%;
					margin-right: 20rpx;
				}

				>view:nth-child(2) {
					width: 230rpx;
					display: flex;
					flex-direction: column;

					text {
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}
			}

			>text:nth-child(3) {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				margin-left: 50rpx;
			}
		}

		.noUser {
			width: 100%;
			height: 300rpx;
			line-height: 300rpx;
			text-align: center;

		}
	}
</style>

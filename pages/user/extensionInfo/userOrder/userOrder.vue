<template>
	<view class="userOrder">
		<view class="order-top">
	
			<view class="order-item" v-for="(item,index) in userList" :key='index'>
				<view>
					<text>下单时间：{{item.create_time}}</text>
				</view>
				<view>
					<image :src="item.good_snap.cover_image"></image>
					<view>
						<text>昵称：{{item.user.nickname}}</text>
						<text>{{item.good_snap.title}}</text>
						<text>数量：{{item.good_snap.num}}</text>
						<text>{{item.good_snap.spec_name}}</text>
					</view>
					<view>
						<text>终端价：{{item.clinch_price}}</text>
						<text>成交价：{{item.total_price}}</text>
						<text>商城底价：{{item.produce_price}}</text>
						<text>运费：￥{{item.shipping}}</text>
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
				page: 1,
				pagesize: 10,
				userList:[]
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
				this.$u.get('order/getBranchOrder', {
					page: this.page,
					pagesize: this.pagesize
				}).then(res => {
					console.log(res,'user')
					if (res.data.data.length > 1) {
						console.log(res, 'num')
						this.userList = this.page == 1 ? res.data.data : this.userList.concat(res.data.data)
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

<style lang="less" scoped>
	page{
		background-color: #EFEFEF;
	}
	.userOrder{
		width: 100%;
		padding: 20rpx 0;
		.order-top{
			width: 100%;
			padding: 0 30rpx;
			.order-item{
				// align-items: center;
				width: 100%;
				// height: 300rpx;
				padding: 50rpx 20rpx;
				margin-bottom: 20rpx;
				border: 1px solid #e3e3e3;
				background-color: #FFF;
				border-radius: 15rpx;
				overflow: hidden;
				>view:nth-child(1){
				   margin-top: -35rpx;
				   margin-bottom: 25rpx;
				   font-size: 20rpx;
				}
				>view:nth-child(2){
					display: flex;
					>image:nth-child(1){
						width: 120rpx;
						height: 120rpx;
						margin-right: 20rpx;
					}
					>view:nth-child(2){
						width: 320rpx;
						display: flex;
						flex-direction: column;
						margin-right: 20rpx;
						>text:nth-child(2){
							font-size: 24rpx;
							
						}
						>text:nth-child(2){
							font-size: 10rpx;
							margin: 5rpx 0;
						}
						>text:nth-child(3){
							font-size: 10rpx;
							margin-bottom: 5rpx;
						}
						>text:nth-child(4){
							font-size: 10rpx;
						}
					}
					>view:nth-child(3){
						display: flex;
						flex-direction: column;
						font-size: 10rpx;
						text{
							white-space: nowrap;
						}
					}
				}

			}
		}
	}
</style>

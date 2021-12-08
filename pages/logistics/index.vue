<template>
	<view class="logistics">
		
		<view class="logistics_cell">
			<view>物流公司</view>
			<view>{{dataobj.express}}</view>
		</view>
		
		<view class="logistics_cell">
			<view>物流单号</view>
			<view><text style="padding-right: 20rpx;">{{dataobj.number}}</text><text class="copy" @click="copy(dataobj.number)">复制</text></view>
		</view>
		
		<u-gap height="20" bg-color="#F7F7F7"></u-gap>
		
		<view class="logistics_cellr">
			<view class="title">
				物流追踪
			</view>
			<view class="the_timeline">
				<view :class="index==0?'timelines':'timeline'" v-for="(i,index) in dataobj.data" :key="index">
					<view>{{i.context}}</view>
					<view>{{i.time}}</view>
				</view>
			</view>
		</view>

		<view class="logistics_bottom">
			<view class="bottom-tltle">
				你可能还喜欢
			</view>
			<thelist :list="dataobj.recommend"></thelist>
		</view>
	</view>

</template>

<script>
	import the_list from '../../components/the_list/index.vue'
	export default {

		data() {
			return {
				dataobj:{}
			}
		},
		components: {
			'thelist': the_list
		},
		onLoad(opent) {
			this.loadData(opent);
		},
		methods: {
			loadData(data){
				this.$u.post(this.api.seeExpress,{sn:'4067757818701181'}).then(res=>{
					if(res.code == 1){
						this.dataobj = res.data
					}
				})
			},
			copy(Orderno){
				uni.setClipboardData({
				    data: Orderno,
				    success: function () {
				      uni.showToast({
				      	title:'复制成功',
				      })
				    }
				});
			}
		}
	}
</script>

<style lang="less">
	.logistics_cell {
		display: flex;
		padding: 25rpx 32rpx;

		view:nth-child(1) {
			color: #999999;
			font-size: 28rpx;
			padding-right: 40rpx;
		}

		view:nth-child(2) {
			color: #323333;
			font-size: 28rpx;
		}
	}

	.logistics_cellr {
		padding: 25rpx 32rpx;
	}

	.title {
		color: #333333 !important;
		font-size: 30rpx !important;
		font-weight: 500;
	}

	.the_timeline {
		padding-top: 20rpx;

		.timeline {
			padding-left: 30rpx;
			position: relative;
			padding-bottom: 46rpx;

			view:nth-child(1) {
				font-size: 26rpx;
				color: #999999;
			}

			view:nth-child(2) {
				font-size: 22rpx;
				color: #999999;
			}
		}

		.timelines {
			padding-left: 30rpx;
			position: relative;
			padding-bottom: 46rpx;

			view:nth-child(1) {
				font-size: 26rpx;
				color: #FF8109;
			}

			view:nth-child(2) {
				font-size: 22rpx;
				color: #FF8109;
			}
		}

		.timeline::before {
			content: '';
			width: 22rpx;
			height: 22rpx;
			position: absolute;
			top: 9%;
			left: 0;
			border-radius: 50%;
			background-color: #999999;
		}

		.timelines::before {
			content: '';
			width: 22rpx;
			height: 22rpx;
			position: absolute;
			top: 9%;
			left: 0;
			border-radius: 50%;
			background-image: radial-gradient(#FF8109 60%, #FFBC7D 40%);
		}

		.timeline::after {
			content: '';
			width: 2rpx;
			height: 80%;
			position: absolute;
			background-color: #999999;
			left: 10rpx;
			top: 30rpx;

		}

		.timelines::after {
			content: '';
			width: 2rpx;
			height: 80%;
			position: absolute;
			background-color: #999999;
			left: 10rpx;
			top: 30rpx;

		}

		.timeline:last-child::after {
			content: '';
			width: 0 !important;
		}
	}

	.logistics_bottom {
		background-color: #EFEFEF;
		padding: 32rpx;

		.bottom-tltle {
			text-align: center;
			font-size: 32rpx;
			color: #FF8109;
			font-weight: 700;
			padding-bottom: 32rpx;
		}
	}

	.copy {
		background-color: #F9E6D5;
		border: 2rpx solid #FF8109;
		color: #FF8109;
		font-size: 24rpx;
		line-height: 24rpx;
		display: inline-flex;
		padding: 4rpx 8rpx;
		border-radius: 6rpx;
	}
</style>

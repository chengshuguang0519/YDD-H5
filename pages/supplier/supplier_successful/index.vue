<template>
	<view class="successful">
		<view class="successful_empty">
			<u-empty src="/static/successful.png" text=' '></u-empty>
		</view>
		<view class="text">
			<view>订单发货成功</view>
			<view>订单132546541651已发货成功</view>
		</view>
		<view class="bottom">
			<view class="btn">
				返回首页
			</view>
			<!-- <view class="btnr">
				查看订单详情
			</view> -->
		</view>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
	.successful_empty{
		padding-top: 20%;
		
	}
	.text{
		text-align: center;
		view:nth-child(1){
			font-size: 36rpx;
			color: #333333;
			font-weight: 700;
			padding-top: 70rpx;
		}
		view:nth-child(2){
			font-size: 28rpx;
			color: #999999;
			font-weight: 500;
			padding-top: 36rpx;
		}
	}
	.bottom{
		padding-top: 120rpx;
		padding-left: 32rpx;
		padding-right: 32rpx;
		.btn{
			background-color: #F79C22;
			color: #FFFFFF;
			border-radius: 44rpx;
			height: 88rpx;
			line-height: 88rpx;
			text-align: center;
			font-weight: 700;
		}
		.btnr{
			margin-top: 28rpx;
			// background-color: #F79C22;
			border: 4rpx solid #F79C22;
			color: #F79C22;
			border-radius: 44rpx;
			height: 88rpx;
			line-height: 88rpx;
			text-align: center;
			font-weight: 700;
		}
	}
</style>

<template>
	<view>
		<u-field label="订单号" placeholder="22021321651465146514" :border-bottom="false" disabled
			placeholder-style="color:#333333;font-weight: 500;font-size: 28rpx;">
		</u-field>
		<u-field label="商品名称" placeholder="宣传单张" :border-bottom="false" disabled
			placeholder-style="color:#333333;font-weight: 500;font-size: 28rpx;">
		</u-field>
		<u-field label="商品数量" placeholder="1000" :border-bottom="false" disabled
			placeholder-style="color:#333333;font-weight: 500;font-size: 28rpx;">
		</u-field>
		<u-field label="打包箱数" placeholder="10" :border-bottom="false" disabled>
		</u-field>
		<u-field label="备注" placeholder="送货上门，不发物流" :border-bottom="false" disabled>
		</u-field>
		<u-field label="图片" :border-bottom="false" disabled>
		</u-field>
		<view style="padding: 0 20rpx;">
			<u-upload :action="action" :file-list="fileList" max-count="1"></u-upload>
		</view>
		
		<view class="button">
			<u-button shape="circle" type="warning">确认发货</u-button>
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
	.button{
		padding: 20rpx;
		padding-top: 100rpx;
	}
</style>

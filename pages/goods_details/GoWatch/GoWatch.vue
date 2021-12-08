<template>
	<view class="goWatch">
		<icon type="info" size="66"></icon>
		<text>请在微信客户端打开</text>
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

<style lang="scss">
	.goWatch{
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		>icon:nth-child(1){
			margin: 60rpx 0;
		}
		>text:nth-child(2){
			font-size: 36rpx;
		}
	}
</style>

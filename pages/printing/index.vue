<template>
	<view class="printing">
		<view class="printing_right">
			<view class="image">
				<image src="/static/shang.png" mode="widthFix"></image>
			</view>
			<view class="printing_text">
				<view>如需上传文件，请登录大象企采商城电脑端</view>
				<view @click="phone">或联系客服<u-icon name="arrow-right" color="#FF8109" size="28"></u-icon></view>
			</view>
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
			phone(){
				let url ='https://admin.qidian.qq.com/template/blue/mp/menu/qr-code-jump.html?linkType=0&env=ol&kfuin=2355064841&fid=538&key=8f15177d105f759fe0d97f6ff0eee30a&cate=1&source=1&isLBS=0&isCustomEntry=0&type=16&ftype=1&_type=wpa&qidian=true'
				window.open(url)
			}
		}
	}
</script>

<style lang="less">
	.printing{
		height: 100vh;
		background-color: #EFEFEF;
		.printing_right{
			padding-top: 40%;
			.image{
				width: 40%;
				margin: 0 auto;
			}
			.printing_text{
				text-align: center;
				&>view:nth-child(1) {
					font-size: 30rpx;
					font-weight: 700;
					padding-top: 63rpx;
				}
				&>view:nth-child(2) {
					font-size: 30rpx;
					font-weight: 700;
					padding-top: 17rpx;
					color: #FF8109;
				}
			}
		}
	}
</style>

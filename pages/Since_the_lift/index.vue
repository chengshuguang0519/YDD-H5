<template>
	<view class="address">
		<view class="address_list" v-if="true">
			<u-radio-group v-model="value" style="width: 100%;">
				<view class="list_item" v-for="(i,index) in 6" :key="index">
					<view class="item">
						<view class="item_top">
							<view class="item_top_left">
								<u-radio active-color="#FE8109"></u-radio>
							</view>
							<view class="item_top_content">
								<view class="">
									<text>大象企采</text><text>123456789</text>
								</view>
								<view class="">
									<text>广东省广州市白云区鹤龙街道黄边南
										路40号龙创云麓2号楼102大象企采</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</u-radio-group>
		</view>
		<view class="address_empty" >
			<view class="buttom">
				<view class="btn" @click="onaddress">
					确定
				</view>
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
			onaddress() {
				uni.navigateTo({
					url: "address/index"
				})
			}
		}
	}
</script>

<style lang="less">
	.address {
		height: calc(100vh - 50px);
		background-color: #EFEFEF;
		overflow: hidden;
		overflow-y: auto;
		.tab{
			border: 2rpx solid #FE8109;
			color: #FE8109;
			font-weight: 500;
			font-size: 20rpx;
			padding: 4rpx;
			display: inline-block;
			line-height: 20rpx;
		}
		.address_list {
			// padding: 30rpx;
			padding-bottom: 140rpx;
			.list_item {
				padding-bottom: 30rpx;
				width: 100%;

				.item {
					background-color: #FFFFFF;
					padding: 36rpx 36rpx 0 36rpx;
					border-radius: 10rpx;

					.item_bottom {
						display: flex;
						justify-content: space-around;
						font-weight: 500;
						font-size: 26rpx;
						color: #666666;
						padding: 20rpx 0 28rpx 0;
						border-top: 1rpx solid #BFBFBF;
					}
					.item_top{
						display: flex;
						align-items: center;
						padding-bottom: 22rpx;
						.item_top_right{
							padding-left: 10rpx;
							color: #FE8109;
							font-size: 24rpx;
						}
						.item_top_content{
							view:nth-child(1){
								color: #333333;
								font-size: 32rpx;
								font-weight: 700;
								text:nth-child(2){
									padding-left: 30rpx;
								}
							}
							view:nth-child(2){
								color: #666666;
								font-weight: 400;
								line-height: 40rpx;
								font-size: 28rpx;
								padding-top: 22rpx;
								text:nth-child(2){
									padding-left: 10rpx;
								}
							}
						}
					}
				}
			}
		}

		.address_empty {
			// padding-top: 30%;

			.buttom {
				// padding-top: 150rpx;
				position: fixed;
				bottom: 0;
				left: 0;
				right: 0;
				padding: 20rpx 32rpx;
				background-color: #FFFFFF;
				.btn {
					width: 100%;
					height: 74rpx;
					background-color: #FE8109;
					border-radius: 36rpx;
					text-align: center;
					line-height: 74rpx;
					color: #FFFFFF;
					font-weight: 700;
					font-size: 36rpx;
					margin: 0 auto;
				}
			}
		}
	}
</style>

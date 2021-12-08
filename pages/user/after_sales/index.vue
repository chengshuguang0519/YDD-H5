<template>
	<view class="after_sales">
		<view class="order_carid_s">
			<view class="order_carid">
				<view class="titel">商品</view>
				<view class="carid_car">
					<view>
						<image :src="obj.good_snap.cover_image" mode=""></image>
					</view>
					<view>
						<view><text>{{obj.good_snap.title}}</text><text>￥{{obj.total_price}}</text></view>
						<view><text>{{obj.good_snap.spec_name}}</text><text>x{{obj.good_snap.num}}</text></view>
					</view>
				</view>
			</view>
		</view>
		<view class="after_s">
			<view class="after_s_r">
				<view class="titel">服务类型</view>
				<u-cell-item title="我要退款(无需退货)" :title-style="{'padding-left':'20rpx'}" :label-style="{'margin':'0'}"
					label="没收到货，或与客服协商同意不用退货只退款" index="1" @click="oncell">
					<u-icon slot="icon" size="38" name="/static/icon/q.png"></u-icon>
				</u-cell-item>
				<u-cell-item title="我要退货退款" :title-style="{'padding-left':'20rpx'}" :label-style="{'margin':'0'}"
					label="已收到货，需要退还收到的货物" index="2" @click="oncell">
					<u-icon slot="icon" size="38" name="/static/icon/t.png"></u-icon>
				</u-cell-item>
				<u-cell-item title="我要换货" :title-style="{'padding-left':'20rpx'}" :label-style="{'margin':'0'}"
					label="已收到货，需要更换已收到的货物" index="3" @click="oncell">
					<u-icon slot="icon" size="38" name="/static/icon/h.png"></u-icon>
				</u-cell-item>
				<u-cell-item title="我要补货" :title-style="{'padding-left':'20rpx'}" :label-style="{'margin':'0'}"
					label="货物缺少，需要补齐相对应的货物" index="4" @click="oncell">
					<u-icon slot="icon" size="38" name="/static/icon/b.png"></u-icon>
				</u-cell-item>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				obj:{}
			}
		},
		onLoad(opent) {
			this.loadData(opent)
		},
		methods: {
			loadData(opent){
				this.$u.post(this.api.getOrderDetail,{id:opent.id}).then(res=>{
					if(res.code == 1){
						this.obj = res.data
					}
				})
			},
			//  1我要退款 2我要退货退款 3我要换货 4我要补货
			oncell(e){
				console.log(e);
				if(e == 1){
					uni.navigateTo({
						url:'/pages/toapplyfor/arefund/index?id='+this.obj.id
					})
				}else if(e == 2){
					uni.navigateTo({
						url:'/pages/toapplyfor/exchange/index?id='+this.obj.id
					})
				}else if(e == 3){
					uni.navigateTo({
						url:'/pages/toapplyfor/replenishment/index?id='+this.obj.id
					})
				}else if(e == 4){
					uni.navigateTo({
						url:'/pages/toapplyfor/sales_return/index?id='+this.obj.id
					})
				}
			}
		}
	}
</script>

<style lang="less">
	.after_sales {
		height: calc(100vh - 50px);
		background-color: #ECE9E9;

		.order_carid_s {
			padding: 20rpx 26rpx;

			.order_carid {
				padding: 24rpx;
				background-color: #FFFFFF;
				border-radius: 16rpx;

				.titel {
					font-size: 32rpx;
					color: #333333;
					font-weight: 700;
					padding-bottom: 18rpx;
				}

				.carid_car {

					display: flex;

					&>view:nth-child(1) {
						width: 202rpx;
						height: 202rpx;
					}

					&>view:nth-child(2) {
						width: 69%;
						padding-left: 26rpx;

						view {
							display: flex;
							justify-content: space-between;
						}

						view:nth-child(1) {
							font-size: 30rpx;
							color: #333333;
							font-weight: 700;
						}

						view:nth-child(2) {
							font-size: 26rpx;
							color: #666666;
							font-weight: 500;
							padding-top: 28rpx;
						}

						view:nth-child(3) {
							padding-top: 70rpx;

							text:nth-child(1) {
								font-size: 32rpx;
								color: #333333;
								font-weight: 500;
							}

							text:nth-child(2) {
								font-size: 32rpx;
								color: #666666;
								font-weight: 500;
							}
						}
					}
				}

				.carid_bottom {
					display: flex;
					justify-content: flex-end;

					view {
						margin-left: 10rpx;
						border: 2rpx solid #333333;
						border-radius: 26rpx;
						padding: 6rpx 30rpx;
					}
				}
			}
		}

		.after_s {
			padding: 20rpx 26rpx;

			.after_s_r {
				background-color: #FFFFFF;
				border-radius: 16rpx;
				padding: 18rpx 0;

				.titel {
					font-size: 32rpx;
					color: #333333;
					font-weight: 700;
					padding: 18rpx 26rpx;
				}
			}
		}
	}

	.u-cell {
		padding-top: 10rpx;
		padding-bottom: 10rpx;
	}
</style>

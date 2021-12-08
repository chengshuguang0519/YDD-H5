<template>
	<view class="order_details">
		<view class="order_top">
			<view class="order_top_conten">
				<view  >
					<view style="margin-bottom: 20rpx;">{{dataList.status_text}}</view>
					<view  v-if="showTime > 0">还剩
					<u-count-down style="margin: 10rpx;" :timestamp="showTime" separator='zh' separator-color='#fff' @end="CountTime(dataList.id)"></u-count-down>自动取消订单</view>
				</view>
				<view >
					<image src="/static/icon/order.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="order_address">
			<view>
				<u-icon name="map" size="50"></u-icon>
			</view>
			<view>
				<view class="additem">
					<text>{{address.name}}</text><text >{{address.phone}}</text>
				</view>
				<view>
					{{address.full_address}}
				</view>
			</view>
		</view>
		
		<view class="order_carid_b">
			<view class="order_carid">
				<view class="carid_car">
					<view>
						<image :src="goodsList.cover_image" mode=""></image>
					</view>
					<view>
						<view><text>{{goodsList.title}}</text></view>
						<view><text>{{goodsList.spec_name}}</text></view>
						<view><text>￥{{dataList.good_price}}</text><text>x{{goodsList.num}}</text></view>
					</view>
				</view>
				<view class="carid_bottom">
					<view>
						联系客服
					</view>
				</view>
			</view>
			
			<view class="order_list">
				<view><text>运费</text><text>￥{{dataList.shipping}}</text></view>
				<view><text>商品总价</text><text>￥{{dataList.good_price}}</text></view>
				<view><text>优惠券</text><text>￥{{dataList.coupon_price}}</text></view>
				<view><text>实付款</text><text>￥{{dataList.total_price}}</text></view>
			</view>
			<u-gap height="10" bg-color="#EAE7E7"></u-gap>
		</view>
		
		<view class="order_sb">
			<view><text>订单编号：</text><text>{{dataList.order_no}}</text></view>
			<view><text>下单时间：</text><text>{{dataList.create_time}}</text></view>
			<view><text>配送方式：</text><text>{{dataList.delivery_type ==1?'快递':'自提'}}</text></view>
			<view v-if="dataList.status!=1">
				<text>支付方式：</text>
				<text>{{dataList.payment_method}}</text>
			  </view>
			<view v-if="false"><text>赠送积分：</text><text>398</text></view>
			<view><text >备注：{{dataList.desc=='' ? '暂无备注':dataList.desc}}</text></view>
		</view>
		
		<!-- <view class="Guess_you">
			<view class="text">
				你可能还喜欢
			</view>
			<thelist></thelist>
		</view> -->
	</view>
</template>

<script>
	import the_list from '../../../components/the_list/index.vue'
	export default {
		data() {
			return {
				orderId:'',
				address:{},
				goodsList:[],
				dataList:{},
				showDay:true,
				showTime:0
			}
		},
		components: {
			'thelist': the_list
		},
		computed:{
			showTime(){
				console.log(this.dataList.paytime)
				var date = new Date().getTime()
				var date2 = new Date(this.dataList.paytime).getTime()
				this.showTime  = (date2- date)/1000
				return this.showTime
			}
			// totalPrice(){
			// 	return this.goodsList.num * this.goodsList.good_price
			// }
		},
		onLoad(opent){
			this.orderId = uni.getStorageSync('order_id');
			this.getOrderList(opent)
			this.getShow()
		},
		methods: {
			getShow(){
				if(this.dataList.status_text =='已取消'){
					this.showTime < 0
				}
			},
			getOrderList(opent){
				this.$u.post(this.api.getOrderDetail,{
					id:opent.id
				}).then(res=>{
					console.log(res.data,'data')
					this.dataList = res.data
					this.address = res.data.address_info
					this.goodsList = res.data.good_snap
				})
			},
			CountTime(id){
				this.showDay = false
					this.$u.post(this.api.orderCancel,{
						id:id
					}).then(res => {
						console.log(res)
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})		
					})	
			},
			getTime(){
				this.$u.post()
			}
		}
	}
</script>

<style lang="less">
	.order_details{
		height: calc(100vh - 50px);
		overflow: hidden;
		overflow-y: auto;
	}
	.order_top{
		height: 250rpx;
		background-color: #FF8109;
		.order_top_conten{
			display: flex;
			justify-content: space-between;
			padding: 20rpx 48rpx;
			align-items: center;
			&>view:nth-child(1){
				color: #FFFFFF;
				padding-left: 55rpx;
				view:nth-child(1){
					font-size: 40rpx;
					font-weight: 500;
				}
				view:nth-child(2){
					font-size: 25rpx;
					font-weight: 500;
					padding-top: 6rpx;
				}
			}
			&>view:nth-child(2){
				width: 150rpx;
				height: 150rpx;
			}
		}
	}
	
	.order_address{
		background-color: #FFFFFF;
		width: 86%;
		height: 172rpx;
		box-shadow: 0px 8px 13px 0px rgba(42,42,42,0.26); 
		border-radius: 20rpx;
		margin: 0 auto;
		margin-top: -55rpx;
		padding: 38rpx;
		display: flex;
		align-items: center;
		&>view:nth-child(2){
			font-size: 26rpx;
			color: #333333;
			font-weight: 500;
			&>view:nth-child(1){
				padding-bottom: 10rpx;
			}
		}
	}
	.order_carid{
		padding: 24rpx;
		.carid_car{
			padding: 250rpx;
			padding: 20rpx 26rpx;
			display: flex;
			&>view:nth-child(1){
				width: 202rpx;
				height: 202rpx;
			}
			&>view:nth-child(2){
				width: 69%;
				padding-left: 26rpx;
				view{
					display: flex;
					justify-content: space-between;
				}
				view:nth-child(1){
					font-size: 30rpx;
					color: #333333;
					font-weight: 700;
				}
				view:nth-child(2){
					font-size: 26rpx;
					color: #666666;
					font-weight: 500;
					padding-top: 28rpx;
				}
				view:nth-child(3){
					padding-top: 70rpx;
					text:nth-child(1){
						font-size: 32rpx;
						color: #333333;
						font-weight: 500;
					}
					text:nth-child(2){
						font-size: 32rpx;
						color: #666666;
						font-weight: 500;
					}
				}
			}
		}
		.carid_bottom{
			display: flex;
			justify-content: flex-end;
			view{
				margin-left: 10rpx;
				border: 2rpx solid #333333;
				border-radius: 26rpx;
				padding: 6rpx 30rpx;
			}
		}
	}
	.order_list{
		padding: 10rpx 58rpx 30rpx 58rpx;
		view{
			display: flex;
			justify-content: space-between;
			font-size: 26rpx;
			padding-top: 14rpx;
		}
	}
	.order_sb{
		padding: 30rpx 58rpx 30rpx 58rpx;
		view{
			font-size: 26rpx;
			padding-top: 14rpx;
		}
	}
	.Guess_you{
		padding: 32rpx;
		background-color: #ECE9E9;
		.text{
			color: #FF8109;
			font-size: 19px;
			font-weight: 700;
			text-align: center;
			padding-bottom: 32rpx;
		}
	}
	.additem{
		display: flex;
		justify-content: space-between;
	}
</style>

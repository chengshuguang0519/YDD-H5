<template>
	<view class="coupons">
		<view class="coupons_content">
			<u-tabs :list="list" :is-scroll="false" active-color="#F79C22" inactive-color="#999999" :current="current" @change="change"></u-tabs>
			<u-gap height="20" bg-color="#f7f7f7"></u-gap>
			<view class="couponslist" :style="{'background':current != 0?'#f7f7f7':''}" v-if="true">
				<view class="list_conetn" >
					<view :class=" current==0?'couponsone list_item':'couponstwo list_item'" v-for="(i,index) in listr" :key="index">
						<view class="list_item_left" :style="{'color':current==0?'#F79C22':'#666666'}">
							<text>￥</text><text>{{price(i.price)}}</text>
						</view>
						<view class="list_item_content">
							<view class="top">
								满{{i.if_price}}可用
							</view>
							<view class="bottom">
								<view >
									有效期
								</view>
								<view>
									{{i.start_date}}-{{i.end_date}}
								</view>
							</view>
						</view>
						<view class="list_item_right">
							<view class="">
								{{current==0?'立即使用':current==1?'已使用':'已过期'}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="couponslistempty" v-else>
				<u-empty text="你暂时还没有相关订单~" src="/static/user/coupons_empty.png" icon-size="200"></u-empty>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '未使用'
				}, {
					name: '已使用'
				}, {
					name: '已过期'
				}],
				current: 0,
				listr:[]
			}
		},
		onLoad() {
			this.getcouponList();
		},
		methods: {
			getcouponList(){
				let data = {
					type:this.current+1,
					page:1,
					pagesize:50
				}
				this.$u.post(this.api.couponList,data).then(res=>{
					if(res.code == 1){
						this.listr = res.data
					}
				})
			},
			price(e){
				console.log(e)
				let moen = Math.round(e)
				return moen;
			},
			change(e){
				this.current = e
				this.getcouponList();
			}
		}
	}
</script>

<style lang="less">
	.coupons_content{
		height: calc(100vh - 40px);
		.couponslist{
			background-color: #FFFFFF;
			.list_conetn{
				padding: 32rpx;
				.list_item{
					padding: 10rpx;
					height: 180rpx;
					display: flex;
					justify-content: space-between;
					padding:0 30rpx;
					margin-bottom: 20rpx;
					.list_item_left{
						width: 30%;
						padding: 50rpx 0;
						color: #F79C22;
						font-weight: 700;
						text:nth-child(1){
							font-size: 40rpx;
						}
						text:nth-child(2){
							font-size: 72rpx;
						}
					}
					.list_item_content{
						width: 60%;
						padding: 16rpx 0;
						display: flex;
						flex-wrap: wrap;
						align-items: center;
						justify-content: center;
						.top{
							color: #333333;
							font-weight: 700;
							width: 100%;
						}
						.bottom{
							font-size: 13px;
							color: #999999;
							width: 100%;
						}
						
					}
					.list_item_right{
						width: 8%;
						color: #FFFFFF;
						font-size: 30rpx;
						font-weight: 500;
						text-align: center;
						padding: 18rpx 0;
						display: flex;
						align-items: center;
					}
				}
				.couponsone{
					background-image: url(/static/user/couponsone.png);
					background-size: 100% 100%;
				}
				.couponstwo{
					background-image: url(../../../static/user/couponstwo.png);
					background-size: 100% 100%;
				}
			}
		}
		.couponslistempty{
			background-color: #fff;
			height: calc(100vh - 100px);
		}
	}
</style>

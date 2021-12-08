<template>
	<view class="integral">
		<u-gap height="20" bg-color="#EFEFEF"></u-gap>
		<view class="integral_title">
			<view class="title">
				<view>当前积分</view>
				<view>{{score}}</view>
			</view>
		</view>
		
		<view class="integral_list">
			<view class="title">
				积分明细记录
			</view>
			<view class="list">
				<view class="list_item" v-for="(i,index) in list" :key="index">
					<view class="list_item_left">
						<view>{{i.desc}}</view>
						<view>{{i.create_time}}</view>
					</view>
					<view class="list_item_right">
						{{i.status==1?'-':'+'}}{{i.score}}
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
				list:[],
				score:0
			}
		},
		onLoad() {
			this.loadData();
			this.score = uni.getStorageSync('userinfo').score
		},
		methods: {
			loadData(){
				let data ={
					page:1,
					pagesize:20
				}
				this.$u.post(this.api.getIntegralLog,data).then(res=>{
					if(res.code==1){
						this.list = res.data
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.integral_title{
		background-color: #FE8009;
		height: 320rpx;
		.title{
			padding: 56rpx;
			view:nth-child(1){
				font-size: 46rpx;
				color: #fff;
				font-weight: 500;
			}
			view:nth-child(2){
				font-size: 88rpx;
				color: #fff;
				font-weight: 700;
				padding-top: 20rpx;
			}
		}
	}
	.integral_list{
		height: calc(100vh - 430rpx);
		padding: 46rpx 58rpx;
		.title{
			color: #000000;
			font-size: 38rpx;
			font-weight: 700;
		}
		.list{
			height: calc(100% - 30rpx);
			overflow: hidden;
			overflow-y: auto;
			.list_item{
				display: flex;
				justify-content: space-between;
				padding: 30rpx 0;
				border-bottom: 1rpx solid #EFEFEF;
				align-items: center;
				.list_item_left{
					view:nth-child(1){
						font-size: 30rpx;
						color: #000000;
						font-weight: 500;
						line-height: 40rpx;
					}
					view:nth-child(2){
						font-size: 24rpx;
						color: #666666;
						font-weight: 500;
						line-height: 40rpx;
					}
				}
				.list_item_right{
					color: #FE8009;
					font-size: 36rpx;
					font-weight: 500;
				}
			}
		}
	}
</style>

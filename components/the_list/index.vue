<template>
	<view class="the_list">
		<view class="list">
			<view class="list_item" v-for="(i,index) in list" :key="index" @click="theclick(i,i.id)" @longpress="longpress(i)">
				<view class="iten_image">
					<image :src="i.cover_image" mode=""></image>
				</view>
				<view class="item_text_content" @click="goGoodsDetails(i.id)">
					<view>{{i.title}}</view>
					<view><text v-for="(r,index) in i.tags" :key="index">{{r}}</text></view>
					<view><text>￥{{i.price}}</text><!-- <text>/张</text> --></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"the_list",
		props: ['list'],
		data() {
			return {
				
			};
		},
		methods:{
			goGoodsDetails(id){
				
			},
			theclick(i,id){
				this.$emit('theclick',i)
				uni.navigateTo({
					url:'/pages/goods_details/selection/index?id=' +id
				})
			},
			longpress(i){
				this.$emit('longpress',i)
			},
			
		}
	}
</script>

<style lang="less">
	.the_list{
		.list{
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.list_item{
				width: 49%;
				height: 498rpx;
				background-color: #FFFFFF;
				margin-bottom: 20rpx;
				border-radius: 10rpx;
				overflow: hidden;
				.iten_image{
					height: 338rpx;
					width: 100%;
				}
				.item_text_content{
					padding: 22rpx 16rpx;
					view:nth-child(1){
						font-size: 28rpx;
						color: #323333;
						font-weight: 700;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
					}
					view:nth-child(2){
						height: 45rpx;
						font-size: 24rpx;
						color: #999899;
						padding: 12rpx 0;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
						text{
							
							padding-right: 10rpx;
						}
					}
					view:nth-child(3){
						
						text:nth-child(1){
							font-size: 32rpx;
							color: #F73622;
							font-weight: 700;	
						}
						text:nth-child(2){
							font-size: 24rpx;
							color: #999899;
						}
					}
				}
			}
		}
		
	}
</style>

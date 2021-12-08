<template>
	<view class="the_list">
		<view class="list">
			<view class="list_item" v-for="(i,index) in list" :key="index" @click="theclick(i,i.id)" >
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
		<view class="" style="padding-top: 40%;" v-if="list.length == 0">
			<u-empty text="暂无数据" mode="list"></u-empty>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[]
			}
		},
		onLoad(opent) {
			this.loadData(opent)
		},
		methods: {
			loadData(opent){
				console.log(opent);
				let data={
					keyword:opent.keyword,
					page:1,
					pagesize:30
				}
				this.$u.post('good/getGoodLists',data).then(res=>{
					if(res.code == 1){
						this.list = res.data.data
					}
				})
			},
			theclick(e){
				uni.navigateTo({
					url:'/pages/goods_details/selection/index?id='+e.id
				})
			}
		}
	}
</script>

<style lang="less">
	.the_list{
		padding: 32rpx;
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
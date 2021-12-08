<template>
	<view class="all">
		<view class="all_item" v-for="(i,index) in datalist" :key="index">
			<view class="all_item_left">
				<view class="image">
					<image :src="i.headimg" mode=""></image>
				</view>
			</view>
			<view class="all_item_right">
				<view class="title">
					<view>{{i.nickname}}</view>
					<view>{{i.create_time}}</view>
				</view>
				<view class="content">
					{{i.content}}
				</view>
				
				<view class="content_son">
					{{i.replay_content}}
				</view>
			</view>
		</view>
		
		<view class="empty_r" v-if="datalist.length == 0">
			<u-empty text="暂无数据!" mode="list"></u-empty>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				datalist:[]
			}
		},
		onLoad(opent) {
			this.loadData(opent);
		},
		methods: {
			loadData(opent){
				// 86
				let data ={
					type:1,
					good_id:opent.good_id,
					page:1,
					pagesize:30
				}
				this.$u.post(this.api.getComment,data).then(res=>{
					if(res.code == 1){
						this.datalist = res.data.data
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.all{
		padding: 32rpx;
		.all_item{
			border-bottom: 2rpx solid #EFEFEF;
			display: flex;
			padding: 50rpx 0;
			.all_item_left{
				width: 14%;
				.image{
					width: 70rpx;
					height: 70rpx;
					border-radius: 50%;
					overflow: hidden;
				}
			}
			.all_item_right{
				width: 86%;
				.title{
					&>view:nth-child(1){
						font-size: 24rpx;
						color: #333333;
					}
					
					&>view:nth-child(2){
						font-size: 16rpx;
						color: #999999;
						padding-top: 20rpx;
					}	
				}
				.content{
					padding-top: 33rpx;
					padding-bottom: 22rpx;
					font-size: 24rpx;
					color: #333333;
				}
				.content_son{
					background-color: #F6F6F5;
					padding: 22rpx;
					color: #666666;
					font-size: 24rpx;
					line-height: 30rpx;
				}
			}
		}
		.all_item:first-child{
			padding-top: 0;
		}
		.empty_r{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 50vh;
		}
	}
</style>

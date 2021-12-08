<template>
	<view class="my">
		<view class="my_list" v-if="listdata.length >0">
			<view class="my_list_item" v-for="(i,index) in listdata" :key="index" @click="messageDetails(i.id)">
				<view>{{i.content}}</view>
				<view>{{i.create_time}}</view>
			</view>
		</view>
		<view v-else style="height: 93.4vh;display: flex;align-items: center;justify-content: center;font-size: 36rpx;">
			暂时还没有消息~
		</view>
	</view>	
</template>

<script>
	export default {
		data() {
			return {
				listdata:[]
			}
		},
		onLoad() {
			this.loadData()
		},
		methods: {
			loadData(){
				let data = {
					page:1,
					pagesize:20
				}
				this.$u.post(this.api.getMessageList,data).then(res=>{
					if(res.code == 1){
						this.listdata = res.data
					}
				})
			},
			messageDetails(id){
				this.$u.post(this.api.messageRead,{
					id:id
				}).then(res => {
					console.log(res)
				})
			}
		}
	}
</script>

<style lang="less">
	page{
		background-color: #EFEFEF;
	}
	.my{
		background-color: #EFEFEF;
		.my_list{
			padding: 20rpx 32rpx;
			.my_list_item{
				width: 100%;
				// height: 124rpx;
				background-color: #FFFFFF;
				border-radius: 8rpx;
				padding: 30rpx;
				margin-bottom: 20rpx;
				view:nth-child(1){
					font-size: 26rpx;
					color: #333333;
					font-weight: 500;
				}
				view:nth-child(2){
					font-size: 24rpx;
					color: #A6A5A5;
					font-weight: 500;
				}
			}
		}
	}
</style>

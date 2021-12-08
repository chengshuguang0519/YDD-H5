<template>
	<view class="collection">
		<view class="collection_list" v-if="true">
			<view class="ction_list">
				<!-- <thelist @theclick="theclick" :list="getlist"></thelist> -->
				<view class="the_list">
					<view class="list">
						<view class="list_item" v-for="(i,index) in getlist" :key="index" @click="theclick(i)" @longpress="longpress(i)">
							<view class="iten_image">
								<image :src="i.cover_image" mode=""></image>
							</view>
							<view class="item_text_content">
								<view>{{i.title}}</view>
								<view><text v-for="(r,index) in i.tags" :key="index">{{r}}</text></view>
								<view><text>￥{{i.price}}</text><!-- <text>/张</text> --></view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="collection_empty" v-else>
			<u-empty text="您还没有收藏，快去逛逛吧~" src="/static/user/collection_empty.png" icon-size="200"></u-empty>
		</view>
	</view>
</template>

<script>
	import the_list from '../../../components/the_list/index.vue'
	export default {
		data() {
			return {
				id:'',
				index:0,
				getlist:[]
			}
		},
		components: {
			'thelist': the_list
		},
		onLoad(opent) {
			this.id = opent.id
			this.index = opent.index
			this.getloadData();
		},
		methods: {
			getloadData(){
				let data = {
					page:1,
					pagesize:50,
					id:this.id
				}
				this.$u.post(this.api.goodsList,data).then(res=>{
					console.log(res);
					if(this.index == 0){
						uni.setNavigationBarTitle({
							title:'卡片列表'
						})
					}else if(this.index ==1){
						uni.setNavigationBarTitle({
							title:'彩页列表'
						})
					}else if(this.index ==2){
						uni.setNavigationBarTitle({
							title:'画册列表'
						})
					}else if(this.index ==3){
						uni.setNavigationBarTitle({
							title:'手袋列表'
						})
					}else if(this.index ==4){
						uni.setNavigationBarTitle({
							title:'不干胶列表'
						})
					}else if(this.index ==5){
						uni.setNavigationBarTitle({
							title:'联单表格列表'
						})
					}else if(this.index ==6){
						uni.setNavigationBarTitle({
							title:'广告喷绘列表'
						})
					}else if(this.index ==7){
						uni.setNavigationBarTitle({
							title:'办公列表'
						})
					}else if(this.index ==8){
						uni.setNavigationBarTitle({
							title:'包装列表'
						})
					}else if(this.index ==9){
						uni.setNavigationBarTitle({
							title:'节庆定制列表'
						})
					}else if(this.index ==10){
						uni.setNavigationBarTitle({
							title:'淘设计列表'
						})
					}
					if(res.code == 1){
						this.getlist = res.data
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
					}
				})
			},
			// 订单详情
			theclick(i){
				console.log(i)
				uni.navigateTo({
					url:'/pages/goods_details/selection/index?id='+i.id
				})
			}
		}
	}
</script>

<style lang="less">
	.collection{
		height: calc(100vh);
		overflow: hidden;
		overflow-y: auto;
		.collection_list{
			background-color: #F7F7F7;
			height: 100%;
			.ction_list{
				padding: 20rpx;
			}
		}
		.collection_empty{
			height: 100%;
			background-color: #EFEFEF;
		}
	}
	.the_list{
		.list{
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.list_item{
				position: relative;
				width: 49%;
				// height: 498rpx;
				background-color: #FFFFFF;
				padding-bottom: 20rpx;
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
					}
					view:nth-child(2){
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
						position: absolute;
						bottom: 10rpx;
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

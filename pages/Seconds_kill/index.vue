<template>
	<view class="shopping">
		<view class="shopping_search">
			<view class="icon">
				<u-icon name="arrow-left" size="40" @click="navBack"></u-icon>
			</view>
			<view class="left">
				<u-search placeholder="请输入搜索内容" v-model="keyword" :show-action="false" @search="search"></u-search>
			</view>
			<view class="right">
				<u-icon name="/static/icon/The_session.png" size="40"> </u-icon>
				<view class="right_text">
					<text>消息提示</text>
				</view>
				<u-badge v-if="msnum" type="error" :count="msnum" :offset='[20,40]'></u-badge>
			</view>
		</view>
		<view class="shoping_content">
			<view class="content_list">
				<view class="lsit_itme" v-for="(i,index) in list" :key="index" @click="navclick(i)">
					<view class="list_item_left">
						<image :src="i.cover_image" mode=""></image>
					</view>
					<view class="list_item_right">
						<view class="item_right_top">
							<view><view><image src="/static/kill.png" mode=""></image></view><view>{{i.title}}</view></view>
							<view>广州印多多网络科技有限公司</view>
						</view>
						<view class="item_right_bottom">
							<view class="top">
								<view class="tt">
									<view>24小时发货</view>
									<view><u-icon name="/static/icon/huojian.png" color="#2979ff" size="28"></u-icon>极速发货</view>
								</view>
								<view class="bb">销量{{i.sale}}件</view>
							</view>
							<view class="bottom">
								<view>抢</view>
								<view><text>￥</text><text>{{i.market_price}}</text></view>
								<view>原价{{i.price}}</view>
							</view>
						</view>
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
				keyword:'',
				msnum:'',
				list:''
			}
		},
		onLoad() {
			this.loadData();
		},
		onShow() {
			this.getmessagenum()
		},
		methods: {
			search(e){
				console.log(e);
				this.keyword = ''
				uni.navigateTo({
					url:'/pages/list/index?keyword='+e
				})
			},
			// 获取分类
			loadData() {
				let data = {
					size: '',
					keyword: '',
					type:2
				}
				this.$u.post(this.api.getScore_Good, data).then(res => {
					if (res.code == 1) {
						this.list = res.data;
					}
				})
			},
			integral(index){
				console.log(index)
				if(index == 1){
					uni.navigateTo({
						url:'/pages/user/integral/index'
					})
				}else{
					uni.navigateTo({
						url:'/pages/integral_order/index'
					})
				}
			},
			getmessagenum(){
				let uid = uni.getStorageSync('userinfo').user_id
				this.$u.get(this.api.messagenum,{uid:uid}).then(res=>{
					this.msnum = res.data
				})
			},
			navclick(i){
				console.log(i)
				uni.navigateTo({
					url:'/pages/goods_details/kill/index?id='+i.id
				})
			},
			// pages/goods_details/selection/index?id=492
			navBack(){
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="less">
	.shopping{
		background-color: #EFEFEF;
		.shopping_search{
			display: flex;
			padding: 36rpx 36rpx 16rpx;
			background: #fff;
			align-items: center;
			.left{
				width: 84%;
			}
			.icon{
				padding-right: 20rpx;
			}
			.right{
				width: 16%;
				text-align: center;
				.right_text{
					font-size: 20rpx;
					color: #999999;
				}
			}
		}
		.shoping_content{
			height: calc(100vh - 70px);
			.content_list{
				padding:14rpx 44rpx;
				.lsit_itme{
					background-color: #FFFFFF;
					margin-bottom: 14rpx;
					padding: 12rpx;
					height: 272rpx;
					border-radius: 20rpx;
					display: flex;
					.list_item_left{
						width: 246rpx;
						height: 246rpx;
					}
					.list_item_right{
						padding-left: 20rpx;
						display: flex;
						flex-wrap: wrap;
						align-content: space-between;
						width: 60%;
						.item_right_top{
							width: 100%;
							&>view:nth-child(1){
								display: flex;
								&>view:nth-child(1){
								width: 110rpx;
								height: 22rpx;
								}
							}
						}
						.item_right_bottom{
							width: 100%;
							.top{
								font-size: 20rpx;
								color: #5F5D5D;
								font-weight: 400;
							}
							.tt{
								display: flex;
								align-items: center;
								&>view:nth-child(2){
									display: flex;
									align-items: center;
									padding-left: 15rpx;
								}
							}
							.bottom{
								display: flex;
								align-items: flex-end;
								&>view:nth-child(1){
									width: 44rpx;
									height: 44rpx;
									background: #ce3030;
									border-radius: 15rpx;
									font-size: 30rpx;
									font-weight: 700;
									color: #ffffff;
									text-align: center;
								}
								&>view:nth-child(2){
									padding-left: 15rpx;
									&>text:nth-child(1){
										font-size: 25rpx;
										color: #CE3030;
										font-weight: 400;
									}
									&>text:nth-child(2){
										font-size: 40rpx;
										color: #CE3030;
										font-weight: 400;
									}
								}
								&>view:nth-child(3){
									color: #666666;
									font-size: 18rpx;
									font-weight: 500;
									text-decoration: line-through;
									padding-left: 15rpx;
								}
							}
						}
					}
				}
			}
		}
	}
	
</style>

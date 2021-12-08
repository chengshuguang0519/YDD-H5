<template>
	<view class="shopping">
		<view class="shopping_w">
			<view class="shopping_search">
				<view class="left">
					<u-search placeholder="请输入您要查询的内容" v-model="keyword" :show-action="false" @search="search"></u-search>
				</view>
				<view class="right" @click="goMessage">
					<u-icon name="/static/icon/The_session.png" size="40"> </u-icon>
					<view class="right_text">
						<text>消息提示</text>
					</view>
					<u-badge v-if="msnum" type="error" :count="msnum" :offset='[80,50]'></u-badge>
				</view>
			</view>
			<view class="shopping_scroll">
				<scroll-view :scroll-y="true" class="scroll_left">
					<view :class="index == item_index ?'left_after left_itme':'left_itme '" 
					 v-for="(i,index) in categorylist" 
					 :key="index" 
					 @click="item_switch(index)">{{i.name}}</view>
				</scroll-view>
				<scroll-view :scroll-y="true" class="scroll_right">
					<view class="right_itme">
						<view class="right_item_title">
							{{categorylist[item_index].name}}
						</view>
						<view class="right_grid" >
							<view class="grid" v-for="(i,index) in categorylist[item_index].list" v-if="index < inde+'right_index' || index < right_index" :key="index" @click="onshop(i,index)">
								<view class="grid_image">
									<image :src="i.images"></image>
								</view>
								<view class="grid_text">
									{{i.name}}
								</view>
							</view>
						</view>
						<block v-if="categorylist[item_index].list.length != 0">
							<view class="right_load" v-if="right_index == 3">
								<view class="load" @click="an(i)"><text>点击查看更多</text><u-icon name="arrow-down"></u-icon></view>
							</view>
						</block>
					</view>
				</scroll-view>
			</view>
		</view>
		<view-tabbar :current="1"></view-tabbar>
	</view>
</template>
<script>
	import Tabbar from "../../components/tabbar/index.vue";
	export default {
		data() {
			return {
				keyword:'',
				item_index:1,
				right_index:3,	
				categorylist:[],
				msnum:''
			};
		},
		components: {
			"view-tabbar": Tabbar,
		},
		onLoad(option) {
			this.getshop()
			console.log(option.index +'1')
			this.item_index = parseInt(option.index) +1?parseInt(option.index) +1 : 0
			console.log(this.item_index)
		},
		onShow() {
			this.getmessagenum();
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
			getshop(){
				this.$u.get(this.api.getCategory,{type:1}).then(res=>{
					if(res.code == 1){
						this.categorylist = res.data
					}else{
						uni.showToast({
							title:res.msg,
							icon:"none"
						})
					}
				})
			},
			// 左侧切换
			item_switch(e){
				console.log(e)
				this.item_index  = e ;
				
			},
			// 右侧展开
			an(e){
				this.right_index = 10;
				console.log(e)
			},
			onshop(e){
				console.log(e);
				uni.navigateTo({
					url:'./list/index?id='+e.id+ '&index='+this.item_index
				})
			},
			getmessagenum(){
				let uid = uni.getStorageSync('userinfo').user_id
				this.$u.get(this.api.messagenum,{uid:uid}).then(res=>{
					this.msnum = res.data
				})
			},
			goMessage(){
				uni.navigateTo({
					url:'/pages/user/my_message/index'
				})
			}
		}
		
	};
</script>

<style lang="less">
	.shopping_w{
		height: calc(100vh - 50px);
		.shopping_search{
			display: flex;
			padding: 58rpx 58rpx 28rpx;
			.left{
				width: 84%;
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
		.shopping_scroll{
			display: flex;
			background-color: #f7f7f7;
			height: calc(100% - 90px);
			.scroll_left{
				width: 146rpx;
				background-color: #FFFFFF;
				.left_itme{
					padding: 0 10rpx;
					width: 155rpx;
					height: 96rpx;
					text-align: center;
					border-bottom: 1rpx solid #F2F2F2;
					color: #666666;
					position: relative;
					font-size: 28rpx;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.left_after{
					background-color: #F2F2F2;
					color: #FF8109;
				}
				.left_after::before{
					content: '';
					width: 6rpx;
					position:absolute;
					height: 50%;
					left: 0;
					top: 25%;
					bottom: 25%;
					background-color: #FF8109;
				}
			}
			.scroll_right{
				width: 80%;
				padding: 16rpx 18rpx;
				.right_itme{
					padding: 12rpx 0;
					border-bottom: 2rpx solid #FFFFFF;
					.right_item_title{
						color: #333333;
						font-weight: bold;
						font-size: 28rpx;
					}
					.right_grid{
						display: flex;
						flex-wrap: wrap;
						.grid{
							width: 33.3%;
							text-align: center;
							font-size: 20rpx;
							color: #666666;
							padding: 10rpx;
							.grid_image{
								height: 166rpx;
								width: 174rpx;
								background-color: #FFFFFF;
							}
							.grid_text{
								white-space: nowrap;
								overflow: auto;
								text-overflow: ellipsis;
							}
						}
					}
					.right_load{
						text-align: center;
						font-size: 16rpx;
						color: #666666;
						padding-top: 24rpx;
						.load{
							display: inline-block;	
							background-color: #FFFFFF;
							padding: 4rpx 30rpx;
						}
					}
				}
			}
		}
	}
	.u-badge--bg--error[data-v-2b1712d8]{
		top: 20px!important;
		right: 35px!important;
	}
</style>

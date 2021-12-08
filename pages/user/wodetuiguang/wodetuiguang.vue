<template>
	<view class='user'>
		<view class="user_conent">
			<view class="user_hone">
				<view class="top">
					<view class="left">
						<image src="../../../static/icon/The_horn.png" mode=""></image>
					</view>
					<view class="right">
						<view class="">{{infoobj.nickname}}</view>
						<view class="">{{infoobj.phone}}</view>
					</view>
				</view>
				<view class="bottom">
					<view class="cell1">
						<view class="text">可提现佣金:¥ {{infoobj.canWithdrawal}}</view>
						<view class="btn" @click="goWithdrawal">提现</view>
					</view>
					<view class="xian"></view>
					<view class="cell2">
						<view class="text">推广用户:{{infoobj.num}}位</view>
						<view class="text">待发放佣金: ¥ {{infoobj.pendingWithdrawal}}</view>
					</view>
				</view>
			</view>
			<view class="cellList">
				<view class="item">
					<view class="icon"><image src="../../../static/icon/The_horn.png" mode=""></image></view>
					<view class="name">昨日推广佣金</view>
					<view class="right">{{infoobj.yesterdayCommission }}</view>
				</view>
				<view class="item">
					<view class="icon"><image src="../../../static/icon/The_horn.png" mode=""></image></view>
					<view class="name">累计可提现佣金</view>
					<view class="right">{{infoobj.sumCommission }}</view>
				</view>
				<view class="item">
					<view class="icon"><image src="../../../static/icon/The_horn.png" mode=""></image></view>
					<view class="name">累计已提现佣金</view>
					<view class="right">{{infoobj.surplusCommission }}</view>
				</view>
				<view class="item">
					<view class="icon"><image src="../../../static/icon/The_horn.png" mode=""></image></view>
					<view class="name">今日推广佣金</view>
					<view class="right">{{infoobj.todayCommission}}</view>
				</view>
				<view class="item" @click="goExtensionInfo">
					<view class="icon"><image src="../../../static/icon/The_horn.png" mode=""></image></view>
					<view class="name">推广详情</view>
					<view class="righticon"><image src="../../../static/icon/The_horn.png" mode=""></view>
				</view>
			</view>
			<view class="tip">
				<view class="tip1">温馨提示：</view>
				<view class="tip2">{{infoobj.withdraw_desc_text}}</view>
			</view>
			<view class="bottomtBtn" @click="clickimage">
				制作推广图片
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				infoobj:{}
			}
		},
		components: {
		},
		onLoad() {
			this.loadpromoteInfo();
		},
		methods: {
			loadpromoteInfo(){
				this.$u.get(this.api.promoteInfo).then(res=>{
					console.log(res,'res')
					if(res.code == 1){
						this.infoobj = res.data
					}
				})
			},
			clickimage(){
				uni.navigateTo({
					url:'/pages/user/wodetuiguang/image_list/index'
				})
			},
			// 登陆
			onlogin(){
				uni.navigateTo({
					url:'/pages/userLogin/login'
				})
			},
			goExtensionInfo(){
				uni.navigateTo({
					url:"/pages/user/extensionInfo/extensionInfo"
				})
			},
			goWithdrawal(){
				uni.navigateTo({
					url:'/pages/user/the_wallet/withdrawal_topup/index?type=2'
				})
			}
			
		}
	}
</script>

<style lang="less">
	.user_conent {
		height: calc(100vh - 44px);
		background-color: #efefef;
		overflow: hidden;
		overflow-y: auto;
		.user_hone {
			.top{
				width: 100%;
				height: 264rpx;
				padding: 0 58rpx;
				padding-top: 48rpx;
				background: #FF8109;
				display: flex;
				.left{
					width: 116rpx;
					height: 116rpx;
					image{
						border-radius: 50%;
					}
				}
				.right{
					width: 490rpx;
					height: 116rpx;
					line-height: 58rpx;
					margin-left: 22rpx;
					color: #fff;
					view{
						width: 490rpx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}
			}
			.bottom{
				width: 686rpx;
				height: 186rpx;
				padding: 0;
				margin: 0 auto;
				margin-top: -58rpx;
				background: #FFFFFF;
				border-radius: 20rpx;
				.xian{
					width: 100%;
					height: 1px;
					margin: 0;
					background: #DCDCDC;
				}
				&>view{
					height: 90rpx;
					margin: 0 32rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.btn{
						width: 124rpx;
						height: 58rpx;
						line-height: 58rpx;
						text-align: center;
						margin: 0;
					}
				}
			}
		}
	}
	.cellList{
		padding: 0 32rpx;
		margin-top: 20rpx;
		.item{
			height: 88rpx;
			margin: 10rpx 0;
			padding: 0 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background: #FFFFFF;
			border-radius: 20rpx;
			.icon{
				width: 42rpx;
				height: 42rpx;
			}
			.name{
				flex:1;
				padding: 0 9rpx;
				color: #333333;
				font-size: 28rpx;
			}
			.right{
				color: #FF0000;
			}
			.righticon{
				width: 32rpx;
				height: 30rpx;
			}
		}
	}
	.tip{
		margin-top: 22rpx;
		padding: 0 32rpx;
		line-height: 40rpx;
		color: #666666;
		font-size: 26rpx;
		.tip2{
			font-size: 22rpx;
		}
	}
	.bottomtBtn {
		width: 540rpx;
		height: 64rpx;
		background: #FF8109;
		color: #fff;
		text-align: center;
		line-height: 64rpx;
		border-radius: 15rpx;
		margin: 0 auto;
		margin-top: 60rpx;
	}
</style>

<template>
	<view class="the_wallet">
		<u-gap height="20" bg-color="#EFEFEF"></u-gap>
		<view class="wallet_top">
			<view class="wallet_top_top">
				<view class="wallet_topt">
					<view>账户余额(元)</view>
					<view>{{userinfo.money}}</view>
				</view>
				<view class="wallet_topb">
					<view>
						<view>充值金额(元)</view>
						<view>{{userinfo.top_price}}</view>
					</view>
					<view>
						<view>平台赠送金额(元)</view>
						<view>{{userinfo.top_send_price}}</view>
					</view>
				</view>
			</view>
			<view class="wallet_top_bottm">
				<view @click="onclick(1)">充值</view>
				<view @click="onclick(2)">提现</view>
			</view>
		</view>
		<u-gap height="20" bg-color="#EFEFEF"></u-gap>
		<view class="wallet">
			<view class="wallet_title">
				订单记录
			</view>
			<view class="wallettabs">
				<u-tabs :list="list" :is-scroll="false" active-color="#FE8009" :current="current" @change="change"></u-tabs>
			</view>
			<view class="walletlist">
				<view class="walletlist_item" v-for="(i,index) in listr" :key="index">
					<view class="walletlist_left">
						<view>订单号：{{i.order_no}}{{i.desc}}</view>
						<view>{{i.update_time}}</view>
					</view>
					<view class="walletlist_right">
						{{i.type==4?'-':type==2?'-':'+'}}{{i.price}}
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
				list: [{
					name: '全部'
				}, {
					name: '收入'
				}, {
					name: '支出'
				}, {
					name: '充值'
				}, {
					name: '提现'
				}],
				current: 0,
				type:-1,
				userinfo:{},
				listr:[]
			}
		},
		onLoad() {
			this.loadData();
			this.getuser()
		},
		methods: {
			// 获取用户信息
			getuser(){
				this.$u.get(this.api.getuserindex).then(res=>{
					this.userinfo = res.data
				})
			},
			// 获取列表信息
			loadData(){
				let data = {
					type:this.type,
					page:1,
					pagesize:50
				}
				this.$u.post(this.api.getAccountLog,data).then(res=>{
					if(res.code == 1){
						this.listr=res.data
					}
				})
			},
			// tab 切换
			change(e){
				this.current = e;
				this.type = e==0?-1:e;
				this.loadData();
			},
			// 充值提现跳转
			onclick(e){
				wx.navigateTo({
					url:'/pages/user/the_wallet/withdrawal_topup/index?type='+e
				})
			}
		}
	}
</script>

<style lang="less">
	.wallet_top{
		height: 500rpx;
		padding: 32rpx;
		display: flex;
		flex-wrap: wrap;
		.wallet_top_top{
			height: 334rpx;
			width: 100%;
			background-color: #FE8009;
			border-radius: 20rpx;
			padding: 42rpx;
			color: #FFFFFF;
			display: flex;
			flex-wrap: wrap;
			align-content: space-between;
			.wallet_topt{
				&>view:nth-child(1){
					font-size: 28rpx;
					font-weight: 700;
				}
				&>view:nth-child(2){
					font-size: 44rpx;
					font-weight: 700;
				}
			}
			.wallet_topb{
				display: flex;
				justify-content: space-between;
				width: 100%;
				&>view>view:nth-child(1){
					font-size: 28rpx;
					font-weight: 700;
				}
				&>view>view:nth-child(2){
					font-size: 44rpx;
					font-weight: 700;
				}
			}
		}
		.wallet_top_bottm{
			display: flex;
			justify-content: space-around;
			width: 100%;
			padding-top: 10px;
			view:nth-child(1){
				background-color: #FE8009;
				text-align: center;
				color: #fff;
				border-radius: 36rpx;
				width: 290rpx;
				height: 72rpx;
				line-height: 72rpx;
			}
			view:nth-child(2){
				background-color: #EFEFEF;
				text-align: center;
				color: #FE8009;
				border-radius: 36rpx;
				width: 290rpx;
				height: 72rpx;
				line-height: 72rpx;
			}
		}
	}
	.wallet{
		padding-top: 20rpx;
		.wallet_title{
			color: #000000;
			font-size: 32rpx;
			font-weight: 700;
			padding: 0 38rpx 0 38rpx;	
		}
		.wallettabs{
			position: relative;
		}
		.walletlist{
			padding: 0 38rpx 38rpx 38rpx;
		}
		.wallettabs::after{
			content: '';
			border-bottom: 1rpx solid #FE8009;
			width: 88%;
			left: 6%;
			bottom: 2rpx;
			position: absolute;
		}
		.walletlist_item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 35rpx 0;
			border-bottom: 1rpx solid #F7F7F7;
			.walletlist_left{
				view:nth-child(1){
					color: #333333;
					font-weight: 500;
					font-size: 26rpx;
				}
				view:nth-child(2){
					color: #999999;
					font-weight: 500;
					font-size: 26rpx;
					padding-top: 10rpx;
				}
			}
		}
	}
</style>

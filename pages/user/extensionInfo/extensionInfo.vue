<template>
	<view class="body">
	<!-- 	<u-tabs :list="list" :is-scroll="false" :current="current" active-color='#FF8109' bar-width='150'
			@change="itemChange"></u-tabs> -->
		<view v-if="current == 0">
			<view class="top">
				<view class="item-top">
					<img :src="user.headimg" alt="">
					<view class="user-name">{{user.nickname}}</view>
					<view class="user-list">
						<view @click="goUserList">
							<text>用户数量</text>
							<text>{{infoobj.num}}位</text>
						</view>
						<view @click="goUserOrder">
							<text>推广佣金</text>
							<text>{{infoobj.total}}元</text>
						</view>
					</view>
				</view>
			</view>
			<view class="mingxi">推广明细</view>
			<view class="item-none" v-if="list.length == 0">
				<img src="/static/images/extension.png" mode=""></img>
			</view>
			<view class="walletlist" v-if="list.length != 0">
				<view class="walletlist_item" v-for="(i,index) in list" :key="index">
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
		<view v-else>
			<!-- <u-notice-bar mode="horizontal" :list="messagelist"></u-notice-bar> -->
			<view class="user-top">{{messagelist}}</view>
			<view class="none-user" v-if="list.length == 0">
				<img src="/static/images/extension.png" mode=""></img>
			</view>
			<view class="walletlist" v-if="list.length != 0">
				<view class="walletlist_item" v-for="(i,index) in list" :key="index">
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
				current: 0,
				list: [{
					name: '推广人信息'
				}, {
					name: '用户列表'
				}],
				user: {},
				messagelist: '统计：您的下级用户订单为0单，总佣金为0元。',
				num: 0,
				list: [],
				// userList:[],
				infoobj:{}
			}
		},
		onLoad() {
			this.user = uni.getStorageSync('userinfo')
			console.log(this.user,'user')
			this.getList();
			this.loadData();
			this.loadpromoteInfo()
		},
		methods: {
			itemChange(e) {
				this.current = e
			},
			getList() {
				this.$u.get('/user/getList', {
					code: 1,
					domain: 10
				}).then(res => {
					console.log(res,'num')
					this.num = res.data.length
					// res.data.forEach(v=>{
					// 	if(v.total>0){
					// 		this.userList.push(v)
					// 	}
					// })
					// console.log(this.userList,'userList')
				})
			},
			loadpromoteInfo(){
				this.$u.get(this.api.promoteInfo).then(res=>{
					console.log(res,'res')
					if(res.code == 1){
						this.infoobj = res.data
					}
				})
			},
			loadData() {
				let data = {
					page: 1,
					pagesize: 50,
					type: -1
				}
				this.$u.post(this.api.getAccountLog, data).then(res => {
					if (res.code == 1) {
						console.log(res,'list')
						this.list = res.data
					}
				})
			},
			goUserList(){
				uni.navigateTo({
					url:'userList/userList'
				})
			},
			goUserOrder(){
				console.log(this.user.type,'user')
				if(this.user.type == 4){
					uni.navigateTo({
						url:'userOrder/userOrder'
					})
				}
				
			}
			
		}
	}
</script>

<style lang="less" scoped>
	.body {
		height: 100vh;
		background-color: #f6f6f6;
	}

	.message {
		padding-bottom: 400rpx;
	}

	.top {
		position: relative;
		width: 100%;
		height: 350rpx;
		background-color: #FF8109;
		border-radius: 0rpx 0rpx 80rpx 80rpx;

		.item-top {
			position: absolute;
			display: flex;
			width: 90%;
			height: 350rpx;
			left: 50%;
			top: 200rpx;
			transform: translate(-50%);
			background-color: #fff;
			border-radius: 20rpx;
			text-align: center;

			img:nth-child(1) {
				width: 200rpx;
				height: 200rpx;
				position: absolute;
				border-radius: 50%;
				top: -100rpx;
				left: 50%;
				transform: translate(-50%);

			}

			.user-name {
				position: absolute;
				top: 115rpx;
				left: 50%;
				transform: translate(-50%);
				font-size: 34rpx;
			}

			.user-list {
				position: absolute;
				width: 100%;
				bottom: 0;
				height: 180rpx;
				text-align: center;
				display: flex;
				justify-content: space-around;

				view {
					display: flex;
					flex-direction: column;
					margin-top: 50rpx;

					text {
						margin-top: 10rpx;
					}
				}
			}
		}
	}

	.walletlist {
		padding: 0 38rpx 38rpx 38rpx;
		background-color: #FFFFFF;
	}

	.wallettabs::after {
		content: '';
		border-bottom: 1rpx solid #FE8009;
		width: 88%;
		left: 6%;
		bottom: 2rpx;
		position: absolute;
	}

	.walletlist_item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 35rpx 0;
		border-bottom: 1rpx solid #F7F7F7;

		.walletlist_left {
			view:nth-child(1) {
				color: #333333;
				font-weight: 500;
				font-size: 26rpx;
			}

			view:nth-child(2) {
				color: #999999;
				font-weight: 500;
				font-size: 26rpx;
				padding-top: 10rpx;
			}
		}
	}

	.mingxi {
		margin-top: 220rpx;
		font-size: 32rpx;
		// margin-left: 32rpx;
		background-color: #FFFFFF;
		padding-left: 32rpx;
		padding-top: 20rpx;
	}

	.item-none {
		width: 100%;
		height: 600rpx;
		img {
			width: 100%;
			height: 100%;
		}
	}

	.user-top {
		text-align: center;
		height: 50rpx;
		line-height: 50rpx;
		color: rgb(137, 82, 33);
		background-color: rgb(255, 230, 200);

	}

	.none-user {
		width: 100%;
		height: 600rpx;
		margin-top: 50rpx;

		img {
			width: 100%;
			height: 600rpx;
		}
	}
</style>

<template>
	<view class='user'>
		<view class="user_conent">
			<view class="user_hone">
				<view class="user_hone_image" @click="onpersonal" v-if="is_login">
					<view class="home_image_left">
						<u-avatar :src="userinfo.headimg" size="112"></u-avatar>
					</view>
					<view class="home_image_right">
						<view class="home_name">
							<view class="name">
								{{userinfo.nickname}}
							</view>
							<view class="phone">
								{{userinfo.phone}} 
							</view>
						</view>
						<view class="hone_icon">
							<u-icon name="arrow-right"></u-icon>
						</view>
					</view>
				</view>
				<view class="user_hone_image" @click="onlogin" v-else>
					<view class="home_image_left">
						<u-avatar src="/static/user/login_image.png" size="112"></u-avatar>
					</view>
					<view class="home_image_right">
						<view class="home_name">
							<view class="name">
								去登陆
							</view>
						</view>
						<view class="hone_icon">
							<u-icon name="arrow-right"></u-icon>
						</view>
					</view>
				</view>

				<view class="user_hone_grid" v-if="is_login">
					<view class="hone_grid_item" @click="ongriditem(1)">
						<view>{{userinfo.money}}</view>
						<view>我的钱包</view>
					</view>
					<view class="hone_grid_item" @click="ongriditem(2)">
						<view>{{userinfo.score}}</view>
						<view>我的积分</view>
					</view>
					<view class="hone_grid_item" @click="ongriditem(3)">
						<view>{{userinfo.couponnum}}</view>
						<view>优惠券</view>
					</view>
				</view>
			</view>
			
			<view class="user_ker">
				<u-cell-item :title-style="{'font-size':'32rpx','color':'#333','font-weight':' 500'}" title="我的订单"
					value="更多" :border-bottom="false" @click="onorder"></u-cell-item>
				<view class="user_grid">
					<view class="grid_item" v-for="(item,index) in listico" :key="index" @click="onorder(index)">
						<view class="grid_image">
							<image :src="'/static/user/'+(index+1)+'.png'" mode="widthFix"></image>
						</view>
						<view class="grid_text">
							<text>{{item}}</text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="user_Cell ">
				<u-cell-group>
					<u-cell-item icon="bell" title="我的消息" hover-class="none" index='1' @click="onclickcell">
					</u-cell-item>
					<u-cell-item icon="star" title="我的收藏" hover-class="none" index='2' @click="onclickcell">
					</u-cell-item>
					<u-cell-item icon="map" title="收货地址" hover-class="none" index='3' @click="onclickcell">
					</u-cell-item>
					<u-cell-item icon="integral-fill" title="退款售后" hover-class="none" index='4' @click="onclickcell">
					</u-cell-item>
					<u-cell-item icon="setting-fill" title="印刷文件" hover-class="none" index='5' @click="onclickcell">
					</u-cell-item>
					<u-cell-item icon="account" title="联系客服" hover-class="none" index='6' @click="onclickcell">
					</u-cell-item>
					<u-cell-item icon="file-text" title="意见反馈" hover-class="none" index='7' @click="onclickcell">
					</u-cell-item>
					<u-cell-item icon="integral-fill" title="我的推广" hover-class="none" index='8' @click="onclickcell">
					</u-cell-item>
				</u-cell-group>
			</view>

			<view class="bottom" v-if="is_login">
				<view class="btn" @click="exit_login">
					退出登录
				</view>
			</view>
			
		</view>
		<view-tabbar :current="4"></view-tabbar>
	</view>
</template>

<script>
	import Tabbar from '../../components/tabbar/index.vue'
	export default {
		data() {
			return {
				userinfo: '',
				is_login: false,
				listico:['待付款','待审核','生产中','发货中','已完成']
			}
		},
		components: {
			'view-tabbar': Tabbar
		},
		onLoad() {
			this.getuserinfo()
		},
		onShow() {
			this.getuserinfo()
			this.getuser()
			
		},
		methods: {
			getuser(){
				this.$u.get(this.api.getuserindex).then(res=>{
					var userInfo = uni.getStorageSync('userinfo')
					userInfo.money = res.data.money;
					userInfo.couponnum = res.data.couponnum;
					userInfo.self_invitation = res.data.self_invitation
					this.userinfo.couponnum = res.data.couponnum;
					uni.setStorageSync('userinfo', userInfo);
				})
			},
			// 获取用户信息
			getuserinfo() {
				let userinfo = uni.getStorageSync('userinfo')
				this.userinfo = userinfo;
				if (userinfo) {
					this.is_login = true
				} else {
					this.is_login = false
				}
			},
			// 退出登录
			exit_login() {
				this.$u.get(this.api.logout).then(res => {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
					setTimeout(() => {
						if (res.code == 1) {
							uni.removeStorage({
								key: 'userinfo',
								success: (res) => {
									uni.navigateBack()
								}
							})
						}
					}, 2000)

				})
			},
			go(url) {
				uni.navigateTo({
					url: url
				})
			},
			// 登陆
			onlogin() {
				uni.navigateTo({
					url: '/pages/userLogin/login'
				})
			},
			// 订单
			onorder(index) {
				console.log(index);
				let indexs = index == 4 ? (index + 1) : index;
				uni.navigateTo({
					url: '/pages/order/the_order/index?index=' + (indexs + 1)
				})
			},
			// 个人资料
			onpersonal() {
				uni.navigateTo({
					url: '/pages/user/personal/index'
				})
			},
			//1我的钱包 2我的积分 3优惠卷
			ongriditem(e) {
				if (e == 1) {
					uni.navigateTo({
						url: '/pages/user/the_wallet/index'
					})
				} else if (e == 2) {
					uni.navigateTo({
						url: '/pages/user/integral/index'
					})
				} else if (e == 3) {
					uni.navigateTo({
						url: '/pages/user/coupons/index'
					})
				}
			},
			/**
			 * 1我的消息2我的收藏3收货地址4退款售后
			 * 5印刷文件6联系客服7意见反馈8我的推广
			 */
			onclickcell(e) {

				if (e == 1) {
					uni.navigateTo({
						url: '/pages/user/my_message/index'
					})
				} else if (e == 2) {
					uni.navigateTo({
						url: '/pages/user/collection/index'
					})
				} else if (e == 3) {
					uni.navigateTo({
						url: '/pages/Shipping_address/index'
					})
				} else if (e == 4) {
					uni.navigateTo({
						// url: '/pages/user/after_sales/index'
						url:'/pages/user/arefund/index'
					})
				} else if(e == 5){
					uni.navigateTo({
						url: '/pages/printing/index'
					})
				}else if(e == 6){
					uni.switchTab({
						url:'/pages/chat/index'
					})
				}else if (e == 7) {
					uni.navigateTo({
						url: '/pages/user/feedback/index'
					})
				} else if (e == 8) {
					uni.navigateTo({
						url: '/pages/user/wodetuiguang/wodetuiguang'
					})
				}

			}
		}
	}
</script>

<style lang="less">
	.user_conent {
		// height: calc(100vh - 90px);
		background-color: #efefef;
		overflow: hidden;
		overflow-y: auto;
		padding-bottom: 100rpx;

		.user_hone {
			max-height: 374rpx;
			background: linear-gradient(180deg, #fcf2df 0%, #fffefc 100%);
			padding: 34rpx;

			.user_hone_image {
				padding-top: 36rpx;
				display: flex;
				justify-content: space-between;

				.home_image_right {
					display: flex;
					justify-content: space-between;
					width: 80%;

					.home_name {
						display: flex;
						flex-wrap: wrap;
						align-items: center;

						.name {
							color: #333333;
							font-size: 34rpx;
							width: 100%;
							font-weight: 700;
						}

						.phone {
							color: #999999;
							font-size: 28rpx;
							width: 100%;
						}
					}

					.hone_icon {
						display: flex;
					}
				}
			}

			.user_hone_grid {
				display: flex;
				justify-content: space-between;
				padding-top: 70rpx;
				text-align: center;

				.hone_grid_item {
					text-align: center;

					view:nth-child(1) {
						font-size: 36rpx;
						color: #333;
						font-weight: 700;
						line-height: 40rpx;
					}

					view:nth-child(2) {
						font-size: 24rpx;
						font-weight: 500;
						text-align: center;
						color: #333333;
						line-height: 40rpx;
						padding-top: 10rpx;
					}
				}
			}
		}

		.user_ker {
			height: 240rpx;
			background-color: #FFFFFF;
			margin: 20rpx 0;

			.user_grid {
				padding: 0 34rpx;
				display: flex;
				justify-content: space-between;

				.grid_item {
					.grid_image {
						width: 50rpx;
						height: 50rpx;
						margin: 0 auto;
					}

					.grid_text {
						font-size: 26rpx;
						color: #666666;
						padding-top: 30rpx;
					}
				}
			}
		}

		.user_Cell {
			background-color: #FFFFFF;
		}

		.bottom {
			padding: 30rpx 0 40rpx 0;

			.btn {
				width: 540rpx;
				height: 64rpx;
				background: #F59932;
				color: #fff;
				text-align: center;
				line-height: 64rpx;
				border-radius: 50rpx;
				margin: 0 auto;
			}
		}
	}
</style>

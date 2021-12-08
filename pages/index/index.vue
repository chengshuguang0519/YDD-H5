<template>
	<view class="index">
		<view class="index_in">
			<!-- 搜索 -->
			<view class="index_hone">
				<view class="index_hone_logo">
					<image src="../../static/icon/logo.png" mode=""></image>
				</view>
				<view class="shopping_search">
					<view class="left">
						<u-search placeholder="请输入搜索内容" v-model="keyword" :show-action="false" @search="search"></u-search>
					</view>
					<view class="right" @click='goMessage'>
						<u-icon color="#fff" name="/static/index/The_session.png" size="40"></u-icon>
						<view class="right_text">
							<text>消息提示</text>
						</view>
						<u-badge v-if="msnum" type="error" :count="msnum" :offset='[80,50]'></u-badge>
					</view>
				</view>
			</view>
			<!-- 主体 -->
			<view class="index_content">
				<!-- 金刚区 -->
				<view class="cont_swiper">
					<swiper class="cont_swiper_item" indicator-dots indicator-active-color="#FF0000">
						<swiper-item class="item_grid" v-for="(i,index) in classificationnum" :key="index">
							<view class="grid" v-for="(i,index) in classificationlist[index].list" :key="index"
								@click="classification(index,i.id)">
								<view class="grid_image">
									<image :src="i.images"></image>
								</view>
								<view class="grid_text">
									{{i.name}}
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>

				<!-- 通知 -->
				<view class="cont_NoticeBar">
					<view class="cont_nb_icon">
						<u-icon size="40" name="/static/icon/The_horn.png"></u-icon>
					</view>
					<u-notice-bar border-radius="10" font-size="28" bg-color="#FDD3B2" color="#333333"
						:volume-icon="false" :close-icon="false" :list="horizontallist"></u-notice-bar>
				</view>

				<!--  -->
				<view class="cont_image">
					<!-- <image src="/static/images.png" mode="widthFix"></image> -->
					<swiper class="cont_swiper_item" indicator-dots indicator-active-color="#FF0000">
						<swiper-item class="item_grid" v-for="(i,index) in carousellist" :key="index">
							<!-- <image src="/static/images.png" mode="widthFix" ></image> -->
							<image :src="i.cover" ></image>
						</swiper-item>
					</swiper>
				</view>
				<!--  -->
				<view class="cont_image_list">
					<view class="image_left">
						<image src="/static/index/left_top.png" mode="widthFix" @click="onimageclick(1)"></image>
						<image src="/static/index/left_bottom.png" mode="widthFix" @click="onimageclick(2)"></image>
					</view>
					<view class="image_content">
						<image src="/static/index/comment_image.png" mode="widthFix" @click="onimageclick(5)"></image>
					</view>
					<view class="image_right">
						<image src="/static/index/right_top.png" mode="widthFix" @click="onimageclick(3)"></image>
						<image src="/static/index/right_bottom.png" mode="widthFix" @click="onimageclick(4)"></image>
					</view>
				</view>

				<!-- 列表 -->
				<view class="cont_list">
					<view class="cont_list_item" v-for="(i,index) in goodslist" :key="index"
						@click="goodsdetails(i.good_id)">
						<view class="list_item_left">
							<image :src="i.cover" mode=""></image>
						</view>
						<view class="list_item_right">
							<view class="title">
								{{i.title}}
							</view>
							<view class="bottom">
								<view class="ts">
									{{i.sub_title}}
								</view>
								<view class="m">
									<text>￥</text><text>{{i.desc}}</text>
								</view>
								<view class="b">
									<text>近期{{i.commentcount}}+条评论</text><text>{{i.haorate}}%好评</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view-tabbar :current="0"></view-tabbar>
	</view>
</template>

<script>
	import Tabbar from '../../components/tabbar/index.vue'
	export default {
		data() {
			return {
				keyword: '',
				horizontallist: [],
				classificationlist: [{}, {}],
				classificationnum: 2,
				carousellist: [],
				goodslist: [],
				msnum: '',
				code:''
			}
		},
		components: {
			'view-tabbar': Tabbar
		},
		onLoad(opent) {
			console.log(this.classificationlist,'111');
			// 首页分类
			this.ongetShopCate();
			// 轮播公告
			this.getnoticeIndex();
			// 首页轮播图
			this.getcarousel();
			// 首页热门分类
			this.gethotGoods();
			console.log(this.show);
			
			let local = encodeURIComponent(window.location.href);
			let code = this.getUrlCode('code')
			this.code = code
			if(!code){
				this.isWeixin = this.isWechat()
				if(this.isWeixin){
					this.getcode()
					this.checkWeChatCode()//通过微信官方接口获取code之后，会重新刷新设置的回调地址【redirect_uri】
				}
			}
		},
		onShow() {
			// 未读数量
			this.ongetShopCate();
			console.log(this.classificationlist)
			this.getmessagenum();
			this.onIndex()
		},
		methods: {
			isWechat() {
				return String(navigator.userAgent.toLowerCase().match(/MicroMessenger/i)) === "micromessenger";
			},
			//方法:用来提取code
			getUrlCode(name) {
				return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1]
					.replace(/\+/g, '%20')) || null
			},
			//检查浏览器地址栏中微信接口返回的code
			checkWeChatCode() {
				let code = this.getUrlCode('code')
				if (code) {
					// this.getOpenidAndUserinfo(code)
					this.code = code
				}
			},
			//请求微信接口，用来获取code
			getcode() {
				// window.location.href ='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx94ea2fc5bddfb711&redirect_uri=https%3A%2F%2Fyhzcgw.dd371.com&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
				// 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx45a52b09d943be04&response_type=code&scope=snsapi_base&state=1&redirect_uri=https://www.yin10000.com#wechat_redirect'
				// window.location.href ='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx94ea2fc5bddfb711&redirect_uri=https%3A%2F%2Fyinduoduo.dd371.com&response_type=code&scope=snsapi_base&state=1#wechat_re'
				let local = encodeURIComponent(window.location.href); //获取当前页面地址作为回调地址
				let appid = 'wx94ea2fc5bddfb711'
				//通过微信官方接口获取code之后，会重新刷新设置的回调地址【redirect_uri】
				window.location.href =
					"https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
					appid + 
					"&redirect_uri=" +
					local +
					"&response_type=code&scope=snsapi_base&state=1#wechat_redirect";
			},
			onIndex(){
				let token = uni.getStorageSync('userinfo').token
				if(token&& this.code!= null){
					this.$u.post('index/index',{
						code:this.code
					}).then(res =>{
						console.log(res,'onindex')
					})
				}
			},
			
			
			
			
			search(e){
				console.log(e);
				this.keyword = ''
				uni.navigateTo({
					url:'/pages/list/index?keyword='+e
				})
			},
			
			// 分类
			ongetShopCate() {
				this.$u.get(this.api.getShopCate).then(res => {
					if (res.code == 1) {
						let temp = [];
						let ranm = [];
						res.data.forEach((item, index) => {
							if (index % 11) {
								temp.push(item)
							} else {
								ranm.push(item)
							}
						})
						this.classificationlist[0] = {
							'list': temp
						};
						this.classificationlist[1] = {
							'list': ranm
						};
						// this.$set(this.classificationlist,this.classificationlist,this.classificationlist)
						// classificationnum
						// console.log(res.data.length%10);
					}
				})
			},
			// 公告
			getnoticeIndex() {
				this.$u.get(this.api.noticeIndex).then(res => {
					if (res.code == 1) {
						res.data.forEach((item, index) => {
							let text = item.title;
							this.horizontallist.push(text)
						})
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			},
			// 轮播
			getcarousel() {
				this.$u.get(this.api.carousel).then(res => {
					// console.log(res);
					if (res.code == 1) {
						this.carousellist = res.data;
					}
				})
			},
			// 首页热门
			gethotGoods() {
				let data = {
					page: 1,
					pagesize: 60
				}
				this.$u.post(this.api.hotGoods, data).then(res => {
					if (res.code == 1) {
						console.log(res.data,'goodsList')
						this.goodslist = res.data
					}
				})
			},
			getmessagenum() {
				let uid = uni.getStorageSync('userinfo').user_id
				this.$u.get(this.api.messagenum, {
					uid: uid
				}).then(res => {
					this.msnum = res.data
				})
			},
			/**
			 * 1,行业精选，2专属商城
			 * 3.限时秒杀 4积分商城 5我的订单
			 */
			onimageclick(index) {
				if (index == 1) {
					uni.navigateTo({
						url: '/pages/choiceness/index'
					})
				} else if (index == 2) {
					uni.navigateTo({
						url: '/pages/exclusive/index'
					})
				} else if (index == 3) {
					uni.navigateTo({
						url: '/pages/integral_Shopping/index'
					})
				} else if (index == 4) {
					uni.navigateTo({
						url: '/pages/order/the_order/index'
					})
				} else if (index == 5) {
					uni.navigateTo({
						url: '/pages/Seconds_kill/index'
					})
				}
			},
			// 跳转分类
			classification(index,id) {
				console.log(index,id);
				if(id == 14){
					index = -1
				}
				console.log(index)
				const index1 = parseInt(index)
				uni.reLaunch({
					url: '/pages/shop/index?index=' + index
				})
			},
			// 订单详情
			goodsdetails(id) {
				uni.navigateTo({
					url: '/pages/goods_details/selection/index?id=' + id
				})
			},
			//我的消息
			goMessage(){
				uni.navigateTo({
					url:'/pages/user/my_message/index'
				})
				
			},
		}
	}
</script>

<style lang="less">
	.index_in {
		height: calc(100vh - 50px);

		.index_hone_logo {
			width: 136rpx;
			height: 48rpx;
			padding: 10rpx;
			box-sizing: content-box;
		}

		.index_hone {
			height: 230rpx;
			padding: 32rpx;
			background: linear-gradient(rgba(255, 129, 9, 0.80) 0%, rgba(239, 239, 239, 0.80) 100%);

			.shopping_search {
				display: flex;
				padding: 10rpx 0;

				.left {
					width: 84%;
				}

				.right {
					width: 16%;
					text-align: center;

					.right_text {
						font-size: 20rpx;
						color: #FFFFFF;
					}
				}
			}
		}

		.index_content {
			height: calc(100% - 230rpx);
			background-color: #efefef;

			overflow: hidden;
			overflow-y: auto;

			.cont_swiper {
				.cont_swiper_item {
					height: 360rpx;

					.item_grid {
						display: flex;
						flex-wrap: wrap;
						padding: 0 22rpx;
						box-sizing: border-box;

						.grid {
							width: 20%;
							text-align: center;
							font-size: 28rpx;
							color: #333333;
							font-weight: 500;
							padding: 10rpx;

							.grid_image {
								width: 120rpx;
								height: 106rpx;
							}

							.grid_text {
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
								text-align: center;
							}
						}
					}
				}

			}

			.cont_NoticeBar {
				padding: 20rpx 32rpx;
				display: flex;

				.cont_nb_icon {
					padding-right: 10rpx;
					display: flex;
				}
			}

			.cont_image {
				padding: 0 32rpx;

				image {
					height: 230rpx;
					border-radius: 10rpx;
					overflow: hidden;
				}
			}

			.cont_image_list {
				display: flex;
				padding: 0 32rpx 20rpx 32rpx;
				align-items: center;

				.image_left {
					width: 35%;
				}

				.image_content {
					width: 30%;
					display: flex;

				}

				.image_right {
					width: 35%;
				}
			}

			.cont_list {
				padding: 0 32rpx;
				margin-bottom: 20rpx;

				.cont_list_item {
					background-color: #FFFFFF;
					border-bottom: 1rpx solid #D4D2D2;
					padding: 18rpx;
					display: flex;

					.list_item_left {
						width: 276rpx;
						height: 276rpx;
					}

					.list_item_right {
						padding-left: 30rpx;
						width: 54%;
						display: flex;
						flex-wrap: wrap;

						.title {
							font-size: 28rpx;
							color: #333333;
							font-weight: 500;
							line-height: 40rpx;
							display: inline-block;
						}

						.bottom {
							display: flex;
							flex-wrap: wrap;
							align-items: center;
							align-content: flex-end;

							.ts {
								font-size: 22rpx;
								color: #B82626;
								width: 100%;
							}

							.m {
								color: #CE3030;
								width: 100%;

								text:nth-child(1) {
									font-size: 24rpx;
								}

								text:nth-child(2) {
									font-size: 40rpx;
								}
							}

							.b {
								width: 100%;
								font-size: 18rpx;
								color: #666666;
							}
						}
					}
				}
			}
		}
	}
</style>
<style>
	.cont_swiper /deep/ .uni-swiper-dots {
		bottom: 0 !important;
	}

	.cont_swiper /deep/ .uni-swiper-dot {
		margin: 0 !important;
		width: 80rpx !important;
		height: 8rpx !important;
		border-radius: 0 !important;
	}

	.cont_NoticeBar /deep/ .u-notice-bar {
		padding: 12rpx 14rpx !important;
	}
</style>

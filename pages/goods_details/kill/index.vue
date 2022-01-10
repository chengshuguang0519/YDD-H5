<template>
	<view class="goods">
		<!-- 轮播 -->
		<view class="goods_content">
			<view class="goods_swiper">
				<swiper class="swiper" :indicator-dots="true" indicator-active-color="#fff" :autoplay="true"
					:circular="true">
					<swiper-item v-for="(i,index) in dataobj.banner_image" :key="index">
						<view class="swiper-item">
							<image :src="i" mode=""></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="goods_one">
				<view>{{dataobj.title}}</view>
				<view>
					<!-- <view>
						<view><text>￥{{dataobj.market_price}}</text><text>/张</text></view>
						<view>￥{{dataobj.price}}/张</view>
					</view> -->
					<view>
						<view>
							<text>零售价：</text>
							<text>￥{{Number(dataobj.price).toFixed(2)}}</text>
							<!-- <text>零售价：￥{{getobj.price}}</text>
							<text>/张</text>
							<text>出厂价：￥{{getobj.market_price}}</text> -->
						</view>
						<view v-if="type==2||type==3||type==4||type==5">
							<text>出厂价：</text>
							<text>￥{{Number(dataobj.market_price).toFixed(2)}}</text>
						</view>
						<!-- <view>￥0.20/张</view> -->
					</view>
					<view>销量{{dataobj.sale}}</view>
				</view>
				<view>
					<view v-for="(i,index) in tfea" :key="index" style="display: flex;">
						<u-icon :name="i.mini_cover" size="20" color="#ED9829"></u-icon><text>{{i.title}}</text>
					</view>
				</view>
			</view>

			<view class="goods_two">
				<view>
					<!-- <u-form-item label="规格">
						<u-cell-item title="300克双铜版纸-90*54mm-盒（100张）" :border-bottom="false"></u-cell-item>
					</u-form-item> -->
					<u-form-item label="配送" >
						<u-cell-item :title="address" :arrow="false"  :border-bottom="false" @click="navaddress"></u-cell-item>
					</u-form-item>

				</view>
			<!-- 	<view>
					<u-form-item label-width="auto" label="印刷文件">
						<u-cell-item title="请选择印刷文件" :border-bottom="false"></u-cell-item>
					</u-form-item>
				</view> -->
			</view>

			<view class="goods_three">
				<u-cell-item :title="'商品评论('+datacommentunm+'）'" :title-style="{'font-size':'32rpx','color':'30rpx','font-weight': '700'}"
					:border-bottom="false" value="更多" @click='goComment(dataobj.id)'></u-cell-item>
				<view class="goods_criticize" v-for="(i,index) in datacomment" :key="index" v-if="index<2">
					<view class="goods_name">
						<view class="left">
							<view class="image">
								<image :src="i.headimg" mode=""></image>
							</view>
							<view class="user">
								<view>{{i.nickname}}</view>
								<view>{{i.create_time}}</view>
							</view>
						</view>
						<view class="right">
							<u-rate :count="count" v-model="i.level" active-color="#F79C22" :disabled="true"></u-rate>
						</view>
					</view>
					<view class="contnet">
						{{i.content}}
					</view>
				</view>
			</view>

			<view class="goods_four">
				<u-cell-item title="商品详情" :title-style="{'font-size':'32rpx','color':'30rpx','font-weight': '700'}"
					:border-bottom="false" :arrow="false"></u-cell-item>
				<view class="goods_four_content">
					<u-parse :html="dataobj.content"></u-parse>
				</view>
			</view>

			<!-- <view class="goods_five">
				<view class="bottom-tltle">
					你可能还喜欢
				</view>
				<thelist></thelist>
			</view> -->
		</view>
		
		<view class="goods_bottom">
			<view class="goods_bottom_left">
			<!-- 	<view @click="jump(0)">
					<view><u-icon name="home-fill"></u-icon></view>
					<text>首页</text>
				</view>
				<view @click="jump(1)">
					<view><u-icon name="shopping-cart-fill"></u-icon></view>
					<text>购物车</text>
				</view> -->
				<view @click="collentGoods(dataobj.id)">
					<view>
						<u-icon name="heart" v-if="collent"></u-icon>
						<u-icon name="heart" v-else style="color: orange;"> </u-icon>
					</view>
					<u-toast ref="uToast" />
					<text>收藏</text>
				</view>
				<view @click="jump(3)">
					<view><u-icon name="kefu-ermai"></u-icon></view>
					<text>聊天</text>
				</view>
			</view>
			<view class="goods_bottom_right">
				<!-- show=true -->
				<view class="btn" @click="immediately">立即秒杀</view>
			</view>
		</view>
		
		<u-popup v-model="show" mode="bottom">
			<view class="popup">
				<view class="popup_top">
					<view>
						<image :src="dataobj.banner_image[0]" mode=""></image>
					</view>
					<view class="">
						<view>
							<view>{{dataobj.spec?dataobj.spec:dataobj.title}}</view>
							<view>¥{{dataobj.price?dataobj.price:dataobj.price}}</view>
						</view>
						<view class="">
							<u-number-box v-model="unmvule" @change="valChange"></u-number-box>
						</view>
					</view>
				</view>
				
				<view class="popup_bottom">
					<view>立即秒杀</view>
				</view>
			</view>
		</u-popup>
		
	</view>
</template>

<script>
	import the_list from '../../../components/the_list/index.vue'
	import {isWeixin} from '../../../common/isWatch.js'
	export default {
		data() {
			return {
				count: 5,
				dataobj:{},
				content: `
					<p>露从今夜白，月是故乡明</p>
					<img src="https://cdn.uviewui.com/uview/swiper/2.jpg" />
				`,
				collent:true,
				id:'',
				tfea:[],
				address:'',
				datacommentunm:0,
				datacomment:[],
				show:false,
				unmvule:1,
				type:''
			}
		},
		components: {
			'thelist': the_list
		},
		onLoad(opent) {
			this.id = opent.id;
			this.onScoreGoodDetail();
			this.onScoreComment();
			this.getfea();
			this.type = uni.getStorageSync('userinfo').type
		},
		onShow() {
			this.showgetDefaultAddress()
		},
		methods: {
			showgetDefaultAddress(){
				this.$u.get(this.api.getDefaultAddress).then(res=>{
					console.log(res)
					if(res.code == 1){
						this.address = res.data.province+res.data.city+res.data.area+res.data.address
					}
				})
			},
			navaddress(){
				uni.navigateTo({
					url:'/pages/Shipping_address/index'
				})
			},
			onScoreGoodDetail(){
				this.$u.post(this.api.ScoreGoodDetail,{id:this.id}).then(res=>{
					if(res.code == 1){
						this.dataobj = res.data
					}
				})
			},
			onScoreComment(){
				this.$u.post(this.api.ScoreComment,{id:this.id}).then(res=>{
					if(res.code == 1){
						this.datacomment = res.data
						this.datacommentunm = res.data.length
					}
				})
			},
			jump(index){
				if(index == 0){
					uni.switchTab({
						url:'/pages/index/index'
					})
				}else if(index == 1){
					uni.switchTab({
						url:'/pages/shopping/index'
					})
				}else if(index == 2){
				}else{
					let url ='https://admin.qidian.qq.com/template/blue/mp/menu/qr-code-jump.html?linkType=0&env=ol&kfuin=2355064841&fid=538&key=8f15177d105f759fe0d97f6ff0eee30a&cate=1&source=1&isLBS=0&isCustomEntry=0&type=16&ftype=1&_type=wpa&qidian=true'
					window.open(url)
				}
			},
			getfea(){
				this.$u.get(this.api.getfeature).then(res=>{
					if(res.code == 1){
						this.tfea = res.data
					}
				})
			},
			valChange(e){
				this.unmvule = e.value;
			},
			immediately(){
				
				// this.$u.get(this.api.getConfirm,{id:this.dataobj.id,num:this.unmvule}).then(res=>{
				// })
				// uni.navigateTo({
				// 	url:'/pages/order/advance_order?id='+this.dataobj.id+'&num='+this.unmvule
				// })
				
				// uni.navigateTo({
				// 	url:'/pages/order/advance_order/index?type=2&id='+this.dataobj.id+'&num='+this.unmvule
				// })
				if(isWeixin()){
					uni.navigateTo({
						url:'/pages/order/advance_order/index?type=2&id='+this.dataobj.id+'&num='+this.unmvule
					})
				}else{
					uni.navigateTo({
						url:'../GoWatch/GoWatch'
					})
				}
			},// 商品收藏
			collentGoods(id) {
				const userInfo = uni.getStorageSync('userinfo')
				console.log(userInfo)
				if(userInfo !==''){
					this.$u.get(`index/getLike?goods_id=${id}`).then(res => {
						console.log(res)	
						if(this.collent){
							this.collent =!this.collent
							this.$refs.uToast.show({
								title: '收藏成功',
								type: 'none',
							})
						}else{
							this.collent =!this.collent
							this.$refs.uToast.show({
								title: '取消收藏成功',
								type: 'none',
							})
						}
					})
				}else{
					uni.showModal({
					    title: '温馨提示',
					    content: '是否前往登录',
					    success: function (res) {
					        if (res.confirm) {
					            console.log('去登录');
								uni.navigateTo({
									url:'/pages/userLogin/login'
								})
					        } else if (res.cancel) {
					            console.log('取消登录');			
					        }
					    }
					});
				}				
			},
			goComment(id){
				uni.navigateTo({
					url:"/pages/allcomments/index?good_id="+id
				})
			}
		}
	}
</script>

<style lang="less">
	.popup{
		padding: 32rpx;
		.popup_top{
			display: flex;
			align-items: flex-start;
			&>view:nth-child(1){
				width: 192rpx;
				height: 166rpx;
			}
			&>view:nth-child(2)>view:nth-child(1){
				padding-left: 20rpx;
				padding-bottom:20rpx;
				&>view:nth-child(1){
					font-size: 30rpx;
					color: #333333;
					font-weight: 700;
				}
				&>view:nth-child(2){
					font-size: 24rpx;
					color: #FF3000;
				}
			}
			&>view:nth-child(2)>view:nth-child(2){
				padding-left: 20rpx;
				padding-top:20rpx;
			}
		}
		.popup_bottom{
			view{
				
			}
		}
	}
	.goods {
		background-color: #F7F7F7;

		.swiper {
			height: 750rpx;
		}

		.swiper-item {
			height: 100%;
			position: relative;

			.swiper-item_time {
				position: absolute;
				display: flex;
				align-items: center;
				left: 42%;
				margin: 0 auto;
				justify-content: center;
				bottom: 6%;
				background: #88CEC2;
				border-radius: 28rpx;
				padding: 6rpx 10rpx;
			}
		}

		.goods_one {
			padding: 40rpx 32rpx;
			background: #fff;

			&>view:nth-child(1) {
				font-size: 34rpx;
				color: #333333;
				font-weight: 700;
			}
			
			&>view:nth-child(2) {
				display: flex;
				justify-content: space-between;
				padding-top: 42rpx;
				align-items: flex-end;
				padding-bottom: 32rpx;
			
				&>view:nth-child(1) {
					display: flex;
					align-items: flex-end;
					
					&>view:nth-child(1) {
						margin-right: 90rpx;
						&>text:nth-child(1) {
							font-size: 24rpx;
							color: #999899;
						}
			
						&>text:nth-child(2) {
							font-size: 30rpx;
							color:#E94726;
							font-weight: 700;
						}
					}
			
					// &>view:nth-child(2) {
					// 	font-size: 26rpx;
					// 	color: #999899;
					// 	font-weight: 500;
					// 	padding-left: 32rpx;
					// 	text-decoration: line-through;
					// }
					&>view:nth-child(2) {
						&>text:nth-child(1) {
							font-size: 24rpx;
							color: #999899;
						}
					
						&>text:nth-child(2) {
							font-size: 30rpx;
							color:#E94726;
							font-weight: 700;
						}
					}
					
				}
			
				&>view:nth-child(2) {
					font-size: 24rpx;
					color: #999899;
					font-weight: 500;
				}
			}
			// &>view:nth-child(2) {
			// 	display: flex;
			// 	justify-content: space-between;
			// 	padding-top: 42rpx;
			// 	align-items: flex-end;
			// 	padding-bottom: 32rpx;

			// 	&>view:nth-child(1) {
			// 		display: flex;
			// 		align-items: flex-end;

			// 		&>view:nth-child(1) {
			// 			&>text:nth-child(1) {
			// 				font-size: 44rpx;
			// 				color: #E94726;
			// 				font-weight: 700;
			// 			}

			// 			&>text:nth-child(2) {
			// 				font-size: 24rpx;
			// 				color: #999899;
			// 				font-weight: 700;
			// 			}
			// 		}

			// 		&>view:nth-child(2) {
			// 			font-size: 26rpx;
			// 			color: #999899;
			// 			font-weight: 500;
			// 			padding-left: 32rpx;
			// 			text-decoration: line-through;
			// 		}
			// 	}

			// 	&>view:nth-child(2) {
			// 		font-size: 24rpx;
			// 		color: #999899;
			// 		font-weight: 500;
			// 	}
			// }

			&>view:nth-child(3) {
				display: flex;
				justify-content: space-between;
				padding-top: 32rpx;
				border-top: 2rpx solid #EEEEEE;
				color: #999899;
				font-size: 24rpx;
			}
		}

		.goods_two {
			&>view:nth-child(1) {
				background-color: #FFFFFF;
				padding: 0 32rpx;
				margin: 20rpx 0;
			}

			&>view:nth-child(2) {
				background-color: #FFFFFF;
				padding: 0 32rpx;
				margin: 20rpx 0;
			}
		}

		.goods_three {
			padding: 32rpx;
			background-color: #FFFFFF;

			.goods_criticize {
				padding-top: 50rpx;

				.goods_name {
					display: flex;
					justify-content: space-between;

					.left {
						display: flex;

						.image {
							width: 64rpx;
							height: 64rpx;
							border-radius: 50%;
							overflow: hidden;
						}

						.user {
							padding-left: 16rpx;

							&>view:nth-child(1) {
								font-size: 28rpx;
								color: #333333;
								font-weight: 700;
							}

							&>view:nth-child(2) {
								font-size: 24rpx;
								color: #999999;
								font-weight: 500;
							}
						}
					}
				}

				.contnet {
					padding-top: 24rpx;
					font-size: 28rpx;
					color: #333333;
					line-height: 44rpx;

				}
			}
		}

		.goods_four {
			margin-top: 20rpx;
			padding: 32rpx;
			background-color: #FFFFFF;

			.goods_four_content {
				padding-top: 20rpx;
			}
		}

		.goods_five {
			padding: 32rpx;

			.bottom-tltle {
				text-align: center;
				font-size: 32rpx;
				font-weight: 700;
			}
		}
	}
	
	.u-cell {
		padding: 0 !important;
	}
	
	.goods_content{
		padding-bottom: 98rpx;
	}
	
	.goods_bottom {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #FFFFFF;
		height: 98rpx;
		display: flex;
		justify-content: space-between;
		padding: 0 32rpx;
		align-items: center;
		z-index: 9;
		.goods_bottom_left{
			display: flex;
			width: 40%;
			justify-content: space-between;
			&>view{
				text-align: center;
			}
		}
		.goods_bottom_right{
			width: 100%;
			padding-left: 62rpx;
			.btn{
				width: 100%;
				height: 72rpx;
				background-color: #FF3000;
				color: #FFFFFF;
				font-size: 28rpx;
				text-align: center;
				line-height: 72rpx;
				border-radius: 36rpx;
			}
		}
	}
</style>

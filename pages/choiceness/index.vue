<template>
	<view class="choiceness">
		<view class="choiceness_search">
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
				<u-badge v-if="msnum" type="error" :count="msnum" :offset='[16,36]'></u-badge>
			</view>
		</view>
		
		<view class="choiceness_content">
			<block v-for="(i,index) in listdata" :key="index" v-if="iconshow">
				<view :class="index==0?'choiceness_title choiceness_titlea':'choiceness_title choiceness_titleb'">
					<view>
						<text>{{i.title}}</text><text>Medical industry</text>
					</view>
					<view v-if="index == 0">
						<view class="">
							<view class="" @click="sgaixuans">
								<text>{{title}}</text><u-icon name="arrow-down"></u-icon>
							</view>
							
							<view class="" v-show="sgaixuan">
								<view class="" @click="titleclick()">
									行业筛选
								</view>
								<view class="" v-for="(i,rindex) in classification" :key='rindex' @click="titleclick(i)">
									{{i.label}}
								</view>
							</view>
						</view>
						<u-icon name="grid" size="40" v-if="iconshow" @click="switche(0)"></u-icon>
						<u-icon name="list" size="40" v-else @click="switche(1)"></u-icon>
					</view>
				</view>
				<view class="list">
					<view class="list_item" v-for="(r,indexs) in i.list" :key="indexs" @click="ondetails(r)">
						<view class="iten_image">
							<image :src="r.cover_image" mode=""></image>
						</view>
						<view class="item_text_content">
							<view>{{r.title}}</view>
							<view>{{r.tagsname}}</view>
							<view><text>￥{{r.price}}</text><text>/张</text></view>
						</view>
					</view>
				</view>
			</block>
			<block v-for="(i,indext) in listdata" :key="indext" v-if="!iconshow">
				<view :class="indext==0?'choiceness_title choiceness_titlea':'choiceness_title choiceness_titleb'">
					<view>
						<text>{{i.title}}</text><text>Medical industry</text>
					</view>
					<view v-if="indext == 0">
						<view class="">
							<view class="" @click="sgaixuans">
								<text>{{title}}</text><u-icon name="arrow-down"></u-icon>
							</view>
							
							<view class="" v-show="sgaixuan">
								<view class="" @click="titleclick()">
									行业筛选
								</view>
								<view class="" v-for="(i,index) in classification" :key='index' @click="titleclick(i)">
									{{i.label}}
								</view>
							</view>
						</view>
						<u-icon name="grid" size="40" v-if="iconshow" @click="switche(0)"></u-icon>
						<u-icon name="list" size="40" v-else @click="switche(1)"></u-icon>
					</view>
				</view>
				<view class="lists">
					<view class="list_items" v-for="(r,index) in i.list" :key="index" @click="ondetails(r)">
						<view class="iten_image">
							<image :src="r.cover_image" mode=""></image>
						</view>
						<view class="item_text_content">
							<view>
								<view>{{r.title}}</view>
								<view>{{r.tagsname}}</view>
							</view>
							<view>
								<view><text>￥{{r.price}}</text><text>/张</text></view>
								<view >
									<u-icon name="shopping-cart-fill"></u-icon>
									<text>去选购</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword:'',
				iconshow:true,
				sgaixuan:false,
				classification:[],
				listdata:[],
				title:'行业筛选',
				edu_id:'',
				msnum:''
			}
		},
		onLoad() {
			this.getclassification();
			this.geteducationGoodsList()
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
			getclassification(){
				this.$u.get(this.api.educationCates).then(res=>{
					if(res.code == 1){
						this.classification = res.data
					}
				})
			},
			geteducationGoodsList(){
				let data ={
					page:1,
					pagesize:20,
					edu_id:this.edu_id,
					title:''
				}
				this.$u.post(this.api.educationGoodsList,data).then(res=>{
					if(res.code == 1){
						if(this.edu_id){
							console.log(true);
							this.listdata = [res.data]
						}else{
							console.log(false);
							this.listdata = res.data.list
						}
					}
				})
			},
			getmessagenum(){
				let uid = uni.getStorageSync('userinfo').user_id
				this.$u.get(this.api.messagenum,{uid:uid}).then(res=>{
					this.msnum = res.data
				})
			},
			titleclick(i){
				console.log(i);
				if(i){
					this.title = i.label;
					this.edu_id = i.value;
					this.sgaixuan = false;
				}else{
					this.title = '行业筛选';
					this.edu_id = '';
					this.sgaixuan = false;
				}
				this.geteducationGoodsList()
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
			navBack(){
				uni.navigateBack()
			},
			switche(e){
				console.log(e)
				if(e == 0){
					this.iconshow = false
				}else{
					this.iconshow = true
				}
			},
			sgaixuans(){
				if(this.sgaixuan){
					this.sgaixuan = false
				}else{
					this.sgaixuan = true
				}
			},
			// 
			ondetails(i){
				console.log(i)
				uni.navigateTo({
					url:'/pages/goods_details/selection/index?id='+i.good_id
				})
			}
		}
	}
</script>

<style lang="less">
	.choiceness{
		background-color: #EFEFEF;
		.choiceness_search{
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
		.choiceness_content{
			height: calc(100vh - 50px);
			background-color: #F7F7F7;
			overflow: hidden;
			overflow-y: auto;
			padding: 32rpx;
			.choiceness_title{
				display: flex;
				justify-content: space-between;
				padding: 23rpx 0 23rpx 16rpx;
				position: relative;
				&>view:nth-child(1){
					text:nth-child(1){
						font-size: 30rpx;
						color: #666666;
						font-weight: bold;
						margin-left: -3rpx;
					}
					text:nth-child(2){
						font-size: 18rpx;
						color: #666666;
						font-weight: bold;
						margin-left: 10rpx;
					}
				}
				&>view:nth-child(1){
					display: flex;
					align-items: center;
				}
				&>view:nth-child(2){
					display: flex;
					&>view:nth-child(1){
						margin-right: 10rpx;
						background-color: #FFFFFF;
						border-radius: 10rpx;
						padding:12rpx 8rpx;
						// width: 176rpx;
						text-align: center;
						color: #666666;
						position: relative;
						&>view:nth-child(1){
							border-bottom: 2rpx solid #1B967A;
							height: 40rpx;
							text{
								padding-right: 10rpx;
							}
						}
						&>view:nth-child(2){
							position: absolute;
							z-index: 999;
							background: rgb(255, 255, 255);
							left: 0px;
							right: 0px;
							view{
								color: #6B6B6B;
								font-size: 24rpx;
								font-weight: 500;
								padding: 20rpx;
								border-bottom: 1rpx solid #D4D4D4;
							}
						}
					}
					
				}
			}
			.choiceness_titlea::after{
				content: '';
				position: absolute;
				width: 8rpx;
				height:50rpx ;
				top: 25%;
				bottom: 25%;
				left: 0rpx;
				background-color: #FF8109;
			}
			.choiceness_titleb::after{
				content: '';
				position: absolute;
				width: 8rpx;
				top: 25%;
				bottom: 25%;
				left: 0;
				background-color: #1B967A;
			}
			.list{
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				
				.list_item{
					width: 49%;
					height: 498rpx;
					background-color: #FFFFFF;
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
						}
						view:nth-child(3){
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
			.lists{
				width: 100%;
				// height: 264rpx;
				margin-bottom: 20rpx;
				border-radius: 10rpx;
				overflow: hidden;
				.list_items{
					display: flex;
					height: 264rpx;
					padding: 18rpx;
					margin-bottom: 20rpx;
					background-color: #FFFFFF;
					.iten_image{
						height: 228rpx;
						width: 228rpx;
					}
					.item_text_content{
						padding: 22rpx 16rpx;
						width: 64%;
						display: grid;
						align-items: flex-start;
						align-content: space-between;
						&>view:nth-child(1) view:nth-child(1){
							font-size: 28rpx;
							color: #323333;
							font-weight: 700;
						}
						&>view:nth-child(1) view:nth-child(2){
							font-size: 24rpx;
							color: #999899;
							padding: 12rpx 0;
						}
						&>view:nth-child(2){
							display: flex;
							justify-content: space-between;
						}
						&>view:nth-child(2) view:nth-child(1){
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
						&>view:nth-child(2) view:nth-child(2){
							background-color: #ED2626;
							color: #fff;
							border-radius: 10rpx;
							padding: 4rpx 8rpx;
						}
					}
				}
			}
		}
	}
	
</style>

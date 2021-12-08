<template>
	<view class="address">
		<view class="address_list" v-if="true">
			<u-radio-group v-model="value" style="width: 100%;">
				<view class="list_item" v-for="(i,index) in list" :key="index">
					<view class="item">
						<view class="item_top">
							<view class="item_top_left">
								<u-radio active-color="#FE8109" :name="i.id" @change="radioChange(i.id)" ></u-radio>
							</view>
							<view class="item_top_content">
								<view class="">
									<text>{{i.name}}</text><text>{{i.phone}}</text>
								</view>
								<view class="">
									<text class="tab" v-if="i.is_default == 1">默认</text>
									<text>{{i.province}}{{i.city}}{{i.area}}{{i.address}}</text>
								</view>
							</view>
							<view class="item_top_right">
								<text @click="onaddress(i)">编辑</text>
							</view>
						</view>
						<view class="item_bottom">
							<view @click="setsetAddress(i.id)">
								设为默认地址
							</view>
							<view @click="del(i.id)">
								删除
							</view>
						</view>
					</view>
				</view>
			</u-radio-group>
			<view class="buttom">
				<view class="btn" @click="onaddress(0)">
					立即添加
				</view>
			</view>
		</view>
		<view class="address_empty" v-else>
			<u-empty text="您还没有添加收货地址~" icon-size="200" src="/static/user/address_empty.png"></u-empty>
			<view class="buttom">
				<view class="btn" @click="onaddress(0)">
					立即添加
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				value:1
			}
		},
		onShow() {
			this.getaddrList()
		},
		onLoad() {
			
		},
		methods: {
			getaddrList(){
				this.$u.get(this.api.addrList).then(res=>{
					if(res.code == 1){
						this.list = res.data;
						for (var i = 0; i < res.data.length; i++) {
							if(res.data[i].is_default == 1){
								this.value = res.data[i].id
							}
						}
					}
				})
			},
			radioChange(e){
				console.log(e);
				this.setsetAddress(e)
				this.value = e
			},
			setsetAddress(id){
				let data ={
					id:id
				}
				this.$u.post(this.api.setAddress,data).then(res=>{
					if(res.code==1){
						this.getaddrList();
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
					}
				})
			},
			del(id){
				let data={
					id:id
				}
				this.$u.post(this.api.delAddress,data).then(res=>{
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
					if(res.code==1){
						this.getaddrList();
					}
				})
			},
			onaddress(e) {
				if(e==0){
					uni.navigateTo({
						url: "address/index?type=0"
					})
				}else{
					uni.navigateTo({
						url: "address/index?type=1&id="+e.id
					})
				}
				
			}
		}
	}
</script>

<style lang="less">
	.address {
		height: calc(100vh - 44px);
		background-color: #EFEFEF;
		overflow: hidden;
		overflow-y: auto;
		.tab{
			border: 2rpx solid #FE8109;
			color: #FE8109;
			font-weight: 500;
			font-size: 20rpx;
			padding: 4rpx;
			display: inline-block;
			line-height: 20rpx;
		}
		.address_list {
			padding: 30rpx;
			.buttom {
				padding-top: 150rpx;
			
				.btn {
					width: 212rpx;
					height: 74rpx;
					background-color: #FE8109;
					border-radius: 36rpx;
					text-align: center;
					line-height: 74rpx;
					color: #FFFFFF;
					font-weight: 700;
					font-size: 36rpx;
					margin: 0 auto;
				}
			}
			.list_item {
				padding-bottom: 30rpx;
				width: 100%;

				.item {
					background-color: #FFFFFF;
					padding: 36rpx 36rpx 0 36rpx;
					border-radius: 10rpx;

					.item_bottom {
						display: flex;
						justify-content: space-around;
						font-weight: 500;
						font-size: 26rpx;
						color: #666666;
						padding: 20rpx 0 28rpx 0;
						border-top: 1rpx solid #BFBFBF;
					}
					.item_top_content{
						width: 79%;
					}
					.item_top{
						display: flex;
						align-items: center;
						padding-bottom: 22rpx;
						.item_top_right{
							padding-left: 10rpx;
							color: #FE8109;
							font-size: 24rpx;
						}
						.item_top_content{
							view:nth-child(1){
								color: #333333;
								font-size: 32rpx;
								font-weight: 700;
								text:nth-child(2){
									padding-left: 30rpx;
								}
							}
							view:nth-child(2){
								color: #666666;
								font-weight: 400;
								line-height: 40rpx;
								font-size: 28rpx;
								padding-top: 22rpx;
								text:nth-child(2){
									padding-left: 10rpx;
								}
							}
						}
					}
				}
			}
		}

		.address_empty {
			padding-top: 30%;

			.buttom {
				padding-top: 150rpx;

				.btn {
					width: 212rpx;
					height: 74rpx;
					background-color: #FE8109;
					border-radius: 36rpx;
					text-align: center;
					line-height: 74rpx;
					color: #FFFFFF;
					font-weight: 700;
					font-size: 36rpx;
					margin: 0 auto;
				}
			}
		}
	}
</style>

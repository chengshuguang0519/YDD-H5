<template>
	<view class="eval">
		<view class="eval_car">
			<view class="eval_car_left">
				<view class="image">
					<image :src="objdata.good_snap.cover_image" mode=""></image>
				</view>
			</view>
			<view class="eval_car_right">
				<view class="top">
					<view>{{objdata.good_snap.title}}</view>
					<view>{{objdata.good_snap.sample_name}}</view>
				</view>
				<view class="bottom">
					<text>￥{{objdata.good_snap.good_price}}</text>
					<text>x{{objdata.good_snap.num}}</text>
				</view>
			</view>
		</view>
		<view class="" style="padding: 28rpx;">
			<text style="color: #999999;font-size: 30rpx;padding-right: 10rpx;">商品质量</text><u-rate :count="5" v-model="level" active-color="#FF8109" ></u-rate>
		</view>
		<view class="">
			<u-field type="textarea" v-model="content" :auto-height="false" label-width="0"
				:field-style="{'height':'250rpx','background':'#F6F6F5','padding':'20rpx'}"
				:clearable="false"
				placeholder="说说哪里满意，帮大家选择">
			</u-field>
		</view>
		
		
		<view class="btn">
			<view @click="submit">发表</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				objdata:{},
				content:'',
				level:0
			}
		},
		onLoad(opent) {
			this.loadData(opent);
		},
		methods: {
			loadData(opent){
				console.log(opent);
				this.$u.post(this.api.getOrderDetail,opent).then(res=>{
					if(res.code == 1){
						this.objdata = res.data
					}
				})
			},
			submit(){
				let data = {
					order_id:this.objdata.express[0].order_id,
					content:this.content,
					level:this.level
				}
				this.$u.post(this.api.setCommont,data).then(res=>{
					console.log(res);
					if(res.code == 1){
						uni.navigateBack({
							delta:1
						})
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.eval {
		.eval_car {
			padding: 32rpx;
			display: flex;

			.eval_car_left {

				.image {
					width: 200rpx;
					height: 200rpx;
				}
			}

			.eval_car_right {
				padding-left: 13px;
				width: 80%;
				display: inline-grid;
				align-content: space-between;

				.top {
					&>view:nth-child(1) {
						font-size: 30rpx;
						color: #333333;
						font-weight: 700;
					}

					&>view:nth-child(2) {
						font-size: 24rpx;
						color: #666666;
						font-weight: 700;
						padding-top: 30rpx;
					}
				}

				.bottom {
					display: flex;
					justify-content: space-between;
					font-size: 30rpx;
					font-weight: 700;
					color: #333333;
				}
			}
		}
		.btn{
			padding-top: 180rpx;
			view{
				width: 300rpx;
				height: 70rpx;
				line-height: 70rpx;
				background-color: #FF8109;
				text-align: center;
				color: #FFFFFF;
				border-radius: 36rpx;
				margin: 0 auto;
			}
		}
	}
</style>

<template>
	<view class="after_sales">
		<view class="order_carid_s">
			<view class="order_carid">
				<view class="titel">商品</view>
				<view class="carid_car">
					<view>
						<image :src="obj.good_snap.cover_image" mode=""></image>
					</view>
					<view>
						<view><text>{{obj.good_snap.title}}</text><text>￥{{obj.total_price}}</text></view>
						<view><text>{{obj.good_snap.spec_name}}</text><text>x{{obj.good_snap.num}}</text></view>
					</view>
				</view>
			</view>
		</view>
	<!-- 	<view class="after_s">
			<view class="after_s_r">
				<view class="titel">快递单号</view>
				<u-cell-item title="请填写快递单号" value="请选择" index="1" @click="oncellclick"></u-cell-item>
				<u-cell-item title="自动匹配快递公司"  :arrow="false" :value-style="{'color':'#FF0000'}">
				</u-cell-item>
			</view>
		</view> -->
		<view class="after_s">
			<view class="after_s_r">
				<view class="titel">退款说明</view>
				<u-field v-model="mobile" label-width="0" :field-style="{'height':'160rpx'}"
					placeholder="请简单说明退款原因.....">
				</u-field>
			</view>
		</view>

		<view class="after_s">
			<view class="after_s_r">
				<view class="titel">上传凭证</view>
				<u-upload ref="uUpload" max-count="3" :max-size="2 * 1024 * 1024" :action="action"   :before-upload="beforeUpload"></u-upload>
			</view>
		</view>

		<view class="fedback_top">
			<view class="fedbackg_btn" @click="determine">
				提交
			</view>
		</view>


		<u-popup v-model="show1" mode="bottom" border-radius="20":closeable="true">
			<view class="csspopup">
				<view class="titel" style="text-align: center;">货物状态</view>
				<u-radio-group v-model="value" @change="radioGroupChange" style="width: 100%;">
					<u-cell-item title="未收到货" :arrow="false">
						<u-radio></u-radio>
					</u-cell-item>
					<u-cell-item title="已收到货" :arrow="false">
						<u-radio></u-radio>
					</u-cell-item>
				</u-radio-group>
				<view class="fedback_top">
					<view class="fedbackg_btn">
						确定
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				action:'http://yinduoduo.dd371.com/api/common/upFile',
				show1: false,
				value:1,
				obj:{},
				images: [],
			}
		},
		onLoad(opent) {
			this.loadData(opent)
		},
		methods: {
			loadData(opent) {
				this.$u.post(this.api.getOrderDetail, {
					id: opent.id
				}).then(res => {
					if (res.code == 1) {
						this.obj = res.data
					}
				})
			},
			beforeUpload(index, list){
				console.log(index);
				console.log(list);
				var thia = this;
				this.images =[]
				for (var i = 0; i < list.length; i++) {
					  uni.uploadFile({
						url: thia.action, //仅为示例，非真实的接口地址
						filePath: list[i].url,
						name: 'file',
						success: (uploadFileRes) => {
							let list = JSON.parse(uploadFileRes.data)
							thia.images.push(list.data.url)
						}
					});
				}
			 
			},
			determine() {
				let data = {
					order_id: this.obj.id,
					type: 3,
					order_type: 1,
					desc: this.desc,
					images: this.images.join(',')
				}
				this.$u.post(this.api.postAfterSales,data).then(res=>{
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
			},
			oncellclick(e) {
				this.show1 = true
			}
		}
	}
</script>

<style lang="less">
	.titel {
		font-size: 32rpx;
		color: #333333;
		font-weight: 700;
		padding-bottom: 18rpx;
	}
	.csspopup{
		padding-top: 30rpx;
		padding-bottom: 50rpx;
	}
	.after_sales {
		height: calc(100vh - 50px);
		background-color: #ECE9E9;
		overflow: hidden;
		overflow-y: auto;

		.order_carid_s {
			padding: 20rpx 26rpx;

			.order_carid {
				padding: 24rpx;
				background-color: #FFFFFF;
				border-radius: 16rpx;

			

				.carid_car {

					display: flex;

					&>view:nth-child(1) {
						width: 202rpx;
						height: 202rpx;
					}

					&>view:nth-child(2) {
						width: 69%;
						padding-left: 26rpx;

						view {
							display: flex;
							justify-content: space-between;
						}

						view:nth-child(1) {
							font-size: 30rpx;
							color: #333333;
							font-weight: 700;
						}

						view:nth-child(2) {
							font-size: 26rpx;
							color: #666666;
							font-weight: 500;
							padding-top: 28rpx;
						}

						view:nth-child(3) {
							padding-top: 70rpx;

							text:nth-child(1) {
								font-size: 32rpx;
								color: #333333;
								font-weight: 500;
							}

							text:nth-child(2) {
								font-size: 32rpx;
								color: #666666;
								font-weight: 500;
							}
						}
					}
				}

				.carid_bottom {
					display: flex;
					justify-content: flex-end;

					view {
						margin-left: 10rpx;
						border: 2rpx solid #333333;
						border-radius: 26rpx;
						padding: 6rpx 30rpx;
					}
				}
			}
		}

		.after_s {
			padding: 20rpx 26rpx;

			.after_s_r {
				background-color: #FFFFFF;
				border-radius: 16rpx;
				padding: 18rpx 0;

				.titel {
					font-size: 32rpx;
					color: #333333;
					font-weight: 700;
					padding: 18rpx 26rpx;
				}
			}
		}
	}

	.fedback_top {
		padding-top: 20rpx;

		.fedback_top_conten {
			background-color: #FFFFFF;
			padding: 48rpx 32rpx;
		}

		.fedbackg_btn {
			background-color: #FF8109;
			width: 262rpx;
			height: 72rpx;
			line-height: 72rpx;
			border-radius: 36rpx;
			margin: 0 auto;
			text-align: center;
			font-weight: 700;
			font-size: 32rpx;
			color: #FFFFFF;
		}
	}

	.u-cell {
		padding-top: 10rpx;
		padding-bottom: 10rpx;
	}
</style>

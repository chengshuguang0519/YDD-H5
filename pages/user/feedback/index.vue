<template>
	<view class="fedback">
		<view class="fedback_top">
			<view class="fedback_top_conten">
				<view class="title">
					反馈内容
				</view>
				<u-field type="textarea" v-model="content" :auto-height="false" label-width="0" :field-style="{'height':'160rpx'}"   placeholder="描述一下，更容易解决您反馈的问题哦~">
				</u-field>
			</view>
		</view>
		
		<view class="fedback_top">
			<view class="fedback_top_conten">
				<view class="title">
					反馈内容
				</view>
				<u-field v-model="phone"  label-width="0"  placeholder="请输入联系方式">
				</u-field>
			</view>
		</view>
		
		<view class="fedback_top">
			<view class="fedback_top_conten">
				<view class="title">
					图片(不能超过2MB)
				</view>
				<u-upload ref="uUpload" max-count="1" :max-size="2 * 1024 * 1024" :action="action"   :before-upload="beforeUpload"></u-upload>
			</view>
		</view>
		<view class="fedback_top">
			<view class="fedbackg_btn" @click="addfeedback">
				提交
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content:'',
				phone:'',
				images:'',
				action:'http://yinduoduo.dd371.com/api/common/upFile'
			}
		},
		methods: {
			beforeUpload(index, list){
				console.log(list);
			    uni.uploadFile({
					url: this.action, //仅为示例，非真实的接口地址
					filePath: list[0].url,
					name: 'file',
					success: (uploadFileRes) => {
						let list = JSON.parse(uploadFileRes.data)
						this.images = list.data.url
					}
				});
			},
			addfeedback(){
				let data = {
					content:this.content,
					phone:this.phone,
					images:this.images
				}
				this.$u.post(this.api.feedback,data).then(res=>{
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
					if(res.code == 1){
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},2500)
					}
				})
			}
		}
	}
</script>

<style lang="less">
	/deep/.u-form-item__message.data-v-006449ec {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 182rpx!important;
		padding-left:0!important ;
}
	.fedback {
		height: calc(100vh - 44px);
		background-color: #EFEFEF;
		.title{
			font-size: 30rpx;
			color: #333333;
			font-weight: 700;
			padding-bottom: 32rpx;
		}
		.fedback_top {
			padding-top: 20rpx;
			.fedback_top_conten{
				background-color: #FFFFFF;
				padding: 48rpx 32rpx;
			}
		}
	}
	.fedbackg_btn{
		background-color: #FF8109;
		width: 80%;
		height: 72rpx;
		line-height: 72rpx;
		border-radius: 36rpx;
		margin: 0 auto;
		text-align: center;
		font-weight: 700;
		font-size: 32rpx;
		color: #FFFFFF;
	}
	.u-field{
		padding: 0 !important;
	}
</style>

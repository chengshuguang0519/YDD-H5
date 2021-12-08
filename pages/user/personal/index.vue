<template>
	<view class="personal">
		<u-gap height="17" bg-color="#EFEFEF"></u-gap>
		<view class="">
			<u-cell-group>
				<view class="one">
					<u-cell-item title="头像" :arrow="false" hover-class="none"></u-cell-item>
					<u-avatar :src="userinfo.headimg" size="64" @click="image"></u-avatar>
					<u-icon name="arrow-right" color="#969799"></u-icon>
				</view>
				<!-- <u-cell-item title="昵称" :value="userinfo.nickname" hover-class="none"></u-cell-item> -->
				<u-form-item  style="padding:12rpx 32rpx;" label="昵称"><u-input v-model="userinfo.nickname"  input-align="right"/></u-form-item>
				<u-cell-item title="手机号码" :value="userinfo.phone" :arrow="false" hover-class="none"></u-cell-item>
				<u-cell-item title="ID" :value="userinfo.id" :arrow="false" hover-class="none"></u-cell-item>
			</u-cell-group>
		</view>
		<view class="bottom">
			<view class="btn" @click="save">
				保存修改
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userinfo: {}
			}
		},
		onLoad() {
			let userinfo = uni.getStorageSync('userinfo')
			this.userinfo = userinfo
		},
		methods: {
			image(){
				uni.chooseImage({
				    success: (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
				        uni.uploadFile({
				            url: 'http://yinduoduo.dd371.com/api/common/upFile', //仅为示例，非真实的接口地址
				            filePath: tempFilePaths[0],
				            name: 'file',
				            formData: {
				                'user': 'test'
				            },
				            success: (res) => {
								console.log(res.data);
								console.log(JSON.parse(res.data).data);
								if(JSON.parse(res.data).code == 1){
									this.userinfo.headimg =JSON.parse(res.data).data.fullurl
								}
				            }
				        });
				    }
				});
			},
			save(){
				// putInfo
				let data ={
					headimg:this.userinfo.headimg,
					nickname:this.userinfo.nickname
				}
				this.$u.post(this.api.putInfo,data).then(res=>{
					console.log(res);
					if(res.code == 1){
						this.getuser()
						uni.navigateBack({
							delta:1
						})
					}
				})
			},
			getuser(){
				this.$u.get(this.api.getuserindex).then(res=>{
					var userInfo = uni.getStorageSync('userinfo')
					userInfo.headimg = res.data.headimg;
					userInfo.nickname = res.data.nickname;
					uni.setStorageSync('userinfo', userInfo);
					this.userinfo = userInfo
				})
			},
		}
	}
</script>

<style lang="less">
	.personal {
		height: 100vh;

		.one {
			display: flex;
			justify-content: space-around;
			align-items: center;
			padding-right: 34rpx;
		}

		.bottom {
			padding: 0 32rpx 20rpx 30rpx;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;

			.btn {
				height: 72rpx;
				opacity: 1;
				background: #ff8109;
				border-radius: 36rpx;
				font-size: 28rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #fff;
				font-weight: 500;
			}
		}
	}
</style>

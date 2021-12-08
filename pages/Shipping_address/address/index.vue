<template>
	<view class="address">
		<u-gap height="20" bg-color="#EFEFEF"></u-gap>
		<view class="form_address">
			<u-form :model="form" ref="uForm">
				<u-form-item label="收货人" label-width="130" :label-style="label_style">
					<u-input v-model="form.name" />
				</u-form-item>
				<u-form-item label="手机号码" label-width="130" :label-style="label_style">
					<u-input v-model="form.phone" />
				</u-form-item>
				<u-form-item label="所在地区" label-width="130" :label-style="label_style">
					<u-input v-model="address" disabled @click="oninput" />
				</u-form-item>
				<u-form-item label="详细地址" label-width="130" :label-style="label_style">
					<u-input v-model="form.addr" />
				</u-form-item>
				<u-form-item label="设置默认地址" label-width="auto" :border-bottom="false" :label-style="label_style">
					<u-switch slot="right" active-color="#FF8109" inactive-color="#999999" v-model="switchVal"
						@change="onswitch"></u-switch>
				</u-form-item>
				<text>提醒：每次下单会默认推荐使用该地址</text>
			</u-form>
		</view>
		<u-picker v-model="show" mode="region" @confirm="confirm"></u-picker>
		<view class="btn" @click="save">
			保存
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: '',
					phone: '',
					province: '',
					city: '',
					area: '',
					addr: '',
					is_default: '',
				},
				show: false,
				radio: '',
				switchVal: false,
				address: '',
				label_style: {
					'color': '#333333',
					'font-weight': '700',
					'font-size': '30rpx'
				},
				opent: {},
				addressdateild: {}
			}
		},
		onLoad(opent) {
			console.log(opent);
			this.opent = opent;
			if (opent.type == 1) {
				this.getgetAddrInfo();
			}
		},
		methods: {
			oninput() {
				this.show = true
			},
			confirm(e) {
				console.log(e);
				this.form.province = e.province.label
				this.form.city = e.city.label
				this.form.area = e.area.label
				this.address = e.province.label + '/' + e.city.label + '/' + e.area.label
				console.log(this.address)
			},
			onswitch(e) {
				this.form.is_default = e ? 1 : 0
			},
			getgetAddrInfo() {
				this.$u.post(this.api.getAddrInfo, {
					id: this.opent.id
				}).then(res => {
					console.log(res);
					if (res.code == 1) {
						this.addressdateild = res.data
						this.form.name = res.data.name
						this.form.phone = res.data.phone
						this.form.province = res.data.province
						this.form.city = res.data.city
						this.form.area = res.data.area
						this.form.addr = res.data.address
						this.address = res.data.province + '/' + res.data.city + '/' + res.data.area
						this.form.is_default = res.data.is_default;
						this.switchVal = res.data.is_default == 1 ? true : false
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			},
			save() {
				if (this.opent.type == 0) {
					this.$u.post(this.api.addAddress, this.form).then(res => {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
						if (res.code == 1) {
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 2500)
						}
					})
				} else {
					this.form.id = this.addressdateild.id;
					this.$u.post(this.api.editAddress, this.form).then(res => {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
						if (res.code == 1) {
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 2500)
						}
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

		.form_address {
			background-color: #FFFFFF;
			padding: 43rpx;
			padding-top: 0;
		}

		.btn {
			width: 206rpx;
			height: 74rpx;
			background: #ff8109;
			border-radius: 36rpx;
			text-align: center;
			line-height: 74rpx;
			margin: 0 auto;
			margin-top: 56rpx;
			color: #ffffff;
			font-weight: 500;
			font-size: 36rpx;
		}
	}
</style>

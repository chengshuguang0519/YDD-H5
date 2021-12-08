<template>
	<view>
		<u-field label="订单号" :placeholder="objdata.order_no" :border-bottom="false" disabled
			placeholder-style="color:#333333;font-weight: 500;font-size: 28rpx;">
		</u-field>
		<u-field label="商品名称" :placeholder="objdata.title" :border-bottom="false" disabled
			placeholder-style="color:#333333;font-weight: 500;font-size: 28rpx;">
		</u-field>
		<u-field label="商品数量" :placeholder="objdata.num" :border-bottom="false" disabled
			placeholder-style="color:#333333;font-weight: 500;font-size: 28rpx;">
		</u-field>
		<u-gap height="20" bg-color="#F7F7F7"></u-gap>
		<u-field label="打包箱数" v-model="box_num" placeholder="请输入打包箱数" :border-bottom="false">
		</u-field>
		<u-field label="上传图片" :border-bottom="false" disabled>
		</u-field>
		<view style="padding: 0 20rpx;">
			<u-upload ref="uUpload" max-count="3" :max-size="2 * 1024 * 1024" :action="action"   :before-upload="beforeUpload"></u-upload>
		</view>

		<u-gap height="20" bg-color="#F7F7F7"></u-gap>
		<u-field label="物流公司" v-model="logisticstext"  placeholder="请选择物流公司" :border-bottom="false" disabled
		 right-icon="arrow-right" @click="showAction">
		</u-field>
		<u-field label="物流单号" v-model="number" placeholder="请填写物流单号" :border-bottom="false">
		</u-field>
		<u-field label="备注" v-model="desc" placeholder="请填写备注" :border-bottom="false">
		</u-field>

		<u-popup v-model="show" mode="bottom" border-radius="14" height="50%">
			<view style="text-align: center;padding: 20rpx;font-size: 38rpx;font-weight: 500;">快递公司</view>
			<u-cell-group >
				<u-cell-item v-for="(i,index) in logistics" :key="index" icon="" :border-bottom="false"  :title="i.express_title" :arrow="false" @click="celllogistics(i)"></u-cell-item>
			</u-cell-group>
		</u-popup>

		<view class="button">
			<u-button shape="circle" type="warning" @click="determine">确认发货</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				action:'http://yinduoduo.dd371.com/api/common/upFile',
				objdata: {},
				show: false,
				logistics:[],
				logisticstext:'',
				id:'',
				supplier_user_id:'',
				box_num:'',
				number:'',
				express_id:'',
				desc:'',
				images:[]
			}
		},
		onLoad(opent) {
			this.objdata = JSON.parse(opent.data);
			this.loadData()
		},
		methods: {
			loadData(){
				this.$u.get(this.api.expressLists).then(res=>{
					console.log(res);
					if(res.code == 1){
						this.logistics = res.data
					}
				})
			},
			celllogistics(event){
				this.express_id = event.id;
				this.logisticstext = event.express_title;
				this.show = false;
			},
			showAction(){
				this.show = true
			},
			beforeUpload(index, list){
				var thia = this;
				this.images =[]
				for (var i = 0; i < list.length; i++) {
					  uni.uploadFile({
						url: this.action, //仅为示例，非真实的接口地址
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
				console.log(123456)
				let data = {
					id:this.objdata.supplier_id,
					supplier_user_id:this.objdata.supplier_user_id,
					box_num:this.box_num,
					number:this.number,
					express_id:this.express_id,
					desc:this.desc,
					images:this.images.join(',')
				}
				this.$u.post(this.api.postShip, data).then(res => {
					console.log(res);
				})
			}
		}
	}
</script>

<style lang="less">
	.button {
		padding: 20rpx;
		padding-top: 100rpx;
	}
	.u-cell{
		padding: 22rpx 82rpx;
	}
</style>

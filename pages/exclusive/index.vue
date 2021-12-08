<template>
	<view class="">
		<view class="shopping_search">
			<view class="orent_left" @click="navBack">
				<u-icon name="arrow-left" size="40"> </u-icon>
			</view>
			<view class="left">
				<u-search placeholder="名片" v-model="keyword" :show-action="false" @search="search"></u-search>
			</view>
			<view class="right" @click="goMessage">
				<u-icon name="/static/icon/The_session.png" size="40"> </u-icon>
				<view class="right_text">
					<text>消息提示</text>
				</view>
				<u-badge v-if="msnum" type="error" :count="msnum" :offset='[20,40]'></u-badge>
			</view>
		</view>
		<view class="exclusive">
			<view class="exclusive_e">
				<u-checkbox-group :wrap="true" active-color="#FE8009" @change="changegroup" width="100%"
					style="width: 100%;">
					<view class="exc_box" v-for="(i,index) in onlist" :key="index">
						<view class="exc_box_top">
							<view class="excBoxTop_left">
								<u-checkbox v-model="i.checked" shape="circle">
								</u-checkbox>
							</view>
							<view class="excBoxTop_right">
								<view class="image">
									<image :src="i.cover_image" mode=""></image>
								</view>
								<view class="text">
									<view>
										<view>{{i.title}}</view>
										<view>{{i.mini_title}}</view>
									</view>
									<view class="price1">￥{{i.specs[0].product_price}}</view>
									<view v-if="i.type==2">
										<!-- @minus='getMin(i.id,i.specs[0].num)' @plus='getMax(i.id,i.specs[0].num)' -->
										<u-number-box :index="index" :min="i.specs[0].start_num" :max="i.specs[0].end_num" v-model="i.num" @change="valChange">
										</u-number-box>
									</view>
									<view v-if="i.type ==1" class="typeOne">
										<text>{{i.num}}</text>
										<u-icon name="arrow-down-fill" class="icon-down" @click='valChanges(index)'></u-icon>
									</view>
								</view>
							</view>
						</view>
						<view class="exc_box_bottom">
							<view>
								<view>印刷文件</view>
								<view>
									<text>文件未上传</text>
									<u-icon name="arrow-right"></u-icon>
								</view>
							</view>
							<view>
								<view>商品总价</view>
								<view>￥{{i.numberTxt}}</view>
							</view>
						</view>
					</view>
				</u-checkbox-group>
			</view>
			<view class="exclusive_c">
				<view>
					<u-checkbox-group active-color="#FE8009">
						<u-checkbox v-model="checked" shape="circle" @change="checkedAll">全选</u-checkbox>
					</u-checkbox-group>
				</view>
				<view>
					<view><text>合计：</text><text>￥{{priceAll}}</text></view>
					<view @click="immediately">立即下单</view>
				</view>
			</view>
		</view>
		<u-select v-model="show" mode="single-column" :list="list"
		 @confirm="confirm" @cancel='quxiao'></u-select>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				checked: false,
				value: 0,
				onlist: [],
				address_id: [],
				param: [],
				params:[],
				typeOne: [],
				typeTwo: [],
				msnum: '',
				keyword: '',
				msnum: false,
				numberTxt:0,
				goodsPrice: 10,
				priceAll: 0,
				cartList: [],
				show: false,
				valindex:'',
				list: [],
			}
		},
		onLoad() {
			this.loadgetDefaultAddress()
			this.loadData();
			this.getmessagenum()
			this.Tocalculate()
			console.log(this.param, this.onlist)
		},
		methods: {
			search(e){
				console.log(e);
				this.keyword = ''
				uni.navigateTo({
					url:'/pages/list/index?keyword='+e
				})
			},
			jisuan() {
				// let price = this.onlist.reduce((prev, v) => {
				// 	return prev += (v.checked ? v.Zprice :0)
				// }, 0)
				this.priceAll = 0
				this.onlist.forEach(item=>{
					console.log(item);
					if(item.checked){
						this.priceAll = this.priceAll + item.numberTxt
					}
				})
				// this.priceAll = price.toFixed(2)
			},
			getmessagenum() {
				let uid = uni.getStorageSync('userinfo').user_id
				this.$u.get(this.api.messagenum, {
					uid: uid
				}).then(res => {
					this.msnum = res.data
				})
			},
			navBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			loadData() {
				let data = {
					title: '',
					page: 1,
					pagesize: 20
				}
				this.$u.post(this.api.exclusive_goodList, data).then(res => {
					console.log(res, '111')
					if (res.code == 1) {
						for (var i = 0; i < res.data.length; i++) {
							res.data[i].checked = false;
							res.data[i].disabled = false;
							res.data[i].numberTxt = 0;
							res.data[i].num = res.data[i].specs[0].num>0?res.data[i].specs[0].num:res.data[i].specs[0].start_num
							let good_id = res.data[i].id;
							let number = res.data[i].num;
							let spec_id = res.data[i].type==1?res.data[i].specs[0].id:0
							this.objpostPrice(good_id,number,spec_id,i)
						}
						this.onlist = res.data
						
					}
				})
			},

			checkedAll() {
				var _this = this
				// this.onlist.map(val => {
				// 	val.checked = true;
				// })
				this.onlist.map(val => {
					val.checked = this.checked ? false : true;
				})
				this.Tocalculate()
				this.jisuan()
			},
			changegroup() {
				for (var i = 0; i < this.onlist.length; i++) {
					if (this.onlist.every((val) => val.checked === true)) {
						this.checked = true
					} else {
						this.checked = false
					}
				}
				this.Tocalculate()
				this.jisuan()
			},
			Tocalculate() {
				for (var i = 0; i < this.onlist.length; i++) {
					if (this.onlist[i].checked) {
						// this.address_id.push(this.onlist[i].specs[0].id);
						
						this.param.push({
							"good_id": this.onlist[i].id,
							"number": this.onlist[i].num,
							"spec_id": this.onlist[i].specs[0].id,
							"design_file": "",
							"sample_file": "",
							"checked": this.onlist[i].checked
						})
						this.param = this.getFilterList(this.param)
						console.log(this.param,this.onlist,'1111')
					} else {
						console.log(this.onlist[i], '111')
						const index = this.param.findIndex(v => {
							return v.good_id == this.onlist[i].id
						})
						console.log(index, 'index')
						if (index !== -1) {
							this.param.splice(index, 1)
						}
					}
				}
			},
			getFilterList(obj) {
				var uniques = [];
				var stringify = {};
				for (var i = 0; i < obj.length; i++) {
					var keys = Object.keys(obj[i]);
					keys.sort(function(a, b) {
						return (Number(a) - Number(b));
					});
					var str = '';
					for (var j = 0; j < keys.length; j++) {
						str += JSON.stringify(keys[j]);
						str += JSON.stringify(obj[i][keys[j]]);
					}
					if (!stringify.hasOwnProperty(str)) {
						uniques.push(obj[i]);
						stringify[str] = true;
					}
				}
				uniques = uniques;
				return uniques;
			},
			loadgetDefaultAddress() {
				this.$u.get(this.api.getDefaultAddress).then(res => {
					if (res.code == 1) {
						this.address_id = res.data.id
					}
				})
			},
			immediately() {
				for (var i = 0; i < this.onlist.length; i++) {
					if (this.onlist[i].checked) {
						this.params.push({
							"good_id": this.onlist[i].id,
							"number": this.onlist[i].num,
							"spec_id": this.onlist[i].specs[0].id,
							"design_file": "",
							"sample_file": "",
							"checked": this.onlist[i].checked
						})
						this.params = this.getFilterList(this.params)
						console.log(this.params,this.onlist,'1111')
					} else {
						console.log(this.onlist[i], '111')
						const index = this.params.findIndex(v => {
							return v.good_id == this.onlist[i].id
						})
						console.log(index, 'index')
						if (index !== -1) {
							this.params.splice(index, 1)
						}
					}
				}
				var falg = ''
				this.params.forEach(v=>{
					if(v.number == 0){
						falg = false
					}else{
						falg =true
					}
				})
				let index = this.params.findIndex(v=>{
					return v.number == 0
				})
				console.log(index,'index')
				if(index !== -1){
					this.params.splice(index,1)
				}
				let set = new Set()
				
				 let obj = {};
				 this.params = this.params.reduce((cur, next,arr,item) => {
					 console.log(cur,next.good_id,arr,item,'next')
				              obj[next.good_id] ? "" : (obj[next.good_id] = true && cur.push(next));
				              return cur;
				     }, []); 
				  console.log(this.params, "hewewei");
				 if (this.priceAll != 0 && falg) {
					console.log(this.params,this.onlist,'params')
					uni.navigateTo({
						url: '/pages/order/exclusive_order/index?address_id=' + this.address_id +
							'&param=' + JSON.stringify(this.onlist)
					})
				} else {
					uni.showToast({
						title: '请选择要购买的商品,商品数量不能小于0！',
						icon: 'none'
					})
				}
			},
			//确定列选择
			async confirm(e) {
				console.log(e)
				this.objpostPrice(this.onlist[this.valindex].id,e[0].label,e[0].value,this.valindex)
				// this.num = e[0].label
			},
			
			valChange(obj) {
				console.log(obj,'res')
				this.objpostPrice(this.onlist[obj.index].id,obj.value,0,obj.index)
				// this.jisuan()
				// this.Tocalculate()
			},
			valChanges(index){
				this.show = true;
				this.valindex = index
				this.list =[]
				// console.log(this.onlist[index.specs]);
				this.onlist[index].specs.forEach(item=>{
					this.list.push({
						value:item.id,
						label:item.num
					})
				})
			},
			objpostPrice(good_id,number,spec_id,index){
				this.$u.post('/exclusive_good/postPrice', {
					good_id: good_id,
					number: number,
					spec_id: spec_id,
				}).then(res => {
					if(res.code == 1){
						this.onlist[index].numberTxt = res.msg.total_price;
						this.onlist[index].num = res.msg.number;
						this.jisuan()
					}
				})
			},
			// show = true
			//我的消息
			goMessage() {
				uni.navigateTo({
					url: '/pages/user/my_message/index'
				})
			},
			getMin(id, num) {
				console.log(id);
				this.$u.post('/exclusive_good/postPrice', {
					good_id: id,
					number: num,
					spec_id: 0,
				})
				console.log(res,'777')
					console.log(res,'111111')
					this.onlist.forEach(v => {
						console.log(v.id);
						console.log(id);
						if(v.id === id){
							 v.Zprice = res.msg.total_price	
							 this.jisuan()
						}
						
					})
					this.onlist.forEach(v => {
						if(v.id === id){
							return v.Anum = res.msg.unit_price
						}
				})
				this.onlist.forEach(v => {
					var that = this
					if (v.id == id) {
						if (v.specs[0].num != 0) {
							v.specs[0].num--
						} else {
							
						}
					}
				})
			},
		 async getMax(id, num) {
				const res = await this.$u.post('/exclusive_good/postPrice', {
					good_id: id,
					number: num,
					spec_id: 0,
					})
					console.log(res,'222')
				// }).then(res => {
					this.onlist.forEach(v => {
						if(v.id === id){
							v.Zprice = res.msg.total_price 
							this.jisuan()
						}
					})
					this.onlist.forEach(v => {
						if(v.id == id){
							return v.Anum = res.msg.unit_price
						}
					})
				
				this.onlist.forEach(v => {
					var that = this
					if (v.id == id) {
						v.specs[0].num++
					}
				})
			},
		},

	}
</script>

<style lang="less">
	.exclusive_e {
		padding-bottom: 102rpx;
	}

	.shopping_search {
		display: flex;
		background-color: #FFFFFF;
		padding: 32rpx 38rpx 22rpx 10rpx;

		.left {
			width: 84%;
			display: flex;
			
		}

		.right {
			width: 16%;
			text-align: center;

			.right_text {
				font-size: 20rpx;
				color: #999999;
			}
		}

		.orent_left {
			display: flex;
			align-items: center;
			padding-right: 16rpx;
		}
	}

	.exclusive_c {
		position: fixed;
		left: 26rpx;
		right: 0;
		bottom: 0;
		height: 56px;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 32rpx;

		&>view:nth-child(2) {
			display: flex;
			align-items: center;

			&>view:nth-child(1) {
				padding-right: 20rpx;

				text:nth-child(1) {
					font-size: 22rpx;
					color: #333333;
					font-weight: 500;
				}

				text:nth-child(2) {
					font-size: 30rpx;
					color: #FF0200;
					font-weight: 500;
				}
			}

			&>view:nth-child(2) {
				background-color: #FE8109;
				color: #FFFFFF;
				font-size: 26rpx;
				font-weight: 700;
				padding: 10rpx 20rpx;
				border-radius: 24rpx;
			}
		}
	}

	.exclusive {
		min-height: 100vh;
		background-color: #F7F7F7;
		padding: 32rpx;

		.exc_box {
			background-color: #FFFFFF;
			width: 100%;
			padding: 28rpx;
			border-radius: 36rpx;
			box-shadow: 0px 20px 54px 0px rgba(68, 74, 79, 0.17);
			margin-bottom: 20rpx;

			.exc_box_top {
				display: flex;
				align-items: center;
				border-bottom: 2rpx solid #EFEFEF;
				padding-bottom: 24rpx;

				.excBoxTop_right {
					display: flex;
					width: 90%;

					.image {
						width: 194rpx;
						height: 180rpx;
					}

					.text {
						width: 64%;
						padding-left: 25rpx;
						display: flex;
						flex-wrap: wrap;
						align-content: space-between;
						overflow: hidden;

						&>view {
							width: 100%;

							&>view:nth-child(1) {
								color: #333333;
								font-size: 32rpx;
							}
						}

						&>view:nth-child(3) {
							margin-left: 130rpx;
						}
					}
				}
			}

			.exc_box_bottom {
				&>view {
					display: flex;
					justify-content: space-between;
					padding: 10rpx 0 10rpx 32rpx;
				}
			}
		}
	}

	.typeOne {
		background-color: #f2f2f2;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		width: 170rpx !important;
		margin-left: 100rpx;

		text:nth-child(1) {
			margin-right: 25%;
			transform: translate(80%);
		}

		.icon-down {
			margin-right: 5rpx;
		}
	}

	.price1 {
		width: 150rpx !important;
		height: 60rpx;
		margin-top: 80rpx !important;
		color: red;
	}
</style>

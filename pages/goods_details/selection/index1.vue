<template>
	<view class="goods">
		<!-- 轮播 -->
		<view class="goods_content">
			<view class="goods_swiper">
				<swiper class="swiper" :indicator-dots="true" indicator-active-color="#fff" :autoplay="true"
					:circular="true">
					<swiper-item v-for="(i,index) in getobj.banner_image" :key="index">
						<view class="swiper-item">
							<image :src="i" mode=""></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="goods_one">
				<view>{{getobj.title}}</view>
				<view>
					<view>
						<view><text>￥{{getobj.price}}</text><!-- <text>/张</text> -->
						</view>
						<!-- <view>￥0.20/张</view> -->
					</view>
					<view>销量{{getobj.stock}}</view>
				</view>
				<view>
					<view v-for="(i,index) in tfea" :key="index" style="display: flex;">
						<u-icon :name="i.mini_cover" size="20" color="#ED9829"></u-icon><text>{{i.title}}</text>
					</view>
				</view>
			</view>

			<view class="goods_two">
				<view @click="peisongDetails">
					<!-- <u-form-item label="规格">
						<u-cell-item :title="getobj.allSpec?getobj.allSpec[0].spec:''" :border-bottom="false"></u-cell-item>
					</u-form-item> -->
					<u-form-item label="配送">
						<u-cell-item :title="address" :border-bottom="false"></u-cell-item>
					</u-form-item>
				</view>
				<view>
					<u-form-item label-width="auto" label="印刷文件">
						<u-cell-item title="请选择印刷文件" :border-bottom="false"></u-cell-item>
					</u-form-item>
				</view>
			</view>

			<view class="goods_three">
				<u-cell-item :title="'商品评论('+getobj.comment_count+'）'"
					:title-style="{'font-size':'32rpx','color':'30rpx','font-weight': '700'}" :border-bottom="false"
					value="更多" @click='goComment(getobj.id)'></u-cell-item>
				<view class="goods_criticize" v-for="(i,index) in getobj.comment" :key="index">
					<view class="goods_name">
						<view class="left">
							<view class="image">
								<image :src="i.img_url" mode=""></image>
							</view>
							<view class="user">
								<view>{{i.user}}</view>
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
					<u-parse :html="getobj.content"></u-parse>
				</view>
			</view>

			<view class="goods_five">
				<view class="bottom-tltle">
					你可能还喜欢
				</view>
				<thelist :list="getobj.recommend"></thelist>
			</view>
		</view>
		<view class="goods_bottom">
			<view class="goods_bottom_left">
				<view @click="collentGoods(getobj.id)">
					<view>
						<u-icon name="heart" v-if="collent"></u-icon>
						<u-icon name="heart" v-else style="color: orange;"> </u-icon>
					</view>
					<u-toast ref="uToast" />
					<text>收藏</text>
				</view>
				<view @click="chartGo">
					<view>
						<u-icon name="kefu-ermai"></u-icon>
					</view>
					<text>客服</text>
				</view>
			</view>
			<view class="goods_bottom_right">
				<view class="btn" @tap="show = true">立即报价</view>
			</view>
		</view>

		<u-popup v-model="show" mode="bottom" border-radius="50">
			<view class="popup">
				<view class="popup_top">
					<view>
						<image src="../../../static/9.png" mode=""></image>
					</view>
					<view>
						<view>¥{{getPriceData.price?getPriceData.price:getobj.price}}</view>
						<view>{{getPriceData.spec?getPriceData.spec:getobj.title}}</view>
					</view>
				</view>
				<!-- 规格 -->
				<view class="popup_content" v-if="getobj.good_type != 2">
					<view class="cont_item" v-if="activeSelect.paper">
						<view class="title">尺寸</view>
						<view class="selectAll">
							<div class="select" v-if="activeSelect.paper.active"
								@click="showSelect(true,1,getobj.spec.paper,'paper')">
								<p>{{activeSelect.paper.name?activeSelect.paper.name : getobj.spec.paper[0].name + '(' + getobj.spec.paper[0].madeup_width + '*' + getobj.spec.paper[0].madeup_height + ')'}}
								</p>
								<p>↓</p>
							</div>
							<div class="num" @click="hiddenSelect('paper')">
								<p :class="activeSelect.paper.active? 'false' : 'true' "></p>
								<p>自定义</p>
							</div>
							<div class="numShow" v-if="!activeSelect.paper.active">
								<div class="input">
									<u-input v-model="activeSelect.paper.min" type="number" height="60rpx"
										placeholder="宽" :clearable="false" />
								</div>
								<div class="cheng">*</div>
								<div class="input">
									<u-input v-model="activeSelect.paper.max" type="number" height="60rpx"
										placeholder="高" :clearable="false" />
								</div>
								<div class="danwei">mm</div>
							</div>
						</view>
					</view>
					<view class="cont_item" v-if="activeSelect.numbers">
						<view class="title">数量</view>
						<view class="selectAll">
							<div class="select" v-if="activeSelect.numbers.active"
								@click="showSelect(true,1,getobj.spec.numbers,'numbers')">
								<p>{{activeSelect.numbers.name?activeSelect.numbers.name : getobj.spec.numbers[0].num}}
								</p>
								<p>↓</p>
							</div>
							<div class="num" @click="hiddenSelect('numbers')">
								<p :class="activeSelect.numbers.active? 'false' : 'true' "></p>
								<p>自定义</p>
							</div>
							<div class="numShow" v-if="!activeSelect.numbers.active">
								<div class="input">
									<u-input v-model="activeSelect.numbers.num" type="number" height="60rpx"
										placeholder="数量" :clearable="false"  />
								</div>
							</div>
						</view>
					</view>
					<view class="cont_item" v-if="activeSelect.print_method">
						<view class="title">单双面</view>
						<view class="selectAll">
							<div class="select" v-if="activeSelect.print_method.active"
								@click="showSelect(true,1,getobj.spec.print_method,'print_method')">
								<p>{{activeSelect.print_method.name?activeSelect.print_method.name : getobj.spec.print_method[0].name}}
								</p>
								<p>↓</p>
							</div>
						</view>
					</view>
					<view class="cont_item" v-if="activeSelect.print_color">
						<view class="title">颜色</view>
						<view class="selectAll">
							<div class="select" @click="showSelect(true,1,getobj.spec.print_color,'print_color')">
								<p>{{activeSelect.print_color.name?activeSelect.print_color.name : getobj.spec.print_color[0].name}}
								</p>
								<p>↓</p>
							</div>
						</view>
					</view>
					<view class="cont_item" v-if="activeSelect.spot_color">
						<view class="title">专色</view>
						<view class="selectAll">
							<div class="select" @click="showSelect(true,1,getobj.spec.spot_color,'spot_color')">
								<p>{{activeSelect.spot_color.name?activeSelect.spot_color.name : getobj.spec.spot_color[0].name}}
								</p>
								<p>↓</p>
							</div>
						</view>
					</view>
					<view class="cont_item" v-if="activeSelect.pnumbers">
						<view class="title">P数</view>
						<view class="selectAll">
							<div class="select" @click="showSelect(true,1,getobj.spec.pnumbers,'pnumbers')">
								<p>{{activeSelect.pnumbers.name?activeSelect.pnumbers.name : getobj.spec.pnumbers[0].name}}
								</p>
								<p>↓</p>
							</div>
						</view>
					</view>
					<view class="cont_item" v-if="activeSelect.material">
						<view class="title">材料</view>
						<view class="selectAll">
							<div class="select" @click="showSelect(true,1,getobj.spec.material,'material')">
								<p>{{activeSelect.material.name?activeSelect.material.name : getobj.spec.material[0].name}}
								</p>
								<p>↓</p>
							</div>
							<div class="select" @click="showSelect(true,1,getobj.spec.material,'materiall')">
								<p>{{activeSelect.material.namee?activeSelect.material.namee : getobj.spec.material[0].specs[0].weight}}
								</p>
								<p>↓</p>
							</div>
						</view>
					</view>
					<view class="cont_item" v-if="activeSelect.craft">
						<view class="title">工艺</view>
						<view class="selectAll_craft">
							<div v-for="(item,i) in arr_" :key="i" :class='popShow?"item":"item2"'>
								<div @tap='ac(i,item)' :class='item.isactive?"active":""'>
									{{item.name}}
								</div>
								<div  v-if="item.active">
									<div class='numShow'>
										<div class="input">
											<u-input v-model="activeSelect.craft.size_width" type="number" height="60rpx"
												placeholder="宽" :clearable="false" />
										</div>
										<div class="cheng">*</div>
										<div class="input">
											<u-input v-model="activeSelect.craft.size_height" type="number" height="60rpx"
												placeholder="高" :clearable="false" />
										</div>
										<div class="danwei">mm</div>
									</div>		
						    </div>
						</div>
						</div>
					</view>
				</view>
			</view>
			<view class="popup_content" v-if="getobj.good_type == 2">
				<view class="cont_item" v-for="(i,index) in spec" :key="index">
					<view class="title">{{i.title}}</view>
					<scroll-view class="guigeSc" scroll-x="true" style="height: 80px;">
						<view class="cont_itme_gir2">
							<div :class="specPost[index] === item?'active guigeDiv':'guigeDiv'"
								v-for="(item,indexx) in i.data" :key="indexx" @tap="specTap(index,indexx,item)">
								{{item}}
							</div>
						</view>
					</scroll-view>
				</view>
				
				<view class="cont_item">
					<view class="title">款数</view>
					<u-number-box v-model="value" @change="valChange"></u-number-box>
				</view>
				<view>
					
				</view>
			</view>

			<view class="bottom">
				<view @tap="addShop()">加入购物车
					<u-toast ref="uToast1" />
				</view>
				<view @tap="goPay()">立即购买</view>
			</view>
	</view>
	</u-popup>
	<u-select v-model="selectShow" :list="selectList" @confirm="confirm"></u-select>
	</view>
</template>

<script>
	import the_list from '../../../components/the_list/index.vue'
	export default {
		data() {
			return {
				popShow: false,
				isActive: true,
				id: '',
				count: 5,
				value: 2,
				collent: true,
				content: `
					<p>露从今夜白，月是故乡明</p>
					<img src="https://cdn.uviewui.com/uview/swiper/2.jpg" />
				`,
				collent:true,
				getobj: {},
				id: '194',
				tfea: [],
				address: '',
				show: false, //规格弹窗
				selectShow: false, //规格多选弹窗
				//规格多选列表
				selectList: [{
						value: '1',
						label: '江'
					},
					{
						value: '2',
						label: '湖'
					}
				],
				//当前选中的key
				selectKey: '',
				//选中规格列表
				activeSelect: {

				},
				// 商品类型  从首页进来无参数  专属商城或者积分商城需接受id
				typeId: '',
				// 选中规格字符串
				specStr: '',
				// good_type == 1
				// good_type == 2
				spec: '', //规格数组
				specPost: [], //规格请求参数
				//获取到的价格
				getPriceData: '',
				goodsMessage: {
					design_file:'',
					type:1,
					spec_id:0,
					spec:{
						craft:[],
						material_weight_id :'',
						material_id:'',
						number:'',
						paper_spec_id:'',
						size_type:''
					},
					special:{
						craft:[],
						material_weight_id :'',
						material_id:'',
						number:'',
						paper_spec_id:'',
						size_type:''
					}
					
				},
				arr_: [],
				arrAll:'',//所有参数列表
			}
		},
		computed: {
			apiArr() {
				var _this = this;
				console.log(_this.activeSelect, '规格')
				return _this.activeSelect;
			},
		},
		components: {
			'thelist': the_list
		},
		onLoad(opent) {
			this.id = opent.id
			this.loadData();
			this.getfea();
			this.getaddress();
			console.log(this.getobj,'good')
			
		},
		methods: {
			
			//工艺选中
			ac(i,item) {
				console.log(i,item)
				this.goodsMessage.spec.craft.push(item)
				
				console.log(this.goodsMessage,'555511')
				this.getPrice(1)
				if(i ==0 || i==1 ||i==2){
					this.arr_[i].isactive =!this.arr_[i].isactive
					this.arr_[i].active = !this.arr_[i].active
				}else{
					this.arr_[i].active =false
					this.arr_[i].isactive =!this.arr_[i].isactive
				}
				if(this.arr_[6].isactive){
					this.arr_[5].isactive =!this.arr_[6].isactive 
				}
				if(this.arr_[5].isactive ){
					this.arr_[6].isactive =!this.arr_[5].isactive 
				}
			},
			// 选中自定义价格, 隐藏下拉选价格
			hiddenSelect(key) {
				this.activeSelect[key].active = !this.activeSelect[key].active
				this.activeSelect[key].name = ''
				this.$forceUpdate()
			},
			showSelect(b, i, arr, key) { //打开规格选中弹窗
				let selectArr = []
				arr.forEach(item => {
					if (key == 'paper') {
						selectArr.push({
							value: item.id,
							label: item.name + '(' + item.madeup_width + '*' + item.madeup_height + ')'
						})
						this.goodsMessage.spec.paper_spec_id = item.id
						this.goodsMessage.special.paper_spec_id = item.id
					}
					if (key == 'numbers') {
						selectArr.push({
							value: item.id,
							label: item.num
						})
						this.goodsMessage.spec.number = item.num
						this.goodsMessage.special.number = item.num
					}
					if (key == 'print_method') {
						selectArr.push({
							value: item.id,
							label: item.name
						})
					}
					if (key == 'print_color') {
						selectArr.push({
							value: item.id,
							label: item.name
						})
						this.goodsMessage.spec.print_color_id = item.id
						this.goodsMessage.spec.print_type = item.type
						
						this.goodsMessage.special.print_color_id = item.id
						this.goodsMessage.special.print_type = item.type
					}
					if (key == 'spot_color') {
						selectArr.push({
							value: item.id,
							label: item.name
						})
					}
					if (key == 'pnumbers') {
						selectArr.push({
							value: item.id,
							label: item.name
						})
						this.goodsMessage.spec.pnumbers = item.name
						this.goodsMessage.special.pnumbers = item.name
					}
					if (key == 'material') {
						console.log(arr)
						selectArr.push({
							value: item.id,
							label: item.name
						})
						this.goodsMessage.spec.material_id = item.id
						this.goodsMessage.special.material_id = item.id
					}
				})
				this.selectKey = key
				this.selectList = selectArr
				this.selectShow = b
			},
			//弹窗确定事件
			confirm(e) {
				console.log(this.selectKey)
				console.log(e[0].label);
				this.activeSelect[this.selectKey] = {
					name: e[0].label,
					active: true,
				}
				console.log(this.activeSelect,'qqq')
				this.goodsMessage[this.selectKey] = e[0].label
				console.log(this.activeSelect,'212')
				console.log(this.activeSelect.numbers,'111119999')
				this.goodsMessage.spec.size_type =  this.goodsMessage.paper
				this.goodsMessage.spec.size_width = this.activeSelect.paper.min 
				this.goodsMessage.spec.size_height = this.activeSelect.paper.max
				this.goodsMessage.special.size_type =  this.goodsMessage.paper
				this.goodsMessage.special.size_width = this.activeSelect.paper.min 
				this.goodsMessage.special.size_height = this.activeSelect.paper.max
				this.goodsMessage.number = this.activeSelect.numbers.num
				this.getPrice(1)
				console.log(this.goodsMessage)
				if (this.selectKey == 'material'){
					console.log(e[0])
				}
			},
			peisongDetails() {
				console.log(123)
			},
			//规格选中
			specTap(i, j, text) {
				console.log(i, j, text)
				var good_type = this.getobj.good_type
				if (good_type == 2) {
					console.log('二类商品')
					let str = ''
					this.$set(this.specPost, i, text)
					this.specPost.forEach(item => {
						console.log(item)
						if (item) {
							if (str == '') {
								str += item
							} else {
								str += '-' + item
							}
						}
					})
					this.specStr = str;
					this.getPrice()
				} else if (good_type == 1) {
					console.log('一类商品')
					if (text.specs && text.specs.length > 0) {
						console.log('打开child选项')
						text.open = true
					} else {
						text.open = false
					}
					this.$set(this.specPost, i, text)
					this.$forceUpdate()
					console.log(this.specPost)
				}
			},
			// 更改数量
			valChange() {
				this.getPrice()
			},
			// 获取价格
			getPrice(type) {
				console.log(this.goodsMessage,'11111888')
				if (type == 1) {
					this.$u.post(this.api.OtherPrice, {
						good_id:this.goodsMessage.good_id,
						good_type:this.goodsMessage.good_type,
						number:1000,
						pnumber:this.goodsMessage.pnumbers,
						spec:JSON.stringify(this.goodsMessage.spec),
						special:JSON.stringify(this.goodsMessage.special),
					}).then(res => {
						console.log(res,'')
						if (res.code == 1) {
							this.getPriceData = res.data
							this.id = res.data.id
						}
					})
				} else {
					this.$u.post(this.api.NormalSpec, {
						good_type: this.getobj.good_type,
						spec_name: this.specStr,
						good_id: this.getobj.id,
						number: this.value
					}).then(res => {
						if (res.code == 1) {
							this.getPriceData = res.data
							this.id = res.data.id
						}
					})
				}
			},
			//获取商品详情
			loadData() {
				var _this = this;
				let data = {
					id: this.id,
					type: 1
				}
				this.$u.post(this.api.getRead, data).then(res => {
					if (res.code == 1) {
						if (res.data.good_type == 2) {	
							// this.goodsMessage.good_type = res.data.getobj.good_type
							// this.goodsMessage.good_id = res.data.id
							res.data.spec.forEach(element => {
								_this.specPost.push(false)
							});
						} else if (res.data.good_type != 2) {
							console.log(res.data,'data111')
							this.goodsMessage.good_type = res.data.good_type
							this.goodsMessage.good_id = res.data.id
							this.goodssList = res.data.good_type
							for (let i = 0; i < res.data.spec.craft.length; i++) {
								if (res.data.spec.craft[i].specs.length > 0) {
									res.data.spec.craft[i].specs.forEach(function(value) {
										value.active = false;
										value.isactive = false;
										_this.arr_.push(value)
									})
								}
							}
							for (let item in res.data.spec) {
								_this.specPost[item] = {}
								if (res.data.spec[item].length > 0) {
									this.activeSelect[item] = {
										name: '',
										active: true,
									}
									if (item == 'material') {
										this.activeSelect[item].namee = ''
									}
								}
							}
						}
						this.arrAll = {
							good_type:'',
							size_type :'',
							paper_spec_id :'',
							size_width :'',
							size_height :'',
							size_thickness:'',
							material_id:'',
							material_weight_id:'',
							print_type:'',
							print_color_id:'',
							spot_color_num:'',
							number:'',
							sticky_action_id :'',
							bag_mouth_height :'',
							bag_side_width :'',							
						}
						console.log(this.activeSelect, '规格列表')
						this.getobj = res.data
						this.spec = res.data.spec
					}
				})
			},

			getfea() {
				this.$u.get(this.api.getfeature).then(res => {
					if (res.code == 1) {
						this.tfea = res.data
					}
				})
			},
			getaddress() {
				this.$u.get(this.api.getSelfMentionAddress).then(res => {
					console.log(res);
					if (res.code == 1) {
						this.address = res.data.address
					}
				})
			},
			//添加购物车
			addShop() {
				let data = {
					good_id: this.getobj.id,
					spec: '',
					num: this.value,
					spec_id: this.getPriceData.id,
					good_type: this.getobj.good_type,
					type: this.typeId ? this.typeId : 1,
				}
				console.log(this.getobj.good_type, '++++++++', this.typeId)
				if (this.getobj.good_type == 2) {
					data.spec = JSON.stringify(this.getPriceData)
					this.$u.post(this.api.addGoodsCart, data).then(res => {
						console.log(res.code)
						if (res.code == 1) {
							this.$refs.uToast1.show({
								title: '加入成功',
								type: 'none',
							})
						} else {
							this.$refs.uToast1.show({
								title: '加入失败，请检查您的选择项',
								type: 'none',
							})
						}
					})
				}
				if (this.getobj.good_type == 1) {
					data.spec = JSON.stringify(this.getPriceData)
					// console.log(data)
				}
			},
			//立即购买
			goPay() {
				console.log(JSON.stringify(this.getPriceData), this.getobj.id, this.getPriceData, this.value, 0, this
					.getobj.good_type)
				let data = {
					good_id: this.getobj.id,
					// spec:JSON.stringify(this.getPriceData),
					spec: '',
					number: this.value,
					spec_id: 0,
					good_type: this.getobj.good_type,
				}
				if (this.getobj.good_type == 2) {
					data.spec = this.specStr
					this.$u.post(this.api.buynow, data).then(res => {
						console.log(res.code)
						var data = JSON.stringify(res.data)
						if (res.code == 1) {
							uni.navigateTo({
								url: '/pages/order/submit_orders/index?option=' + data + '&specId=' + this
									.id,
							})
						}
					})
				} else {
					this.$u.post('/goods/OtherPrice', data).then(res => {
						console.log(res)
					})
				}
				if (this.getobj.good_type == 1) {
					console.log(this.activeSelect)
				}

			},
			//客服
			chartGo() {
				if (plus.os.name == "Android") {
					var openUrl = 'mqqwpa://im/chat?chat_type=wpa&uin=' + 36212547;
					plus.nativeUI.showWaiting();
					var main = plus.android.runtimeMainActivity();
					var Intent = plus.android.importClass('android.content.Intent');
					var Uri = plus.android.importClass('android.net.Uri');
					var intent = new Intent(Intent.ACTION_VIEW, Uri.parse(openUrl));
					main.startActivity(intent);
				}
				if (plus.os.name == "iOS") {
					var openUrl = 'mqq://im/chat?chat_type=wpa&uin=' + 36551125 + '&version=1&src_type=web';
					plus.runtime.launchApplication({
						action: openUrl
					}, function(e) {
						plus.nativeUI.confirm("检查到您未安装qq，请先到appstore搜索下载？", function(i) {
							if (i.index == 0) {
								iosAppstore("itunes.apple.com/cn/app/mqq/");
							}
						});
					});
				}

			},
			// 商品收藏
			collentGoods(id) {
				const userInfo = uni.getStorageSync('userinfo')
				console.log(userInfo)
				if (userInfo !== '') {
					this.$u.get(`index/getLike?goods_id=${id}`).then(res => {
						console.log(res)
						if (this.collent) {
							this.collent = !this.collent
							this.$refs.uToast.show({
								title: '收藏成功',
								type: 'none',
							})
						} else {
							this.collent = !this.collent
							this.$refs.uToast.show({
								title: '取消收藏成功',
								type: 'none',
							})
						}
					})
				} else {
					uni.showModal({
						title: '温馨提示',
						content: '是否前往登录',
						success: function(res) {
							if (res.confirm) {
								console.log('去登录');
								uni.navigateTo({
									url: '/pages/userLogin/login'
								})
							} else if (res.cancel) {
								console.log('取消登录');
							}
						}
					});
				}
			},
			goComment(id) {
				uni.navigateTo({
					url: "/pages/allcomments/index?good_id=" + id
				})
			}
		}
	}
</script>

<style lang="less">
	.popup {
		height: 70vh;

		.popup_top {
			padding: 30rpx 20rpx 30rpx 60rpx;
			display: flex;
			align-items: end;

			&>view:nth-child(1) {
				width: 192rpx;
				height: 166rpx;
			}

			&>view:nth-child(2) {
				padding-left: 20rpx;

				&>view:nth-child(1) {
					font-size: 30rpx;
					color: #FF3000;
					font-weight: 700;
				}

				&>view:nth-child(2) {
					font-size: 24rpx;
					color: #333333;
				}
			}
		}

		.popup_content {
			padding: 10rpx 20rpx 30rpx 60rpx;

			.title {
				font-size: 28rpx;
				color: #333333;
				font-weight: 700;
				padding-bottom: 18rpx;
			}

			.cont_item {
				padding-bottom: 34rpx;

				.cont_itme_gir {
					display: flex;
					align-items: top;
					white-space: nowrap;

					&>div {
						span {
							display: inline-block;
							padding: 10rpx 30rpx;
							margin-right: 10rpx;
							border-radius: 50rpx;
							background-color: #E9E9E9;
						}
					}

					.active {
						span {
							background: #FE8109;
							color: #fff;
						}
					}
				}

				.cont_itme_gir2 {
					display: flex;
					align-items: top;
					white-space: nowrap;

					&>div {
						display: inline-block;
						padding: 10rpx 30rpx;
						margin-right: 10rpx;
						border-radius: 50rpx;
						background-color: #E9E9E9;
					}

					.active {
						background: #FE8109;
						color: #fff;
					}
				}

				.selectAll {
					height: 60rpx;
					display: flex;
					align-items: center;

					&>.select {
						display: flex;
						padding: 10rpx 30rpx;
						margin-right: 10rpx;
						border-radius: 5rpx;
						background-color: #E9E9E9;
					}

					.num {
						display: flex;
						align-items: center;

						&>p:nth-child(1) {
							width: 25rpx;
							height: 25rpx;
							margin-right: 10rpx;
							margin-left: 20rpx;
							border-radius: 50%;
							border: 1rpx solid #999;
						}

						.true {
							border: 1rpx solid #FE8109 !important;
							background: #FE8109;
						}
					}

					.numShow {
						flex: 1;
						margin-left: 30rpx;
						display: flex;
						align-items: center;

						.input {
							width: 100rpx;
							padding: 5rpx 10rpx;
							background: #e8e8e8;
						}

						.cheng {
							margin: 0 15rpx;
						}

						.danwei {
							margin-left: 10rpx;
						}
					}

					.active {
						background: #FE8109;
						color: #fff;
					}
				}

				.selectAll_craft {
					div {
						display: inline-block;
					}

					.item {
						margin: 4rpx 0rpx;
						padding: 8rpx 0rpx;
						display: flex;

						div {
							margin: 0 20rpx;
						}

						div:nth-child(1) {
							background-color: #e8e8e8;
							padding: 5rpx 20rpx;
						}

						div:nth-child(2) {
							background-color: #fff;

							.numShow {
								width: 400rpx;
								margin-left: 10rpx;
								display: flex;
								align-items: center;
								background-color: #fff;

								.input {

									width: 150rpx;
									padding: 5rpx 10rpx;
									background: #e8e8e8;
								}

								.cheng {
									margin: 0 10rpx;
								}

								.danwei {
									margin-left: 10rpx;
								}
							}

						}
					}

					.item2 {
						margin: 4rpx 0rpx;
						padding: 8rpx 0rpx;

						div {
							margin: 0 10rpx;
						}

						div:nth-child(1) {
							width: 150rpx;
							height: 50rpx;
							line-height: 50rpx;
							text-align: center;
							background-color: #e8e8e8;
							padding: 5rpx 10rpx;
						}

						div:nth-child(2) {
							background-color: #fff;

							.numShow {
								width: 400rpx;
								margin-left: 10rpx;
								display: flex;
								background-color: #fff;

								.input {
									text-align: center;
									width: 150rpx;
									padding: 5rpx 10rpx;
									background: #e8e8e8;
									text-align: left;
								}

								.cheng {
									margin: 0 10rpx;
								}

								.danwei {
									margin-left: 10rpx;
								}


							}
						}
					}
				}
			}

			.guigeDiv {
				position: relative;

				.guigeDivChild {
					display: flex !important;
					align-items: center;
					position: absolute;
					top: 0;
					bottom: -130rpx;

					div {
						padding: 5rpx 20rpx;
						margin-right: 10rpx;
						border-radius: 50rpx;
						background-color: #E9E9E9;
					}
				}
			}

		}

		.bottom {
			display: flex;
			padding: 20rpx 50rpx;
			justify-content: space-evenly;

			view {
				width: 214rpx;
				height: 56rpx;
				line-height: 56rpx;
				color: #FFFFFF;
				font-size: 30rpx;
				text-align: center;
				border-radius: 50rpx;
			}

			&>view:nth-child(1) {
				background-color: #FE8109;
			}

			&>view:nth-child(2) {
				background-color: #FF3000;
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
						&>text:nth-child(1) {
							font-size: 44rpx;
							color: #E94726;
							font-weight: 700;
						}

						&>text:nth-child(2) {
							font-size: 24rpx;
							color: #999899;
							font-weight: 700;
						}
					}

					&>view:nth-child(2) {
						font-size: 26rpx;
						color: #999899;
						font-weight: 500;
						padding-left: 32rpx;
						text-decoration: line-through;
					}
				}

				&>view:nth-child(2) {
					font-size: 24rpx;
					color: #999899;
					font-weight: 500;
				}
			}

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
				margin-bottom: 15rpx;
			}
		}
	}

	.u-cell {
		padding: 0 !important;
	}

	.goods_content {
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

		.goods_bottom_left {
			display: flex;
			width: 25%;
			justify-content: space-between;

			&>view {
				text-align: center;
			}
		}

		.goods_bottom_right {
			width: 70%;
			padding-left: 62rpx;

			.btn {
				width: 100%;
				height: 72rpx;
				background-color: #F79C22;
				color: #FFFFFF;
				font-size: 28rpx;
				text-align: center;
				line-height: 72rpx;
				border-radius: 36rpx;
			}
		}
	}

	.active {
		background-color: #F79C22 !important;
		color: #fff;

	}
</style>

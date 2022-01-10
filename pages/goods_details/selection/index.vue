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
						<view>
							<text>零售价：</text>
							<text>￥{{getobj.price.toFixed(2)}}</text>
							<!-- <text>零售价：￥{{getobj.price}}</text>
							<text>/张</text>
							<text>出厂价：￥{{getobj.market_price}}</text> -->
						</view>
						<view v-if="type==2||type==3||type==4||type==5">
							<text>出厂价：</text>
							<text>￥{{getobj.market_price.toFixed(2)}}</text>
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
						<u-cell-item :arrow="false" :title="address" :border-bottom="false"></u-cell-item>
					</u-form-item>
				</view>
				<view>
					<u-form-item label-width="auto" label="印刷文件">
						<u-cell-item :arrow="true" title="请选择印刷文件" :border-bottom="false" @click="sdfsdfr">
						</u-cell-item>
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
				<thelist :list="getobj.recommend" @theclick="theclick"></thelist>
			</view>
		</view>
		<view class="goods_bottom">
			<view class="goods_bottom_left">
				<view @click="collentGoods(getobj.id)">
					<view>
						<u-icon name="heart" v-if="!collent"></u-icon>
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
		<u-popup v-model="showt" mode="bottom" z-index="999" border-radius="50" height="500px">
			<view class="">
				<view style="text-align: center;line-height: 100rpx;height: 100rpx;font-size: 36rpx;">选择印刷文件</view>
				<view class="">
					<image src="/static/uiiii.png" mode="widthFix"></image>
				</view>
				<view class="" style="text-align: center;font-size: 30rpx;color: #333333;padding-bottom: 20rpx;">
					暂无上传文件
				</view>
				<view class="" style="text-align: center;color: #999999;font-size: 26rpx;">
					可去大象企采商城电脑端上传或联系平台客服
				</view>

				<view class="" style="padding: 32rpx;">
					<view
						style="background-color: #F79C22;color: #FFFFFF;text-align: center;font-size: 30rpx;line-height: 88rpx;height: 88rpx;border-radius: 50rpx;"
						@click="showt = false">确定</view>
				</view>
			</view>
		</u-popup>
		<u-popup v-model="show" mode="bottom" z-index="999" border-radius="50">
			<view class="popup">
				<view class="popup_top">
					<view>
						<image :src="getobj.banner_image[0]" mode=""></image>
					</view>
					<view>
						<view>¥{{sumPrice?sumPrice:getobjprice}}</view>
						<view>{{yixuanText?yixuanText:getobj.title}}</view>
					</view>
				</view>
				<!-- 规格 -->
				<view class="popup_content" v-if="getobj.good_type != 2 || getobj.good_type != 4">
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
								<p>{{activeSelect.numbers.name?activeSelect.numbers.name : getobj.spec.numbers[0].num?getobj.spec.numbers[0].num:getobj.spec.numbers[0].name}}
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
										placeholder="数量" :clearable="false" />
								</div>
							</div>
						</view>
					</view>
					<!-- <view class="cont_item" v-if="activeSelect.sticky_action">
						<view class="title">粘口</view>
						<view class="selectAll">
							<div class="select" v-if="activeSelect.sticky_action"
								@click="showSelect(true,1,getobj.spec.sticky_action,'sticky_action')">
								<p>{{activeSelect.sticky_action[0].name?activeSelect.sticky_action[0].name : getobj.spec.sticky_action[0].num?getobj.spec.sticky_action[0].num:getobj.spec.sticky_action[0].name}}
								</p>
								<p>↓</p>
							</div>
							
						</view>
					</view> -->
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
							
							<div v-show="specsshow"  class="select" @click="showSelect1(true,1,getobj.spec.material,'twoSelect')">
								<p>{{twoActive.label?twoActive.label:'请选择'}}
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
								<div v-if="item.active">
									<div class='numShow'>
										<div class="input">
											<u-input v-model="item.width" type="number" height="60rpx" placeholder="宽"
												:clearable="false" />
										</div>
										<div class="cheng">*</div>
										<div class="input">
											<u-input v-model="item.height" type="number" height="60rpx" placeholder="高"
												:clearable="false" />
										</div>
										<div class="danwei">mm</div>
									</div>
								</div>
							</div>
						</view>



					</view>
				</view>
				<view class="popup_content" v-if="getobj.good_type == 2">
					<view class="cont_item" v-for="(i,index) in spec" :key="index">
						<view class="title">{{i.title}}</view>
						<scroll-view class="guigeSc" scroll-x="true">
							<view class="cont_itme_gir2">
								<div :class="specPost[index] === item?'active guigeDiv':'guigeDiv'"
									v-for="(item,indexx) in i.data" :key="indexx" @tap="specTap(index,indexx,item)">
									{{item}}
								</div>
							</view>
						</scroll-view>
					</view>

					<!-- <view class="cont_item">
					<view class="title">款数</view>
					<u-number-box v-model="value" @change="valChange"></u-number-box>
				</view> -->
					<view>

					</view>
				</view>


				<view class="popup_content" v-if="getobj.good_type == 4">
					<view class="" style="font-weight: 600;display: flex;padding-bottom: 32rpx;">
						<view style="display: flex;width: 45%;padding-right: 30rpx;"><text
								style="white-space: nowrap;padding-right: 20rpx;">宽度(mm)</text> <input type="text"
								v-model="getobj.acreage_spec_width" style="background-color: #f7f7f7;" @blur="rent" />
						</view>
						<view style="display: flex;width: 45%;"><text
								style="white-space: nowrap;padding-right: 20rpx;">高度(mm)</text> <input type="text"
								v-model="getobj.acreage_spec_height" style="background-color: #f7f7f7;" @blur="rent" />
						</view>
					</view>
					<view class="cont_item" v-for="(i,index) in spec" :key="index">
						<view class="title">{{i.title}}</view>
						<scroll-view class="guigeSc" scroll-x="true">
							<view class="cont_itme_gir2">
								<div :class="specPost[index] === item?'active guigeDiv':'guigeDiv'"
									v-for="(item,indexx) in i.data" :key="indexx" @tap="specTap(index,indexx,item)">
									{{item}}
								</div>
							</view>
						</scroll-view>
					</view>

					<view class="cont_item" style="display: flex;justify-content: space-between;">
						<view class="title">数量</view>
						<u-number-box v-model="value" @change="valChange"></u-number-box>
					</view>
					<view>

					</view>
				</view>

				<view class="bottom">
					<view @tap="addShop('finish')">加入购物车
						<u-toast ref="uToast1" class="showToast" />
					</view>
					<view @tap="goPay('finish')">立即购买</view>
				</view>
			</view>
		</u-popup>
		<u-select v-model="selectShow" :list="selectList" @confirm="confirm"></u-select>
		<u-select v-model="selectShow1" :list="twoSerect" @confirm="confirm1"></u-select>
	</view>
</template>

<script>
	import the_list from '../../../components/the_list/index.vue'
	import {isWeixin} from '../../../common/isWatch.js'
	export default {
		data() {
			return {
				popShow: false,
				isActive: true,
				id: '',
				count: 5,
				value: 1,
				collent: true,
				content: `
					<p>露从今夜白，月是故乡明</p>
					<img src="https://cdn.uviewui.com/uview/swiper/2.jpg" />
				`,
				getobj: {},
				tfea: [],
				address: '',
				show: false, //规格弹窗
				selectShow: false, //规格多选弹窗
				selectShow1: false, //二级选择弹窗
				//规格多选列表
				selectList: [
					{
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
					design_file: '',
					type: 1,
					spec_id: 0,
					spec: {
						craft: [],
						material_weight_id: '',
						material_id: '',
						number: '',
						paper_spec_id: '',
						size_type: ''
					},
					special: {
						craft: [],
						material_weight_id: '',
						material_id: '',
						number: '',
						paper_spec_id: '',
						size_type: ''
					}

				},
				twoSerect: [], //二级选择列表
				twoActive: {
					value: '',
					label: '',
				}, //二级选中数据
				arr_: [],
				arrAll: '', //所有参数列表
				sumPrice: '',
				yixuanText: '',
				showt: false,
				getobjprice: 0,
				goCart: false,
				specsshow:false,
				goPayt:'',
				postData:{},
				OtherData:{},
				type:''
			}
		},
		computed: {
			apiArr() {
				var _this = this;
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
			console.log(this.selectList,this.twoSerect,'selectList')
			console.log(uni.getStorageSync('userinfo').type,'userinfo')
			this.type = uni.getStorageSync('userinfo').type
			
		},
		methods: {

			//工艺选中
			ac(i, item) {
				console.log(i,item,this.arr_,this.getobj.good_type)
				this.goodsMessage.spec.craft.push(item)
				if (i == 0 || i == 1 || i == 2) {
					this.arr_[i].isactive = !this.arr_[i].isactive
					this.arr_[i].active = !this.arr_[i].active
				} else {
					this.arr_[i].active = false
					this.arr_[i].isactive = !this.arr_[i].isactive
				}
				if(this.arr_.length>6){
					if (this.arr_[6].isactive) {
						this.arr_[5].isactive = !this.arr_[6].isactive
					}
					if (this.arr_[5].isactive) {
						this.arr_[6].isactive = !this.arr_[5].isactive
					}
				}
				// if (this.arr_[6].isactive) {
				// 	this.arr_[5].isactive = !this.arr_[6].isactive
				// }
				// if (this.arr_[5].isactive) {
				// 	this.arr_[6].isactive = !this.arr_[5].isactive
				// }
				if(this.getobj.good_type == 12){
					this.getPrice(3)
				}else if(this.getobj.good_type == 4){
					this.getPrice(2)
				}else if(this.getobj.good_type == 3){
					this.getPrice(6)
				}else{
					this.getPrice(1)
				}
				// this.getPrice(1)
			},
			// 选中自定义价格, 隐藏下拉选价格
			hiddenSelect(key) {
				this.activeSelect[key].active = !this.activeSelect[key].active
				this.activeSelect[key].name = ''
				console.log(this.activeSelect[key].active)
				if (this.activeSelect[key].active) {
					this.activeSelect[key].id = this.getobj.spec.paper[0].id
					this.activeSelect[key].name = key == 'paper' ? this.getobj.spec.paper[0].name + '(' + this.getobj.spec
						.paper[0].madeup_width + '*' + this.getobj.spec.paper[0].madeup_width + ')' : this.getobj.spec
						.numbers[0].num
				}
				this.$forceUpdate()
				// this.getPrice(1)
				if(this.getobj.good_type == 12){
					this.getPrice(3)
				}else if(this.getobj.good_type == 4){
					this.getPrice(2)
				}else if(this.getobj.good_type == 3){
					this.getPrice(6)
				}else{
					this.getPrice(1)
				}
			},
			showSelect1() { //二级选择弹窗
				this.selectShow1 = true
			},
			confirm1(e) {
				this.twoActive = e[0]
				// this.getPrice(1)
				if(this.getobj.good_type == 12){
					this.getPrice(3)
				}else if(this.getobj.good_type == 4){
					this.getPrice(2)
				}else if(this.getobj.good_type == 3){
					this.getPrice(6)
				}else{
					this.getPrice(1)
				}
			},
			showSelect(b, i, arr, key) { //打开规格选中弹窗
				let selectArr = []

				arr.forEach(item => {
					if (key == 'paper') {
						selectArr.push({
							value: item.id,
							label: item.name + '(' + item.madeup_width + '*' + item.madeup_height + ')',
						})
						this.goodsMessage.spec.paper_spec_id = item.id
						this.goodsMessage.special.paper_spec_id = item.id
					}
					// numbers
					if (key == 'numbers') {
						selectArr.push({
							value: item.id,
							label: item.num?item.num:item.name
						})
						this.goodsMessage.spec.number = item.num?item.num:item.name
						this.goodsMessage.special.number = item.num?item.num:item.name
					}
					// if (key == 'sticky_action') {
						
					// 	selectArr.push({
					// 		value: item.id,
					// 		label: item.name
					// 	})
						
					// }
					
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
					
						selectArr.push({
							value: item.id,
							label: item.name,
							specs: item.specs,
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
				var _this = this
				this.activeSelect[this.selectKey] = {
					name: e[0].label,
					id: e[0].value,
					active: true,
				}
				console.log("确定");
				console.log(_this.selectKey );
				console.log(_this.selectList);
				console.log(e);
				console.log(this.activeSelect.paper);
				this.goodsMessage[this.selectKey] = e[0].label
				this.goodsMessage.spec.size_type = this.goodsMessage.paper
				if(this.getobj.good_type != 12){
					this.goodsMessage.spec.size_width = this.activeSelect.paper.min
					this.goodsMessage.spec.size_height = this.activeSelect.paper.max
					this.goodsMessage.special.size_type = this.goodsMessage.paper
					this.goodsMessage.special.size_width = this.activeSelect.paper.min
					this.goodsMessage.special.size_height = this.activeSelect.paper.max
				}
				this.goodsMessage.number = this.activeSelect.numbers.num
				if (_this.selectKey == 'material') {
					_this.selectList.forEach(item => {
						if (item.value == e[0].value) {
							
							_this.twoSerect = [];
							_this.twoActive = {
								value: '',
								label: '',
							}
							if(item.specs){
								item.specs.forEach(function(i) {
									_this.twoSerect.push({
										value: i.id,
										label: i.weight,
									})
								})
								this.specsshow = true
							}else{
								this.specsshow = false
							}
							
						}	
					})
				}
				if(this.getobj.good_type == 12){
					this.getPrice(3)
				}else if(this.getobj.good_type == 4){
					this.getPrice(2)
				}else if(this.getobj.good_type == 3){
					this.getPrice(6)
				}else{
					this.getPrice(1)
				}
			},
			peisongDetails() {},
			//规格选中
			specTap(i, j, text) {
				var good_type = this.getobj.good_type
				if (good_type == 2 || good_type == 4) {
					let str = ''
					this.$set(this.specPost, i, text)
					this.specPost.forEach(item => {
						if (item) {
							if (str == '') {
								str += item
							} else {
								str += '-' + item
							}
						}
					})
					console.log(this.specPost,'post')
					this.specStr = str;
					if (good_type == 2) {
						this.getPrice()
					} else {
						this.getPrice(2)
					}
				} else if (good_type == 1) {
					if (text.specs && text.specs.length > 0) {
						text.open = true
					} else {
						text.open = false
					}
					this.$set(this.specPost, i, text)
					this.$forceUpdate()
				}
			},
			rent() {
				this.getPrice(2)
			},
			// 更改数量
			valChange() {
				if(this.getobj.good_type == 12){
					this.getPrice(3)
				}else if(this.getobj.good_type == 4){
					this.getPrice(2)
				}else if(this.getobj.good_type == 3){
					this.getPrice(6)
				}else{
					this.getPrice(1)
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
						if (res.data.good_type == 2 || res.data.good_type == 4) {
							this.collent = res.data.is_collect
							res.data.spec.forEach(element => {
								_this.specPost.push(false)
							});
						} else  if(res.data.good_type == 12){
							this.goodsMessage.good_type = res.data.good_type
							this.goodsMessage.good_id = res.data.id
							this.goodssList = res.data.good_type
							this.collent = res.data.is_collect
							for (let i = 0; i < res.data.spec.craft.length; i++) {
								res.data.spec.craft[i].active = false;
								res.data.spec.craft[i].isactive = false;
								if(res.data.spec.craft[i].type == 3){
										res.data.spec.craft[i].width = ''
										res.data.spec.craft[i].height = ''
									}
								_this.arr_.push(res.data.spec.craft[i])
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
						}else if (res.data.good_type != 2 || res.data.good_type != 4 || res.data.good_type != 12) {
							this.goodsMessage.good_type = res.data.good_type
							this.goodsMessage.good_id = res.data.id
							this.goodssList = res.data.good_type
							this.collent = res.data.is_collect
							this.activeSelect.sticky_action = res.data.sticky_action
							for (let i = 0; i < res.data.spec.craft.length; i++) {
								if (res.data.spec.craft[i].specs.length > 0) {
									res.data.spec.craft[i].specs.forEach(function(value, j) {
										value.active = false;
										value.isactive = false;
										if (value.type == 3) {
											value.width = ''
											value.height = ''
										}
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
							good_type: '',
							size_type: '',
							paper_spec_id: '',
							size_width: '',
							size_height: '',
							size_thickness: '',
							material_id: '',
							material_weight_id: '',
							print_type: '',
							print_color_id: '',
							spot_color_num: '',
							number: '',
							sticky_action_id: '',
							bag_mouth_height: '',
							bag_side_width: '',
						}
						this.getobj = res.data
						this.getobj.spec.sticky_action = []
						this.spec = res.data.spec
						this.getobjprice = res.data.price
					}else if(res.code == 111){
						uni.showToast({
							title:res.msg,
							icon:'none',
							duration:1800
						})
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},1500)
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none',
							duration:3000
						})
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
					if (res.code == 1) {
						this.address = res.data.address
					}
				})
			},
			//添加购物车
			addShop(text) {
				let data = {
					good_id: this.getobj.id,
					spec: '',
					num: this.value,
					spec_id: this.getPriceData.id,
					good_type: this.getobj.good_type,
					type: this.typeId ? this.typeId : 1,
				}
				if (this.getobj.good_type == 2) {
					data.spec = JSON.stringify(this.getPriceData)
					console.log(this.goCart, '222')
					if (this.goCart == true) {
						this.$u.post(this.api.addGoodsCart, data).then(res => {
							if (res.code == 1) {
								this.$refs.uToast1.show({
									title: '加入成功',
									type: 'none',
								})
							}else {
								this.$refs.uToast1.show({
									title: res.msg,
									type: 'none',
								})
							}
						})
					} else {
						this.$refs.uToast1.show({
							title: '请选择规格',
							type: 'none',
						})
					}
				}
				else if (this.getobj.good_type == 4) {
					this.getPrice(2, false, 1)
				} else if(this.getobj.good_type == 12){
					this.goPayt = text
					this.getPrice(3, false, 1)
				}else if(this.getobj.good_type == 3){
					this.goPayt = text
					this.getPrice(6, false, 1)
				}else{
					this.goPayt = text
					this.getPrice(1, false, 1)
				}
				// if (this.getobj.good_type != 2 || this.getobj.good_type != 4) {
				// 	this.getPrice(1, true, 1)
				// } else {
				// 	this.getPrice(2, true, 1)
				// }
			},
			//立即购买
			goPay(text) {
				let buyData = {
					good_id: this.getobj.id,
					// spec:JSON.stringify(this.getPriceData),
					spec: '',
					number: this.value,
					spec_id: 0,
					good_type: this.getobj.good_type,
				}
				if (this.getobj.good_type == 2) {
					console.log(this.getobj.good_type ,'this.getobj.good_type ')
					buyData.spec = this.specStr
					uni.setStorageSync('payObj', JSON.stringify(buyData))
					this.$u.post(this.api.buynow, buyData).then(res => {
						var data = JSON.stringify(res.data)
						// uni.navigateTo({
						// 	url: '/pages/order/submit_orders/index?option=' + 	data + '&specId=' + this
						// 		.id+'&buyData='+JSON.stringify(buyData),
						// })
						if (res.code == 1) {
							if(isWeixin()){
								uni.navigateTo({
									url: '/pages/order/submit_orders/index?option=' + 	data + '&specId=' + this
										.id+'&buyData='+JSON.stringify(buyData),
								})
							}else{
								uni.navigateTo({
									url:'../GoWatch/GoWatch'
								})
							}
							
						}
					})
				} else if (this.getobj.good_type == 4) {
					this.getPrice(2, true)
				} else if(this.getobj.good_type == 12){
					this.goPayt = text
					this.getPrice(3, true)
				}else if(this.getobj.good_type == 3){
					this.goPayt = text
					this.getPrice(6, true, 1)
				}else{
					this.goPayt = text
					this.getPrice(1, true)
				}
			},
			// 获取价格
			// 2 true 1
			getPrice(type, pay, add) {
				var _this = this;
				let craft = [];
				
				this.arr_.forEach(item => {
					if(item.isactive&&item.name== '压痕'){
						item.folder =''
					}
					if (item.isactive) {
						craft.push(item)
					}
				})
				if (type == 1) {
					console.log("*///////////////////////////////******************");
					console.log(_this.twoActive,_this.getobj.id,_this.getobj)
					// if(_this.getobj.good_type != 12){
						let data = {
							size_type: 1, //尺寸类型 
							paper_spec_id: _this.activeSelect['paper'] ? _this.activeSelect['paper'].id ? _this
								.activeSelect['paper'].id : _this.getobj.spec.paper[0].id : '', //尺寸id
							// paper_spec_id: _this.activeSelect['paper'].id?_this.activeSelect['paper'].id:_this.getobj.spec.paper[0].id, //尺寸id
							size_width: _this.activeSelect['paper'] ? !_this.activeSelect['paper'].active ? _this
								.activeSelect['paper'].max : '' : '', //自定义尺寸宽度
							size_height: _this.activeSelect['paper'] ? !_this.activeSelect['paper'].active ? _this
								.activeSelect['paper'].min : '' : '', //自定义尺寸高度
							size_thickness: '', //自定义尺寸厚度
							material_id: _this.activeSelect['material'] ? _this.activeSelect['material'].id ? _this
								.activeSelect['material'].id : _this.getobj.spec.material[0].id : '', //材料
								// specs[0].
							material_weight_id: _this.twoActive.value ? _this.twoActive.value : _this.getobj.spec.material[
								0].id, //纸张宽度id
							print_type: '2',  //印刷类型
							print_color_id: _this.activeSelect['print_color'] ? _this.activeSelect['print_color'].id ?
								_this.activeSelect['print_color'].id : _this.getobj.spec.print_color[0].id : '', // 印刷色彩id
							spot_color_num: _this.activeSelect['spot_color'] ? _this.activeSelect['spot_color'].id ? _this
								.activeSelect['spot_color'].id : _this.getobj.spec.spot_color[0].id : '', //专色
							number: _this.activeSelect['numbers'].active ? _this.activeSelect['numbers'].name ? _this
								.activeSelect['numbers'].name : _this.getobj.spec.numbers[0].num : _this.activeSelect[
									'numbers'].num, //印刷数量
							sticky_action_id: '', //粘袋方式id
							bag_mouth_height: '', //袋口高度
							bag_side_width: '', //侧宽
							pnumber: this.pnumbers(), //P数
							craft: craft,
							folder:'',
						}
						console.log(_this.activeSelect['paper'], '第一个');
						let dataa = {
							// good_type: _this.getobj.good_type,
							size_type: 1, //尺寸类型 
							paper_spec_id: _this.activeSelect['paper'] ? _this.activeSelect['paper'].id ? _this
								.activeSelect['paper'].id : _this.getobj.spec.paper[0].id : '', //尺寸id
							size_width: _this.activeSelect['paper'] ? _this.activeSelect['paper'].active ? '' : _this
								.activeSelect['paper'].max : "", //自定义尺寸宽度
							size_height: _this.activeSelect['paper'] ? _this.activeSelect['paper'].active ? '' : _this
								.activeSelect['paper'].min : '', //自定义尺寸高度
							size_thickness: '', //自定义尺寸厚度
							material_id: _this.activeSelect['material'] ? _this.activeSelect['material'].id ? _this
								.activeSelect['material'].id : _this.getobj.spec.material[0].id : "", //材料
								// .specs[0]
							material_weight_id: _this.twoActive.value ? _this.twoActive.value : _this.getobj.spec.material[
								0].id, //纸张宽度id
							print_type: '2', //印刷类型
							print_color_id: _this.activeSelect['print_color'] ? _this.activeSelect['print_color'].id ?
								_this.activeSelect['print_color'].id : _this.getobj.spec.print_color[0].id : '', // 印刷色彩id
							spot_color_num: _this.activeSelect['spot_color'] ? _this.activeSelect['spot_color'].id ? _this
								.activeSelect['spot_color'].id : _this.getobj.spec.spot_color[0].id : '', //专色
							number: _this.activeSelect['numbers'] ? _this.activeSelect['numbers'].active ? _this
								.activeSelect['numbers'].name ? _this.activeSelect['numbers'].name : _this.getobj.spec
								.numbers[0].num : _this.activeSelect['numbers'].num : '', //印刷数量
							sticky_action_id: '', //粘袋方式id
							bag_mouth_height: '', //袋口高度
							bag_side_width: '', //侧宽
							pnumber: this.pnumbers(), //P数
							craft: [],
							folder:'',
						}
					// }else{
					// 	let data ={
					// 		good_id:this.getobj.id,
					// 		good_type:11,
					// 		number: _this.activeSelect['numbers'] ? _this.activeSelect['numbers'].active ? _this
					// 		.activeSelect['numbers'].name ? _this.activeSelect['numbers'].name : _this.getobj.spec
					// 		.numbers[0].num : _this.activeSelect['numbers'].num : '',
					// 		spec_name:'',
					// 		size_width:_this.getobj.acreage_spec_width,
					// 		size_height:_this.getobj.acreage_spec_height,
					// 		spec_id:0,
					//      spec: JSON.stringify(data),
					// 	}
					// 	_this.$u.post('goods/postAreaCraftsSpec',data).then(res=>{
					// 		console.log(res);
					// 	})
					// }
					
					if(_this.getobj.good_type == 1){
						this.postData  = {
							craft:craft,
							design_file: [""],
							good_id: this.getobj.id,
							good_type: 1,
							material_id: _this.activeSelect['material'] ? _this.activeSelect['material'].id ? _this
							.activeSelect['material'].id : _this.getobj.spec.material[0].id : "",
							// specs[0].
							material_weight_id:_this.twoActive.value ? _this.twoActive.value : _this.getobj.spec.material[
							0].id, 
							number:  _this.activeSelect['numbers'] ? _this.activeSelect['numbers'].active ? _this
							.activeSelect['numbers'].name ? _this.activeSelect['numbers'].name : _this.getobj.spec
							.numbers[0].num : _this.activeSelect['numbers'].num : '',
							paper_spec_id: _this.activeSelect['paper'] ? _this.activeSelect['paper'].id ? _this
							.activeSelect['paper'].id : _this.getobj.spec.paper[0].id : '',
							pnumbers: this.pnumbers(),
							print_color_id: _this.activeSelect['print_color'] ? _this.activeSelect['print_color'].id ?
							_this.activeSelect['print_color'].id : _this.getobj.spec.print_color[0].id : '',
							print_type: 1,
							sample_file: [""],
							size_height:  _this.activeSelect['paper'] ? _this.activeSelect['paper'].active ? '' : _this
							.activeSelect['paper'].min : '',
							size_thickness: "0",
							size_type: 1,
							size_width: _this.activeSelect['paper'] ? _this.activeSelect['paper'].active ? '' : _this
							.activeSelect['paper'].max : "",
							spec_id: 0,
							spec_number: "",
							spot_color_num:  _this.activeSelect['spot_color'] ? _this.activeSelect['spot_color'].id ? _this
							.activeSelect['spot_color'].id : _this.getobj.spec.spot_color[0].id : '',
							sticky_action_id: "",
							type: 1
						}
						this.$u.post('goods/postPrice',this.postData).then(res => {
								console.log(res, '66')
								if(res.code == 999){
										uni.showToast({
											title:res.message,
											icon:'none',
											duration:3000
										})
									return;
								}
								if (!pay&&add ==1) {
									
									console.log(res.data[0].this.spec.snap, '加入购物车')
									let addData = {
										good_id: this.getobj.id,
										spec: '',
										num: _this.activeSelect['numbers'].name ? _this.activeSelect['numbers'].name :
											_this.getobj.spec.numbers[0].num,
										spec_id: 0,
										type: 1,
										good_type: this.getobj.good_type,
									}
									addData.spec = JSON.stringify(res.data[0].this)
									console.log(res.data[0].this.spec.snap, '888')
									let number = res.data[0].this.number
									let pnumber = res.data[0].this.snapSpec.pnumber
									if (!pay&&res.data[0].this.spec.snap?res.data[0].this.spec.snap.length>=5:res.data[0].this.snapSpec.craft.length>=5 ) {
										this.$u.post(this.api.addGoodsCart, addData).then(res => {
											if (res.code == 1) {
												this.$refs.uToast1.show({
													title: '加入成功',
													icon: 'none',
												})
											}else{
												this.$refs.uToast1.show({
													title: res.msg,
													icon: 'none',
												})
											}
										})
										
									} else {
										this.$refs.uToast1.show({
											title: '请选择工艺',
											icon: 'none',
										})
										}
										return;
									}
									if (res.code == 1) {
										this.yixuanText = ''
										this.sumPrice = res.data[0].this.sumPrice
										this.yixuanText += res.data[0].this.number
										// for (let i = 0; i < res.data[0].this.spec.snap.length; i++) {
										// 	if (this.yixuanText == '') {
										// 		this.yixuanText += res.data[0].this.spec.snap[i]
										// 	} else {
										// 		this.yixuanText += ' ' + res.data[0].this.spec.snap[i]
										// 	}
										// }
										if (pay) {
										let	buyData = {
												good_id: this.getobj.id,
												spec: '',
												number: 1,
												spec_id: 0,
												good_type: this.getobj.good_type,
											}
											buyData.spec = JSON.stringify(res.data[0].this);
											buyData.special = JSON.stringify(dataa)
											uni.setStorageSync('payObj', JSON.stringify(buyData))
											//m
											this.$u.post(this.api.buynow, buyData).then(res => {
												if (res.code == 1) {
													// uni.navigateTo({
													// 	url: '/pages/order/submit_orders/index?option=' +
													// 		JSON
													// 		.stringify(res.data) + '&specId=0'+'&data='+JSON.stringify(this.postData)+'&buyData='+JSON.stringify(buyData),
													// })
													if(isWeixin()){
														uni.navigateTo({
															url: '/pages/order/submit_orders/index?option=' +
																JSON
																.stringify(res.data) + '&specId=0'+'&data='+JSON.stringify(this.postData)+'&buyData='+JSON.stringify(buyData),
														})
													}else{
														uni.navigateTo({
															url:'../GoWatch/GoWatch'
														})
													}
												}
											})
										}
								}
						})
					}
					else{
						this.OtherData ={
							good_id: this.goodsMessage.good_id,
							good_type: this.goodsMessage.good_type,
							number: _this.activeSelect['numbers'].active ? _this.activeSelect['numbers'].name ? _this
								.activeSelect['numbers'].name : _this.getobj.spec.numbers[0].num : _this.activeSelect[
									'numbers'].num,
							pnumber: _this.activeSelect['pnumbers'] ? _this.activeSelect['pnumbers'].name : '',
							spec: JSON.stringify(data),
							special: JSON.stringify(dataa),
						}
						this.$u.post(this.api.OtherPrice,this.OtherData).then(res => {
								console.log(res, '66')
								console.log(res, '66')
								if(res.code == 999){
										uni.showToast({
											title:res.message,
											icon:'none',
											duration:3000
										})
									return;
								}
								if (add) {
									console.log(res.data[0].this.spec.snap, '加入购物车')
									let addData = {
										good_id: this.getobj.id,
										spec: '',
										num: _this.activeSelect['numbers'].name ? _this.activeSelect['numbers'].name :
											_this.getobj.spec.numbers[0].num,
										spec_id: 0,
										type: 1,
										good_type: this.getobj.good_type,
									}
									addData.spec = JSON.stringify(res.data[0].this)
									console.log(res.data[0].this.spec.snap, '888')
									let number = res.data[0].this.number
									let pnumber = res.data[0].this.special.snapSpec.pnumber
									if (res.data[0].this.spec.snap.length >= 5 && number != '' && pnumber != '') {
										this.$u.post(this.api.addGoodsCart, addData).then(res => {
											if (res.code == 1) {
												this.$refs.uToast1.show({
													title: '加入成功',
													icon: 'none',
												})
											}
										})
									} else {
										this.$refs.uToast1.show({
											title: '请选择工艺',
											icon: 'none',
										})
										}
										return;
									}
									if (res.code == 1) {
										this.yixuanText = ''
										this.sumPrice = res.data[0].this.sumPrice
										for (let i = 0; i < res.data[0].this.spec.snap.length; i++) {
											if (this.yixuanText == '') {
												this.yixuanText += res.data[0].this.spec.snap[i]
											} else {
												this.yixuanText += ' ' + res.data[0].this.spec.snap[i]
											}
										}
										if (pay) {
											let buyData = {
												good_id: this.getobj.id,
												spec: '',
												number: 1,
												spec_id: 0,
												good_type: this.getobj.good_type,
											}
											console.log(buyData,'buydata')
											buyData.spec = JSON.stringify(res.data[0].this);
											buyData.special = JSON.stringify(dataa)
											uni.setStorageSync('payObj', JSON.stringify(buyData))
											var payobj = uni.getStorageSync('payObj')
											console.log(JSON.parse(payobj),'payobj')
											//m
											this.$u.post(this.api.buynow, buyData).then(res => {
												console.log(res,'res')
												if (res.code == 1) {
													// uni.navigateTo({
													// 	url: '/pages/order/submit_orders/index?option=' +
													// 		JSON
													// 		.stringify(res.data) + '&specId=0'+'&data='+JSON.stringify(this.OtherData)+'&buyData='+JSON.stringify(buyData),
													// })
													if(isWeixin()){
														uni.navigateTo({
															url: '/pages/order/submit_orders/index?option=' +
																JSON
																.stringify(res.data) + '&specId=0'+'&data='+JSON.stringify(this.OtherData)+'&buyData='+JSON.stringify(buyData),
														})
													}else{
														uni.navigateTo({
															url:'../GoWatch/GoWatch'
														})
													}
												}
											})
										}
									} else if(res.code == 999){
										if(_this.goPayt == 'finish'){
											uni.showToast({
												title:res.message,
												icon:'none',
											})
											this.goPayt = ''
										}
									}
								})
					}}else if (type == 2) {
						let data = {
							good_id: this.getobj.id,
							good_type: this.getobj.good_type,
							number: this.value,
							spec_name: this.specStr,
							size_width: this.getobj.acreage_spec_width,
							size_height: this.getobj.acreage_spec_height,
							spec_id: 0
						}
						this.$u.post('/goods/postAreaSpec', data).then(res => {
							if (res.code == 1) {
								this.getPriceData = res.data
								this.id = res.data.id
								this.getobjprice = res.data.price
								this.getobj.title = this.getPriceData.spec
								this.getobj.price = this.getPriceData.price
								console.log(res, '66')
								if(res.code == 999){
										uni.showToast({
											title:res.message,
											icon:'none',
											duration:3000
										})
									return;
								}
								
								if (pay == true) {
									console.log('pay')
									let spec = {
										size_height: Number(this.getobj.acreage_spec_height),
										size_width: Number(this.getobj.acreage_spec_height),
										spec_id: res.data.id
									}
									let buyData = {
										good_id: this.getobj.id,
										spec_name: this.specStr,
										number: _this.value,
										spec_id: res.data.id,
										good_type: this.getobj.good_type,
										size_height: Number(this.getobj.acreage_spec_height),
										size_width: Number(this.getobj.acreage_spec_width),
										spec: JSON.stringify(spec),
										type:1
									}
									uni.setStorageSync('payObj', JSON.stringify(buyData))
									this.$u.post(this.api.buynow, buyData).then(res => {
										if (res.code == 1) {
											// uni.navigateTo({
											// 	url: '/pages/order/submit_orders/index?option=' +
											// 		JSON
											// 		.stringify(res.data) + '&specId=0'+'&buyData='+JSON.stringify(buyData),
											// })
											if(isWeixin()){
												uni.navigateTo({
													url: '/pages/order/submit_orders/index?option=' +
														JSON
														.stringify(res.data) + '&specId=0'+'&buyData='+JSON.stringify(buyData),
												})
											}else{
												uni.navigateTo({
													url:'../GoWatch/GoWatch'
												})
											}
										}else{
											this.$refs.uToast1.show({
												title: res.msg,
												icon: 'none',
											})
										}
									})
								}else if(pay == false) {
									console.log('cart')
									let spec = {
										size_height: Number(this.getobj.acreage_spec_height),
										size_width: Number(this.getobj.acreage_spec_height),
										spec_id: res.data.id
									}
									let data = {
										good_id: this.getobj.id,
										spec_name: this.specStr,
										num: _this.value,
										spec_id: res.data.id,
										good_type: this.getobj.good_type,
										// size_height: Number(this.getobj.acreage_spec_height),
										// size_width: Number(this.getobj.acreage_spec_width),
										spec: JSON.stringify(spec),
										type:1
									}
									uni.setStorageSync('payObj', JSON.stringify(data))
									this.$u.post(this.api.addGoodsCart, data).then(res => {
										if (res.code == 1) {
											this.$refs.uToast1.show({
												title: '加入成功',
												icon: 'none',
											})
										}else{
											this.$refs.uToast1.show({
												title: res.msg,
												icon: 'none',
											})
										}
									})
								}
							}
						})
					} else if(type == 3){
					let data ={
							good_id:this.getobj.id,
							good_type:11,
							number: _this.activeSelect['numbers'] ? _this.activeSelect['numbers'].active ? _this
							.activeSelect['numbers'].name ? _this.activeSelect['numbers'].name : _this.getobj.spec
							.numbers[0].num : _this.activeSelect['numbers'].num : '',
							spec_name:'',
							size_width:_this.getobj.acreage_spec_width,
							size_height:_this.getobj.acreage_spec_height,
							spec_id:0,
							spec: JSON.stringify(data),
						}
						_this.$u.post('goods/postAreaCraftsSpec',data).then(res=>{
							if (res.code == 1) {
								this.getPriceData = res.data
								this.id = res.data.id
								this.getobjprice = res.data.price
								this.getobj.title = this.getPriceData.spec
								this.getobj.price = this.getPriceData.price						
								if (pay) {
									let spec = {
										size_height: Number(this.getobj.acreage_spec_height),
										size_width: Number(this.getobj.acreage_spec_height),
										spec_id: res.data.id
									}
									let buyData = {
										good_id: this.getobj.id,
										spec_name: this.specStr,
										number: _this.value,
										spec_id: res.data.id,
										good_type: this.getobj.good_type,
										size_height: Number(this.getobj.acreage_spec_height),
										size_width: Number(this.getobj.acreage_spec_width),
										spec: JSON.stringify(spec),
									}
									uni.setStorageSync('payObj', JSON.stringify(buyData))
									this.$u.post(this.api.buynow, buyData).then(res => {
										if (res.code == 1) {
											// uni.navigateTo({
											// 	url: '/pages/order/submit_orders/index?option=' +
											// 		JSON
											// 		.stringify(res.data) + '&specId=0'+'&buyData='+JSON.stringify(buyData),
											// })
											if(isWeixin()){
												uni.navigateTo({
													url: '/pages/order/submit_orders/index?option=' +
														JSON
														.stringify(res.data) + '&specId=0'+'&buyData='+JSON.stringify(buyData),
												})
											}else{
												uni.navigateTo({
													url:'../GoWatch/GoWatch'
												})
											}
										}
										
									})
								}
							} else if(res.code == 0){
								if(_this.goPayt == 'finish'){
									uni.showToast({
										title:res.data,
										icon:'none',
									})
									this.goPayt = ''
								}
							}
						})
						
					//手提袋，商品类型type == 3
					}else if(type == 6){
						this.postData  = {
							bag_mouth_height:40,
							bag_side_width:15,
							craft:craft,
							// design_file: [""],
							good_id: this.getobj.id,
							good_type: 3,
							material_id: _this.activeSelect['material'] ? _this.activeSelect['material'].id ? _this
							.activeSelect['material'].id : _this.getobj.spec.material[0].id : "",
							// specs[0].
							material_weight_id:_this.twoActive.value ? _this.twoActive.value : _this.getobj.spec.material[
							0].id, 
							number:  _this.activeSelect['numbers'] ? _this.activeSelect['numbers'].active ? _this
							.activeSelect['numbers'].name ? _this.activeSelect['numbers'].name : _this.getobj.spec
							.numbers[0].num : _this.activeSelect['numbers'].num : '',
							paper_spec_id: _this.activeSelect['paper'] ? _this.activeSelect['paper'].id ? _this
							.activeSelect['paper'].id : _this.getobj.spec.paper[0].id : '',
							pnumbers: this.pnumbers(),
							print_color_id: _this.activeSelect['print_color'] ? _this.activeSelect['print_color'].id ?
							_this.activeSelect['print_color'].id : _this.getobj.spec.print_color[0].id : '',
							print_type: 1,
							// sample_file: [""],
							size_height:  _this.activeSelect['paper'] ? _this.activeSelect['paper'].active ? '' : _this
							.activeSelect['paper'].min : '',
							size_thickness: "0",
							size_type: 2,
							size_width: _this.activeSelect['paper'] ? _this.activeSelect['paper'].active ? '' : _this
							.activeSelect['paper'].max : "",
							spec_id: 0,
							spec_number: "",
							spot_color_num:  _this.activeSelect['spot_color'] ? _this.activeSelect['spot_color'].id ? _this
							.activeSelect['spot_color'].id : _this.getobj.spec.spot_color[0].id : '',
							sticky_action_id: 13,
							type: 3
						}
						this.$u.post('goods/postPrice',this.postData).then(res => {
								console.log(res, '66')
								if(res.code == 999){
										uni.showToast({
											title:res.message,
											icon:'none',
											duration:3000
										})
									return;
								}
								if (!pay&&add ==1) {
									console.log(res.data[0].this.spec.snap, '加入购物车')
									let addData = {
										good_id: this.getobj.id,
										spec: '',
										num: _this.activeSelect['numbers'].name ? _this.activeSelect['numbers'].name :
											_this.getobj.spec.numbers[0].num,
										spec_id: 0,
										type: 1,
										good_type: this.getobj.good_type,
									}
									addData.spec = JSON.stringify(res.data[0].this)
									console.log(res.data[0].this.spec.snap, '888')
									let number = res.data[0].this.number
									let pnumber = res.data[0].this.snapSpec.pnumber
									if (!pay&&res.data[0].this.spec.snap?res.data[0].this.spec.snap.length>=1:res.data[0].this.snapSpec.craft.length>=1 ) {
										this.$u.post(this.api.addGoodsCart, addData).then(res => {
											if (res.code == 1) {
												this.$refs.uToast1.show({
													title: '加入成功',
													icon: 'none',
												})
											}else{
												this.$refs.uToast1.show({
													title: res.msg,
													icon: 'none',
												})
											}
										})
										
									} else {
										this.$refs.uToast1.show({
											title: '请选择工艺',
											icon: 'none',
										})
										}
										return;
									}
									if (res.code == 1) {
										console.log('1111')
										this.yixuanText = ''
										this.sumPrice = res.data[0].this.sumPrice
										this.yixuanText += res.data[0].this.number
										// for (let i = 0; i < res.data[0].this.spec.snap.length; i++) {
										// 	if (this.yixuanText == '') {
										// 		this.yixuanText += res.data[0].this.spec.snap[i]
										// 	} else {
										// 		this.yixuanText += ' ' + res.data[0].this.spec.snap[i]
										// 	}
										// }
										if (pay) {
										let	buyData = {
												good_id: this.getobj.id,
												spec: '',
												number: 1,
												spec_id: 0,
												good_type: this.getobj.good_type,
											}
											buyData.spec = JSON.stringify(res.data[0].this);
											// buyData.special = JSON.stringify(dataa)
											uni.setStorageSync('payObj', JSON.stringify(buyData))
											//m
											this.$u.post(this.api.buynow, buyData).then(res => {
												if (res.code == 1) {
													// uni.navigateTo({
													// 	url: '/pages/order/submit_orders/index?option=' +
													// 		JSON
													// 		.stringify(res.data) + '&specId=0'+'&data='+JSON.stringify(this.postData)+'&buyData='+JSON.stringify(buyData),
													// })
													if(isWeixin()){
														uni.navigateTo({
															url: '/pages/order/submit_orders/index?option=' +
																JSON
																.stringify(res.data) + '&specId=0'+'&data='+JSON.stringify(this.postData)+'&buyData='+JSON.stringify(buyData),
														})
													}else{
														uni.navigateTo({
															url:'../GoWatch/GoWatch'
														})
													}
												}
											})
										}
								}
						})
					}
					else{
						this.$u.post(this.api.NormalSpec, {
							good_type: this.getobj.good_type,
							spec_name: this.specStr,
							good_id: this.getobj.id,
							number: this.value,
						}).then(res => {
							if (res.code == 1) {
								this.goCart = true
								this.getPriceData = res.data
								this.id = res.data.id
								this.getobjprice = res.data.price
								this.getobj.title = this.getPriceData.spec
								this.getobj.price = this.getPriceData.price
							}
						})
					}
				},
				pnumbers() {
						var _this = this;
						if (this.activeSelect['pnumbers']) {
							let pnumberss = _this.activeSelect['pnumbers'].name ? _this.activeSelect['pnumbers'].name
								.split("P")
								.join("") : _this.getobj.spec.pnumbers[0].num
							return pnumberss;
						} else {
							return '';
						}
						// _this.activeSelect['pnumbers'].name?_this.activeSelect['pnumbers'].name.split("P").join(""):_this.getobj.spec.pnumbers[0].num,
						// _this.activeSelect['pnumbers'].name?_this.activeSelect['pnumbers'].name.split("P").join(""):_this.getobj.spec.pnumbers[0].num,
					},
					//客服
					chartGo() {
						let url =
							'https://admin.qidian.qq.com/template/blue/mp/menu/qr-code-jump.html?linkType=0&env=ol&kfuin=2355064841&fid=538&key=8f15177d105f759fe0d97f6ff0eee30a&cate=1&source=1&isLBS=0&isCustomEntry=0&type=16&ftype=1&_type=wpa&qidian=true'
						window.open(url)
						// if (plus.os.name == "Android") {
						// 	var openUrl = 'mqqwpa://im/chat?chat_type=wpa&uin=' + 36212547;
						// 	plus.nativeUI.showWaiting();
						// 	var main = plus.android.runtimeMainActivity();
						// 	var Intent = plus.android.importClass('android.content.Intent');
						// 	var Uri = plus.android.importClass('android.net.Uri');
						// 	var intent = new Intent(Intent.ACTION_VIEW, Uri.parse(openUrl));
						// 	main.startActivity(intent);
						// }
						// if (plus.os.name == "iOS") {
						// 	var openUrl = 'mqq://im/chat?chat_type=wpa&uin=' + 36551125 + '&version=1&src_type=web';
						// 	plus.runtime.launchApplication({
						// 		action: openUrl
						// 	}, function(e) {
						// 		plus.nativeUI.confirm("检查到您未安装qq，请先到appstore搜索下载？", function(i) {
						// 			if (i.index == 0) {
						// 				iosAppstore("itunes.apple.com/cn/app/mqq/");
						// 			}
						// 		});
						// 	});
						// }

					},
					// 商品收藏
					collentGoods(id) {
						const userInfo = uni.getStorageSync('userinfo')
						if (userInfo !== '') {
							this.$u.get(`index/setLike?good_id=${id}`).then(res => {
								console.log(res)
								if (this.collent == false) {
									this.collent = true
									this.$refs.uToast.show({
										title: '收藏成功',
										type: 'none',
									})
								} else {
									this.collent = false
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
										uni.navigateTo({
											url: '/pages/userLogin/login'
										})
									} else if (res.cancel) {
										this.$refs.uToast.show({
											title: '登录失败',
											type: 'none',
										})
									}
								}
							});
						}
					},

					goComment(id) {
						uni.navigateTo({
							url: "/pages/allcomments/index?good_id=" + id
						})
					},
					sdfsdfr() {
						this.showt = true
					}
			}
		}
</script>

<style lang="less">
	/deep/.uni-input-input{
		text-align: center!important;
	}
	.popup {
		height: 70vh;

		.popup_top {
			width: 100%;
			// position: fixed;
			height: 260rpx;
			padding: 30rpx 20rpx 30rpx 60rpx;
			margin-bottom: 4rpx;
			display: flex;
			align-items: end;
			background-color: #FFFFFF;
			z-index: 999;

			&>view:nth-child(1) {
				width: 192rpx;
				height: 166rpx;
			}

			&>view:nth-child(2) {
				flex: 1;
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
			padding: 0 20rpx 30rpx 60rpx;

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
					display: flex;
					flex-wrap: wrap;

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
						margin-right: 50rpx;
						&>text:nth-child(1) {
							font-size: 24rpx;
							color: #999899;
						}

						&>text:nth-child(2) {
							font-size: 30rpx;
							color:#E94726;
							font-weight: 700;
						}
					}

					// &>view:nth-child(2) {
					// 	font-size: 26rpx;
					// 	color: #999899;
					// 	font-weight: 500;
					// 	padding-left: 32rpx;
					// 	text-decoration: line-through;
					// }
					&>view:nth-child(2) {
						&>text:nth-child(1) {
							font-size: 24rpx;
							color: #999899;
						}
					
						&>text:nth-child(2) {
							font-size: 30rpx;
							color:#E94726;
							font-weight: 700;
						}
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
				font-size: 28rpx;

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

	.showToast {
		width: 50% !important;
		height: 50px !important;
		line-height: 15px !important;
	}
</style>

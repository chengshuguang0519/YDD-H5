<template>
	<view class="imagelist">
		<view class="imagelist_title">风格选择:</view>

		<view class="list">
			<view class="item" v-for="(i,index) in imageobj.list" :key="index" @click="onimage(index)">
				<!-- style="border: 2rpx solid #fd9a16;" -->
				<view :class="index == inde?'image images':'image'">
					<image :src="i" mode="widthFix"></image>
					<view class="ipt">{{text?text:'这是可编辑的文字'}}</view>
					<image :class="'image'+index" :src="imageobj.qr" mode=""></image>
					<icon v-if="index == inde" type="success" size="22" color='#F79C22' class="icon" />
				</view>
			</view>
		</view>
		<view>
			<view style="margin-left: 20rpx;">文案编辑：</view>
			<textarea name="" maxlength="10" id="" cols="30" rows="10" class="edit" v-model="text" placeholder="请输入您的广告语" ></textarea>

		</view>
		<view class="bottom_btn">
			<view @click="generate">生成海报</view>
		</view>
		<!-- width="320px" height="427px" -->
		<u-popup v-model="show" mode="center" width="80%" height="80%"  >
			<view class="" style="width: 100%;height: 80%;margin: 0 auto;">
				<img :src="tempimage" style="width: 100%;height: 100%;"/>
			</view>
			<view class="baocun">
				<view @click="saveimage"><u-icon name="download"></u-icon> 保存本地</view>
			</view>
		</u-popup>
		<!-- ;position: fixed;left: 1900px; -->
		<canvas id="firstCanvas" canvas-id="firstCanvas" style="width: 320px; height: 427px;position: fixed;left: 1900px;"></canvas>
	</view>
</template>

<script>
	import FileSaver from 'file-saver'  
	export default {
		data() {
			return {
				imageobj: {},
				inde: 0,
				text: '',
				show: false,
				ctx: null,
				tempimage:''
			}
		},
		onLoad() {
			this.loadgetShareQrcode();
			this.ctx = uni.createCanvasContext('firstCanvas', this)
		},
		methods: {
			loadgetShareQrcode() {
				let data = {
					code: uni.getStorageSync('userinfo').self_invitation,
					domain: 'http://yhzcgw.dd371.com/#/pages/userLogin/register'
				}
				this.$u.get(this.api.getShareQrcode, data).then(res => {
					console.log(res,'res')
					if (res.code == 1) {
						var this_ = this;
						this.imageobj = res.data;
						uni.getImageInfo({
							src: res.data.qr,
							success: function(image) {
								this_.qr = image.path
								console.log(this_.qr,'qr')
							},
						})
					}
				})
			},
			onimage(index) {
				this.inde = index
			},
			generate() {
				let data = [{
					x: 100,
					y: 170,
					w: 130,
					h: 130
				}, {
					x: 110,
					y: 200,
					w: 110,
					h: 110
				}, {
					x: 100,
					y: 210,
					w: 130,
					h: 130
				}, {
					x: 120,
					y: 236,
					w: 90,
					h: 90
				}, {
					x: 50,
					y: 300,
					w: 90,
					h: 90
				}, {
					x: 140,
					y: 220,
					w: 60,
					h: 60
				}]
				let image = this.imageobj.list[this.inde];
				var this_ = this;
				uni.getImageInfo({
					src: image,
					success: function(image) {
						this_.image = image.path
						this_.OnCanvas(data[this_.inde]);
					},
				})
				uni.getImageInfo({
					src: this_.qr,
					success: function(image) {
						// console.log(image,'imagessss')
						this_.qr = image.path
					},
				})
				console.log(this_.qr,'res');
			},
			OnCanvas(obj) {
				console.log(obj);
				var ctx = this.ctx
				uni.showToast({
					title:'生成海报中...',
					icon:'loading',
					duration:3000
				})
				ctx.save()
				ctx.beginPath()
				var image = new Image();
				console.log(this.image,this.qr,'image1')
				ctx.drawImage(this.image, 0, 0)
				ctx.drawImage(this.qr, obj.x, obj.y, obj.w, obj.h);
				ctx.restore()
				ctx.setFontSize(20)
				ctx.setFillStyle('#FFFFFF')
				ctx.setTextAlign('center')
				ctx.fillText(this.text, 150, 80)
				setTimeout(()=>{
					ctx.draw()
				},2000)
				setTimeout(()=>{
					this.FilePath();
				},3000)
			},
			FilePath(){
				var this_ = this;
				this.show = true
				uni.canvasToTempFilePath({
				  x: 0,
				  y: 0,
				  width: 320,
				  height: 427,
				  destWidth: 320,
				  destHeight: 427,
				  canvasId: 'firstCanvas',
				  fileType:'png',
				  success: function(res) {
				    // 在H5平台下，tempFilePath 为 base64
				    console.log(res.tempFilePath)
					this_.$u.post('index/uplodeimg',{file:res.tempFilePath}).then(res=>{
						console.log(res,'huabu');
						
						this_.tempimage = res.data
					})
				  } 
				})
			},
			saveimage(){
				var this_ = this;
				var date = new Date().getTime();
				uni.showToast({
					title:'请长按图片保存',
					icon:'none',
					duration:2000
				})	 
			},
			savePic(Url){
					// Url = this.dialogImgUrl //图片路径，也可以传值进来
					var triggerEvent = "touchstart"; //指定下载方式
				    var blob=new Blob([''], {type:'application/octet-stream'}); //二进制大型对象blob
				    var url = URL.createObjectURL(blob); //创建一个字符串路径空位
				    var a = document.createElement('a'); //创建一个 a 标签
				    a.href = Url;  //把路径赋到a标签的href上
				    //正则表达式，这里是把图片文件名分离出来。拿到文件名赋到a.download,作为文件名来使用文本
				    a.download = Url.replace(/(.*\/)*([^.]+.*)/ig,"$2").split("?")[0]; 
				    /* var e = document.createEvent('MouseEvents');  //创建事件（MouseEvents鼠标事件）
				    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); //初始化鼠标事件（initMouseEvent已弃用）*/
				    
				    //代替方法。创建鼠标事件并初始化（后面这些参数我也不清楚，参考文档吧 https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/MouseEvent）
					var e = new MouseEvent('click', ( true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null));  
					//派遣后，它将不再执行任何操作。执行保存到本地
				    a.dispatchEvent(e); 
				    //释放一个已经存在的路径（有创建createObjectURL就要释放revokeObjectURL）
				    URL.revokeObjectURL(url);  
					/* 
					//这段好像并不影响，所以我不用，注释掉
					var imgs = document.getElementsByTagName("img");
					for(var i = 0,o;o = imgs[i];i++){
						
						o.addEventListener(triggerEvent,function(){
							var newurl = this.getAttribute("src");
							saveAs(newurl);
						},false);
					} */
					
				},
			input(e) {
				console.log(e)
				this.text = e.detail.value
			}
		}
	}
</script>


<style lang="less">
	.imagelist_title {
		padding: 32rpx 32rpx 0 32rpx;
	}
	/deep/.u-mode-center-box{
		background-color:transparent !important
	}
	.baocun{
		position: relative;top: 4%;
		display: flex;
		justify-content: center;
		color:#FFFFFF;
		view{
			background-color: #333333;
			padding:8rpx 20rpx;
			text-align: center;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 10rpx;
			font-size: 28rpx;
		}
	}
	.list {
		position: relative;
		display: flex;
		flex-wrap: wrap;

		.item {
			width: 50%;
			padding: 32rpx;

			.images {
				border: 2rpx solid #fd9a16;
				position: relative;
			}

			.images:::after {}

			.image {
				width: 100%;
				box-shadow: 0 2rpx 4rpx 4rpx #d6d6d6;
				position: relative;

				.image0 {
					width: 120rpx;
					height: 120rpx;
					position: absolute;
					left: 100rpx;
					top: 170rpx;
				}

				.image1 {
					width: 100rpx;
					height: 100rpx;
					position: absolute;
					left: 100rpx;
					top: 190rpx;
				}

				.image2 {
					width: 110rpx;
					height: 110rpx;
					position: absolute;
					left: 90rpx;
					top: 200rpx;
				}

				.image3 {
					width: 80rpx;
					height: 80rpx;
					position: absolute;
					left: 120rpx;
					top: 230rpx;
				}

				.image4 {
					width: 80rpx;
					height: 80rpx;
					position: absolute;
					left: 52rpx;
					top: 294rpx;
				}

				.image5 {
					width: 50rpx;
					height: 50rpx;
					position: absolute;
					left: 140rpx;
					top: 216rpx;
				}
			}
		}
	}

	.bottom_btn {
		padding: 32rpx;

		view {
			background-color: #fd9a16;
			text-align: center;
			color: #FFFFFF;
			height: 80rpx;
			line-height: 80rpx;
			border-radius: 10rpx;
		}
	}

	.ipt {
		width: 100%;
		position: absolute;
		top: 80rpx;
		// left: 35rpx;
		width: 100%;
		padding: 0 20rpx;
		text-align: center;
	}

	.edit {
		width: 90%;
		background-color: #f6f6f6 !important;
		height: 100px;
		margin-left: 40rpx;
		margin-top: 20rpx;
	}

	.icon {
		position: absolute;
		bottom: 0;
		right: 3rpx;
	}
</style>

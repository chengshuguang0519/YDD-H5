<template>
    <view class='chat'>
		<view class="chat_content">
			<u-popup v-model="show" :mask-close-able="false" mode="center" border-radius="20" :custom-style="{bottom:'50px'}" :mask-custom-style="{bottom:'50px'}">
				<view class="chan_way" v-if="way == 'way'">
					<view class="title">
						请选择聊天方式
					</view>
					<view class="chan_content">
						<u-grid :col="2" @click="ongrid">
							<u-grid-item index='1'>
								<u-icon name="/static/icon/qq.png" :size="70"></u-icon>
								<view class="grid-text">QQ</view>
							</u-grid-item>
							<u-grid-item index='2'>
								<u-icon name="/static/icon/weixin.png" :size="80"></u-icon>
								<view class="grid-text">微信</view>
							</u-grid-item>
						</u-grid>
					</view>
				</view>
				<view class="chan_way" v-if="way == 'weixin'" >
					<view class="title">
						<view class="" style="float: left;" @click="ongrid(0)">
							<u-icon name="arrow-left" color="#666565" size="28"></u-icon>
						</view>请选择微信客服
					</view>
					<view class="chan_content item_c" style="border: 0;">
						<view class="chan_item" v-for="(i,index) in dataobj.customerList" :key="index" @click="orcode(i)">
							{{i.name}}
						</view>
					</view>
				</view>
				
				<view class="chan_way" v-if="way == 'weixincode'" >
					<view class="title">
						<view class="" style="float: left;" @click="orcode(46)">
							<u-icon name="arrow-left" color="#666565" size="28"></u-icon>
						</view>
					</view>
					<view class="codeimage">
						<view class="image"><image :src="image" mode=""></image></view>
					</view>
					<view class="text">
						用微信扫二维码，加我为好友
					</view>
				</view>
			</u-popup>
		</view>
		<view-tabbar :current="3"></view-tabbar>
    </view>
</template>

<script>
import Tabbar from '../../components/tabbar/index.vue'
    export default {
        data() {
            return {
                show:true,
				way:'way',
				qq:'457760137',
				dataobj:'',
				image:'/static/icon/code.png'
            }
        },
        components: {
            'view-tabbar': Tabbar
        }, 
        onLoad() {
			this.loadData();
        },
        methods: {
			loadData(){
				let data ={
					type:6,
					name:'user'
				}
				this.$u.get(this.api.config,data).then(res=>{
					if(res.code == 1){
						this.dataobj = res.data
					}
				})
			},
			ongrid(e){
				if(e == 0){
					this.way = 'way'
				}else if(e == 1){
					let url ='https://admin.qidian.qq.com/template/blue/mp/menu/qr-code-jump.html?linkType=0&env=ol&kfuin=2355064841&fid=538&key=8f15177d105f759fe0d97f6ff0eee30a&cate=1&source=1&isLBS=0&isCustomEntry=0&type=16&ftype=1&_type=wpa&qidian=true'
					window.open(url)
					
				}else if(e == 2){
					this.way = 'weixin'
				}
			},
			orcode(e){
				console.log(e);
				if(e == 46){
					this.way = 'weixin'
				}else{
					this.way = 'weixincode'
					this.image = this.dataobj.customerList[e].qrcode
				}
			}
        }
    }
</script>

<style lang="less">
	.chat{
		
		.chat_content{
			height: calc(100vh - 50px);
			.chan_way{
				padding: 24rpx;
				.title{
					text-align: center;
					padding-bottom: 25rpx;
					font-size: 32rpx;
					color: #FF8109;
					font-weight: 700;
				}
				.text{
					text-align: center;
					font-size: 26rpx;
					color: #666666;
				}
				.codeimage{
					width: 428rpx;
					padding: 60rpx;
					.image{
						width: 174rpx;
						height: 174rpx;
						margin: 0 auto;
					}
				}
				.item_c{
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
					.chan_item{
						border: 2rpx solid #666565;
						padding: 6rpx 20rpx;
						border-radius: 4rpx;
						margin-bottom: 16rpx;
					}
				}
				.chan_content{
					width: 320rpx;
					padding-top: 10rpx;
					border-top: 2rpx solid #8B8B8B;
					.grid-text{
						font-size: 28rpx;
						color: #666666;
						padding-top: 20rpx;
						font-weight: 500;
					}
				}
			}
		}
	}
</style>
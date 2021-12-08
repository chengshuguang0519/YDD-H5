<template>
    <view class='shopping'>
        <view class="title c333">
            <view class='title1'>购物车</view>
            <view class='title2'>您一共有{{shoppingList.length}}件宝贝</view>
            <view class='bianji' @tap="edit()">{{editType?'取消':'编辑'}}</view>
        </view>
        <view class="shoppingList" v-if="shoppingList.length>0">
            <view class="item" v-for="(item,i) in shoppingList" :key="i">
                <view class="radio" @tap="itemTap(i)">
                    <image v-if="item.active" src='../../static/images/icon/yes.png' />
                </view>
                <view class="goodsImg"><image :src='item.cover_image' /></view>
                <view class="content">
                    <view class="title">{{item.title}}</view>
                    <view class="type">{{item.spec_name}}</view>
                    <view class="priceNum">
                        <view class="left"></view>
                        <view class="right">¥{{item.price}}</view>
                        <!-- <view class="right"><u-number-box v-model="item.number" bg-color="#fff" :positive-integer="true"></u-number-box></view> -->
                    </view>
                </view>
            </view>
        </view>
        <view class='kong c999' v-if="shoppingList.length<=0">
            <image src='/static/images/icon/shoppingKong.png' />
            <view class="text">暂无任何商品~</view>
            <view class='buttonViewRound' @click="logins">
                去选购
            </view>
        </view>
        <view class='like'>
            <view class='likeTitle color1'>猜你喜欢</view>
            <view class='likeList'>
                <view class='item' v-for="(item,i) in likeList" :key="i" @click="goGoodsDeatils(item.id)">
                    <view class='img'><image :src='item.cover_image' /></view>
                    <view class='likeItemTitle c333'>{{item.title}}</view>
                    <view class='likeItemTitlee c999'>
                        <span v-for="(itemm,ii) in item.tags" :key="ii">{{itemm}} </span>
                    </view>
                    <view class='price color2'>￥{{item.price}}<text class="c999">{{item.sale}}人购买</text></view>
                </view>
            </view>
        </view>
        <view class="bottom">
            <view class="radio" @tap="allActive()">
                <view>
                    <image v-if="allType" src='../../static/images/icon/yes.png' />
                </view>
                <view>全选</view>
            </view>
            <view class="price">
                合计:<span>¥{{priceAll}}</span>
            </view>
            <view class="btn" @tap="tijiao()">{{editType?'删除':'结算'}}({{activeLength}})</view>
        </view>

        <view-tabbar :current="2"></view-tabbar>
    </view>
</template>

<script>
import Tabbar from '../../components/tabbar/index.vue'
    export default {
        data() {
            return {
                shoppingList:'',//购物车列表
                likeList:'',//推荐列表
                value:1,
                allType:false,//全选状态
                editType:false,//编辑状态
            }
        },
        components: {
            'view-tabbar': Tabbar
        }, 
        computed:{
            priceAll(){//总价
                let price=0;
                if(this.shoppingList.length>0){
                    this.shoppingList.forEach(item=>{
                        if(item.active){
                            price+=item.price
                        }
                    })
                }
                return price.toFixed(2);
            },
            activeLength(){//选中数量
                let size = 0
                if(this.shoppingList.length>0){
                    this.shoppingList.forEach(item=>{
                        if(item.active){
                            size+=1
                        }
                    })
                }
                return size;
            },
        },
        onLoad() {
			
        },
		onShow() {
			this.geiShopingList()
		},
        onHide(){
            this.shoppingList.forEach(item=>{
                item.active = false
            })
            this.editType = false
            this.isAllType()
        },
        methods: {
            //切换编辑状态
            edit(){
                this.shoppingList.forEach(item=>{
                    item.active = false
                })
                this.isAllType()
                this.editType = !this.editType
            },
			//获取购物车列表
			geiShopingList(){
				this.$u.get(this.api.getGoodsCartList,{}).then(res=>{
					console.log(res,'cart')
					if(res.code == 1){
                        res.data.data.forEach(item => {
                            item.active = false
                        });
                        this.shoppingList = res.data.data
                        this.likeList = res.data.recommend
					}
				})
			},
            //去选购
			logins() {
				console.log('选购');
				uni.switchTab({
					url:'/pages/index/index'
				})
				// uni.navigateTo({
    //                 utl: '/pages/index/index',
    //             })
			},
            //商品选中事件
            itemTap(i){
                this.shoppingList[i].active = !this.shoppingList[i].active
                this.isAllType()
            },
            //全选事件
            allActive(){
                console.log(this.shoppingList)
                if(this.allType){
                    this.shoppingList.forEach(item=>{
                        item.active = false
                    })
                }else{
                    this.shoppingList.forEach(item=>{
                        item.active = true
                    })
                }
                this.isAllType()
            },
            //判断是否全部选中
            isAllType(){
                var _this = this
                if(this.shoppingList.every(arr=>arr.active)){
                    _this.allType = true
                }else{
                    _this.allType = false
                }
            },
            //提交or删除
            tijiao(){
                let ids = ''
                this.shoppingList.forEach(item=>{
                    if(item.active){
                        if(ids == ''){
                            ids+=item.id
                        }else{
                            ids+=','+item.id
                        }
                    }
                })
                if(this.editType){
					this.$u.post(this.api.delCart,{ids:ids}).then(res=>{
						if(res.code == 1){
							uni.showToast({
								title:'删除成功',
								icon:'none'
							})
							this.geiShopingList()
						}
					})
                }else{
                    console.log('提交')
                    let buyData= {
                        cart_ids:ids,
                        coupon_id:'',
                        address_id:'',
                        receipt_type:1,
                    }
                    this.$u.post(this.api.cartConfirm,buyData).then(res=>{
                        console.log(res)
                        var data = JSON.stringify(res.data)
						if(res.code == 1){
							uni.navigateTo({
								url: '/pages/order/submit_orders/index?option='+data + '&ids=' + ids+'&buyData='+JSON.stringify(buyData)+'&cart=1',
							})
						}
                    })
                }
            },
			goGoodsDeatils(id){
				uni.navigateTo({
					url:'/pages/goods_details/selection/index?id=' + id
				})
			}
        }
    }
</script>

<style lang='less'>
.shopping{
    min-height: cale(100vh-44);
    font-size: 30rpx;
    background: #EFEFEF;
}
.shopping>.title{
    margin-bottom: 18rpx;
    background: #fff;
    padding-bottom: 24rpx;
    text-align: center;
    position: relative;
}
.shopping>.title .bianji{
    position: absolute;
    right: 52rpx;
    bottom: 24rpx;
}
.shopping>.title .title1{
    font-size: 36rpx;
	padding-top: 62rpx;
	font-weight: 700;
}
.shopping>.title .title2{
    font-size: 29rpx;
}
.shoppingList{
    width: 653rpx;
  /*  height: 758rpx; */
    padding: 32rpx;
    background: #fff;
    margin: 0 auto;
    margin-bottom: 12rpx;
    border-radius: 12rpx;
    box-shadow: 0px 20px 54px 0px rgba(68,74,79,0.17); 
    .item{
        margin-bottom: 45rpx;
        display: flex;
        align-items: center;
        .radio{
            width: 28rpx;
            height: 28rpx;
            border: 2rpx solid #666666;
            border-radius: 50%;
            image{
                display: block;
            }
        }
        .goodsImg{
            width: 151rpx;
            height: 138rpx;
            background: cornflowerblue;
            margin: 0 16rpx 0 16rpx;
        }
        .content{
            flex: 1;
            .title{
                color: #333333;
                font-size: 30rpx;
            }
            .type{
                width: 350rpx;
                color: #999999;
                font-size: 27rpx;
                margin: 6rpx 0 16rpx;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
            .priceNum{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .left{
					color: #666666;
					font-size: 25rpx;
                }
                .right{
                    font-size: 27rpx;
                    font-weight: 700;
                    color: #FF0000;
                }
            }
        }
    }
}
.like{
    padding-bottom: 88rpx;
}
.likeTitle{
    font-size: 30rpx;
    position: relative;
    z-index: 9;
	text-align: center;
	font-weight: 700;
	padding-bottom: 32rpx;
}
.likeList::after{
    content: "";
    width: 310rpx;
}
.likeList{
    padding: 0 48rpx;
    padding-bottom: 50px;
    margin-bottom: 30rpx;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.likeList .item{    
    width: 310rpx;
    padding: 26rpx;
    margin-bottom: 20rpx;
    background: #fff;
    border-radius: 12rpx;

}
.likeList .item .img{
    width: 100%;
    height: 205rpx;
    margin: 0 auto;
    margin-bottom: 23rpx;
}
.likeList .item .likeItemTitle{
    font-size: 28rpx;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.likeList .item .likeItemTitlee{
	height: 45rpx;
    font-size: 20rpx;
    margin-top: 6rpx;
    margin-bottom: 9rpx;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.likeList .item .price{
    font-size: 32rpx;
    display: flex;
    align-items: center;
    .c999{
        flex: 1;
        text-align: right;
    }
}
.likeList .item text{
    font-size: 24rpx;
}
.kong{
    text-align: center;
    margin-top: 120rpx;
    margin-bottom: 88rpx;
}
.kong image{
    width: 256rpx;
    height: 282rpx;
}
.kong .text{
    font-size: 28rpx;
    
}
.bottom{
    color: #333;
    width: 100%;
    height: 102rpx;
    padding: 0 63rpx;
    display: flex;
    align-items: center;
    background: #fff;
    position: fixed;
    bottom: 50px;
	z-index: 99;
    .radio{
        font-size: 29rpx;
        display: flex;
        align-items: center;
        &>view:nth-child(1){
            width: 29rpx;
            height: 29rpx;
            margin-right: 7rpx;
            border-radius: 50%;
            border: 2rpx solid #666666;
            image{
                display: block;
            }
        }
    }
    .price{
        font-size: 22rpx;
        flex: 1;
        text-align: right;
        padding: 0 14rpx;
        span{
            font-size: 29rpx;
            color: #FF0200;
        }
    }
    .btn{
        color: #fff;
        font-size: 25rpx;
        font-weight: 700;
        width: 151rpx;
        height: 48rpx;
        line-height: 48rpx;
        text-align: center;
        background: #FE8109;
        border-radius: 100px;
    }
}


.buttonViewRound{
    color: #fff;
    font-size: 30rpx;
    width: 196rpx;
    height: 68rpx;
    line-height: 68rpx;
    margin: 0 auto;
    margin-top: 70rpx;
    background: #F79C22;
}
/deep/ .uni-input-wrapper{
    border-radius: 10rpx;
    background: #EFEFEF;
}
/deep/ .u-icon-plus{
    width: auto;
}
/deep/ .u-icon-minus{
    width: auto;
}
</style>
<template>
     <cover-view class="tabbar" :style="{'padding-bottom': paddingBottomHeight + 'rpx'}">
        <cover-view class="tabbar-item"
            v-for="(item, index) in list" 
            :key="index" 
            @click="tabbarChange(item.path)"
        >
            <cover-image class="item-img" :src="item.icon_a" v-if="current == index"></cover-image>
            <cover-image class="item-img" :src="item.icon" v-else></cover-image>
            <cover-view class="item-name" :class="{'tabbarActive': current == index}" v-if="item.text">{{item.text}}</cover-view>
        </cover-view>
    </cover-view>
</template>

<script>
export default {
    props: {
        current: Number
    },
    data() {
        return {
            paddingBottomHeight: 0,  //苹果X以上手机底部适配高度
            list: [{
                    text: '首页',  
                    icon: '/static/images/tab/tab1.png',  //未选中图标
                    icon_a: '/static/images/tab/tab11.png',  //选中图片
                    path: "/pages/index/index",  //页面路径
                },{
                    text: '分类',
                    icon: '/static/images/tab/tab2.png',
                    icon_a: '/static/images/tab/tab22.png',
                    path: "/pages/shop/index",
                }
                ,{
                    text: '购物车',
                    icon: '/static/images/tab/tab3.png',
                    icon_a: '/static/images/tab/tab33.png',
                    path: '/pages/shopping/index',
                },{
                    text: '聊天',
                    icon: '/static/images/tab/tab4.png',
                    icon_a: '/static/images/tab/tab44.png',
                    path: '/pages/chat/index',
                },{
                    text: '我的',
                    icon: '/static/images/tab/tab5.png',
                    icon_a: '/static/images/tab/tab55.png',
                    path: "/pages/user/index",
                },
            ]
        };
    },
    created() {
        let that = this;
        uni.getSystemInfo({
            success: function (res) {
				// console.log(res)
                let model = ['X', 'XR', 'XS', '11', '12', '13', '14', '15'];
                model.forEach(item => {
                    //适配iphoneX以上的底部，给tabbar一定高度的padding-bottom
                    if(res.model.indexOf(item) != -1 &&	 res.model.indexOf('iPhone') != -1) {
                        that.paddingBottomHeight = 40;
                    }
                })
            }
        });
    },
    methods: {
        tabbarChange(path) {
            uni.switchTab({
                url: path
            })
        }
    }
};
</script>

<style>
.tabbarActive{
    color: #FF8109 !important;
}
.tabbar{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 50px;
    background-color: #ffffff;
    z-index: 999;
}
.tabbar .tabbar-item{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50px;
    
    
}
.tabbar .tabbar-item .item-img{
    margin-bottom: 4rpx;
    width: 46rpx;
    height: 46rpx;
}
.tabbar .tabbar-item .item-name{
    font-size: 26rpx;
    color: #A3A3A3;
}
</style>
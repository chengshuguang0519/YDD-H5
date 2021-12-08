let api = {
	// 登录
	login: 'login/login',
	// 退出登录
	logout: 'login/logout',
	// 分类
	// getCategory: 'goods/getCategory',
	getCategory: 'Cate/index',
	// 首页分类
	getShopCate: 'index/getShopCate',
	// 验证码
	sendSms: 'sms/sendSms',
	// 注册
	register: 'login/register',
	// 忘记密码
	resetpwd: 'login/resetpwd',
	// 用户协议
	userAgreement: 'login/userAgreement',
	// 轮播广告
	noticeIndex: 'index/noticeIndex',
	// 行业
	educationCates: 'index/educationCates',
	// 首页轮播
	carousel: 'index/carousel',
	// 首页热门分类
	hotGoods: 'index/hotGoods',
	// 优惠卷列表
	couponList: 'user/couponList',
	// 添加地址
	addAddress: 'user/addAddress',
	// 收获地址列表
	addrList: 'user/addrList',
	// 设置默认地址
	setAddress: 'user/setAddress',
	// 删除地址
	delAddress: 'user/delAddress',
	// 获取地址详情,
	getAddrInfo: 'user/getAddrInfo',
	// 编辑地址
	editAddress: 'user/editAddress',
	// 发表反馈
	feedback: 'user/feedback',
	// 消息列表
	getMessageList: 'user/getMessageList',
	// 用户积分明细
	getIntegralLog: 'user/getIntegralLog',
	// 用户钱包明细
	getAccountLog: 'user/getAccountLog',
	// 用户信息
	getuserindex: 'user/index',
	// 提现页数据
	withdrawinfo: 'user/withdrawinfo',
	// 用户提现记录
	withdrawLog: 'user/withdrawLog',
	// 行业商品
	educationGoodsList: 'index/educationGoodsList',
	// 商品详情
	getRead: 'goods/getRead',
	// 平台特色
	getfeature: 'index/feature',
	// 自提点
	getSelfMentionAddress: 'order/getSelfMentionAddress',
	// 积分商城
	getScore_Good: 'Score_Good/index',
	// 专属
	getLists: 'exclusive_good/getLists',
	// 分类商品列表
	goodsList: 'Cate/ThreeCate',
	// 收藏列表
	getLike: 'index/getLike',
	// 点击收藏/取消收场
	setLike: 'index/setLike',
	// 用户未读消息数
	messagenum: 'index/messagenum',
	// 用户充值
	userRecharge: 'user/userRecharge',
	//购物车列表
	getGoodsCartList: 'cart/getCartList',
	//专属商品列表
	exclusive_goodList: 'exclusive_good/getLists',
	//选择规格计算价格
	NormalSpec: 'goods/normalSpec',
	//预订单
	buynow: 'order/buynow',
	//订单列表
	getlists: 'order/getlists',
	//添加购物车
	addGoodsCart: 'cart/addGoodsCart',
	//购物车预订单
	cartConfirm: 'order/cartConfirm',
	// 获取用户默认地址
	getDefaultAddress: 'user/getDefaultAddress',
	// 推广信息
	promoteInfo: 'user/promoteInfo',
	// 获取推广二维码
	getShareQrcode: 'user/getShareQrcode',
	// 积分商城详情
	ScoreGoodDetail: 'Score_Good/ScoreGoodDetail',
	// 商品评论
	ScoreComment: 'Score_Good/Comment',
	// 
	getConfirm: 'Score_Good/getConfirm',
	// 
	DirectgetConfirm: 'Direct_Order/getConfirm',
	// 
	postConfirm: 'Score_Good/postConfirm',
	// 
	ScoreList: 'Score_Good/ScoreList',
	// 
	exclusiveconfirm: 'exclusive_good/confirm',
	// 
	exclusiveplace: 'exclusive_good/place',
	// 
	putConfirm: 'Score_Good/putConfirm',
	// 
	DirectOrder: 'Direct_Order/post',
	//订单详情
	getOrderDetail: 'order/getOrderDetail',
	//立即购买下单
	buyAddorder: "order/buyAddorder",
	//订单支付
	payOrder: "order/payOrder",
	//确认收货
	orderPut: 'order/put',
	//取消订单
	orderCancel: 'order/putCancel',
	// 
	postShip:'scan/postShip',
	// 
	deleteOrder:'order/deleteOrder',
	// 
	expressLists:'index/expressLists',
	// 
	postScanOrder:'scan/postScanOrder',
	// 
	getRefundList:'refund_order/getRefundList',
	// 
	postTixian:'user/postTixian',
	// 
	seeExpress:'order/seeExpress',
	// 
	getComment:'comment/getComment',
	// 
	setCommont:'comment/setCommont',
	// 
	config:'index/config',
	//消息已读
	messageRead:'user/messageRead',
	//多规格
	OtherPrice:'goods/OtherPrice',
	// 
	refundgetRead:'refund_order/getRead',
	// 
	postAfterSales:'refund_order/postAfterSales',
	// 
	delCart:'cart/delCart',
	// 
	putInfo:'user/putInfo'
}

export default api

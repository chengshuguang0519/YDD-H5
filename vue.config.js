module.exports = {

	// 配置路径别名
	configureWebpack: {
		devServer: {
			// 调试时允许内网穿透，让外网的人访问到本地调试的H5页面
			disableHostCheck: true,
			proxy: {
				'/api': { //这里最好有一个 /
					target: 'http://yinduoduo.dd371.com', // 后台接口域名
					ws: true, //如果要代理 websockets，配置这个参数
					secure: false, // 如果是https接口，需要配置这个参数
					changeOrigin: true, //是否跨域
					pathRewrite: {
						'^/api': ''
					}
				}
			}
		},
		
	}
	//productionSourceMap: false,
}

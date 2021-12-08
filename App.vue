<script>
	export default {
		// 此处globalData为了演示其作用，不是uView框架的一部分
		globalData: {
			
		},
		onLaunch() {
			// #ifdef MP-WEIXIN
			uni.hideTabBar({})
			//  #endif 
			// 1.1.0版本之前关于http拦截器代码，已平滑移动到/common/http.interceptor.js中
			// 注意，需要在/main.js中实例化Vue之后引入如下(详见文档说明)：
			// import httpInterceptor from '@/common/http.interceptor.js'
			// Vue.use(httpInterceptor, app)
			// process.env.VUE_APP_PLATFORM 为通过js判断平台名称的方法，结果分别如下：
			/**
			 * h5，app-plus(nvue下也为app-plus)，mp-weixin，mp-alipay......
			 */
		},
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	@import "common/demo.scss";
	
	
	image {
	  width: 100%;
	  height: 100%;
	}
	.buttonView,
	.buttonViewRound {
	  text-align: center;
	  margin: 0 auto;
	}
	.buttonViewRound {
	  border-radius: 100px;
	}
	.c999 {
	  color: #999;
	}
	.c333 {
	  color: #333;
	}
	.color1 {
	  color: #f79c22;
	}
	.color2 {
	  color: #f73622;
	}
</style>
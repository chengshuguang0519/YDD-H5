<template>
	<view class="collection">
		<view class="collection_list" v-if="getlist.length >0">
			<view class="ction_list">
				<thelist :list="getlist" @theclick="theclick" @longpress="longpress"></thelist>
			</view>
		</view>
		<view class="collection_empty" v-else>
			<image src="/static/user/collection_empty.png"></image>
			<text>您还没有收藏，快去逛逛吧~</text>
			<!-- <u-empty text="您还没有收藏，快去逛逛吧~" src="/static/user/collection_empty.png" icon-size="200"></u-empty> -->
		</view>
	</view>
</template>

<script>
	import the_list from '../../../components/the_list/index.vue'
	export default {
		data() {
			return {
				getlist:[]
			}
		},
		components: {
			'thelist': the_list
		},
		onShow() {
			this.loadData()
		},
		// onLoad() {
		// 	this.loadData()
		// },
		methods: {
			loadData(){
				this.$u.get(this.api.getLike).then(res=>{
					// console.log(res);
					if(res.code == 1){
						this.getlist = res.data.data
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
					}
				})
			},
			theclick(e){
				console.log(e);
			},
			longpress(e){
				console.log(e);
				let thia = this;
				uni.showModal({
					content:`是否取"${e.title}"消关注？`,
					success(res) {
						if(res.confirm){
							thia.$u.get(thia.api.setLike,{good_id:e.id}).then(res=>{
								if(res.code == 1){
									thia.loadData()
								}else{
									uni.showToast({
										title:res.msg,
										icon:'none'
									})
								}
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.collection{
		height: calc(100vh - 44px);
		.collection_list{
			background-color: #F7F7F7;
			height: 100%;
			.ction_list{
				padding: 20rpx;
			}
		}
		.collection_empty{
			height: 93.4vh;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			background-color: #EFEFEF;
			image{
				width: 308rpx;
				height: 188rpx;
				margin-bottom: 20rpx;
			}
		}
	}
</style>

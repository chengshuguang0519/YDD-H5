<template>
    <view class='book'>
        <rich-text :nodes="text.user_agreement" />
    </view>
</template>

<script>
    export default {
        data() {
            return {
				text:{}
            }
        },
        onLoad() {
			this.getuserAgreement();
        },
        methods: {
			getuserAgreement(){
				this.$u.get(this.api.userAgreement).then(res=>{
					if(res.code == 1){
						this.text = res.data
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
					}
				})
			}
        }
    }
</script>

<style>
	.book{
		padding: 32rpx;
	}
</style>
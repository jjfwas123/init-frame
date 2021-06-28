<template>
	<view class="button-box" @click="$emit('click')">
	  <van-button type="primary" round block :disabled="disabled">{{text || '提交'}}</van-button>
	</view>
</template>

<script>
	import { Button } from 'vant'
	export default {
		name: 'm-submit-button',
		props: {
		  text: {
		    type: String
		  },
		  disabled: {
			  type: Boolean
		  }
		},
		components:{
			Button
		},
		data() {
			return {
				height: ''
			}
		},
		created() {
			// window.addEventListener('resize', )
			
			uni.onKeyboardHeightChange(res => {
				console.log(res.height)
			})
		}
	}
</script>

<style scoped>
	.button-box {
	  width: calc(100% - 40rpx);
	  padding: 0 20rpx;
	  margin: 40rpx 0 20rpx 0;
	}
	
</style>

<template>
	<view class="input-box">
	  <span class="lable green">{{lable}}</span>
	  <input class="box-input" :placeholder="placeholder" :value="value" @input="inputChange" :type="type"/>
	  <view class="under-line" v-if="bottomBorder"></view>
	</view>
</template>

<script>
	export default {
		name: 'm-form-input',
		model: {
			prop: 'value',
			event: 'input'
		},
		props: {
		  value: {
		    type: String
		  },
		  lable: {
		    type: String,
		    default: '标签'
		  },
		  placeholder: {
		    type: String,
		    default: '标签'
		  },
		  type: {
		    type: String,
		    default: 'text'
		  },
			bottomBorder: {
			  type: Boolean,
			  default: true
			},
		},
		methods: {
		  inputChange (e) {
		    this.$emit('input', e.detail.value)
		  }
		}
	}
</script>

<style scoped>
	.under-line{
	  position: absolute;
	  left: 0;
	  bottom: 0;
	  width: 100%;
	}
	.under-line::after {
	  	position: absolute;
		box-sizing: border-box;
		content: ' ';
		pointer-events: none;
		right: 32rpx;
		bottom: 0;
		left: 32rpx;
		border-bottom: 1rpx solid #ebedf0;
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
	}
	.input-box {
	  border: 1px solid green;
	  width: 450rpx;
	  padding: 20rpx 40rpx;
	  border-radius: 100rpx;
	  margin-top: 20rpx;
	  display: flex;
	  align-items: center;
	  position: relative;
	}
	.lable {
	  margin-right: 20rpx;
	}
	.box-input {
	  width: 69%;
	}
</style>

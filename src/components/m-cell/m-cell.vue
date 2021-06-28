<template>
	<view class="relative cell" :class="border ? 'under-line': ''" @click="click">
		<span class="label" v-if="label" :style="'width: ' + labelWidth + ';'">{{label}}</span>
		<span class="content" v-if="!isViod(content)" :style="{
			color: isNull(content) ? '' : '#333',
			paddingRight: isRotate ? '40rpx': ''
		}">{{isNull(content) ? placeholder : content}}</span>
		<slot v-if="isViod(content)"></slot>
		<van-icon class="link" @click="clickRotate" v-show="isLink" :class="isRotate?'rotate':''" name="arrow" />
		<span class="require" v-if="required">*</span>
	</view>
</template>

<script>

	export default {
		name: 'm-cell',
		props: {
			label: {
			  type: String,
			  default: ''
			},
			content: {
				default: undefined
			},
			labelWidth: {
			  type: String,
			  default: '7em'
			},
			border: {
			  type: Boolean,
			  default: true
			},
			placeholder: {
			  type: String,
			  default: '请选择'
			},
			customClass: {
			  type: String,
			  default: ''
			},
			isLink: {
				type: Boolean
			},
			isRotate: {
				type: Boolean,
				default: true
			},
			disabled: {
				type: Boolean
			},
			disabledRotate: {
				type: Boolean
			},
			required: {
				type: Boolean
			}
		},
		methods: {
			click() {
				if (this.disabled) return;
				this.$emit('click')
			},
			clickRotate() {
				if (this.disabledRotate) return;
				this.$emit('click-rotate')
			}
		}
	}
</script>

<style scoped>
	
	.relative {
	  position: relative;
	}
	
	.cell {
	  background-color: #fff;
	  padding: 20rpx 32rpx;
	  box-sizing: border-box;
	  font-size: 28rpx;
	  color: #646566;
	  display: flex;
	  align-items: center;
	}
	.cell:active {
	  background-color: rgb(221, 221, 221);
	}
	.content {
	  color: var(--cell-value-color,#b6b6b8);
	  flex: 1;
	}
	
	.label {
	  display: inline-block;
	  width: 7em;
	  margin-right: 24rpx;
	}
	.link {
		position: absolute;
		right: 30rpx;
		top: 30rpx;
		transition: transform .5s ;
		transform: rotate(0deg);
	}
	.rotate {
		transform: rotate(90deg);
	}
	.require {
		color: red;
		position: absolute;
		left: 14rpx;
		top: 24rpx;
	}
</style>

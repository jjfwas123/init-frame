<template>
	<view class="notice">
	  <van-icon class="icon" name="volume-o" :color="color" /><span class="splite">{{split}}</span>
	  <view class="notice-content" ref='box'>
		  <view class="scroll-content" ref="content" style="white-space: nowrap;">{{text}}</view>
	  </view>
	</view>
</template>

<script>
	export default {
		name: 'm-notice-bar',
		props: {
		  color: {
		    type: String
		  },
		  text: {
		    type: String
		  },
		  split: {
		    type: String
		  }
		},
		watch: {
			text() {
				this.getContentLength()
			}
		},
		data() {
			return {
				time: 0.02,
				boxWidth: 0,
				contentWidth: 0,
				contentStyle: {}
			}
		},
		mounted() {
			this.getContentLength()
			setTimeout(this.firstAnimation, 1000)
		},
		methods: {
			resetAnimation() {
				this.contentStyle.transitionDuration = '0s'
				this.contentStyle.transform =`translateX(${this.boxWidth + 10}px)`
				setTimeout(() => {
					this.contentStyle.transitionDuration = `${this.time * (this.contentWidth + this.boxWidth)}s`
					this.contentStyle.transform =`translateX(-${this.contentWidth}px)`
					setTimeout(() => {
						this.resetAnimation()
					}, this.time * (this.contentWidth + this.boxWidth) * 1000)
				}, 100)
				
			},
			getContentLength () {
				this.contentWidth = this.$refs.content.$el.scrollWidth
				this.boxWidth = this.$refs.box.$el.offsetWidth
				this.contentStyle = this.$refs.content.$el.style
			},
			firstAnimation() {
				this.contentStyle.transitionDuration = `${this.contentWidth * this.time}s`
				this.contentStyle.transform = `translateX(-${this.contentWidth}px)`
				setTimeout(() => {
					this.resetAnimation()
				}, this.contentWidth * this.time * 1000)
			},
		}
	}
</script>

<style scoped>
	
	.notice {
	  background: #fff;
	  height: 40px;
	  display: flex;
	  justify-content: flex-start;
	  align-items: center;
	  padding: 0 32rpx;
	}
	
	.notice-content {
	  flex: 1;
	  font-size: 24rpx;
	  white-space: nowrap;
	  overflow: hidden;
	  text-overflow: ellipsis;
	}
	
	.splite {
	  padding-right: 10rpx;
	  font-size: 24rpx;
	}
	
	.icon {
	  position: relative;
	  top: 2rpx;
	  margin-right: 10rpx;
	}

	.scroll-content {
		white-space: nowrap;
		transition-timing-function: linear;
		transition-property: transform;
		transform: translateX(0px),
	}
</style>

<template>
	<span class="title">{{title}}</span>
</template>

<script>
	export default {
		name: 'm-section-title',
		props: {
		  title:{
		    type: String,
		    default: ''
		  }
		},
	}
</script>

<style scoped>
	.title {
	  font-weight: bold;
	  position: relative;
	  padding-left: 20rpx;
	}
	
	.title::before {
	  display: block;
	  content: '';
	  width: 10rpx;
	  height: 100%;
	  background-color: #066e1f;
	  position: absolute;
	  left: 0;
	  top: 0;
	}
</style>

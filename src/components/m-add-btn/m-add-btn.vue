<template>
    <view class="add-btn" @click="click">
        <van-icon name="add-o" style="bottom: -6rpx;" /> 添加其他产品
    </view>
</template>

<script>
export default {
    name: 'm-add-btn',
    props: {
        disabled: {
            type: Boolean
        }
    },
    methods: {
        click() {
            if (this.disabled) return;
            this.$emit('click')
        }
    }
}
</script>

<style scoped>
    .add-btn {
        background-color: #fff;
        padding: 20rpx;
	    text-align: center;
	}
</style>
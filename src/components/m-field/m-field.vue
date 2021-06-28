<template>
    <view class="my-field relative" :class="{'under-line': border}">
        <span class="label" :style="'width: ' + (labelWidth || '4em') + ';'">{{label}}</span>
        <input class="my-field-input" 
            :disabled="disabled" 
            :placeholder="placeholder"
            :type="type" 
            :value="value" 
            @input="input" 
            ref='input'
            :class="!isNull(value)? 'text-color':'placehoder-color'">
        <view class="button-slot">
            <slot name="button"/>
        </view>
        <span class="require" v-if="required">*</span>
    </view>
</template>

<script>
export default {
    name: 'm-field',
    model: {
      prop: 'value',//指向props的参数名
      event: 'update'//事件名称
    },
    props: {
        label: {
            type: String,
        },
        type: {
            type: String
        },
        border: {
            type: Boolean,
            default: true
        },
        labelWidth: {
            type: String
        },
        value: {},
        placeholder: {
            default: '请输入'
        },
        disabled: {
            type: Boolean
        },
        onlyNumber: {
            type: Boolean
        },
        required: {
            type: Boolean
        }
    },
    methods: {
        input (e) {
            let num = e.detail.value + ''
            if (this.onlyNumber) {
                num = parseInt((num).replace(/[^0-9]/g, ''))
                num = Number.isNaN(num) ? 0 : num
                this.$refs.input.valueSync = num
            }
            this.$emit('update', num)
            this.$emit('input', num)
        }
    }
    
}
</script>

<style scoped>
    .my-field {
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background: #fff;
        padding: 20rpx 32rpx;
        box-sizing: border-box;
        font-size: 28rpx;
        color: #646566;
    }
    .my-field .label {
        font-size: 28rpx;
        width: 3em;
    }
    .my-field-input {
        flex: 1;
    }
    .placehoder-color {
        color: #b6b6b8;
    }
    .text-color {
        color: #000;
    }
    .button-slot {
        position: absolute;
        right: 0;
        top: 0;
        width: 100rpx;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .require {
		color: red;
		position: absolute;
		left: 14rpx;
		top: 24rpx;
	}
</style>
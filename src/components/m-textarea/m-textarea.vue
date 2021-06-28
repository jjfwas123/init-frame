<template>
    <div class="m-textarea relative" :class="{
        'under-line': border
    }">
        <span class="m-textarea-label">{{label}}</span>
        <textarea
            class="m-textarea-area"
            :style="{
                color: isNull(value) ? '' : '#333 !important',
                maxHeight: option.maxHeight + 'rpx',
                minHeight: option.minHeight + 'rpx'
            }"
            :value="value"
            @input="input"
            :placeholder="isNull(value) ? placeholder : value"
            :disabled="disabled"
        ></textarea>
        <span class="require" v-if="required">*</span>
    </div>
</template>

<script>
export default {
    name: 'm-textarea',
    model: {
        prop: 'value',
        event: 'input'
    },
    props: {
        value: {
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        option: {
            default: () => {
                return { maxHeight: 300, minHeight: 120 }
            }
        },
        labelWidth: {
            type: String,
            default: '7em'
        },
        border: {
            type: Boolean,
        },
        disabled: {
            type: Boolean
        },
        placeholder: {
            type: String,
            default: '请输入...'
        },
        required: {
            type: Boolean
        }
    },
    methods: {
        input(e) {
            this.$emit('input', e.detail.value)
        },
    },
}
</script>

<style >
    .m-textarea {
        display: flex;
        justify-content: flex-start;
        flex-wrap: nowrap;
        align-items: flex-start;
        background-color: #fff;
        padding: 10px 16px;
    }
    .m-textarea-label {
        color: #333;
        font-size: 28rpx;
        margin-right: 10rpx;
    }
    .m-textarea-area{
        width: 100%;
        height: auto;
        flex: 2;
    }
    /deep/.m-textarea-area .uni-textarea-wrapper, /deep/.m-textarea-area .uni-textarea-textarea {
        height: inherit;
        max-height: inherit;
        min-height: inherit;
    }
    .m-textarea-area .uni-textarea-placeholder {
        color: #b6b6b8;
    }
    
	.require {
		color: red;
		position: absolute;
		left: 14rpx;
		top: 24rpx;
	}
</style>
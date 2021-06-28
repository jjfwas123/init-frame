<template>
    <van-popup :value="show" @close="close" @click-overlay="close" round position="bottom">
        <van-cascader
            :value="value"
            :title="title"
            :options="$store.state.org"
            :field-names="fieldNames"
            @close="close"
            @finish="onFinish"
        />
    </van-popup>
</template>

<script>

export default {
    name: 'm-tree-picker',
    model: {
        prop: 'show',
        event: 'show'
    },
    props: {
        show: {
            type: Boolean
        },
        value:{},
        title: {
            type: String,
            default: '请选择所在地区'
        }
    },
    data() {
        return {
            fieldNames: {
                text: 'name',
                value: 'code',
                children: 'children',
            },
        }
    },
    methods: {
        onFinish(e) {
            this.$emit('show', false)
            this.$emit('confirm', e)
        },
        close() {
            this.$emit('show', false)
            this.$emit('close')
        }
    }
}
</script>
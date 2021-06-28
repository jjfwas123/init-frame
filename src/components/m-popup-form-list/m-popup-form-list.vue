<template>
    <div>
        <van-popup :value="show" position="right" @cancel="close" class="form-popup">
            <view class="filter-form" @scroll="scroll">
                <template v-for="(item, index) in form">
                    <m-field
                        :key="item.id"
                        v-if="item.formType === 'input'"
                        :palceholder="item.placeholder"
                        :label="item.label"
                        v-model="item.value"
                        :label-width="item.labelWidth || '4em'"
                    />
                    <m-cell
                        :key="item.id"
                        v-if="item.formType === 'time'"
                        :palceholder="item.placeholder"
                        :label="item.label"
                        :content="item.value"
                        @click="propTarget = item.name, formIndex = index"
                    />
                    <m-cell
                        :key="item.id"
                        v-if="item.formType === 'date'"
                        :palceholder="item.placeholder"
                        :label="item.label"
                        :content="item.value"
                        @click="propTarget = item.name, formIndex = index"
                    />
                    <m-field :label="item.label" v-if="item.formType === 'checkbox'" :key="item.id">
                        <template #input>
                            <van-checkbox-group v-model="item.value" direction="horizontal" @change="() => item.change && item.change()">
                                <van-checkbox class="check-box-item" :name="key.key" shape="square" v-for="key in item.checkBox || []" :key="key.key">{{key.name}}</van-checkbox>
                            </van-checkbox-group>
                        </template>
                    </m-field>
                    <m-field :label="item.label" v-if="item.formType === 'radio'" :key="item.id">
                        <template #input>
                            <van-radio-group v-model="item.value" direction="horizontal">
                                <van-radio class="check-box-item" :name="key.key" shape="square" v-for="key in item.redio || []" :key="key.key">{{key.name}}</van-radio>
                            </van-radio-group>
                        </template>
                    </m-field>
                </template>
                <div style="margin: 16rpx 0;text-align:center;">
                    <van-button round style="width: 28vw;" type="info" @click="submit">查询</van-button>
                    <van-button round style="margin-left: 10rpx;width: 28vw;" type="info" @click="reset">重置</van-button>
                </div>
            </view>
            <view>
                <m-cell :label="item[list.labelName]" v-for="item in data" :key="item.id" @click="itemClick(item)"/>
                <view class="loading" @click="loadMore">点击加载更多</view>
            </view>
        </van-popup>

        <m-date-picker v-model="showDate" @close='closePicker' @confirm='onDateConfirm'/>
        <m-date-time-picker v-model='showTime' @confirm='onDateConfirm'/>
    </div>
</template>

<script>
import dayjs from 'dayjs'
import { DATE_TIME_FORMAT_RULE, DATE_FORMAT_RULE } from '@/config/config'

export default {
    name: 'm-popup-form-list',
    model: {
        prop: 'show',
        event: 'show'
    },
    props: {
        show: {
            type: Boolean
        },
        form: {
            type: Object,
            default: () => ([
                {
                    label: '',
                    name: '',
                    formType: '',
                    labelWidth: '',
                    placeholder: ''
                }
            ])
        },
        list: {
            type: Object,
            default: () => ({
                labelName:''
            })
        },
        url: {
            type: String
        },
        method: {
            type: String
        },
        beforeRequest: {
            type: Function
        },
        requestFormat: {
            type: Function
        }
    },
    data() {
        return {
            pageSize: 10,
            pageNum: 1,
            data: [],
            showDate: false,
            showTime: false,
            propTarget: '',
            formIndex: 0
        }
    },
    methods: {
        onDateConfirm(e) {
            this.form[this.formIndex][this.propTarget] = dayjs(e).format(this.showDate ? DATE_FORMAT_RULE : DATE_TIME_FORMAT_RULE)
        },
        close() {
            this.$emit('show', false)
            this.$emit('close')
        },
        closePicker() {
            this.showDate = false
            this.showTime = false
        },
        submit() {
            this.getData()
        },
        scroll(e) {
            e.stopPropagation();
        },
        itemClick(item) {
            this.$emit('itemClick', item)
        },
        reset() {
            for (let item of this.form) {
                item.value = ''
            }
        },
        loadMore() {
            this.pageSize += 10
            this.getData()
        },
        async getData() {
            let json = this.getParams()
            let res = await http[this.method](this.url, json)
            if (this.requestFormat) res = this.requestFormat();
            this.data = res.result.data
        },
        getParams() {
            let json = {}
            json.pageSize = this.pageSize
            json.psgeNum = this.pageNum
            for (let item of this.optiosn.form) {
                json[item.name] = item.value
            }
            return json
        }
    }
}
</script>

<style>
    .check-box-item {
        margin: 10rpx;
    }
    .loading{
        line-height: 2em;
        text-align: center;
        color: #888;
        margin-top: 30rpx;
    }
    .filter-form {
        height: 100vh;
        overflow-y: auto;
    }
</style>
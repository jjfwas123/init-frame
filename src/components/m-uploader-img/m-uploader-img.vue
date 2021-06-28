<template>
    <view class="uplad-img-box relative" :class="border ? 'under-line':''">
        <view class="relative uploader-item " v-for="(item,index) in fileList || []" :key="item.url">
            <image class="preview-img" @click="preview(index)" :src="item.url"/>
            <van-icon name="clear" class="delete-btn" size="1.5em" v-if="!disabled" @click.stop="onDelete(index)"/>
        </view>
        <view class="uploader-item " v-if="!disabled" @click="choose">
            <image src="@/static/pic.png" class="uploader-img" />
        </view>
    </view>
</template>

<script>
import {http} from '@/http/http'

export default {
    name: 'm-uploader-img',
    model: {
        prop: 'file-list',
        event: 'update'
    },
    props: {
        fileList: {
            type: Array,
        },
        disabled: {
            type: Boolean
        },
        border: {
            type: Boolean,
            default: true
        },
        imageType: {
            type: Number,
            default: 2
        }
    },
    data() {
        return {
        }
    },
    computed: {
        images() {
            return (this.fileList || []).map(item => item.url)
        },
    },
    methods: {
        choose() {
            this.$emit('click')
            HWH5.chooseImage({
                flag: this.imageType,
                imagePickerMode: 'IMAGE',
                maxSelectedCount: 1,
                showOrigin: false,
                btntxtEN: 'Done',
                btntxtCN: '完成',
                cameraFacing: 0,
                compress: '0.25'
            }).then(images => {
                let request = []
                if (images.length){
                    for (let item of images) {
                        request.push(http.uploadFile(item))
                    }
                }
                return Promise.all(request)
            }).then(res => {
                console.log('file result:', res)
                this.$emit('update', [...this.fileList, ...res])
                this.$emit('uploaded')
                uni.hideLoading()
            }).catch(err => {
                console.log(err)
            //存在有上传失败的文件
                uni.hideLoading()
                uni.showToast({
                    title: '上传失败！',
                    icon: 'none',
                })
            })
        },
        onDelete(index) {
            const clone = [...this.fileList]
            clone.splice(index, 1)
            this.$emit('update', clone)
        },

        preview(index) {
            HWH5.previewImage({
                index: index + '',
                imageArray: JSON.stringify(this.images),
                watermark: true
            }).catch(error => {
                console.log('打开失败', error);
            });
        },
    }
}
</script>

<style scoped>
    .uplad-img-box {
	    background-color: #ffff;
        padding: 0 34rpx 10rpx 34rpx;
    }
    .uploader-item {
        display: inline-block;
        height: 180rpx;
        width: 180rpx;
        margin: 20rpx;
        background-color: #f7f8fa;
        text-align: center;
        vertical-align: middle;
    }
    .uploader-img {
        width: 50rpx;
        height: 50rpx;
        margin-top: 64rpx;
    }
    .delete-btn {
        position: absolute;
        right: -20rpx;
        top: -20rpx;
    }
    /deep/.delete-btn .van-icon-clear::before {
        background-color: #fff;
        border-radius: 100%;
    }
    .preview-img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
</style>
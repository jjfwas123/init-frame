<template>
	<van-popup :value="value" round position="bottom" @click-overlay="onClose" @close="onClose">
	  <van-cascader show-toolbar :field-names="fieldNames" v-model="cascaderValue" :loading="loading" :options="columns" @close="onClose" @change="onChange" @finish="onSelectArea" />
	</van-popup>
</template>

<script>
	import { Geo } from '@/model/Geo'
	
	export default {
		name: 'm-area-picker',
		model:{
			prop: 'value',
			event: 'update'
		},
		props: {
			value: {
				type: Boolean
			},
			areaList: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				columns: [],
				loading: false,
				level_1: [],
				level_2: [],
				level_3: [],
				level_4: [],
				cascaderValue: '',
				fieldNames: {
					text: 'regionName',
					value: 'regionCode',
					children: 'children',
				},
				loading: false
			}
		},
		methods: {
			onClose () {
				this.$emit('update', false)
			  	this.$emit('close')
			},
			onSelectArea (arr) {
				this.$emit('update', false)
				this.$emit('confirm', arr)
				  
			},
			onChange({value, selectedOptions, tabIndex}) {
				if (tabIndex <= 1) this.getLocation(value, selectedOptions, tabIndex);
			},
			initData(arr) {
				for (let item of arr) {
					item.children = []
				}
				return arr
			},
			async getLocation(parentCode, target, tabIndex) {
				this.loading = true
				let temp = this.cascaderValue
				const { result } = await Geo.getGeoList({parentCode})
				if (tabIndex === 0) this.initData(result)
				this.$set(target[target.length - 1], 'children', result)
				this.cascaderValue = ''
				this.$nextTick(() => {
					this.cascaderValue = temp
				})
				this.loading = false				
			}
		},
		watch:{
			value (v){
				if (v) {
					this.columns = this.initData(this.$store.state.provinceList)
				}
			}
		}
	}
</script>

<style>
.cascader-loading {
	height: 960rpx;
	position: fixed;
	z-index: 2019;
	left: 0;
	bottom: 0;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(255, 255, 255, 0.76);
}
.cascader-loading > svg  {
	animation: round 2s infinite linear;
}

@keyframes round {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>

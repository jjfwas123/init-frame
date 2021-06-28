<template>
	<van-action-sheet :value="value" @click-overlay="onClose" @cancel='onClose' @close="onClose">
	  <van-datetime-picker
	    type="date"
	    :value="currentDate"
	    :min-date="startTime"
	    :formatter="formatter"
	    @cancel="onClose"
	    @confirm="onSelectTime"
	  />
	</van-action-sheet>
</template>

<script>
	export default {
		name: 'm-date-picker',
		model:{
			prop: 'value',
			event: 'update'
		},
		props: {
			value: {
				type: Boolean
			},
			startTime: {
				type: Date,
				default: () => new Date()
			}
		},
		data() {
			return {
				currentDate: new Date(),
				minDate: new Date(),
			}
		},
		methods: {
		  	onClose () {
			  	this.$emit('update', false)
				this.$emit('close')
		  	},
		  	onSelectTime (value) {
			  	this.$emit('update', false)
		    	this.$emit('confirm', value)
		  	},
		  	formatter(type, value) {
		    	if (type === 'year') {
		      		return `${value}年`;
				} 
				if (type === 'month') {
					return `${value}月`;
				}
				return value;
		  	},
		}
	}
</script>

<style>
</style>

<template>
	<van-action-sheet :value="value" @click-overlay="onClose" @close="onClose">
	  <van-datetime-picker
		type="datetime"
	    :value="currentDate"
	    :min-date="minDate"
	    :max-date="maxDate"
		:formatter='formatter'
	    @confirm="onConfirm"
	    @cancel="onClose"
	  />
	</van-action-sheet>
</template>

<script>
	export default {
		name: 'm-date-time-picker',
		model:{
			prop: 'value',
			event: 'update'
		},
		props: {
		  value: {
		    type: Boolean
		  }
		},
		data() {
			return {
				minHour: 10,
				maxHour: 20,
				minDate: this.currentMinDate(),
				maxDate: new Date(2032, 10, 1),
				currentDate: new Date(),
			}
		},
		methods: {
		  onConfirm (value) {
			  this.$emit('update', true)
		    	this.$emit('confirm', value)
		  },
		  onClose () {
			  	this.$emit('update', false)
		    	this.$emit('close')
		  },
		  formatter(type, value) {
		    	if (type === 'year') {
		      		return `${value}年`;
				} 
				if (type === 'month') {
					return `${value}月`;
				}
				if (type === 'day') {
					return `${value}日`;
				}
				if (type === 'hour') {
					return `${value}时`
				}
				if (type === 'minute') {
					return `${value}分`
				}
				return value;
		  	},
			currentMinDate() {
				let date = new Date()
				return new Date(date.getFullYear(), date.getMonth() + 1, date.getDay())
			}
		}
	}
</script>

<style>
</style>

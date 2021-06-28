<template>
	<span @click="$emit('click')" :class="_state == '已失效' ? 'red': _state === '执行中' ? 'blue' : 'green'">{{_state}}</span>
</template>

<script>
	export default {
		name: 'm-action-state',
		props: {
			state: {
			  type: String
			},
		},
		computed: {
			_state() {
				return this.$store.state.stateEnum[this.state]
			}
		}
	}
</script>

<style scoped>
	.blue {
	  color: #1890FF;
	}
	
	.red {
	  color: #FF5B5B;
	}
	
	.green {
	  color: #A2CF4E;
	}
</style>

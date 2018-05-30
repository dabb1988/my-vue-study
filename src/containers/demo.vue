<template>
	<div class="">
		<div class="demo">
			<PieChart :items=items></PieChart>
		</div>

	</div>
</template>

<script>
	import PieChart from '../components/PieChart.vue'
	export default {
		name: 'demo',
		components: {
			PieChart
		},
		data() {
			return {
				items: [100,200,300,400,500,600,700]
			}
		},
	}
</script>

<style lang="less" scoped>
	.demo {
		display: inline-block;
		position: absolute;
		top: 100px;
		left: 100px;
	}
</style>
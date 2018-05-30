<template>
	<section class="pie-chart">

		<div class="circle-panel" :class='choose ? "coarsening" : ""'>
			<div class="hide-panel left">
				<div class="circle-base"></div>
			</div>
			<div class="hide-panel right">
				<div class="circle-base"></div>
			</div>
		</div>

		<div class="circle-panel">
			<div class="hide-panel left">
				<div class="circle-base"></div>
			</div>
			<div class="hide-panel right">
				<div class="circle-base"></div>
			</div>
		</div>

	</section>
</template>

<script>
	export default {
		name: 'PieChart',
		props:['items'],
		data() {
			return {
				choose: true,
				color: ['#112F61', '#F96326'],
			}
		},
		watch: {

		},
		created() {
			
		},
		mounted(){
			this.init()
		},
		methods: {
			init(){
				const len = this.items.length
				const space = 360 - len * 2
				const sum = this.items.reduce((total, num)=>{
					return total + num
				})
				console.log(sum)
				console.log(space/sum)
				
			},
		},
	}
</script>

<style lang="less" scoped>
	.pie-chart {
		height: 100%;
		font-size: 0;
		.circle-panel {
			position: absolute;
			display: inline-block;
			margin-top: 164px;
			margin-left: 164px;
			transform: translate(-50%, -50%);
			.hide-panel {
				flex: 1;
				display: inline-block;
				width: 50%;
				overflow: hidden;
			}
			.circle-base {
				width: 180px;
				height: 180px;
				box-sizing: content-box;
				border: 20px solid transparent;
				border-radius: 50%;
				box-sizing: content-box;
			}
			.left {
				.circle-base {
					border-bottom-color: #112F61;
					border-left-color: #112F61;
					transform: rotate(225deg);
				}
			}
			.right {
				.circle-base {
					border-top-color: #112F61;
					border-right-color: #112F61;
					transform: translateX(-50%) rotate(225deg);
				}
			}
		}
		.coarsening {
			.left {
				.circle-base {
					border-bottom-color: #F96326;
					border-left-color: #F96326;
				}
			}
			.right {
				.circle-base {
					border-top-color: #F96326;
					border-right-color: #F96326;
				}
			}
			.circle-base {
				animation: coarsening 0.2s 1;
				animation-fill-mode: forwards;
			}
			@keyframes coarsening {
				0% {
					border-width: 20px;
				}
				100% {
					border-width: 30px;
				}
			}
		}
	}
</style>
<template>
	<view class="content">
		<image src="../../static/close.png" class="close" @click="close"></image>
		<view class="main">
			<view class="container">
				<slot></slot>

				<slot name="border" class="title" style="color: antiquewhite;">



				</slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "model",
		data() {
			return {

			};
		},
		methods: {
			close() {
				this.$emit('receiveData')
			},


		}
	}
</script>

<style lang="scss">
	.content {

		border: 4px solid rgb(255, 244, 38);
		border-radius: 10px;
		position: relative;
		box-sizing: border-box;
		padding: 5px;

		.close {
			width: 32px;
			height: 32px;
			position: absolute;
			right: -20px;
			top: -16px;
			background-color: rgb(134, 57, 5);
			border-radius: 50%;
			border: 3px solid rgb(235, 220, 38);
		}

		.main {
			box-sizing: border-box;
			border: 2px solid rgb(201, 47, 57);
			background-image: linear-gradient(to bottom, rgb(125, 25, 30), rgb(82, 13, 17));
			border-radius: 5px;
			background-color: rgb(82, 13, 17);
			width: 100%;
			height: 100%;
			padding: 5px;

			.container {

				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: column;
				box-sizing: border-box;
				padding: 5px;

				.title {
					span {
						color: rgb(254, 251, 26);
						font-size: 40px;
						text-shadow: 0 1px rgba(185, 0, 55, 0.8), 0 2px rgba(185, 0, 55, 0.8), 0 3px rgba(185, 0, 55, 0.8), 0 4px rgba(185, 0, 55, 0.8), 0 5px rgba(185, 0, 55, 0.8), 0 6px rgba(185, 0, 55, 0.8), 0 0 7px white, 0 0 12px rgb(212, 21, 157);
						position: absolute;
						left: 50%;
						top: 0;
						transform: translate(-50%, -50%);
					}
				}

			}
		}

	}
</style>

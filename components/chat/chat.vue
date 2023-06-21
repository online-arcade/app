<template>
	<view class="content">
		<image src="../../static/close.png" class="close"></image>
		<view class="main">


			<view class="container">

				<view class="operate"></view>
				<view class="mess"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "chat",
		data() {
			return {

			};
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
			width: 40px;
			height: 40px;
			position: absolute;
			right: -20px;
			top: -16px;
			background-color: rgb(134, 57, 5);
			border-radius: 50%;
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

				.operate {}

				.mess {}
			}
		}

	}
</style>

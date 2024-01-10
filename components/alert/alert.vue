<template>
	<view class="msg">
		<image class="ok" v-if='!icon' src='../../static/ok.png'></image>
		<image class="ng" v-else src='../../static/ng.png'></image>
		<!-- 	<image src='../../static/error.png'></image> -->
		<text>{{text}}</text>
	</view>

</template>

<script>
	export default {
		props: ['icon', 'text'],
		name: "alert",
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.msg {
		width: 120px;
		padding: 10px 5px;

		background: rgba(22, 22, 22, 0.7);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		// transform: rotate(90deg);
		border-radius: 5px;
		color: white;

		.ok {

			width: 60px;
			height: 60px;
		}

		.ng {
			width: 47px;
			height: 47px;
			margin-bottom: 5px;
		}

		text {
			text-align: center;
		}
	}
</style>

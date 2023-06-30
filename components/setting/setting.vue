<template>
	<model @receiveData="handleSet">

		<view class="container">

			<view class="operate">
				<view class="title">
					<span>我的设置</span>
				</view>

				<view v-for="item in data" :class="{'font':true,'font-click':item.click}" @click="show(item.name)">
					{{item.name}}

				</view>


			</view>
			<view class="mess">

				<span v-for="item in data" v-if="item.click">{{item.mess}}</span>

			</view>
		</view>
	</model>
</template>

<script>
	export default {
		name: "setting",
		data() {
			return {
				sendMess: '',
				data: [{
						name: '音量',
						click: true,
						mess: '音量设置'
					},
					{
						name: '操作设置',
						click: false,
						mess: '操作设置'
					},
					{
						name: '分辨率',
						click: false,
						mess: '分辨率设置'
					},
					{
						name: '更多',
						click: false,
						mess: '更多设置'
					}
				],
				mess: ['音量设置',
					'操作设置',
					'分辨率设置',
					'更多'
				]
			};
		},
		methods: {
			handleSet() {
				this.$emit('receiveData')
			},
			show(mes) {
				this.data.filter(item => {
					if (item.name === mes) {
						item.click = !item.click
					} else item.click = false
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {

		width: 100%;
		height: 100%;
		display: flex;

		box-sizing: border-box;
		padding: 12px 5px 5px;

		.operate {
			display: flex;
			flex-direction: column;
			color: white;
			width: 30%;
			box-sizing: border-box;
			padding: 5px;

			.title {
				background-color: rgb(255, 244, 38);
				box-sizing: border-box;
				padding: 5px;
				color: rgb(254, 251, 26);
				font-size: 25px;
				text-shadow: 0 1px rgba(185, 0, 55, 0.8), 0 2px rgba(185, 0, 55, 0.8), 0 3px rgba(185, 0, 55, 0.8), 0 4px rgba(185, 0, 55, 0.8), 0 5px rgba(185, 0, 55, 0.8), 0 6px rgba(185, 0, 55, 0.8), 0 0 7px white, 0 0 12px rgb(212, 21, 157);
				position: absolute;
				left: 50%;
				top: 0;
				transform: translate(-50%, -50%);
				border-radius: 10px;

				span {
					background-color: rgb(123, 25, 30);
					border-radius: 10px;
					box-sizing: border-box;
					padding: 1px 10px;
				}
			}


			.font {
				text-align: center;
				width: 100%;
				border-radius: 5px;
				background-image: linear-gradient(to bottom, rgb(248, 231, 75), rgb(205, 121, 11));
				// background-color: rgb(205, 123, 9);
				box-sizing: border-box;
				padding: 7px;
				margin-bottom: 5px;
				position: relative;

			}

			.font-click {
				//box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
				box-shadow: 0 0 15px rgba(205, 123, 9, 0.5);
				// border: 1px solid rgb(205, 123, 9);
				// box-sizing: border-box;
				color: yellow;
			}
		}

		.mess {
			color: white;
			//margin-top: 10px;
			box-sizing: border-box;
			padding: 10px;
			flex: 1;
			width: 100%;
			height: 100%;
			border-radius: 7px;
			background-color: rgb(70, 13, 19);
			display: flex;
			flex-direction: column;
			text-shadow: 1px 1px rgba(0, 0, 0, 0.3), 2px 2px rgba(0, 0, 0, 0.3), 3px 3px rgba(0, 0, 0, 0.3);
		}




	}
</style>

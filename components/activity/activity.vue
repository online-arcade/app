<template>


	<model @receiveData="handleActivity">

		<view class="chat">
			<view class="operate">
				<view class="title"> <span>活动中心</span></view>
				<view v-for="item in data" :class="{'font':true,'font-click':item.click}" @click="show(item.name)">
					{{item.name}}
				</view>
			</view>
			<view class="mess">
				<image :src="url" style="width: 100%;height: 100%;"></image>
			</view>
		</view>

	</model>
</template>

<script>
	export default {
		name: "activity",
		data() {
			return {
				url: '../../static/act.png',
				sendMess: '',
				data: [{
					name: '刮刮乐',
					url: '../../static/act.png',
					click: true
				}, {
					name: '大富翁',
					url: '../../static/game2.jpg',
					click: false
				}, {
					name: '挖金矿',
					url: '../../static/game6.jpg',
					click: false
				}],
				mess: [{
						name: '张三',
						data: '发送了一条信息',
						float: 'left'
					},
					{
						name: '李四',
						data: '发送了一条信息',
						float: 'right'
					}
				]
			};
		},
		methods: {
			handleActivity() {
				this.$emit('receiveData')
			},
			show(mes) {
				this.data.filter(item => {
					if (item.name === mes) {
						item.click = !item.click
						this.url = item.url
					} else item.click = false
				})
			}
		}
	}
</script>

<style lang="scss">
	.chat {
		width: 100%;
		height: 100%;
		display: flex;
		box-sizing: border-box;

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

		.operate {
			display: flex;
			flex-direction: column;
			color: white;
			width: 30%;
			box-sizing: border-box;
			padding: 5px;



			.font {
				text-align: center;
				width: 100%;
				border-radius: 5px;
				background-image: linear-gradient(to bottom, rgb(248, 231, 75), rgb(205, 121, 11));
				// background-color: rgb(205, 123, 9);
				box-sizing: border-box;
				padding: 8px;
				margin-bottom: 5px;
				position: relative;


			}

			.font-click {
				box-shadow: 0 0 15px rgba(205, 123, 9, 0.5);
				color: yellow;
			}
		}

		.mess {
			color: white;
			box-sizing: border-box;
			padding: 10px;
			flex: 1;
			width: 100%;
			height: 100%;


			image {
				border-radius: 7px;
				box-shadow: 1px 1px rgba(0, 0, 0, 0.3), 2px 2px rgba(0, 0, 0, 0.3), 3px 3px rgba(0, 0, 0, 0.3), 4px 4px rgba(0, 0, 0, 0.3), 5px 5px rgba(0, 0, 0, 0.3);
			}
		}



	}
</style>

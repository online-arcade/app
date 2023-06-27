<template>
	<view class="content">
		<image src="../../static/close.png" class="close" @click="close"></image>
		<view class="main">


			<view class="container">

				<view class="operate">




					<span>活动中心</span>


					<view v-for="item in data" :class="{'font':true,'font-click':item.click}" @click="show(item.name)">
						{{item.name}}
					</view>
				</view>
				<view class="mess">


					<image src="../../static/act.png" style="width: 100%;height: 100%;"></image>



				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "activity",
		data() {
			return {
				sendMess: '',
				data: [{
					name: '刮刮乐',
					click: false
				}, {
					name: '大富翁',
					click: false
				}, {
					name: '挖金矿',
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
			close() {
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

				width: 100%;
				height: 100%;
				display: flex;

				box-sizing: border-box;
				padding: 10px 5px 5px;

				span {
					color: rgb(254, 251, 26);
					font-size: 40px;
					text-shadow: 0 1px rgba(185, 0, 55, 0.8), 0 2px rgba(185, 0, 55, 0.8), 0 3px rgba(185, 0, 55, 0.8), 0 4px rgba(185, 0, 55, 0.8), 0 5px rgba(185, 0, 55, 0.8), 0 6px rgba(185, 0, 55, 0.8), 0 0 7px white, 0 0 12px rgb(212, 21, 157);
					position: absolute;
					left: 50%;
					top: 0;
					transform: translate(-50%, -50%);
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
						padding: 5px;
						margin-bottom: 5px;
						position: relative;

						// &::before {
						// 	content: '';
						// 	position: absolute;
						// 	right: 0;
						// 	top: 50%;
						// 	transform: translate(100%, -50%);
						// 	border: 10px solid;
						// 	border-color: transparent transparent transparent rgb(221, 165, 38);
						// 	border-left: transparent;
						// }
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

				}


			}
		}

	}
</style>

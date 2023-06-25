<template>
	<view class="content">
		<image src="../../static/close.png" class="close" @click="close"></image>
		<view class="main">


			<view class="container">

				<view class="operate">



					<view v-for="item in data" class="font">
						{{item.name}}

					</view>


				</view>
				<view class="mess" ref="scrollableDiv">


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
					name: '刮刮乐'
				}, {
					name: '大富翁'
				}, {
					name: '挖金矿'
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
			send() {

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
				padding: 5px;

				.operate {
					display: flex;
					flex-direction: column;
					color: white;
					width: 30%;
					box-sizing: border-box;
					padding: 5px;
					justify-content: center;
					align-items: center;

					//	justify-content: space-between;
					//height: 50px;
					span {
						margin-left: 10px;
					}

					.font {
						text-align: center;
						width: 70%;
						background-color: rgb(205, 123, 9);
						box-sizing: border-box;
						padding: 5px;
					}

					image {
						width: 50px;
						height: 50px;
					}

					.send {
						color: white;
						box-sizing: border-box;
						padding: 5px;
						width: 80%;
						height: 50px;
						background-color: rgb(70, 13, 19);
						border-radius: 7px;
					}
				}



				.mess {
					color: white;
					margin-top: 10px;
					box-sizing: border-box;
					padding: 10px;
					flex: 1;
					width: 100%;
					height: 100%;
					border-radius: 7px;
					//background-color: rgb(70, 13, 19);
					//	background-color: rgb(63, 6, 18);

					overflow: scroll;
					display: flex;
					flex-direction: column;




					.row {
						display: flex;
						align-items: center;
						margin-bottom: 5px;

						image {
							width: 30px;
							height: 30px;
							background-color: transparent;
							border-radius: 0;
						}
					}

					.input {
						//	border: 3px solid rgb(117, 23, 28);
						background-color: rgb(47, 0, 17);
						border-radius: 5px;
						box-shadow: 0 0 15px rgb(97, 19, 37);
						color: rgb(245, 231, 202);
						box-sizing: border-box;
						padding: 20px;

					}

					.informate {
						display: flex;

						.showMess {
							margin-left: 5px;
							display: flex;
							flex-direction: column;

							.title {
								transform: scale(0.9);
							}

							.item {
								background-color: rgb(117, 23, 28);
								border-radius: 5px;
								box-sizing: border-box;
								padding: 8px;

							}
						}
					}

				}
			}
		}

	}
</style>

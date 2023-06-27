<template>
	<view class="content">
		<image src="../../static/close.png" class="close" @click="close"></image>
		<view class="main">


			<view class="container">

				<view class="operate">


					<image src="../../static/avatar.jpg"></image>
					<span>名称 :张三</span>

				</view>
				<view class="mess" ref="scrollableDiv">

					<form>

						<uni-row class="row">
							<uni-col :span="5" style="text-align: right;">
								<view class="demo-uni-col dark">昵称:</view>
							</uni-col>
							<uni-col :span="17" :offset="1">
								<input class="input" name="input" placeholder="apple" />
							</uni-col>
						</uni-row>

						<uni-row class="row">
							<uni-col :span="5" style="text-align: right;">
								<view class="demo-uni-col dark">性别:</view>
							</uni-col>
							<uni-col :span="17" :offset="1">
								<image :src="radio1" @click="chooseRadio(1)"></image>
								<image src="../../static/boy (2).png"></image>
								<image :src="radio2" @click="chooseRadio(0)"></image>
								<image src="../../static/gril (2).png"></image>
							</uni-col>
						</uni-row>


						<uni-row class="row">
							<uni-col :span="5" style="text-align: right;">
								<view class="demo-uni-col dark">点数:</view>
							</uni-col>
							<uni-col :span="17" :offset="1">
								<input class="input" name="input" />
							</uni-col>
						</uni-row>

						<uni-row class="row">

							<uni-col :span="5" style="text-align: right;">
								<view class="demo-uni-col dark">人缘:</view>
							</uni-col>
							<uni-col :span="3" :offset="1" style="color:rgb(254,254,61);font-size: 18px;">
								90
							</uni-col>
							<uni-col :span="5" style="text-align: right;">
								<view class="demo-uni-col dark">vip:</view>
							</uni-col>
							<uni-col :span="5" :offset="1" style="color:rgb(254,254,61);font-size: 18px;">
								成为vip
							</uni-col>
						</uni-row>


						<uni-row class="row">
							<uni-col :span="5" style="text-align: right;">
								<view class="demo-uni-col dark">签名:</view>
							</uni-col>
							<uni-col :span="17" :offset="1">
								<input class="input" name="input" placeholder="这个人很懒,什么签名也没有" />
							</uni-col>
						</uni-row>

					</form>






				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "detail",
		data() {
			return {
				radio1: '../../static/radio1.png',
				radio2: '../../static/radio2.png',
				choose: ['../../static/radio1.png', '../../static/radio2.png'],
				sendMess: '',
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
				this.mess.push({
					name: '张三',
					data: this.sendMess,
					float: 'left'
				})

				this.$refs.scrollableDiv.scrollTop = this.$refs.scrollableDiv.scrollHeight;
			},
			chooseRadio(mess) {
				if (mess) {
					this.radio1 = this.choose[0];
					this.radio2 = this.choose[1]
				} else {
					this.radio2 = this.choose[0];
					this.radio1 = this.choose[1]
				}
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
				flex-direction: column;
				box-sizing: border-box;
				padding: 5px;

				.operate {
					display: flex;
					color: white;

					//	justify-content: space-between;
					//height: 50px;
					span {
						margin-left: 10px;
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
					height: 70%;
					border-radius: 7px;
					//background-color: rgb(70, 13, 19);
					background-color: rgb(63, 6, 18);
					overflow: scroll;
					display: flex;
					flex-direction: column;


					image {
						background-color: white;
						border-radius: 50%;
						width: 30px;
						height: 30px;
					}

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
						// color: rgb(245, 231, 202);
						//box-sizing: border-box;
						padding: 10px;

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

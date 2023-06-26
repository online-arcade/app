<template>
	<view class="content">
		<view class="header">
			<view class="group">
				<view class="box">

					<image class="photo" src="../../static/avatar.jpg" @click="modelShow=true"></image>

				</view>

				<view class="group money" style="margin: 0 50px;  height: 100%;  ">
					<image class="" src="../../static/money.png"></image>
					<span style="padding: 0 20px; "> 9999 </span>
					<image class=" add" src="../../static/add (1).png" @click="rechargeShow=true"></image>
				</view>
				<image class="" src="../../static/start (1).png" style="z-index: 2;"></image>
				<span class="start-bar" style=" "> 160
				</span>
			</view>


			<view class="group">
				<image class="" src="../../static/chat (3).png"></image>
				<span @click="chatShow=true">聊天</span>
				<span style="width: 10px;"></span>
				<image class="" src="../../static/set.png"></image>
				<span>设置</span>
			</view>

		</view>

		<view class="main">
			<uni-row class="row" :gutter="0"
				style="width: 100%;flex: 1; height: 100%; overflow: scroll;box-sizing: border-box;">
				<uni-col class="col" :span="8" v-for="item of data" style="height: 50%;">
					<view class="box">
						<view class="box-content">

							<image :src="item.url" style=" height: 100%;">
							</image>
							<span class="num">{{item.mess}}</span>

							<span class="font" style="font-size: 45px;color: yellow;">demon</span>
							<span class="font">{{item.name}}</span>

						</view>

					</view>
				</uni-col>

			</uni-row>
		</view>

		<view class="foot">
			<view v-for="data of image" class="tag" @click="data.show=true">
				<image class="" :src="data.url"></image>
				<span>{{data.name}}</span>
			</view>


		</view>

		<chat class="chat" v-show="chatShow" @receiveData="handleGetData"></chat>
		<model class="model" v-show="modelShow" @receiveData="handleModel"></model>
		<account class="chat" v-show="image[3].show" @receiveData="handleAccount"></account>
		<activity class="chat" v-show="image[1].show" @receiveData="handleActivity"></activity>
		<recharge class="chat" v-show="rechargeShow" @receiveData="handleRecharge"></recharge>
		<sign class="chat" v-show="image[0].show" @receiveData="handleSign"></sign>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				chatShow: false,
				modelShow: false,
				rechargeShow: false,
				activityShow: false,
				accountShow: false,
				data: [{
						url: '../../static/game1.jpg',
						name: '疯狂魔鬼城',
						mess: '4人在玩'
					},
					{
						url: '../../static/game2.jpeg',
						name: '疯狂魔鬼城',
						mess: '4人在玩'
					},
					{
						url: '../../static/game3.jpg',
						name: '疯狂魔鬼城',
						mess: '4人在玩'
					},
					{
						url: '../../static/game4.png',
						name: '疯狂魔鬼城',
						mess: '4人在玩'
					},
					{
						url: '../../static/game5.jpg',
						name: '疯狂魔鬼城',
						mess: '4人在玩'
					},
					{
						url: '../../static/game6.jpg',
						name: '疯狂魔鬼城',
						mess: '4人在玩'
					},

				],
				image: [{
						url: '../../static/sign (1).png',
						name: '签到',
						show: false
					},
					{
						url: '../../static/activity.png',
						name: '活动',
						show: false
					},
					{
						url: '../../static/email.png',
						name: '邮件',
						show: false
					},
					{
						url: '../../static/safe.png',
						name: '账户',
						show: false
					},
					{
						url: '../../static/report (2).png',
						name: '公告',
						show: false
					}
				]
			}
		},
		onLoad() {

		},
		methods: {
			handleGetData() {
				this.chatShow = false
			},
			handleModel() {
				this.modelShow = false
			},
			handleRecharge() {
				this.rechargeShow = false
			},
			handleActivity() {
				this.image[1].show = false
			},
			handleAccount() {
				this.image[3].show = false
			},
			handleSign() {
				this.image[0].show = false
			},
		}
	}
</script>

<style lang="scss">
	.content {

		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;

		.header {
			width: 100%;
			height: 50px;
			color: white;
			//border: 1px solid gray;
			background-image: linear-gradient(to bottom, rgb(234, 56, 202), rgb(62, 0, 72));
			border-bottom: 2px solid rgb(99, 14, 78);
			position: fixed;
			top: 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 0 20px;
			font-size: 13px;

			.money {
				box-shadow: 0 0 5px white;
				color: white;
				border-radius: 50px;
				background-color: rgb(39, 2, 55);
			}

			.start-bar {
				box-shadow: 0 0 3px white;
				width: 100px;
				// background-color: rgba(7, 131, 178);
				background-image: linear-gradient(to right, rgb(7, 131, 178), rgba(7, 131, 178, 0.7));
				text-align: center;
				color: white;
				border-radius: 10px;
				position: relative;
				left: -13px;
				z-index: 1;
				box-sizing: border-box;
				padding: 1px 0;
			}

			.group {
				display: flex;
				align-items: center;

				.box {
					padding: 3px;
					box-sizing: border-box;

					border-radius: 25px;
					background: linear-gradient(to bottom, rgb(146, 27, 135), rgb(193, 43, 117));
					display: flex;
					justify-content: center;
					align-items: center;

					.photo {

						width: 37px;
						height: 37px;
						border-radius: 25px;

					}
				}

			}

			image {
				width: 30px;
				height: 30px;
			}

			.add {
				width: 30px;
				height: 30px;
				position: relative;
				//left: 10px;
			}

			// .photo {
			// 	width: 37px;
			// 	height: 37px;
			// 	border-radius: 25px;
			// 	//box-shadow: 0 0 15px white;
			// 	border: 10px solod gray;
			// }
		}

		.mess {}

		.main {
			z-index: -1;
			//margin: 50px 0;
			box-sizing: border-box;
			padding: 52px 30px;
			background-image: linear-gradient(to bottom, rgb(39, 15, 32), rgb(150, 59, 71));
			flex: 1;

			.row {

				.col {

					margin-bottom: 10px;
					box-sizing: border-box;
					padding: 0 10px;
					display: flex;
					justify-content: center;


					.box {
						display: flex;
						justify-content: center;
						align-items: center;
						width: 90%;

						.box-content {
							box-sizing: border-box;
							//padding: 0 10px 15px;
							//border: 1px solid gray;
							width: 100%;
							height: 100%;
							//border: 3px solid rgb(255, 244, 38);
							//border-radius: 7px;
							//background-color: rgb(162, 249, 255);
							position: relative;

							.num {

								position: absolute;
								top: 0px;
								right: 0;
								color: white;
								text-shadow: 1px 1px rgb(39, 15, 32), 2px 2px rgb(39, 15, 32);
								//font-size: 20px;
							}

							image {
								width: 100%;
								//	height: 100%;
								border: 3px solid rgb(255, 244, 38);
								border-radius: 7px;
								position: relative;
							}

							.font {

								width: 100%;
								text-align: center;
								color: white;
								position: absolute;
								bottom: 10px;
								left: 50%;
								transform: translateX(-50%);
								font-size: 22px;
								//text-shadow: 0px 0px 5px black;
								text-shadow: 1px 1px rgb(39, 15, 32), 2px 2px rgb(39, 15, 32);
							}
						}
					}

				}
			}
		}

		.foot {
			position: fixed;
			bottom: 0;
			width: 100vw;
			height: 50px;
			line-height: 50px;
			background-image: linear-gradient(to bottom, rgb(252, 44, 213), rgb(67, 0, 71));
			display: flex;
			align-items: center;
			box-sizing: border-box;
			padding: 0 20px;
			color: white;
			font-size: 15px;
			// /justify-content: space-between;
			margin-right: 20px;

			.tag {
				//	background-color: red;
				min-width: 83px;
				height: 100%;
				display: flex;

				justify-content: center;
				align-items: center;
				box-sizing: border-box;
				padding: 10px 0px;
				overflow: hidden;

				image {
					width: 30px;
					height: 30px;
					border-radius: 50%;
					box-shadow: 0 0 10px white;
					margin-right: 3px;
				}
			}


		}

		.chat {
			position: fixed;
			//position: absolute;
			width: 90vw;
			height: 90vh;
			left: 50%;
			top: 50%;
			background-color: rgb(57, 6, 15);
			transform: translate(-50%, -50%);
		}

		.model {
			position: fixed;
			//position: absolute;
			width: 60vw;
			height: 90vh;
			left: 50%;
			top: 50%;
			background-color: rgb(57, 6, 15);
			transform: translate(-50%, -50%);
		}
	}
</style>

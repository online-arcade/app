<template>
	<view class="content">
		<view class="header">
			<view class="group">
				<image class="photo" src="../../static/avatar.jpg"></image>
				<view class="group money" style="margin: 0 50px;  height: 100%;  ">
					<image class="" src="../../static/money.png"></image>
					<span style="padding: 0 20px; "> 9999 </span>
					<image class=" add" src="../../static/add (1).png"></image>
				</view>
				<image class="" src="../../static/start (1).png" style="z-index: 2;"></image>
				<span class="start-bar" style=" "> 160
				</span>
			</view>


			<view class="group">
				<image class="" src="../../static/chat (1).png"></image>
				<span @click="chat">聊天</span>
				<span style="width: 10px;"></span>
				<image class="" src="../../static/set.png"></image>
				<span>设置</span>
			</view>

		</view>

		<view class="main">
			<uni-row class="row" :gutter="0" style="width: 100%;flex: 1;  ">
				<uni-col class="col" :span="8" v-for="item of data">
					<view class="box">

						<view class="box-content">


							<span style="float: right;">4人在玩</span>
							<image src="../../static/avatar.jpg" style="width: 100%;height: 80px;position: relative;">
							</image>
							<span class="font">疯狂魔鬼城</span>
						</view>

					</view>
				</uni-col>




			</uni-row>
		</view>

		<view class="foot">
			<view v-for="data of image" class="tag">
				<image class="" :src="data.url"></image>
				<span>{{data.name}}</span>
			</view>


		</view>

		<chat class="chat" v-show="chatShow"></chat>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				chatShow: false,
				data: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				image: [{
						url: '../../static/sign (1).png',
						name: '签到'
					},
					{
						url: '../../static/activity.png',
						name: '活动'
					},
					{
						url: '../../static/email.png',
						name: '邮件'
					},
					{
						url: '../../static/safe.png',
						name: '账户'
					}
				]
			}
		},
		onLoad() {

		},
		methods: {
			chat() {
				this.chatShow = true
			}
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

			.photo {
				width: 40px;
				height: 40px;
				border-radius: 25px;
				box-shadow: 0 0 15px white;
			}
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
							padding: 0 10px 15px;
							border: 1px solid gray;
							width: 100%;
							height: 100%;
							background-color: rgb(162, 249, 255);
							position: relative;

							.font {
								color: white;
								position: absolute;
								bottom: 0;
								left: 10px;
								//transform: translateX(-50%);
								font-size: 22px;
								text-shadow: 0px 0px 5px black;
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
			background-image: linear-gradient(to bottom, rgb(252, 44, 213), rgb(67, 0, 71));
			display: flex;
			align-items: center;
			box-sizing: border-box;
			padding: 0 20px;
			color: white;
			font-size: 15px;
			justify-content: space-between;

			.tag {
				display: flex;
				margin-right: 10px;
				justify-content: center;
				align-items: center;

			}

			image {
				width: 30px;
				height: 30px;
				border-radius: 50%;
				box-shadow: 0 0 10px white;
				margin-right: 3px;
			}
		}

		.chat {
			position: absolute;
			width: 90vw;
			height: 90vh;
			left: 50%;
			top: 50%;
			background-color: rgb(57, 6, 15);
			transform: translate(-50%, -50%);
		}
	}
</style>

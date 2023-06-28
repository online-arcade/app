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
					<!-- <view
						style="width: 30px;height: 30px;background-image: linear-gradient(to bottom, rgb(180, 255, 30), rgb(64,178,2)); display: flex; justify-content: center;align-items: center; border-radius: 50%;">
						<image src="../../static/add (3).png" style=" width: 20px;height: 20px;"></image>

					</view> -->
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
				<span @click="setShow=true">设置</span>
			</view>

		</view>

		<view class="main">


			<uni-transition custom-class="transition" :mode-class="modeClass" :show="show"
				:class="{'row':!series,'row1':series}">

				<!-- <view :class="{'row':!series,'row1':series}"> -->
				<view class="col" v-for="(item,index) of data">
					<view class="box">
						<view class="box-content" @click="chooseSeries(index)">
							<image :src="item.url" style=" height: 100%;">
							</image>
							<span class="num">{{item.mess}}</span>

							<span class="font" style="font-size: 45px;color: yellow;">demon</span>
							<span class="font">{{item.name}}</span>
						</view>
					</view>
				</view>
				<!-- </view> -->
			</uni-transition>



			<uni-transition custom-class="transition" :mode-class="modeClass" :show="!show"
				:class="{'row':!series,'row1':series}">
				<!-- <view :class="{'row':!series,'row1':series}"> -->
				<view class="col" v-for="(item,dex) of data">
					<view class="box">
						<view class="box-content" @click="goto()">
							<image :src="data[index].url" style=" height: 100%;">
							</image>
							<span class="num">{{item.mess}}</span>

							<span class="font" style="font-size: 45px;color: yellow;">demon</span>
							<span class="font">系列{{dex+1}}</span>
						</view>
					</view>
				</view>
				<image src="../../static/return (1).png" @click=" show = ! show"
					style="position: absolute;right:-20px; width: 30px;height: 30px; background-color: pink;border-radius: 50%;box-sizing: border-box;padding: 5px;">
				</image>
				<!-- </view> -->
			</uni-transition>

			<view> </view>

		</view>

		<view class="foot">
			<view v-for="data of image" class="tag" @click="data.show=true">
				<view class="image-border">
					<image class="" :src="data.url"></image>
				</view>
				<span>{{data.name}}</span>
			</view>


		</view>

		<setting class="chat" v-show="setShow" @receiveData="handleSet"></setting>
		<chat class="chat" v-show="chatShow" @receiveData="handleGetData"></chat>
		<model class="model" v-show="modelShow" @receiveData="handleModel"></model>
		<account class="chat" v-show="image[3].show" @receiveData="handleAccount"></account>
		<activity class="chat" v-show="image[1].show" @receiveData="handleActivity"></activity>
		<recharge class="chat" v-show="rechargeShow" @receiveData="handleRecharge"></recharge>
		<sign class="chat" v-show="image[0].show" @receiveData="handleSign"></sign>
		<email class="chat" v-show="image[2].show" @receiveData="handleEmail"></email>
		<report class="chat" v-show="image[4].show" @receiveData="handleReport"></report>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: 0,
				series: false,
				chatShow: false,
				modelShow: false,
				rechargeShow: false,
				activityShow: false,
				setShow: false,
				modeClass: '',
				show: true,
				data: [{
						url: '../../static/game1.jpg',
						name: '疯狂魔鬼城',
						mess: '4人在玩'
					},
					{
						url: '../../static/game2.jpg',
						name: '疯狂魔鬼城',
						mess: '4人在玩'
					},
					{
						url: '../../static/game3.jpg',
						name: '疯狂魔鬼城',
						mess: '4人在玩'
					},
					{
						url: '../../static/game4.jpg',
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

				series: [],

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
			this.series = false
		},
		methods: {
			handleGetData() {
				this.chatShow = false
			},
			handleModel() {
				this.modelShow = false
			},
			handleSet() {
				this.setShow = false
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
			handleEmail() {
				this.image[2].show = false
			},

			handleReport() {
				this.image[4].show = false
			},
			chooseSeries(mess) {
				this.index = mess
				this.modeClass = ['fade', 'slide-left']
				this.show = !this.show
				//this.show = !this.show
			},
			goto() {
				uni.showToast({

					title: '更新中!',

				});
			}
			//returnPage(){}
		}
	}
</script>

<style lang="scss">
	.content {
		font-family: 汉仪正圆-75;
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;

		.header {
			width: 100%;
			height: 50px;
			color: white;
			//border: 1px solid gray;
			background-color: transparent;
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
				//z-index: 1;
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

		}

		.mess {}

		.main {
			//z-index: -1;
			//margin: 50px 0;
			box-sizing: border-box;
			padding: 52px 30px;
			//background-color: red;
			background-image: linear-gradient(to bottom, rgb(39, 15, 32), rgb(150, 59, 71));
			flex: 1;

			.row {
				width: 100%;

				height: 100%;
				//background-color: red;
				box-sizing: border-box;

				display: grid;
				grid-template-rows: repeat(2, 1fr);
				padding: 3px 0 7px;
				grid-template-columns: repeat(3, 1fr);
				//grid-row-gap: 10px;
				grid-gap: 10px 0px;

				.col {

					margin-bottom: 10px;
					box-sizing: border-box;
					padding: 0 10px;
					display: flex;
					justify-content: center;
					width: 100%;
					height: 100%;

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
			background-color: transparent;
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

				.image-border {
					box-sizing: border-box;
					padding: 1px;
					border-radius: 50%;
					margin-right: 3px;
					background-image: linear-gradient(to bottom, rgb(146, 27, 135), rgb(193, 43, 117));
					;

					display: flex;
					justify-content: center;
					align-items: center;

					image {
						width: 30px;
						height: 30px;
						border-radius: 50%;
						//box-shadow: 0 0 10px white;

					}

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

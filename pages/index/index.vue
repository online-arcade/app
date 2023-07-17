<template>
	<view class="content">
		<view class="header">
			<view class="group">
				<view class="box">
					<image class="photo" src="../../static/avatar.jpg" @click="handleModel(1)"></image>
				</view>

				<view class="group money" style="   ">
					<image src="../../static/money.png" style="transform: translateX(-25%);"></image>
					<span> 9999 </span>

					<image class="icon" src="../../static/add (1).png" style="transform: translateX(25%);"
						@click="handleRecharge(1)"></image>
				</view>
				<image class="" src="../../static/start (1).png" style="z-index: 2;">
				</image>
				<span class="start-bar"> 160
				</span>
			</view>


			<view class="group">

				<span @click="handleGetData(1)" class="group-flex">
					<image class="" src="../../static/chat (3).png" class="chat-icon"></image>
					<span>聊天</span>
				</span>
				<span style="width: 10px;"></span>
				<span @click="handleSet(1)" class="group-flex">
					<image class="" src="../../static/set.png"></image>
					<span>设置</span>
				</span>


			</view>

		</view>

		<view class="main">


			<uni-transition custom-class="transition" :mode-class="modeClass" :show="show"
				:class="{'row':!series,'row1':series}">


				<view class="col" v-for="(item,index) of data">
					<view class="box">
						<view class="box-content" @click="chooseSeries(index)">
							<image :src="item.url" style=" height: 100%;">
							</image>
							<span class="num">{{item.mess}}</span>

							<span class="font" style="font-size: 45px;color: yellow;">games</span>
							<span class="font">{{item.name}}</span>
						</view>
					</view>
				</view>
				<!-- </view> -->
			</uni-transition>



			<uni-transition custom-class="transition" :mode-class="modeClass" :show="!show"
				:class="{'row':!series,'row1':series}">

				<view class="col" v-for="(item,dex) of data">
					<view class="box">
						<view class="box-content" @click="goto(item.series)">
							<image :src="data[index].url" style=" height: 100%;">
							</image>
							<span class="num">{{item.mess}}</span>

							<span class="font" style="font-size: 45px;color: yellow;">demon</span>
							<span class="font">游戏机{{dex+1}}</span>
						</view>
					</view>
				</view>
				<image src="../../static/return (1).png" @click=" show = ! show" class="returnIcon">
				</image>
				<!-- </view> -->
			</uni-transition>



		</view>

		<view class="foot">
			<view v-for="(data,index) of image" class="tag" @click="handleIcon(index,1)">
				<view class="image-border">
					<image class="" :src="data.url"></image>
				</view>
				<span>{{data.name}}</span>
			</view>


		</view>

		<view class="loading" v-show="loading">
			<image src="../../static/load.png" style="width: 20%; " mode="widthFix"></image>
			<image class="progress" src="../../static/loading.png">
			</image>
			<span> 注意 : 若累计游戏时间如超过5小时 ，游戏内的收益（经验、金钱）直接为0</span>
		</view>

		<!-- <view v-show="mask" class="showModel"> </view> -->

		<uni-transition custom-class="transition" :mode-class="modeClass" :show="mask" class="showModel">

			<setting class="chat" v-show="setShow" @receiveData="handleSet(0)"></setting>
			<chat class="chat" v-show="chatShow" @receiveData="handleGetData(0)"></chat>
			<userInfo class="model" v-show="modelShow" @receiveData="handleModel(0)"></userInfo>
			<recharge class="chat" v-show="rechargeShow" @receiveData="handleRecharge(0)"></recharge>
			<account class="chat" v-show="image[3].show" @receiveData="handleIcon(3,0)"></account>
			<activity class="chat" v-show="image[1].show" @receiveData="handleIcon(1,0)"></activity>
			<sign class="chat" v-show="image[0].show" @receiveData="handleIcon(0,0)"></sign>
			<email class="chat" v-show="image[2].show" @receiveData="handleIcon(2,0)"></email>
			<report class="chat" v-show="image[4].show" @receiveData="handleIcon(4,0)"></report>


		</uni-transition>




	</view>
</template>

<script>
	export default {

		data() {
			return {
				mask: false,
				showAll: [false, true],
				dialog: false,
				timer: null,
				loading: true,
				index: 0,
				series: false,
				chatShow: false,
				modelShow: false,
				rechargeShow: false,
				activityShow: false,
				setShow: false,
				modeClass: ['fade', 'slide-left'],
				show: true,
				data: [{
						url: '../../static/game1.jpg',
						name: '系列1',
						mess: '4人在玩',
						series: "test"
					},
					{
						url: '../../static/game2.jpg',
						name: '系列2',
						mess: '4人在玩',
						series: "test"
					},
					{
						url: '../../static/game3.jpg',
						name: '系列3',
						mess: '4人在玩',
						series: "test"
					},
					{
						url: '../../static/game4.jpg',
						name: '系列4',
						mess: '4人在玩',
						series: "demo"
					},
					{
						url: '../../static/game5.jpg',
						name: '系列5',
						mess: '4人在玩',
						series: "demo"
					},
					{
						url: '../../static/game6.jpg',
						name: '系列6',
						mess: '4人在玩',
						series: "demo"
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
		mounted() {
			this.resourcesLoaded();
		},

		methods: {
			resourcesLoaded() {
				var time = setTimeout(() => {
					if (document.readyState === 'complete') {
						this.loading = false
					} else {
						this.resourcesLoaded()
					}
				}, 5000)
			},
			handleGetData(show) {
				this.mask = this.chatShow = this.showAll[show];
			},
			handleModel(show) {
				this.mask = this.modelShow = this.showAll[show];
			},
			handleSet(show) {
				this.mask = this.setShow = this.showAll[show];
			},
			handleRecharge(show) {
				this.mask = this.rechargeShow = this.showAll[show];
			},
			handleIcon(index, show) {
				this.mask = this.image[index].show = this.showAll[show];
			},

			chooseSeries(mess) {
				this.index = mess
				this.show = !this.show
			},
			loader() {
				this.loading = !this.loading
			},

			goto(name) {
				// uni.showToast({
				// 	title: '更新中!',
				// });
				uni.navigateTo({
					url: '/pages/play/play?name=' + name
				});
			}

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
		position: relative;

		.showModel {
			background-color: rgba(0, 0, 0, 0.3);
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
		}

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
				margin: 0 50px;

				box-shadow: 0 0 0 transparent, 0 0 8px whitesmoke inset, 0 0 0 transparent, 0 0 10px rgb(143, 0, 125);
				color: white;
				border-radius: 50px;
				background-color: rgb(39, 2, 55);

				span {
					padding: 0 15px;
				}

				image {
					width: 26px;
					height: 26px;
					box-shadow: 1px 1px rgba(0, 0, 0, 0.3), 2px 2px rgba(0, 0, 0, 0.3);
					border-radius: 50%;
					position: relative;
					box-sizing: border-box;
					padding: -1px;
				}
			}

			.start-bar {
				box-shadow: 0 0 3px white;
				width: 120px;
				background-color: rgb(43, 0, 39);
				text-align: center;
				color: white;
				border-radius: 10px;
				position: relative;
				left: -20px;
				//z-index: 1;
				box-sizing: border-box;
				text-shadow: 1px 1px rgba(0, 0, 0, 0.3), 2px 2px rgba(0, 0, 0, 0.3);
				//padding: 1px 0;
				position: relative;

				&::before {
					content: ''
					;
					border-radius: 10px;
					position: absolute;
					width: 40%;
					height: 100%;
					left: 0;
					top: 0;
					background-color: rebeccapurple;
					background-image: linear-gradient(to bottom, rgb(10, 247, 251), rgb(1, 125, 173), rgb(10, 247, 251));
				}
			}

			.group {
				display: flex;
				align-items: center;

				.group-flex {
					//min-width: 56px;
					overflow: hidden;
					display: flex;
					align-items: center;

					.chat-icon {

						width: 28px;
						height: 28px;
						margin-right: 3px;
					}

					span {
						min-width: 26px;
					}
				}

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

			.returnIcon {
				position: absolute;
				right: -20px;
				width: 30px;
				height: 30px;
				background-color: pink;
				border-radius: 50%;
				box-sizing: border-box;
				padding: 5px;
			}

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
								//bottom: 10px;
								left: 50%;
								bottom: 0;
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
			width: 90vw;
			height: 90vh;
			left: 50%;
			top: 50%;
			background-color: rgb(57, 6, 15);
			transform: translate(-50%, -49%);
			position: fixed;


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

		@keyframes spin {
			0% {
				transform: rotate(0deg);
			}

			100% {
				transform: rotate(360deg);
			}
		}


		.loading {

			width: 100%;
			height: 100%;
			//background-color: rgba(0, 0, 0, 0.3);
			position: absolute;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			&::before {
				content: '';
				width: 100%;
				height: 100%;
				background-image: linear-gradient(to right, rgb(44, 13, 23), rgb(74, 21, 39), rgb(44, 13, 23));
				position: absolute;
				left: 0;
			}



			.progress {
				width: 30px;
				height: 30px;
				animation: spin 2s linear infinite;
				margin: 20px 0;
			}

			span {
				text-align: center;
				color: white;
				width: 70%;
				z-index: 1
			}
		}

	}
</style>

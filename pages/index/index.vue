<template>
	<view class="content">
		<view class="header">
			<view class="group">
				<view class="box">
					<image class="photo" src="../../static/avatar.jpg" @click="handleModel(1)"></image>
				</view>

				<view class="group money">
					<image src="../../static/coin.png" style="transform: translateX(-25%);"></image>
					<span> {{user.balance}} </span>

					<image class="icon" src="../../static/add.png" style="transform: translateX(25%);"
						@click="handleRecharge(1)"></image>
				</view>
				<image class="" src="../../static/start.png" style="z-index: 2;">
				</image>
				<span class="start-bar"> {{user.integral}}
				</span>
			</view>


			<view class="group">

				<span @click="handleGetData(1)" class="group-flex">
					<image class="" src="../../static/chat.png" class="chat-icon"></image>
					<span>聊天</span>
				</span>
				<span style="width: 10px;"></span>
				<span @click="handleSet(1)" class="group-flex">
					<image class="" src="../../static/set.png"></image>
					<span>设置</span>
				</span>


			</view>

		</view>

		<view :class="{'main':true,'main-pad':!show}">

			<!-- <view
				style="width: 50px;height: 50%;background-color:transparent;box-sizing: border-box; border: 2px solid rgba(39,8,94,0.6); position: absolute;left: 5px;top:50%;  transform: translateY(-50%);  border-radius: 30px;">
			</view> -->
			<uni-transition custom-class="transition" :mode-class="modeClass" :show="show" :class="{'row':!series }">
				<view :class="{'col':true,'col-wid1':true}" v-for="(item,index) of game">
					<view class="box">
						<view class="box-content" @click="chooseSeries(item.id)">
							<image :src="'../../static/'+item.icon" style=" height: 100%;">
							</image>
							<span class="num">{{item.desc}}</span>

							<span class="font" style="font-size: 45px;color: yellow;">games</span>
							<span class="font">{{item.name}}</span>
						</view>
					</view>
				</view>

			</uni-transition>


			<image src="../../static/return.png" v-show="!show" @click=" show = ! show" class="returnIcon">
			</image>

			<uni-transition custom-class="transition" :mode-class="modeClass" :show="!show" :class="{'row':!series }">

				<view :class="{'col':true,'col-wid2':true}" v-for="(item,dex) of box">
					<view class="box">
						<view class="box-content" @click="goto(item.type)">
							<image src="../../static/gamebox.jpg" style=" height: 100%;">
							</image>
							<span class="num">{{item.desc}}</span>
							<span class="font">游戏机{{dex+1}}</span>
						</view>
					</view>
				</view>

				<view v-if="!box"
					style="color: rgb(255,244,38) ;font-size: 30px;display: flex;justify-content: center;align-items: center;width: 100%;height: 100%;">
					请上传游戏数据！</view>
				<!-- </view> -->
			</uni-transition>



		</view>

		<!-- 	<view class="foot">
			<view v-for="(data,index) of image" class="tag" @click="handleIcon(index,1)">
				<view class="image-border">
					<image class="" :src="data.url"></image>
				</view>
				<span>{{data.name}}</span>
			</view>
		</view> -->

		<view class="loading" v-show="loading">
			<image src="../../static/load.png" style="width: 20%; " mode="widthFix"></image>
			<image class="progress" src="../../static/loading.png">
			</image>
			<span> 注意 : 若累计游戏时间如超过5小时 ，游戏内的收益（经验、金钱）直接为0</span>
		</view>

		<!-- <view v-show="mask" class="showModel"> </view> -->
		<!-- v-show="chatShow" -->
		<!-- <chat class="chat" v-show="true" @receiveData="handleGetData(0)"></chat> -->
		<uni-transition custom-class="transition" :mode-class="modeClass" :show="mask" class="showModel">
			<chat class="chat" v-show="chatShow" @receiveData="handleGetData(0)"></chat>
			<setting class="chat" v-show="setShow" @receiveData="handleSet(0)"></setting>
			<userInfo class="model" v-show="modelShow" :user="user" @receiveData="handleModel(0)"></userInfo>
			<recharge class="chat" v-show="rechargeShow" :user="user" @receiveData="handleRecharge(0)"></recharge>
			<!-- 			 
			 
		 
			<account class="chat" v-show="image[3].show" :recharge="recharge" @receiveData="handleIcon(3,0)"></account>
			<activity class="chat" v-show="image[1].show" @receiveData="handleIcon(1,0)"></activity>
			<sign class="chat" v-show="image[0].show" @receiveData="handleIcon(0,0)"></sign>
			<email class="chat" v-show="image[2].show" @receiveData="handleIcon(2,0)"></email>
			<report class="chat" v-show="image[4].show" @receiveData="handleIcon(4,0)"></report>
-->

		</uni-transition>




	</view>
</template>

<script>
	import screenfull from "screenfull";
	export default {

		data() {
			return {
				user: {},
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
				row1: [],
				row2: [],
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
					{
						url: '../../static/game6.jpg',
						name: '系列7',
						mess: '4人在玩',
						series: "demo"
					},


					{
						url: '../../static/game4.jpg',
						name: '系列8',
						mess: '4人在玩',
						series: "demo"
					},
					{
						url: '../../static/game5.jpg',
						name: '系列9',
						mess: '4人在玩',
						series: "demo"
					},

					{
						url: '../../static/game4.jpg',
						name: '系列10',
						mess: '4人在玩',
						series: "demo"
					},
					{
						url: '../../static/game5.jpg',
						name: '系列11',
						mess: '4人在玩',
						series: "demo"
					},
				],

				series: [],
				game: [],
				box: [],
				recharge: [],
				signin: [],
				email: [],
				image: [{
						url: '../../static/sign.png',
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
						url: '../../static/report.png',
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
			this.load()
			this.row1 = this.data.slice(0, (this.data.length + 1) / 2)
			this.row2 = this.data.slice((this.data.length + 1) / 2)


			window.addEventListener('orientationchange', this.handleOrientationChange)
			// if (!screenfull.isEnabled) {
			// 	// 如果不支持进入全屏，发出不支持提示
			// 	console.log('err')
			// 	return false;
			// }
			// //此处填入需要全屏的ref属性值即可
			// screenfull.toggle(this.$refs.content);
			// this.$nextTick(() => {
			// 	this.rotateBox();
			// });

		},

		methods: {
			handleOrientationChange() {
				console.log('rot')
				if (typeof plus !== 'undefined' && typeof plus.screen !== 'undefined')
					plus.screen.lockOrientation('landscape')

			},
			load() {
				// uni.request({ //用户
				// 	url: 'http://demo.iot-master.com:8082/api/user/0',
				// 	method: 'GET',
				// 	success: (item) => {
				// 		item.data ? this.user = item.data.data : ''
				// 	}
				// });

				this.user = {
					"id": 0,
					username: "admin",
					nick_name: "张三",
					email: "cs",
					cellphone: "13754212553",
					balance: 770,
					integral: 3000,
					created: "2023-07-21T18:07:22+08:00"
				}
				const mes =
					'"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAiLCJleHAiOjE2OTMxMjYwNDR9.zupJ5jc2zvKW4soIQlPqpgWyUN_qR9lEOVmGLEXPQMQ": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAiLCJleHAiOjE2OTMxMjYwNDR9.zupJ5jc2zvKW4soIQlPqpgWyUN_qR9lEOVmGLEXPQMQ"'
				console.log(mes)
				uni.request({ //游戏厅
					url: 'http://demo.iot-master.com:8082/api/game/list',
					method: 'GET',
					header: {
						'Content-Type': 'application/json;charset=UTF-8',
						'Authorization': mes
					},
					//withCredentials: true, // 设置为 true
					success: (item) => {
						this.game = item.data.data
						console.log(item.data.data)
					}
				});

				this.game = [{
					id: 2,
					name: "疯狂魔鬼城",
					desc: "2人在玩",
					icon: "fkmgc.png",
					type: "fkmgc",
					disabled: true,
					created: "2023-07-26T09:55:42+08:00"
				}, {
					id: 1,
					name: "捕鱼达人",
					desc: "1人在玩",
					icon: "bydr.png",
					type: "bydr",
					disabled: true,
					created: "2023-07-26T09:55:41+08:00"
				}]


				// uni.request({ //签到
				// 	url: 'http://demo.iot-master.com:8082/api/signin/list',
				// 	method: 'GET',
				// 	success: (item) => {
				// 		console.log(item)
				// 	}
				// });

			},

			resourcesLoaded() {
				var time = setTimeout(() => {
					if (document.readyState === 'complete') {
						this.loading = false
					} else {
						this.resourcesLoaded()
					}
				}, 2000)
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
				if (show)
					switch (index) {
						case 0:
							uni.request({ //充值
								url: 'http://demo.iot-master.com:8082/api/signin/search',
								method: 'POST',
								data: {
									filter: {
										user_id: 0
									}
								},
								success: (item) => {
									this.signin = item.data.data
								}
							});
							break;
						case 2:
							uni.request({
								url: 'http://demo.iot-master.com:8082/api/email/list',
								method: 'GET',
								success: (item) => {
									this.email = item.data.data
								}
							});
							break;
						case 3:
							uni.request({
								url: 'http://demo.iot-master.com:8082/api/recharge/search',
								method: 'POST',
								data: {
									filter: {
										id: 0
									}
								},
								success: (item) => {
									this.recharge = item.data.data
								}
							});
							break;
						default:
							break;
					}
			},

			chooseSeries(mess) {
				let box = []
				const mes = [{
					id: 16,
					name: "游戏机",
					desc: "0人在玩",
					icon: "string",
					type: "test",
					disabled: true,
					game_id: 2,
					created: "2023-07-26T10:47:52+08:00"
				}, {
					id: 15,
					name: "游戏机",
					desc: "0人在玩",
					icon: "string",
					type: "test",
					disabled: true,
					game_id: 2,
					created: "2023-07-26T10:47:49+08:00"
				}, {
					id: 14,
					name: "游戏机",
					desc: "0人在玩",
					icon: "string",
					type: "test",
					disabled: true,
					game_id: 2,
					created: "2023-07-26T10:47:47+08:00"
				}, {
					id: 13,
					name: "游戏机",
					desc: "0人在玩",
					icon: "string",
					type: "test",
					disabled: true,
					game_id: 2,
					created: "2023-07-26T10:47:44+08:00"
				}, {
					id: 12,
					name: "游戏机",
					desc: "0人在玩",
					icon: "string",
					type: "test",
					disabled: true,
					game_id: 2,
					created: "2023-07-26T10:47:42+08:00"
				}, {
					id: 11,
					name: "游戏机",
					desc: "0人在玩",
					icon: "string",
					type: "test",
					disabled: true,
					game_id: 2,
					created: "2023-07-26T10:47:39+08:00"
				}, {
					id: 10,
					name: "游戏机",
					desc: "0人在玩",
					icon: "string",
					type: "test",
					disabled: true,
					game_id: 2,
					created: "2023-07-26T10:47:34+08:00"
				}, {
					id: 9,
					name: "游戏机",
					desc: "0人在玩",
					icon: "string",
					type: "demo",
					disabled: true,
					game_id: 1,
					created: "2023-07-26T10:46:36+08:00"
				}, {
					id: 8,
					name: "游戏机",
					desc: "0人在玩",
					icon: "string",
					type: "demo",
					disabled: true,
					game_id: 1,
					created: "2023-07-26T10:46:30+08:00"
				}, {
					id: 7,
					name: "游戏机",
					desc: "0人在玩",
					icon: "string",
					type: "demo",
					disabled: true,
					game_id: 1,
					created: "2023-07-26T10:46:26+08:00"
				}, {
					id: 6,
					name: "游戏机",
					desc: "0人在玩",
					icon: "string",
					type: "demo",
					disabled: true,
					game_id: 1,
					created: "2023-07-26T10:46:20+08:00"
				}, {
					id: 5,
					name: "游戏机",
					desc: "0人在玩",
					icon: "string",
					type: "demo",
					disabled: true,
					game_id: 1,
					created: "2023-07-26T10:46:13+08:00"
				}, {
					id: 4,
					name: "游戏机",
					desc: "0人在玩",
					icon: "string",
					type: "demo",
					disabled: true,
					game_id: 1,
					created: "2023-07-26T10:46:04+08:00"
				}, {
					id: 3,
					name: "游戏机",
					desc: "0人在玩",
					icon: "string",
					type: "demo",
					disabled: true,
					game_id: 1,
					created: "2023-07-26T10:44:38+08:00"
				}, {
					id: 2,
					name: "游戏机",
					desc: "0人在玩",
					icon: "string",
					type: "demo",
					disabled: true,
					game_id: 1,
					created: "2023-07-26T10:43:38+08:00"
				}, {
					id: 1,
					name: "游戏机1",
					desc: "0人在玩",
					icon: "string",
					type: "demo",
					disabled: true,
					game_id: 1,
					created: "2023-07-26T10:43:37+08:00"
				}]
				mes.filter((item) => {
					if (item.game_id === mess) {
						box.push(item);

					}
				})
				this.box = box

				// uni.request({ //游戏厅
				// 	url: `http://demo.iot-master.com:8082/api/box/search`,
				// 	method: 'POST',
				// 	data: {
				// 		filter: {
				// 			game_id: mess
				// 		}
				// 	},
				// 	success: (item) => {
				// 		this.box = item.data.data
				// 	}
				// });

				this.index = mess
				this.show = !this.show
			},
			loader() {
				this.loading = !this.loading
			},

			goto(name) {
				console.log(name)
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
		font-family: font;
		// width: 100vw;
		// height: 100vh;
		display: flex;
		flex-direction: column;
		position: relative;


		width: 100vh;
		height: 100vw;
		margin-left: 100vw;
		transform: rotate(90deg);
		transform-origin: left top;





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
			padding: 52px 10px 0px;
			// padding-top: 52px;
			// padding-bottom: 52px;
			//background-color: red;
			background-image: linear-gradient(to bottom, rgb(39, 15, 32), rgb(150, 59, 71));
			flex: 1;
			width: 100%;
			height: 100%;

			.returnIcon {
				position: fixed;
				left: 12px;
				//top: 55px;
				top: 50%;
				transform: translateY(-50%);
				width: 25px;
				height: 25px;
				background-color: pink;
				border-radius: 50%;
				box-sizing: border-box;
				padding: 5px;
			}

			.row {

				//background-color: red;
				width: 100%;
				height: 100%;
				box-sizing: border-box;
				// display: grid;
				// grid-template-rows: repeat(2, 1fr);
				// padding: 3px 0 7px;
				// grid-template-columns: repeat(3, 1fr);
				// grid-auto-flow: row;
				// grid-gap: 10px 0px;
				//overflow: scroll; 
				overflow-y: scroll;
				display: flex;
				flex-flow: row wrap;
				//box-shadow: inset 4px 0px 5px rgba(172, 36, 155, 0.2);
				//padding-right: 10px;
				position: relative;
				border-radius: 5px;

				&::after {
					content: '';
					position: absolute;
					width: 5px;
					height: 96%;
					top: 50%;
					transform: translateY(-50%);

				}

				.col-wid1 {
					width: 33%;
					padding: 5px 0px 8px;
				}

				.col-wid2 {
					width: 24%;
					//margin-right: 10px;
					padding: 15px 5px;

				}

				.col {

					box-sizing: border-box;

					display: flex;
					justify-content: center;
					//width: 22%;
					height: 50%;
					//flex-direction: row;
					//flex-wrap: nowrap;
					//overflow: hidden;


					.box {
						display: flex;
						justify-content: center;
						align-items: center;
						width: 90%;
						box-sizing: border-box;

						.box-content {
							box-sizing: border-box;
							width: 100%;
							height: 100%;
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

		.main-pad {
			padding-left: 40px
		}

		.foot {
			position: fixed;
			bottom: 0;
			width: 100vw;
			height: 50px;
			line-height: 50px;
			//background-color: transparent;
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
			// position: fixed;
			// width: 90vw;
			// height: 90vh;
			// left: 50%;
			// top: 50%;
			// background-color: rgb(57, 6, 15);
			// transform: translate(-50%, -49%);

			position: absolute;
			transform: rotate(0deg);
			width: 90vh;
			height: 90vw;
			left: 50%;
			top: 50%;
			background-color: rgb(57, 6, 15);
			margin-left: 0vw;
			transform: translate(-50%, -49%);
		}

		.model {
			// position: fixed;
			// //position: absolute;
			// width: 60vw;
			// height: 90vh;
			// left: 50%;
			// top: 50%;
			// background-color: rgb(57, 6, 15);
			// transform: translate(-50%, -50%);

			position: absolute;
			transform: rotate(0deg);
			width: 60vh;
			height: 90vw;
			left: 50%;
			top: 50%;
			background-color: rgb(57, 6, 15);
			margin-left: 0vw;
			transform: translate(-50%, -49%);
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

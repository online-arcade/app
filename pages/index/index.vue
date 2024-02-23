<template>
	<view class="page">
		<view class="content">

			<view class="header">
				<view class="group">
					<view class="box">
						<image class="photo" :src="url" @click="handleModel(1)"></image>
						<text> {{user.nickname||'无名'}} </text>
					</view>
					<!-- 				<image class="" src="../../static/start.png" style="z-index: 2;">
				</image>
				<span class="start-bar"> {{user.integral}}
				</span> -->
				</view>


				<view class="group money">
					<image src="../../static/coin.png" style="transform: translateX(25%);" @click="handlePay(1)">
					</image>
					<span> {{user.balance||0}} </span>

					<image class="icon" src="../../static/add.png" style="transform: translateX(-25%);"
						@click="handleRecharge(1)"></image>
				</view>


			</view>

			<view :class="{'main':true,'main-pad':!show}">


				<swiper class="ad" :indicator-dots="true" :autoplay="true" :interval="5000" :duration="1000">
					<swiper-item>
						<image src="../../static/bydr.png" mode="aspectFill"></image>
					</swiper-item>
					<swiper-item>
						<image src="../../static/act.png" mode="aspectFill"></image>
					</swiper-item>
				</swiper>

				<uni-transition custom-class="transition" :mode-class="modeClass" :show="show"
					:class="{'row':!series }">
					<view :class="{'col':true,'col-wid1':true}" v-for="(item,index) of game">
						<view class="box">
							<view class="box-content" @click="toggle('center',item.id)">
								<image :src="'../../static/'+item.icon" style=" height: 100%;">
								</image>
								<span class="num">{{onlineNum}}人在线</span>
								<span class="font">{{item.name}}</span>
							</view>
						</view>
					</view>

				</uni-transition>
				<uni-popup ref="popup" :mask-click="false">
					<view class="modal">
						<view class="modal-title">{{modal.title }}</view>
						<view class="modal-content">
							<view v-for="(item,index) of modal.content">
								({{index+1}}) {{item}}
							</view>

						</view>
						<view class="modal-foot">


							<uni-load-more iconType="snow" status="loading"></uni-load-more>


						</view>
					</view>
				</uni-popup>

				<uni-popup ref="report" :mask-click="false">

					<view class="report">
						<view class="report-title">{{report.title}}</view>
						<view class="report-content">
							<view>
								{{report.msg}}
							</view>

							<view v-for="(item,index) of report.content">
								{{index+1}}. {{item}}
							</view>
							<view v-for="(item,index) of report.contact">
								{{item}}
							</view>

						</view>
						<view class="report-foot">
							<view class="report-foot-btn " @click="handleReportOk()">
								确认
							</view>



						</view>
					</view>
				</uni-popup>




			</view>

			<showToast class="showToast" :msg="msg" v-show="showToast"></showToast>



			<uni-transition custom-class="transition" :mode-class="modeClass" :show="mask" class="showModel">
				<!-- <chat class="chat" v-show="chatShow" @receiveData="handleGetData(0)"></chat> -->
				<setting class="chat" v-show="setShow" @receiveData="handleSet(0)"></setting>
				<userInfo class="chat" v-show="modelShow" :user="user" @receiveData="handleModel(0)"></userInfo>
				<recharge class="chat" v-show="rechargeShow" :user="user" @receiveData="handleRecharge(0)"></recharge>
				<conversion class="chat" v-show="payShow" :user="user" @receiveData="handlePay(0)"></conversion>

			</uni-transition>




		</view>
	</view>
</template>

<script>
	import screenfull from "screenfull";
	import url from "url";

	// import Peer from 'peerjs';
	export default {

		data() {
			return {
				onlineNum: 1,
				showToast: false,
				msg: {
					name: '提交成功!'
				},
				time: '',
				gotoGame: '',
				url: '../../static/avatar.jpg',
				token: '',
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
				payShow: false,
				rechargeShow: false,
				activityShow: false,
				setShow: false,
				modeClass: ['fade', 'zoom-in'],
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
				modal: {
					title: "游戏须知",
					content: ['机台1币=200分，开始游戏即自动投10币=2000分;',
						'系统总分上限100万分，超过上限后的投币与打中boss的加分不计数，游玩时请注意台面分数，避免无效上分;',
						'有任何问题，请加客服微信咨询!'
					]
				},
				report: {
					title: '游戏须知',
					// msg: '欢迎来到物联网游戏体验中心，为响应文市发[2016]26号文件，鼓励游戏游艺场所积极应用合法合规的新设备、改造服务环境、创新经营模式，支持其增设上网服务项目成为多种经营业务的城市文化娱乐综合体。顺应“互联网+”发展趋势，鼓励娱乐场所与互联网结合发展，实现场内场外、线上线下互动，增强娱乐场所体验式服务,不断拓展新型文化产业业态健康的娱乐理念。特此声明:',
					contact: ['客服微信：w121212z', '电话：1391060047'],
					content: ['长按发泡键三秒，自动连续发泡', '点击左右按键控制方向', '下机前请按下机键，否则丢分不补', '兑换的礼物，每天早九点，中午12点，晚上九点，统一发放']

				},

				series: [],
				game: [{
					created: "2023-07-26T09:55:42+08:00",
					desc: "2人在玩",
					disabled: true,
					icon: "fkmgc.png",
					id: 2,
					name: "疯狂魔鬼城",
					type: "fkmgc"
				}, {
					created: "2023-07-26T09:55:41+08:00",
					desc: "1人在玩",
					disabled: true,
					icon: "bydr.png",
					id: 1,
					name: "捕鱼达人",
					type: "bydr"
				}, ],
				box: [],
				recharge: [],
				signin: [],
				email: [],
				loadNum: 0,
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
		onShow() {
			if (this.token) this.load()

			this.$refs.report.open('center');
			// this.load()

		},
		onHide() {
			clearInterval(this.timer)
		},

		onLoad() {

			// const code = this.$route;
			// const code1 = this.$route.query;
			// const code2 = this.$route.query.code;
			// console.log("微信自动登录 code", code, code1, code2);
			// console.log(option)
			this.series = false

		},
		mounted() {
			this.$refs.report.open('center');
			const u = url.parse(location.href, true)
			console.log("url parse", u.query.code)

			// 获取query参数
			const code = u.query.code || this.$route.query.code;
			console.log("微信自动登录 code", code);
			if (code) {
				this.weixinAuth(code)
				return
			}

			this.token = uni.getStorageSync('token')
			if (!this.token) {
				uni.navigateTo({
					url: "/pages/login/index"
				})
				return
			}


			this.resourcesLoaded();
			this.load()
			this.loadNum = 1


			//window.addEventListener('resize', this.handleResize);
		},

		methods: {

			handleResize() {
				const {
					innerWidth,
					innerHeight
				} = window;
				const aspectRatio = innerWidth / innerHeight;

				if (aspectRatio < 1) {
					// 竖屏显示
					document.body.classList.add('landscape');
					document.body.classList.remove('portrait');
				} else {
					// 横屏显示
					document.body.classList.add('landscape');
					document.body.classList.remove('portrait');
				}
			},
			toggle(type, msg) {

				if (this.onlineNum >= 6) {

					uni.showToast({
						icon: 'error',
						title: "人数已满！"
					})

					return
				}

				this.gotoGame = msg
				this.goto(this.gotoGame)
			},
			screenFull() {

				const element = document.documentElement;

				// 根据不同的浏览器获取全屏方法
				const requestFullScreen =
					element.requestFullscreen ||
					element.webkitRequestFullscreen ||
					element.mozRequestFullScreen ||
					element.msRequestFullscreen;

				// 请求全屏
				if (requestFullScreen) {
					requestFullScreen.call(element);
				}
				this.textShow = false

			},
			async weixinAuth(code) {
				console.log(code)
				const res = await this.$request({
					method: 'GET',
					url: 'weixin/auth',
					data: {
						code
					}
				})
				console.log(res)
				if (res.data.error) {
					uni.showToast({
						title: res.data.error
					})
					setTimeout(() => {
						uni.redirectTo({
							url: "/pages/login/index"
						})
					}, 500)
				}

				console.log(res.data)
				this.token = res.data.data.token
				uni.setStorageSync('token', res.data.data.token);
				uni.setStorageSync('id', res.data.data.user.id);
				this.load()
			},
			async weixinJsInit() {
				const res = await this.$request({
					method: 'GET',
					url: `weixin/get-js`,
					header: {
						'Content-Type': 'application/json;charset=UTF-8',
						'Authorization': 'Bearer ' + this.token
					},
					data: {
						url: location.protocol + "//" + location.host + location.pathname + location.search
					}
				})
				if (res.data.data) {
					console.log("微信支付初始化：", res.data.data)
					// wx.config({
					//   debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					//   res.data.data...,
					//   jsApiList: [] // 必填，需要使用的JS接口列表
					// });
				}

			},

			async weixinTestPay(cost) {
				const res = await this.$request({
					method: 'GET',
					url: `weixin/pre-pay`,
					header: {
						'Content-Type': 'application/json;charset=UTF-8',
						'Authorization': 'Bearer ' + this.token
					},
					data: {
						amount: cost,
						name: "充值"
					}
				})
				if (res.data.data) {
					console.log("微信支付：", res.data.data)
					const order = res.data.data
					console.log("getBrandWCPayRequest", order)
					WeixinJSBridge.invoke(
						'getBrandWCPayRequest', order, (res) => {
							console.log("getBrandWCPayRequest", res)
							if (res.err_msg == "get_brand_wcpay_request:ok") {
								// 使用以上方式判断前端返回,微信团队郑重提示：
								//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。


							}
						});
				}

			},

			async login() {
				const mess = {
					username: "admin",
					password: this.$md5("123456")
				}
				const res = await this.$request({
					method: 'POST',
					url: 'login',
					data: mess,
				})
				if (res.data.data) {
					this.token = res.data.data.token
					uni.setStorageSync('token', res.data.data.token);
					uni.setStorageSync('id', res.data.data.user.id);
					this.load()
				}
			},

			async load() {

				const res = await this.$request({
					method: 'GET',
					url: `user/${uni.getStorageSync('id')}`,
					header: {
						'Content-Type': 'application/json;charset=UTF-8',
						'Authorization': 'Bearer ' + this.token
					}
				})
				if (res.data.data) {
					this.user = res.data.data || ''

					this.url = this.user.avatar || 'https://gamebox.zgwit.cn/static/boy1.png'
					if (this.user.openid) {
						//this.weixinJsInit()

						//测试支付
						// this.weixinTestPay()
					}
				}

				const game = await this.$request({
					method: 'GET',
					url: `game/list`,
					header: {
						'Content-Type': 'application/json;charset=UTF-8',
						'Authorization': 'Bearer ' + this.token
					}
				})
				if (game.data.data) {
					this.game = game.data.data
				}
				clearInterval(this.timer)
				this.loadOnline()
				this.timer = setInterval(() => {
					this.loadOnline()
				}, 5000)



			},
			loadOnline() {
				uni.request({
					url: 'https://gamebox.zgwit.cn/count',
					method: 'GET',
					success: (item) => {
						this.onlineNum = item.data.data || 0
					},
				})
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
				if (!show) {
					this.load()
				}
			},
			handleSet(show) {
				this.mask = this.setShow = this.showAll[show];
			},
			handleRecharge(show) {
				this.mask = this.rechargeShow = this.showAll[show];

			},
			handlePay(show) {
				this.mask = this.payShow = this.showAll[show];

			},
			handleIcon(index, show) {
				this.mask = this.image[index].show = this.showAll[show];

			},
			handleOk() {
				let time = setInterval(() => {}, 1000)
				uni.showToast({
					title: '游戏加载中!',
				});
				// this.$refs.popup.close()
				// this.goto(this.gotoGame)

			},
			handleClose() {
				clearInterval(this.time)
				this.$refs.popup.close()
			},
			chooseSeries(mess) {

				uni.request({ //游戏厅
					url: `https://gamebox.zgwit.cn/api/box/search`,
					method: 'POST',
					header: {
						'Content-Type': 'application/json;charset=UTF-8',
						'Authorization': 'Bearer ' + this.token
					},
					data: {
						filter: {
							game_id: mess
						}
					},
					success: (item) => {
						this.box = item.data.data
					}
				});

				this.index = mess
				this.show = !this.show
			},
			loader() {
				this.loading = !this.loading
			},
			handleReportOk() {
				this.$refs.report.close()
			},
			screenFull() {

				const element = document.documentElement;

				// 根据不同的浏览器获取全屏方法
				const requestFullScreen =
					element.requestFullscreen ||
					element.webkitRequestFullscreen ||
					element.mozRequestFullScreen ||
					element.msRequestFullscreen;

				// 请求全屏
				if (requestFullScreen) {
					requestFullScreen.call(element);
				}
				this.textShow = false

			},
			goto(name) {
				this.screenFull()
				// uni.showToast({
				// 	title: '更新中!',
				// });
				uni.navigateTo({
					url: '/pages/play/play?id=' + name
				});
			}

		}
	}
</script>

<style lang="scss">
	.page {
		width: 100%;
		height: 100%;
		overflow: hidden;

		.content {
			font-family: font;
			// width: 100vh;
			// height: 100vw;
			display: flex;
			flex-direction: column;
			position: relative;

			background-image: url('../../static/index.jpg');
			background-repeat: no-repeat;
			background-size: cover;
			background-position: center center;

			//width: 100vh;
			//height: 100vw;
			//margin-left: 100vw;
			//transform: rotate(90deg);
			//transform-origin: left top;
			height: 100vh;
			width: 100vw;


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
				//background-color: transparent;
				//background-image: linear-gradient(to bottom, rgb(234, 56, 202), rgb(62, 0, 72));
				//border-bottom: 2px solid rgb(99, 14, 78);
				background-color: rgba(255, 255, 255, 0.8);
				box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.6);
				position: fixed;
				top: 0;
				display: flex;
				align-items: center;
				justify-content: space-between;
				box-sizing: border-box;
				padding: 0 10px;
				font-size: 13px;

				.money {
					//margin: 0 20px;

					//box-shadow: 0 0 0 transparent, 0 0 8px whitesmoke inset, 0 0 0 transparent, 0 0 10px rgb(143, 0, 125);
					color: white;
					border-radius: 20px;
					background-color: seagreen;
					box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3) inset;

					span {
						padding: 10px 15px;
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
						border-radius: 6px;
						//background: linear-gradient(to bottom, rgb(146, 27, 135), rgb(193, 43, 117));
						//background-color: rgba(255, 255, 255, 0.3);
						background-color: seagreen;
						//box-shadow: 2px 2px 2px rgba(0,0,0,0.3) inset;
						//padding: 5px;
						display: flex;
						justify-content: center;
						align-items: center;

						.photo {
							width: 30px;
							height: 30px;
							border-radius: 5px;
						}

						text {
							padding: 4px;
							margin: 0 5px;
							font-size: 18px;
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
				//background-image: linear-gradient(to bottom, rgb(39, 15, 32), rgb(150, 59, 71));

				flex: 1;
				width: 100%;
				height: 100%;

				.ad {
					margin: 10px 0 20px;

					width: 100%;

					image {
						width: 100%;
					}
				}

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
					overflow-y: auto;
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
						//width: 33%;
						width: 40vw;
						height: 40vw;
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
						justify-items: center;
						//width: 22%;
						//height: 50%;
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
									top: 4px;
									right: 4px;
									color: white;
									font-size: 14px;
									//text-shadow: 1px 1px rgb(39, 15, 32), 2px 2px rgb(39, 15, 32);
									//font-size: 20px;
								}

								image {
									width: 100%;
									height: 100%;

									//border: 3px solid rgb(255, 244, 38);
									//border: 3px solid rgb(0, 170, 0);
									box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.6);
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

				.report {
					box-sizing: border-box;
					padding: 10px;
					//改
					//width: 70vh;
					width: 90vw;
					border-radius: 5px;
					background: white;

					.report-title {
						font-weight: bold;
						font-size: 20px;
						padding: 5px;
						text-align: center
					}

					.report-content {
						background: rgba(0, 0, 0, 0.1);
						font-size: 16px;

						margin-bottom: 10px;
						//padding: 5px 5px 20px;
						//border-radius: 5px;
						padding: 10px;
					}

					.report-foot {
						display: flex;
						justify-content: center;
						color: white;

						.report-foot-btn {

							display: flex;
							justify-content: center;
							border-radius: 6px;
							box-sizing: border-box;
							padding: 5px 40px;
							background: seagreen;
							box-shadow: 1px 1px rgba(0, 0, 0, 0.6), 0 2px rgba(0, 0, 0, 0.6);

						}
					}
				}

				.modal {
					box-sizing: border-box;
					padding: 10px;
					//改
					//width: 50vh;
					width: 90vw;

					border-radius: 5px;
					background: white;

					.modal-title {
						font-weight: bold;
						font-size: 18px;
						padding: 5px;
						text-align: center
					}

					.modal-content {
						background: rgb(242, 242, 242);

						margin-bottom: 10px;
						padding: 5px 5px 20px
					}

					.modal-foot {
						display: flex;
						justify-content: space-around;
						color: white;
						align-items: center;

						.progress {
							width: 25px;
							height: 25px;
							animation: spin 2s linear infinite;
						}


						.modal-foot-btn {

							display: flex;
							justify-content: center;
							align-items: center;

							// text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5), -2px -2px 2px rgba(0, 0, 0, 0.5);
							// ;

							border-radius: 6px;
							box-sizing: border-box;
							padding: 5px 20px;
							background-image: linear-gradient(to bottom, rgb(40, 175, 255), rgb(29, 111, 255));
							box-shadow: 1px 1px rgba(0, 0, 0, 0.6), 0 2px rgba(0, 0, 0, 0.6);

						}

						.red {
							color: rgb(173, 52, 77)
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
				width: 100vh;
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

			.showToast {

				position: absolute;
				transform: rotate(0deg);
				//改
				width: 90vw;
				height: 100px;
				border-radius: 5px;
				left: 50%;
				top: 50%;
				// background-color: rgb(57, 6, 15);
				margin-left: 0vw;
				transform: translate(-50%, -49%);
			}

			.chat {

				position: absolute;
				transform: rotate(0deg);
				//改
				width: 90vw;
				height: 90vh;

				left: 50%;
				top: 50%;
				background-color: rgb(57, 6, 15);
				margin-left: 0vw;
				transform: translate(-50%, -49%);
			}

			.model {

				position: absolute;
				//transform: rotate(0deg);
				//改 
				//width: 60vh;
				//height: 90vw;
				width: 90vw;
				height: 80vh;
				//left: 50%;
				//top: 50%;
				background-color: rgb(57, 6, 15);
				//margin-left: 0vw;
				//transform: translate(-50%, -49%);
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

	}
</style>

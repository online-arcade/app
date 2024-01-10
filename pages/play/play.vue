<template>
	<!-- :class="{container: !isLandScape, containera: isLandScape}" -->
	<view :class="{ container: true, row: !isLandScape, column: isLandScape }">
		<video id="video" :src="v" :autoplay="true" :controls="false" :play-strategy="2" :muted="true" object-fit="fill"
			poster="../../static/bk.jpg" :show-center-play-btn="false" x-webkit-airplay="true" webkit-playsinline="true"
			playsinline="true" x5-playsinline="true" x5-video-player-type="h5-page" @play="onPlay"></video>
		<!-- 	<canvas canvas-id="canvas" :hidpi='false'></canvas> -->


		<image v-if="!ready" class="poster" src="../../static/bk.jpg" mode="scaleToFill"></image>

		<view class="toolbar" v-if="ready">
			<view class="menus" :style="{ width: toolbar ? '' : '0' }">
				<view class="item" @click="exit('index/index')">
					<image src="../../static/icon/money.svg"></image>
					<view class="font">退币</view>
				</view>
				<view class="item" @click="dialogOpen()">
					<image src="../../static/icon/bi.svg"></image>
					<view class="font">投币</view>
				</view>
				<view class="item" @click="sound()">
					<image src="../../static/icon/sound.svg"></image>
					<view class="font">音量</view>
				</view>
				<view class="item" @click="alertOpen()">
					<image src="../../static/icon/quit.svg"></image>
					<view>退出</view>
				</view>
			</view>
			<uni-icons color="white" :type="toolbar ? 'arrow-left' : 'arrow-right'" size="30" @click="toggle">
			</uni-icons>
		</view>


		<view class="controls" v-if=" ready &&  seated">

			<view class="direction">
				<view class="btn up" @touchstart="keydown('up')" @touchend="keyup('up')"></view>
				<view class="btn down" @touchstart="keydown('down')" @touchend="keyup('down')"></view>
				<view class="btn left" @touchstart="keydown('left')" @touchend="keyup('left')"></view>
				<view class="btn right" @touchstart="keydown('right')" @touchend="keyup('right')"></view>
			</view>

			<view class="toolbar">
				<view class="menus" :style="{ width: toolbar ? '' : '0' }">
					<!-- 					<view class="item">
						<image src="../../static/icon/wallet.svg"></image>
						<view class="font">兑换</view>
					</view> -->
					<!-- <view class="item">
						<image src="../../static/icon/lock.svg"></image>
						<view>锁机</view>
					</view> -->
					<!-- 					<view class="item">
						<image src="../../static/icon/setting.svg"></image>
						<view class="font" @click="setting()">设置</view>
					</view>
					<view class="item">
						<image src="../../static/icon/manual.svg"></image>
						<view class="font">说明</view>
					</view> -->
					<view class="item" @click="exit('index/index')">
						<image src="../../static/icon/money.svg"></image>
						<view class="font">退币</view>
					</view>
					<!-- <view class="item">
						<image src="../../static/icon/game.svg"></image>
						<view>摇杆</view>
					</view> -->
					<view class="item" @click="dialogOpen()">
						<image src="../../static/icon/bi.svg"></image>
						<view class="font">投币</view>
					</view>
					<view class="item" @click="sound()">
						<image src="../../static/icon/sound.svg"></image>
						<view class="font">音量</view>
					</view>
					<view class="item" @click="alertOpen()">
						<image src="../../static/icon/quit.svg"></image>
						<view>退出</view>
					</view>
				</view>
				<uni-icons color="white" :type="toolbar ? 'arrow-left' : 'arrow-right'" size="30" @click="toggle">
				</uni-icons>
				<!-- <view>收起</view> -->
			</view>

			<view class="bet" @click="click('bet')">加</view>
			<!-- <view class="open-ticket" @click="tui()">退币</view> -->
			<!-- <view class="open-ticket" @click="deposit()">开票</view>
			<view class="close-ticket" @click="withdraw()">消票</view> -->
			<view class="fire" ref="fire" @touchstart="fireStart" @touchend="fireEnd"></view>

			<!-- <view class="coin" @click="coin">币</view>
			<view class="quit" @click="quit">退</view>

			<view class="btn up" @touchstart="emit('W')" @touchend="emit('w')">上</view>
			<view class="btn down" @touchstart="emit('S')" @touchend="emit('s')">下</view>
			<view class="btn left" @touchstart="emit('A')" @touchend="emit('a')">左</view>
			<view class="btn right" @touchstart="emit('D')" @touchend="emit('d')">右</view>

			<view class="btn bet" @touchstart="emit('J')" @touchend="emit('j')">押</view>
			<view class="btn shot" @touchstart="emit('K')" @touchend="emit('k')">射</view>
			<view class="btn coin" @touchstart="emit('C')" @touchend="emit('c')">币</view>
			<view class="btn quit" @touchstart="emit('L')" @touchend="emit('l')">退</view> -->
		</view>

		<view class="seats" v-if=" ready && !seated">
			<view class="seat" @click="seat(0)">
				<view>{{posStatus[0]?"已坐下": "1P"}}</view>
				<image src="../../static/sit.png" mode="aspectFit"></image>
			</view>
			<view class="seat" @click="seat(1)">
				<view>{{posStatus[1]?"已坐下": "2P"}}</view>
				<image src="../../static/sit.png" mode="aspectFit"></image>
			</view>
			<view class="seat" @click="seat(2)">
				<view>{{posStatus[2]?"已坐下": "3P"}}</view>
				<image src="../../static/sit.png" mode="aspectFit"></image>
			</view>
			<view class="seat" @click="seat(3)">
				<view>{{posStatus[3]?"已坐下": "4P"}}</view>
				<image src="../../static/sit.png" mode="aspectFit"></image>
			</view>
		</view>

		<!-- class="container" -->
		<uni-popup ref="coinDialog" type="dialog" style="z-index: 99999;">
			<uni-popup-dialog type="info" cancelText="关闭" confirmText="投币" title="投币信息" @confirm="insertCoins(0)"
				@close="dialogClose">
				<view class="coinDialog">
					<view>
						<span style="width: 300px;">当前余额 ： </span>
						<span>{{ user.balance}}</span>
					</view>
					<view class="custom">
						<view>投币数量 ：</view>
						<span>
							<uni-number-box v-model="coinNum" :max="99999" />
						</span>
					</view>
					<view class="coinSend">
						<view class="text">选中投币 ：</view>
						<view class="btn">
							<view class="confirm" @click="insertCoins(50)">50</view>
							<view class="confirm green" @click="insertCoins(100)">100</view>
							<view class="confirm yellow" @click="insertCoins(200)">200</view>
						</view>
					</view>
				</view>
			</uni-popup-dialog>
		</uni-popup>

		<uni-popup ref="rechargeDialog" type="dialog">
			<uni-popup-dialog type="warn" cancelText="取消" confirmText="充值" title="充值信息" @confirm="rechargeConfirm"
				@close="rechargeClose">
				<view style="display: flex;flex-direction: column;">
					<view>
						<span style="width: 300px;">当前余额：</span>
						<span>{{ pay }}</span>
					</view>
					<view style="width: 200px;display: flex;justify-content: space-between;">
						<span>投币数量:</span>
						<span>
							<uni-number-box max="99999" />
						</span>
					</view>
				</view>
			</uni-popup-dialog>
		</uni-popup>



		<uni-popup ref="alertDialog" type="dialog" style="z-index: 99999;">
			<uni-popup-dialog type="warn" cancelText="取消" content="请确保已经退币!" confirmText="确认" title="提示信息"
				@confirm="alertConfirm" @close="alertClose">
			</uni-popup-dialog>
		</uni-popup>




		<uni-popup ref="popup" :is-mask-click="false">
			<view class="modal">
				<view class="modal-title">{{modal.title}}</view>
				<view class="modal-content">
					<view v-for="(item,index) of modal.content">
						({{index+1}}) {{item}}
					</view>

				</view>
				<view class="modal-foot">
					</text>
					<uni-load-more iconType="snow" status="loading"></uni-load-more>
				</view>
			</view>


		</uni-popup>


		<uni-popup ref="report">
			<alert :text='text' :icon='toast'></alert>
		</uni-popup>
	</view>
</template>

<script>
	// let I=navigator.userAgent
	// isAndroid=I.indexOf("Android")>-1||I.indexOf("Linux")>-1
	// isIos=!!I.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)

	export default {
		data() {
			return {
				closeTimeout: null,
				coinStatus: false,
				tempPos: null,
				user: {},
				soundStatus: true,
				toast: false,
				text: '',
				modal: {
					title: "游戏须知",
					content: ['机台1币=200分，开始游戏即自动投10币=2000分;',
						'系统总分上限100万分，超过上限后的投币与打中boss的加分不计数，游玩时请注意台面分数，避免无效上分;',
						'有任何问题，请加客服微信咨询!'
					]
				},
				token: '',
				showCanvas: true,
				tabHide: false,
				select: false,
				pay: 99999, //当前余额
				coinNum: 1,
				isLandScape: false, //横竖屏切换
				toolbar: true,
				name: 'test',
				pos: 1,

				open: true,
				ready: false,
				seated: false,

				//v: 'https://www.runoob.com/try/demo_source/movie.ogg',
				v: '',
				fireX: 0,
				fireY: 0,
				fireOriginX: 0,
				fileOriginY: 0,

				fireTime: 0,

				sock: undefined,
				ws: undefined,
				pc: undefined,
				earlyCandidates: undefined,
				iceServers: undefined, //{"this.iceServers":[{"urls":["stun:stun.l.google.com:19302"]}]};
				posStatus: [0, 0, 0, 0]
			};
		},
		onHide() {},
		onShow() {
			this.loadUser()
			this.closeTimeout = setTimeout(() => {
				if (!this.seated) {
					uni.navigateBack();
				}
			}, 60000)
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh();
		},

		onReady(res) {

			// if (/android/i.test(navigator.userAgent)) {
			// 	this.showCanvas = false
			// } else {
			// 	this.showCanvas = true
			// }

			this.videoElement = uni.createVideoContext('video');
			// this.canvas = uni.createCanvasContext("canvas", this);
			// this.canvas.drawImage("/static/fkmgc.png", 0, 0, 843, 374, 0, 0, this.canvas.offsetWidth, this.canvas
			// 	.offsetHeight)
			// this.canvas.draw()
			//document.getElementById("video").muted = true;
		},
		onResize() {
			this.screenChange();
		},

		onLoad(options) {
			this.reload(options)
		},
		onUnload() {
			clearTimeout(this.closeTimeout)
			console.log('onUnload');

			// #ifdef APP-PLUS
			plus.screen.lockOrientation('portrait-primary');
			// #endif

			this.open = false;

			this.sock.close();
			this.ws.close();
			//document.body.removeEventListener("touchmove", preventDefault);

			this.pc.close();

			//this.peer.
			//this.peer.destroy();
		},
		methods: {
			reload(options) {

				console.log(options)
				this.id = options.id
				this.screenChange();
				// #ifdef APP-PLUS
				plus.screen.lockOrientation('default');
				// #endif


				this.getPos()

				//用户加载
				this.loadUser()

				//控制连接
				//this.sock = new WebSocket('ws://gamebox.zgwit.cn:9001/player');

				this.name = options.name || 'demo';
				this.pos = options.pos || 1;

				//视频连接（后续统一）
				//this.ws = new WebSocket('ws://gamebox.zgwit.cn:8989');
				this.ws = new WebSocket('wss://gamebox.zgwit.cn/api/box/' + this.id + '/bridge?token=' + this.token);
				this.ws.binaryType = 'arraybuffer';

				function ab2str(buf) {
					return String.fromCharCode.apply(null, new Uint8Array(buf));
				}

				this.ws.onopen = () => {
					console.log('open');
					//this.ws.send("{}");
					if (this.iceServers)
						this.connect();
					else
						this.ws.send(JSON.stringify({
							type: 'getIceServers'
						}));
					//connect();
				};

				this.ws.onmessage = e => {
					//console.log('onmessage', e.data);
					let str = e.data;
					if (e.data instanceof Blob) {
						str = ab2str(e.data.arrayBuffer());
					} else if (e.data instanceof ArrayBuffer) {
						str = ab2str(e.data);
					}
					console.log('onmessage', str);

					let msg = JSON.parse(str);
					switch (msg.type) {
						case 'getIceServers':
							this.iceServers = msg.data;
							this.connect();
							break;
						case 'call':
							var desc = new RTCSessionDescription(msg.data);
							this.pc.setRemoteDescription(desc).then(() => {
								while (this.earlyCandidates.length) {
									var candidate = this.earlyCandidates.shift();
									console.log('earlyCandidates', candidate);
									//this.addIceCandidate(this.pc.peerid, candidate);
									this.ws.send(
										JSON.stringify({
											type: 'addIceCandidate',
											id: this.pc.peerid,
											data: candidate
										})
									);
								}

								setTimeout(() => {
									this.ws.send(
										JSON.stringify({
											type: 'getIceCandidate',
											id: this.pc.peerid
										})
									);
								}, 200);
								// setTimeout(()=>{
								//     this.ws.send(JSON.stringify({type: 'getIceCandidate', id: this.pc.peerid}))
								// }, 5000)
								//this.ws.send(JSON.stringify({type: 'getIceCandidate', id: this.pc.peerid}))
							});
							break;
						case 'getIceCandidate':
							for (var i = 0; i < msg.data.length; i++) {
								var candidate = new RTCIceCandidate(msg.data[i]);
								this.pc.addIceCandidate(candidate);
							}
							this.pc.addIceCandidate();

							//可以关了
							//this.ws.close()
							break;
					}
				};
				this.ws.onclose = e => {
					console.log('close');

					//断网 1s 重连
					if (this.open)
						setTimeout(() => {
							this.reload(options);
						}, 1000);
				};
				this.ws.onerror = function(e) {
					console.log(e);
				};

				//this.peer.connect("test", {serialization: 'none'})


			},
			tui() {

				this.sock.send(JSON.stringify({
					type: 'keydown',
					seat: this.pos,
					key: 'refund'
				}));
				setTimeout(() => {
					this.sock.send(JSON.stringify({
						type: 'keyup',
						seat: this.pos,
						key: 'refund'
					}));

				}, 2000)

			},
			deposit() {

				this.sock.send(JSON.stringify({
					type: 'click',
					seat: this.pos,
					key: 'deposit'
				}));


			},
			withdraw() {

				this.sock.send(JSON.stringify({
					type: 'click',
					seat: this.pos,
					key: 'withdraw'
				}));

			},
			async loadUser() {
				this.token = uni.getStorageSync('token')
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

			},

			showPopup() {
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				//this.$refs.popup.open('center');
				this.$refs.popup.open('center');
				this.time = setInterval(() => {
					this.$refs.popup.close()

					clearInterval(this.time)
				}, 3000)
			},

			async backFund() {
				await this.sock.send(JSON.stringify({
					type: 'keydown',
					seat: this.pos,
					key: 'refund'
				}));

				setTimeout(() => {
					this.sock.send(JSON.stringify({
						type: 'keyup',
						seat: this.pos,
						key: 'refund'
					}));

				}, 2000)
			},

			exit(name) {
				if (!this.seated) {

					this.text = "未入座！！"
					this.toast = true
					this.$refs.report.open('center');
					this.time = setInterval(() => {
						this.$refs.report.close()
						clearInterval(this.time)
					}, 1500)
					return
				}
				this.backFund()
				this.coinStatus = true


				this.text = "请确保退完之后再退出！"
				this.toast = false
				this.$refs.report.open('center');
				this.time = setInterval(() => {
					this.$refs.report.close()
					clearInterval(this.time)
				}, 1500)
				// this.seated = false;
				// uni.navigateTo({
				// 	url: '/pages/' + name
				// });
			},
			setting() {
				const v = document.getElementsByTagName('video')[0];
				v.muted = !v.muted
				const mess = v.muted ? '音量关' : '音量开'
				uni.showToast({
					title: mess,
				});

			},
			rechargeConfirm() {
				console.log(this.pay + '  ' + this.coinNum);
				this.$refs.rechargeDialog.close();
			},
			rechargeClose() {
				this.$refs.rechargeDialog.close();
			},
			alertOpen() {
				this.$refs.alertDialog.open()
			},
			alertConfirm() {
				this.quit()
				this.$refs.alertDialog.close();
			},
			alertClose() {
				console.log(1)
				this.$refs.alertDialog.close();
			},
			dialogClose() {
				this.$refs.coinDialog.close()
			},
			dialogOpen() {
				if (!this.seated) {

					this.text = "未入座！！"
					this.toast = true
					this.$refs.report.open('center');
					this.time = setInterval(() => {
						this.$refs.report.close()
						clearInterval(this.time)
					}, 1500)
					return
				}


				this.select = !this.select;
				this.$refs.coinDialog.open()
			},
			insertCoins(num) {

				let temmNum
				if (!num) {
					temmNum = this.coinNum
				} else {
					temmNum = num
				}
				if (this.user.balance >= temmNum) {

					this.submit(temmNum)


				} else {
					this.text = "投币失败！"
					this.toast = true
					this.$refs.report.open('center');
					this.time = setInterval(() => {
						this.$refs.report.close()
						clearInterval(this.time)
					}, 1500)
				}
				this.$refs.coinDialog.close();
			},
			async submit(e) {
				const cost = await this.$request({
					method: 'POST',
					url: `recharge/create`,
					header: {
						'Content-Type': 'application/json;charset=UTF-8',
						'Authorization': 'Bearer ' + this.token
					},
					data: {
						user_id: this.user.id,
						amount: e
					}
				})

				this.user.balance -= e
				const user = await this.$request({
					method: 'POST',
					url: `user/${uni.getStorageSync('id')}`,
					header: {
						'Content-Type': 'application/json;charset=UTF-8',
						'Authorization': 'Bearer ' + this.token
					},
					data: this.user
				})
				if (user.data.data) {
					if ((!this.seated) && !(this.tempPos >= 0 && this.tempPos <= 3)) {
						this.text = "请选择位置！"
						this.toast = true
						this.$refs.report.open('center');
						this.time = setInterval(() => {
							this.$refs.report.close()
							clearInterval(this.time)
						}, 1500)
						return
					}
					if (!this.seated)
						this.connectSeat()

					setTimeout(() => {
						this.sock.send(JSON.stringify({
							type: 'coin',
							seat: this.pos,
							coin: e
						}));
						this.coinStatus = false
					}, 200)

					this.text = "投币成功！"
					this.toast = false
					this.$refs.report.open('center');
					this.time = setInterval(() => {
						this.$refs.report.close()
						clearInterval(this.time)
					}, 1500)





				}


			},

			sound() {
				this.soundStatus = !this.soundStatus
				this.text = "音量" + (this.soundStatus ? '开' : '关')
				this.toast = false
				this.$refs.report.open('center');
				this.time = setInterval(() => {
					this.$refs.report.close()
					clearInterval(this.time)
				}, 1500)

			},
			screenChange() {
				let width = document.documentElement.clientWidth,
					height = document.documentElement.clientHeight;
				if (width > height) this.isLandScape = true;
				else this.isLandScape = false;
			},

			onPlay($event) {

				var time = setTimeout(() => {
					if (document.readyState === 'complete') {
						this.ready = true
						//this.showPopup()
					} else {
						this.resourcesLoaded()
					}
				}, 1000)

				//	this.ready = true

				console.log('onPlay', $event)
				const v = document.getElementsByTagName('video')[0]
				// const c = document.getElementsByTagName('canvas')[0]
				// const ctx = c.getContext('2d');
				const systemInfo = uni.getSystemInfoSync();

				//setTimeout(() => this._drawFrame(ctx, v, c), 0)

			},
			_drawFrame(ctx, v, c) {
				//console.log("_drawFrame", v.videoWidth, v.videoHeight, c.offsetWidth, c.offsetHeight)
				if (v.paused || v.ended) {
					return;
				}
				//ctx.drawImage(video, 0, 0, w, h, 0, 0, video.videoWidth, video.videoHeight);
				//ctx.drawImage(video, 0, 0, w, h);
				ctx.drawImage(v, 0, 0, v.videoWidth, v.videoHeight, 0, 0, c.offsetWidth, c.offsetHeight);

				setTimeout(() => this._drawFrame(ctx, v, c), 0)
			},

			connect() {
				this.earlyCandidates = [];
				this.pc = new RTCPeerConnection(this.iceServers);
				this.pc.peerid = Math.random();

				this.pc.onicecandidate = evt => {
					console.log('onicecandidate', evt);
					if (evt.candidate) {
						if (this.pc.currentRemoteDescription) {
							//this.addIceCandidate(this.pc.peerid, evt.candidate);
							this.ws.send(
								JSON.stringify({
									type: 'addIceCandidate',
									id: this.pc.peerid,
									data: evt.candidate
								})
							);
						} else {
							this.earlyCandidates.push(evt.candidate);
						}
					}
				};

				this.pc.onaddstream = evt => {
					console.log('onaddstream', evt);
					//this.videoElement.srcObject = evt.stream;
					//this.videoElement.play();
					//TODO 此种方式可能会有问题
					const v = document.getElementsByTagName('video')[0]; //document.getElementById('video');
					v.srcObject = evt.stream;

					if (window.WeixinJSBridge) {
						window.WeixinJSBridge.invoke('getNetworkType', {}, (res) => {
							v.play();
						})
					}
					setTimeout(() => v.play, 500)
					// try {
					// 	v.play();
					// 	//v.muted = false; //值为false时首屏不显示,setting设置muted
					// } catch (e) {
					// 	//TODO handle the exception
					// }
					//this.ready = true;
				};
				this.pc.oniceconnectionstatechange = evt => {
					console.log('oniceconnectionstatechange', this.pc.iceConnectionState);

					if (this.pc.iceConnectionState === 'new') {
						this.ws.send(
							JSON.stringify({
								type: 'getIceCandidate',
								id: this.pc.peerid
							})
						);
					} else if (this.pc.iceConnectionState === 'disconnected') {
						if (this.open) this.connect();
					} else if (this.pc.iceConnectionState === 'completed') {
						this.ws.close()
					}
					//connected
				};

				this.pc.ondatachannel = function(evt) {
					console.log('ondatachannel', evt);

					evt.channel.onopen = function() {
						console.log('datachannel onopen');
						//this.send("remote channel openned");
					};
					evt.channel.onmessage = function(event) {
						console.log('datachannel onmessage', event);
					};
				};

				this.pc.onicegatheringstatechange = evt => {
					console.log('onicegatheringstatechange', this.pc.iceGatheringState);
					//console.log(this.pc.getReceivers());
					if (this.pc.iceGatheringState == "complete") {
						//this.ws.close()
					}
				};

				//打开数据口
				// var dc = this.pc.createDataChannel("ClientDataChannel");
				// dc.onopen = function() {
				//     console.log("local datachannel open");
				//     this.send("local channel openned");
				// }
				// dc.onmessage = function(evt) {
				//     console.log("local datachannel recv:"+JSON.stringify(evt.data));
				// }

				this.pc
					.createOffer({
						offerToReceiveAudio: true,
						offerToReceiveVideo: true
					})
					.then(desc => {
						console.log('createOffer', desc);

						this.pc.setLocalDescription(desc).then(() => {
							setTimeout(() => {
								this.ws.send(
									JSON.stringify({
										type: 'call',
										id: this.pc.peerid,
										data: desc
									})
								);
							}, 200);
							//this.ws.send(JSON.stringify({type: 'call', id: this.pc.peerid, data: desc,}));
						}, console.error);
					}, console.error);
			},
			resizeScreen: function() {
				const _this = this;
				// 利用 CSS3 旋转 对根容器逆时针旋转 90 度
				const detectOrient = function() {
					let width = document.documentElement.clientWidth,
						height = document.documentElement.clientHeight,
						$wrapper = _this.$refs.view, // 这里是页面最外层元素
						style = '';
					if (width >= height) {
						// 横屏
						style += 'width:' + width + 'px;'; // 注意旋转后的宽高切换
						style += 'height:' + height + 'px;';
						style += '-webkit-transform: rotate(0); transform: rotate(0);';
						style += '-webkit-transform-origin: 0 0;';
						style += 'transform-origin: 0 0;';
					} else {
						// 竖屏
						style += 'width:' + height + 'px;';
						style += 'height:' + width + 'px;';
						style += '-webkit-transform: rotate(90deg); transform: rotate(90deg);';
						// 注意旋转中点的处理
						style += '-webkit-transform-origin: ' + width / 2 + 'px ' + width / 2 + 'px;';
						style += 'transform-origin: ' + width / 2 + 'px ' + width / 2 + 'px;';
					}
					// $wrapper.style.cssText = style;
					document.getElementById('screen-view').style.cssText = style;
				};
				window.onresize = detectOrient;
				detectOrient();
			},

			toggle(e) {
				this.toolbar = !this.toolbar;
			},
			click(key) {
				//this.channel.send(this.pos + key);
				//this.sock.send({ data: this.pos + key });
				//this.sock.send(this.pos + key);
				this.sock.send(JSON.stringify({
					type: 'click',
					seat: this.pos,
					key: key
				}));
			},
			keydown(key) {
				this.sock.send(JSON.stringify({
					type: 'keydown',
					seat: this.pos,
					key: key
				}));
			},
			keyup(key) {
				this.sock.send(JSON.stringify({
					type: 'keyup',
					seat: this.pos,
					key: key
				}));
			},
			fireStart() {
				this.fireTime = Date.now();
				this.keydown('fire');
			},
			fireEnd() {
				if (Date.now() - this.fireTime < 3000)
					this.keyup('fire');
			},
			coin() {
				console.log('coin');
				this.sock.send(this.pos + 'C');
				setTimeout(() => {
					this.sock.send(this.pos + 'c');
				}, 30);
				setInterval(() => this.sock.send(this.pos + 'C'), 100);
			},
			async getPos() {
				const res = await this.$request({
					method: 'GET',
					url: `box/${this.id}/status`,
					header: {
						'Content-Type': 'application/json;charset=UTF-8',
						'Authorization': 'Bearer ' + uni.getStorageSync('token')
					}
				})
				if (res.data.data) {
					res.data.data.filter((item, index) => {
						this.posStatus[index] = item.user_id
					})
				}

			},



			async quit() {

				if (!this.seated) {
					uni.navigateBack();
					this.keyup('fire');
					return
				}

				if (!this.coinStatus) {

					this.text = "未退币！"
					this.toast = true
					this.$refs.report.open('center');
					this.time = setInterval(() => {
						this.$refs.report.close()
						clearInterval(this.time)
					}, 1500)
					return
				}

				// this.sock.send(JSON.stringify({
				// 	type: 'stand',
				// 	seat: this.pos
				// }));

				const res = await this.$request({
					method: 'GET',
					url: `box/${this.id}/stand/${this.pos}`,
					header: {
						'Content-Type': 'application/json;charset=UTF-8',
						'Authorization': 'Bearer ' + this.token
					}
				})

				if (res.data.code === 200) {
					console.log("ok")
				}

				//this.sock.send(this.pos + 'L');
				//setTimeout(() => this.sock.send(this.pos + 'l'), 50);
				this.keyup('fire');
				uni.navigateBack();
			},
			seat(pos) {
				this.tempPos = pos
				if (this.posStatus[pos] === this.user.id) {
					this.connectSeat()
					return
				}
				if (this.posStatus[pos]) {
					this.text = "已坐下！"
					this.toast = true
					this.$refs.report.open('center');
					this.time = setInterval(() => {
						this.$refs.report.close()
						clearInterval(this.time)
					}, 1500)
					return
				}

				this.select = !this.select;
				this.$refs.coinDialog.open()

				// if (Number(this.user.balance) >= 1) {

				// } else {

				// 	this.text = "请充值！"
				// 	this.toast = true
				// 	this.$refs.report.open('center');
				// 	this.time = setInterval(() => {
				// 		this.$refs.report.close()
				// 		clearInterval(this.time)
				// 	}, 1500)
				// }

			},
			connectSeat() {


				this.pos = this.tempPos;
				this.seated = true;

				this.sock = new WebSocket('wss://gamebox.zgwit.cn/api/box/' + this.id + '/seat/' + this.pos + "?token=" +
					this.token);
				this.sock.onclose = msg => {
					this.seated = false
				};
				this.sock.onmessage = msg => {
					console.log('message', msg);
				};

				this.sock.onerror = err => {
					console.error('socket', err);
				};

				this.sock.onopen = () => {
					this.sock.send(JSON.stringify({
						type: 'sit',
						seat: this.pos
					}));
				}

				setTimeout(() => {
					this.toolbar = false;
				}, 2000);


			},
			firetouchstart(e) {
				console.log('start', e);
				this.fireDragging = true;
				this.fireX = e.clientX;
				this.fireOriginX = e.clientX;
				this.fireY = e.clientY;
				this.fileOriginY = e.clientY;
				// 计算 x y 轴点击位置
				//var query = uni.createSelectorQuery().in(this)
				//query.select('#drag').boundingClientRect()
			},
			firetouchmove(e) {
				if (this.fireDragging) {
					let xx = e.clientX - this.fireX;
					let yy = e.clientY - this.fireY;
					this.fireX = e.clientX;
					this.fireY = e.clientY;
					//e.currentTarget.offsetX += yy;
					//e.currentTarget.offsetY += xx;
					this.$refs.fire.style.right -= yy;
					this.$refs.fire.style.bottom -= xx;

					//this.$refs.fire.style
					console.log('move', xx, yy);
				}
				//console.log("move", e)
				//let temY = e.mp.touches[0].clientY - this.topY
				//let temX = e.mp.touches[0].clientX - this.topX
			},
			firetouchend(e) {
				console.log('end', e);
				this.fireDragging = false;
			}
		}
	};
</script>

<style lang="scss">
	//@use "sass:math";

	@keyframes noop {
		0% {
			transform: translateY(0);
		}

		100% {
			transform: translateY(0);
		}
	}

	@keyframes bounce {
		0% {
			transform: translateY(0);
		}

		25% {
			transform: translateY(20%);
		}

		50% {
			transform: translateY(0);
		}

		75% {
			transform: translateY(20%);
		}

		100% {
			transform: translateY(0);
		}
	}

	.row {
		width: 100vh;
		height: 100vw;
		margin-left: 100vw;
		transform: rotate(90deg);
		transform-origin: left top;
	}

	.column {
		width: 100vw;
		height: 100vh;
		transform-origin: left top;
	}

	.container {
		//x: 40;
		//y: 0;
		// width: 100vh;
		// height: 100vw;
		// margin-left: 100vw;
		// transform: rotate(90deg);
		// transform-origin: left top;

		video {
			//z-index: 1;
			position: absolute;
			x: 0;
			y: 0;
			width: 100%;
			height: 100%;
			// max-width:100%;
			// max-height:100%;
			// min-width:100%;
			// min-height:100%;
			object-fit: fill;
			object-position: bottom;

			//display: none;
			// visibility: hidden;
		}

		canvas {
			//z-index: 1000;
			position: absolute;
			x: 0;
			y: 0;
			width: 100%;
			height: 100%;
		}

		.poster {
			//z-index: 1000;
			position: absolute;
			x: 0;
			y: 0;
			width: 100%;
			height: 100%;
		}

		.hover {
			//z-index: 2;
			position: absolute;
			x: 0;
			y: 0;
			width: 100%;
			height: 100%;
			background-color: black;
		}

		.seats {
			//z-index: 10000;
			position: absolute;
			x: 0;
			bottom: 100px;
			width: 100%;

			display: flex;
			flex-direction: row;
			justify-content: space-around;

			color: white;
			font-weight: bolder;
			font-size: 25px;

			.seat {
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;

				animation: bounce 3s infinite;
				width: 20%;

				image {
					width: 50px;
					height: 100px;
					//height: 50%;
				}
			}
		}

		.coinDialog {
			.custom {
				margin: 7px 0 5px 0;
				width: 200px;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}

			.coinSend {
				.text {
					margin-bottom: 5px
				}

				.btn {
					display: flex;
					justify-content: space-between;


					.confirm {
						background-image: linear-gradient(to bottom, rgb(40, 175, 255), rgb(30, 133, 255));
						box-sizing: border-box;
						padding: 3px 5px;
						width: 50px;
						text-align: center;
						border-radius: 8px;
						color: white; // text-shadow: 1px 1px rgba(0, 0, 0, 0.3), 2px 2px rgba(0, 0, 0, 0.3);
						//border: 1px solid black; //rgb(70, 13, 19)
						// box-shadow: 1px 1px rgba(0, 0, 0, 0.3), 2px 2px rgba(0, 0, 0, 0.3);

					}

					.green {
						background: rgba(0, 139, 137, 1)
					}

					.yellow {
						background: rgba(247, 181, 0, 1)
					}
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

		$direction_size: 160px;
		$direction_btn_size: 60px;
		$direction_btn_offset: ($direction_size - $direction_btn_size) * 0.5;

		.toolbar {
			// z-index: 9999999999;
			//position: relative;
			position: absolute;
			//display: block;
			left: 0;
			top: 10px;
			height: 70px;
			border-radius: 0 10px 10px 0;
			display: inline-flex;
			//justify-content: space-around;
			align-items: center;
			overflow: hidden;

			.menus {
				overflow: hidden;
				height: 100%;
				width: 200px;
				transition: all 0.8s ease;


				//display: flex;
				//justify-content: space-around;
				//align-items: center;
				.item {
					height: 100%;
					//border-right: 1px solid #999999;
					display: inline-flex;
					flex-direction: column;
					//display: inline-block;
					justify-content: center;
					align-items: center;
					width: 50px;
					color: rgb(224, 196, 160);
					text-shadow: 0 0 1px black;
					font-family: font;
					font-weight: bold;
					font-size: 20px;



					image {
						width: 30px;
						height: 30px;
					}
				}
			}

			background-color: rgba(0, 0, 0, 0.5);
			//background-color: white;
			color: white;
		}

		.controls {
			z-index: 10000;

			position: absolute;
			//background-image: url('../../static/game2.jpeg');
			//x: 0;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			width: 100%;
			height: 100%;

			.toolbar {
				z-index: 2;
				//position: relative;
				position: absolute;
				//display: block;
				left: 0;
				top: 10px;
				height: 70px;
				border-radius: 0 10px 10px 0;
				display: inline-flex;
				//justify-content: space-around;
				align-items: center;
				overflow: hidden;

				.menus {
					overflow: hidden;
					height: 100%;
					width: 200px;
					transition: all 0.8s ease;


					//display: flex;
					//justify-content: space-around;
					//align-items: center;
					.item {
						height: 100%;
						//border-right: 1px solid #999999;
						display: inline-flex;
						flex-direction: column;
						//display: inline-block;
						justify-content: center;
						align-items: center;
						width: 50px;
						color: rgb(224, 196, 160);
						text-shadow: 0 0 1px black;
						font-family: font;
						font-weight: bold;
						font-size: 20px;



						image {
							width: 30px;
							height: 30px;
						}
					}
				}

				background-color: rgba(0, 0, 0, 0.5);
				//background-color: white;
				color: white;
			}

			.direction {
				position: absolute;
				bottom: 120px;
				left: 20px;

				width: $direction_size;
				height: $direction_size;
				//background: url(/static/direction.png) no-repeat;
				//background-size: contain;
				background-color: #00000099;
				border-radius: 50%;
				border: 6px solid #ffffff50;

				//为了不被video覆盖
				animation: noop 3s infinite;
			}

			.open-ticket {
				position: absolute;
				top: 25px;
				background: white;
				right: 100px;
				border-radius: 3px;
				padding: 3px;
			}

			.close-ticket {
				position: absolute;
				top: 25px;
				background: white;
				right: 150px;
				border-radius: 3px;
				padding: 3px;
			}

			.bet {
				position: absolute;
				top: 25px;
				right: 50px;

				width: 40px;
				height: 40px;
				border-radius: 50%;

				font-size: 20px;
				font-weight: bold;
				//background-color: white;
				// background-color: rgba(0, 0, 0, 0.5);
				background-color: rgb(28, 236, 122);
				border: 5rpx solid rgba(256, 256, 256, 0.2);
				color: white;

				display: flex;
				justify-content: center;
				align-items: center;
			}

			.coin {
				position: absolute;
				bottom: 50px;
				right: 50px;

				width: 40px;
				height: 40px;
				background-color: white;
			}

			.quit {
				position: absolute;
				bottom: 50px;
				right: 5px;
				width: 40px;
				height: 40px;
				background-color: white;
			}

			.fire {
				z-index: 2;

				position: absolute;
				bottom: 160px;
				right: 60px;

				width: 80px;
				height: 80px;

				background: url(/static/fire6.png) no-repeat;
				background-size: contain;

				&:active {
					background-image: url(/static/fire5.png);
				}

				//为了不被video覆盖
				animation: noop 3s infinite;
			}

			.btn {
				color: #222222;
				background-color: #ffffff50;
				background: url(/static/up.png) no-repeat;
				background-position: center;
				background-size: contain;

				&:active {
					background-image: url(/static/up2.png);
					background-color: #99999999;
				}

				//border: 1px solid grey;
				border-radius: 50%;
				width: $direction_btn_size;
				height: $direction_btn_size;

				position: absolute;

				&.up {
					top: 0rpx;
					left: $direction_btn_offset;
				}

				&.down {
					left: $direction_btn_offset;
					bottom: 0rpx;
					transform: rotate(180deg);
				}

				&.left {
					left: 0rpx;
					bottom: $direction_btn_offset;
					transform: rotate(270deg);
				}

				&.right {
					right: 0rpx;
					bottom: $direction_btn_offset;
					transform: rotate(90deg);
				}
			}
		}

		.charge {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			width: 300px;
			height: 390px;
			overflow: hidden;
			z-index: 1;
		}
	}
</style>

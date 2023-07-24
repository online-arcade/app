<template>
	<view class="content">
		<image src="../../static/close.png" class="close" @click="close"></image>
		<view class="main">


			<view class="container">

				<view class="operate">

					<input class="send" v-model="sendMess" placeholder="请输入要发送的讯息" />

					<image src="../../static/send.png" @click="send" class="sendIcon">
					</image>
					<image src="../../static/redbag.jpg" class="redbag" @click="bagShow=!bagShow">
					</image>

					<view class="bagSelect" v-show="bagShow">
						<span v-for="item of redbag" class="bagForm" @click="redBag(item)">
							<image :src="item.src"></image>{{item.name}}
						</span>
					</view>
				</view>
				<scroll-view class="mess" ref="scrollableDiv" scroll-y=true :scroll-top="scrollTop" @click="closeBag"
					:scroll-with-animation="true">

					<view class="informate " v-for="(item,index) of mess" :style="{justifyContent: item.float}">

						<view v-if="item.float==='left'" style="display: flex;">
							<image src="../../static/boy3.png" @click="detail()"></image>
							<view class="showMess">

								<span class="title" :style="{textAlign:item.float}">{{item.name}}</span>

								<span :class="{'item':true,'check':item.get}"
									@click="getRedbag(item)">{{item.data}}</span>
							</view>

						</view>
						<view v-else style="display: flex;">

							<view class="showMess">

								<span class="title" :style="{textAlign:item.float}">{{item.name}}</span>

								<span :class="{'item':true,'check':item.get}"
									@click="getRedbag(item)">{{item.data}}</span>
							</view>
							<image src="../../static/boy3.png" @click="detail()"></image>
						</view>
					</view>


				</scroll-view>




			</view>
		</view>



		<detail class="card-position" :message="message" v-show="detailShow" @receiveData="handleDetail"
			@receiveMes="handleMess($event)">
		</detail>
		<model class="card-position" v-show="modelShow" @receiveData="handleModel"></model>


		<view class="redBag" v-show="getBag">
			<view class="mask"> </view>
			<view class="rectangle">
				<view
					style="position: absolute;left: 50%;transform: translateX(-50%); top: -100%;display: flex;flex-direction: column;align-items: center;color: white;">
					<view>张三</view>
					<image src="../../static/boy2.png"
						style=" box-shadow: 0 0 10px rgb(0,0,0,0.3) ; box-sizing: border-box;padding: 5px; width: 8vw;height: 8vw;border-radius: 50%; ">
					</image>

				</view>

			</view>

			<view class="informate">
				<view v-for="item of person" class="info-form">
					<image :src="item.src" mode="" class="img"></image>
					<view class="form-box">
						<view>{{item.name}}</view>
						<view class="coin">

							<image :src="item.icon" mode=""></image>{{item.coin}}

						</view>
					</view>
				</view>
			</view>
		</view>


		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog type="warn" cancelText="关闭" confirmText="同意" title="通知" :content="content"
				@confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
		</uni-popup>



	</view>


</template>

<script>
	import io from 'socket.io-client';
	export default {
		name: "chat",
		data() {
			return {
				socket: null,
				messes: [],
				content: '',
				random: false,
				getBag: false,
				message: {
					name: '大厅',
					show: true
				},
				modelShow: false,
				detailShow: false,
				bagShow: false,
				sendMess: '',
				scrollTop: 0,
				person: [{
						src: '../../static/boy1.png',
						name: '张三',
						icon: '../../static/coin.png',
						coin: 1100
					},
					{
						src: '../../static/boy2.png',
						name: '张三',
						icon: '../../static/coin.png',
						coin: 1100
					},
					{
						src: '../../static/gril1.png',
						name: '张三',
						icon: '../../static/coin.png',
						coin: 1100
					},
					{
						src: '../../static/gril2.png',
						name: '张三',
						icon: '../../static/coin.png',
						coin: 1100
					}
				],
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
				],
				redbag: [{
						src: '../../static/coin.png',
						name: '10',
						num: 5
					},
					{
						src: '../../static/coin.png',
						name: '100',

						num: 5
					},
					{
						src: '../../static/coin.png',
						name: '500',
						num: 5
					},
					{
						src: '../../static/coin.png',
						name: '1000',
						num: 10
					}
				]
			};
		},
		mounted() {
			//this.socket = io('http://demo.iot-master.com:60321/'); // 这里的地址要改成你的服务器地址

			// this.socket.on('connect', () => {
			// 	console.log('Connected to server');
			// });

			// this.socket.on('notice', (data) => {
			// 	console.log('Received message:', data);
			// 	this.talk.push(data);
			// });
		},
		methods: {
			dialogClose() {},
			dialogConfirm() {
				uni.showToast({
					title: '发送成功!',
				});
				this.mess.push({
					name: '系统',
					data: this.content,
					float: 'left',
					redBag: true,
					get: false,
				})
				this.getBag = true
				this.bagShow = false
			},
			closeBag() {

				this.getBag = false
			},
			close() {
				this.$emit('receiveData')
			},

			getRedbag(item) {

				if (item.redBag) {
					if (item.get)
						this.mess.push({
							name: '张三',
							data: '已领取，请勿重复领取!!!',
							float: 'left'
						})
					else {
						this.getBag = true
						this.mess.push({
							name: '张三',
							data: '领取成功!!!',
							float: 'left'
						})
						item.get = true
					}
				}

			},
			handleMess(mess) {

				this.mess.push({
					name: '张三',
					data: '张三赠送了' + mess.money + '元红包,数量有限，请及时领取!!!',
					float: 'left',
					redBag: true,
					get: false,
				})

			},
			send() {
				if (this.sendMess) {
					this.socket.emit('msg', {
						content: this.sendMess
					});


					this.scrollTop += 300
					this.mess.push({
						name: '张三',
						data: this.sendMess,
						float: 'left'
					})

					this.sendMess = '';
				}


			},
			redBag(item) {
				this.$refs.alertDialog.open()
				this.content = '随机红包' + item.name + '币' + item.num + '位!'

			},
			showMess() {},
			handleDetail() {
				this.detailShow = false
			},
			handleModel() {
				this.modelShow = false
			},
			detail() {
				this.detailShow = true
				this.message = {
					name: '张三',
					show: false
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


		.redBag {
			box-sizing: border-box;
			padding: 10px 0px;
			width: 40vw;
			height: 90vh;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			border-radius: 50% 50% 5px 5px;
			display: flex;
			justify-content: center;
			align-items: flex-end;
			//box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

			&::before {
				content: '';
				position: absolute;
				top: 0;
				width: 40vw;
				height: 30vh;
				background-color: rgb(210, 56, 60);

				//background-image: linear-gradient(to bottom, rgb(247, 78, 73), rgb(212, 57, 61));
				border-radius: 70%;



			}

			&::after {
				content: '';
				position: absolute;
				top: 15vh;
				left: 0;
				width: 40vw;
				height: 75vh;
				border-radius: 0 0 5px 5px;
				background-image: linear-gradient(to bottom, rgb(250, 66, 66), rgb(238, 54, 53), rgb(217, 37, 32));


			}

			.rectangle {
				position: absolute;
				left: 0;
				top: 15vh;
				width: 100%;
				height: 45px;
				background-color: rgb(247, 78, 73);
				z-index: 2;
				background-image: linear-gradient(to bottom, rgb(212, 57, 61), rgb(191, 46, 51));

				&::before {
					content: '';
					position: absolute;
					width: 0;
					height: 0;
					right: 0;
					bottom: 0;
					border-bottom: 50px solid rgb(250, 66, 66);
					border-left: 20vw solid transparent;
					//box-shadow: 2px 0px rgba(0, 0, 0, 0.3)

				}

				&::after {
					content: '';
					position: absolute;
					width: 0;
					height: 0;
					left: 0;
					bottom: 0;
					border-bottom: 50px solid rgb(250, 66, 66);
					border-right: 20vw solid transparent;
				}
			}

			.informate {
				box-sizing: border-box;
				padding: 10px;
				overflow: scroll;
				background-color: rgba(255, 255, 255, 0.2);
				width: 90%;
				height: 70%;
				position: relative;
				bottom: 0;
				z-index: 1;
				border-radius: 5px;



				.info-form {
					display: flex;
					position: relative;
					align-items: center;
					margin-bottom: 5px;
					color: white;
					text-shadow: 1px 1px rgba(0, 0, 0, 0.3), -1px -1px rgba(0, 0, 0, 0.3);
					//overflow: hidden;

					.img {
						width: 40px;
						height: 40px;
						border-radius: 50%;
						box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
						margin-right: 15px;
						box-sizing: border-box;
						padding: 5px;
					}

					.form-box {

						image {
							width: 20px;
							height: 20px;
							box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
							border-radius: 50%;
							//background-color: blac;
						}

						.coin {
							display: flex;
							align-items: center;
						}
					}

					&::before {
						content: '';
						position: absolute;
						left: 50%;
						transform: translateX(-50%);
						bottom: 0;
						width: 80%;
						height: 2px;
						background-image: linear-gradient(to right, rgba(255, 147, 143, 0.6), rgb(255, 219, 226), rgba(255, 147, 143, 0.6));
						background-color: red;
					}

				}

				//margin: 0 10px;
			}


		}


		.card-position {
			position: fixed;
			//position: absolute;
			width: 90vw;
			height: 90vh;
			left: 50%;
			top: 50%;
			background-color: rgb(57, 6, 15);
			transform: translate(-50%, -50%);
		}

		.close {
			width: 32px;
			height: 32px;
			position: absolute;
			right: -20px;
			top: -16px;
			background-color: rgb(134, 57, 5);
			border-radius: 50%;
			border: 3px solid rgb(235, 220, 38);
			padding: 0
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
				//pointer-events: none;

				.operate {
					display: flex;
					justify-content: space-between;
					//height: 50px;
					align-items: center;
					position: relative;


					.redbag {
						width: 35px;
						height: 50px;
						border-radius: 5px;
						box-shadow: 0 1px rgb(70, 13, 19), 0 2px rgb(70, 13, 19);
						//border: 2px solid rgb(70, 13, 19);
						//	pointer-events: none;
					}

					.bagSelect {
						position: absolute;
						// top: 100px;
						// left: 200px;
						display: grid;
						row-gap: 10px;
						top: 65px;
						right: 0;
						color: white;
						background-image: linear-gradient(to bottom, rgb(250, 66, 78), rgb(215, 50, 46));
						padding: 15px;
						border-radius: 5px;
						z-index: 1;


						.bagForm {
							display: flex;
							align-items: center;
							justify-content: center;
							background-image: linear-gradient(to bottom, rgb(250, 66, 62), rgb(231, 64, 62), rgb(226, 59, 51));
							//padding: 5px 3px;
							box-sizing: border-box;
							border-radius: 5px;
							width: 85px;
							height: 40px;
							//	border: 2px solid rgb(70, 13, 19);
							box-shadow: 1px 1px 0 1px rgba(0, 0, 0, 0.3), 0 0 7px rgba(0, 0, 0, 0.3);

							&::after {
								content: '';
								position: absolute;
								top: -20px;
								right: 7px;
								border: 10px solid;
								width: 5px;
								border-color: transparent transparent rgb(250, 66, 62) transparent;
								// width: 20px;
								// height: 20px;
								//z-index: 10;

							}
						}

						image {
							width: 30px;
							height: 30px;
						}
					}


					.sendIcon {
						width: 50px;
						height: 30px;
						border-radius: 5px;
						border: 2px solid rgb(70, 13, 19);
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
					background-color: rgb(70, 13, 19);
					overflow: scroll;
					scroll-margin-bottom: 0;
					//scroll-margin-top: 600px;
					display: flex;
					flex-direction: column;

					image {
						background-color: white;
						border-radius: 50%;
						width: 30px;
						height: 30px;
					}

					.informate {
						display: flex;

						.showMess {
							margin-left: 5px;
							display: flex;
							flex-direction: column;
							align-items: flex-start;

							.title {
								transform: scale(0.9);
							}



							.item {
								background-color: rgb(117, 23, 28);
								border-radius: 5px;
								box-sizing: border-box;
								padding: 8px;
								position: relative;
								//border: 2px solid rgba(0, 0, 0, 0.3);

								&::before {
									content: '';
									width: 100%;
									height: 100%;
									position: absolute;
									//background-color: rgba(0, 0, 0, 0.3);
									border: 1px solid rgba(0, 0, 0, 0.3);
									border-radius: 5px;
									left: 0;
									top: 0;
								}
							}

							.check {
								background-color: rgba(117, 23, 28, 0.5);

							}
						}
					}

				}
			}
		}

	}
</style>

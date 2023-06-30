<template>

	<model @receiveData="handleDetail">

		<view class="chat">

			<view class="operate">


				<image src="../../static/avatar.jpg"></image>
				<span>名称:{{message.name}}</span>

			</view>

			<view style="width: 100%;margin-left: 20px;" v-show="message.show">

				<view class="sendBag">

					<form>
						<uni-row class="row" style="margin-bottom: 5px;">
							<uni-col :span="17" style="margin-bottom: 10px;">
								<view>赠送金额:</view>
							</uni-col>
							<uni-col :span="17" :offset="1">
								<input class="input" name="input" placeholder="1000" v-model="recharge" />
							</uni-col>

						</uni-row>

						<uni-row class="row">
							<uni-col :span="17" style="margin-bottom: 10px;">
								<view>发布个数:</view>
							</uni-col>
							<uni-col :span="17" :offset="1">
								<input class="input" name="input" placeholder="1000" v-model="num" />
							</uni-col>

						</uni-row>


						<view style="display:flex;justify-content: right;">
							<view class="confirm" @click="confirm()">赠送</view>
						</view>

					</form>


				</view>


			</view>

			<view style="width: 100%;height: 100%;" v-show="!message.show">
				<view class="mess">


					<view class="row-border" v-show="!costShow">

						<uni-row class="row">
							<uni-col :span="5">
								<view class=" dark">ID号:</view>
							</uni-col>
							<uni-col :span="19" style="color:rgb(254,254,61);">
								1152300
							</uni-col>
						</uni-row>



						<uni-row class="row">
							<uni-col :span="5">
								<view class=" dark">金币:</view>
							</uni-col>
							<uni-col :span="19" style="color:rgb(254,254,61);">
								90
							</uni-col>

						</uni-row>


						<uni-row class="row">
							<uni-col :span="5">
								<view class=" dark">点数:</view>
							</uni-col>
							<uni-col :span="19" style="color:rgb(254,254,61);">
								LV.6
							</uni-col>
						</uni-row>


						<uni-row class="row">
							<uni-col :span="7">
								<view class=" dark">最后登录:</view>
							</uni-col>
							<uni-col :span="17" style="color:rgb(254,254,61);">
								2023/06/29
							</uni-col>
						</uni-row>



						<uni-row class="row">
							<uni-col :span="5">
								<view class="dark">签名:</view>
							</uni-col>
							<uni-col :span="19">
								<span style="color: rgb(167,127,114);">这个人很懒,什么签名也没有</span>
							</uni-col>
						</uni-row>



						<!-- <view>5</view> -->
					</view>




					<view class="sendBag" v-show="costShow">

						<form>
							<uni-row class="row">
								<uni-col :span="17" style="margin-bottom: 10px;">
									<view>赠送金额:</view>
								</uni-col>
								<uni-col :span="17" :offset="1">
									<input class="input" name="input" placeholder="1000" v-model="recharge" />
								</uni-col>
							</uni-row>

							<view style="display:flex;justify-content: right;">
								<view class="confirm" @click="confirm()">赠送</view>
							</view>

						</form>


					</view>


				</view>


				<image src="../../static/bag.png"
					style="width: 40px;height: 40px;position: absolute;right: 8px;top: 8px;" @click="sendBag()">
				</image>

				<image src="../../static/return (2).png" class="return" @click="showMes()" v-show="costShow">
				</image>
			</view>



		</view>
	</model>
</template>

<script>
	export default {
		name: "detail",
		props: ['message'],
		data() {
			return {
				costShow: false,
				recharge: 0,
				num: 0,
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
		onLoad() {
			console.log(this.message)
		},
		onShow() {
			console.log(this.message)
		},
		methods: {
			handleDetail() {
				this.$emit('receiveData')
			},
			push() {
				this.$emit('receiveMes', {

					money: this.recharge,
					num: this.num
				})
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
			},
			sendBag() {

				this.costShow = true
				// uni.showToast({
				// 	// icon: 'error',

				// 	title: '赠送红包!',

				// });

			},
			showMes() {
				this.costShow = !this.costShow
			},
			confirm() {
				if (this.message.show)
					if (typeof(Number(this.recharge)) === 'number' && this.recharge > 0 &&
						typeof(Number(this.num)) === 'number' && this.num > 0
					) {

						uni.showToast({

							//title: '赠送红包$' + this.recharge + ',个数' + this.num + '!',
							title: '发送成功!',
						});
						this.push()
					} else {
						uni.showToast({
							icon: 'error',
							title: '无效输入!',

						});

					}
				else {
					if (typeof(Number(this.recharge)) === 'number' && this.recharge > 0) {

						uni.showToast({

							title: '赠送红包$' + this.recharge + '!',

						});
						this.push()
					} else {
						uni.showToast({
							icon: 'error',
							title: '无效输入!',

						});

					}

				}

			}
		}
	}
</script>

<style lang="scss">
	.return {
		border-radius: 50%;
		background-color: rgb(167, 127, 114);
		box-sizing: border-box;
		padding: 5px;
		width: 35px;
		height: 35px;
		position: absolute;
		right: 8px;
		bottom: 8px;
	}





	.chat {

		width: 100%;
		height: 100%;
		display: flex;
		box-sizing: border-box;
		padding: 10px 20px 10px 0;
		background-color: rgb(63, 6, 18);
		border-radius: 10px;
		position: relative;

		.sendBag {
			form {
				color: white;
				width: 100%;
				align-items: center;
				display: flex;
				flex-direction: column;
				background-color: rgb(121, 24, 28);
				border-radius: 6px;
				overflow: hidden;
				box-shadow: 1px 1px rgba(0, 0, 0, 0.3), 2px 2px rgba(0, 0, 0, 0.3), 3px 3px rgba(0, 0, 0, 0.3);
				box-sizing: border-box;
				padding: 10px 0;

				.input {
					background-color: rgb(47, 0, 17);
					border-radius: 5px;
					box-shadow: 0 0 15px rgb(97, 19, 37);
					padding: 10px;

				}

				.confirm {
					background-image: linear-gradient(to bottom, rgb(40, 175, 255), rgb(30, 133, 255));
					box-sizing: border-box;
					padding: 3px 15px;
					border-radius: 6px;
					text-shadow: 1px 1px rgba(0, 0, 0, 0.3), 2px 2px rgba(0, 0, 0, 0.3);
					border: 1px solid black; //rgb(70, 13, 19)
					box-shadow: 1px 1px rgba(0, 0, 0, 0.3), 2px 2px rgba(0, 0, 0, 0.3), 3px 3px rgba(0, 0, 0, 0.3);
				}

				image {
					width: 45px;
					height: 45px;
					margin: 5px 0;
					//background-color: red;
					border-radius: 50%;
					box-sizing: border-box;
					padding: 1px;
					//box-shadow: 0 0 15px gray;
				}

				span {
					background-color: rgb(120, 24, 28);
					width: 100%;
					text-align: center;
					text-shadow: 1px 1px rgba(0, 0, 0, 0.3), 2px 2px rgba(0, 0, 0, 0.3);

				}


			}

		}



		.operate {
			display: flex;
			color: white;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding: 0 25px;
			position: relative;

			&::after {
				content: '';
				position: absolute;
				right: 0;
				top: 0;
				height: 50%;
				width: 2px;
				background-image: linear-gradient(to bottom, rgba(89, 20, 29, 0.3), rgb(119, 35, 50));
			}

			&::before {
				content: '';
				position: absolute;
				right: 0;
				bottom: 0;
				height: 50%;
				width: 2px;
				background-image: linear-gradient(to top, rgba(89, 20, 29, 0.3), rgb(119, 35, 50));
			}

			span {
				font-size: 18px;
			}

			image {
				width: 80px;
				height: 80px;
				border-radius: 50%;
				margin-bottom: 13px;
			}


		}



		.mess {
			color: white;
			box-sizing: border-box;
			padding: 10px 0 10px 20px;
			width: 100%;
			height: 100%;
			border-radius: 7px;
			//background-color: rgb(70, 13, 19);
			//background-color: rgb(63, 6, 18); 
			display: flex;
			flex-direction: column;


			.row-border {
				width: 100%;
				height: 100%;
				display: grid;
				grid-template-rows: repeat(5, 1fr);
				grid-gap: 10px 0px;
				font-size: 22px;
			}






		}
	}
</style>

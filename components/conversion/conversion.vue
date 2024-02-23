<template>
	<model @receiveData="handleRecharge">


		<view class="chat">

			<view class="operate">

				<view style="display: flex; ">
					<image :src="url"></image>
					<view class="infor">
						<span>名称 :{{user.nickname}}</span>
						<span>积分 :{{user.balance}}</span>
					</view>
				</view>
				<!-- <view style="display: flex;  ">
					<view class="btn" v-if="customShow" @click="custom(0)">礼包充值</view>
					<view class="btn" v-else @click="custom(1)">自定义充值</view>
				</view> -->

			</view>
			<view class="mess" v-if="customShow===0">

				<uni-row :gutter="0">
					<uni-col class="shop" :span="24">
						<view class="form" @click="cost(1)">
							<span>京东e卡</span>
							<image src="../../static/e.png"></image>
							<span>¥100</span>
						</view>
					</uni-col>


					<uni-col class="shop" :span="24">
						<view class="form" @click="cost(0)">
							<span>话费卡</span>
							<image src="../../static/echarge.png"></image>
							<span>¥100</span>
						</view>
					</uni-col>
				</uni-row>


				<uni-popup ref="alertDialog" type="dialog">
					<uni-popup-dialog type="warn" cancelText="关闭" confirmText="同意" title="通知" :content="content"
						@confirm="showCharge" @close="dialogClose"></uni-popup-dialog>
				</uni-popup>


				<uni-popup ref="alertDialogConfirm" type="dialog">
					<uni-popup-dialog type="warn" mode="input" cancelText="关闭" confirmText="同意" title="通知"
						placeholder="请输入手机号!" @confirm="dialogConfirm" @close="dialogClose">

						<uni-easyinput type="text" v-model="phone" placeholder="请输入手机号" />

						<!-- <text>手机号</text> -->
					</uni-popup-dialog>
				</uni-popup>

			</view>



		</view>
	</model>
</template>

<script>
	export default {
		name: "recharge",
		props: ['user'],
		data() {
			return {
				phone: '',
				check: 0,
				token: '',
				recharge: 0,
				customShow: 0,
				content: '',
				sendMess: '',
				url: '../../static/avatar.jpg',
			};
		},
		mounted() {

			this.url = this.user.avatar || 'https://gamebox.zgwit.cn/static/boy1.png'

			this.token = uni.getStorageSync('token')
		},
		methods: {
			handleRecharge() {
				this.$emit('receiveData')
			},
			cost(mess) {
				this.check = mess
				if (mess) {
					this.content = "是否消费10000积分兑换京东e卡"
				} else {
					this.content = "是否消费10000积分兑换话费卡"
				}

				this.$refs.alertDialog.open()
			},
			custom(num) {

				this.customShow = num
			},
			dialogClose() {},
			confirm() {
				if (Number(this.recharge)) {
					this.dialogConfirm(Number(this.recharge))
				} else {
					uni.showToast({
						icon: 'error',
						title: '请输入充值金额!',
					});
				}
			},
			showCharge() {
				this.$refs.alertDialogConfirm.open()
			},
			dialogConfirm(e) {
				if (!this.phone) {
					uni.showToast({
						title: "不为空！",
						icon: "error"
					})
					return
				}
				if (this.phone.length !== 11) {
					uni.showToast({
						title: "格式错误！",
						icon: "error"
					})
					this.phone = ""
					return
				}


				if (!Number(this.user.balance) || this.user.balance < 10000) {
					uni.showToast({
						icon: "error",
						title: "积分不足！"
					})
					this.phone = ""
					return
				}

				this.submit(e)
				this.phone = ""
			},
			async getUser() {
				const res = await this.$request({
					method: 'GET',
					url: `user/${uni.getStorageSync('id')}`,
					header: {
						'Content-Type': 'application/json;charset=UTF-8',
						'Authorization': 'Bearer ' + this.token
					}
				})
				if (res.data.data) this.user = res.data.data
			},
			async submit(e) {
				const cost = await this.$request({
					method: 'POST',
					url: `exchange/create`,
					header: {
						'Content-Type': 'application/json;charset=UTF-8',
						'Authorization': 'Bearer ' + this.token
					},
					data: {
						user_id: this.user.id,
						amount: 100,
						phone: this.phone,
						type: this.check ? '京东卡' : '话费'
					}
				})

				// this.user.balance -= 10000
				this.getUser()
				uni.showToast({
					title: "消费成功!",
				});


			}
		}
	}
</script>

<style lang="scss">
	.chat {

		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		padding: 5px;
		position: relative;

		.operate {
			display: flex;
			color: white;
			justify-content: space-between;
			align-items: center;

			image {
				width: 50px;
				height: 50px;
				border-radius: 5px;
				box-shadow: 0 0 1px black;
			}

			.infor {
				color: gray;
				display: flex;
				flex-direction: column;
				margin-left: 10px;
				justify-content: center;
			}

			.btn {

				background-image: linear-gradient(to bottom, rgb(74, 255, 46), rgb(4, 93, 1));
				box-sizing: border-box;
				padding: 7px 10px;
				border-radius: 5px;
				text-shadow: 1px 1px rgba(0, 0, 0, 0.3), 2px 2px rgba(0, 0, 0, 0.3);
				border: 2px solid rgb(70, 13, 19);
				margin-left: 5px;
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
			background-color: seagreen;
			overflow: scroll;
			display: flex;
			flex-direction: column;

			.shop {

				box-sizing: border-box;
				padding: 10px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;



				.form {

					width: 90%;
					align-items: center;
					display: flex;
					flex-direction: column;
					background-color: white;
					border-radius: 6px;
					overflow: hidden;
					box-shadow: 1px 1px rgba(0, 0, 0, 0.3), 2px 2px rgba(0, 0, 0, 0.3), 3px 3px rgba(0, 0, 0, 0.3);
					box-sizing: border-box;
					// padding: 3px 0;

					image {
						width: 200px;
						height: 130px;
						border-radius: 5px;
						margin: 5px 0;
						//background-color: red;

						box-sizing: border-box;
						padding: 1px;
						background-image: linear-gradient(to bottom, rgb(234, 56, 202), rgb(62, 0, 72));
						//box-shadow: 0 0 15px gray;
					}

					span {
						background-color: rgb(120, 24, 28);
						width: 100%;
						text-align: center;
						box-sizing: border-box;
						padding: 3px 0;
						text-shadow: 1px 1px rgba(0, 0, 0, 0.3), 2px 2px rgba(0, 0, 0, 0.3);

					}
				}
			}




			.row {
				display: flex;
				align-items: center;
				margin-bottom: 5px;

				.input {
					background-color: rgb(47, 0, 17);
					border-radius: 5px;
					box-shadow: 0 0 15px rgb(97, 19, 37);
					padding: 10px;
					flex: 1;
					margin-left: 7px;
				}
			}

			.confirm-box {
				display: flex;
				justify-content: right;
				margin-top: 20px;

				.confirm {
					background-image: linear-gradient(to bottom, rgb(40, 175, 255), rgb(30, 133, 255));
					box-sizing: border-box;
					padding: 5px 15px;
					border-radius: 6px;
					text-shadow: 1px 1px rgba(0, 0, 0, 0.3), 2px 2px rgba(0, 0, 0, 0.3);
					border: 1px solid black; //rgb(70, 13, 19)
					box-shadow: 1px 1px rgba(0, 0, 0, 0.3), 2px 2px rgba(0, 0, 0, 0.3), 3px 3px rgba(0, 0, 0, 0.3);
				}
			}


		}
	}
</style>

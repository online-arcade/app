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
				<view style="display: flex;  ">
					<view class="btn" v-if="customShow" @click="custom(0)">礼包充值</view>
					<view class="btn" v-else @click="custom(1)">自定义充值</view>
				</view>

			</view>
			<view class="mess" v-if="customShow===0">

				<uni-row :gutter="0">
					<uni-col class="shop" :span="12" v-for="(item ,index) in shop">
						<view class="form" @click="cost(item.spend)">
							<span>{{item.name}}</span>
							<image :src="item.url"></image>
							<span>{{item.spend}}</span>
						</view>
					</uni-col>
				</uni-row>


				<uni-popup ref="alertDialog" type="dialog">
					<uni-popup-dialog type="info" cancelText="关闭" confirmText="同意" title="通知" :content="content"
						@confirm="dialogConfirm('礼包')" @close="dialogClose">

						<!-- <text>手机号</text> -->
					</uni-popup-dialog>
				</uni-popup>

				<uni-popup ref="alertDialogConfirm" type="dialog">
					<uni-popup-dialog type="warn" mode="input" cancelText="关闭" confirmText="同意" title="通知"
						placeholder="请输入手机号!" @confirm="dialogConfirm('礼包')" @close="dialogClose">

						<uni-easyinput type="text" v-model="phone" placeholder="请输入手机号" />

						<!-- <text>手机号</text> -->
					</uni-popup-dialog>
				</uni-popup>
			</view>

			<view class="mess" v-if="customShow===1">

				<form>

					<view class="row">
						<text class=" " style="  ">自定义金额:</text>
						<input class="input" style=" " name="input" placeholder="1000" v-model="recharge" />
					</view>

					<view class="confirm-box">
						<view class="confirm" @click="confirm()">确定</view>
					</view>

				</form>
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

				token: '',
				recharge: 0,
				customShow: 0,
				content: '',
				sendMess: '',
				url: '../../static/avatar.jpg',
				shop: [{
						name: '金币100',
						url: '../../static/integral.png',
						spend: '￥ 10'
					},
					{
						name: '金币300',
						url: '../../static/integral.png',
						spend: '￥ 30'
					},
					{
						name: '金币600',
						url: '../../static/integral.png',
						spend: '￥ 60'
					},
					{
						name: '金币900',
						url: '../../static/integral.png',
						spend: '￥ 90'
					},
					{
						name: '金币1200',
						url: '../../static/integral.png',
						spend: '￥ 120'
					},
					{
						name: '金币1500',
						url: '../../static/integral.png',
						spend: '￥ 150'
					}, {
						name: '金币1800',
						url: '../../static/integral.png',
						spend: '￥ 180'
					}, {
						name: '金币2100',
						url: '../../static/integral.png',
						spend: '￥ 210'
					},
				],
				check: 0
			};
		},
		mounted() {

			this.url = this.user.avatar || 'https://gamebox.zgwit.cn/static/boy1.png'

			this.token = uni.getStorageSync('token')
		},
		methods: {
			showCharge() {
				this.$refs.alertDialogConfirm.open()
			},
			handleRecharge() {
				this.$emit('receiveData')
			},
			cost(mess) {
				this.content = "充值" + mess
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
			dialogConfirm(e) {

				if (e === "礼包") {
					this.check = 1
					this.weixinTestPay(this.content.slice(4))
				} else {
					this.check = 0
					this.weixinTestPay(e)
				}
			},
			async weixinTestPay(pay) {

				const res = await this.$request({
					method: 'GET',
					url: `weixin/pre-pay`,
					header: {
						'Content-Type': 'application/json;charset=UTF-8',
						'Authorization': 'Bearer ' + this.token
					},
					data: {
						amount: pay * 100,
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

								this.submit(pay)
							}
						});

				} else {

					uni.showToast({
						icon: 'error',
						title: '支付失败!',
					});
				}

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
				// if (this.check) this.user.Integral += e * 10
				// else this.user.balance += e

				this.getUser()
				uni.showToast({
					title: "充值成功!",
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
					background-color: yellow;
					border-radius: 6px;
					overflow: hidden;
					box-shadow: 1px 1px rgba(0, 0, 0, 0.3), 2px 2px rgba(0, 0, 0, 0.3), 3px 3px rgba(0, 0, 0, 0.3);
					box-sizing: border-box;
					// padding: 3px 0;

					image {
						width: 45px;
						height: 45px;
						margin: 5px 0;
						//background-color: red;
						border-radius: 50%;
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

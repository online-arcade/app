<template>
	<view>
		<uni-section title="用户列表" type="line">
			<uni-list>

				<uni-list-item v-for="(item,index) of users" :key="index" :title="item.nickname"
					:note="'账户余额'+item.balance">
					<template v-slot:footer>
						<view class="box">
							<view>
								<uni-tag text="用户充值" type="primary" @click="showCost(item)" />
							</view>

							<view class="box-cost"></view>
							<view>
								<uni-tag text="扣分" type="error" />
							</view>

						</view>

					</template>
				</uni-list-item>
			</uni-list>



		</uni-section>

		<uni-popup ref="coinDialog" type="dialog" style="z-index: 99999;">
			<uni-popup-dialog type="info" cancelText="关闭" confirmText="充值" title="充值" @confirm="submit(cost)"
				@close="dialogClose">

				<view class="coinDialog">



					<view class="custom">
						<view>充值金额 ：</view>
						<span>
							<uni-number-box v-model="cost" :max="99999" />
						</span>
					</view>





				</view>
			</uni-popup-dialog>
		</uni-popup>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				cost: 0,
				token: '',
				users: [],
				user: {}
			}
		},
		mounted() {
			this.load()
		},
		onPullDownRefresh() {
			this.users = [];
			this.load()
		},
		onReachBottom() {
			this.load()
		},
		methods: {
			showCost(e) {
				this.user = e
				this.$refs.coinDialog.open()

			},
			dialogClose() {},
			async load() {
				this.token = uni.getStorageSync('token')
				const res = await this.$request({
					method: 'GET',
					url: `user/list`,
					header: {
						'Content-Type': 'application/json;charset=UTF-8',
						'Authorization': 'Bearer ' + this.token
					},
					data: {
						skip: this.users.length,
						limit: 20,
					}
				})
				if (res.data) {
					this.users = this.users.concat(res.data.data)
				}
				uni.stopPullDownRefresh()
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

				this.user.balance += e
				const user = await this.$request({
					method: 'POST',
					url: `user/${this.user.id}`,
					header: {
						'Content-Type': 'application/json;charset=UTF-8',
						'Authorization': 'Bearer ' + this.token
					},
					data: this.user
				})

				if (user.data.data) {
					this.text = "充值成功！"
					this.toast = false
					this.$refs.report.open('center');
					this.time = setInterval(() => {
						this.$refs.report.close()
						clearInterval(this.time)
					}, 1500)

				}


			},

		}
	}
</script>

<style lang="scss">
	.box {
		display: flex;

		.box-cost {
			width: 10px
		}
	}

	.coinDialog {
		.tap {
			display: flex;
			justify-content: space-between;
			position: relative;
			top: -6px
		}

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
</style>
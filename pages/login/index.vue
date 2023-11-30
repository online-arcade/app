<template>
	<view class="content">
		<!-- @dblclick='screenFull' -->
		<!-- <view
			style="font-size: 26px; display: flex;align-items: center;justify-content: center; background: lightgray;width: 100vw;height:100vh;position: absolute;z-index: 9999;"
			@click='screenFull' v-show="textShow">
			请设置屏幕横屏
		</view> -->
		<view class="login">


			<view class="form">

				<h2 style="margin-bottom: 10px;">登录</h2>



				<uni-forms>
					<view class="input">
						<span>账号</span>
						<uni-easyinput style="min-width: 200px;" type="text" v-model="formData.username" />
					</view>

					<view class="input">
						<span>密码</span>
						<uni-easyinput type="password" v-model="formData.password" />
					</view>




				</uni-forms>
				<view class="btn" style="display: flex; justify-content: space-between">

					<view class="btn-form" @click="login(1)">
						微信登录
					</view>

					<view class="btn-form" @click="login(0)">
						登录</view>
				</view>

				<!-- 
				<button type="primary" size="mini" @click="register">注册</button>
				<button type="primary" size="mini" @click="login" style="float: right;">登录</button> -->

			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {
					username: '',
					password: ''
				},
				textShow: true
			};
		},
		onShow() {

			// const requestFullScreen =
			// 	element.requestFullscreen ||
			// 	element.webkitRequestFullscreen ||
			// 	element.mozRequestFullScreen ||
			// 	element.msRequestFullscreen;

			// // 请求全屏
			// if (requestFullScreen) {
			// 	requestFullScreen.call(element);
			// }

			//this.register()
		},
		onLaunch() {
			if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent) && /MicroMessenger/i.test(navigator
					.userAgent)) {
				// 设置 viewport 的属性值
				document.querySelector('meta[name="viewport"]').setAttribute('content',
					'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
			}
			//this.enterLandscape();
		},
		methods: {

			enterLandscape() {
				if (screen.orientation && screen.orientation.lock) {
					screen.orientation
						.lock("landscape")
						.catch((error) => {
							console.log("无法锁定屏幕方向", error);
						});
				} else if (screen.lockOrientation) {
					screen.lockOrientation("landscape");
				} else if (screen.mozLockOrientation) {
					screen.mozLockOrientation("landscape");
				} else if (screen.msLockOrientation) {
					screen.msLockOrientation("landscape");
				} else if (screen.webkitLockOrientation) {
					screen.webkitLockOrientation("landscape");
				}
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
			register() {
				const mess = {
					username: "admin",
					password: this.$md5("123456")
				}
				uni.request({
					url: 'http://gamebox.zgwit.cn:8082/api/login',
					method: 'POST',
					data: mess,
					success: (item) => {
						uni.setStorageSync('token', item.data.data.token);
						uni.setStorageSync('id', item.data.data.user.id);
						uni.showToast({
							title: '登陆成功！'
						});

						uni.navigateTo({
							url: '/pages/index/index'
						});

					},

				})
			},
			login(e) {

				const mess = {
					username: e ? "admin" : this.formData.username,
					password: e ? this.$md5("123456") : this.$md5(this.formData.password)
				}
				uni.request({
					url: 'http://gamebox.zgwit.cn:8082/api/login',
					method: 'POST',
					data: mess,
					success: (item) => {
						// console.log(item)
						if (item.data.data) {
							uni.setStorageSync('token', item.data.data.token);
							uni.setStorageSync('id', item.data.data.user.id);
							uni.showToast({
								title: '登陆成功！'
							});

							uni.navigateTo({
								url: '/pages/index/index'
							});
						} else {

							uni.showToast({
								icon: 'error',
								title: '账户验证错误！'
							});

						}
						// uni.showToast({
						// 	title: '登陆成功！'
						// });

						// uni.navigateTo({
						// 	url: '/pages/index/index'
						// });
					},

				})


			},

		}
	}
</script>

<style lang="scss">
	page {}

	.content {
		font-family: font;
		// height: 100vh;
		// width: 100vw;

		width: 100vw;
		height: 100vh;
		// margin-left: 100vw;
		// transform: rotate(90deg);
		// transform-origin: left top;

		background-image: url('../../static/login.png');
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center center;
		display: flex;
		justify-content: center;
		align-items: center;

		.login {
			position: relative;
			// width: 50vw;
			// height: 55vh;
			//	background-color: rgba(211, 211, 211, 0.7);
			color: white;
			//background-image: linear-gradient(to bottom, rgb(125, 25, 30), rgb(82, 13, 17));
			background-color: rgba(211, 211, 211, 0.5);
			//border: 4px solid rgb(255, 244, 38);
			//border-radius: 30px;
			//box-shadow: 1px 1px rgba(0, 0, 0, 0.2), 2px 2px rgba(0, 0, 0, 0.2), 3px 3px rgba(0, 0, 0, 0.2);
			display: flex;
			justify-content: center;
			align-items: center;
			box-sizing: border-box;
			padding: 20px 50px;

			.form {
				box-sizing: border-box;


				h2 {
					text-align: center;
					//text-shadow: 1px 1px rgba(0, 0, 0, 0.3), 2px 2px rgba(0, 0, 0, 0.3), 3px 3px rgba(0, 0, 0, 0.3), 4px 4px rgba(0, 0, 0, 0.3);
					text-shadow: 2px 2px rgba(0, 0, 0, 0.3);
				}

				.input {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 20px;

					span {
						margin-right: 20px;
						font-weight: bold;
						//text-shadow: 1px 1px rgba(0, 0, 0, 0.3), 2px 2px rgba(0, 0, 0, 0.3), 3px 3px rgba(0, 0, 0, 0.3), 4px 4px rgba(0, 0, 0, 0.3);
						//color: gray;
						text-shadow: 2px 2px rgba(0, 0, 0, 0.3);
					}
				}

				.btn {
					.btn-form {
						display: flex;
						justify-content: center;
						align-items: center;

						//text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5), -2px -2px 2px rgba(0, 0, 0, 0.5);
						//text-shadow: 2px 2px rgba(0, 0, 0, 0.3) inset;

						border-radius: 6px;
						box-sizing: border-box;
						padding: 5px 20px;
						//background-image: linear-gradient(to bottom, rgb(40, 175, 255), rgb(29, 111, 255));
						box-shadow: 1px 1px rgba(0, 0, 0, 0.9), 0 2px rgba(0, 0, 0, 0.9);
						background: seagreen;

					}
				}
			}
		}
	}
</style>

<template>
	<view class="content">
		<view class="login">


			<view class="form">

				<h2 style="margin-bottom: 10px;">登录</h2>



				<uni-forms>
					<view class="input">
						<span>账号</span>
						<uni-easyinput style="min-width: 200px;" type="text" v-model="formData.account" />
					</view>

					<view class="input">
						<span>密码</span>
						<uni-easyinput type="password" v-model="formData.password" />
					</view>




				</uni-forms>
				<view class="btn" style="display: flex; justify-content: space-between">

					<view class="btn-form" @click="register">
						注册
					</view>

					<view class="btn-form" @click="login">
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
					account: '',
					password: ''
				},
			};
		},
		methods: {
			login() {

				if (this.formData.account === 'admin' && this.formData.password === '123456') {
					uni.showToast({
						title: '登陆成功！'
					});
					uni.navigateTo({
						url: '/pages/index/index'

					});

				} else {
					uni.showToast({
						title: '校验错误...'
					});
				}
			},
			register() {}
		}
	}
</script>

<style lang="scss">
	page {}

	.content {
		font-family: 汉仪正圆-75;
		height: 100vh;
		width: 100vw;
		background-image: url('../../static/login1.jpg');
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
			background-image: linear-gradient(to bottom, rgb(125, 25, 30), rgb(82, 13, 17));
			border: 4px solid rgb(255, 244, 38);
			border-radius: 10px;
			box-shadow: 1px 1px rgba(0, 0, 0, 0.2), 2px 2px rgba(0, 0, 0, 0.2), 3px 3px rgba(0, 0, 0, 0.2);
			display: flex;
			justify-content: center;
			align-items: center;
			box-sizing: border-box;
			padding: 20px 50px;

			.form {
				box-sizing: border-box;


				h2 {
					text-align: center;
					text-shadow: 1px 1px rgba(0, 0, 0, 0.3), 2px 2px rgba(0, 0, 0, 0.3), 3px 3px rgba(0, 0, 0, 0.3), 4px 4px rgba(0, 0, 0, 0.3);
				}

				.input {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 20px;

					span {
						margin-right: 20px;
						font-weight: bold;
						text-shadow: 1px 1px rgba(0, 0, 0, 0.3), 2px 2px rgba(0, 0, 0, 0.3), 3px 3px rgba(0, 0, 0, 0.3), 4px 4px rgba(0, 0, 0, 0.3);
						//color: gray;
					}
				}

				.btn {
					.btn-form {
						display: flex;
						justify-content: center;
						align-items: center;

						text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5), -2px -2px 2px rgba(0, 0, 0, 0.5);
						;

						border-radius: 6px;
						box-sizing: border-box;
						padding: 5px 20px;
						background-image: linear-gradient(to bottom, rgb(40, 175, 255), rgb(29, 111, 255));
						box-shadow: 1px 1px rgba(0, 0, 0, 0.6), 0 2px rgba(0, 0, 0, 0.6);

					}
				}
			}
		}
	}
</style>

<template>
	<view class="content">
		<view class="login">


			<view class="form">

				<h3 style="margin-bottom: 10px;">登录</h3>



				<uni-forms>
					<uni-forms-item label="账号" name="account">
						<uni-easyinput type="text" v-model="formData.account" />
					</uni-forms-item>
					<uni-forms-item label="密码" name="password">
						<uni-easyinput type="text" v-model="formData.password" />
					</uni-forms-item>

				</uni-forms>


				<button type="primary" size="mini" @click="register">注册</button>
				<button type="primary" size="mini" @click="login" style="float: right;">登录</button>



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
		height: 100vh;
		width: 100vw;
		background-image: url('../../static/login.jpg');
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center center;
		display: flex;
		justify-content: center;
		align-items: center;

		.login {
			width: 50vw;
			height: 55vh;
			background-color: rgba(211, 211, 211, 0.7);
			border-radius: 5px;
			display: flex;
			justify-content: center;
			align-items: center;
			box-sizing: border-box;
			padding: 10px 0;

			.form {
				box-sizing: border-box;
				width: 60%;
				height: 100%;

				h3 {
					text-align: center;
				}
			}
		}
	}
</style>

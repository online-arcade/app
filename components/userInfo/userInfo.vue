<template>
	<model class="model" @receiveData="handleModel">
		<view class="operate">
			<image src="../../static/avatar.jpg" class="photo"></image>
			<image src="../../static/edit.png" class="edit" @click="edit()">
			</image>
			<span>名称 :{{user.name}}</span>
		</view>
		<view class="mess" ref="scrollableDiv">
			<form>
				<uni-row class="row">
					<uni-col :span="5" style="text-align: right;">
						<view class="demo-uni-col dark">昵称:</view>
					</uni-col>
					<uni-col :span="17" :offset="1">
						<input class="input" name="input" :placeholder="user.name" v-model="user.name" />
					</uni-col>
				</uni-row>

				<uni-row class="row">
					<uni-col :span="5" style="text-align: right;">
						<view class="demo-uni-col dark">性别:</view>
					</uni-col>
					<uni-col :span="17" :offset="1">
						<image :src="radio1" @click="chooseRadio(1)"></image>
						<image src="../../static/boy.png"></image>
						<image :src="radio2" @click="chooseRadio(0)"></image>
						<image src="../../static/gril.png"></image>
					</uni-col>
				</uni-row>


				<uni-row class="row">
					<uni-col :span="5" style="text-align: right;">
						<view class="demo-uni-col dark">积分:</view>
					</uni-col>
					<uni-col :span="17" :offset="1">
						<input class="input" name="input" :placeholder="user.integral+' '" />
					</uni-col>
				</uni-row>

				<uni-row class="row">

					<uni-col :span="5" style="text-align: right;">
						<view class="demo-uni-col dark">人缘:</view>
					</uni-col>
					<uni-col :span="3" :offset="1" style="color:rgb(254,254,61);font-size: 18px;">
						90
					</uni-col>
					<uni-col :span="5" style="text-align: right;">
						<view class="demo-uni-col dark">vip:</view>
					</uni-col>
					<uni-col :span="5" :offset="1" style="color:rgb(254,254,61);font-size: 18px;">
						成为vip
					</uni-col>
				</uni-row>


				<uni-row class="row">
					<uni-col :span="5" style="text-align: right;">
						<view class="demo-uni-col dark">签名:</view>
					</uni-col>
					<uni-col :span="17" :offset="1">
						<input class="input" name="input" placeholder="这个人很懒,什么签名也没有" />
					</uni-col>
				</uni-row>

			</form>

		</view>

	</model>






</template>

<script>
	export default {
		name: "userInfo",
		props: ['user'],
		data() {
			return {
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
		methods: {

			handleModel() {

				this.$emit('receiveData')

			},
			edit() {

				uni.request({
					url: '/api/user/0',
					method: 'POST',
					data: this.user,
					// {
					// 	name: this.user.name
					// },
					success: (item) => {
						uni.showToast({
							title: "提交成功!",
						});
					}
				});



			},
			close() {
				this.$emit('receiveData')
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
			}
		},
		mounted() {
			// console.log(this.user)
		},
		onShow() {

		}
	}
</script>

<style lang="scss">
	.model {
		.container {

			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			padding: 5px;

			.operate {
				display: flex;
				color: white;
				position: relative;

				//	justify-content: space-between;
				//height: 50px;
				span {
					margin-left: 10px;
				}

				image {
					width: 50px;
					height: 50px;
				}

				.photo {
					border-radius: 50%;
					box-shadow: 1px 1px rgba(0, 0, 0, 0.3), 2px 2px rgba(0, 0, 0, 0.3s);
				}

				.edit {
					box-sizing: border-box;
					padding: 1px;
					position: absolute;
					bottom: 0;
					right: 0;
					background-color: rgb(149, 0, 54);
					border-radius: 50%;
					width: 30px;
					height: 30px;
					border: 2px solid rgb(88, 14, 42);
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
				//background-color: rgb(70, 13, 19);
				background-color: rgb(63, 6, 18);
				overflow: scroll;
				display: flex;
				flex-direction: column;


				image {
					background-color: white;
					border-radius: 50%;
					width: 30px;
					height: 30px;
				}

				.row {
					display: flex;
					align-items: center;
					margin-bottom: 5px;

					image {
						width: 30px;
						height: 30px;
						background-color: transparent;
						border-radius: 0;
					}
				}

				.input {
					//	border: 3px solid rgb(117, 23, 28);
					background-color: rgb(47, 0, 17);
					border-radius: 5px;
					box-shadow: 0 0 15px rgb(97, 19, 37);
					// color: rgb(245, 231, 202);
					//box-sizing: border-box;
					padding: 10px;

				}

				.informate {
					display: flex;

					.showMess {
						margin-left: 5px;
						display: flex;
						flex-direction: column;

						.title {
							transform: scale(0.9);
						}

						.item {
							background-color: rgb(117, 23, 28);
							border-radius: 5px;
							box-sizing: border-box;
							padding: 8px;

						}
					}
				}

			}
		}
	}

	//	}

	//}
</style>

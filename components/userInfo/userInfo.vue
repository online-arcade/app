<template>
	<model class="model" @receiveData="handleModel">
		<view class="operate" style=" ">
			<uni-file-picker class="custom-file-picker" limit="1" :del-icon="false" disable-preview :auto-upload="false"
				:value="fileLists" :imageStyles="imageStyles" @select="handleSelect" file-mediatype="image">
				<!-- <image :src="src" class="photo"></image> -->
			</uni-file-picker>

			<image src="../../static/edit.png" class="edit" @click="edit()">
			</image>
			<!-- <span>名称 :{{user.nick_name}}</span> -->
		</view>
		<view class="mess" ref="scrollableDiv">
			<form style="background: white;color:black;border-radius: 5px;">
				<uni-row class="row">
					<uni-col :span="5" style="text-align: right;">
						<view class="demo-uni-col dark">昵称:</view>
					</uni-col>
					<uni-col :span="17" :offset="1">
						<input class="input" name="input" :placeholder="name" v-model="name" />
					</uni-col>
				</uni-row>

				<uni-row class="row">
					<uni-col :span="5" style="text-align: right;">
						<view class="demo-uni-col dark">性别:</view>
					</uni-col>
					<uni-col :span="17" :offset="1">
						<span @click="chooseRadio(1)">
							<image :src="user.gender==='男'? radio1:radio2"></image>
							<image src="../../static/boy.png"></image>
						</span>

						<span @click="chooseRadio(0)">
							<image :src="user.gender==='男'? radio2:radio1"></image>
							<image src="../../static/gril.png"></image>
						</span>

					</uni-col>
				</uni-row>


				<uni-row class="row">
					<uni-col :span="5" style="text-align: right;">
						<view class="demo-uni-col dark">积分:</view>
					</uni-col>
					<uni-col :span="17" :offset="1">

						<input class="input" name="input" disabled="true" :placeholder="user.integral+' '" />
					</uni-col>
				</uni-row>

				<uni-row class="row">

					<uni-col :span="5" style="text-align: right;">
						<view class="demo-uni-col dark">人缘:</view>
					</uni-col>
					<uni-col :span="3" :offset="1" style="  ">
						90
					</uni-col>
					<uni-col :span="5" style="text-align: right;">
						<view class="demo-uni-col dark">vip:</view>
					</uni-col>
					<uni-col :span="5" :offset="1" style=" ">
						成为vip
					</uni-col>
				</uni-row>


				<uni-row class="row">
					<uni-col :span="5" style="text-align: right;">
						<view class="demo-uni-col dark">签名:</view>
					</uni-col>
					<uni-col :span="17" :offset="1">
						<input class="input" name="input" v-model="user.signature" :placeholder="user.signature" />
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
				imageStyles: {
					// width: 62,
					// height: 62,
					// border: {
					// 	radius: '50%'
					// }, 

				},
				name: '',
				fileLists: [{
					url: (this.user.avatar ? ('https://gamebox.zgwit.cn' + this
						.user
						.avatar) : '../../static/avatar.jpg')

				}],

				src: 'https://gamebox.zgwit.cn/static/image/2023/10/19940221.png',
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
			handleSelect(e) {

				const tempFilePaths = e.tempFilePaths;
				uni.uploadFile({
					url: 'https://gamebox.zgwit.cn/api/img/create', //上传图片的后端接口
					filePath: tempFilePaths[0],
					header: {
						'Authorization': 'Bearer ' + uni.getStorageSync('token')
					},
					name: 'file',
					success: res => {
						let msg = res.data
						this.user.avatar = JSON.parse(res.data).data[
							0]

						this.edit()
					}
				})

			},

			handleModel() {
				this.$emit('receiveData')
			},
			edit() {
				this.user.nickname = this.name
				uni.request({
					url: `https://gamebox.zgwit.cn/api/user/${uni.getStorageSync('id')}`,
					method: 'POST',
					data: this.user,
					header: {
						'Content-Type': 'application/json;charset=UTF-8',
						'Authorization': 'Bearer ' + uni.getStorageSync('token')
					},
					success: (item) => {
						uni.showToast({
							title: "提交成功!",
							icon: 'error'
						});
						this.close()
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
					this.user.gender = '男'
				} else {
					this.user.gender = '女'
				}
				console.log(this.user.gender)
			}
		},
		mounted() {
			this.name = this.user.nickname
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


				/deep/ .file-picker__box {
					height: 60px !important;
					width: 60px !important;
					padding: 0px !important;

				}

				/deep/ .file-picker__box-content {

					// border-radius: 50% !important;
					border: none !important;
					box-shadow: 1px 1px rgba(0, 0, 0, 0.3), 2px 2px rgba(0, 0, 0, 0.3s);

				}

				file-picker__box-content span {
					margin-left: 10px;
				}

				image {
					width: 45px;
					height: 45px;
				}

				.photo {

					border-radius: 50%;
					box-shadow: 1px 1px rgba(0, 0, 0, 0.3), 2px 2px rgba(0, 0, 0, 0.3s);
				}

				.edit {
					border-radius: 5px;
					box-sizing: border-box;
					padding: 1px;
					position: absolute;
					bottom: 0;
					right: 0;
					//background-color: rgb(149, 0, 54);
					background-color: seagreen;
					//border-radius: 50%;
					width: 30px;
					height: 30px;
					//border: 2px solid rgb(88, 14, 42);
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
				//background-color: rgb(63, 6, 18);
				background-color: seagreen;
				overflow-y: auto;
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
					font-size: 19px;

					image {
						width: 22px;
						height: 22px;
						background-color: transparent;
						border-radius: 0;
					}
				}

				.input {
					font-size: 19px;
					// border: 1px solid rgb(117, 23, 28);
					//background-color: rgb(47, 0, 17);
					border-radius: 5px;
					//box-shadow: 0 0 15px rgb(97, 19, 37);
					// color: rgb(245, 231, 202);
					//box-sizing: border-box;
					padding: 10px 1px;

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

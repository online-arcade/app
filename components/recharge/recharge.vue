<template>
	<model @receiveData="handleRecharge">


		<view class="chat">

			<view class="operate">

				<view style="display: flex;">
					<image src="../../static/avatar.jpg"></image>
					<view class="infor">
						<span>名称 :{{user.nick_name}}</span>
						<span>余额 :{{user.balance}}</span>
					</view>
				</view>
				<view style="display: flex;">

					<view class="btn" @click="custom(0)">礼包充值</view>
					<view class="btn" @click="custom(1)">自定义充值</view>
				</view>

			</view>
			<view class="mess" v-if="customShow===0">

				<uni-row :gutter="0">
					<uni-col class="shop" :span="8" v-for="(item ,index) in shop">
						<view class="form" @click="cost(item.spend)">
							<span>{{item.name}}</span>
							<image :src="item.url"></image>
							<span>{{item.spend}}</span>
						</view>
					</uni-col>
				</uni-row>


				<uni-popup ref="alertDialog" type="dialog">
					<uni-popup-dialog type="warn" cancelText="关闭" confirmText="同意" title="通知" :content="content"
						@confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
				</uni-popup>
			</view>

			<view class="mess" v-if="customShow===1">

				<form>

					<uni-row class="row">
						<uni-col :span="5" style="text-align: right;">
							<view class="demo-uni-col dark">自定义金额:</view>
						</uni-col>
						<uni-col :span="17" :offset="1">
							<input class="input" name="input" placeholder="1000" v-model="recharge" />
						</uni-col>
					</uni-row>
					<view style="display:flex;justify-content: right;">
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
				shop: [{
						name: '积分100',
						url: '../../static/integral.png',
						spend: '￥ 10'
					},
					{
						name: '积分300',
						url: '../../static/integral.png',
						spend: '￥ 30'
					},
					{
						name: '积分600',
						url: '../../static/integral.png',
						spend: '￥ 60'
					},
					{
						name: '积分900',
						url: '../../static/integral.png',
						spend: '￥ 90'
					},
					{
						name: '积分1200',
						url: '../../static/integral.png',
						spend: '￥ 120'
					},
					{
						name: '积分1500',
						url: '../../static/integral.png',
						spend: '￥ 150'
					}, {
						name: '积分1800',
						url: '../../static/integral.png',
						spend: '￥ 180'
					}, {
						name: '积分2100',
						url: '../../static/integral.png',
						spend: '￥ 210'
					},
				]
			};
		},
		mounted() {
			this.token = JSON.stringify(uni.getStorageSync('token')).replace('{', '').replace('}',
				'');
		},
		methods: {
			handleRecharge() {
				this.$emit('receiveData')
			},
			cost(mess) {
				this.content = "充值" + mess
				this.$refs.alertDialog.open()

			},
			custom(num) {
				// uni.showToast({

				// 	title: "自定义充值",

				// });
				this.customShow = num
			},
			dialogClose() {},
			confirm() {
				if (this.recharge) {

					this.user.balance += Number(this.recharge)

					this.load()

				} else {
					uni.showToast({
						icon: 'error',

						title: '请输入充值金额!',

					});
				}
			},
			dialogConfirm() {

				this.user.balance += Number(this.content.slice(4))
				this.load()
			},

			load() {

				uni.request({
					url: 'http://demo.iot-master.com:8082/api/recharge/create',
					method: 'POST',
					header: {
						'Content-Type': 'application/json;charset=UTF-8',
						'Authorization': this.token
					},
					data: {
						user_id: this.user.id,
						amount: Number(this.recharge)
					},
					success: (item) => {}
				});

				uni.request({
					url: `http://demo.iot-master.com:8082/api/user/${uni.getStorageSync('id')}`,
					method: 'POST',
					header: {
						'Content-Type': 'application/json;charset=UTF-8',
						'Authorization': this.token
					},
					data: this.user,
					success: (item) => {
						uni.showToast({
							title: "充值成功!",
						});
					}
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
			}

			.infor {
				display: flex;
				flex-direction: column;
				margin-left: 10px;
				justify-content: center;
			}

			.btn {

				background-image: linear-gradient(to bottom, rgb(74, 255, 46), rgb(4, 93, 1));
				box-sizing: border-box;
				padding: 7px 15px;
				border-radius: 5px;
				text-shadow: 1px 1px rgba(0, 0, 0, 0.3), 2px 2px rgba(0, 0, 0, 0.3);
				;
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
			background-color: rgb(70, 13, 19);
			overflow: scroll;
			display: flex;
			flex-direction: column;

			.shop {

				box-sizing: border-box;
				padding: 5px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;



				.form {
					width: 50%;
					align-items: center;
					display: flex;
					flex-direction: column;
					background-color: rgb(121, 24, 28);
					border-radius: 6px;
					overflow: hidden;
					box-shadow: 1px 1px rgba(0, 0, 0, 0.3), 2px 2px rgba(0, 0, 0, 0.3), 3px 3px rgba(0, 0, 0, 0.3);
					box-sizing: border-box;
					padding: 3px 0;

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
						text-shadow: 1px 1px rgba(0, 0, 0, 0.3), 2px 2px rgba(0, 0, 0, 0.3);

					}
				}
			}




			.row {
				display: flex;
				align-items: center;
				margin-bottom: 5px;

				.input {
					//	border: 3px solid rgb(117, 23, 28);
					background-color: rgb(47, 0, 17);
					border-radius: 5px;
					box-shadow: 0 0 15px rgb(97, 19, 37);
					// color: rgb(245, 231, 202);
					//box-sizing: border-box;
					padding: 10px;
					width: 100%;
				}
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

		}
	}
</style>

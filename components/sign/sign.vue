<template>
	<view class="content">


		<image src="../../static/close.png" class="close" @click="close"></image>
		<view class="main">
			<view class="container">
				<span class="sum">本月已累计签到{{day}}天</span>
				<view class="sign-box">

					<view class="sign-back">
						<view class="sign-model">

							<view v-for="(item,index) of sign" @click="choose(item,index)">

								<image :src="item.url" :class="{'hide':item.pass}"></image>
								<span> 第{{index+1}}天</span>

							</view>

						</view>
					</view>
				</view>

				<view class="mess">
					<span>每日签到</span>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "sign",
		data() {
			return {
				day: 1,
				sendMess: '',
				sign: [{
						url: '../../static/money (2).png',
						pass: true
					}, {
						url: '../../static/money (2).png',
						pass: false
					},
					{
						url: '../../static/money (2).png',
						pass: false
					},
					{
						url: '../../static/money (2).png',
						pass: false
					},
					{
						url: '../../static/money (2).png',
						pass: false
					},
					{
						url: '../../static/money (2).png',
						pass: false
					},
					{
						url: '../../static/money (2).png',
						pass: false
					},
					{
						url: '../../static/money (2).png',
						pass: false
					},
					{
						url: '../../static/money (2).png',
						pass: false
					},
					{
						url: '../../static/money (2).png',
						pass: false
					},
					{
						url: '../../static/money (2).png',
						pass: false
					},
					{
						url: '../../static/money (2).png',
						pass: false
					},
					{
						url: '../../static/money (2).png',
						pass: false
					},
					{
						url: '../../static/money (2).png',
						pass: false
					},
					{
						url: '../../static/money (2).png',
						pass: false
					}
				]

			};
		},
		methods: {
			close() {
				this.$emit('receiveData')
			},
			show() {

			},

			signVip() {
				uni.showToast({

					title: "充值VIP",
				});
			},
			choose(mess, index) {

				if (mess.pass) {
					uni.showToast({
						icon: 'error',
						title: "已过期!",
					});
				} else {
					this.sign[index].pass = true
					uni.showToast({
						title: "领取成功!",
					});
				}


			}
		}
	}
</script>

<style lang="scss">
	.content {
		font-family: 汉仪正圆-75;
		border: 4px solid rgb(255, 244, 38);
		border-radius: 10px;
		position: relative;
		box-sizing: border-box;
		padding: 5px;

		.close {
			width: 40px;
			height: 40px;
			position: absolute;
			right: -20px;
			top: -16px;
			background-color: rgb(134, 57, 5);
			border-radius: 50%;
		}

		.main {
			box-sizing: border-box;
			border: 2px solid rgb(201, 47, 57);
			background-image: linear-gradient(to bottom, rgb(125, 25, 30), rgb(82, 13, 17));
			border-radius: 5px;
			background-color: rgb(82, 13, 17);
			width: 100%;
			height: 100%;
			padding: 5px;

			.container {

				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				box-sizing: border-box;
				padding: 13px 5px 5px;

				.sum {
					color: rgb(254, 241, 223);
					text-shadow: 1px 1px rgba(0, 0, 0, 0.3), 2px 2px rgba(0, 0, 0, 0.3);
					font-size: 22px;
				}

				.sign-box {
					width: 95%;
					height: 100%;
					background-image: linear-gradient(to bottom, rgb(226, 188, 148), rgb(156, 131, 111));
					border-radius: 5px;
					box-sizing: border-box;
					padding: 4px;

					.sign-back {
						background-color: rgb(248, 225, 194);
						width: 100%;
						height: 100%;
						border-radius: 5px;


						.sign-model {
							width: 100%;
							height: 100%;
							display: grid;
							grid-template-rows: repeat(3, 1fr);
							grid-template-columns: repeat(5, 1fr);
							//grid-row-gap: 10px;
							grid-gap: 10px 30px;
							box-sizing: border-box;
							padding: 5px 40px;


							/* 定义网格项之间的间距 */

							.hide {
								background-color: rgb(129, 120, 112);

								// &::after {
								// 	content: '';
								// 	position: absolute;
								// 	width: 70px;
								// 	height: 70px; 
								// 	background-image: url('../../static/bag.png');
								// }
							}

							view {
								border-radius: 7px;
								background-color: rgb(238, 148, 147);
								box-shadow: 1px 1px rgba(0, 0, 0, 0.3), 2px 2px rgba(0, 0, 0, 0.3), -1px -1px rgba(0, 0, 0, 0.3), -2px -2px rgba(0, 0, 0, 0.3);
								display: flex;
								flex-direction: column;
								justify-content: space-between;
								align-items: center;
								box-sizing: border-box;
								padding: 6px 7px 0px;
								color: white;
								text-shadow: 1px 1px rgba(0, 0, 0, 0.3), 2px 2px rgba(0, 0, 0, 0.3), 3px 3px rgba(0, 0, 0, 0.3);

								//padding: 20px;
								image {
									width: 100%;
									height: 100%; //height: 50px;
									box-shadow: 1px 1px rgba(0, 0, 0, 0.3), 2px 2px rgba(0, 0, 0, 0.3), -1px -1px rgba(0, 0, 0, 0.3), -2px -2px rgba(0, 0, 0, 0.3);
									//	background-color: rgb(249, 242, 220);
									background-color: white;
									box-sizing: border-box;
									padding: 5px 10px;
									border-radius: 5px 5px 0 0;
									margin-bottom: 2px;
								}

								span {
									position: relative;
									top: 2px;
									//background-color: red;
									//width: 100%;
								}
							}
						}

					}

				}
			}


			.mess {
				color: rgb(254, 251, 26);
				font-size: 40px;
				text-shadow: 0 1px rgba(185, 0, 55, 0.8), 0 2px rgba(185, 0, 55, 0.8), 0 3px rgba(185, 0, 55, 0.8), 0 4px rgba(185, 0, 55, 0.8), 0 5px rgba(185, 0, 55, 0.8), 0 6px rgba(185, 0, 55, 0.8), 0 0 7px white, 0 0 12px rgb(212, 21, 157);
				position: absolute;
				left: 50%;
				top: 0;
				transform: translate(-50%, -50%);


			}
		}

	}
</style>

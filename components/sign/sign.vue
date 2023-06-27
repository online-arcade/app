<template>
	<view class="content">
		<image src="../../static/close.png" class="close" @click="close"></image>
		<view class="main">
			<view class="container">

				<view class="model" style="background-image: linear-gradient(to bottom, rgb(237,0,198), rgb(130,0,158));
				 ">
					<view class="free">
						<image src="../../static/free.png" style="width:80px;
						height: 80px;
						 box-shadow: 1px 1px rgba(0, 0, 0, 0.3), 2px 2px rgba(0, 0, 0, 0.3), 3px 3px rgba(0, 0, 0, 0.3);
						"></image>
					</view>

					<view v-for="item in free" :class="{'free':true ,'card-model':true,'pass':item.pass}"
						@click="choose(item.cost,item.pass,0)">
						<view class="image-back">
							<image :src="item.url"></image>
							<span>{{item.cost}}</span>
						</view>

					</view>
				</view>

				<view class="model"
					style="top: 60%;background-image: linear-gradient(to bottom, rgb(248,213,10), rgb(230,183,6));">
					<view class="vip" @click="signVip()">
						<view class="box">
							<image src="../../static/vip.png"></image>
						</view>

					</view>
					<view v-for="item in vip" :class="{'vip':true ,'card-model':true,'pass':item.pass}"
						@click="choose(item.cost,item.pass,1)">
						<view class="image-back">
							<image :src="item.url"></image>
							<span>{{item.cost}}</span>
						</view>
					</view>
				</view>

			</view>

			<view class="day">
				<span style="flex:0.8;"></span> <span style="flex: 1; text-align: center;"
					v-for="item in day">{{item}}</span>
			</view>

			<view class="mess">
				<span>每日签到</span>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "sign",
		data() {
			return {
				day: ['Day1', 'Day2', 'Day3', 'Day4', 'Day5', 'Day6', 'Day7'],
				sendMess: '',
				free: [{
						url: '../../static/money (2).png',
						cost: '1000',
						pass: true
					},
					{
						url: '../../static/money (2).png',
						cost: '2000',
						pass: true
					},
					{
						url: '../../static/money (2).png',
						cost: '3000',
						pass: true
					},
					{
						url: '../../static/money (2).png',
						cost: '4000',
						pass: false
					},
					{
						url: '../../static/money (2).png',
						cost: '5000',
						pass: false
					},
					{
						url: '../../static/money (2).png',
						cost: '6000',
						pass: false
					},
					{
						url: '../../static/money (2).png',
						cost: '7000',
						pass: false
					}
				],
				vip: [{
						url: '../../static/money (2).png',
						cost: '10000',
						pass: true
					},
					{
						url: '../../static/money (2).png',
						cost: '20000',
						pass: true
					},
					{
						url: '../../static/money (2).png',
						cost: '30000',
						pass: true
					},
					{
						url: '../../static/money (2).png',
						cost: '40000',
						pass: false
					},
					{
						url: '../../static/money (2).png',
						cost: '50000',
						pass: false
					},
					{
						url: '../../static/money (2).png',
						cost: '60000',
						pass: false
					},
					{
						url: '../../static/money (2).png',
						cost: '70000',
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
			choose(mess, show, vip) {
				if (vip) {
					uni.showToast({
						icon: 'error',
						title: "你不是VIP用户",
					});
				} else {
					if (show) {
						uni.showToast({
							icon: 'error',
							title: "已过期",
						});
					} else
						uni.showToast({
							title: "领取" + mess,
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
				box-sizing: border-box;
				padding: 5px;

				.model {
					position: absolute;
					width: 105%;
					height: 30%;
					background-color: red;
					top: 15%;
					left: 50%;
					transform: translateX(-50%);
					box-sizing: border-box;
					padding: 5px;
					display: flex;
					border-radius: 7px;
					overflow: hidden;

					.free {
						border-radius: 5px;
						border: 2px solid rgb(176, 0, 149);


					}

					.vip {
						border-radius: 5px;
						border: 2px solid rgb(166, 118, 5);

						.box {
							width: 80px;
							height: 80px;

							image {
								width: 60px;
								height: 60px;
								box-shadow: 1px 1px rgba(0, 0, 0, 0.3), 2px 2px rgba(0, 0, 0, 0.3), 3px 3px rgba(0, 0, 0, 0.3);
							}
						}
					}

					.pass {
						background-color: rgba(87, 0, 107, 0.8)
					}

					.card-model {

						border-left: 0px;
						box-sizing: border-box;
						//padding: 0 10px

					}

					.image-back {
						display: flex;
						flex-direction: column;
						width: 70%;
						background-image: linear-gradient(to bottom, rgb(48, 21, 48), rgb(81, 43, 84));
						box-sizing: border-box;
						padding: 10px 0;
						border-radius: 5px;
						color: white;
						position: relative;
						text-shadow: 1px 1px rgba(185, 0, 55, 0.8), 2px 2px rgba(185, 0, 55, 0.8), 3px 3px rgba(185, 0, 55, 0.8);
						margin: 10px;

						span {
							position: absolute;
							bottom: 0;
						}

						image {
							box-shadow: 0 0 10px white;
							border-radius: 50%;
						}
					}

					image {
						width: 40px;
						height: 40px;

					}

					view {
						flex: 1;
						display: flex;
						justify-content: center;
						align-items: center;
						//	background-image: linear-gradient(to bottom, rgb(234, 14, 211), rgb(105, 0, 138));
						;
					}
				}

			}

			.day {
				position: absolute;
				color: white;
				top: 50%;
				display: flex;
				width: 100%;
				color: rgb(125, 208, 228);
				text-shadow: 1px 1px rgba(0, 0, 0, 0.3), 2px 2px rgba(0, 0, 0, 0.3), 3px 3px rgba(0, 0, 0, 0.3), 4px 4px rgba(0, 0, 0, 0.3), 0 0 5px rgba(0, 0, 0, 0.3);
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

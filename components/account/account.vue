<template>


	<model @receiveData="handleAccount">


		<view class="operate">
			<view class="title">
				<span>我的账户</span>
			</view>


		</view>
		<view class="mess" ref="scrollableDiv">

			<view :class="{'log':true,'read':item.read}" v-for="item in recharge" @click="read(item)">
				<view>
					<view>充值记录</view>
					<span>金额￥ {{item.amount}}</span>
				</view>
				<view>{{item.created}}</view>
			</view>

			<view v-if="!recharge" class="noRecharge" style="  ">
				<image src="../../static/noAccount.png" style="width: 50px;height: 50px;"></image>
				您目前没有消费记录！
			</view>


		</view>
	</model>
</template>

<script>
	export default {

		name: "account",
		props: ['recharge'],
		data() {
			return {
				log: [{
						title: "充值记录",
						note: '金额￥ 99',
						read: false,
						time: '2023-6-26 12:00:00'
					},
					{
						title: "充值记录",
						note: '金额￥ 99',
						read: false,
						time: '2023-6-26 12:00:00'
					},
					{
						title: "充值记录",
						note: '金额￥ 99',
						read: false,
						time: '2023-6-26 12:00:00'
					},
					{
						title: "充值记录",
						note: '金额￥ 99',
						read: false,
						time: '2023-6-26 12:00:00'
					},
					{
						title: "充值记录",
						note: '金额￥ 99',
						read: false,
						time: '2023-6-26 12:00:00'
					}
				],
				sendMess: '',

			};
		},
		methods: {
			handleAccount() {
				this.$emit('receiveData')
			},
			read(item) {
				item.read = true
				uni.showToast({
					title: '已读!',
				});

			}
		}
	}
</script>

<style lang="scss">
	.chat {
		.operate {
			display: flex;
			color: white;

			.title {
				background-color: rgb(255, 244, 38);
				box-sizing: border-box;
				padding: 5px;
				color: rgb(254, 251, 26);
				font-size: 25px;
				text-shadow: 0 1px rgba(185, 0, 55, 0.8), 0 2px rgba(185, 0, 55, 0.8), 0 3px rgba(185, 0, 55, 0.8), 0 4px rgba(185, 0, 55, 0.8), 0 5px rgba(185, 0, 55, 0.8), 0 6px rgba(185, 0, 55, 0.8), 0 0 7px white, 0 0 12px rgb(212, 21, 157);
				position: absolute;
				left: 50%;
				top: 0;
				transform: translate(-50%, -50%);
				border-radius: 10px;

				span {
					background-color: rgb(123, 25, 30);
					border-radius: 10px;
					box-sizing: border-box;
					padding: 1px 10px;
				}
			}

			image {
				width: 50px;
				height: 50px;
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
			//color: white;
			margin-top: 15px;
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

			.log {
				color: lightgray;
				text-shadow: 1px 1px rgba(0, 0, 0, 0.3), 2px 2px rgba(0, 0, 0, 0.3), 3px 3px rgba(0, 0, 0, 0.3);
				box-shadow: 1px 1px rgba(0, 0, 0, 0.3), 2px 2px rgba(0, 0, 0, 0.3), 3px 3px rgba(0, 0, 0, 0.3);

				background-image: linear-gradient(to right, rgb(121, 24, 29), rgb(170, 13, 17));
				width: 100%;
				height: 70px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				box-sizing: border-box;
				padding: 10px;
				border-radius: 5px;
				margin-bottom: 5px;
			}

			.read {
				background-image: linear-gradient(to right, rgba(121, 24, 29, 0.3), rgba(170, 13, 17, 0.3));
			}

			.noRecharge {
				align-items: center;
				color: rgb(195, 41, 61);
				display: flex;
				flex-direction: column;
				justify-content: center;
				font-size: 20px;
				height: 100%;
			}
		}


	}
</style>

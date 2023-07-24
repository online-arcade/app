<template>
	<model @receiveData="handleEmail">

		<view class="contain">

			<view class="operate">

				<view class="title">

					<span>我的邮件</span>
				</view>


			</view>
			<view class="mess" ref="scrollableDiv">

				<view :class="{'log':true,'read':item.read}" v-for="item in email" @click="read(item)">
					<view>
						<view>邮件主题:{{item.title}}</view>
						<span>{{item.content}}</span>
					</view>
					<view>{{item.created}}</view>
				</view>
				<view v-if="!email" class="noEmail">
					<image src="../../static/noEmail.png" style="width: 50px;height: 50px;"></image>
					您目前没有邮件！
				</view>
			</view>
		</view>
	</model>
</template>

<script>
	export default {

		name: "email",
		props: ['email'],
		data() {
			return {
				log: [{
						title: "邮件1",
						note: '游戏更新奖励：20金币',
						time: '2023-6-26 12:00:00',
						read: false
					},
					{
						title: "邮件2",
						note: '活动结算奖励：20金币',
						time: '2023-6-26 12:00:00',
						read: false
					},
					{
						title: "邮件3",
						note: '活动结算奖励：20金币',
						time: '2023-6-26 12:00:00',
						read: false
					},
					{
						title: "邮件4",
						note: '活动结算奖励：20金币',
						time: '2023-6-26 12:00:00',
						read: false
					},
					{
						title: "邮件5",
						note: '活动结算奖励：20金币',
						time: '2023-6-26 12:00:00',
						read: false
					}
				],
				sendMess: '',

			};
		},

		mounted() {
			//this.load()
		},
		methods: {
			handleEmail() {
				this.$emit('receiveData')
			},
			read(item) {
				item.read = true
				uni.showToast({
					title: '已读!',
				});

			},
			load() {

				uni.request({ //邮件
					url: '/api/email/list',
					method: 'GET',
					success: (item) => {
						console.log(item)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.contain {

		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		padding: 5px;

		.operate {
			display: flex;
			color: white;

			//	justify-content: space-between;
			//height: 50px;
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


		}



		.mess {
			//color: white;
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

			.noEmail {
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

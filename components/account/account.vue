<template>
	<view class="content">
		<image src="../../static/close.png" class="close" @click="close"></image>
		<view class="main">


			<view class="container">

				<view class="operate">


					<span>我的账户</span>

				</view>
				<view class="mess" ref="scrollableDiv">

					<view class="log" v-for="item in log">
						<view>
							<view>{{item.title}}</view>
							<span>{{item.note}}</span>
						</view>
						<view>{{item.time}}</view>
					</view>
					<!-- 	<uni-list style="background-color: transparent;">
						<uni-list-item v-for="item in log" :title='item.title' :note="item.note" clickable
							@click="goto('alarmDetail')" showArrow showExtraIcon :rightText="item.time" />
					</uni-list> -->





				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {

		name: "account",
		data() {
			return {
				log: [{
						title: "充值记录",
						note: '金额￥ 99',
						time: '2023-6-26 12:00:00'
					},
					{
						title: "充值记录",
						note: '金额￥ 99',
						time: '2023-6-26 12:00:00'
					},
					{
						title: "充值记录",
						note: '金额￥ 99',
						time: '2023-6-26 12:00:00'
					},
					{
						title: "充值记录",
						note: '金额￥ 99',
						time: '2023-6-26 12:00:00'
					},
					{
						title: "充值记录",
						note: '金额￥ 99',
						time: '2023-6-26 12:00:00'
					}
				],
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
			}
		}
	}
</script>

<style lang="scss">
	// .uni-list {
	// 	background-color: #f2f2f2;
	// 	/* 设置背景颜色为浅灰色 */
	// }


	.content {

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
				box-sizing: border-box;
				padding: 5px;

				.operate {
					display: flex;
					color: white;

					span {
						color: rgb(254, 251, 26);
						font-size: 40px;
						text-shadow: 0 1px rgba(185, 0, 55, 0.8), 0 2px rgba(185, 0, 55, 0.8), 0 3px rgba(185, 0, 55, 0.8), 0 4px rgba(185, 0, 55, 0.8), 0 5px rgba(185, 0, 55, 0.8), 0 6px rgba(185, 0, 55, 0.8), 0 0 7px white, 0 0 12px rgb(212, 21, 157);
						position: absolute;
						left: 50%;
						top: 0;
						transform: translate(-50%, -50%);
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


				}
			}
		}

	}
</style>

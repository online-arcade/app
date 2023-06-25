<template>
	<view class="content">
		<image src="../../static/close.png" class="close" @click="close"></image>
		<view class="main">


			<view class="container">

				<view class="operate">

					<input class="send" v-model="sendMess" placeholder="请输入要发送的讯息" />
					<image src="../../static/send.png" @click="send"></image>
					<image src="../../static/redbag.png"></image>
				</view>
				<scroll-view class="mess" ref="scrollableDiv" scroll-y=true :scroll-top="scrollTop"
					:scroll-with-animation="true">

					<!-- <view class="informate ">
						<image src="../../static/boy.png"></image>
						<view class="showMess">

							<span class="title">姓名</span>

							<span class="item">mess</span>
						</view>
					</view>
 -->
					<view class="informate " v-for="(item,index) of mess" :style="{justifyContent: item.float}">

						<view v-if="item.float==='left'" style="display: flex;">
							<image src="../../static/boy.png"></image>
							<view class="showMess">

								<span class="title" :style="{textAlign:item.float}">{{item.name}}</span>

								<span class="item">{{item.data}}</span>
							</view>

						</view>
						<view v-else style="display: flex;">

							<view class="showMess">

								<span class="title" :style="{textAlign:item.float}">{{item.name}}</span>

								<span class="item">{{item.data}}</span>
							</view>
							<image src="../../static/boy.png"></image>
						</view>


					</view>


				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "chat",
		data() {
			return {
				sendMess: '',
				scrollTop: 0,
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
				this.scrollTop += 300
				this.mess.push({
					name: '张三',
					data: this.sendMess,
					float: 'left'
				})

				//this.scrollTop = this.scrollTop === 0 ? 600 : 600

				//this.$refs.scrollableDiv.scrollTop = this.$refs.scrollableDiv.scrollHeight;
			}
		}
	}
</script>

<style lang="scss">
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
					justify-content: space-between;
					//height: 50px;

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
					scroll-margin-bottom: 0;
					//scroll-margin-top: 600px;
					display: flex;
					flex-direction: column;

					image {
						background-color: white;
						border-radius: 50%;
						width: 30px;
						height: 30px;
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

	}
</style>

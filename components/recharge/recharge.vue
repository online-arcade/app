<template>
	<view class="content">
		<image src="../../static/close.png" class="close" @click="close"></image>
		<view class="main">


			<view class="container">

				<view class="operate">

					<view style="display: flex;">
						<image src="../../static/avatar.jpg"></image>
						<view class="infor">
							<span>名称 :{{account.name}}</span>
							<span>余额 :{{account.money}}</span>
						</view>
					</view>

					<view class="btn" @click="custom()">自定义充值</view>
				</view>
				<view class="mess">

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



			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "recharge",
		data() {
			return {
				account: {
					name: '张三',
					money: 100
				},
				content: '',
				sendMess: '',
				shop: [{
						name: '天降黄金',
						url: '../../static/money (2).png',
						spend: '￥ 19'
					},
					{
						name: '大量黄金',
						url: '../../static/money (2).png',
						spend: '￥ 49'
					},
					{
						name: '巨量黄金',
						url: '../../static/money (2).png',
						spend: '￥ 99'
					},
					{
						name: '小福袋',
						url: '../../static/bag.png',
						spend: '￥ 30'
					},
					{
						name: '中福袋',
						url: '../../static/bag.png',
						spend: '￥ 60'
					},
					{
						name: '大福袋',
						url: '../../static/bag.png',
						spend: '￥ 120'
					}
				]
			};
		},
		methods: {
			close() {
				this.$emit('receiveData')
			},
			cost(mess) {
				this.content = "充值" + mess
				this.$refs.alertDialog.open()

			},
			custom() {
				uni.showToast({

					title: "自定义充值",

				});

			},
			dialogClose() {},
			dialogConfirm() {
				//console.log(this.content.slice(4))
				uni.showToast({

					title: this.content + '成功!',

				});
				this.account.money += Number(this.content.slice(4))
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
				}
			}
		}

	}
</style>

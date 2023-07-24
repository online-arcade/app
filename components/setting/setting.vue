<template>
	<model @receiveData="handleSet">

		<view class="container">

			<view class="operate">
				<view class="title">
					<span>我的设置</span>
				</view>

				<view v-for="item in data" :class="{'font':true,'font-click':item.click}" @click="show(item.name)">
					{{item.name}}

				</view>


			</view>
			<view class="mess">
				<view v-for="item in data" v-if="item.click">
					<view v-if="item.name==='操作设置'">{{item.mess}}</view>
					<view v-if="item.name==='渲染'" style="display: flex;flex-direction: column;">
						<span style="border-bottom: 2px solid rgb(93,16,21);margin-bottom: 5px;">渲染</span>
						<span style="display: flex;justify-content: center;align-items: center;text-shadow:0 0 0">分辨率:
							<uni-data-select :localdata="select" @change="change"
								style="box-sizing: border-box;padding: 10px;color: black;">
							</uni-data-select></span>
					</view>
					<view v-if="item.name==='更多'">{{item.mess}}</view>
					<view style="display: flex;flex-direction: column;" v-if="item.name==='音量'">
						<span style="border-bottom: 2px solid rgb(93,16,21);margin-bottom: 5px;">声音</span>
						<span>静音模式</span>
						<span style="display: flex; justify-content: center;align-items: center;">
							<span style="width: 30%; "> 音效</span>
							<image src="../../static/volume-dowm.png" style="width: 30px;height: 30px;"
								@click="volume--">
							</image>
							<progress :percent="volume" show-info stroke-width="3" style="flex: 1;" />
							<image src="../../static/volume-up.png" style="width: 30px;height: 30px;" @click="volume++">
							</image>
						</span>
						<span style="display: flex; justify-content: center;align-items: center;">
							<span style="width: 30%; "> 音量</span>
							<image src="../../static/volume-dowm.png" style="width: 30px;height: 30px;"
								@click="sound--">
							</image>

							<!-- <view style="   flex: 1; display: flex; ">
								<slider :value="sound" activeColor="#FFCC33" backgroundColor="white"
									block-color="#8A6DE9" block-size="16" style="width: 100%;color: white;"
									show-value />


							</view> -->
							<progress :percent="sound" show-info stroke-width="3" style="flex: 1;" />
							<image src="../../static/volume-up.png" style="width: 30px;height: 30px;" @click="sound++">
							</image>
						</span>
					</view>
				</view>




			</view>
		</view>
	</model>
</template>

<script>
	export default {
		name: "setting",
		data() {
			return {
				sendMess: '',
				select: [{
						value: 0,
						text: "1920×1080(推荐)"
					},
					{
						value: 1,
						text: "1680×1050"
					},
					{
						value: 2,
						text: "1600×500"
					},
				],
				data: [{
						name: '音量',
						click: true,
						mess: '音量设置'
					},
					{
						name: '操作设置',
						click: false,
						mess: '操作设置'
					},
					{
						name: '渲染',
						click: false,
						mess: '渲染设置'
					},
					{
						name: '更多',
						click: false,
						mess: '更多设置'
					}
				],
				mess: ['音量设置',
					'操作设置',
					'分辨率设置',
					'更多'
				],
				volume: 0,
				sound: 0
			};
		},
		methods: {
			handleSet() {
				this.$emit('receiveData')
			},
			show(mes) {
				this.data.filter(item => {
					if (item.name === mes) {
						item.click = !item.click
					} else item.click = false
				})
			},
			cs() {
				this.volume++
			}
		}
	}
</script>

<style lang="scss">
	.container {

		width: 100%;
		height: 100%;
		display: flex;

		box-sizing: border-box;
		padding: 12px 5px 5px;

		.operate {
			display: flex;
			flex-direction: column;
			color: white;
			width: 30%;
			box-sizing: border-box;
			padding: 5px;

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


			.font {
				text-align: center;
				width: 100%;
				border-radius: 5px;
				background-image: linear-gradient(to bottom, rgb(248, 231, 75), rgb(205, 121, 11));
				// background-color: rgb(205, 123, 9);
				box-sizing: border-box;
				padding: 7px;
				margin-bottom: 5px;
				position: relative;

			}

			.font-click {
				//box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
				box-shadow: 0 0 15px rgba(205, 123, 9, 0.5);
				// border: 1px solid rgb(205, 123, 9);
				// box-sizing: border-box;
				color: yellow;
			}
		}

		.mess {
			color: white;
			//margin-top: 10px;
			box-sizing: border-box;
			padding: 10px;
			flex: 1;
			width: 100%;
			height: 100%;
			border-radius: 7px;
			background-color: rgb(70, 13, 19);
			display: flex;
			flex-direction: column;
			text-shadow: 1px 1px rgba(0, 0, 0, 0.3), 2px 2px rgba(0, 0, 0, 0.3), 3px 3px rgba(0, 0, 0, 0.3);
		}




	}
</style>

<script>
	import screenfull from "screenfull";
	export default {

		onLaunch: function(options) {

			// 判断微信浏览器
			if (options.platform === 'wechat') {
				// 调用微信接口，请求旋转屏幕权限
				wx.setScreenOrientation({
					screenOrientation: 'landscape',
					success(res) {
						console.log('屏幕横向显示成功');
					},
					fail(err) {
						console.error('屏幕横向显示失败', err);
					}
				});
			}
			// 其他初始化逻辑
		},


		onShow: function() {
			// plus.screen.lockOrientation('landscape');
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		mounted() {
			// if (!screenfull.isEnabled) { 
			// 	// 如果不支持进入全屏，发出不支持提示
			// 	uni.showToast({
			// 		icon: '您的浏览器版本过低不支持全屏显示！',

			// 		title: '请输入充值金额!',

			// 	}); 
			// 	return false;
			// }
			// if (screenfull.isEnabled) {
			// 	console.log('1')
			// 	screenfull.toggle(); // 切换全屏状态
			// }
			//此处填入需要全屏的ref属性值即可
			// screenfull.toggle(this.$refs.mapbox);
			// this.$nextTick(() => {
			//   this.rotateBox();
			// }); 
		},
		created() {
			//禁止竖屏显示
			window.addEventListener('resize', () => {
				if (window.innerHeight > window.innerWidth) {
					//document.documentElement.style.transform = 'rotate(90deg)';
					// document.documentElement.style.width = '100vw';
					// document.documentElement.style.height = '100vh';
					// document.documentElement.style.marginLeft = '100vw';
					// document.documentElement.style.transformOrigin = 'left top';
				} else {

					//document.documentElement.style.transform = 'rotate(0deg)'; 
					// width: 100vh;
					// height: 100vw;
					// margin-left: 100vw;
					// transform: rotate(90deg);
					// transform-origin: left top;
				}
			});
		}
	}
</script>

<style>
	/*每个页面公共css */
	@font-face {
		font-family: 'font';
		src: url('static/font.ttf');
	}

	html,
	body {
		-webkit-user-select: none;
		-webkit-touch-callout: none;
		-webkit-text-size-adjust: 100%;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		-webkit-transform: rotate(0deg);
		-moz-transform: rotate(0deg);
		-o-transform: rotate(0deg);
		-ms-transform: rotate(0deg);
		transform: rotate(0deg);
		-webkit-transform-origin: left top;
		-moz-transform-origin: left top;
		-o-transform-origin: left top;
		-ms-transform-origin: left top;
		transform-origin: left top;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
</style>

<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		created() {
			// 禁止竖屏显示
			window.addEventListener('resize', () => {
				if (window.innerHeight > window.innerWidth) {
					document.documentElement.style.transform = 'rotate(90deg)';
				} else {
					document.documentElement.style.transform = 'rotate(0deg)';
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

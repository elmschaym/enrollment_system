<template>
	<div class="wrap-a">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		created() {	
			//window.nw.Window.get().setResizable(false);
			//window.nw.Window.get().setMaximumSize();
			//console.log(window.screen.availWidth, window.screen.availHeight);
			if (window.screen.availWidth > 1900) {
				window.nwWin.resizeTo(1500, 800);
				window.nwWin.zoomLevel = 1.1;
			}
			window.nwWin.setPosition("center");
		}
	}
</script>


<style scoped>
	.wrap-a { height: 100%; background-color: rgba(0,0,0,0); pointer-events: auto; box-shadow: 0 4px 9px rgba(0,0,0,0.5); }
</style>
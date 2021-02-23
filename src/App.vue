<template>
	<div class="_wrp-app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		created() {
			/**if (this.$route.query.hasOwnProperty('chech_width') && window.screen.availWidth > 1900) {
				if (window.nwWin.zoomLevel != 1.1) {
						window.nwWin.width = 1500;
						window.nwWin.height = 800;
						window.nwWin.setMinimumSize(1500, 800);
						window.nwWin.zoomLevel = 1.1;
				}
			} **/
		}
	}
</script>


<style scoped>
	._wrp-app { height: 100%; background-color: rgba(0,0,0,0); pointer-events: auto; }
</style>
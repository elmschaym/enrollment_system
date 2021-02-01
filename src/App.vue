<template>
	<div class="wrap-a">
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
	.wrap-a { height: 100%; background-color: rgba(0,0,0,0); pointer-events: auto; box-shadow: 0 4px 9px rgba(0,0,0,0.5); }
</style>
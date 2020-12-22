<template>
	<div style="height: 100%; background-color: rgba(0,0,0,0); pointer-events: auto;">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		created() {	
			//window.nw.Window.get().setResizable(false);
			//window.nw.Window.get().setMaximumSize(window.screen.availWidth, window.screen.availHeight);
		}
	}
</script>


<style scoped>
</style>
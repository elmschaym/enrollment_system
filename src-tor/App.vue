<template>
	<div class="_wrp-app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		created() {
			let api_config = this.$storageGet('api_config', 'local') || {};
			if (api_config.hasOwnProperty('server')) {
				this.$http.defaults.baseURL = api_config.server;
			} else {
				this.$storageSet("api_config", { protocol: "2", server: "http://127.0.0.1:8000"}, 'local');
			}
		}
	}
</script>


<style scoped>
	._wrp-app { height: 100%; background-color: rgba(0,0,0,0); pointer-events: auto; }
</style>
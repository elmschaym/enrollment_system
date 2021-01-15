<template>
	<div class="wrap-a">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		created() {	
		}
	}
</script>


<style scoped>
	.wrap-a { height: 100%; background-color: rgba(0,0,0,0); pointer-events: auto; box-shadow: 0 4px 9px rgba(0,0,0,0.5); }
</style>
<template>
	<div style="height: 100%; background-color: rgba(0,0,0,0); pointer-events: auto;">
		<router-view></router-view>
	</div>
</template>

<script>
export default {}
</script>


<style scoped>
	.slide-enter-active { -webkit-transition: all 1000ms ease; }
	.slide-leave-active { -webkit-transition: all 1000ms cubic-bezier(1.0, 0.5, 0.8, 1.0); }
	.slide-enter, .slide-leave-to { -webkit-transform: translateX(100%); opacity: 0; }
</style>
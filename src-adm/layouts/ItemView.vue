<template>
	<div class="w">
		<title-bar :winButtons="[1,0,0]" :hasMenu="false"></title-bar>
		<div class="m">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import TitleBar from '@/components/TitleBar.vue';
	import StatusBar from '@/components/StatusBar.vue';

	import 'vue-awesome/icons/th-large';
	import 'vue-awesome/icons/cog';
	import 'vue-awesome/icons/bell';
	import 'vue-awesome/icons/user-circle';


	export default {
		components: {
			TitleBar,
			StatusBar
		},
		data() {
			return {
				sconName: 'dbd-index',
			}
		},
		methods: {
			goScon(name) {
				this.sconName = name;
				this.$router.push({ name });
			}
		},
		mounted() {
			this.sconName = this.$route.name;
		}
	}
</script>

<style scoped>
	div.w { height: 100vh; background: #fff; box-sizing: border-box; border-radius: 5px; }
		
	div.m {}
</style>

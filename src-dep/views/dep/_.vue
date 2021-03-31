<template>
	<div class="_wrp_dep">
		<title-bar-dep @showMenu="menuModal"></title-bar-dep>
		<div class="_wrp_dep_view">
			<sidecon-dep></sidecon-dep>
			<div class="view">
				<div class="view_wrap">
					<router-view></router-view>
					<status-bar></status-bar>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import TitleBarDep from '@/components/TitleBarDep.vue';
	import SideconDep from '@/components/SideconDep.vue';
	import StatusBar from '@/components/StatusBar.vue';

	export default {
		components: {
			TitleBarDep,
			StatusBar,
			SideconDep
		},
		data() {
			return {
				showMenu: false,
				menuName: ''
			}
		},
		methods: {
			menuModal(v) {
				this.showMenu = !this.showMenu;
				this.menuName = v;
			},
			menuClose() {
				this.showMenu = false;
			}
		}
	} 
</script>

<style scoped>
	._wrp_dep { height: inherit; background-color: #fff }

	._wrp_dep_view { height: 100%; display: grid; grid-template-columns: 28px auto; }

	.view { height: inherit; position: relative; }
	.view_wrap { height: calc(100% - 28px); display: grid; grid-template-rows: auto 24px; }
</style>

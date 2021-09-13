<template>
	<div class="_wrp_ins">
		<title-bar-tor @showMenu="menuModal"></title-bar-tor>
		<div class="_wrp_ins_view">
			<sidecon-tor></sidecon-tor>
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
	import TitleBarTor from '@/components/TitleBarTor.vue';
	import SideconTor from '@/components/SideconTor.vue';
	import StatusBar from '@/components/StatusBar.vue';

	export default {
		components: {
			TitleBarTor,
			StatusBar,
			SideconTor
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
	._wrp_ins { height: inherit; background-color: #fff }

	._wrp_ins_view { height: 100%; display: grid; grid-template-columns: 28px auto; }

	.view { height: inherit; position: relative; }
	.view_wrap { height: calc(100% - 28px); display: grid; grid-template-rows: auto 24px; }
</style>

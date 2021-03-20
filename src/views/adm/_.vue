<template>
	<div class="_wrp_reg">
		<title-bar-reg @showMenu="menuModal"></title-bar-reg>
		<div class="_wrp_reg_view">
			<sidecon-adm></sidecon-adm>
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
	import TitleBarReg from '@/components/TitleBarReg.vue';
	import SideconAdm from '@/components/SideconAdm.vue';
	import StatusBar from '@/components/StatusBar.vue';
	import OMenuReg from '@/components/OMenuReg.vue';

	export default {
		components: {
			TitleBarReg,
			StatusBar,
			SideconAdm,
			OMenuReg
		},
		data() {
			return {
				showMenu: false,
				menuName: '',
				names: {
					create: { name: 'Create New Instance' },
					lister: { name: 'Master List' },
					assign: { name: 'Program Manager' },
					tools: { name: 'Tools' },
				}
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
	._wrp_reg { height: inherit; background-color: #fff }

	._wrp_reg_view { height: 100%; display: grid; grid-template-columns: 28px auto; }

	.view { height: inherit; position: relative; }
	.view_wrap { height: calc(100% - 28px); display: grid; grid-template-rows: auto 24px; }
</style>

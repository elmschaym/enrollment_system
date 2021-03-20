<template>
	<div class="_wrp_ins">
		<title-bar-ins @showMenu="menuModal"></title-bar-ins>
		<div class="_wrp_ins_view">
			<side-con dashboard="ins-index"></side-con>
			<div class="view">
				<div class="view_wrap">
					<router-view></router-view>
					<status-bar></status-bar>
				</div>
				<o-menu-reg :menus="menus[menuName]" :menuName="names[menuName].name" v-if="showMenu" @menuClose="menuClose"></o-menu-reg>
			</div>
		</div>
	</div>
</template>

<script>
	import TitleBarIns from '@/components/TitleBarIns.vue';
	import SideCon from '@/components/SideCon.vue';
	import StatusBar from '@/components/StatusBar.vue';
	import OMenuReg from '@/components/OMenuReg.vue';

	export default {
		components: {
			TitleBarIns,
			StatusBar,
			SideCon,
			OMenuReg
		},
		data() {
			return {
				showMenu: false,
				menuName: '',
				menus: {
					tools: [
						{ name: 'Handled Subjects', icon: 'braille', link: 'ins-index' },
						{ name: 'Enter Grades', icon: 'eraser', link: 'ins-enter-grades' }
					]
				},
				names: {
					create: { name: 'Create New Instance' },
					lister: { name: 'Master List' },
					assign: { name: 'Enrollment Manager' },
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
	._wrp_ins { height: inherit; background-color: #fff }

	._wrp_ins_view { height: 100%; display: grid; grid-template-columns: 28px auto; }

	.view { height: inherit; position: relative; }
	.view_wrap { height: calc(100% - 28px); display: grid; grid-template-rows: auto 24px; }
</style>

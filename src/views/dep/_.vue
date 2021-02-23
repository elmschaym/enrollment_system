<template>
	<div class="_wrp_dep">
		<title-bar-dep @showMenu="menuModal"></title-bar-dep>
		<div class="_wrp_dep_view">
			<side-con dashboard="dep-index"></side-con>
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
	import TitleBarDep from '@/components/TitleBarDep.vue';
	import SideCon from '@/components/SideCon.vue';
	import StatusBar from '@/components/StatusBar.vue';
	import OMenuReg from '@/components/OMenuReg.vue';

	export default {
		components: {
			TitleBarDep,
			StatusBar,
			SideCon,
			OMenuReg
		},
		data() {
			return {
				showMenu: false,
				menuName: '',
				menus: {
					create: [
						{ name: 'Enrollee', icon: 'address-book', link: 'dep-enr-new-enrollee' },
						{ name: 'Room', icon: 'columns', link: 'dep-roo-new-room' },
						{ name: 'Section', icon: 'crop', link: 'dep-sec-new-section' }
					],
					lister: [
						{ name: 'Enrollees', icon: 'id-card', link: 'dep-enr-master-list' },
						{ name: 'Faculties', icon: 'users', link: 'dep-fac-master-list' }
					],
					assign: [
						{ name: 'Student Subjects', icon: 'braille', link: 'dep-set-subject' }
					],
					tools: [
						{ name: 'Generate Prospectus', icon: 'clone', link: 'dep-gen-prospectus' }
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
	._wrp_dep { height: inherit; background-color: #fff }

	._wrp_dep_view { height: 100%; display: grid; grid-template-columns: 28px auto; }

	.view { height: inherit; position: relative; }
	.view_wrap { height: calc(100% - 28px); display: grid; grid-template-rows: auto 24px; }
</style>

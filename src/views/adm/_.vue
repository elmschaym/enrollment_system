<template>
	<div class="_wrp_reg">
		<title-bar-reg @showMenu="menuModal"></title-bar-reg>
		<div class="_wrp_reg_view">
			<side-con dashboard="adm-index"></side-con>
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
	import TitleBarReg from '@/components/TitleBarReg.vue';
	import SideCon from '@/components/SideCon.vue';
	import StatusBar from '@/components/StatusBar.vue';
	import OMenuReg from '@/components/OMenuReg.vue';

	export default {
		components: {
			TitleBarReg,
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
						{ name: 'Admittee', icon: 'id-card', link: 'adm-new-admittee' },
						{ name: 'Subject', icon: 'book', link: 'sub-create' },
						{ name: 'Course', icon: 'book-reader', link: 'cou-create' },
						{ name: 'Student', icon: 'address-book', link: 'adm-new-student' },
					],
					lister: [
						{ name: 'Students', icon: 'address-book', link: 'adm-list-stu-master' },
						{ name: 'Admittees', icon: 'id-card', link: 'adm-list-adm-master' },
						{ name: 'Courses', icon: 'book-reader', link: 'cou-master-list' }
					],
					assign: [
						{ name: 'Subject Requisites', icon: 'map-signs', link: 'sub-assign-xreq' },
						{ name: 'Course Programme', icon: 'map', link: 'cou-assign-subj' }
					],
					tools: [
						{ name: 'Generate Prospectus', icon: 'clone', link: 'cou-view-prospectus' },
						{ name: 'COR', icon: 'suitcase', link: 'adm-confirm-registration' },
						{ name: 'Grade Slip', icon: 'sticky-note', link: 'adm-grade-slip' },
						{ name: 'Student Evaluation', icon: 'industry', link: 'adm-student-evaluation' }
					]
				},
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

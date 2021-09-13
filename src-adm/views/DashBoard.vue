<template>
	<div class="_wrp_dep">
		<title-bar-reg></title-bar-reg>
		<div class="_wrp_dep_view">
			<sidecon-adm></sidecon-adm>
			<div class="view">
				<div class="view_wrap">
					<div class="m">
						<div class="modu">
							<div v-for="m in menus" :key="m.link" @click="$router.push({ name: m.link })">
								<div>
									<v-icon :name="m.icon"></v-icon>
									<span>{{ m.name }}</span>
								</div>
							</div>
						</div>
					</div>
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
	import UILoader from '../components/UILoader.vue';

	import 'vue-awesome/icons/th-large';
	import 'vue-awesome/icons/cog';
	import 'vue-awesome/icons/bell';
	import 'vue-awesome/icons/user-circle';
	import 'vue-awesome/icons/wrench';
	import 'vue-awesome/icons/file';
	import 'vue-awesome/icons/list-ul';
	import 'vue-awesome/icons/clipboard';
	import 'vue-awesome/icons/square';
	import 'vue-awesome/icons/id-card';
	import 'vue-awesome/icons/book';
	import 'vue-awesome/icons/book-reader';
	import 'vue-awesome/icons/address-book';
	import 'vue-awesome/icons/clone';
	import 'vue-awesome/icons/industry';
	import 'vue-awesome/icons/map-signs';
	import 'vue-awesome/icons/map';
	import 'vue-awesome/icons/crop';
	import 'vue-awesome/icons/braille';
	import 'vue-awesome/icons/users';
	import 'vue-awesome/icons/suitcase';
	import 'vue-awesome/icons/columns';
	import 'vue-awesome/icons/sticky-note';
	import 'vue-awesome/icons/anchor';
	import 'vue-awesome/icons/eraser';
	import 'vue-awesome/icons/sitemap';

	export default {
		components: {
			UiLoader: UILoader,
			TitleBarReg,
			StatusBar,
			SideconAdm
		},
		data() {
			return {
				menus: [
					{ name: 'New Admittee', icon: 'id-card', link: 'adm-create-admittee' },
					{ name: 'New Student', icon: 'address-book', link: 'adm-create-student' },
					{ name: 'New Subject', icon: 'book', link: 'adm-create-subject' },
					{ name: 'New Course', icon: 'book-reader', link: 'adm-create-course' },
					{ name: 'Students List', icon: 'address-book', link: 'adm-list-stu-master' },
					{ name: 'Admittees List', icon: 'id-card', link: 'adm-list-adm-master' },
					{ name: 'Courses List', icon: 'book-reader', link: 'adm-list-cou-master' },
					{ name: 'Subject Requisites', icon: 'map-signs', link: 'adm-assign-sub-xreq' },
					{ name: 'Course Programme', icon: 'map', link: 'adm-assign-cou-subj' },
					{ name: 'Generate Prospectus', icon: 'clone', link: 'adm-tool-view-prospectus' },
					{ name: 'COR', icon: 'suitcase', link: 'adm-tool-confirm-registration' },
					{ name: 'Grade Slip', icon: 'sticky-note', link: 'adm-tool-grade-slip' }
				]
			}
		},
		methods: {
		},
		mounted() {
			if (this.$route.query.hasOwnProperty('set_dimen')) {
				this.$sleep(1500).then(() => {
					window.nwWin.show();
				});
			}
			this.$store.commit('setModuleName', 'Dashboard');
		}
	}
</script>

<style scoped>
	._wrp_dep { height: inherit; background-color: #fff }

	._wrp_dep_view { height: 100%; display: grid; grid-template-columns: 28px auto; }

	.view { height: inherit; position: relative; }
	.view_wrap { height: calc(100% - 28px); display: grid; grid-template-rows: auto 24px; }

	.m { display: flex; align-items: center; justify-content: center;  }
	.m .modu { width: auto; display: grid; grid-template-columns: 160px 160px 160px 160px;  }
	.m .modu > div { padding: 10px;  }
	.m .modu > div div { text-align: center; padding: 5px; box-shadow: 0 1px 1px rgba(0,0,0,0.15); }
	.m .modu > div div svg { height: 64px; width: 64px; color: #404040; }
	.m .modu > div div span { display: block; font-size: 12px; color: #222; text-align: center }
	.m .modu > div div:hover svg { color: #606060; }
</style>

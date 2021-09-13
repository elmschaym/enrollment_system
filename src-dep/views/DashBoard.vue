<template>
	<div class="_wrp_dep">
		<title-bar-dep></title-bar-dep>
		<div class="_wrp_dep_view">
			<sidecon-dep></sidecon-dep>
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
	import TitleBarDep from '@/components/TitleBarDep.vue';
	import SideconDep from '@/components/SideconDep.vue';
	import StatusBar from '@/components/StatusBar.vue';
	import UILoader from '../components/UILoader.vue';

	import 'vue-awesome/icons/search';
	import 'vue-awesome/icons/user';
	import 'vue-awesome/icons/id-card';
	import 'vue-awesome/icons/th-large';
	import 'vue-awesome/icons/cog';
	import 'vue-awesome/icons/bell';
	import 'vue-awesome/icons/user-circle';
	import 'vue-awesome/icons/address-book';
	import 'vue-awesome/icons/crop';
	import 'vue-awesome/icons/users';
	import 'vue-awesome/icons/columns';
	import 'vue-awesome/icons/anchor';
	import 'vue-awesome/icons/eraser';
	import 'vue-awesome/icons/sitemap';

	export default {
		components: {
			UiLoader: UILoader,
			TitleBarDep,
			StatusBar,
			SideconDep
		},
		data() {
			return {
				menus: [
					{ name: 'Enrollee', icon: 'address-book', link: 'dep-create-enrollee' },
					{ name: 'Rooms', icon: 'columns', link: 'dep-create-room' },
					{ name: 'Sections', icon: 'crop', link: 'dep-create-section' },
					{ name: 'Enrollees', icon: 'id-card', link: 'dep-list-enrollees' },
					{ name: 'Faculties', icon: 'users', link: 'dep-list-faculties' },
					{ name: 'Enrol Subjects', icon: 'sitemap', link: 'dep-assign-set-subject' },
					{ name: 'Teaching Load', icon: 'anchor', link: 'dep-assign-teaching-load' },
					{ name: 'Enter Grades', icon: 'eraser', link: 'dep-assign-enter-grades' }
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

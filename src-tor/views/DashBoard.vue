<template>
	<div class="_wrp_dep">
		<title-bar-tor></title-bar-tor>
		<div class="_wrp_dep_view">
			<sidecon-tor></sidecon-tor>
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
	import TitleBarTor from '@/components/TitleBarTor.vue';
	import SideconTor from '@/components/SideconTor.vue';
	import StatusBar from '@/components/StatusBar.vue';
	import UILoader from '../components/UILoader.vue';

	import 'vue-awesome/icons/th-large';
	import 'vue-awesome/icons/cog';
	import 'vue-awesome/icons/print';
	import 'vue-awesome/icons/book';
	import 'vue-awesome/icons/book-reader';
	import 'vue-awesome/icons/address-book';
	import 'vue-awesome/icons/list-ul';
	import 'vue-awesome/icons/map';
	import 'vue-awesome/icons/info';

	export default {
		components: {
			UiLoader: UILoader,
			TitleBarTor,
			StatusBar,
			SideconTor
		},
		data() {
			return {
				menus: [
					{ name: 'Enter Student', icon: 'address-book', link: 'enter-student' },
					{ name: 'List Student', icon: 'book', link: 'list-student' },
					{ name: 'Build Subject', icon: 'map', link: 'build-subject' },
					{ name: 'Print Record', icon: 'print', link: 'print-record' },
					{ name: 'Create Course', icon: 'book-reader', link: 'create-course' },
					{ name: 'List Course', icon: 'list-ul', link: 'list-course' },
					{ name: 'Transcript Details', icon: 'info', link: 'transcript-details' }
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

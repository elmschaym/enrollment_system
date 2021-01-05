<template>
	<div class="wrap-x">
		<div class="side">
			<side-bar :modules_m="modules_m" :modules_a="modules_a"/>
		</div>
		<div class="view">
			<router-view></router-view>
			<status-bar></status-bar>
		</div>
	</div>
</template>

<script>
	import SideBar from '@/components/SideBar.vue';
	import StatusBar from '@/components/StatusBar.vue';

	import 'vue-awesome/icons/plus';
	import 'vue-awesome/icons/lock';
	import 'vue-awesome/icons/flag';

	export default {
		components: {
			SideBar,
			StatusBar
		},
		data() {
			return {
				modules_m: [
					{ name: 'Enroll Subject', icon: 'plus', link: 'dep-set-subject'},
					{ name: 'Enrollee', icon: 'flag', link: 'dep-enr-master-list'},
					//{ name: 'Subjects', icon: 'flag', link: 'dep-list-subject'},
					//{ name: 'Sections', icon: 'flag', link: 'dep-list-section'},
					//{ name: 'Rooms', icon: 'flag', link: 'dep-list-room'},
					//{ name: 'Course Offer', icon: 'flag', link: 'dep-list-course'},
					{ name: 'Instructors', icon: 'flag', link: 'dep-fac-master-list'},
				],
				modules_a: [
					{ name: 'New Enrollee', icon: 'plus-circle', link: 'dep-enr-new-enrollee'},
					{ name: 'New Section', icon: 'plus-circle', link: 'dep-sec-new-section'},
					{ name: 'Dashboard', icon: 'th', link: 'dep-index'}
				]
			}
		}
	} 
</script>

<style scoped>
	.wrap-x { height: inherit; display: grid; grid-template-columns: 160px auto; background-color: #fff }
	.side { height: 100%; }
	.view { height: calc(100% - 24px); display: grid; grid-template-rows: auto 24px; }
</style>

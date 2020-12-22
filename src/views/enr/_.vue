<template>
	<div class="wrap-x">
		<div class="side">
			<side-bar :modules_m="modules_m" />
		</div>
		<div class="view">
			<router-view />
			<status-bar />
		</div>
	</div>
</template>

<script>
	import SideBar from '@/components/SideBar.vue';
	import StatusBar from '@/components/StatusBar.vue';

	import 'vue-awesome/icons/lock';

	export default {
		components: {
			SideBar,
			StatusBar
		},
		data() {
			return {
				modules_m: [
					{ name: 'New Admittee', icon: 'plus-circle', link: 'adm-new-admit'},
                    { name: 'New Enrollee', icon: 'plus-circle', link: 'enr-new-enrol'},
                    { name: 'New Student', icon: 'plus-circle', link: 'stu-new-stude'},
                    { name: 'Admissions', icon: 'paw', link: 'adm-list-index'},
                    { name: 'Students', icon: 'paw', link: 'stu-list-index'},
                    { name: 'Enrollment', icon: 'paw', link: 'enr-list-index'}
                ]
			}
		}
	} 
</script>

<style scoped>
	.wrap-x { display: grid; grid-template-columns: 160px auto; background-color: #fff; }
	.side {}
	.view { height: calc(100vh - 24px); display: grid; grid-auto-rows: calc(100vh - 48px) 24px }
</style>

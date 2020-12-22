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

	import 'vue-awesome/icons/plus-circle';
	import 'vue-awesome/icons/plus';
	import 'vue-awesome/icons/edit';
	import 'vue-awesome/icons/th';
	import 'vue-awesome/icons/flag';

	export default {
		components: {
			SideBar,
			StatusBar
		},
		data() {
			return {
				modules_m: [
                    { name: 'New Student', icon: 'plus-circle', link: 'stu-new-stude'},
                    { name: 'Admissions', icon: 'flag', link: 'adm-list-index'},
                    { name: 'Students', icon: 'flag', link: 'stu-list-index'}
                    //{ name: 'Enrollment', icon: 'flag', link: 'enr-list-index'}
                ],
                modules_a: [
					{ name: 'New Admittee', icon: 'plus', link: 'adm-new-admit'},
					{ name: 'Dashboard', icon: 'th', link: 'dbd-index'}
				]
			}
		}
	}
</script>

<style scoped>
	.wrap-x { display: grid; grid-template-columns: 160px auto; background-color: #fff }
	.side {}
	.view { height: calc(100vh - 24px); display: grid; grid-template-rows: calc(100vh - 48px) 24px }
</style>

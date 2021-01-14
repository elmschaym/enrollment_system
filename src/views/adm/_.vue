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
	import 'vue-awesome/icons/leaf';

	export default {
		components: {
			SideBar,
			StatusBar
		},
		data() {
			return {
				modules_m: [
					{ name: 'Admittee List', icon: 'leaf', link: 'adm-list-adm-master'},
					{ name: 'Students List', icon: 'leaf', link: 'adm-list-stu-master'}
					//{ name: 'Enrollment', icon: 'flag', link: 'enr-list-index'}
				],
				modules_a: [
					{ name: 'New Student', icon: 'plus', link: 'adm-new-student'},
					{ name: 'New Admittee', icon: 'plus', link: 'adm-new-admittee'}
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

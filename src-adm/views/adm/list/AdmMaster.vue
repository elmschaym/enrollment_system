<template>
	<div>
		<adm-list viewName="Patients List" admitType="all"></adm-list>
	</div>
</template>

<script>
	import AdmList from '@/components/AdmList.vue';

	export default {
		components: {
			AdmList
		},
		mounted() {
			this.$store.commit('setModuleName', 'Admission - Master List');
		}
	}
</script>

<style scoped>
</style>

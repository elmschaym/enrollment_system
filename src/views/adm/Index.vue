<template>
	<div class="wrap-i">
	</div>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
			fetchList() {
				let vm = this;
				this.$http.get('student/').then( res => {
					vm.isFetching = true;
					let data = res.data;
				}).catch( e => {
				});
			}
		},
		created() {
			if (this.$route.query.hasOwnProperty('set_dimen')) {
				this.$sleep(1500).then(() => {
					window.nwWin.show();
				});
			}
		},
		mounted() {
			this.$store.commit('setModuleName', 'Admission – Dashboard');
		}
	}
</script>

<style scoped>
	.wrap-i { height: inherit; }
</style>

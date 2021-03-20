<template>
	<div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		mounted() {
			if (this.$route.query.hasOwnProperty('set_dimen')) {
				this.$sleep(1500).then(() => {
					window.nwWin.show();
				});
			}
			this.$store.commit('setModuleName', 'Instructor Portal');
		}
	}
</script>

<style scoped>
</style>

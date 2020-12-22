<template>
	<div class="load-i">
		<div class="name">
			<v-icon name="leaf" style="left: 60px; top: 50px; z-index: 1000"/>
			<v-icon name="leaf" style="left: 100px; top: 90px; z-index: 1002"/>
			<span>system_enr</span>
		</div>
		<div class="stat" v-if="isLoading">
			<span><b></b></span>
		</div>
	</div>
</template>

<script>
	import 'vue-awesome/icons/leaf';

	export default {
		data() {
			return {
				isLoading: false
			}
		},
		methods: {
			initializeSetup() {
				this.isLoading = true;
				this.$sleep(4000).then(() => {
					let token = this.$storageGet('api_token', 'local') || false;
					if (token)
						this.$router.push({ name: 'adm-list-index' });
					else
						this.$router.push({ name: 'usr-signin'});
				});
			}
		},
		mounted() {
			this.$sleep(2000).then(this.initializeSetup);
		}
	}
</script>

<style scoped>
	.load-i { position: absolute; top: calc((100vh - 300px)/2); left: calc((100vw - 300px)/2); width: 300px; height: 300px; background: linear-gradient(to bottom, #478ba2, #de5b6d); border-radius: 20px; box-shadow: 0 5px 11px rgba(0,0,0,0.5); z-index: 9999; }

	.name { height: 286px; position: relative; }
	.name svg { height: 128px; width: 128px; display: block; color: #fff; margin: 0 auto; position: absolute; }
	.name span { font-size: 18px; text-transform: uppercase; font-weight: bold; color: #fff; display: block; text-align: center; text-shadow: 0 2px 2px rgba(0,0,0,0.2); position: absolute; top: 208px; left: 60px; right: 60px; visibility: hidden; }

	.stat { height: 14px; }
	.stat span {  display: block;  margin: 0 auto; position: relative; background-color: transparent; height: 2px; width: 32px; overflow-x: hidden; }
	.stat span b { background-color: #fff; height: 2px; top: 0;  width: 16px; display: block; position: absolute; -webkit-animation-name: loaderer;  -webkit-animation-duration: 800ms;  -webkit-animation-iteration-count: infinite;  -webkit-animation-direction: forward; }
	@-webkit-keyframes loaderer { from { left: 100% } to { left: -16px; } }
</style>

<template>
	<div class="__w">
		<div class="logo">
			<img :src="appLogo"/>
		</div>
		<div class="stat" v-if="isLoading">
			<span><b></b></span>
		</div>
		<div class="name">
			<span>EES v1.6.0-beta</span>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isLoading: false,
				isAnimate: false,
				isShowName: false
			}
		},
		computed: {
			appLogo() {
				return require('@/assets/img/logo.png');
			}
		},
		methods: {
			initializeSetup() {
				this.$sleep(4000).then(() => {
					this.isLoading = false;
					window.nwWin.hide();
					this.$router.push({ name: 'usr-signin', query: { set_dimen: 1 } });
				});
			},
			fetchAppPreference() {
				this.isLoading = true;
				this.$http.get('application_preference/').then( res => {
					this.$storageSet("app_prefer", res.data);
				}).catch(res => {
					this.isLoading = true;
				}).finally(() => {
					this.initializeSetup();
				});
			}
		},
		mounted() {
			/**let token = this.$storageGet('api_token', 'local') || "", user = this.$storageGet('user_info', 'local') || {};
			if (token != "" && user.hasOwnProperty('system_app_role')) {
				this.fetchAppPreference();
			}**/
			this.fetchAppPreference();
		}
	}
</script>

<style scoped>
.__w { background-color: #fff; width: 300px; height: 300px; overflow: hidden; display: grid; grid-template-rows: 236px 32px 32px }

.logo {}
.logo img { width: 200px; height: 200px; display: block; margin: 20px auto 0 auto; }
.name { text-align: right; padding: 5px 12px; }
.name span { font-size: 12px; font-weight: 100; color: #111; text-shadow: 0 1px 2px rgba(0,0,0,0.2); }
.stat {}
.stat span {  display: block;  margin: 0 auto; position: relative; background-color: #f8f8f0; height: 2px; width: 120px; overflow-x: hidden; }
.stat span b { background-color: #707070; height: 2px; top: 0;  width: 64px; display: block; position: absolute; -webkit-animation-name: loaderer;  -webkit-animation-duration: 2000ms;  -webkit-animation-iteration-count: infinite;  -webkit-animation-direction: alternate; }
@-webkit-keyframes loaderer { from { left: 100% } to { left: -64px; } }
</style>

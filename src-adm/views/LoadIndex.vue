<template>
	<div class="__w">
		<div class="logo">
			<div>
				<img :src="appLogo"/>
			</div>
			<span>{{ APP_NAME }} {{ APP_VERSION }}</span>
		</div>
		<div class="stat" v-if="isLoading">
			<span><b></b></span>
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
				this.isLoading = true;
				this.$sleep(4000).then(() => {
					window.nwWin.hide();
					this.$router.push({ name: 'usr-signin', query: { set_dimen: 1 } });
				});
			},
			fetchAppPreference() {
				this.$http.get('application_preference/').then( res => {
					this.$storageSet("app_prefer", res.data);
				});
			}
		},
		mounted() {
			let token = this.$storageGet('api_token', 'local') || "", user = this.$storageGet('user_info', 'local') || {};
			if (token != "" && user.hasOwnProperty('system_app_role')) {
				this.fetchAppPreference();
			}
			this.initializeSetup();
		}
	}
</script>

<style scoped>
.__w { background-color: #fff; width: 300px; height: 300px; overflow: hidden; display: grid; grid-template-rows: 268px 32px }

.logo {}
.logo img { width: 200px; height: 200px; display: block; margin: 20px auto 0 auto; }
.logo span { font-size: 18px; font-weight: 100; color: #111; display: block; text-shadow: 0 2px 2px rgba(0,0,0,0.2); position: absolute; top: 238px; text-align: center; width: 100%; }
.stat {}
.stat span {  display: block;  margin: 0 auto; position: relative; background-color: transparent; height: 2px; width: 32px; overflow-x: hidden; }
.stat span b { background-color: #707070; height: 2px; top: 0;  width: 16px; display: block; position: absolute; -webkit-animation-name: loaderer;  -webkit-animation-duration: 800ms;  -webkit-animation-iteration-count: infinite;  -webkit-animation-direction: forward; }
@-webkit-keyframes loaderer { from { left: 100% } to { left: -16px; } }
</style>

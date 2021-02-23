<template>
	<div class="logi-n">
		<div class="_tbr">
			<div class="wind">
				<span @click="winClose()" tooltip="close">
					<b>&times;</b>
				</span>
			</div>
			<div class="name">SYSUNO &nbsp; Sign-In</div>
			<div class="menu">
				<span v-show="isLoggingIn">
					<v-icon name="spinner" :spin="true"></v-icon>
				</span>
			</div>
		</div>
		<div class="_frm">
			<div class="n">
				<span><v-icon name="user-circle"></v-icon></span>
			</div>
			<div class="f">
				<input type="text" :class="isErrorConnect ? 'error' : ''" placeholder="Username" v-model="username" maxlength="32"/>
				<v-icon name="address-book"></v-icon>
			</div>
			<div class="f"> 
				<input type="password" :class="isErrorConnect ? 'error' : ''" placeholder="Password" v-model="password" maxlength="64" />
				<v-icon name="lock"></v-icon>
			</div>
			<div class="r" @click="togglePersistentLogin()">
				<b :class="isPersistentLogin ? 'check' : ''"></b> <span>Remember Credentials</span>
			</div>
			<div class="f">
				<button :disabled="!isOkay || isLoggingIn" @click="goLogin()">Connect</button>
			</div>
		</div>
	</div>
</template>

<script>
	import qs from 'qs';

	import 'vue-awesome/icons/user';
	import 'vue-awesome/icons/user-circle';
	import 'vue-awesome/icons/lock';
	import 'vue-awesome/icons/unlock';
	import 'vue-awesome/icons/times';
	import 'vue-awesome/icons/window-minimize';
	import 'vue-awesome/icons/address-book';
	import 'vue-awesome/icons/spinner';


	export default {
		data() {
			return {
				isLoggingIn: false,
				isErrorConnect: false,
				isPersistentLogin: false,
				username: "",
				password: "",
				isShow: false
			}
		},
		computed: {
			isOkay() {
				return this.username && this.password;
			},
			isUsername() {
				return !!this.username;
			},
			isPassword() {
				return !!this.password;
			}
		},
		methods: {
			togglePersistentLogin() {
				this.isPersistentLogin = !this.isPersistentLogin;
			},
			goLogin() {
				this.isLoggingIn = true;
				let uname = this.username, passw = this.password, landings = { REG: 'adm-index', CAS: 'fin-index', 'DEP': 'dep-index', 'INS': 'dep-index' };
				this.$http.post(window.API_BASEURL +'/login/', qs.stringify({ uname, passw })).then( res => {
					if (res.data.hasOwnProperty('api_token')) {
						this.$storageSet("user_info", res.data);
						this.$storageSet("api_token", res.data.api_token);
						this.setPhysicals();
						this.$router.push({ name: landings[res.data.system_app_role], query: { set_dimen: 1 } });
					} else {
						this.isErrorConnect = true;
					}
				}).catch( () => {
					this.isErrorConnect = true;
				}).finally( () => {
					this.isLoggingIn = false;
					this.$sleep(2000).then( () => this.isErrorConnect = false, 2000);
				});
			},
			setPhysicals() {
				if (this.$route.query.hasOwnProperty('set_dimen')) {
					window.nwWin.hide();
					window.nwWin.setPosition('center');
					if (window.screen.availWidth > 1900) {
						window.nwWin.width = 1500;
						window.nwWin.height = 800;
						window.nwWin.setMaximumSize(1500, 800);
						window.nwWin.setMinimumSize(1500, 800);
						window.nwWin.zoomLevel = 1.1;
					} else {
						window.nwWin.width = 1200;
						window.nwWin.height = 660;
						window.nwWin.setMaximumSize(1200, 660);
						window.nwWin.setMinimumSize(1200, 660);
						window.nwWin.zoomLevel = 0;
					}
					window.nwWin.setPosition('center');
				}
			},
			winClose() {
				this.$sleep(500).then(() => {
					window.nwWin.hide();
					window.nwWin.close(true);
				});
			}
		},
		created() {
			let token = this.$storageGet('api_token', 'local') || "", user = this.$storageGet('user_info', 'local') || {}, landings = { REG: 'adm-index', CAS: 'fin-index', 'DEP': 'dep-index', 'INS': 'dep-index' };
			if (token != "" && user.hasOwnProperty('system_app_role')) {
				this.setPhysicals();
				this.$router.push({ name: landings[user.system_app_role], query: { set_dimen: 1 } });
			} else {
				if (window.screen.availWidth > 1900) {
					window.nwWin.setMaximumSize(400, 400);
					window.nwWin.setMinimumSize(400, 400);
					window.nwWin.width = 400;
					window.nwWin.height = 400;
					window.nwWin.zoomLevel = 1.1;
				} else {
					window.nwWin.setMaximumSize(300, 300);
					window.nwWin.setMinimumSize(300, 300);
					window.nwWin.width = 300;
					window.nwWin.height = 300;
					window.nwWin.zoomLevel = 0;
				}
				window.nwWin.setPosition('center');
				//window.nwWin.setShadow(true);
				//window.nwWin.setResizable(false);
				this.$sleep(2000).then(() => {
					window.nwWin.show();
				});
			}
		}
	}
</script>

<style scoped>
	.logi-n { background-color: #fff; overflow: hidden; }

	._tbr { display: grid; grid-template-columns: 32px auto 32px; width: 100vw; background-color: #f5f5f5; height: 28px; }
	.name { padding: 6px; -webkit-app-region: drag; font-size: 14px; font-weight: 600; text-align: center }
	.name span { font-size: 12px; color: #40403a; font-weight: 600; line-height: 12px; }
	.wind { padding: 4px 5px; display: grid; grid-template-columns: 20px 20px 20px; }
	.wind span { display: block; width: 20px; height: 20px; cursor: pointer; padding: 5px 5px; color: #555; }
	.wind span b { display: block; width: 10px; height: 10px; border-radius: 5px; background-color: #707070; font-weight: normal; font-size: 10px; text-align: center; }
	.wind span:hover b { color: #fff; }

	.menu {}
	.menu span { display: block; padding: 6px; }
	.menu span svg { width: 12px; height: 12px; }

	._frm {}
	._frm .n { height: 54px; background-color: #fbfbf7; iborder-bottom: 1px solid #f0f0ea; text-align: center; margin-bottom: 40px; position: relative; }
	._frm .n span { display: block; position: absolute; bottom: -28px; left: 0; right: 0; text-align: center; }
	._frm .n span svg { width: 72px; height: 72px; color: #404040;}

	._frm .f { margin: 10px 40px; position: relative; }
	._frm .f input { width: 100%; height: 32px; border-radius: 2px; color: #000; padding: 4px 8px; border: none; font-size: 14px; outline: none; background-color: #fff; border-style: solid; border-width: 1px; border-color: #f0f0ea #eaeaea #d0d0d0 #eaeaea; }
	._frm .f input::placeholder { color: #303030; }
	._frm .f input.error { background-color: #fcf5ef; }
	._frm .f svg { width: 12px; height: 12px; color: #404040; position: absolute; top: 10px; right: 10px; }
	._frm .r { text-align: center; }
	._frm .r b { display: inline-block; width: 8px; height: 8px; border: 1px solid #909090; margin-right: 6px; }
	._frm .r span { font-size: 11px; color: #505050; }
	._frm .r b.check { background-color: #505050 }

	._frm .f button { display: block; width: 70%; margin: 0 auto; height: 32px; border-radius: 2px; color: #000; padding: 4px 8px; border: none; background-color: #f5f5f5; font-size: 12px; outline: none;  border-style: solid; border-width: 1px; border-color: #f0f0ea #eaeaea #d0d0d0 #eaeaea; }
	._frm .f button:disabled { color: #808080; cursor: default; }
</style>

<template>
	<div class="wrap-a">
		<div class="bnnr">
			<div class="name">
				<div class="p">
					<span>Adiong Memorial Polytechnic State College	</span>
				</div>
				<div class="q">Management System</div>
			</div>
		</div>
		<div class="form">
			<div class="x">
				<span @click="winMinimize()"><v-icon name="minus"></v-icon></span>
				<span @click="winClose()" tooltip="close"><v-icon name="times"></v-icon></span>
			</div>
			<div v-if="!isConnecting" class="w">
				<div class="h">
					<b>Connect</b>
				</div>
				<div class="f">
					<input type="text" v-model="username" placeholder="Username" :class="{ 'error': isErrorConnect }" maxlength="32"/>
					<v-icon :name="isUsername ? 'user-circle' : 'user'"></v-icon>
				</div>
				<div class="f">
					<input type="password" v-model="password" placeholder="Password" :class="{ 'error': isErrorConnect }" maxlength="64"/>
					<v-icon :name="isPassword ? 'lock' : 'unlock'"></v-icon>
				</div>
				<div class="s">
					<button @click="login()" :disabled="!isOkay" :class="{ 'ready': isOkay }">Sign In</button>
				</div>
			</div>
			<div v-else class="l"><div class="loader"></div></div>
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
	import 'vue-awesome/icons/minus';

	export default {
		data() {
			return {
				isConnecting: false,
				isErrorConnect: false,
				username: "",
				password: ""
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
			login() {
				this.isConnecting = true;
				let uname = this.username, passw = this.password;
				this.$http.post(window.API_BASEURL +'/login/', qs.stringify({ uname, passw })).then( res => {
					if (res.data.hasOwnProperty('api_token')) {
						this.$storageSet("user_info", res.data);
						this.$storageSet("api_token", res.data.api_token);
						this.$router.push({ name: 'dbd-index'});
					} else {
						this.isErrorConnect = true;
					}
				}).catch( () => {
					this.isConnecting = false;
					this.isErrorConnect = true;
				}).finally( () => {
					this.$sleep(2000).then( () => this.isErrorConnect = false, 2000);
				});
			},
			winClose() {
				this.$sleep(500).then(() => {
					window.nwWin.hide();
					window.nwWin.close(true);
				});
			},
			winMinimize() {
				window.nwWin.minimize();
			}
		}
	}
</script>

<style scoped>
	.wrap-a { height: 100%; display: grid; grid-template-columns: auto 404px; position: relative; background: linear-gradient(to left bottom, #fafafa, #f0f0f0); }
	.bnnr { position: relative; height: 100%; background: linear-gradient(to right bottom, #08979d, #055b5c); border-radius: 0 0 660px 0; box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 1px rgba(0,0,0,0.24); -webkit-app-region: drag; overflow: hidden; user-select: none; }
	.form { position: relative; height: 100%; background: transparent; }

	.form .x { position: absolute; top: 4px; right: 4px; display: grid; grid-template-columns: 24px 24px; }
	.form .x span { display: block; width: 24px; height: 24px; cursor: pointer; padding: 5px 5px; color: #555; }
	.form .x span svg { width: 10px; height: 10px; }
	.form .x span:hover { color: #000; }

	.form .w { position: absolute; top: calc((100vh - 230px)/2); height: 266px; width: 260px; right: 72px; background: linear-gradient(to left bottom, #478ba2, #de5b6d); padding: 20px 32px 16px 32px; border-radius: 10px; box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 1px rgba(0,0,0,0.24); }
	.form .w .h { padding: 8px 0 20px 0;  }
	.form .w .h b { display: block; text-align: center; color: #fff; font-size: 28px; font-weight: 600; }
	.form .w .h i { display: block; color: #56373c; font-size: 10px; font-weight: bold; text-align: center; font-style: normal; }

	.form .w .f { padding: 5px 0; position: relative }
	.form .w .f svg { position: absolute; right: 12px; top: 16px; height: 12px; width: 12px; color: #888; }
	.form .w input { border-radius: 5px; color: #000; padding: 8px 12px; border: none;  background-color: #fdfdfd; width: 100%; font-size: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 1px rgba(0,0,0,0.24); outline: none; cursor: pointer; }
	.form .w .s { padding-top: 16px; }
	.form .w input.error { background-color: #ffebeb; }
	.form .w button { text-align: center; padding: 8px 16px; border: none; box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 1px rgba(0,0,0,0.24); font-size: 12px; display: block; width: 75%; margin: 0 auto; border-radius: 5px; outline: none; background-color: #fbfbfb; color: #a0a0a0; font-weight: 600 }
	.form .w button.ready { box-shadow: 0 4px 9px rgba(0,0,0,0.15); background: linear-gradient(to bottom, #fafafa, #f0f0f0); color: #391e22; cursor: pointer; }

	.bnnr .name { position: absolute; top: 120px; left: 32px; right: 32px; }
	.bnnr .name .p { color: #111; }
	.bnnr .name .p span { font-size: 64px; text-transform: uppercase; color: #fff; font-weight: bold; itext-shadow: 0 -1px 1px rgba(0,0,0,0.4); ivisibility: hidden; background-color: #fff; }
	.bnnr .name .q { border-top: 16px solid #f0f0f0; font-size: 36px; text-transform: uppercase; color: #e0e0d0; font-weight: bold; margin-top: 20px; padding-top: 5px; }

	div.l { position: absolute; top: calc((100vh - 230px)/2); height: 266px; width: 260px; right: 72px; background: linear-gradient(to left bottom, #478ba2, #de5b6d); padding: 20px 32px 16px 32px; border-radius: 10px; box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 1px rgba(0,0,0,0.24); }
	
	.loader, .loader:before, .loader:after { border-radius: 0; width: 8px; height: 8px; -webkit-animation-fill-mode: both; animation-fill-mode: both; -webkit-animation: load7 1.8s infinite ease-in-out; animation: load7 1.8s infinite ease-in-out; }
	.loader { color: #fff; font-size: 10px; margin: 80px auto; position: relative; text-indent: -9999em; -webkit-transform: translateZ(0); -ms-transform: translateZ(0); transform: translateZ(0); -webkit-animation-delay: -0.16s; animation-delay: -0.16s; }
	.loader:before,
	.loader:after { content: ''; position: absolute; top: 0; }
	.loader:before { left: -18px; -webkit-animation-delay: -0.32s; animation-delay: -0.32s; }
	.loader:after { left: 18px; }
	@-webkit-keyframes load7 { 0%, 80%, 100% { box-shadow: 8px 0 -4px; } 40% { box-shadow: 0 8px 0 0; }}
	@keyframes load7 { 0%, 80%, 100% { box-shadow: 0 8px 0 -4px; } 40% { box-shadow: 0 8px 0 0; }}
</style>

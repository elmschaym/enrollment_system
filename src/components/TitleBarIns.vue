<template>
	<div class="_cmp_tbr">
		<div class="wind">
			<span @click="winClose()" tooltip="close">
				<b>&times;</b>
			</span>
			<span @click="winMinimize()">
				<b>-</b>
			</span>
			<span @click="winMaximize()">
				<b>+</b>
			</span>
		</div>
		<div class="link">
			<span @click="showMenu('tools')">Tools</span>
		</div>
		<div class="name" ref="tbName">{{ moduleName }}</div>
		<div class="link" style="text-align: right">
		</div>
		<div class="menu">
			<div class="l">
				<div @click="refreshView()"><v-icon name="exchange-alt"></v-icon></div>
			</div>
			<div class="c">
				<div class="n" @click="bars = !bars"><v-icon name="bars"></v-icon></div>
				<div class="m" v-show="bars">
					<div class="u">
						<div class="p">
							<span></span>
						</div>
						<div class="q">
							<b>{{ user.name }}</b>
							<span>{{ user.role }}</span>
						</div>
					</div>
					<div class="e">View Profile</div>
					<div class="e" @click="endSession()">End Session <v-icon name="expand"></v-icon></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import 'vue-awesome/icons/bars';
	import 'vue-awesome/icons/expand';
	import 'vue-awesome/icons/exchange-alt';
	import 'vue-awesome/icons/angle-left';
	import 'vue-awesome/icons/angle-right';
	import 'vue-awesome/icons/times';
	import 'vue-awesome/icons/window-minimize';
	import 'vue-awesome/icons/window-maximize';

	export default {
		emits: ['showMenu'],
		data() {
			return {
				isFullScreen: false,
				user: { name: 'Paul', role: 'Administrator' },
				bars: false
			}
		},
		computed: {
			moduleName() {
				return this.$store.state.module.name;
			},
			isPrev() {
				if (this.$route.name == 'dbd-index')
					return false;
				return true;
			},
			isNext() {
				return false;
			}
		},
		methods: {
			showMenu(v) {
				this.$emit('showMenu', v);
			},
            refreshView() {
                this.$store.commit('setReloadView');
            },
			endSession() {
				window.localStorage.removeItem('api_token');
				window.nwWin.hide();
				this.$router.push({ name: 'usr-signin', query: { set_dimen: 0 } });
			},
			winClose() {
				this.$sleep(500).then(() => {
					window.nwWin.hide();
					window.nwWin.close(true);
				});
			},
			winMinimize() {
				window.nwWin.minimize();
			},
			winMaximize() {
				if (this.isFullScreen) {
					window.nwWin.restore();
				}
				else {
					window.nwWin.maximize();
				}
				this.isFullScreen = !this.isFullScreen;
			}
		},
		created() {
			let user = this.$storageGet('user_info', 'local');
			this.user.name = user.first_name +' '+ user.last_name;
			this.user.role = this.$store.state.forms.faculty.positions.find(p => p.id === user.position ).name;  
		}
	}
</script>

<style scoped>
	._cmp_tbr { display: grid; grid-template-columns: 82px 160px auto 160px 82px; width: 100vw; background: linear-gradient(to bottom, #f8f8f8, #ebebeb); height: 28px; }
	.name { padding: 8px 6px; -webkit-app-region: drag; font-size: 12x; font-weight: 600; text-align: center }
	.name span { font-size: 11px; color: #40403a; font-weight: bold; line-height: 12px; }
	.wind { padding: 4px 5px; display: grid; grid-template-columns: 20px 20px 20px; }
	.wind span { display: block; width: 20px; height: 20px; cursor: pointer; padding: 5px 5px; color: #555; }
	.wind span b { display: block; width: 10px; height: 10px; border-radius: 5px; background-color: #707070; font-weight: normal; font-size: 10px; text-align: center; }
	.wind span:hover b { color: #fff; }

	.menu { display: grid; grid-template-columns: auto 34px; padding-right: 4px; }
	.menu .c { position: relative; }
	.menu .c .n { margin: 2px 4px; color: #222; padding: 4px 5px; background: #fdfdf9; border: 1px solid #f0f0ea; border-radius: 2px; text-align: center; cursor: pointer; }
	.menu .c .n svg { width: 10px; height: 10px; }
	.menu .c .m { position: absolute; top: 100%; right: 10px; width: 160px; height: auto; background-color: #fff; z-index: 9999; box-shadow: 0 4px 9px rgba(0,0,0,0.24); z-index: 9999; }
	.menu .c .m .u { display: grid; grid-template-columns: 32px auto; margin: 0 10px; border-bottom: 1px solid #ebebe7; padding: 20px 0; }
	.menu .c .m .u .p {}
	.menu .c .m .u .p span { display: block; height: 28px; width: 28px; background-color: #60605a; }
	.menu .c .m .u .q { text-align: left; padding: 2px 5px; }
	.menu .c .m .u .q b { display: block; font-weight: 600; color: #222; font-size: 11px; white-space: nowrap; text-overflow: clip; overflow: hidden; }
	.menu .c .m .u .q span { display: block; color: #444; font-size: 10px; white-space: nowrap; text-overflow: clip; overflow: hidden; }

	.menu .c .m .e { text-align: left; color: #222; padding: 5px 10px; font-size: 11px; }
	.menu .c .m .e:hover { background-color: #315BEF; color: #fff; }
	.menu .c .m .e svg { width: 10px; height: 10px; float: right; }

	.menu .l { margin: 2px 0; }
	.menu .l div { padding: 4px 5px; background: #fdfdf9; border: 1px solid #f0f0ea; border-radius: 2px; text-align: center; cursor: pointer; }
	.menu .l div svg { width: 9px; height: 9px; margin-top: -2px; }

	.link { padding: 8px 0; }
	.link span { font-size: 11px; color: #40403a; font-weight: normal; line-height: 12px; margin-right: 10px; }
</style>

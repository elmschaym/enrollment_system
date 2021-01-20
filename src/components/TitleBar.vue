<template>
	<div class="t-bar">
		<div class="wind">
			<span @click="winClose()" tooltip="close" v-if="winButtons[0]">
				<v-icon name="times"></v-icon>
			</span>
			<span @click="winMinimize()" v-if="winButtons[1]">
				<v-icon name="window-minimize"></v-icon>
			</span>
			<span @click="winMaximize()" v-if="winButtons[2]">
				<v-icon name="window-maximize"></v-icon>
			</span>
		</div>
		<div class="name" ref="tbName">{{ moduleName }}</div>
		<div class="menu" v-if="hasMenu">
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
		props: {
			winButtons: {
				type: Array,
				required: false,
				default: function() {
					return [1,1,1];
				}
			},
			hasMenu: {
				type: Boolean,
				required: false,
				default: function() {
					return true;
				}
			}
		},
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
            goPrev() {
                this.$router.go(-1);
            },
            goNext() {
                this.$router.go(1);
            },
            refreshView() {
                this.$store.commit('setReloadView');
            },
			endSession() {
				window.localStorage.removeItem('api_token');
				this.$sleep(500).then(() => {
					this.$router.push({ name: 'usr-signin', query: { set_dimen: 0 } });
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
	.t-bar { display: grid; grid-template-columns: 82px auto 82px; width: 100vw; background: linear-gradient(to left bottom, #f7f7f7, #e2e2e2); height: 24px; }
	.name { padding: 6px; text-align: center; -webkit-app-region: drag; font-weight: 100; font-size: 11px; }
	.name span { font-size: 11px; color: #40403a; font-weight: bold; line-height: 12px; }
	.wind { padding: 0 5px; display: grid; grid-template-columns: 24px 24px 24px; }
	.wind span { display: block; width: 24px; height: 24px; cursor: pointer; padding: 5px 5px; color: #555; }
	.wind span svg { width: 10px; height: 10px; }
	.wind span:hover { color: #000; }

	.menu { display: grid; grid-template-columns: auto 34px }
	.menu .c { position: relative; }
	.menu .c .n { margin: 2px 4px; color: #222; padding: 2px 5px; background: #fdfdf9; border: 1px solid #f0f0ea; border-radius: 2px; text-align: center; cursor: pointer; }
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
	.menu .l div { padding: 2px 5px; background: #fdfdf9; border: 1px solid #f0f0ea; border-radius: 2px; text-align: center; cursor: pointer; }
	.menu .l div svg { width: 9px; height: 9px; margin-top: -2px; }

	.navi .l { margin: 2px 0; }
	.navi .l button { padding: 2px 7px; background: #fdfdf9; border: 1px solid #f0f0ea; border-radius: 2px; text-align: center; font-size: 12px; line-height: 12px }
	.navi .l button svg { width: 9px; height: 9px; margin-top: -2px; }
</style>

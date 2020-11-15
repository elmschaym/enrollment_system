<template>
	<div class="w">
		<div class="t-bar">
			<div class="icon">
				<span onclick="win.close()" tooltip="close"><b style="background-color: #FE6254;"></b></span><span><b style="background-color: #28D33F;"></b></span><span onclick="win.minimize()"><b style="background-color: #FDC92D;"></b></span>
			</div>
			<div class="name">system_enr</div>
			<div class="link"></div>
		</div>
		<div class="m">
			<div class="sidecon">
				<ul>
					<li :class="sconName == 'dbd-index' ? 'active' : ''"><span @click="goScon('dbd-index')"><v-icon name="bars"></v-icon></span></li>
					<li :class="sconName == 'not-index' ? 'active' : ''"><span @click="goScon('not-index')"><v-icon name="bell"></v-icon></span></li>
					<li :class="sconName == 'usr-index' ? 'active' : ''"><span @click="goScon('usr-index')"><v-icon name="user-circle"></v-icon></span></li>
					<li :class="sconName == 'set-index' ? 'active' : ''"><span @click="goScon('set-index')"><v-icon name="cog"></v-icon></span></li>
				</ul>
			</div>
			<div class="sidebar">
				<div class="name">
					<span @click="$router.push({ name: 'info-index' })"></span>
				</div>
				<div class="list">
					<div v-if="isSidebarUserTop" class="usr">
						<div class="u">
							<span></span>
							<b>{{ usr.name }} <v-icon name="edit"></v-icon></b>
							<i>{{ usr.role }}</i>
						</div>
					</div>
					<div v-if="isDashboard">
						<div class="q">
							<div>
								<v-icon name="search"></v-icon>
								<input placeholder=""/>
							</div>
						</div>
						<div class="h">
							<span>MANAGEMENT</span>
						</div>
						<ul class="p">
							<li v-for="m in modules_m" :key="m.name+m.icon" @click="goSbar(m.link)" :class="['l', m.link == sbarName ? 'active' : '']">
								<div>
									<v-icon :name="m.icon"></v-icon> 
									<span>{{ m.name }}</span>
								</div>
							</li>
						</ul>
						<div class="h">
							<span>ADMINISTRATION</span>
						</div>
						<ul class="p">
							<li v-for="m in modules_a" :key="m.name+m.icon" @click="goSbar(m.link)" :class="['l', m.link == sbarName ? 'active' : '']">
								<div>
									<v-icon :name="m.icon"></v-icon> 
									<span>{{ m.name }}</span>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div v-if="isSidebarUserBot" class="user">
					<div class="m">
						<span></span>
					</div>
					<div class="n">
						<span><b>{{ usr.name }}</b></span>
						<span><i>{{ usr.role }}</i></span>
					</div>
				</div>
			</div>
			<div class="content">
				<div class="c">
					<router-view @setSbarName="setSbarName"></router-view>
				</div>
				<div class="s">
					<div class="o">
						<span v-if="!isModule">OK</span>
						<span v-else @click="goPrev()">&lt; To Prev</span>
					</div>
					<div class="p">
						<ui-time class="b" @updateDate="updateDate"></ui-time>
						<ui-date :refreshDate="refreshDate"></ui-date>
					</div>
					<div class="q">
						<span>{{ API_SOURCE }}</span>
						<span>Connected</span>
						<span>
							<v-icon name="lock"></v-icon>
						</span>
					</div>
				</div>
			</div>
		</div>
		<div class="b">
		</div>
	</div>
</template>

<script>
	import 'vue-awesome/icons/th';
	import 'vue-awesome/icons/bed';
	import 'vue-awesome/icons/users';
	import 'vue-awesome/icons/thermometer';
	import 'vue-awesome/icons/flask';
	import 'vue-awesome/icons/chart-area';
	import 'vue-awesome/icons/edit';
	import 'vue-awesome/icons/universal-access';
	import 'vue-awesome/icons/calendar';
	import 'vue-awesome/icons/cog';
	import 'vue-awesome/icons/bars';
	import 'vue-awesome/icons/envelope';
	import 'vue-awesome/icons/bell';
	import 'vue-awesome/icons/user-circle';
	import 'vue-awesome/icons/search';
	import 'vue-awesome/icons/edit';
	import 'vue-awesome/icons/paw';
	import 'vue-awesome/icons/chevron-left';
	import 'vue-awesome/icons/lock';
	import 'vue-awesome/icons/puzzle-piece';

	import UITime from '../components/UITime.vue';
	import UIDate from '../components/UIDate.vue';

	export default {
		components: {
			UiTime: UITime,
			UiDate: UIDate
		},
		data() {
			return {
				sconName: 'dbd-index',
				sbarName: '',
				modules_m: [
					{ name: 'Admission', icon: 'bed', link: 'adm-index'},
					{ name: 'Enrollments', icon: 'puzzle-piece', link: 'fin-index'},
					{ name: 'Billing', icon: 'paw', link: 'pet-index'},
					{ name: 'Department', icon: 'thermometer', link: 'lab-index'},
					{ name: 'Students', icon: 'flask', link: 'pha-index'},
					{ name: 'Subjects', icon: 'users', link: 'own-index'},
					{ name: 'Sections', icon: 'universal-access', link: 'ser-index'},
					{ name: 'Courses', icon: 'calendar', link: 'eve-index'}
				],
				modules_a: [
					{ name: 'Dashboard', icon: 'th', link: 'dbd-index'},
					{ name: 'Accounts', icon: 'lock', link: 'dbd-index'},
					{ name: 'Controls', icon: 'edit', link: 'frm-index'},
					{ name: 'Reports', icon: 'chart-area', link: 'rep-index'}
				],
				usr: { name: 'Paul', role: 'Administrator' },
				refreshDate: false
			}
		},
		computed: {
			isDashboard() {
				return this.sconName == 'dbd-index' && this.$route.name != 'dbd-index';
			},
			isSidebarUserTop() {
				return this.$route.name == 'dbd-index';
			},
			isSidebarUserBot() {
				return this.$route.name != 'dbd-index';
			},
			isModule() {
				let routes = ['dbd-index', 'set-index', 'not-index', 'usr-index'], vm = this, t = true;
				routes.forEach( v => {
					if (vm.$route.name == v)
						t = false;
				});
				return t;
			}
		},
		methods: {
			goSbar(name) {
				this.sconName = 'dbd-index';
				if( name != this.$route.name ) {
					this.sbarName = name;
					this.$router.push({ name });
				}
			},
			goScon(name) {
				this.sconName = name;
				this.$router.push({ name });
			},
			goPrev() {
				this.$router.go(-1);
			},
			setSbarName(name) {
				this.sbarName = name;
			},
			updateDate() {
				this.refreshDate = !this.refreshDate;
			}
		},
		mounted() {
			let usr = this._storageGet('user');
			this.usr.name = usr.username;
		}
	}
</script>

<style scoped>
	div.w { height: 660px; background: #fff; box-sizing: border-box; }

	.t-bar { display: grid; grid-template-columns: 82px 1036px 82px; width: 1200px; ibackground: linear-gradient(to bottom, #fbfbfb, #f5f5f5); border-bottom: 1px solid #f0f0f0; height: 24px; background-color: #f5f5f5; }
	.t-bar .name { font-family: Helvetica, "Open Sans"; padding: 6px; text-align: center; -webkit-app-region: drag; font-weight: bold; }
	.t-bar .name span { font-size: 12px; color: #40403a; font-weight: bold; line-height: 12px; }
	.t-bar .icon { padding: 0 5px; display: grid; grid-template-columns: 24px 24px 24px; }
	.t-bar .icon span { display: block; width: 24px; height: 24px; cursor: pointer; padding: 5px 5px;}
	.t-bar .icon span b { display: block; width: 14px; height: 14px; border-radius: 100%; font-size: 10px; color: #444; text-align: center; }
	.t-bar .icon span b:hover { color: #fff; }
	.t-bar .link { -webkit-app-region: drag; }
		
	div.t { height: 24px; background-color: transparent; display: grid; grid-template-columns: 772px 72px; }
	
	div.t .path, div.t .wind { border-bottom: 1px solid #ededed; background-color: #fff; text-align: center; }
	div.t .path span { padding: 5px; font-size: 14px; display: block; font-family: "Open Sans" }
	
	div.t .wind { display: grid; grid-template-columns: 24px 24px 24px; }
	div.t .wind div { text-align: center; padding: 4px; }
	div.t .wind div span { font-size: 12px; padding: 0 4px; background-color: #606060; color: #fff; border-radius: 8px; }
	div.t .wind div:hover span { background-color: #a0a0a0; color: #202020; }
	
	div.m { display: grid; grid-template-columns: 28px 160px 1012px; }
	div.m .content .c { height: calc(636px - 24px); width: 100%; overflow-y: scroll; }
	
	div.m .sidebar { background: #132436; height: 636px; border-right: 1px solid #d5d8dc; position: relative; }

	div.m .sidebar .name { height: 40px; background-color: #00222E; font-size: 24px; text-align: center; font-weight: 600; padding: 8px 0; }
	div.m .sidebar .name b { color: #fff; }
	div.m .sidebar .name span { color: #fff; }
	
	div.m .sidebar .list { height: calc(636px - 40px - 32px); padding: 32px 0; border-top: 1px solid #00222E; border-bottom: 1px solid #00222E; }
	.list ul {}
	.list ul li { display: block; position: relative; }
	.list ul li.l > div { display: block; padding: 6px 8px 6px 14px; border-top: 1px solid #00222E }
	.list ul li.l > div svg { height: 10px; width: 10px; color: #eee; }
	.list ul li.l > div > span { margin-left: 10px; color: #eee; font-size: 10px; font-weight: 400; font-weight: bold; }
	.list ul li.l > div:hover { background-color: #243544; cursor: pointer; }
	.list ul li.l.active > div { background-color: #243544; cursor: pointer; border-right: 2px solid #00222E; margin-right: -2px; }

	.list .q > div { padding: 2px 4px; margin-bottom: 12px; position: relative; }
	.list .q > div input { width: 100%; padding: 6px; color: #391e22; border: 1px solid #f0f0f0; background-color: #fdfdfd; width: 100%; font-size: 12px; border-width: 1px; border-style: solid; border-color: #f0f0f0 #e0e0e0 #d0d0d0 #e0e0e0; border-radius: 2px; }
	.list .q > div svg { color: #00222E; position: absolute; right: 8px; top: 10px; width: 14px; height: 14px; }

	.list .p {}
	.list .h { margin-top: 8px; padding: 7px 14px; }
	.list .h span { font-size: 9px; text-transform: uppercase; color: #ddd; }

	.list .usr {}
	.list .usr .u { border-bottom: 1px solid #00222E; }
	.list .usr .u span { display: block; height: 120px; width: 120px; background-color: #00222E; margin: 0 auto; border-radius: 120px; }
	.list .usr .u b { color: #f0f0f0; display: block; padding: 8px 8px 4px 8px; font-size: 11px; position: relative; }
	.list .usr .u b svg { width: 12px; height: 12px; position: absolute; right: 8px; }
	.list .usr .u i { color: #d0d0d0; display: block; font-size: 9px; border-bottom: 1px solid #00222E; padding: 0 8px 8px 8px; font-style: normal; }

	div.m .sidebar .user { height: 32px; display: grid; grid-template-columns: 32px 138px; padding: 4px 6px; border-top: 1px solid #00222E; }
	div.m .sidebar .user .m {}
	div.m .sidebar .user .n {}
	div.m .sidebar .user .n span { display: block; color: #fff; font-size: 10px; }
	div.m .sidebar .user .n span b { color: #fff; font-size: 10px; font-weight: 300; }
	div.m .sidebar .user .n span i { display: block; margin-top: 2px; color: #fff; font-size: 9px; font-style: normal; font-weight: 100 }
	div.m .sidebar .user .m span { width: 20px; height: 20px; border-radius: 20px; background-color: #a0a0a0; margin: 2px 0; }

	div.m .sidecon { background-color: #00222E; border-right: 1px solid #142534; }
	div.m .sidecon ul { padding: 40px 0; }
	div.m .sidecon ul li { height: 36px; padding: 10px 5px; cursor: pointer; }
	div.m .sidecon ul li span {}
	div.m .sidecon ul li span svg { height: 16px; width: 16px; color: #f0f0f0; }
	div.m .sidecon ul li.active { background-color: #243544; border-right: 1px solid #243544; margin-right: -1px; }

	div.m .content .c { overflow-y: hidden; }
	div.m .content .s {  height: 24px; display: grid; grid-template-columns: 400px 200px 400px; background-color: #f5f5f5; border-top: 1px solid #f0f0f0; font-size: 9px; font-weight: 100 }
	div.m .content .s .o { text-align: left; }
	div.m .content .s .o span { padding: 6px 12px; display: inline-block; border-right: 1px solid #eaeaea; cursor: pointer; background-color: #f9f9f9; }
	div.m .content .s .o span svg { height: 10px; width: 10px; }
	div.m .content .s .p { text-align: center; }
	div.m .content .s .p span { padding: 6px 12px; display: inline-block; border-right: 1px solid #eaeaea; }
	div.m .content .s .p span.b { border-left: 1px solid #eaeaea; }
	div.m .content .s .q { text-align: right;  }
	div.m .content .s .q span { padding: 6px 8px; display: inline-block; border-left: 1px solid #eaeaea; }
	div.m .content .s svg { height: 10px; width: 10px; color: #404040; }
</style>

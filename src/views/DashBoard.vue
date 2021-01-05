<template>
	<div class="wrap-d">
		<div class="t">
			<div class="find">
				<input placeholder="Find student, admission, department"/>
				<span><v-icon name="search"></v-icon></span>
			</div>
			<div class="w">
			</div>
			<div class="link">
				<span class="bx" @click="goName('adm-new', 'adm-index')"><v-icon name="plus" class="p"></v-icon> <v-icon name="bed" class="i"></v-icon></span><span class="by" @click="goName('pet-new', 'pet-index')"><v-icon name="plus" class="p"></v-icon> <v-icon name="paw" class="i"></v-icon></span><span class="by" @click="goName('own-new', 'own-index')"><v-icon name="plus" class="p"></v-icon> <v-icon name="user" class="i"></v-icon></span>
			</div>
		</div>
		<div class="m">
			<div class="g">
				<div class="modu">
					<div class="list">
						<div class="r">
							<div v-for="m in modules[0]" class="l" :key="m.icon+m.name" style="" @click="goModu(m.link)">
								<span>
									<v-icon :name="m.icon"></v-icon>                  
								</span>
								<b>{{ m.name }}</b>
							</div>
						</div>
						<div class="r">
							<div v-for="m in modules[1]" class="l" :key="m.icon+m.name"  @click="goModu(m.link)">
								<span>
									<v-icon :name="m.icon"></v-icon>                  
								</span>
								<b>{{ m.name }}</b>
							</div>
						</div>
					</div>
				</div>
				<div class="todo">
					<div class="head">
						<span>Activity Log</span>
					</div>
					<div class="list">
					</div>
				</div>
			</div>
			<div class="h">
				<div class="serv">
					<div class="head">Service Notifications</div>
					<div class="list" v-if="servLists.length > 0">
						<div class="l" v-for="s in servLists" :key="s.ser.id + s.ser.type">
							<div class="a">
								<div>
									<b>{{ s.ser.recur_type == 'E' ? s.ser.recur_time_str : formatServDate(s.ser) }}</b>
									<span>{{ s.ser.recur_type == 'E' ? "Everyday" : s.ser.recur_time_str }}</span>
								</div>
							</div>
							<div class="b">
								<div class="name"><b>{{ s.pet.name }}</b></div>
								<div class="type"><span>{{ getServType(s.ser.type) }}</span></div>
							</div>
							<div class="c">
								<div>
									<v-icon name="bell"></v-icon>
								</div>
							</div>
						</div>
					</div>
					<ui-loader v-if="isFetchingSL"></ui-loader>
				</div>
				<div class="feed">
					<div class="head">Recent Admission</div>
					<div class="list" v-if="admLists.length > 0">
						<div :class="['l']" v-for="a in admLists" :key="a.adm.id + a.adm.date_added" @click="$router.push('/adm/'+ a.id +'/view')">
							<div class="a">
								<b>{{ a.pet.name }}</b> <span>{{ formatPetBreed(a.pet.breed) }}</span>
							</div>
							<div class="b">
								{{ a.adm.date_added }}
							</div>
							<div class="c">
								<span>in</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import UILoader from '../components/UILoader.vue';

	import 'vue-awesome/icons/user';
	import 'vue-awesome/icons/bed';
	import 'vue-awesome/icons/users';
	import 'vue-awesome/icons/thermometer';
	import 'vue-awesome/icons/flask';
	import 'vue-awesome/icons/chart-area';
	import 'vue-awesome/icons/universal-access';
	import 'vue-awesome/icons/calendar';
	import 'vue-awesome/icons/cog';
	import 'vue-awesome/icons/paw';
	import 'vue-awesome/icons/plus';
	import 'vue-awesome/icons/bell';
	import 'vue-awesome/icons/puzzle-piece';

	export default {
		components: {
			UiLoader: UILoader
		},
		data() {
			return {
				modules: [
					[
						{ name: 'Admission', icon: 'bed', link: 'adm-index', style: '#fff5ee' },
						{ name: 'Enrollments', icon: 'puzzle-piece', link: 'enr-index', style: '#f5f5dc' },
						{ name: 'Finances', icon: 'paw', link: 'fin-index', style: '#f5e4e1' },
						{ name: 'Department', icon: 'thermometer', link: 'dep-index', style: '#f0f8ff' }
						
					],
					[
						{ name: 'Students', icon: 'flask', link: 'stu-index', style: '#f0fff0' },
						{ name: 'Subjects', icon: 'users', link: 'sub-index', style: '#faebd7' },
						{ name: 'Sections', icon: 'universal-access', link: 'sec-index', style: '#faf0e6' },
						{ name: 'Courses', icon: 'calendar', link: 'cou-index', style: '#f5f5f5' },
					]
				],
				admLists: [],
				servLists: [],
				servTypes: [],
				petBreeds: [],
				isFetchingSL: false,
				isErrorConnSL: false
			}
		},
		methods: {
			goModu(name) {
				this.$emit("setSbarName", name);
				this.$router.push({ name });
			},
			goName(name, sname) {
				this.$emit("setSbarName", sname);
				this.$router.push({ name });
			},
			getServType(s) {
				for (let v of this.servTypes) {
					if (v.id == s)
						return v.name;
				}
				return "- -";
			},
			formatServDate(s) {
				let mos = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
				let wek = [['A', 'Sun'], ['M', 'Mon'], ['T', 'Tue'], ['W', 'Wed'], ['H', 'Thu'], ['F', 'Fri'], ['S', 'Sat']];
				if (s.recur_type == 'O') {
					let d = new Date(s.recur_date);
					return mos[d.getMonth()] +" "+ d.getDate();
				}
				else if (s.recur_type == 'M') {
					let d = new Date();
					if (s.recur_days < d.getDate()) {
						let m = d.getMonth()+1;
						if (m > 11)
							m = 0;
						return mos[m] +" "+ s.recur_days;
					}
					return mos[d.getMonth()] +" "+ s.recur_days;
				}
				else if (s.recur_type == 'W') {
					let w = s.recur_week;
					if (s.recur_week.length == 1) {
						for (let v of wek) {
							if (s.recur_week == v[0]) {
								w = v[1];
								break;
							}
						}
					}
					return w;
				}

			},
			formatPetBreed(b) {
				for (let v of this.petBreeds) {
					if (v.id == b)
						return v.name;
				}
				return "- -";
			},
			fetchServLists() {
				let vm = this;
				this.$http.post('ServListFeed', {}, { timeout: 10000, before() { } }).then(
					res => {
						vm.isFetchingSL = true;
						let data = res.body;
						if (data.stat == 1) {
							this.servLists = data.data;
						} else {
							vm.isErrorConnSL = true;
						}
						vm.isFetchingSL = false
					},
					() => {
						vm.isErrorConnSL = true;
						vm.isFetchingSL = false
					}
				);
			},
			fetchAdmLists() {
				this.$http.post('AdmListFeed', {}, { timeout: 10000, before() { } }).then(
					res => {
						let data = res.body;
						if (data.stat == 1) {
							this.admLists = data.data;
						}
					}
				);
			}
		},
		mounted() {
			this.$store.commit('setModuleName', 'Dashboard');
		}
	}
</script>

<style scoped>
	.wrap-d{ background-color: #f8f8f8; }

	div.t { display: grid; grid-template-columns: 680px 372px 120px; border-bottom: 1px solid #f0f0f0; background-color: #f8f8f8 }
	div.t .find { height: 40px; padding: 6px 16px; position: relative; background-color: #fcfcfc; }
	div.t .find span { display: block; height: 28px; width: 40px; position: absolute; top: 7px; right: 17px; background-color: #f0f0f0; padding: 6px 13px; color: #fff; opacity: 0.8; }
	div.t .find span svg { height: 14px; width: 14px; color: #492e32; }
	div.t .find input { color: #391e22; padding: 8px 12px; border: 1px solid #f0f0f0; background-color: #fff; width: 100%; font-size: 12px; border: 1px solid #e8e8e8; outline: none; cursor: pointer; height: 30px; font-weight: 200 }

	div.t .link { height: 40px; }
	div.t .link span { position: relative; display: inline-block; padding: 12px; width: 40px; height: 40px; font-size: 11px; border-left: 1px solid #f0f0f0; cursor: pointer; background-color: #fcfcfc; }
	div.t .link span.bx { color: #202020; }
	div.t .link span.by { color: #404040; }
	div.t .link svg.i { width: 16px; height: 16px; margin-bottom: -2px; }
	div.t .link svg.p { width: 8px; height: 8px; margin-bottom: -2px; position: absolute; top: 5px; right: 5px; }

	div.m { display: grid; grid-template-columns: 680px 480px; }
	div.g {}
	div.h { background-color: #f8f8f8; }

	.modu { width: 640px; margin: 24px auto 16px auto; }
	.modu .list { background-color: #fefefe; padding: 24px 0 0 0; border: 1px solid #fdfdfd; box-shadow: 0 4px 9px rgba(0,0,0,0.15); }

	.modu .r { display: grid; grid-template-columns: 25% 25% 25% 25%; padding: 0 0 32px 0; }
	.modu .r .l { height: 61px; background-color: #e0e0e0; width: 100px; margin: 0 auto; position: relative; border-width: 1px; border-style: solid; border-color: transparent #f0f0f0 #e0e0e0 #f0f0f0; cursor: pointer; ibox-shadow: 0 4px 10px rgba(0,0,0,0.15); overflow: hidden; border-radius: 20px 0 4px 0; }
	.modu .r .l span { border-radius: 20px 0 0 0; display: block; height: 58px; overflow: hidden; margin-top: -1px; text-align: right; }
	.modu .r .l span svg { width: 32px; height: 32px; color: #56373c; margin: 4px 8px 8px 8px; color: #c0c0b0; border-radius: 100%; }
	.modu .r .l b { display: block; position: absolute; height: 20px; bottom: 0; width: 100%; font-size: 11px; text-align: left; padding: 6px 4px 4px 8px; background-color: #fff; color: #333; font-weight: 600; border-radius: 0 0 4px 0;  }
	.imodu .r .l:hover b { background-color: transparent; transition: 300ms ease-in-out }
	.imodu .r .l:hover span svg { margin: 8px auto; transition: 300ms ease-in-out; width: 48px; height: 48px; border-radius: 100%; box-shadow: 0 4px 9px rgba(0,0,0,0.15); }

	.serv { height: 296px; background-color: #fff; box-shadow: 0 4px 9px rgba(0,0,0,0.15); margin: 24px; position: relative; border-bottom: 5px solid #f5f5f5; }
	.serv .head { background-color: #f5f5f5; color: #111; font-weight: bold; font-size: 10px; padding: 5px; text-align: center; }
	.serv .list { height: 270px; overflow-y: scroll; }
	.serv .list .l { display: grid; grid-template-columns: 60px 170px 42px; cursor: pointer; }
	.serv .list .l:hover { background-color: #fbfbfb }
	.serv .list .l .a {}
	.serv .list .l .a div { background-color: #f0f0f0; width: 48px; height: 48px; margin: 5px auto; border-radius: 8px; }
	.serv .list .l .a div b { height: 32px; display: block; font-size: 11px; display: flex; align-items: center; justify-content: center; }
	.serv .list .l .a div span { height: 16px; display: block; font-size: 9px; text-align: center; padding: 2px 0; background-color: #f5f5f5; font-weight: bold; border-radius: 0 0 8px 8px; }

	.serv .list .l .b { padding: 10px 5px; }
	.serv .list .l .b div.name { font-size: 12px; padding-bottom: 6px; }
	.serv .list .l .b div.type {}
	.serv .list .l .b div.type span { font-size: 11px; background-color: #f9f9f8; padding: 0px 2px; }
	.serv .list .l .c {}
	.serv .list .l .c div { height: 48px; padding: 5px; display: flex; align-items: center; justify-content: center; }
	.serv .list .l .c div svg { width: 20px; height: 20px; margin-bottom: -3px }
	.serv .none { text-align: center; padding: 16px; font-size: 12px; }

	.feed { height: 196px; background-color: #fff; box-shadow: 0 4px 9px rgba(0,0,0,0.15); margin: 24px 24px 20px 24px; border-bottom: 5px solid #f5f5f5; }
	.feed .head { background-color: #f5f5f5; color: #111; font-weight: bold; font-size: 10px; padding: 5px; text-align: center; }
	.feed .list { height: 170px; overflow-y: scroll; }
	.feed .list .l { display: grid; grid-template-columns: 130px 112px 30px; padding: 4px 7px; border-bottom: 1px solid #f8f8f8; cursor: pointer; }
	.feed .list .l:hover { background-color: #f5f5f5 }
	.feed .list .l.even { background-color: #f8f8f8 }
	.feed .list .l .a {}
	.feed .list .l .a b { font-size: 10px; color: #222; margin-right: 6px; }
	.feed .list .l .a span { font-size: 10px; color: #444; }
	.feed .list .l .b { font-size: 10px; color: #222; }
	.feed .list .l .c span { font-size: 10px; color: #444; background-color: #f7f7f7; padding: 0 2px; }


	.todo { height: 300px; width: 640px; margin: 0 auto; background-color: #fff; box-shadow: 0 4px 9px rgba(0,0,0,0.15); }
	.todo .head { font-size: 10px; font-weight: bold; background-color: #f5f5f5; padding: 4px 0 0 4px;  }
	.todo .head span { display: inline-block; padding: 3px 12px; background-color: #fff; }
	.todo .list {}

	.butt { display: grid; grid-template-columns: 300px 340px; width: 640px; margin: 16px auto 25px auto; }
	.butt .x { text-align: left; }
	.butt .y { text-align: right; }
</style>

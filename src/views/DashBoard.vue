<template>
	<div class="wrap-d">
		<div class="t">
			<div class="find">
				<input placeholder="Find student, admission, department"/>
				<span><v-icon name="search"></v-icon></span>
			</div>
			<div>
			</div>
			<div class="link">
			</div>
		</div>
		<div class="m">
			<div class="modu">
				<div @click="$router.push({ name: 'adm-index' })">
					<div>
						<v-icon name="id-card"></v-icon>
						<span>Admittee Officer</span>
					</div>
				</div>
				<div @click="$router.push({ name: 'fin-index' })">
					<div>
						<v-icon name="id-card"></v-icon>
						<span>Cashier</span>
					</div>
				</div>
				<div @click="$router.push({ name: 'dep-index' })">
					<div>
						<v-icon name="id-card"></v-icon>
						<span>Enrollee Officer</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import UILoader from '../components/UILoader.vue';

	import 'vue-awesome/icons/search';
	import 'vue-awesome/icons/user';
	import 'vue-awesome/icons/id-card';

	export default {
		components: {
			UiLoader: UILoader
		},
		data() {
			return {
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
			if (this.$route.query.hasOwnProperty('set_dimen')) {
				this.$sleep(1500).then(() => {
					window.nwWin.show();
				});
			}

			this.$store.commit('setModuleName', 'Dashboard');
		}
	}
</script>

<style scoped>
	.wrap-d { height: 100%; background-color: #fbfbf7; display: grid; grid-template-rows: 52px auto }

	div.t { display: grid; grid-template-columns: 680px auto 100px; border-bottom: 1px solid #f0f0f0; background-color: #f8f8f8 }
	div.t .find { height: 40px; padding: 6px 16px; position: relative; background-color: #fcfcfc; }
	div.t .find span { display: block; height: 28px; width: 40px; position: absolute; top: 7px; right: 17px; background-color: #f0f0f0; padding: 6px 13px; color: #fff; opacity: 0.8; }
	div.t .find span svg { height: 14px; width: 14px; color: #492e32; }
	div.t .find input { color: #391e22; padding: 8px 12px; border: 1px solid #f0f0f0; background-color: #fff; width: 100%; font-size: 12px; border: 1px solid #e8e8e8; outline: none; cursor: pointer; height: 30px; font-weight: 200 }

	div.t .link { height: 40px; }
	div.t .link span { position: relative; display: inline-block; padding: 12px; height: 40px; font-size: 11px; border-left: 1px solid #f0f0f0; cursor: pointer; }
	div.t .link svg { width: 16px; height: 16px; margin-bottom: -2px; margin-right: 5px; }

	.m { display: flex; align-items: center; justify-content: center;  }
	.m .modu { width: 420px; display: grid; grid-template-columns: 140px 140px 140px; border: 1px solid #f0f0ea; height: 96px; }
	.m .modu > div {}
	.m .modu > div div { text-align: center; padding: 5px; }
	.m .modu > div div svg { height: 64px; width: 64px; color: #808080; }
	.m .modu > div div span { display: block; font-size: 12px; color: #222; text-align: center }
	.m .modu > div div:hover svg { color: #404040; }
</style>

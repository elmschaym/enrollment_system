<template>
	<div class="wrap-m">
		<div class="find-o">
			<div class="u">
				<span><v-icon class="c" name="square"></v-icon> Active</span>
				<span><v-icon class="n" name="square"></v-icon> On-Leave</span>
				<span><v-icon class="s" name="square"></v-icon> Inactive</span>
			</div>
			<div class="v">
				<input v-model="queryString" placeholder="Find faculty by name"/>
				<v-icon name="search"></v-icon>
			</div>
		</div>
		<div class="list-o">
			<div class="data">
				<div class="tbl">
					<div class="thd">
						<div class="tth"></div>
						<div class="tth">Fullname <v-icon class="s" name="sort"></v-icon></div>
						<div class="tth">Position <v-icon class="s" name="sort"></v-icon></div>
						<div class="tth">Gender</div>
						<div class="tth">Date Hired</div>
						<div class="tth">Staff</div>
					</div>
					<div class="tbd" v-if="isFetching">
						<ui-loader></ui-loader>
					</div>
					<div class="tbd" v-else-if="faculties.length > 0">
						<div :class="['ttr', selectId == l.id ? 'active' : '']" :key="l.id" v-for="l in faculties" @contextmenu="facultyListCMenu($event, l)">
							<div class="ttd"><v-icon :class="l.is_active ? 'a' : ''" name="square"></v-icon></div>
							<div class="ttd">{{ l.last_name }}, {{ l.first_name }}</div>
							<div class="ttd">{{ parsePosition(l.position) }}</div>
							<div class="ttd">{{ parseGender(l.gender) }}</div>   
							<div class="ttd">{{ l.date_hired }}</div> 
							<div class="ttd">{{ l.is_staff }}</div>
						</div>
					</div>
					<div class="tbd x" v-else>
						<div class="tno" style="text-align: center">{{ isErrorConnect ? 'Server Error Occured' : 'No Data Available'}}</div>
					</div>
				</div>
			</div>
			<div class="page">
				<div class="l">
					<button>RELOAD</button>
				</div>
				<div class="c">
				</div>
				<div class="r">
					<button><v-icon name="angle-left"></v-icon> PREV</button>
					<button>NEXT <v-icon name="angle-right"></v-icon></button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import UISelect from '@/components/UISelect.vue';
	import UILoader from '@/components/UILoader.vue';
	import 'vue-awesome/icons/angle-right';
	import 'vue-awesome/icons/angle-left';
	import 'vue-awesome/icons/square';
	import 'vue-awesome/icons/sort';
	import 'vue-awesome/icons/search';
	import 'vue-awesome/icons/plus';
	import 'vue-awesome/icons/filter';
	import 'vue-awesome/icons/square';

	export default {
		emits: ['setViewName'],
		components: {
			UiSelect: UISelect,
			UiLoader: UILoader
		},
		data() {
			return {
				isFetching: false,
				isErrorConnect: false,
				isListReachEnd: false,
				isDataReachEnd: false,
				faculties: [],
				queryString: '',
				queryAction: 'lister',
				paging: { limit: 14, start: 0 },
				userDepartment: 0,
				selectId: 0
			}
		},
		methods: {
			fetchFaculties() {
				this.isErrorConnect = false;
				this.isFetching = true;
				this.$http.get('faculty/?action='+ this.queryAction +'&query='+ this.queryString +'&faculty_fields=id,first_name,last_name,gender,position,date_hired,is_active,is_staff&facultyf_department='+ this.userDepartment).then( res => {
					let data = res.data;
					this.faculties = data;
				}).catch( () => {
					this.isErrorConnect = true;
				}).finally( () => {
					this.isFetching = false;
				});
			},
			parseGender(v) {
				return this.$store.state.forms.student.gender.find(x => x.id == v).name;
			},
			parsePosition(v) {
				return this.$store.state.forms.faculty.positions.find(x => x.id == v).name;
			},
			facultyListCMenu(e, l) {
				e.preventDefault();
                this.selectId = l.id;
				let cmenu = new window.nw.Menu(),
					items = [
						{ label: 'Teaching Load', click: () => this.$router.push({ name: 'dep-assign-teaching-load', query: { faculty_id: l.id } }) },
						{ label: 'Assign Section', click: () => this.$router.push({ name: 'dep-assign-section-handler', query: { faculty_id: l.id } }) },
						{ label: 'Refresh', click: this.fetchFaculties, key: 'F5', },
						{ type: 'separator' },
						{ label: l.last_name +', '+ l.first_name, enabled: false }
					];
				items.forEach( m => cmenu.append(new window.nw.MenuItem(m)) );
				let zoomFactor = Math.pow(1, window.nwWin.zoomLevel);
				cmenu.popup(
					Math.round(zoomFactor * e.clientX),
					Math.round(zoomFactor * e.clientY)
				);
			}
		},
		watch: {
			queryString(n) {
				if (n != '') {
					this.queryAction = 'finder';
					this.$sleep(250).then(this.fetchFaculties);
				} else 
					this.queryAction = 'lister';
			}
		},
		created() {
			this.$emit('setViewName', this.$route.name);
			this.$store.commit('setModuleName', 'Department – Faculty List');
			let d = this.$storageGet('user_info').department;
			this.userDepartment = d.id;
		},
		mounted() {
			this.fetchFaculties();
		}
	}
</script>

<style scoped>
	.wrap-m { height: 100%; background-color: #fbfbf7; }

	.list-o { margin: 0 16px; background-color: #fff; font-size: 12px; }
	.list-o .data .tbl {}
	.list-o .data .tbl .thd, .list-o .data .tbl .ttr { display: grid; grid-template-columns: 28px auto 220px 90px 170px 100px }
	.list-o .data .tbl .tbd { height: 440px; position: relative; border-top: 1px solid #f0f0ea; border-bottom: 1px solid #f0f0ea; }
	.list-o .data .tbl .tth { padding: 7px 10px; color: #202020; text-align: left; font-size: 11px; background-color: #fbfbf7; }
	.list-o .data .tbl .ttd { padding: 10px 0 10px 10px; height: 30px; font-size: 11px; text-overflow: clip; overflow-x: hidden; white-space: nowrap; }
	.list-o .data .tbl .tbd .ttr { border-bottom: 1px solid #fbfbf7; cursor: pointer; }
	.list-o .data .tbl .tbd .ttr:hover, .list-o .data .tbl .tbd .ttr.active { background-color: #fbfbf7; }
	.list-o .data .tbl .ttd b {}
	.list-o .data .tbl .ttd svg { width: 10px; height: 10px; margin-bottom: 2px; color: #fff; border: 1px solid #c0c0ba; }
	.list-o .data .tbl .ttd svg.a { color: #ccc; }
	.list-o .data .tbl .ttd svg.l { color: #fff; }
	.list-o .data .tbl .ttd svg.i { color: #999; }
	.list-o .data .tbl .tth svg { width: 12px; height: 12px; color: #404040; margin-bottom: -3px; }
	.list-o .data .tbl .tth svg.s { float: right; width: 10px; height: 10px; color: #404040; margin-bottom: -2px; }

	.list-o .data .tbl .tbd.x { display: flex; justify-content: center; align-items: center; flex-direction: column; }
	.list-o .data .tbl .tno { background-color: #f8f8f8; padding: 5px; font-size: 10px; color: #a0a090; text-transform: uppercase; }
	.list-o .data .tbl .rel { display: block; cursor: pointer; font-size: 9px; text-transform: uppercase; padding: 7px 12px;  }
	.list-o .data .tbl .rel svg { width: 9px; height: 9px; color: #404040; margin-bottom: -2px; }

	.list-o .page { display: grid; grid-template-columns: 40% 20% 40%; padding: 5px 10px; border-top: 1px solid #f0f0f0; background-color: #fff; }
	.list-o .page .l { text-align: left; }
	.list-o .page .c { text-align: center; }
	.list-o .page .r { text-align: right; }
	.list-o .page .r button { margin-left: 4px; }
	.list-o .page button { background: #fff; padding: 4px 10px; font-size: 8px; border: 1px solid #e0e0da; }
	.list-o .page button svg { width: 10px; height: 10px; margin-bottom: -2px; }

	.find-o { margin: 0 16px 10px 16px; display: grid; grid-template-columns: auto 200px; border: none; padding-top: 16px; }
	.find-o .u {}
	.find-o .u span { font-size: 11px; padding: 10px 0; display: inline-block; height: 24px; margin-right: 12px; }
	.find-o .u span svg { width: 10px; height: 10px; margin-right: 4px; }
	.find-o .u span svg.n { color: #fff; border: 1px solid #c0c0ba  }
	.find-o .u span svg.c { color: #ccc; border: 1px solid #c0c0ba  }
	.find-o .u span svg.s { color: #808080; border: 1px solid #c0c0ba  }

	.find-o .v { position: relative; }
	.find-o .v input { width: 100%; height: 24px; border-radius: 2px; color: #391e22; padding: 7px 10px; border: 1px solid #f0f0f0;  background-color: #fdfdfd; font-size: 11px; border: 1px solid #e0e0da; outline: none;  }
	.find-o .v svg { position: absolute; top: 6px; right: 8px; height: 12px; width: 12px; }
</style>

<template>
	<div class="wrap-m">
		<div class="w">
			<div class="p">
				<div class="list-o">
					<div class="data">
						<div class="tbl">
							<div class="thd">
								<div class="tth">Type</div>
								<div class="tth">Name</div>
								<div class="tth">Department</div>
								<div class="tth">Programme</div>
								<div class="tth">Total Units</div>
							</div>
							<div class="tbd" v-if="isFetchingList">
								<ui-loader></ui-loader>
							</div>
							<div class="tbd" v-else-if="courses.length > 0">
								<div :class="['ttr', selectCourseId == c.id ? 'active' : '']" :key="'cou-list_'+ c.id" v-for="c in courses" @contextmenu="courseListCMenu($event, c)">
									<div class="ttd">{{ c.program_type }}</div>
									<div class="ttd">{{ c.name }} ({{ c.name_alias }})</div>
									<div class="ttd">{{ c.department.name }}</div>    
									<div class="ttd">{{ c.acadprogram.name }}</div>
									<div class="ttd">{{ c.total_units }}</div>
								</div>
							</div>
							<div class="tbd x" v-else>
								<div class="tno" style="text-align: center">{{ isErrorConnect ? 'Failure Server Connection' : 'No Data Available'}}</div>
							</div>
						</div>
					</div>
					<div class="page">
						<div class="l">
							<button @click="fetchCourses()">RELOAD</button>
						</div>
						<div class="c">
						</div>
						<div class="r">
							<button :disabled="listStart == 0" @click="goPrevList()"><v-icon name="angle-left"></v-icon> PREV</button>
							<button :disabled="courses.length != listLimit" @click="goNextList()">NEXT <v-icon name="angle-right"></v-icon></button>
						</div>
					</div>
				</div>
			</div>
			<div class="q">
				<div class="d">
					<div class="i">
						<input type="text" placeholder="Find Course \name"/>
						<v-icon name="search"></v-icon>
					</div>
					<div class="f">
						<div @click="filterDept = 0" :class="filterDept == 0 ? 'active' : ''">
							<b>All</b>
							<span>√</span>
						</div>
						<div></div>
						<div :class="filterDept == 1 ? 'active' : ''">
							<ui-select @setValue="setDepartment" :options="departments" :styles="['border-radius: 0; padding: 7px 10px;']"></ui-select>
							<span>√</span>
						</div>
					</div>
				</div>
				<div class="s">
					<button>Filter</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import UISelect from '@/components/UISelect.vue';
	import UILoader from '@/components/UILoader.vue';

	import 'vue-awesome/icons/search';

	export default {
		components: {
			UiSelect: UISelect,
			UiLoader: UILoader
		},
		data() {
			return {
				isFetchingList: false,
				isErrorConnect: false,
				isListReachEnd: false,
				isDataReachEnd: false,
				queryString: '',
				queryAction: 'lister',
				queryType: 'name',
				listStart: 0,
				listLimit: 14,
				courses: [],
				selectCourseId: 0,
				departments: [],
				departmentId: 0,
				filterDept: 0
			}
		},
		methods: {
			setDepartment(v) {
				if (v > 0)
					this.filterDept = 1;
				this.departmentId = v;
			},
			fetchCourses() {
				this.isFetchingList = true;
				this.$http.get('course/?action='+ this.queryAction +'&start='+ this.listStart +'&limit='+ this.listLimit +'&type='+ this.queryType +'&query='+ this.queryString +'&refer=department-all&course_fields=id,name,name_alias,program_type,total_units,department,acadprogram&department_fields=id,name,name_alias&acadprogram_fields=id,name').then( res => { 
					this.courses = res.data;
				}).catch( () => {
					this.isErrorConnect = true;
				}).finally( () => {
					this.isFetchingList = false
				});
			},
			courseListCMenu(e, l) {
				e.preventDefault();
				this.selectCourseId = l.id;
				let cmenu = new window.nw.Menu(),
					items = [
						{ label: 'Modify Course', click: () => this.$router.push({ name: 'adm-mod-admittee', query: { admit_id: l.id } }) },
						{ label: 'Refresh', click: this.fetchCourses, key: 'F5', },
						{ type: 'separator' },
						{ label: l.program_type +' '+ l.name_alias, enabled: false }
					];
				items.forEach( m => cmenu.append(new window.nw.MenuItem(m)) );
				let zoomFactor = Math.pow(1, window.nwWin.zoomLevel);
				cmenu.popup(
					Math.round(zoomFactor * e.clientX),
					Math.round(zoomFactor * e.clientY)
				);
			},
			fetchDepartments() {
				this.$http.get('department/?action=lister').then(res => {
					this.departments = res.data;
				});
			},
			goNextList() {
				this.listStart++;
				this.fetchCourses();
			},
			goPrevList() {
				if (this.listStart > 0)
					this.listStart--;
				this.fetchCourses();
			}
		},
		created() {
			this.$emit('setViewName', this.$route.name);
			this.$store.commit('setModuleName', 'Courses – Master List');
		},
		mounted() {
			this.fetchDepartments();
			this.fetchCourses();
		}
	}
</script>

<style scoped>
	.wrap-m { height: auto; position: relative; }
	.wrap-m .w { height: 100%; display: grid; grid-template-columns: auto 312px; }
	.wrap-m .w .p { height: 100%; padding: 16px; }
	.wrap-m .w .q { height: 100%; border-left: 1px solid #f0f0f0; background: #f8f8f2; }

	.list-o { background-color: #fff; font-size: 12px; }
	.list-o .data .tbl { position: relative;  }
	.list-o .data .tbl .thd, .list-o .data .tbl .ttr { display: grid; grid-template-columns: 50px auto 200px 180px 70px }
	.list-o .data .tbl .tbd { height: 470px; overflow: hidden; position: relative; border-top: 1px solid #f0f0ea; border-bottom: 1px solid #f0f0ea; }
	.list-o .data .tbl .tbd::-webkit-scrollbar { width: 6px; display: block; }
	.list-o .data .tbl .tbd::-webkit-scrollbar-track { background: #f6f6f0; }
	.list-o .data .tbl .tbd::-webkit-scrollbar-thumb { background-color: #d7d7d0; border-radius: 3px; }

	.list-o .data .tbl .tth { padding: 7px 10px; color: #202020; text-align: left; font-size: 11px; background-color: transparent; }
	.list-o .data .tbl .ttd { padding: 10px 10px 10px 10px; height: 30px; font-size: 11px; text-overflow: clip; overflow: hidden; white-space: nowrap; }
	.list-o .data .tbl .tbd .ttr { border-bottom: 1px solid #fbfbf7; cursor: pointer; }
	.list-o .data .tbl .tbd .ttr:hover, .list-o .data .tbl .tbd .ttr.active { background-color: #f6f6f0; }
	.list-o .data .tbl .ttd b {}
	.list-o .data .tbl .ttd svg { width: 10px; height: 10px; margin-bottom: 2px; color: #fff; border: 1px solid #c0c0ba; }
	.list-o .data .tbl .ttd svg.a { color: #ccc; }
	.list-o .data .tbl .tth svg { width: 12px; height: 12px; color: #404040; margin-bottom: -3px; }
	.list-o .data .tbl .tth svg.s { float: right; width: 10px; height: 10px; color: #404040; margin-bottom: -2px; }

	.list-o .data .tbl .tbd.x { display: flex; justify-content: center; align-items: center; flex-direction: column; }
	.list-o .data .tbl .tno { padding: 5px; font-size: 10px; color: #a0a090; text-transform: uppercase; }
	.list-o .data .tbl .rel { display: block; cursor: pointer; font-size: 9px; text-transform: uppercase; padding: 7px 12px;  }
	.list-o .data .tbl .rel svg { width: 9px; height: 9px; color: #404040; margin-bottom: -2px; }

	.list-o .page { display: grid; grid-template-columns: 40% 20% 40%; padding: 5px 10px; border-top: 1px solid #f0f0f0; background-color: #fff; }
	.list-o .page .l { text-align: left; }
	.list-o .page .c { text-align: center; }
	.list-o .page .r { text-align: right; }
	.list-o .page .r button { margin-left: 4px; }
	.list-o .page button { background: #fff; padding: 2px 10px; font-size: 8px; border: 1px solid #d0d0d0; }
	.list-o .page button svg { width: 10px; height: 10px; margin-bottom: -2px; }
	.list-o .page button:disabled { border: 1px solid #fff; color: #777; cursor: default; }
	.list-o .page .r span { background: #fff; padding: 0 10px; font-size: 9px; border: 1px solid #fff; }

	.q .d { margin: 10px 10px 0 10px; padding: 12px; background-color: #fff; }
	.q .d .f { display: grid; grid-template-columns: 50px 6px auto; padding: 10px 0 0 0; }
	.q .d .f > div { background-color: #fbfbf7; position: relative; }
	.q .d .f b { height: 27px; display: flex; justify-content: center; align-items: center; font-weight: normal; background-color: #fff; border-style: solid; border-width: 1px; border-color: #f0f0f0 #eaeae6 #d0d0ca #eaeae6; font-size: 11px; }
	.q .d .f > div span { position: absolute; top: -5px; right: 5px; font-size: 10px; color: #111; display: none }
	.q .d .f > div.active span { display: block}

	.q .d .i { position: relative; }
	.q .d .i input { display: block; width: 100%; color: #111; background-color: #fdfdfd; border: none; outline: none; cursor: pointer; border-style: solid; border-width: 1px; border-color: #f0f0f0 #eaeaea #d0d0d0 #eaeaea; position: relative; border-radius: 2px; padding: 6px 10px 6px 10px; height: 28px; font-size: 11px; }
	.q .d .i svg { position: absolute; top: 10px; right: 10px; width: 10px; height: 10px; }

	.q .s { margin: 0 10px; }
	.q .s button { height: 28px; display: block; border: none; background-color: #fbfbf7; font-size: 11px; font-weight: 600; width: 100% }
	.q .s button:hover { background-color: #f0f0ea; }
</style>
 
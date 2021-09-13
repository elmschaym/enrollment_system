<template>
	<div class="wrap-l">
		<div class="find-o">
			<div class="u">
				<span><v-icon class="a" name="square"></v-icon> Admitted</span>
				<span><v-icon class="o" name="square"></v-icon> Off-semester</span>
				<span><v-icon class="i" name="square"></v-icon> Not Active</span>
			</div>
			<div class="v">
				<input v-model="queryString" :placeholder="'Find Student \\'+ queryType"/>
				<v-icon name="search"></v-icon>
			</div>
			<div class="w">
				<button @click="switchQueryType()">{{ queryType }}</button>
			</div>
		</div>
		<div class="list-o">
			<div class="data">
				<div class="tbl">
					<div class="thd">
						<div class="tth"></div>
						<div class="tth">Student ID</div>
						<div class="tth">Full Name <v-icon class="s" name="sort"></v-icon></div>
						<div class="tth">Course<v-icon class="s" name="sort"></v-icon></div>
						<div class="tth">Academic Program</div>
						<div class="tth">Date Admitted</div>
					</div>
					<div class="tbd" v-if="isFetching">
						<u-i-loader></u-i-loader>
					</div>
					<div class="tbd" v-else-if="admissions.length > 0">
						<div :class="['ttr', selectId == l.id ? 'active' : '']" @click="$router.push({ name: 'adm-view-admittee', params: { admit_id : l.id}})" :key="l.id" v-for="l in admissions" @contextmenu="admitteeListCMenu($event, l)">
							<div class="ttd"><v-icon name="square"></v-icon></div>
							<div class="ttd">{{ l.student.school_id }}</div>
							<div class="ttd">{{ l.student.lastname +', '+ l.student.firstname +' '+ l.student.middlename }}</div>
							<div class="ttd">{{ l.course == null ? '&lt;None&gt;' : l.course.name }}</div>    
							<div class="ttd">{{ l.academic_program.name }}</div>
							<div class="ttd">{{ l.date_admitted }}</div>
						</div>
					</div>
					<div class="tbd x" v-else>
						<div class="tno" style="text-align: center">{{ isErrorConnect ? 'Failure Server Connection' : 'No Data Available'}}</div>
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
					<button :disabled="listStart == 0" @click="goPrevList()"><v-icon name="angle-left"></v-icon> PREV</button>
					<button :disabled="admissions.length != listLimit" @click="goNextList()">NEXT <v-icon name="angle-right"></v-icon></button>
				</div>
			</div>
		</div>
		<u-i-window-edit v-if="isModifyAdmittee"></u-i-window-edit>
	</div>
</template>

<script>
	import UIWindowEdit from './UIWindowEdit.vue';
	import UISelect from './UISelect.vue';
	import UILoader from './UILoader.vue';
	import 'vue-awesome/icons/angle-right';
	import 'vue-awesome/icons/angle-left';
	import 'vue-awesome/icons/square';
	import 'vue-awesome/icons/sort';
	import 'vue-awesome/icons/ellipsis-v';
	import 'vue-awesome/icons/plus';
	import 'vue-awesome/icons/search';
	import 'vue-awesome/icons/square';

	export default {
		props: ['viewName', 'admitType'],
		components: {
			UISelect,
			UILoader,
			UIWindowEdit
		},
		data() {
			return {
				queryString: '',
				queryAction: 'lister',
				queryType: 'name',
				isFetching: false,
				isErrorConnect: false,
				isListReachEnd: false,
				isDataReachEnd: false,
				isModifyAdmittee: false,
				admissions: [],
				listStart: 0,
				listLimit: 14,
				selectId: 0
			}
		},
		methods: {
			modifyAdmittee(l) {
			},
			fetchAdmission() {
				this.isFetching = true;
				this.$http.get('admission/?action='+ this.queryAction +'&start='+ this.listStart +'&limit='+ this.listLimit +'&type='+ this.queryType +'&query='+ this.queryString +'&admission_fields=id,date_admitted,status,student,course,academic_program&student_fields=school_id,firstname,middlename,lastname&course_fields=id,name&acadprogram_fields=id,name').then( res => {
					this.admissions = res.data;
				}).catch(() => {
					this.isErrorConnect = true;
				}).finally( () => {
					this.isFetching = false;
				});
			},
			admitteeListCMenu(e, l) {
				e.preventDefault();
                this.selectId = l.id;
                let cmenu = new window.nw.Menu(),
                    items = [
                        { label: 'Modify Admittee', click: () => this.modifyAdmittee(l) },
                        { label: 'Refresh', click: this.fetchAdmission, key: 'F5', },
                        { type: 'separator' },
                        { label: l.student.lastname +', '+ l.student.firstname, enabled: false }
                    ];
                items.forEach( m => cmenu.append(new window.nw.MenuItem(m)) );
                let zoomFactor = Math.pow(1, window.nwWin.zoomLevel);
                cmenu.popup(
                    Math.round(zoomFactor * e.clientX),
                    Math.round(zoomFactor * e.clientY)
                );
            },
			switchQueryType() {
				this.queryType = this.queryType == 'name' ? 'id' : 'name';
			},
			goNextList() {
				this.listStart++;
				this.fetchAdmission();
			},
			goPrevList() {
				if (this.listStart > 0)
					this.listStart--;
				this.fetchAdmission();
			}
		},
		watch: {
			queryString(n) {
				this.queryAction =  n.length > 0 ? 'finder' : 'lister';
				this.listStart = 0;
				this.$sleep(250).then(this.fetchAdmission);
			},
			'$store.state.isReloadView'() {
				console.log(1);
				this.fetchAdmission();
			}
		},
		mounted() {
			this.fetchAdmission();
		}
	}
</script>

<style scoped>
	.wrap-l { height: 100%; background-color: #fbfbf7; position: relative; }

	.list-o { margin: 0 16px; background-color: #fff; font-size: 12px; }
	.list-o .data .tbl { position: relative; }
	.list-o .data .tbl .thd, .list-o .data .tbl .ttr { display: grid; grid-template-columns: 28px 82px auto 250px 210px 110px }
	.list-o .data .tbl .tbd { height: 440px; overflow: hidden; position: relative; border-top: 1px solid #f0f0ea; border-bottom: 1px solid #f0f0ea; }
	.list-o .data .tbl .tbd::-webkit-scrollbar { width: 6px; display: block; }
	.list-o .data .tbl .tbd::-webkit-scrollbar-track { background: #f6f6f0; }
	.list-o .data .tbl .tbd::-webkit-scrollbar-thumb { background-color: #d7d7d0; border-radius: 3px; }

	.list-o .data .tbl .tth { padding: 7px 10px; color: #202020; text-align: left; font-size: 11px; background-color: #fbfbf7; }
	.list-o .data .tbl .ttd { padding: 10px; height: 30px; font-size: 11px; text-overflow: clip; overflow: hidden; white-space: nowrap; }
	.list-o .data .tbl .tbd .ttr { border-bottom: 1px solid #fbfbf7; cursor: pointer; }
	.list-o .data .tbl .tbd .ttr:hover, .list-o .data .tbl .tbd .ttr.active { background-color: #f6f6f0; }
	.list-o .data .tbl .ttd b {}
	.list-o .data .tbl .ttd svg { width: 10px; height: 10px; margin-bottom: 2px; color: #fff; border: 1px solid #c0c0ba; }
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

	.find-o { margin: 0 16px 10px 16px; display: grid; grid-template-columns: auto 200px 50px; border: none; padding-top: 16px; }
	.find-o .u {}
	.find-o .u span { font-size: 11px; padding: 10px 0; display: inline-block; height: 24px; margin-right: 12px; }
	.find-o .u span svg { width: 10px; height: 10px; margin-right: 4px; }
	.find-o .u span svg.a { color: #fff; border: 1px solid #c0c0ba;  }
	.find-o .u span svg.o { color: #ccc; border: 1px solid #c0c0ba;  }
	.find-o .u span svg.i { color: #808080; border: 1px solid #c0c0ba;  }

	.find-o .v { position: relative; }
	.find-o .v input { width: 100%; height: 24px; border-radius: 2px; color: #391e22; padding: 7px 10px; background-color: #fdfdfd; font-size: 11px; border: 1px solid #e0e0da; outline: none; border-right: none;  }
	.find-o .v svg { position: absolute; top: 6px; right: 8px; height: 12px; width: 12px; }
	.find-o .w {}
	.find-o .w button { width: 100%; height: 24px; border-radius: 2px; color: #391e22; padding: 7px 10px; background-color: #fdfdfd; font-size: 11px; border: 1px solid #e0e0da; outline: none;  }

	.item-o { position: absolute; height: 440px; width: 300px; background-color: #fff; right: -310px; top: 60px; border: 1px solid #fbfbf7; box-shadow: 0 4px 9px rgba(0,0,0,0.15); transition: all 250ms ease-in-out; }
	.item-o.toggled { right: 10px; }
</style>

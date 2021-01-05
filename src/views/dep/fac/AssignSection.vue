<template>
	<div class="form-o">
		<div class="w">
			<div class="p">
				<div class="u">
					<div class="h">
						<div class="pixx">
							<v-icon name="user"></v-icon>
						</div>
						<div class="name">
							<div class="n" v-if="faculty.hasOwnProperty('id')">{{ faculty.last_name }}, {{ faculty.first_name }}</div>
							<div class="m" v-if="faculty.hasOwnProperty('id')">{{ parsePosition(faculty.position) }} </div>
						</div>
						<div class="butt">
							<button>Print Schedule <v-icon name="print"></v-icon></button>
						</div>
					</div>
					<div class="r o">
						<div class="x">
							<div class="a">Handled Subjects <span style="float: right" @click="fetchSubjectsHandled()">Refresh</span></div>
							<div class="b">
								<div>Code</div>
								<div>Section</div>
								<div>Week</div>
								<div>Time</div>
								<div>Room</div>
								<div style="text-align: center">Units</div>
							</div>
							<div class="d" v-if="subjects.length > 0">
								<div :key="'subj'+ s.id" v-for="(s,i) in subjects" @contextmenu="subjectListCMenu($event, s, i)">
									<div>{{ s.subject.code }}</div>
									<div>{{ s.name }}</div>
									<div>{{ s.sched_days }}</div>
									<div>{{ s.sched_time }}</div>
									<div>{{ s.room.name }}</div>
									<div style="text-align: center">{{ s.subject.units }} </div>
								</div>
							</div>
							<div class="z" v-else>
								No Handled Subjects
							</div>
							<div class="e" v-if="faculty.hasOwnProperty('id')">
								<div>{{ totalSubjects }} Subject(s)</div>
								<div style="text-align: right">{{ totalLoad }} / {{ maximumLoad}} Teaching Load</div>
							</div>
						</div>
						<div class="y">
							<div class="a">Available Sections <span style="float: right" @click="fetchSections()">Refresh</span></div>
							<div class="b">
								<div></div>
								<div>Code</div>
								<div style="text-align: center">Slots</div>
							</div>
							<div class="d" v-if="sectionsAvailable.length > 0">
								<div :key="'sect'+ s.id" v-for="(s,i) in sectionsAvailable" @contextmenu="sectionListCMenu($event, s, i)">
									<div style="text-align: center"><v-icon :class="s.stat == 1 ? 'rr' : (s.stat == 2) ? 'gg' : 'bb'" name="square"></v-icon></div>
									<div>{{ s.name }}</div>
									<div style="text-align: center">{{ s.slots }}</div>
								</div>
							</div>
							<div class="z" v-else>
								No Section Available
							</div>
							<div class="e">
								<span><v-icon class="bb" name="square"></v-icon> Available</span>
								<span><v-icon class="rr" name="square"></v-icon> Conflict</span>
								<span><v-icon class="gg" name="square"></v-icon> Handled</span>
							</div>
						</div>
					</div>
					<div class="r">
						<o-time-schedule v-if="subjects" :subjects="subjects"></o-time-schedule>
					</div>
				</div>
			</div>
			<div class="q">
				<div class="t">
					<find-e-subject @setValue="setSubjectFromSearch"></find-e-subject>
				</div>
				<div class="s">
				</div>
			</div>
		</div>
		<ui-loader v-if="isFetchingFaculty"></ui-loader>
	</div>
</template>

<script>
	import OTimeSchedule from '@/components/OTimeSchedule.vue';
	import FindESubject from '@/components/FindESubject.vue';
	import UILoader from '@/components/UILoader.vue';
	import 'vue-awesome/icons/user';
	import 'vue-awesome/icons/square';
	import 'vue-awesome/icons/plus';
	import 'vue-awesome/icons/print';

	export default {
        emits: ['setViewName'],
		components: {
			UiLoader: UILoader,
			OTimeSchedule,
			FindESubject
		},
		data() {
			return {
				isFetchingFaculty: true,
				isErrorConnect: false,
				faculty: {},
				sectionsAvailable: [],
				subjects: [],
				subject: {}
			}
		},
		computed: {
			totalLoad() {
				let total = 0;
				this.subjects.forEach(x => { total += x.subject.units });
				return total;
			},
			maximumLoad() {
				return this.faculty.teaching.unit_load;
			},
			totalSubjects() {
				return this.subjects.length;
			}
		},
		methods: {
			setSubjectFromSearch(v) {
				this.subject = v;
				this.fetchSections();
			},
			parsePosition(v) {
				return this.$store.state.forms.faculty.positions.find(x => x.id == v).name;
			},
			fetchSections() {
				if (this.subject.hasOwnProperty('id')) {
					const irange = (size, startAt = 0) => [...Array(size).keys()].map(i => i + startAt),
						crange = (startChar, endChar) => String.fromCharCode(...irange(endChar.charCodeAt(0) - startChar.charCodeAt(0) + 1, startChar.charCodeAt(0)));
					this.$http.get('section/?action=lister&refer=subject&subid='+ this.subject.id +'&section_fields=id,name,sched_days,sched_time,slots,faculty').then(res => {
						let data = res.data,
							predata = [];
						data.forEach( d => {
							let s = (d.faculty == null) ? 0 : (this.subjects.length > 0 && this.subjects.some(s => s.name == d.name)) ? 1 : 2;
							if (this.subjects.length > 0 && s == 0) {
								let w = d.name.toUpperCase(),
									[b, t] = w.split('-');
								this.subjects.forEach(r => {
									let k = r.name.toUpperCase(),
										[f, g] = k.split('-'),
										c = Array.from(f).some(v => b.includes(v));
									if (c && (crange(t[0], t[1]).indexOf(g[1]) > 0 || crange(g[0], g[1]).indexOf(t[1]) > 0))
										s = 1;
								});
							}
							predata.push(Object.assign({}, d, { stat: s }));
						});
						this.sectionsAvailable = predata;
					});
				}
			},
			fetchFaculty() {
				this.isFetchingFaculty = true;
				this.$http.get('faculty/'+ this.$route.query.faculty_id +'/?faculty_fields=id,first_name,last_name,position,teaching').then(res => {
					if (res.data.hasOwnProperty('id')) {
						this.faculty = res.data;
						this.fetchSubjectsHandled();
					} else {
						this.isErrorConnect = true;
					}
				}).catch( () => {
					this.isErrorConnect = true;
				}).finally( () => {
					this.isFetchingFaculty = false;
				});
			},
			fetchSubjectsHandled() {
				this.$http.get('section/?action=lister&refer=faculty&facid='+ this.$route.query.faculty_id +'&section_fields=id,name,sched_days,sched_time,room,subject&subject_fields=id,code,units&room_fields=id,name').then(res => {
					this.subjects = res.data;
				});
			},
			sectionListCMenu(e, s) {
				e.preventDefault();
				let cmenu = new window.nw.Menu(),
					items = [
						{ label: 'Handle Section', click: () => this.handleSection(s), key: 'e', modifiers: "ctrl", enabled: s.stat == 0 },
						{ label: 'Refresh', click: this.fetchSections },
						{ type: 'separator' },
						{ label: s.name + ', ' + s.sched_days +' '+ s.sched_time, enabled: false }
					];
				items.forEach( m => cmenu.append(new window.nw.MenuItem(m)) );
				cmenu.popup(e.pageX, e.pageY);
			},
			subjectListCMenu(e, s) {
				console.log(s);
				e.preventDefault();
				let cmenu = new window.nw.Menu(),
					items = [
						{ label: 'Remove Subject', click: () => this.removeSubject(s), key: 'x', modifiers: "ctrl" },
						{ label: 'Refresh', click: this.fetchSubjectsHandled },
						{ type: 'separator' },
						{ label: s.subject.code +' – '+ s.subject.units +' units', enabled: false }
					];
				items.forEach( m => cmenu.append(new window.nw.MenuItem(m)) );
				cmenu.popup(e.pageX, e.pageY);
			},
			handleSection(s,i) {
				if (this.faculty.hasOwnProperty('id') && s.stat == 0 && ((this.maximumLoad - this.totalLoad) > this.subject.units)) {
					this.$http.put('section/'+ s.id +'/?action=faculty-handle', { faculty: this.faculty.id }).then(res => {
						this.fetchSubjectsHandled();
					});
				}
			},
			removeSubject(s) {
				this.$http.put('section/'+ s.id +'/?action=faculty-unhandle', { faculty: this.faculty.id }).then(res => {
					this.fetchSubjectsHandled();
					this.fetchSections();
				});
			}
		},
		created() {
			this.fetchFaculty();
		},
		mounted() {
            this.$emit('setViewName', this.$route.name);
			this.$store.commit('setModuleName', 'Department – Assign Section');
		}
	}
</script>

<style scoped>
	.form-o { height: auto; position: relative; }
	.form-o .w { height: 100%; display: grid; grid-template-columns: auto 312px; }
	.form-o .w .p { height: 100%; padding: 0 16px; }
	.form-o .w .q { height: 100%; border-left: 1px solid #f0f0f0; background: #f8f8f2; }
	
	.p .u {}
	.p .u, .p .v {  padding: 16px; }

	.p .h { padding: 0 0 8px 0; border-bottom: 1px solid #d0d0c0; display: grid; grid-template-columns: 40px auto 128px; margin-bottom: 0px;}
	.p .h .pixx { height: 40px; width: 40px; background-color: #f5f5f0; box-shadow: 0 1px 1px rgba(0,0,0,0.24); }
	.p .h .pixx svg { height: 32px; width: 32px; margin: 4px; color: #d5d5d0; }
	.p .h .name { padding: 0 0 0 12px; }
	.p .h .name .n { font-size: 12px; font-weight: 600; margin: 4px 0; }
	.p .h .name .m { font-size: 11px;  }
	.p .h .butt { display: flex; align-items: center; }
	.p .h .butt button { width: 100%; border-radius: 2px; color: #000; padding: 3px 8px 2px 8px; border: none; background-color: #f5f5ed; font-size: 11px; outline: none; cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 1px rgba(0,0,0,0.24); }
	.p .h .butt button svg { width: 10px; height: 10px; margin-left: 8px; }

	.p .r.o { border-bottom: 4px solid #c0c0ba; }
	.p .r.o { display: grid; grid-template-columns: auto 200px; padding: 16px 0; }
	.p .r.o .x { background-color: #fff; border-right: 1px solid #f0f0f0; iborder-bottom: 1px solid #f0f0f0; }    
	.p .r.o .x .a { font-size: 11px; color: #111; padding: 6px 7px; border-top: 1px solid #f0f0f0; box-shadow: 0 1px 1px rgba(0,0,0,0.24); background-color: #f9f9f7; }
	.p .r.o .x .a span { font-size: 10px; background-color: #fff; padding: 2px 4px; border: 1px outset #fff; cursor: pointer; display: inline-block; margin-top: -2px; }
	.p .r.o .x .b, .p .r.o .x .d > div { display: grid; grid-template-columns: 70px 55px 50px auto 60px 40px  }
	.p .r.o .x .z { height: 207px; text-align: center; padding: 16px; font-size: 11px; }
	.p .r.o .x .b { background-color: #fcfcf9; margin-top: 2px; iborder-bottom: 1px solid #fafafa; }
	.p .r.o .x .b div { padding: 7px; font-size: 10px; }
	.p .r.o .x .d { height: 207px; overflow-y: scroll; }
	.p .r.o .x .d > div { cursor: pointer; }
	.p .r.o .x .d > div:hover { background-color: #efefea }
	.p .r.o .x .d > div div { padding: 6px 7px; font-size: 11px; border-bottom: 1px solid #fafafa; }
	.p .r.o .x .e { display: grid; grid-template-columns: 40% 60%; font-size: 10px; color: #111; padding: 6px 7px; border-top: 1px solid #f0f0f0; box-shadow: 0 1px 1px rgba(0,0,0,0.24); height: 24px; }

	.p .r.o .y {}
	.p .r.o .y .a { font-size: 11px; color: #111; padding: 6px 10px; border-top: 1px solid #f0f0f0; box-shadow: 0 1px 1px rgba(0,0,0,0.24); background-color: #f9f9f7; }
	.p .r.o .y .a span { font-size: 10px; background-color: #fff; padding: 2px 4px; border: 1px outset #fff; cursor: pointer; display: inline-block; margin-top: -2px; }
	.p .r.o .y .b, .p .r.o .y .d > div { display: grid; grid-template-columns: 30px auto 86px }
	.p .r.o .y .b { border-bottom: 1px solid #fafafa; background-color: #fcfcf9; margin-top: 2px; }
	.p .r.o .y .b div { padding: 7px 12px; font-size: 10px; }
	.p .r.o .y .d { height: 206px; overflow-y: scroll; }
	.p .r.o .y .d > div div { padding: 6px 12px; font-size: 11px; }
	.p .r.o .y .d > div div svg { width: 10px; height: 10px; }
	.p .r.o .y svg.rr { color: #fa897b; }
	.p .r.o .y svg.bb { color: #9ee1e2; }
	.p .r.o .y svg.gg { color: #d0d0d0; }
	.p .r.o .y .d > div { cursor: pointer; border-bottom: 1px solid #fafafa; }
	.p .r.o .y .d > div:hover { background-color: #efefea }
	.p .r.o .y .z { height: 206px; text-align: center; padding: 16px; font-size: 11px; }
	.p .r.o .y .e { height: 24px; font-size: 10px; display: grid; grid-template-columns: 33% 34% 33%; padding: 6px 7px; border-top: 1px solid #f0f0f0; box-shadow: 0 1px 1px rgba(0,0,0,0.24); }
	.p .r.o .y .e span { display: block; text-align: center; }
	.p .r.o .y .e span svg { height: 10px; width: 10px; }

	.q .t { position: relative; padding: 12px; }

	.moda-l input { width: 90%; display: block; text-align: center; border-radius: 2px; color: #000; padding: 6px 8px 6px 8px; border: none; background-color: #fdfdfd; font-size: 12px; outline: none; cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 1px rgba(0,0,0,0.24); margin: 20px auto; }
	.moda-l .e { color: #cd4646; text-align: center;; padding: 6px; background-color: #fde6e6; width: 90%; margin: 0 auto; }

	.v { position: relative; }
	.dsbd { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(255,255,255,0.7) }
</style>

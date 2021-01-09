<template>
	<div class="form-o">
		<div class="w">
			<div class="p">
				<div class="u">
					<div class="h">
						<div class="code">
							{{ subject.code }}
						</div>
						<div class="name">
							<div class="n">{{ subject.name }}</div>
							<div class="m">{{ subject.units }} Units</div>
						</div>
						<div class="butt">
							<button @click="addSection()" :class="isFormOkay ? 'okay' : ''" :disabled="!isFormOkay"><v-icon name="plus"></v-icon> Add Sched</button>
						</div>
					</div>
					<div class="r s">
						<div class="c">
							<div>
								<label for="">Week Day</label>
								<ui-select @setValue="setSchedDay" :options="daysList" :styles="['width: 95%']"></ui-select>
							</div>
							<div>
								<label for="">Start Time</label>
								<ui-select @setValue="setSchedTimeStart" :options="timeStartList" :styles="['width: 95%']"></ui-select>
							</div>
							<div>
								<label for="">End Time</label>
								<ui-select @setValue="setSchedTimeEnd" :options="timeEndList" :styles="['width: 95%']"></ui-select>
							</div>
							<div>
								<label for="">Slots</label>
								<input type="text" v-model="schedule.slots"/>
							</div>
						</div>
					</div>
					<div class="r o">
						<div class="x">
							<div class="a">Room List</div>
							<div class="b" v-if="roomsList.length > 0">
								<div :key="'list'+ r.id" v-for="r in roomsList"><v-icon name="square"></v-icon> {{ r.name }}<span style="float: right">{{r.slots}}</span></div>
							</div>
							<div class="n" v-else>
								<div>No room available</div>
							</div>
						</div>
						<div class="y">
							<div class="a">Available Rooms</div>
							<div class="b" v-if="roomsList.length > 0">
								<div :key="'open'+ r.id" v-for="r in roomsList" @click="setSchedRoom(r.id)" :class="r.id == schedule.room ? 'active': ''">{{ r.name }}</div>
							</div>
							<div class="b" v-else>
								No room available. Please select another time or day.
							</div>
							<div class="c" v-if="tempSched.day != ''">
								<div>{{ tempSched.day }}</div>
								<div>{{ tempSched.name }}</div>
								<div>{{ tempSched.time }}</div>
								<div>{{ getRoom(schedule.room) }}</div>
								<div @click="clearTempSched()">&times;</div>
							</div>
						</div>
					</div>
					<div class="r t">
						<div class="x" v-if="sections.length > 0">
							<div class="i" v-for="(s,i) in sections" :key="'sect'+s.name +'-'+i">
								<div class="sn">{{ s.name }}</div>
								<div class="st">
									<div class="nn">{{ s.sched_days }} {{ s.sched_time }}</div>
									<div class="mm">{{ s.room.name }} <span>{{ s.slots }} slots</span></div>
								</div>
							</div>
							<div style="clear: both"></div>
						</div>
					</div>
				</div>
				<div class="dsbd" v-if="subject.id == 0"></div>
			</div>
			<div class="q">
				<div class="t">
					<find-e-subject @setValue="setSubjectFromSearch"></find-e-subject>
				</div>
				<div class="s">
					<button :class="['br-confirm', isFormOkay ? 'okay' : '']" @click="goSaveSection()" :disabled="isSavingForm || !isFormOkay"><v-icon name="plus"></v-icon> Open Section</button>
				</div>
			</div>
		</div>
		<ui-loader v-if="isSavingForm"></ui-loader>
	</div>
</template>

<script>
	import UISelect from '@/components/UISelect.vue';
	import UILoader from '@/components/UILoader.vue';
	import FindESubject from '@/components/FindESubject.vue';

	import 'vue-awesome/icons/square';
	import 'vue-awesome/icons/trash';

	export default {
		components: {
			UiSelect: UISelect,
			UiLoader: UILoader,
			FindESubject
		},
		data() {
			return {
				isSavingForm: false,
				isErrorConnect: false,
				subject: { id: 0, name: '--', code: '--', units: 0 },
				schedule: { day: -1, time_start: -1, time_end: -1, room: -1, slots: 15 },
				sections: [],
				roomsList: [],
				roomsOpen: ['200', '201', '306','TBA'],
				codes: [],
				daysList: [ 
					{id: 0, name: 'M – Monday', alias: 'M', code: 'Z' },
					{id: 1, name: 'T – Tueday', alias: 'T', code: 'Y' },
					{id: 2, name: 'W – Wedneday', alias: 'W', code: 'X' },
					{id: 3, name: 'H – Thursday', alias: 'H', code: 'W' },
					{id: 4, name: 'F – Friday', alias: 'F', code: 'V' },
					{id: 5, name: 'S – Saturday', alias: 'S', code: 'U' },
					{id: 6, name: 'A – Sunday', alias: 'A', code: 'T' }
				],
				timeList: [],
				tempSched: { day: '', code: '', time: '', name: '', week: '' }
			}
		},
		computed: {
			isFormOkay() {
				for (let o in this.schedule) {
					if (this.schedule[o] == -1)
						return false;
				}
				return true;
			},
			timeStartList() {
				let list = [];
				this.timeList.forEach((v,i) => list.push({ id: i, name: v}));
				return list;
			},
			timeEndList() {
				let list = [];
				this.timeList.forEach((v,i) => list.push({ id: i, name: v}));
				return list;
			}
		},
		methods: {
			setSubjectFromSearch(v) {
				this.subject = v;
				this.fetchSections();
			},
			setSchedDay(d) {
				this.$set(this.schedule, 'day', d);
			},
			setSchedTimeStart(t) {
				this.$set(this.schedule, 'time_start', t);
			},
			setSchedTimeEnd(t) {
				this.$set(this.schedule, 'time_end', t);
			},
			setSchedRoom(r) {
				if (this.schedule.room == -1)
					this.$set(this.schedule, 'room', r);
			},
			getRoom(r) {
				return this.roomsList.find(x => x.id == r).name;
			},
			addSection() {
				let sched = { day: '', name: '', code: '', time: '', week: '' },
					d = (this.daysList[this.schedule.day]).alias,
					w = (this.daysList[this.schedule.day]).code,
					c = this.codes[this.schedule.time_start] + (this.codes[this.schedule.time_end]).toLowerCase(),
					t = this.timeStartList[this.schedule.time_start].name +'-'+ this.timeEndList[this.schedule.time_end].name;
				if (this.tempSched.day == '') {
					sched = { day: d, name: w+'-'+c, code: c, time: t, week: w };
					this.tempSched = sched;
				}
				else if (this.tempSched.name != (w+c)) {
					sched = this.tempSched;
					if (d != this.tempSched.day)
						sched.day = this.tempSched.day+d;
					if (w != this.tempSched.week)
						sched.week = this.tempSched.week+w;
					if (c != this.tempSched.code)
						sched.code = this.tempSched.code+c;
					if (this.tempSched.time != t)
						sched.time = this.tempSched.time == +','+t;
					sched.name = sched.week +'-'+ sched.code;
					this.tempSched = sched;
				}
			},
			clearTempSched() {
				this.tempSched = { day: '', code: '', time: '', name: '', week: '' };
			},
			goSaveSection() {
				this.isSavingForm = true
				if (this.isFormOkay) {
					this.$http.post('section/', { subject: this.subject.id, room: this.schedule.room, name: this.tempSched.name, sched_days: this.tempSched.day, sched_time: this.tempSched.time }).then( res => {
						console.log('sec_added');
					}).catch( () => {
						this.isErrorConnect = true;
					}).finally( () => {
						this.$sleep(1000).then( () => {
							this.isSavingForm = false;
							this.fetchSections();
							this.schedule = { day: -1, time_start: -1, time_end: -1, room: -1, slots: 15 };
							this.tempSched = { day: '', code: '', time: '', name: '', week: '' };
						});
					});
				}
			},
			fetchRoomList() {
				this.$http.get('room/?action=lister&room_fields=id,name,slots').then(res => {
					this.roomsList = res.data;
				});
			},
			fetchSections() {
				this.$http.get('section/?action=lister&refer=subject&subid='+this.subject.id+'&section_fields=id,name,sched_days,sched_time,slots,room&room_fields=id,name').then(res => {
					this.sections = res.data;
				});
			},
			generateTimeList() {
				let times = [], tt = 6*60, ap = ['AM', 'PM'];
				for (let i=0; tt<18*60; i++) {
					let hh = Math.floor(tt/60), mm = (tt%60), t = ("0" + (hh % 12)).slice(-2), h = t == '00' ? '12' : t;
					times[i] = h + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh/12)]; 
					tt = tt + 30;
				}
				this.timeList = times;
			},
			generateSchedCodes() {
				let codes = [];
				for (let i=0; i<24; i++)
					codes.push((i+10).toString(36).toUpperCase());
				this.codes = codes;
			}
		},
		created() {
			this.$store.commit('setModuleName', 'Department – New Section');
			this.generateSchedCodes();
			this.generateTimeList();
			this.fetchRoomList();
		}
	}
</script>

<style scoped>
	.form-o { position: relative; height: auto; }
	.form-o .w { height: 100%; display: grid; grid-template-columns: auto 312px; }
	.form-o .w .p { height: 100%; position: relative; background-color: #fff }
	.form-o .w .q { height: 100%; display: grid; grid-template-rows: auto 70px; border-left: 1px solid #f0f0f0; background: #f8f8f2; }

	.p .h { padding: 12px; border-bottom: 1px solid #f0f0f0; display: grid; grid-template-columns: 72px auto 90px; margin-bottom: 0px; }
	.p .h .code { display: flex; align-items: center; justify-content: center; font-size: 16px; color: #444; font-weight: 600; background-color: #f5f5f0; white-space: nowrap; overflow-x: hidden; padding-top: 6px; padding-bottom: 6px; box-shadow: 0 1px 1px rgba(0,0,0,0.24); }
	.p .h .name { padding: 2px 0 0 12px; }
	.p .h .name .n { font-size: 13px; font-weight: 600; margin: 2px 0; }
	.p .h .name .m { font-size: 11px;  }
	.p .h .butt { padding: 6px 0; }
	.p .h .butt button { width: 100%; border-radius: 2px; color: #808080; padding: 3px 8px 2px 8px; border: none; background-color: #f0f0ea; font-size: 11px; outline: none; cursor: pointer;  }
	.p .h .butt button.okay { color: #000; box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 1px rgba(0,0,0,0.24); }
	.p .h .butt button svg { width: 12px; height: 12px; }

	.p .r { position: relative; }
	.p .s { padding: 12px; background-color: #fbfbf7 }
	.p .r.s .c { display: grid; grid-template-columns: 150px auto auto 85px }
	.p .r.s .c input { width: 100%; height: 27px; border-radius: 2px; color: #000; padding: 3px 8px 3px 8px; border: none; background-color: #fff; font-size: 11px; outline: none; cursor: pointer; border-style: solid; border-width: 1px; border-color: transparent #eaeaea #d0d0d0 #eaeaea; }
	.p .r.s .c label { display: block; font-size: 11px; margin: 10px 0 4px 2px; color: #111; }
	.p .r.s .c button svg { width: 12px; height: 12px; }

	.p .r.o { background-color: #fbfbf7; padding: 0 12px 12px 12px; display: grid; grid-template-columns: 160px auto;  }
	.p .r.o .x { background-color: #fff; border: 1px solid #f0f0ea; border-right: 8px solid #fbfbf7; }    
	.p .r.o .x .a { font-size: 11px; color: #111; padding: 6px 12px; }
	.p .r.o .x .b,  .p .r.o .x .n { height: 200px; overflow-y: scroll; background-color: #fff; }
	.p .r.o .x .b > div { padding: 6px 12px; font-size: 11px; border-bottom: 1px solid #fafafa; }
	.p .r.o .x .b > div svg { width: 10px; height: 10px; color: #d0d0ca; margin-right: 6px; }
	.p .r.o .x .n > div { padding: 12px; font-size: 11px; text-align: center; }

	.p .r.o .y { background-color: #fff; border: 1px solid #f0f0ea; }
	.p .r.o .y .a { font-size: 11px; color: #111; padding: 6px 0; text-align: center; }
	.p .r.o .y .b { display: flex; padding: 16px; justify-content: center; height: 175px; }
	.p .r.o .y .b > div { border-radius: 2px; color: #000; padding: 10px 20px; border: none; background-color: #fff; font-size: 11px; outline: none; cursor: pointer; border: 1px solid #f0f0ea; margin: 5px; height: 32px; }
	.p .r.o .y .b > div.active { background-color: #fff; }
	.p .r.o .y .c { display: grid; grid-template-columns: 60px 75px auto 65px 25px; border-top: 1px solid #f0f0f0; border-bottom: 1px solid #f0f0f0; }
	.p .r.o .y .c div { padding: 6px 7px; font-size: 11px; }

	.p .r.t { padding: 10px 4px; border-top: 1px solid #f0f0ea; }
	.r.t .x { display: grid; grid-template-columns: 50% 50%; grid-auto-rows: 48px; height: 192px; overflow-y: scroll; }
	.r.t .x .i { width: 200px; height: 32px; display: grid; grid-template-columns: 42px auto; border: 1px solid #f0f0ea; margin: 8px auto; }
	.r.t .x .i .sn { height: 100%; background: #f0f0ea; color: #999; font-size: 13px; font-weight: 600; padding: 7px 0; text-align: center; }
	.r.t .x .i .st { padding: 2px 5px; background: #fbfbf7; }
	.r.t .x .i .st .nn { font-size: 11px; color: #111; margin-bottom: 2px; }
	.r.t .x .i .st .mm { font-size: 10px; color: #444; }
	.r.t .x .i .st .mm span { margin-left: 6px; }
	.r.t .x .z { padding: 16px; text-align: center; }

	.q .t { position: relative; padding: 12px; }

	.q .s { text-align: center; background-color: #f0f0ea; height: 70px; padding: 20px 0; }
	.q .s button {}
	.q .s button svg { height: 10px; width: 10px; color: #808080; }
	.q .s button.okay { border: 1px outset #e0e0d0; color: #000; }
	.q .s button.okay svg { color: #000; }

	.form-o .o {}

	.v { position: relative; }
	.dsbd { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: #fff }
</style>

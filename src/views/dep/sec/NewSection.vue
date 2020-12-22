<template>
    <div>
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
                                    <ui-select :setValue="setSchedDay" :options="daysList" :styles="['width: 95%']"></ui-select>
                                </div>
                                <div>
                                    <label for="">Start Time</label>
                                    <ui-select :setValue="setSchedTimeStart" :options="timeStartList" :styles="['width: 95%']"></ui-select>
                                </div>
                                <div>
                                    <label for="">End Time</label>
                                    <ui-select :setValue="setSchedTimeEnd" :options="timeEndList" :styles="['width: 95%']"></ui-select>
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
                            <div class="x">
                                <div>Section</div>
                                <div>Day</div>
                                <div>Time Schedule</div>
                                <div>Room</div>
                                <div>Slots</div>
                            </div>
                            <div class="y" v-if="sections.length > 0">
                                <div :class="['i', i%2!=0 ? 'odd' : '']" v-for="(s,i) in sections" :key="'sect'+s.name +'-'+i">
                                    <div>{{ s.name }}</div>
                                    <div>{{ s.sched_days }}</div>
                                    <div>{{ s.sched_time }}</div>
                                    <div>{{ s.room.name }}</div>
                                    <div>{{ s.slots }}</div>
                                    <div title="Remove"><v-icon name="trash"></v-icon></div>
                                </div>
                            </div>
                            <div class="y" v-else>
                                <div class="z">No Available Sections</div>
                            </div>
                        </div>
                    </div>
                    <div class="dsbd" v-if="subject.id == 0"></div>
                </div>
                <div class="q">
                    <div class="t">
                        <find-e-subject :setValue="setSubjectFromSearch"></find-e-subject>
                    </div>
                    <div class="s">
                        <button :class="isFormOkay ? 'okay' : ''" @click="goSaveSection()" :disabled="isSavingForm || !isFormOkay"><v-icon name="plus"></v-icon> Open Section</button>
                    </div>
                </div>
            </div>
            <ui-loader v-if="isSavingForm"></ui-loader>
        </div>
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
    .form-o { position: relative; }
    .form-o .w { display: grid; grid-template-columns: auto 312px; }
    .form-o .w .p { padding: 0 16px; position: relative; height: calc(100vh - 48px); }
    .form-o .w .q { border-left: 1px solid #f0f0f0; height: calc(100vh - 48px); background: linear-gradient(to right, #f8f8f8, #fcfcfc); }

    .form-o .w .p label { display: block; font-size: 11px; margin: 10px 0 4px 2px; color: #111; }
    .form-o .w div.info { font-size: 10px; padding: 2px 8px; },
    
    .p .u { margin-bottom: 16px }
    .p .u, .p .v {  padding: 16px; }

    .p .h { padding: 0 0 8px 0; border-bottom: 1px solid #f0f0f0; display: grid; grid-template-columns: 58px 468px 110px; margin-bottom: 0px; }
    .p .h .code { display: flex; align-items: center; justify-content: center; font-size: 16px; color: #444; font-weight: bold; background-color: #f5f5f0; white-space: nowrap; overflow-x: hidden; padding-top: 6px; padding-bottom: 6px; box-shadow: 0 1px 1px rgba(0,0,0,0.24); }
    .p .h .name { padding: 0 0 0 12px; }
    .p .h .name .n { font-size: 12px; font-weight: bold; margin: 2px 0; }
    .p .h .name .m { font-size: 11px;  }
    .p .h .butt {}
    .p .h .butt button { width: 100%; border-radius: 2px; color: #808080; padding: 3px 8px 2px 8px; border: none; background-color: #f0f0ea; font-size: 11px; outline: none; cursor: pointer;  }
    .p .h .butt button.okay { color: #000; box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 1px rgba(0,0,0,0.24); }
    .p .h .butt button svg { width: 12px; height: 12px; }

    .p .r { position: relative; }
    .p .r.s .c { display: grid;  margin: 5px 0; grid-template-columns: 150px 200px 200px 85px }
    .p .r.s .c input { width: 100%; border-radius: 2px; color: #000; padding: 3px 8px 3px 8px; border: none; background-color: #fff; font-size: 11px; outline: none; cursor: pointer; border-style: solid; border-width: 1px; border-color: transparent #eaeaea #d0d0d0 #eaeaea; }
    .p .r.s .c button svg { width: 12px; height: 12px; }

    .p .r.o { display: grid; grid-template-columns: 136px auto; margin: 16px 0 24px 0; box-shadow: 0 1px 1px rgba(0,0,0,0.24); }
    .p .r.o .x { background-color: #fff; }    
    .p .r.o .x .a { font-size: 11px; color: #111; padding: 6px 12px; border-top: 1px solid #f7f7f7; background-color: #f9f9f7; font-weight: bold }
    .p .r.o .x .b,  .p .r.o .x .n { height: 200px; overflow-y: scroll; }
    .p .r.o .x .b > div { padding: 6px 12px; font-size: 11px; border-bottom: 1px solid #fafafa; }
    .p .r.o .x .b > div svg { width: 10px; height: 10px; color: #d0d0ca; margin-right: 6px; }
    .p .r.o .x .n > div { padding: 12px; font-size: 11px; text-align: center; }

    .p .r.o .y {}
    .p .r.o .y .a { font-size: 11px; color: #111; padding: 6px 0; text-align: center; border-top: 1px solid #f7f7f7; background-color: #f9f9f7; font-weight: bold }
    .p .r.o .y .b { display: flex; padding: 16px; justify-content: center; height: 175px; }
    .p .r.o .y .b > div { border-radius: 2px; color: #000; padding: 6px 12px; border: none; background-color: #fff; font-size: 11px; outline: none; cursor: pointer; box-shadow: 0 1px 2px rgba(0,0,0,0.24); margin: 5px; height: 24px; }
    .p .r.o .y .b > div.active { background-color: #f6f6f2; }
    .p .r.o .y .c { display: grid; grid-template-columns: 60px 75px auto 65px 25px; border-top: 1px solid #f0f0f0; border-bottom: 1px solid #f0f0f0; }
    .p .r.o .y .c div { padding: 6px 7px; font-size: 11px; }

    .p .r.t { margin: 16px 0; background-color: #fcfcfa; }
    .p .r.t .x, .p .r.t .y .i { display: grid; grid-template-columns: 120px 100px auto 100px 70px 28px; }
    .p .r.t .x { border-top: 1px solid #f4f4f0; border-bottom: 1px solid #f4f4f0; background-color: #f9f9f7; }
    .p .r.t .x div { font-size: 10px; padding: 6px 7px; font-weight: bold }


    .p .r.t .y { height: 160px; border-bottom: 1px solid #f4f4f0; overflow-y: scroll; }
    .p .r.t .y .i div { font-size: 11px; padding: 6px 7px; border-bottom: 1px solid #fbfbfb; }
    .p .r.t .y .i.odd { background-color: #fcfcfa }
    .p .r.t .y .z { padding: 7px 6px; text-align: center; font-size: 11px; }
    .p .r.t .y .i div svg { width: 10px; height: 10px; color: #777; cursor: pointer; }
    .p .r.t .y .i div.x[title]:hover:after { content: attr(title); position: absolute; background-color: #fff; color: #333; }

    .q .t { height: 542px; position: relative; padding: 12px; }

    .q .s { text-align: center; background-color: #f0f0ea; height: 70px; padding: 20px 0; }
    .q .s button { height: 24px; padding: 0px 12px; border: 1px solid #e0e0d0; background: linear-gradient(to bottom, #f0f0f0, #e0e0e0); border-radius: 2px; font-size: 11px; color: #888; }
    .q .s button svg { height: 10px; width: 10px; color: #808080; }
    .q .s button.okay { border: 1px outset #e0e0d0; color: #000; }
    .q .s button.okay svg { color: #000; }

    .form-o .o {}

    .v { position: relative; }
    .dsbd { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: #fff }
</style>

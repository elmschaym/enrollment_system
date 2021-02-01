<template>
    <div class="time-s">
        <div class="f">
            <div v-for="(t,i) in timeList" :key="'tl'+i">{{ t }}</div>
        </div>
        <div class="e">
            <div class="l">
                <div>Mon <span>M</span></div>
                <div>Tue <span>T</span></div>
                <div>Web <span>W</span></div>
                <div>Thu <span>H</span></div>
                <div>Fri <span>F</span></div>
                <div>Sat <span>S</span></div>
                <div>Sun <span>A</span></div>
            </div>
            <div class="d">
                <div class="y" v-for="(y,j) in schedules" :key="'srow'+j">
                    <div :class="['x', x == 0 ? '' : 'active']" v-for="(x,i) in y" :key="'scol'+i+'_'+j">{{ x == 0 ? '' : x }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            subjects: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                schedList: [],
                timeList: [],
                codes: []
            }
        },
        computed: {
            schedules() {
                return this.schedList;
            }
        },
        watch: {
            subjects() {
                this.populateSchedules();
            }
        },
        methods: {
            populateSchedules() {
                this.generateSchedules();
                let week = ['Z', 'Y', 'X', 'W', 'V', 'U', 'T'];
                this.subjects.forEach( s => {
                    let [days, time] = s.hasOwnProperty('section') ? s.section.name.split('-') : s.name.split('-');
                    days.split('').forEach( d => {
                        let w= week.indexOf(d), t = time.split('');
                        let p = this.codes.indexOf(t[0]), q = this.codes.indexOf(t[1].toUpperCase());
                        for (let i=p; i<q; i++)
                            this.$set(this.schedList[w], i, s.subject.code);
                    });
                });
            },
            generateSchedules() {
                let y = [];
                for(let i=0; i<7; i++) {
                    let x = [];
                    for (let j=0; j<23; j++) 
                        x[j] = 0;
                    y[i] = x;
                }
                this.schedList = y;
            },
            generateTimeList() {
                let times = [], tt = 6*60;
                for (let i=0; tt<18*60; i++) {
                    let hh = Math.floor(tt/60), mm = (tt%60), t = ("0" + (hh % 12)).slice(-2), h = t == '00' ? '12' : t;
                    times[i] = h + ':' + ("0" + mm).slice(-2);
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
        mounted() {
            this.generateSchedules();
            this.generateTimeList();
            this.generateSchedCodes();
        }
    }
</script>

<style scoped>
    .time-s { width: 636px; display: grid; grid-template-rows: 16px 112px; margin: 12px 0; border-left: 1px solid #a0a0a0; }
    .time-s .f { display: flex; padding-left: 26px; }
    .time-s .f div { width: 26px; height: 16px; font-size: 9px; text-align: center; color: #000; }
    .time-s .e { display: grid; grid-template-columns: 38px 598px; }
    .time-s .e .l { padding: 0 2px; }
    .time-s .e .l div { height: 16px; font-size: 10px; color: #000; padding: 3px 0; }
    .time-s .e .l div span { float: right; }
    .time-s .e .d { display: grid; grid-template-rows: 16px 16px 16px 16px 16px 16px 16px }
    .time-s .e .d .y { height: 16px; display: flex; border-top: 1px solid #a0a099; border-left: 1px solid #a0a099; }
    .time-s .e .d .y .x { width: 26px; height: 16px; border-right: 1px solid #a0a099; border-bottom: 1px solid #a0a099; }
    .time-s .e .d .y .x.active { background-color: #f7f0c6; font-size: 8px; text-align: center; color: #000; word-break: break-all; display: flex; align-items: center; justify-content: center; }
</style>

<template>
    <div>
        <div class="t">
            <div class="p">
                <div class="pico">
                    <span></span>
                </div>
                <div class="name" v-if="admission.hasOwnProperty('student')">
                    <span>{{ admission.student.lastname }}, {{ admission.student.firstname }} {{ admission.student.middlename }}</span> <v-icon name="edit"></v-icon>
                </div>
                <div class="info" v-if="admission.hasOwnProperty('student')">
                    <div class="r">
                        <div class="n">Student ID</div>
                        <div class="c"></div>
                        <div class="v" @click="$router.push({ name: 'stu-view-index', params: { stuid: admission.student.school_id }})">{{ admission.student.school_id }}</div>
                    </div>
                    <div class="r">
                        <div class="n">Course</div>
                        <div class="c"></div>
                        <div class="v">{{ admission.course.program_type }} {{ admission.course.name }}</div>
                    </div>
                    <div class="r">
                        <div class="n">Department</div>
                        <div class="c"></div>
                        <div class="v">{{ admission.course.department.name }}</div>
                    </div>
                    <div class="r">
                        <div class="n">Program Type</div>
                        <div class="c"></div>
                        <div class="v">{{ admission.academic_program.name}}</div>
                    </div>
                    <div class="r">
                        <div class="n">Date Admitted</div>
                        <div class="c"></div>
                        <div class="v">{{ admission.date_admitted }}</div>
                    </div>
                </div>
            </div>
            <div class="d">
                <div class="list">
                    <div class="list-o">
                        <div class="data">
                            <div class="tbl">
                                <div class="thd">
                                    <div class="tth">Academic Year</div>
                                    <div class="tth">Semester</div>
                                    <div class="tth">Academic Status</div>
                                    <div class="tth">Units Enrolled/Allowed</div>
                                    <div class="tth">Date Enrolled</div>
                                    <div class="tth">Date Confirmed</div>
                                </div>
                                <div class="tbd" v-if="isFetching">
                                    <ui-loader></ui-loader>
                                </div>
                                <div class="tbd" v-else-if="admission.hasOwnProperty('enrollment') && admission.enrollment.length > 0">
                                    <div class="ttr" :key="l.id +'_adm'+ i" v-for="(l,i) in admission.enrollment">
                                        <div class="ttd">{{ l.acad_year }}</div>
                                        <div class="ttd">{{ l.semester }}</div>
                                        <div class="ttd">{{ l.acad_status }}</div>
                                        <div class="ttd">{{ l.max_units}}</div> 
                                        <div class="ttd">{{ l.created_at | getDate }}</div>    
                                        <div class="ttd">{{ l.confirmed_at }}</div>
                                    </div>
                                </div>
                                <div class="tbd x" v-else>
                                    <div class="tno" style="text-align: center">{{ isErrorConnect ? 'Server Error Occured' : 'Enrollment Available'}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cate" v-if="false">
                    <div class="icon">
                        <span class="active">
                            <v-icon name="thermometer">
                            </v-icon><b>+</b>
                            <i>subj</i>
                        </span>
                        <span class="active">
                            <v-icon name="flask">
                            </v-icon><b>+</b>
                            <i>sect</i>
                        </span>
                        <span class="active">
                            <v-icon name="tag"></v-icon>
                            <b>+</b>
                            <i>bill</i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import UILoader from '@/components/UILoader.vue';

    import 'vue-awesome/icons/edit';
    import 'vue-awesome/icons/caret-down';
    import 'vue-awesome/icons/tag';
    import 'vue-awesome/icons/flask';
    import 'vue-awesome/icons/thermometer';
    import 'vue-awesome/icons/sort';

    export default {
        components: {
            UiLoader: UILoader
        },
        data() {
            return {
                isErrorConnect: false,
                isFetching: false,
                admission: {},
                enrollees: [
                    { id: 12345, academic_year: '2020-2021', year_level: '5', units_enrolled: 24, date_confirmed: '2020-11-18', academic_status: 'SCHOLAR', course: { name_alias: 'BS ECE' } },
                    { id: 12234, academic_year: '2020-2021', year_level: '5', units_enrolled: 21, date_confirmed: '2020-11-18', academic_status: 'SCHOLAR', course: { name_alias: 'BS ECE' } }
                ]
            }
        },
        methods: {
            fetchAdmission() {
                this.isFetching = true;
                this.$http.get('admission/'+ this.$route.params.admit_id +'?action=admittee&admission_fields=id,date_admitted,status,student,course,academic_program,enrollment&student_fields=school_id,firstname,middlename,lastname&course_fields=id,name,program_type,department&department_fields=name&acadprogram_fields=id,name&enrollment_fields=id,acad_year,acad_status,semester,max_units,is_confirmed,created_at,confirmed_at').then( res => {
                    this.admission = res.data;
                }).catch(() => {
                    this.isErrorConnect = true;
                }).finally( () => {
                    this.isFetching = false;
                });
            }
        },
        created() {
            this.fetchAdmission();
        },
        mounted() {
            this.$store.commit('setModuleName', 'Admission Manifest');
        }
    }
</script>

<style scoped>
    div.t { display: grid; grid-template-columns: 300px auto }
    div.t .p { background-color: #fbfbfb; height: calc(100vh - 24px); }
    div.t .d { background-color: #f0f0f0; height: calc(100vh - 24px); }

    .p .stat { display: grid; grid-template-columns: 25% 75%; margin: 16px auto 8px auto; width: 240px; background: #f5f5f5; border-width: 1px; border-style: solid; border-color: #f0f0f0 #e0e0e0 #d0d0d0 #e0e0e0; = height: 25px; }
    .p .stat button { border: none; display: block; height: 25px; font-size: 11px; font-weight: bold; background-color: transparent; }
    .p .stat button.id { border-right: 1px solid #d0d0d0; }

    .p .pico { width: 240px; height: 140px; background: linear-gradient(to right bottom, #a9a5a2, #c8c6c9); margin: 16px auto 48px auto; position: relative; border-width: 1px; border-style: solid; border-color: #f0f0f0 #e0e0e0 #d0d0d0 #e0e0e0; }
    .p .pico span { display: block; border: 5px solid #fbfbfb; background: linear-gradient(to right bottom, #f7f0c6, #c2c4b6); width: 120px; height: 120px; border-radius: 140px; position: absolute; top: 60px; left: 55px; }

    .p .name { width: 240px; margin: 16px auto 10px auto; }
    .p .name span { font-size: 13px; font-weight: bold }
    .p .name svg { float: right; width: 14px; height: 14px; margin-bottom: -2px; }

    .p .info { width: 240px; margin: 0 auto; border-top: 1px solid #f0f0f0; }
    .p .info .r { display: grid; grid-template-columns: 90px 10px 140px; font-size: 11px; border-bottom: 1px solid #f4f4f4; }
    .p .info .r .n { background-color: #f4f4f4; padding: 10px 6px; }
    .p .info .r .c { padding: 10px 0; background-color: #fefefe; text-align: center; }
    .p .info .r .v { padding: 10px 0; background-color: #fefefe; color: #000; text-overflow: clip; overflow-x: hidden; white-space: nowrap; }

    div.t .d {}

    .list { margin: 32px 16px; background-color: #fff; box-shadow: 0 2px 6px rgba(0,0,0,0.15); min-height: 140px; }

    .list-o {}
    .list-o .data .tbl { position: relative; }
    .list-o .data .tbl .thd, .list-o .data .tbl .ttr { display: grid; grid-template-columns: 100px 80px auto 150px 100px 100px }
    .list-o .data .tbl .tbd { height: 130px; overflow-y: scroll; }
    .list-o .data .tbl .tth { padding: 7px 10px; color: #111; text-align: left; font-size: 10px; background-color: #f5f5f0; font-weight: bold }
    .list-o .data .tbl .ttd { padding: 7px 0 7px 10px; font-size: 11px; text-overflow: clip; overflow-x: hidden; white-space: nowrap; color: #000; }
    .list-o .data .tbl .tbd .ttr { border-bottom: 1px solid #f5f5f5; cursor: pointer; }
    .list-o .data .tbl .tbd .ttr:hover { background-color: #f6f6f0; }
    .list-o .data .tbl .ttd b {}
    .list-o .data .tbl svg { width: 12px; height: 12px; color: #404040; margin-bottom: -3px; }
    .list-o .data .tbl svg.s { float: right; width: 10px; height: 10px; color: #404040; margin-bottom: -2px; }

    .list-o .data .tbl .tbd.x { display: flex; justify-content: center; align-items: center; flex-direction: column; }
    .list-o .data .tbl .tno { background-color: #f8f8f8; padding: 5px; font-size: 10px; color: #a0a090; text-transform: uppercase; }
    .list-o .data .tbl .rel { display: block; cursor: pointer; font-size: 9px; text-transform: uppercase; padding: 7px 12px;  }
    .list-o .data .tbl .rel svg { width: 9px; height: 9px; color: #404040; margin-bottom: -2px; }

    .d .cate .icon { background-color: #f8f8f8; width: 48px; margin: 64px auto; height: 300px; padding: 64px 0; border: 1px solid #f0f0f0; border-radius: 48px 0 0 48px; }
    .cate .icon span { display: block; height: 60px; border-bottom: 1px solid #f0f0f0; position: relative; cursor: pointer; }
    .cate .icon span.active { background-color: #fff }
    .cate .icon span svg { width: 20px; height: 20px; margin: 14px 14px 2px 14px; }
    .cate .icon span b { position: absolute; top: 4px; right: 4px; font-size: 14px; }
    .cate .icon span i { font-size: 11px; display: block; text-align: center; font-style: normal; margin-bottom: 4px; }

</style>

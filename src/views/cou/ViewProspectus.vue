<template>
    <div class="_wrp_m">
        <div class="_w">
            <div class="p">
                <list-e-course v-if="departments.length > 0" @setValue="setCourseFromList" :departments="departments" @hasChangedDept="hasChangedDept"></list-e-course>
            </div>
            <div class="q">
                <div v-if="course.hasOwnProperty('id')" class="s">
                    {{ course.program_type }} &nbsp; {{ course.name }}
                </div>
                <div v-if="course.hasOwnProperty('id')" class="t">
                    <div class="u">
                        <div class="w">
                            <div class="g" v-if="subjCourses.length > 0">
                                <div class="i" v-for="(y,i) in subjCourses" :key="'sc_y_'+ i">
                                    <div class="name"><v-icon name="square"></v-icon> {{ y.name }}</div>
                                    <div class="head">
                                        <div>Code</div>
                                        <div>Name</div>
                                        <div>Units</div>
                                        <div>Prerequisite</div>
                                    </div>
                                    <div class="list" v-if="y.subs.length > 0">
                                        <div class="l" v-for="(s,i) in y.subs" :key="'sc_s_'+ y.name +'_'+ i">
                                            <div>{{ s.subject.code }}</div>
                                            <div>{{ s.subject.name }}</div>
                                            <div>{{ s.subject.units }}</div>
                                            <div v-if="s.subject.requisite.length > 0">
                                                <span v-for="(r,j) in s.subject.requisite" :key="'sr_'+ y.name +'_'+ i +'_'+ r.requisite.code +'_'+ j">{{ r.requisite.code}} &nbsp; </span> 
                                            </div>
                                            <div v-else>-</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="g"></div>
                            <div class="h">
                                <div>Required Units: <span>{{ course.total_units }}</span></div>
                                <div>Assigned Units: <span>{{ totalAssignedUnits }}</span></div>
                            </div>
                        </div>
                        <ui-loader v-if="isFetchingList" :opacity="0.8"></ui-loader>
                    </div>
                </div>                
            </div>
        </div>
    </div>
</template>

<script>
    import ListECourse from '@/components/ListECourse.vue';
    import UILoader from '@/components/UILoader.vue';

    export default {
        emits: ['setViewName'],
        components: {
            UiLoader: UILoader,
            ListECourse
        },
        data() {
            return {
                isFetchingList: false,
                departments: [],
                course: {},
                subjCourses: [],
                totalAssignedUnits: 0
            }
        },
        methods: {
            setCourseFromList(v) {
                this.course = v;
                this.subjCourses = [];
                this.totalAssignedUnits = 0;
                this.fetchSubjCourses();
            },
            fetchDepartments() {
                this.$http.get('department/?action=lister').then(res => {
                    this.departments = res.data;
                });
            },
            fetchSubjCourses() {
                this.isFetchingList = true;
                this.$http.get('subject_course/?action=lister&subjcourse_fields=id,subject,recom_year_lvl,recom_semester&subject_fields=id,code,name,units,requisite&subjrequisite_fields=id,requisite&subject_fields_alt=id,code&refer=prospectus&couid='+ this.course.id).then(res => {
                    let data = [], names = ['Preparatory', 'First', 'Second', 'Third', 'Fourth', 'Fifth'];
                    res.data.forEach(d => {
                        let pos = -1;
                        if (data.length > 0)
                            pos = data.findIndex(s => s.code == (d.recom_year_lvl +'_'+ d.recom_semester));
                        if (pos == -1) {
                            data.push({
                                code: d.recom_year_lvl +'_'+ d.recom_semester,
                                name: names[d.recom_year_lvl] +' Year – '+ d.recom_semester +' Semester',
                                subs: []
                            });
                            pos = data.findIndex(s => s.code == (d.recom_year_lvl +'_'+ d.recom_semester));
                        }
                        this.totalAssignedUnits += d.subject.units;
                        data[pos].subs.push(d);
                    });
                    data.forEach(d => {
                        d.subs.sort((a, b) => {
                            if ( a.recom_semester < b.recom_semester ) return -1;
                            if ( a.recom_semester > b.recom_semester ) return 1;
                            return 0;
                        });
                    });
                    data.sort((a, b) => {
                        if ( a.code < b.code ) return -1;
                        if ( a.code > b.code ) return 1;
                        return 0;
                    });
                    this.subjCourses = data;
                }).finally(() => {
                    this.isFetchingList = false;
                });
            },
            hasChangedDept() {
                this.course = {};
                this.subject = {};
            }
        },
        mounted() {
            this.$emit('setViewName', this.$route.name);
            this.$store.commit('setModuleName', 'Courses – View Prospectus');
            this.fetchDepartments();
        }
    }
</script>

<style scoped>
    ._wrp_m { height: 100%; position: relative; }
    ._wrp_m ._w { height: 100%; display: grid; grid-template-columns: 312px auto; }
    ._wrp_m ._w .p { height: 100%; background: #f8f8f2; padding: 16px; }
    ._wrp_m ._w .q { height: 100%; border-left: 1px solid #f0f0f0; display: grid; grid-template-rows: 32px auto }

    .q .s { padding: 10px; font-size: 12px; font-weight: 600; border-bottom: 1px solid #f0f0ea; }
    .q .t {}
    .q .t .u { height: 100%; position: relative; }
    .q .t .u .w { height: inherit; display: grid; grid-template-columns: auto 200px; position: relative; }
    .q .t .u .w .g { height: 100%; max-height: 560px; overflow-y: scroll; }
    .q .t .u .w .g .i { border-bottom: 1px solid #f8f8f2; padding-bottom: 20px;}
    .q .t .u .w .g .i .name { background-color: #fbfbf7; padding: 5px 10px; font-size: 11px; }
    .q .t .u .w .g .i .name svg { width: 10px; height: 10px; color: #d0d0cc; margin-right: 10px; }
    .q .t .u .w .g .i .head, .q .t .u .w .g .i .list .l { display: grid; grid-template-columns: 100px auto 70px 200px }
    .q .t .u .w .g .i .head div { padding: 5px 10px; font-size: 11px; color: #505050; }
    .q .t .u .w .g .i .list {}
    .q .t .u .w .g .i .list .l {}
    .q .t .u .w .g .i .list .l div { padding: 5px 10px; white-space: nowrap; text-overflow: clip; overflow: hidden; font-size: 11px; }

    .q .t .u .w .h { height: 100%; border-left: 1px solid #f0f0ea; padding: 16px 10px; }
    .q .t .u .w .h div { padding-bottom: 6px; color: #222; font-size: 11px; }
    .q .t .u .w .h div span { float: right }
</style>

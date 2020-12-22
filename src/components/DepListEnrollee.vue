<template>
    <div>
        <div class="find-o">
            <div class="u">
                <input v-model="find.query" placeholder="Find student by id or name"/>
            </div>
            <div class="v">
                <ui-select :setValue="setQueryType" :options="[{ id: 0, name: 'by id'}, { id: 0, name: 'by name'}]" :styles="['border-radius: 2px; width: 95%']"></ui-select>
            </div>
            <div class="w">
                <ui-select :setValue="setQuerySem" :options="[{ id: 0, name: 'by id'}, { id: 0, name: 'by name'}]" :styles="['border-radius: 2px; width: 95%']"></ui-select>
            </div>
            <div class="x">
                <button><v-icon name="filter"></v-icon></button>
            </div>
        </div>
        <div class="list-o">
            <div class="data">
                <div class="tbl">
                    <div class="thd">
                        <div class="tth">Student ID</div>
                        <div class="tth">Full Name <v-icon class="s" name="sort"></v-icon></div>
                        <div class="tth">Course</div>
                        <div class="tth">Academic Year<v-icon class="s" name="sort"></v-icon></div>
                        <div class="tth">Semester</div>
                        <div class="tth">Academic Status</div>
                        <div class="tth">Confirmed</div>
                    </div>
                    <div class="tbd" v-if="isFetching">
                        <ui-loader></ui-loader>
                    </div>
                    <div class="tbd" v-else-if="enrollees.length > 0">
                        <div class="ttr" @click="$router.push({ name: 'dep-view-enrollee', params: { enrol_id : l.id}})" :key="l.id" v-for="l in enrollees" @contextmenu="enrolleeListCMenu($event, l)">
                            <div class="ttd">{{ l.student.school_id}}</div>
                            <div class="ttd">{{ l.student.lastname }}, {{ l.student.firstname }} {{ l.student.middlename }}</div>
                            <div class="ttd">{{ l.admission.course.name }}</div>
                            <div class="ttd">{{ l.acad_year }}</div>    
                            <div class="ttd">{{ l.semester }}</div>
                            <div class="ttd">{{ l.acad_status }}</div>
                            <div class="ttd">{{ l.is_confirmed }}</div>
                        </div>
                    </div>
                    <div class="tbd x" v-else>
                        <div class="tno" style="text-align: center">{{ isErrorConnect ? 'Server Error Occured' : 'No Data Available'}}</div>
                    </div>
                </div>
            </div>
            <div class="page">
                <div class="l">
                </div>
                <div class="c">
                </div>
                <div class="r">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import UISelect from './UISelect.vue';
    import UILoader from './UILoader.vue';
    import 'vue-awesome/icons/angle-right';
    import 'vue-awesome/icons/square';
    import 'vue-awesome/icons/sort';
    import 'vue-awesome/icons/ellipsis-v';
    import 'vue-awesome/icons/plus';
    import 'vue-awesome/icons/filter';
    import 'vue-awesome/icons/square';

    export default {
        props: ['viewName', 'admitType'],
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
                enrollees: [],
                find: { query: '', type: '', sem: '' },
                paging: { limit: 14, start: 0 }
            }
        },
        methods: {
            fetchEnrollees() {
                this.isFetching = true;
                this.$http.get('enrollment/?action=lister&enrollment_fields=id,acad_year,acad_status,semester,is_confirmed,student,admission&student_fields=id,school_id,firstname,lastname,middlename,course&admission_fields=id,course&course_fields=id,name,name_alias').then( res => {
                    let data = res.data;
                    this.enrollees = data;
                }).catch( () => {
                    this.isErrorConnect = true;
                }).finally( () => {
                    this.isFetching = false;
                });
            },
            setQueryType(d) {
                this.find.type = d;
            },
            setQuerySem(t) {
                this.find.sem = t;
            },
            enrolleeListCMenu(e, l) {
                e.preventDefault();
                let cmenu = new window.nw.Menu(),
                    items = [
                        { label: 'View Enrollment', click: () => this.enrollStudent(l) },
                        { label: 'Refresh', click: this.fetchEnrollees, key: 'F5', },
                        { label: 'Enroll Subjects', click: () => this.enrollStudent(l) },
                        { label: 'Student Profile', click: () => this.enrollStudent(l) },
                        { type: 'separator' },
                        { label: 'Delete', click: this.fetchEnrollees, key: 'x', modifiers: "ctrl"  }
                    ];
                items.forEach( m => cmenu.append(new window.nw.MenuItem(m)) );
                cmenu.popup(e.pageX, e.pageY);
            },
            enrollStudent(s) {

            }
        },
        watch: {
            'find.query'() {
                this.fetchEnrollees();
            }
        },
        mounted() {
            this.fetchEnrollees();
        }
    }
</script>

<style scoped>
    .list-o { margin: 16px; border: 1px solid #e5e5e0; background-color: #fbfbfb; box-shadow: 4px 4px 10px #e0e0e0, -4px -4px 10px #e0e0e0; font-size: 12px; }
    .list-o .data .tbl { position: relative; }
    .list-o .data .tbl .thd, .list-o .data .tbl .ttr { display: grid; grid-template-columns: 106px auto 172px 138px 106px 120px 128px }
    .list-o .data .tbl .tbd { height: 434px; }
    .list-o .data .tbl .tth { padding: 7px 10px; color: #202020; text-align: left; font-size: 10px; background-color: #e5e0e5; font-weight: bold }
    .list-o .data .tbl .ttd { padding: 10px 0 10px 10px; height: 30px; font-size: 11px; text-overflow: clip; overflow-x: hidden; white-space: nowrap; }
    .list-o .data .tbl .tbd .ttr { border-bottom: 1px solid #f5f5f0; cursor: pointer; }
    .list-o .data .tbl .tbd .ttr:hover { background-color: #f6f6f0; }
    .list-o .data .tbl .ttd b {}
    .list-o .data .tbl svg { width: 12px; height: 12px; color: #404040; margin-bottom: -3px; }
    .list-o .data .tbl svg.s { float: right; width: 10px; height: 10px; color: #404040; margin-bottom: -2px; }

    .list-o .data .tbl .tbd.x { display: flex; justify-content: center; align-items: center; flex-direction: column; }
    .list-o .data .tbl .tno { background-color: #f8f8f8; padding: 5px; font-size: 10px; color: #a0a090; text-transform: uppercase; }
    .list-o .data .tbl .rel { display: block; cursor: pointer; font-size: 9px; text-transform: uppercase; padding: 7px 12px;  }
    .list-o .data .tbl .rel svg { width: 9px; height: 9px; color: #404040; margin-bottom: -2px; }

    .list-o .page { display: grid; grid-template-columns: 40% 20% 40%; padding: 4px 12px; }
    .list-o .page .l { text-align: left; }
    .list-o .page .c { text-align: center; }
    .list-o .page .r { text-align: right; }
    .list-o .page button { background: linear-gradient(to bottom, #e6d1d8, #f5f0f5); padding: 2px 8px; font-size: 9px; border: 1px solid #f0f0f0; box-shadow: 1px 1px 1px #d0d0d0 }

    .find-o { margin: 10px 16px 10px 16px; display: grid; grid-template-columns: auto 200px 120px 40px; background: linear-gradient(to bottom, #eee, #f0f0f0); box-shadow: 0 0 20px #e0e0e0; border: none; }
    .find-o .u {}
    .find-o span { font-size: 10px; display: block; margin-bottom: 4px; font-weight: bold; color: #404040; }
    .find-o input { width: 95%; border-radius: 2px; color: #391e22; padding: 7px 10px; border: 1px solid #f0f0f0;  background-color: #fdfdfd; font-family: "Open Sans"; font-size: 11px; border: 1px outset #f5f5f5; outline: none;  }
    .find-o select { width: 95%; border-radius: 2px; color: #391e22; padding: 6px 10px; border: 1px solid #f0f0f0;  background-color: #fdfdfd; font-family: "Open Sans"; font-size: 11px; border-width: 1px; border-style: solid; border-color: #f0f0f0 #e0e0e0 #d0d0d0 #e0e0e0; outline: none; box-shadow: 1px 1px 8px #e0e0e0; }
    
    .find-o .v {}
    .find-o .w {}
    .find-o .x {}
    .find-o .x button { background: linear-gradient(to right, #e6d1d8, #fbfbfb); border: 1px solid #f0f0f0; box-shadow: 2px 2px 2px #d0d0d0; padding: 5px 8px 4px 8px; }
    .find-o .x button svg { height: 14px; width: 14px; color: #222; }

    hr { margin: 16px; border: 1px solid #e6d1d8; box-shadow: 2px 2px 10px #e6d1d8, -2px -2px 4px #e6d1d8; }
</style>

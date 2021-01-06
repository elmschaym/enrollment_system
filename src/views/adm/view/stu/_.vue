<template>
    <div class="wrap-s">
        <div class="t">
            <div class="p">
                <div class="stat">
                    <button class="id">ID</button><button class="no">{{ student.school_id }}</button>
                </div>
                <div class="pico">
                    <span></span>
                </div>
                <div class="name">
                    <span>{{ fullname }}</span>
                </div>
                <div class="info">
                    <div class="r">
                        <div class="n">Birthdate</div>
                        <div class="c"></div>
                        <div class="v">{{ student.birthdate }}</div>
                    </div>
                    <div class="r">
                        <div class="n">Gender</div>
                        <div class="c"></div>
                        <div class="v">{{ gender }}</div>
                    </div>
                    
                    <div class="r">
                        <div class="n">Civil Status</div>
                        <div class="c"></div>
                        <div class="v">{{ civilStatus }}</div>
                    </div>
                    <div class="r">
                        <div class="n">Home Addr</div>
                        <div class="c"></div>
                        <div class="v">{{ student.home_address }}</div>
                    </div>
                    <div class="r">
                        <div class="n">Campus Addr</div>
                        <div class="c"></div>
                        <div class="v">{{ student.campus_address }}</div>
                    </div>
                    <div class="r">
                        <div class="n">Religion</div>
                        <div class="c"></div>
                        <div class="v">{{ student.religion }}</div>
                    </div>
                </div>
            </div>
            <div class="d">
                <div class="cate-o">
                    <div class="link">
                        <ul>
                            <li @click="goName('adm-view-stu-index')" :class="viewName == 'stu-view-index' || viewName == 'stu-view-index'? 'active' : ''"><div>Admissions</div></li>
                            <li @click="goName('adm-view-stu-enrol')" :class="viewName == 'stu-view-enrol' ? 'active' : ''"><div>Enrolments</div></li>
                            <li @click="goName('adm-view-stu-infos')" :class="viewName == 'stu-view-infos' ? 'active' : ''"><div>Background</div></li>
                            <li @click="goName('adm-view-stu-previ')" :class="viewName == 'stu-view-previ' ? 'active' : ''"><div>Previleges</div></li>
                            <li @click="goName('adm-view-stu-organ')" :class="viewName == 'stu-view-organ' ? 'active' : ''"><div>Organizations</div></li>
                        </ul>
                    </div>
                    <div class="make">
                        <span>
                            <v-icon name="edit"></v-icon> Edit Profile
                        </span>
                    </div>
                </div>
                <router-view v-if="student.hasOwnProperty('admission')" :admission="student.admission"></router-view>
            </div>
        </div>
        <ui-loader v-if="isFetching"></ui-loader>
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
                viewName: 'stu-view-index',
                isErrorConnect: false,
                isFetching: false,
                student: { school_id: '', firstname: '', lastname: '', middlename: '', gender: 'M', civil_status: 'S', birthdate: '', home_address: '', campus_address: ''}
            }
        },
        computed: {
            fullname() {
                return this.student.lastname +', '+ this.student.firstname +' '+ this.student.middlename
            },
            gender() {
                return this.$store.state.forms.student.gender.find(s => s.id == this.student.gender).name;
            },
            civilStatus() {
                return this.$store.state.forms.student.civil_status.find(s => s.id == this.student.civil_status).name;
            }
        },
        methods: {
            fetchStudent() {
                this.isFetching = true;
                this.$http.get('student/'+ this.$route.params.stude_id +'/?type=profile&student_fields=id,school_id,firstname,lastname,middlename,gender,civil_status,birthdate,religion,home_address,campus_address,admission&admission_fields=id,course,academic_program&course_fields=id,name,name_alias,total_units,program_type,department&acadprogram_fields=id,name,name_alias').then( res => {
                        this.student = res.data;
                        this.$store.commit('setModuleName', 'Student – '+ this.student.school_id);
                    }).catch( () => {
                        this.isErrorConnect = true;
                    }).finally( () => {
                        this.isFetching = false;
                    });
            },
            goName(name) {
                if( name != this.$route.name ) {
                    this.viewName = name;
                    this.$router.push({ name });
                }
            },
            goMake() {
                this.$router.push({ name: 'stu-edit-infos' });
            }
        },
        mounted() {
            this.fetchStudent();
        }
    }
</script>

<style scoped>
    .wrap-s { height: auto; position: relative; }

    div.t { height: 100%; display: grid; grid-template-columns: 300px auto }
    div.t .p { height: 100%; background-color: #fff; }
    div.t .d { height: 100%; background-color: #f8f8f2; }

    .p .stat { display: grid; grid-template-columns: 25% 75%; margin: 8px auto 8px auto; width: 240px; background: #f5f5f5; border-width: 1px; border-style: solid; border-color: #f0f0f0 #e0e0e0 #d0d0d0 #e0e0e0; = height: 25px; }
    .p .stat button { border: none; display: block; height: 25px; font-size: 11px; font-weight: 600; background-color: transparent; }
    .p .stat button.id { border-right: 1px solid #d0d0d0; }

    .p .pico { width: 240px; height: 140px; background: linear-gradient(to right bottom, #a9a5a2, #c8c6c9); margin: 8px auto 48px auto; position: relative; border-width: 1px; border-style: solid; border-color: #f0f0f0 #e0e0e0 #d0d0d0 #e0e0e0; }
    .p .pico span { display: block; border: 5px solid #fbfbfb; background: linear-gradient(to right bottom, #f7f0c6, #c2c4b6); width: 120px; height: 120px; border-radius: 140px; position: absolute; top: 60px; left: 55px; }

    .p .name { width: 240px; margin: 16px auto 10px auto; }
    .p .name span { font-size: 14px; font-weight: 600 }
    .p .name svg { float: right; width: 14px; height: 14px; margin-bottom: -2px; }

    .p .info { width: 240px; margin: 0 auto; border-top: 1px solid #f0f0f0; }
    .p .info .r { display: grid; grid-template-columns: 90px 10px 140px; font-size: 11px; border-bottom: 1px solid #f4f4f4; }
    .p .info .r .n { background-color: #f4f4f4; padding: 10px 6px; }
    .p .info .r .c { padding: 10px 0; background-color: #fefefe; text-align: center; }
    .p .info .r .v { padding: 10px 0; background-color: #fefefe; color: #000; text-overflow: clip; overflow-x: hidden; white-space: nowrap; }

    .cate-o { background-color: #fbfbf7; height: 32px; display: grid; grid-template-columns: auto 100px; border-bottom: 1px solid #eaeaea; }
    .cate-o .link ul { display: block; margin: 0 16px; }
    .cate-o .link ul li { display: inline-block; font-size: 11px; padding: 10px 12px; cursor: pointer; }
    .cate-o .link ul li.active { border-bottom: 1px solid #290e12; }
    .cate-o .link ul li.active div {  }

    .cate-o .make { text-align: right; }
    .cate-o .make span { display: inline-block; background-color: transparent; font-size: 11px; padding: 10px 10px 10px 10px; border-left: 1px solid #e9e9e9; cursor: pointer; }
    .make span svg { width: 12px; height: 12px; margin-bottom: -2px; }
</style>

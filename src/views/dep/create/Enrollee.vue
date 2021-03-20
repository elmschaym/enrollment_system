<template>
    <div class="form-o">
        <div class="w">
            <div class="p">
                <div class="u">
                    <div class="r n">
                        <div>
                            <v-icon name="user"></v-icon>
                        </div>
                        <div v-if="admission.student != null">
                            <b>{{ admission.student.lastname }}, {{ admission.student.firstname }} {{ admission.student.middlename }}</b>
                            <span>{{ admission.student.school_id }}</span>
                        </div>
                    </div>
                    <div class="r s" v-if="admission.student != null">
                        <div>Academic Program</div><div>{{ admission.academic_program.name }}</div>
                        <div>Date Admitted</div><div>{{ admission.date_admitted }}</div>
                        <div>Admission Status</div><div>{{ admission.status }}</div>
                    </div>
                    <div class="r t">
                        <div class="j">
                            <span>Preferred Program (Course)</span>
                        </div>
                        <div class="k">
                            <div v-for="c in courses" :key="'course_'+c.id" :class="selectedCourse == c.id ? 'active': ''" @click="setCourse(c.id)">
                                <o-course :course="c" ></o-course>
                            </div>
                        </div>
                    </div>
                    <div class="r o">
                        <fieldset>
                            <legend>Enrollment Payables</legend>
                            <div class="k">
                                <div><span></span> Tuition Fee (Lectures/Laboratories)</div>
                                <div><span></span> Insurance (Semester)</div>
                                <div><span></span> Library Fee</div>
                                <div><span></span> IT Fee</div>
                                <div><span></span> School ID (Registration)</div>
                            </div>
                        </fieldset>

                    </div>
                </div>
                <div class="dsbd" v-if="!admission.hasOwnProperty('id')"></div>
            </div>
            <div class="q">
                <div class="r a">
                    <div class="g">
                        <find-e-admission @setValue="setAdmissionFromSearch" :filters="{ stat: true, mode: 'dep' }" fields="admissionf_status=CUR"></find-e-admission>
                    </div>
                    <div class="h">
                        <div class="e" v-if="isErrorConnect">
                           {{ errorMessage }}
                        </div>
                    </div>
                </div>
                <div class="s">
                    <button :class="['br-confirm', isFormOkay ? 'okay' : '']" @click="goSaveEnrollee()" :disabled="isSavingForm || !isFormOkay"><v-icon name="plus"></v-icon> Enrol Student</button>
                </div>
            </div>
        </div>
        <ui-modal-informer v-if="isModalShow" @modalClose="modalClose" @informedOkay="modalClose" :hasBG="true" class="moda-l">
            <div slot="text">
                Student Enrolled Successfully. Please proceed to Enroll Subject for selecting subjects and assigning sections.
            </div>
        </ui-modal-informer>
        <ui-loader v-if="isSavingForm"></ui-loader>
    </div>
</template>

<script>
    import UISelect from '@/components/UISelect.vue';
    import UILoader from '@/components/UILoader.vue';
    import OCourse from '@/components/OCourse.vue';
    import UIModalInformer from '@/components/UIModalInformer.vue';
    import FindEAdmission from '@/components/FindEAdmission.vue';

    import 'vue-awesome/icons/user';
    import 'vue-awesome/icons/id-card';
    import 'vue-awesome/icons/plus';

    export default {
        emits: ['setViewName'],
        components: {
            UiSelect: UISelect,
            UiLoader: UILoader,
            UiModalInformer: UIModalInformer,
            FindEAdmission,
            OCourse
        },
        data() {
            return {
                errorMessage: '',
                isModalShow: false,
                isSavingForm: false,
                isErrorConnect: false,
                student: { id: 0, school_id: '', fullname: '' },
                courses: [],
                selectedCourse: 1,
                originalCourse: 1,
                admission: {}
            }
        },
        computed: {
            isFormOkay() {
                return this.selectedCourse != 1;
            }
        },
        methods: {
            setAdmissionFromSearch(v) {
                this.admission = v;
                this.selectedCourse = this.admission.course.id;
                this.originalCourse = this.admission.course.id;
            },
            setCourse(c) {
                if ((this.admission.course.id == 1 || this.originalCourse == 1) && c != 1) {
                        this.selectedCourse = c;
                        this.$http.put('admission/'+ this.admission.id +'/?action=update-course', { course: this.selectedCourse, academic_program: this.admission.academic_program.id, student: this.admission.student.id }).then( res => {
                        this.admission.course = { id: c };
                    });
                }
            },
            goSaveEnrollee() {
                this.isSavingForm = true
                if (this.isFormOkay) {
                    this.$http.post('enrollment/', { admission: this.admission.id }).then( res => {
                        if (res.status == 201)
                            this.isModalShow = true;
                        else
                            this.isErrorConnect = true;
                    }).catch( err => {
                        this.errorMessage = err.response.data.errorMsg;
                        this.isErrorConnect = true;
                    }).finally( () => {
                        this.isSavingForm = false;
                        this.$sleep(5000).then( () => { this.isErrorConnect = false; });
                    });
                }
            },
            fetchCourses() {
                this.$http.get('course/?action=lister&refer=department-own&course_fields=id,name,name_alias,total_units,program_type').then( res => {
                    if (res.status == 200)
                        this.courses = res.data;
                    else
                        this.courses = [];
                });
            },
            modalClose(v) {
                this.isModalShow = !v;
                this.admission = {};
                this.selectedCourse = 0;
            }
        },
        created() {
            this.$emit('setViewName', this.$route.name);
            this.$store.commit('setModuleName', 'Department – New Enrollee');
        },
        mounted() {
            this.fetchCourses();
        }
    }
</script>

<style scoped>
    .form-o { height: 100%; position: relative; }
    .form-o .w { height: 100%; display: grid; grid-template-columns: auto 270px; }
    .form-o .w .p { height: 100%; position: relative;  }
    .form-o .w .q { height: 100%; display: grid; grid-template-rows: auto 70px; border-left: 1px solid #f0f0f0; background: #f8f8f2; }

    .p .h { height: 100%; background-color: #272537; border-right: 1px solid #f0f0ea; }
    .p .h .pixx { height: 180px; background-color: #373547; display: flex; align-items: center; justify-content: center; }
    .p .h .pixx svg { height: 100px; width: 100px; color: #d0d0d0; }
    .p .h .name { padding: 5px 8px; }
    .p .h .name .n { font-size: 12px; ifont-weight: 600; margin: 4px 0; color: #fff; }
    .p .h .name .m {}
    .p .h .name .m svg { width: 16px; height: 12px; color: #fff; margin-bottom: -1px }
    .p .h .name .m span { font-size: 11px; margin-left: 5px; color: #eee; }

    .p .u { background-color: #fff }
    .p .u .r { position: relative; }

    .p .u .r.n { padding: 12px 16px; border-bottom: 1px solid #f0f0ea; display: grid; grid-template-columns: 36px auto }
    .p .u .r.n svg { width: 24px; height: 24px; }
    .p .u .r.n b { display: block; font-size: 12px; color: #000; font-weight: 600; padding-bottom: 2px; }
    .p .u .r.n span { display: block; font-size: 12px; color: #222; }


    .p .u .r.s { display: grid; grid-template-columns: 50% 50%;  padding: 8px 16px; }
    .p .u .r.s > div { margin-bottom: 5px; font-size: 11px; }
    .p .u .r.t { padding: 8px 16px; }
    .p .u .r.t .j { font-size: 11px; text-align: left; padding: 5px 0; }
    .p .u .r.t .k { display: grid; grid-template-columns: 50% 50%; border: 2px solid #f0f0ea;  padding: 10px 0; }
    .p .u .r.t .k > div { padding: 5px 10px; }
    .p .u .r.t .k > div.active >>> .cour-s { background-color: #f0f0e5; }

    .p .u .r.o { padding:  16px; display: grid; grid-template-columns: 300px auto }
    .p .u .r.o .j { font-size: 11px; text-align: left; padding: 5px 0; font-weight: 600; }
    .p .u .r.o .k div { font-size: 11px; padding: 5px 0; }
    .p .u .r.o .k div span { display: inline-block; height: 8px; width: 8px; border: 1px double #b0b0b0; background-color: #b0b0b0; margin-right: 5px; }
    .p .u .r.o fieldset { border: 1px solid #f0f0ea; padding: 10px; }
    .p .u .r.o fieldset legend { font-size: 11px; color: #222; padding: 5px; }

    .q .r { position: relative; }
    .q .r .h { position: absolute; bottom: 20px; left: 12px; right: 12px; }
    .q .r .h .e { color: #fd4646; background-color: #fde6e6; padding: 12px 6px; text-align: center; box-shadow: 0 1px 2px rgba(0,0,0,0.2); }
    .q .r .g { margin: 12px; }

    .q .r.a { position: relative; }

    .q .s { text-align: center; background-color: #f0f0ed; height: 70px; padding: 20px 0; }
    .q .s button {}
    .q .s button svg { height: 10px; width: 10px; color: #808080; }
    .q .s button.okay { border: 1px outset #e0e0d0; color: #000; }
    .q .s button.okay svg { color: #000; }

    .form-o .o {}

    .v { position: relative; }
    .dsbd { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: #fff }
</style>

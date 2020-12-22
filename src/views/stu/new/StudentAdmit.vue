<template>
    <div>
        <div class="form-o">
            <div class="w">
                <div class="p">
                    <div class="u">
                        <div class="h">
                            <div class="pixx">
                                <v-icon name="user"></v-icon>
                            </div>
                            <div class="name">
                                <div class="n">{{ student.fullname }}</div>
                                <div class="m"><span>{{ student.school_id }}</span></div>
                            </div>
                            <div v-show="false" class="butt">
                                <div>
                                    <div>Previous Admission: </div>
                                    <div>Date Last Ad</div>
                                </div>
                                <div>
                                    <div>Undergrad-4</div>
                                    <div>Undergra</div>
                                </div>
                            </div>
                        </div>
                        <div class="r a">
                            <div class="c">
                                <div>
                                    <label for="">College Department</label>
                                    <input style="width: 95%" disabled="" placeholder="SET_BY_DEPARTMENT" />
                                </div>
                                <div>
                                    <label for="">Course</label>
                                    <input disabled="" placeholder="SET_BY_DEPARTMENT" />
                                </div>
                            </div>
                        </div>
                        <div class="r d">
                            <div class="c">
                                <div>
                                    <label for="">Academic Programme</label>
                                    <ui-select :setValue="setAcademicType" :options="acad_programs" :styles="['border-radius: 2px; width: 95%; padding: 6px 10px 6px 10px', '']"></ui-select>
                                </div>
                                <div>
                                    <label for="">Admission Date</label>
                                    <input v-model="admission.date_admitted" type="date"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="v">
                        <div id="print-adm" v-if="printStudentData.hasOwnProperty('id')">
                            <div style="font-family: 'Cairo'; font-size: 12px">
                                <div style=" margin-bottom: 16px; text-align: center">
                                    <h4 style="margin: 0">Mindanao State University</h4>
                                    <h5 style="margin: 0; font-weight: normal">Marawi City, Philippines</h5>
                                    <h3 style="margin: 0">CERTIFICATE OF ADMISSION</h3>
                                </div>
                                <div style="display: grid; grid-template-columns: 120px auto 120px auto; width: 100%; padding: 16px 0; margin: 16px 0; border-bottom: 2px solid #e0e0e0; border-top: 2px solid #a0a090">
                                    <div style="text-align: right; padding-right: 8px">
                                        <div>Student Name:</div>
                                        <div>Gender</div>
                                        <div>Civil Status:</div>
                                        <div>Acad Type:</div>
                                    </div>
                                    <div style="color: #000">
                                        <div>{{ printStudentData.lastname }}, {{ printStudentData.firstname }} {{ printStudentData.middlename }}</div>
                                        <div>{{ getGender(printStudentData.gender) }}</div>
                                        <div>{{ getCivilStatus(printStudentData.civil_status) }}</div>
                                        <div>{{ printAcademicData.program_type }}</div>
                                    </div>
                                    <div style="text-align: right; padding-right: 8px">
                                        <div>School ID:</div>
                                        <div>Admitted:</div>
                                        <div>Acad Year:</div>
                                        <div>Semester:</div>
                                    </div>
                                    <div style="color: #000">
                                        <div>{{ printStudentData.school_id }}</div>
                                        <div>{{ printAcademicData.date_admitted }}</div>
                                        <div>2020-2020</div>
                                        <div>1st Semester</div>
                                    </div>
                                </div>
                                <div style="display: grid; grid-template-columns: 50% 50%; width: 100%; padding: 8px 0; font-size: 11px">
                                    <div>Date Printed: <span style="text-decoration: underline;">2020-11-21 13:47</span></div>
                                    <div style="text-align: right">Approved By: <span style="text-decoration: underline;">Caras, Paul Lauresta</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="q">
                    <div class="r a">
                        <div class="g">
                            <div class="img">
                                <v-icon name="user"></v-icon>
                            </div>
                        </div>
                    </div>
                    <div class="s">
                        <button :class="isFormOkay ? 'okay' : ''" @click="goSaveAdmittee()" :disabled="isSavingForm || !isFormOkay"><v-icon name="plus"></v-icon> Admit Student</button>
                    </div>
                </div>
            </div>
            <ui-modal v-if="isModalShow && isSubmitOkay" :modalClose="modalClose" class="moda-l">
                <span slot="name">Admitted Successfully</span>
                <div slot="body-text">
                    Proceed to preferred Department for Enrollment and Course selection.
                </div>
                <div slot="body-okay">
                    <button @click="printAdmission()">Print Admission</button>
                </div>
            </ui-modal>
             <ui-modal v-if="isModalShow && !isSubmitOkay" :modalClose="modalClose" class="moda-l">
                <span slot="name">Admission Error</span>
                <div slot="body-text">
                    There was an error processing your request. Please contact your server administrator to fix this issue. <br/><span style="font-size: 10px">Error Code: 401 Bad Request</span>
                </div>
                <div slot="body-okay">
                    <button @click="modalClose()">Okay</button>
                </div>
            </ui-modal>
            <ui-loader v-if="isSavingForm"></ui-loader>
        </div>
    </div>
</template>

<script>
    import UISelect from '@/components/UISelect.vue';
    import UILoader from '@/components/UILoader.vue';
    import UIModal from '@/components/UIModal.vue';

    import 'vue-awesome/icons/user';

    export default {
        components: {
            UiSelect: UISelect,
            UiLoader: UILoader,
            UiModal: UIModal,
        },
        data() {
            return {
                isSavingForm: false,
                isModalShow: false,
                isSubmitOkay: false,
                student: { id: 0, school_id: '', fullname: '' },
                acad_programs: [],
                acad_program_id: 0,
                admission: { date_admitted: '' },
                printStudentData: {},
                printAcademicData: { program_type: '', date_damitted: '' }
            }
        },
        computed: {
            isFormOkay() {
                let isStudFormOkay = this.student.school_id != '', isAdmitFormOkay = this.acad_program_id > 0 && this.admission.date_admitted != '';
                return isStudFormOkay && isAdmitFormOkay;
            }
        },
        methods: {
            getGender(v) {
                return this.$store.state.forms.student.gender.find(x => x.id == v).name;
            },
            getCivilStatus(v) {
                return this.$store.state.forms.student.civil_status.find(x => x.id == v).name;
            },
            setAcademicType(v) {
                this.acad_program_id = v;
                this.printAcademicData.program_type = this.acad_programs.length > 0 ? this.acad_programs.find(x => x.id === v).name : '';
            },
            goSaveAdmittee() {
                this.isSavingForm = true;
                if (this.isFormOkay) {
                    this.$http.post('admission/?school_id='+ this.student.school_id +'&student_fields=id,school_id,firstname,middlename,lastname,gender,civil_status', Object.assign({}, this.admission, { student: this.student.id, academic_program: this.acad_program_id, course: 1 })).then( res => {
                        if (res.status == 201) {
                            this.printStudentData = res.data;
                            this.printAcademicData.date_admitted = this.admission.date_admitted
                            this.isModalShow = true;
                            this.isSubmitOkay = true;
                        } else {
                            this.isModalShow = true;
                            this.isSubmitOkay = false;
                        }
                    }).catch( () => {
                        this.isModalShow = true;
                        this.isSubmitOkay = false;
                    }).finally( () => {
                        this.isSavingForm = false;
                    });
                }
            },
            fetchAcademicProgram() {
                this.$http.get('academic_program/').then( res => {
                    this.acad_programs = res.data;
                });
            },
            modalClose(v) {
                this.student = { id: 0, school_id: '', firstname: '', middlename: '', lastname: '' };
                this.isModalShow = false;
            },
            printAdmission() {
                this.$htmlToPaper('print-adm');
            }
        },
        watch: {
            '$store.isReloadView'() {
                this.fetchAcademicProgram();
            }
        },
        created() {
            let student = this.$storageGet('stu_student', 'session');
            this.student.id = student.id;
            this.student.school_id = student.school_id;
            this.student.fullname = student.fullname;
            this.fetchAcademicProgram();
            this.$store.commit('setModuleName', 'Admission – New Admittee');
        }
    }
</script>

<style scoped>
    .form-o { position: relative; height: calc(100vh - 48px); }
    .form-o .w { display: grid; grid-template-columns: 700px 312px; }
    .form-o .w .p { padding: 0 16px; }
    .form-o .w .q { border-left: 1px solid #f0f0f0; height: calc(100vh - 48px); background: linear-gradient(to right, #f8f8f8, #fcfcfc); }

    .form-o .w .p input { width: 100%; border-radius: 2px; color: #391e22; padding: 3px 8px 4px 8px; border: none;  background-color: #fdfdfd; font-size: 11px; outline: none; cursor: pointer; border-style: solid; border-width: 1px; border-color: transparent #eaeaea #d0d0d0 #eaeaea; }
    .form-o .w .p select { border-radius: 5px; color: #391e22; padding: 5px 12px 5px 12px; border: 1px solid #f0f0f0;  background-color: #fdfdfd; font-size: 11px; border-width: 1px; border-style: solid; border-color: #f0f0f0 #e0e0e0 #d0d0d0 #e0e0e0; outline: none; cursor: pointer; }
    .form-o .w .p textarea { width: 100%; height: 50px; border-radius: 2px; color: #391e22; padding: 5px 8px; background-color: #fdfdfd; font-size: 11px; border: 1px outset #f5f5f5; outline: none; cursor: pointer; font-weight: bold }
    .form-o .w .p label { display: block; font-size: 11px; margin: 10px 0 4px 2px; color: #111; }
    .form-o .w div.info { font-size: 10px; padding: 2px 8px; }

    .p .h { padding: 0 0 8px 0; border-bottom: 1px solid #d0d0c0; display: grid; grid-template-columns: 40px auto 200px; margin-bottom: 0px;}
    .p .h .pixx { height: 40px; width: 40px; background-color: #f5f5f0; box-shadow: 0 1px 1px rgba(0,0,0,0.24); }
    .p .h .pixx svg { height: 32px; width: 32px; margin: 4px; color: #d5d5d0; }
    .p .h .name { padding: 0 0 0 12px; }
    .p .h .name .n { font-size: 12px; font-weight: bold; margin: 4px 0; }
    .p .h .name .m { font-size: 11px;  }
    .p .h .butt { display: grid; grid-template-columns: 50% 50%; }

    .p .r { position: relative; }
    .w .p .r .c { display: grid; margin: 5px 0; }
    .p .r.a .c { grid-template-columns: 300px 335px }
    .p .r.d .c { grid-template-columns: 400px 235px }
    .p .r.d .c > div { position: relative; }
    .p .r.b .c { grid-template-columns: 350px 285px }
    .p .u { margin-bottom: 16px }
    .p .u, .p .v {  padding: 16px; }

    .q .r { position: relative; }
    .q .r .g {}
    .q .r .g div { height: 240px; width: 100%; background-color: #404040; padding: 20px 0; }
    .q .r .g div svg { width: 200px; height: 200px; color: #505050; display: block; margin: 0 auto; }

    .q .r.a { height: 542px; }

    .q .s { text-align: center; background-color: #f0f0ea; height: 70px; padding: 20px 0; }
    .q .s button { height: 24px; padding: 4px 12px; border: 1px solid #e0e0d0; background: linear-gradient(to bottom, #f0f0f0, #e0e0e0); border-radius: 2px; font-size: 10px; color: #888; }
    .q .s button svg { height: 10px; width: 10px; color: #808080; }
    .q .s button.okay { border: 1px outset #e0e0d0; color: #000; }
    .q .s button.okay svg { color: #000; }

    .form-o .o {}

    .dsbd { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(255,255,255,0.65) }

    #print-adm { display: none }
    .v { position: relative; }
</style>

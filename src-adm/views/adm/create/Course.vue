<template>
    <div class="_w">
        <div class="w">
            <div class="p">
                <div class="a">
                    <div v-if="department.hasOwnProperty('id')">{{ department.name }} ({{ department.name_alias }})</div>
                </div>
                <div class="b">
                    <div class="f g">
                        <div>
                            <button>{{ programTypeId }}</button>
                        </div>
                        <div>
                            <input type="text" placeholder="Name" style="width: 95%" v-model="course.name" maxlength="128"/>
                            <label>Full-course Name, Brief, Descriptive.</label>
                        </div>
                        <div>
                            <input type="text" placeholder="Name (Short)" style="width: 100%" v-model="course.name_alias" maxlength="16"/>
                            <label>Alias, Abbreviation. eg: ECE</label>
                        </div>
                    </div>
                    <div class="f h">
                        <div class="x">
                            <fieldset>
                                <legend>Academic Programme</legend>
                                <div class="list" v-if="acadPrograms.length > 0">
                                    <div :class="['l', acadProgramId == a.id ? 'active' : '']" v-for="(a,i) in acadPrograms" :key="'ap_'+i" @click="setAcademicProgram(a.id)">
                                        <v-icon name="square"></v-icon>
                                        <span>{{ a.name }}</span>
                                        <i v-if="acadProgramId == a.id">√</i>
                                        <i v-else>□</i>
                                    </div>
                                </div>
                            </fieldset>
                            <div class="z">
                                <span>Total Program Units: </span> <input type="text" v-model="course.total_units" maxlength="3" placeholder="0">
                            </div>
                        </div>
                        <div class="y">
                            <fieldset style="padding-bottom: 30px">
                                <legend>Program Type</legend>
                                <div class="list" v-if="programTypes.length > 0">
                                    <div :class="['l', programTypeId == p.id ? 'active' : '']" v-for="(p,i) in programTypes" :key="'pt_'+i" @click="setProgramType(p.id)">
                                        <v-icon name="square"></v-icon>
                                        <span>{{ p.name }} ({{ p.id }})</span>
                                        <i v-if="programTypeId == p.id">√</i>
                                        <i v-else>□</i>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                    <div class="butt">
                        <button :class="isFormOkay ? 'okay' : ''" :disabled="!isFormOkay || isSavingForm" @click="goSaveCourse()"><v-icon name="save"></v-icon> Create Course</button>
                    </div>
                    <ui-loader v-if="isSavingForm"></ui-loader>
                    <div class="dsbd" v-if="!department.hasOwnProperty('id')"></div>
                    <ui-modal-informer v-if="isModalShow" @modalClose="modalClose" @informedOkay="modalClose" :hasBG="true" class="moda-l">
                        <div slot="text">
                            Course <span style="font-weight: 600; padding: 0 4px;">{{ this.programTypeId }} {{ this.course.name }}</span> has been created successfully.
                        </div>
                    </ui-modal-informer>
                </div>
            </div>
            <div class="q">
                <div class="s">
                    <list-e-department @setValue="setDeptFromList"></list-e-department>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ListEDepartment from '@/components/ListEDepartment.vue';
    import UIModalInformer from '@/components/UIModalInformer.vue';
    import UILoader from '@/components/UILoader.vue';

    import 'vue-awesome/icons/square';
    import 'vue-awesome/icons/save';

    export default {
        emits: ['setViewName'],
        components: {
            UiModalInformer: UIModalInformer,
            UiLoader: UILoader,
            ListEDepartment
        },
        data() {
            return {
                isFetchingList: false,
                isErrorConnect: false,
                isSavingForm: false,
                isModalShow: false,
                department: {},
                programTypes: [
                    { id: 'BS', name: 'Bachelor of Science' },
                    { id: 'AB', name: 'Arts Literature' },
                    { id: 'BE', name: 'Bachelor of Education' },
                    { id: 'MS', name: 'Master of Science' },
                    { id: 'MA', name: 'Master of Arts' },
                    { id: 'ME', name: 'Master of Education' },
                    { id: 'TV', name: 'Technology/Vocational'}
                ],
                acadPrograms: [],
                acadProgramId: 0,
                programTypeId: '',
                course: { name: '', name_alias: '', total_units: 0 }
            }
        },
        computed: {
            isFormOkay() {
                let isOkay = true;
                for (let o in this.course) {
                    if (this.course[o] == '' || this.course[o] == 0) {
                        isOkay = false;
                        break;
                    }
                }
                return isOkay && this.programTypeId != '' && this.acadProgramId > 0;
            }
        },
        methods: {
            setDeptFromList(v) {
                this.department = v;
            },
            setProgramType(v) {
                this.programTypeId = v;
            },
            setAcademicProgram(v) {
                this.acadProgramId = v;
            },
            modalClose(v) {
                this.isModalShow = !v;
                this.department = {};
                this.course = { name: '', name_alias: '', total_units: 0 };
                this.acadProgramId = 0;
                this.programTypeId = '';
            },
            fetchAcademicProgram() {
                this.$http.get('academic_program/').then( res => {
                    this.acadPrograms = res.data;
                });
            },
            goSaveCourse() {
                this.isSavingForm = true;
                this.$http.post('course/', { department: this.department.id, academic_program: this.acadProgramId, ...this.course, program_type: this.programTypeId }).then( res => {
                    this.isModalShow = true;
                }).finally(() => {
                    this.isSavingForm = false;
                });
            }
        },
        created() {
            this.$emit('setViewName', this.$route.name);
            this.$store.commit('setModuleName', 'Courses – New Course');
        },
        mounted() {
            this.fetchAcademicProgram();
        }
    }
</script>

<style scoped>
    ._w { height: auto; position: relative; }
    ._w .w { height: 100%; display: grid; grid-template-columns: auto 350px; }
    ._w .w .p { height: 100%; display: grid; grid-template-rows: 24px auto; padding: 12px; background-color: #f8f8f2; }
    ._w .w .q { height: 100%; border-left: 1px solid #f0f0f0; background: #f8f8f2; }

    .q .s { height: 100%; padding: 12px; }

    .p .a { padding: 8px 0; font-size: 12px; font-weight: 600; text-align: center; }
    .p .b { background-color: #fff; box-shadow: 0 1px 1px rgba(0,0,0,0.24); padding: 24px 12px; position: relative; }
    .p .b .f input { height: 24px; border: none; font-size: 12px; padding: 4px 0; border-bottom: 1px solid #b0b0aa; color: #222; }
    .p .b .f input::placeholder { color: #777; font-size: 11px; }
    .p .b .f.g button { height: 24px; border: none; font-size: 11px; padding: 4px 0; border-bottom: 1px solid #b0b0aa; color: #222; display: block; width: 80%; cursor: default; background-color: #fff }
    .p .b .f.g label { display: block; font-size: 11px; padding: 4px 0; color: #444; }
    .p .b .f.g { display: grid; grid-template-columns: 40px auto 140px }

    .p .b .f.h { display: grid; grid-template-columns: auto 320px; padding: 16px 0; }
    .p .b .f.h .y { padding-left: 20px; }

    .p .b .f.h fieldset { border: 1px solid #f0f0ea; background-color: #fbfbf7; padding: 10px; }
    .p .b .f.h fieldset legend { font-size: 11px; color: #444; padding: 4px 6px; background-color: #fbfbf7; }
    .p .b .f.h fieldset .list { height: auto; background-color: #fff; border: 1px solid #f8f8f2; }
    .p .b .f.h fieldset .list .l { padding: 7px 12px; border-bottom: 1px solid #f8f8f2; position: relative; color: #222; }
    .p .b .f.h fieldset .list .l svg { width: 10px; height: 10px; color: #c0c0c0; }
    .p .b .f.h fieldset .list .l span { margin-left: 10px; font-size: 11px; }
    .p .b .f.h fieldset .list .l i { font-style: normal; position: absolute; top: 8px; right: 8px; font-size: 10px; color: #222; }
    .p .b .f.h fieldset .list .l:hover, .p .b .f.h fieldset .list .l.active { background-color: #f0f0ea; color: #222; }

    .p .b .f.h .x .z { padding: 20px 0; }
    .p .b .f.h .x .z span { height: 24px; padding: 5px 0; font-size: 11px; color: #444; margin-right: 10px; display: inline-block; }

    .p .b .butt { position: absolute; bottom: 24px; right: 12px; width: 300px; }
    .p .b .butt button { height: 32px; display: block; border: none; width: 100%; font-size: 11px; background-color: #fbfbf7; color: #909090; cursor: default; }
    .p .b .butt button svg { width: 10px; height: 10px; margin-right: 6px }
    .p .b .butt button.okay { background-color: #f0f0ea; color: #222; cursor: pointer; }

    .dsbd { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: #fff }
</style>
 
<template>
    <div>
        <div class="form-o">
            <div class="w">
                <div class="p">
                    <div class="u">
                        <div class="h">
                            <div class="name">Enrollee Information</div>
                        </div>
                        <div class="r a">
                            <div class="c">
                                <div>
                                    <label for="">Academic Year</label>
                                    <ui-select :setValue="setCourseType" :options="$store.state.forms.course.type" :styles="['border-radius: 2px; width: 95%; padding: 5px 10px 5px 10px', '']"></ui-select>
                                </div>
                                <div>
                                    <label for="">Semester</label>
                                    <ui-select :setValue="setCourseKind" :options="$store.state.forms.admission.academic_type" :styles="['border-radius: 2px; width: 95%; padding: 5px 10px 5px 10px', '']"></ui-select>
                                </div>
                                 <div>
                                    <label for="">Academic Status</label>
                                    <ui-select :setValue="setCourseKind" :options="$store.state.forms.admission.academic_type" :styles="['border-radius: 2px; width: 95%; padding: 5px 10px 5px 10px', '']"></ui-select>
                                </div>
                            </div>
                        </div>
                        <div class="r d">
                            <div class="c">
                                <div>
                                    <label for="">Grantee Name</label>
                                    <ui-select :setValue="setCourseKind" :options="$store.state.forms.admission.academic_type" :styles="['border-radius: 2px; width: 95%; padding: 5px 10px 5px 10px', '']"></ui-select>
                                </div>
                                <div>
                                    <label for="">Total Units</label>
                                    <input v-model="course.total_units" type="text"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="v">
                    
                    </div>
                </div>
                <div class="q">
                    <div class="r a">
                        <div class="g">
                            <find-e-admission :setValue="setadmissionIDFromSearch" :disabledInput="false"></find-e-admission>
                        </div>
                    </div>
                    <div class="r b">
                        <div class="sav">
                            <button :class="isFormOkay ? 'okay' : ''" @click="goSave()" :disabled="!isSavingForm || isFormOkay"><v-icon name="plus"></v-icon> Save Enrollee</button>
                        </div>
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
    import FindEAdmission from '@/components/FindEAdmission.vue';

    import 'vue-awesome/icons/chevron-left';
    import 'vue-awesome/icons/chevron-right';

    export default {
        components: {
            UiSelect: UISelect,
            UiLoader: UILoader,
            FindEAdmission,
        },
        data() {
            return {
                isSavingForm: false,
                isErrorConnect: false,
                student: {},
                enrolle: {},
                admission: {}
            }
        },
        computed: {
            isFormOkay() {
                return false;
            }
        },
        methods: {
            setAdmitIDFromSearch(v) {
                this.has.student_id = v.student.id;
            },
            goSave() {
                this.isSavingForm = true
                let vm = this;
                if (this.isFormOkay) {
                    this.$http.post('AdmNew', Object.assign({}, this.student, this.admission, this.has)).then( res => {
                        let data = res.data;
                        if (data.stat == 1) {
                            window.setTimeout(function() {
                                vm.$router.push({ name: 'adm-view-admission', params: { admid: data.data.id } });
                            }, 2000)
                        } else {
                            vm.isErrorConnect = true;
                        }
                    }).catch( () => {
                        vm.$router.push({ name: 'adm-new-saved' });
                        vm.isErrorConnect = true;
                    }).finally( () => {
                        window.setTimeout(() => vm.isSavingForm = false, 2000);
                        this.isSavingForm = false;
                    });
                }
            }
        },
        mounted() {
            this.$store.commit('setModuleName', 'Admission – New Enrollee');
        }
    }
</script>

<style scoped>
    .form-o { position: relative; height: 580px; }
    .form-o .w { display: grid; grid-template-columns: 700px 312px; }
    .form-o .w .p { padding: 0 16px; }
    .form-o .w .q { border-left: 1px solid #f0f0f0; height: calc(636px - 24px); background: linear-gradient(to right, #f8f8f8, #fcfcfc); }

    .form-o .w .p input { width: 100%; border-radius: 2px; color: #391e22; padding: 6px 10px 7px 10px; border: 1px outset #f5f5f5;  background-color: #fdfdfd; font-size: 11px; outline: none; cursor: pointer; }
    .form-o .w .p select { border-radius: 5px; color: #391e22; padding: 5px 12px 5px 12px; border: 1px solid #f0f0f0;  background-color: #fdfdfd; font-size: 11px; border-width: 1px; border-style: solid; border-color: #f0f0f0 #e0e0e0 #d0d0d0 #e0e0e0; outline: none; cursor: pointer; }
    .form-o .w .p textarea { width: 100%; height: 50px; border-radius: 2px; color: #391e22; padding: 8px 10px; background-color: #fdfdfd; font-size: 11px; border: 1px outset #f5f5f5; outline: none; cursor: pointer; }
    .form-o .w .p label { display: block; font-size: 11px; font-weight: 600; margin: 10px 0 4px 2px; color: #404040; }
    .form-o .w div.info { font-size: 10px; padding: 2px 8px; }

    .p .h { padding: 0 0 8px 0; border-bottom: 1px solid #f0f0f0; display: grid; grid-template-columns: 418px 200px; margin-bottom: 0px; }
    .p .h .name { font-weight: bold; }
    .p .h .butt { text-align: right }
    .p .h .butt button { border-width: 1px; border-style: outset; border-color: #f0f0f0; font-size: 11px; background: linear-gradient(to bottom, #e6d1d8, #f5f5dc); padding: 2px 8px; }

    .w .p .r { position: relative; }
    .w .p .r .c { display: grid; margin: 5px 0; }
    .p .r.a .c { grid-template-columns: 200px 170px 180px 85px }
    .p .r.d .c { grid-template-columns: 100px 207px 158px 170px }
    .p .r.d .c > div { position: relative; }
    .p .r.b .c { grid-template-columns: 350px 286px }
    .p .u { margin-bottom: 16px }
    .p .u, .p .v {  padding: 16px; }

    .w .q .r { position: relative; }
    .q .r .h { padding: 8px 6px; position: relative; }
    .q .r .h span { width: 22px; height: 14px; display: inline-block; border: 1px solid #b0b0b0; margin-right: 8px; float: right; font-size: 8px; text-transform: uppercase; padding: 2px; cursor: pointer; text-align: center; }
    .q .r .h span.active { background-color: #808080; color: #fff; }
    .q .r .h b { display: inline-block; padding: 2px 8px; color: #808080; font-weight: normal; font-size: 10px; }
    .q .r .h b.active { color: #202020; }
    .q .r .g { margin: 0 12px; }

    .q .r.a { padding-top: 12px; }

    .q .r.b { height: 290px; }

    .q .r.b .sav { position: absolute;; bottom: 0; left: 0; right: 0; text-align: center; background-color: #f0f0ea; height: 70px; padding: 20px 0; }
    .q .r.b .sav button { height: 24px; padding: 4px 12px; border: 1px solid #e0e0d0; background: linear-gradient(to bottom, #f0f0f0, #e0e0e0); border-radius: 2px; font-size: 10px; color: #888; }
    .q .r.b .sav button svg { height: 10px; width: 10px; color: #808080; }
    .q .r.b .sav button.okay { border: 1px outset #e0e0d0; color: #000; }
    .q .r.b .sav button.okay svg { color: #000; }

    .form-o .o {}

    .v { position: relative; }
    .dsbd { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(255,255,255,0.7) }
</style>

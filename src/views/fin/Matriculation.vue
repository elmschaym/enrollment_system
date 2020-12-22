<template>
    <div class="wrap-i">
        <div class="p">
            <div class="t">
                <div class="n">To Bill</div>
                <ui-select :setValue="setABillingType" :options="billingType" :presets="billingType[0]" :styles="['border-radius: 2px; width: 100%; padding: 6px 10px 6px 10px', '']"></ui-select>
            </div>
            <div class="s">
                <find-e-admission :setValue="setAdmissionFromSearch" :filters="{ stat: false, mode: 'all' }"></find-e-admission>
            </div>
        </div>
        <div class="q">
            <div class="u">
                <div v-if="admission.hasOwnProperty('student')">Account Holder: <span>{{ admission.student.lastname }}, {{ admission.student.firstname }} {{ admission.student.middlename }}</span></div>
                <div v-if="admission.hasOwnProperty('student')" style="text-align: right">ID #: <span>{{ admission.student.school_id }}</span></div>
            </div>
            <div class="v">
                <div class="r">
                    <div class="x">
                        <div class="a">Enrolled Subjects <span @click="fetchEnrollment()">Refresh</span></div>
                        <div class="b">
                            <div>Code</div>
                            <div>Name</div>
                            <div style="text-align: center">Units</div>
                            <div>Tuition</div>
                        </div>
                        <div class="d" v-if="enrollment.hasOwnProperty('enrollment') && enrollment.enrollment[0].billing[0].sect_enrol.length > 0">
                            <div :key="i +'subj'+ s.id" v-for="(s,i) in enrollment.enrollment[0].billing[0].sect_enrol">
                                <div>{{ s.subject.code }}</div>
                                <div>{{ s.subject.name }}</div>
                                <div style="text-align: center">{{ s.subject.units }} </div>
                                <div>{{ 50 | currency }}</div>
                            </div>
                        </div>
                        <div class="z" v-else>
                            No Enrolled Subjects
                        </div>
                        <div class="e" v-if="false">
                            <div>{{ totalSubjects }} Subject(s)</div>
                            <div style="text-align: right">{{ enrolledUnits }} Enrolled Units / {{ allowedUnits}} Allowed Units</div>
                        </div>
                        <div class="t">
                            <div>Total Tuition</div>
                            <div style="font-weight: bold ">{{ totalTuitFee | currency }}</div>
                        </div>
                        <div class="f" v-if="enrollment.hasOwnProperty('enrollment')">
                            <div>
                                Account Status: <span>{{ enrollment.enrollment[0].billing[0].is_paid ? 'PAID' : 'UNPAID' }}</span>
                            </div>
                            <div style="text-align: right">
                                <button v-if="!enrollment.enrollment[0].billing[0].is_paid" :disabled="!admission.hasOwnProperty('student')">Pay Account</button>
                                <button :disabled="!admission.hasOwnProperty('student')" style="margin-left: 10px;">Print Receipt <v-icon name="print"></v-icon></button>
                            </div>
                        </div>
                    </div>
                    <div class="y">
                        <div class="v">
                            <div class="a">Miscellaneous</div>
                            <div class="b">
                                <div>Name</div>
                                <div>Fee</div>
                            </div>
                            <div class="d" v-if="enrollment.hasOwnProperty('enrollment') && enrollment.enrollment[0].billing[0].misc_bills.length > 0">
                                <div :key="'misc'+ m.id" v-for="m in enrollment.enrollment[0].billing[0].misc_bills">
                                    <div>{{ m.misc.name }}</div>
                                    <div>{{ m.misc.amount | currency }}</div>
                                </div>
                            </div>
                            <div class="z" v-else>
                                No Available Data
                            </div>
                            <div class="t">
                                <div>Total Miscellaneous</div>
                                <div style="font-weight: bold ">{{ totalMiscFee | currency }}</div>
                            </div>
                        </div>
                        <div class="w" v-if="enrollment.hasOwnProperty('enrollment')">
                            <div class="h">Account Payable</div>
                            <div class="f">
                                <div class="g">
                                    <div class="nam" style="font-size: 11px">Tuition Fee</div>
                                    <div class="amt">
                                        <span v-if="totalTuitFee > 0">
                                            {{ totalTuitFee | currency}}
                                        </span>
                                        <span v-else>
                                            --
                                        </span>
                                    </div>
                                </div>
                                <div class="g">
                                    <div class="nam" style="font-size: 11px">Miscellaneous</div>
                                    <div class="amt">
                                        <span v-if="totalMiscFee > 0">
                                            {{ totalMiscFee | currency}}
                                        </span>
                                        <span v-else>
                                            --
                                        </span>
                                    </div>
                                </div>
                                <div class="g" style="border-top: 1px solid #f8f8f8; padding-top: 2px; background-color: #fbfbfb">
                                    <div class="nam">Total Billings</div>
                                    <div class="amt">{{ (totalTuitFee + totalMiscFee) | currency}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="isFetching" class="dsbd"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import FindEAdmission from '@/components/FindEAdmission.vue';
    import UISelect from '@/components/UISelect.vue';

    import 'vue-awesome/icons/print';

    export default {
        components: {
            UiSelect: UISelect,
            FindEAdmission,

        },
        data() {
            return {
                isFetching: false,
                admission: {},
                billingType: [
                    { id: 0, name: 'Enrollment' },
                    { id: 1, name: 'Graduation' }
                ],
                enrollment: {},
                miscFees: []
            }
        },
        computed: {
            totalMiscFee() {
                let total = 0;
                if (this.enrollment.hasOwnProperty('enrollment') && this.enrollment.enrollment[0].billing[0].misc_bills.length > 0)
                    this.enrollment.enrollment[0].billing[0].misc_bills.forEach(m => total += m.misc.amount);
                return total;
            },
            totalTuitFee() {
                let total = 0;
                if (this.enrollment.hasOwnProperty('enrollment') && this.enrollment.enrollment[0].billing[0].sect_enrol.length > 0)
                    this.enrollment.enrollment[0].billing[0].sect_enrol.forEach(s => total += (50*s.subject.units));
                return total;
            },
            totalSubjects() {
                return 0;
            },
            enrolledUnits() {
                return 0;
            },
            allowedUnits() {
                return 0;
            }
        },
        methods: {
            setAdmissionFromSearch(v) {
                this.admission = v;
                this.fetchEnrollment();
            },
            setABillingType(v) {

            },
            fetchEnrollment() {
                this.isFetching = true;
                this.$http.get('admission/'+ this.admission.id +'/?admission_fields=id,enrollment&enrollment_fields=id,acad_year,acad_status,semester,max_units,is_confirmed,billing&billing_fields=id,sect_enrol,misc_bills&miscbill_fields=id,misc&misc_fields=id,name,amount&sectenrol_fields=id,subject&subject_fields=id,name,code,units&billingf_to_bill=ENR&billingf_is_paid=false').then(res => {
                    if (res.data.hasOwnProperty('id')) {
                        this.enrollment = res.data;
                        this.isFetching = false;
                    }
                }).catch(() => {
                    this.isFetching = false;
                }).finally(() => {
                    this.isFetching = false;
                });
            }
        },
        mounted() {
            this.$store.commit('setModuleName', 'Finances – Billing');
        }
    }
</script>

<style scoped>
    .wrap-i { height: 100%; background-color: #f8f8f8; display: grid; grid-template-columns: 270px auto }

    .wrap-i .q { padding: 12px; height: calc(100vh - 32px - 24px - 24px); }
    .wrap-i .p { border-right: 1px solid #f0f0f0; height: calc(100vh - 48px - 32px); background: linear-gradient(to right, #f8f8f8, #fcfcfc); }

    .p .t { padding: 12px 12px 6px 12px; display: grid; grid-template-columns: 60px auto }
    .p .t div.n { color: #391e22; border: none; padding: 6px 10px; text-align: center; height: 27px; margin-right: 4px; border-bottom: 1px solid rgba(0,0,0,0.24); }

    .p .s { padding: 12px; }

    .q .u { height: 22px; display: grid; grid-template-columns: auto 200px; border-bottom: 1px solid #dadada; padding-bottom: 8px; }
    .q .u div { font-weight: lighter }
    .q .u div span { font-weight: bold; margin-left: 5px; font-size: 11px; }

    .q .v { position: relative; }
    .q .v .r { display: grid; grid-template-columns: auto 320px; margin: 10px 0; }
    .q .v .r .x { margin-right: 16px; background-color: #fcfcfc; height: 300px; border-style: solid; border-width: 1px; border-color: transparent #f5f5f5 #e0e0e0 #f5f5f5; }
    .q .v .r .x .a { font-size: 11px; color: #111; padding: 6px 7px; background-color: #fff; }
    .q .v .r .x .a span { float: right; font-size: 10px; border-bottom: 1px outset #fff; display: inline-block; padding: 1px 4px; cursor: pointer; }
    .q .v .r .x .b, .q .v .r .x .d > div { display: grid; grid-template-columns: 80px auto 50px 75px }
    .q .v .r .x .z { text-align: center; padding: 16px; font-size: 11px; }
    .q .v .r .x .b { background-color: #fcfcfc; border-bottom: 1px solid #fafafa; }
    .q .v .r .x .b div { padding: 7px; font-size: 10px; }
    .q .v .r .x .d { height: 220px; overflow-y: scroll; }
    .q .v .r .x .d > div {}
    .q .v .r .x .d > div  div { padding: 6px 7px; font-size: 11px; border-bottom: 1px solid #fafafa; }
    .q .v .r .x .d > div div svg { width: 10px; height: 10px; color: #b0b0b0; }
    .q .v .r .x .z { height: 220px; color: #d0d0d0; }
    .q .v .r .x .e { display: grid; grid-template-columns: 40% 60%; font-size: 10px; color: #111; padding: 6px 7px; border-top: 1px solid #fbfbfb; background-color: #fdfdfd; box-shadow: 0 1px 1px rgba(0,0,0,0.24); height: 24px; }
    .q .v .r .x .t { display: grid; grid-template-columns: auto 75px; border-top: 1px solid #f2f2f2; }
    .q .v .r .x .t div { padding: 7px 7px; font-size: 11px; }

    .q .v .r .x .f { padding: 16px 0; display: grid; grid-template-columns: 50% 50%; }
    .q .v .r .x .f button { border-radius: 2px; color: #000; padding: 4px 12px; border: none; background-color: #f5f5ed; font-size: 11px; outline: none; cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 1px rgba(0,0,0,0.24); }
    .q .v .r .x .f button:disabled { box-shadow: 0 1px 3px rgba(0,0,0,0.12); cursor: not-allowed; }
    .q .v .r .x .f button svg { width: 10px; height: 10px; margin-left: 8px; }
    .q .v .r .x .f span { border-radius: 2px; color: #000; padding: 0px 12px; border: none; background-color: #f5f5ed; font-size: 11px; border-style: solid; border-width: 1px; border-color: transparent #f5f5f5 #f0f0f0 #f5f5f5; }

    .q .v .r .y .v { background-color: #fcfcfc; height: 380px; border-style: solid; border-width: 1px; border-color: transparent #f5f5f5 #e0e0e0 #f5f5f5; }
    .q .v .r .y .v .a { font-size: 11px; color: #111; padding: 6px 10px; background-color: #fff; text-align: center; }
    .q .v .r .y .v .b, .q .v .r .y .v .d > div { display: grid; grid-template-columns: auto 86px }
    .q .v .r .y .v .b { border-bottom: 1px solid #fafafa; background-color: #fcfcfc; }
    .q .v .r .y .v .b div { padding: 7px 12px; font-size: 10px; }
    .q .v .r .y .v .d { height: 300px; overflow-y: scroll;  }
    .q .v .r .y .v .d > div div { padding: 6px 12px; font-size: 11px; }
    .q .v .r .y .v .d > div div svg { width: 10px; height: 10px; color: #b0b0b0; }
    .q .v .r .y .v .d > div { border-bottom: 1px solid #fafafa; }
    .q .v .r .y .v .z { height: 300px; text-align: center; padding: 16px; font-size: 11px; color: #d0d0d0; }

    .q .v .r .y .v .t { display: grid; grid-template-columns: auto 86px; border-top: 1px solid #f2f2f2; }
    .q .v .r .y .v .t div { padding: 7px 12px; font-size: 11px; }

    .q .v .r .y .w { margin-top: 20px; }
    .q .v .r .y .w .h { font-size: 11px; padding: 5px; text-align: center; background-color: #fcfcfc; }
    .q .v .r .y .w .f { background-color: #fff; border-style: solid; border-width: 1px; border-color: transparent #f5f5f5 #e0e0e0 #f5f5f5;}
    .q .v .r .y .w .f .g { display: grid; grid-template-columns: auto 130px }
    .q .v .r .y .w .f .g div { padding: 5px; }
    .q .v .r .y .w .f .g div.nam {}
    .q .v .r .y .w .f .g div.amt { font-size: 14px; font-weight: bold; text-align: right; }

    .dsbd { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(255,255,255,0.7) }
</style>

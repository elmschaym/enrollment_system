<template>
	<div class="wrap-i">
		<div class="p">
			<div class="t">
				<div class="n">To Bill</div>
				<ui-select @setValue="setABillingType" :options="billingType" :presets="billingType[0]" :styles="['border-radius: 2px; width: 100%; padding: 6px 10px 6px 10px', '']"></ui-select>
			</div>
			<div class="s">
				<find-e-admission @setValue="setAdmissionFromSearch" :filters="{ stat: false, mode: 'all' }"></find-e-admission>
			</div>
			<div class="u" v-if="enrollment.hasOwnProperty('enrollment')">
				<button v-if="enrollment.enrollment[0].billing.length > 0 && !isAccountPaid" :disabled="isPayingAccount" @click="payAccount()"><v-icon v-if="!isPayingAccount" name="save"></v-icon> {{ isPayingAccount ? '' : 'Pay Account' }} <v-icon v-if="isPayingAccount" name="spinner" :spin="true"></v-icon></button>
				<button v-if="isAccountPaid" @click="printReceipt()"><v-icon name="print"></v-icon> Print Receipt</button>
			</div>
		</div>
		<div class="q">
			<div class="u">
				<div v-if="admission.hasOwnProperty('student')">Account: <span>{{ fullname }}</span></div>
				<div v-if="admission.hasOwnProperty('student')" style="text-align: right">ID #: <span>{{ admission.student.school_id }}</span></div>
			</div>
			<div class="v">
				<div class="r">
					<div class="x">
						<div class="a">Enrolled Subjects <span @click="fetchEnrollment()">Refresh</span></div>
						<div class="b">
							<div></div>
							<div>Code</div>
							<div>Name</div>
							<div style="text-align: center">Units</div>
							<div>Tuition</div>
						</div>
						<div class="d" v-if="enrollment.hasOwnProperty('enrollment') && enrollment.enrollment[0].billing.length > 0 && enrollment.enrollment[0].billing[0].sect_enrol.length > 0">
							<div :key="i +'subj'+ s.id" v-for="(s,i) in enrollment.enrollment[0].billing[0].sect_enrol">
								<div><v-icon name="square"></v-icon></div>
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
							<div>Payable Status: <span v-if="enrollment.hasOwnProperty('enrollment')">{{ (enrollment.enrollment[0].billing.length == 0 || isAccountPaid) ? 'PAID' : 'UNPAID' }}</span></div>
							<div style="text-align: right">Total Tuition</div>
							<div style="font-weight: bold ">{{ totalTuitFee | currency }}</div>
						</div>
						<div class="f" v-if="enrollment.hasOwnProperty('enrollment')">
							<div style="text-align: center">
								
							</div>
						</div>
					</div>
					<div class="y">
						<div class="o">
							<div class="a">Miscellaneous</div>
							<div class="b">
								<div></div>
								<div>Name</div>
								<div>Fee</div>
							</div>
							<div class="d" v-if="enrollment.hasOwnProperty('enrollment') && enrollment.enrollment[0].billing.length > 0 &&  enrollment.enrollment[0].billing[0].misc_bills.length > 0">
								<div :key="'misc'+ m.id" v-for="m in enrollment.enrollment[0].billing[0].misc_bills">
									<div><v-icon name="square"></v-icon></div>
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
									<div class="nam" style="font-size: 11px">Matriculation</div>
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
									<div class="amt">{{ (totalTuitFee + totalMiscFee) | currency }}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div id="print-pay" style="display: none">
					<print-pay v-if="isPrintable" :payees="payees" :payor="fullname" :officer="officer"></print-pay>
				</div>
				<div v-if="isFetchingList" class="dsbd"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import FindEAdmission from '@/components/FindEAdmission.vue';
	import UISelect from '@/components/UISelect.vue';
	import PrintPAY from '@/components/PrintPAY.vue';

	import 'vue-awesome/icons/print';
	import 'vue-awesome/icons/save';
	import 'vue-awesome/icons/square';
	import 'vue-awesome/icons/spinner';

	export default {
		components: {
			UiSelect: UISelect,
			FindEAdmission,
			PrintPay: PrintPAY
		},
		data() {
			return {
				isFetchingList: false,
				isPayingAccount: false,
				isAccountPaid: false,
				admission: {},
				billingType: [
					{ id: 0, name: 'Enrollment' },
					{ id: 1, name: 'Graduation' }
				],
				enrollment: {},
				miscFees: [],
				payees: [],
				officer: ''
			}
		},
		computed: {
			fullname() {
				return this.admission.student.lastname +', '+ this.admission.student.firstname +' '+this.admission.student.middlename;
			},
			totalMiscFee() {
				let total = 0;
				if (this.enrollment.hasOwnProperty('enrollment') && this.enrollment.enrollment[0].billing.length > 0 && this.enrollment.enrollment[0].billing[0].misc_bills.length > 0)
					this.enrollment.enrollment[0].billing[0].misc_bills.forEach(m => total += m.misc.amount);
				return total;
			},
			totalTuitFee() {
				let total = 0;
				if (this.enrollment.hasOwnProperty('enrollment') && this.enrollment.enrollment[0].billing.length > 0 && this.enrollment.enrollment[0].billing[0].sect_enrol.length > 0)
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
			},
			isPrintable() {
				return this.admission.hasOwnProperty('student');
			}
		},
		methods: {
			setAdmissionFromSearch(v) {
				this.isAccountPaid = false;
				this.admission = v;
				this.fetchEnrollment();
			},
			setABillingType(v) {

			},
			fetchEnrollment() {
				this.isFetchingList = true;
				this.$http.get('admission/'+ this.admission.id +'/?admission_fields=id,enrollment&enrollment_fields=id,acad_year,acad_status,semester,max_units,is_confirmed,billing&billing_fields=id,sect_enrol,misc_bills&miscbill_fields=id,misc&misc_fields=id,name,amount&sectenrol_fields=id,subject&subject_fields=id,name,code,units&billingf_to_bill=ENR&billingf_is_paid=false').then(res => {
					if (res.data.hasOwnProperty('id')) {
						this.enrollment = res.data;
						this.isFetchingList = false;
					}
				}).catch(() => {
					this.isFetchingList = false;
				}).finally(() => {
					this.isFetchingList = false;
				});
			},
			payAccount() {
				this.isPayingAccount = true;
				this.$http.put('billing/'+ this.enrollment.enrollment[0].billing[0].id +'/?action=pay-account', {}).then(res => {
					this.payees = [{ name: 'Tuition Fee', value: this.totalTuitFee }, { name: 'Miscellaneous', value: this.totalMiscFee }];
					this.isAccountPaid = true;
				}).catch(() => {
					this.isAccountPaid = false;
				}).finally(() => {
					this.isPayingAccount = false;
				});
			},
			printReceipt() {
				this.$htmlToPaper('print-pay');
			}
		},
		watch: {
			'$store.isReloadView'(n) {
				this.fetchEnrollment();
			}
		},
		created() {
			let officer = this.$storageGet('user_info');
			this.officer = officer.last_name +' '+ officer.first_name;
			if (this.$route.query.hasOwnProperty('set_dimen')) {
				this.$sleep(1500).then(() => {
					window.nwWin.show();
				});
			}
			this.$store.commit('setModuleName', 'Finances – Billing');
		}
	}
</script>

<style scoped>
	.wrap-i { height: 100%; background-color: #fbfbf7; display: grid; grid-template-columns: 240px auto }

	.wrap-i .q { height: 100%; background: #fff; }
	.wrap-i .p { border-right: 1px solid #f0f0f0; height: 100%; background: #fbfbf7; display: grid; grid-template-rows: 45px auto 70px }

	.p .t { padding: 12px 12px 6px 12px; display: grid; grid-template-columns: 60px auto }
	.p .t div.n { color: #391e22; border: none; padding: 6px 10px; text-align: center; height: 27px; margin-right: 4px; border-bottom: 1px solid rgba(0,0,0,0.24); }

	.p .s { padding: 12px; }

	.p .u { padding: 16px 12px; background-color: #fff }
	.p .u button { height: 32px; width: 100%; border-radius: 2px; color: #000; padding: 4px 12px; border: none; background-color: #f5f5ed; font-size: 11px; outline: none; cursor: pointer; box-shadow: 0 1px 1px rgba(0,0,0,0.24); }
	.p .u button:disabled { box-shadow: 0 1px 3px rgba(0,0,0,0.12); cursor: not-allowed; }
	.p .u button svg { width: 10px; height: 10px; margin-right: 4px; }

	.q .u { height: 30px; padding: 10px 12px; display: grid; grid-template-columns: auto 200px; border-bottom: 1px solid #e5e5e0; padding-bottom: 8px; }
	.q .u div { font-weight: lighter }
	.q .u div span { font-weight: 600; margin-left: 5px; font-size: 12px; }

	.q .v { position: relative; }
	.q .v .r { display: grid; grid-template-columns: auto 270px; }
	.q .v .r .x { background-color: #fff; height: 400px; padding: 12px; }
	.q .v .r .x .a { font-size: 11px; color: #111; padding: 6px 0; background-color: #fff; }
	.q .v .r .x .a svg { width: 10px; height: 10px; color: #444; margin-right: 4px; }
	.q .v .r .x .a span { float: right; font-size: 10px; border: 1px solid #f0f0ea; display: inline-block; padding: 0 4px; cursor: pointer; }
	.q .v .r .x .b, .q .v .r .x .d > div { display: grid; grid-template-columns: 20px 80px auto 50px 75px }
	.q .v .r .x .d { border: 1px solid #f8f8f2; }
	.q .v .r .x .z { text-align: center; padding: 16px; font-size: 11px; }
	.q .v .r .x .b { background-color: #f8f8f2; }
	.q .v .r .x .b div { padding: 7px; font-size: 10px; }
	.q .v .r .x .d { height: 320px; overflow-y: scroll; }
	.q .v .r .x .d > div {}
	.q .v .r .x .d > div div { padding: 7px; font-size: 11px; }
	.q .v .r .x .d > div div svg { width: 10px; height: 10px; color: #e0e0da; }
	.q .v .r .x .z { height: 320px; color: #d0d0d0; }
	.q .v .r .x .e { display: grid; grid-template-columns: 40% 60%; font-size: 10px; color: #111; padding: 6px 7px; border-top: 1px solid #fbfbfb; background-color: #fdfdfd; box-shadow: 0 1px 1px rgba(0,0,0,0.24); height: 24px; }
	.q .v .r .x .t { display: grid; grid-template-columns: 200px auto 75px; border-top: 1px solid #f2f2f2; }
	.q .v .r .x .t div { padding: 7px 7px; font-size: 11px; }

	.q .v .r .x .t div span { border-radius: 2px; color: #000; padding: 0px 12px; border: none; background-color: #f5f5ed; font-size: 11px; border-style: solid; border-width: 1px; border-color: transparent #f5f5f5 #f0f0f0 #f5f5f5; }

	.q .v .r .y .o { background-color: #fff; height: 420px;  padding: 12px; iborder-left: 1px solid #f0f0ea; }
	.q .v .r .y .o .a { font-size: 11px; color: #111; padding: 6px 0; background-color: #fff; }
	.q .v .r .y .o .b, .q .v .r .y .o .d > div { display: grid; grid-template-columns: 20px auto 86px }
	.q .v .r .y .o .b { background-color: #f8f8f2; }
	.q .v .r .y .o .b div { padding: 7px; font-size: 10px; }
	.q .v .r .y .o .d { height: 340px; overflow-y: scroll; border: 1px solid #f8f8f0;  }
	.q .v .r .y .o .d > div div { padding: 7px; font-size: 11px; }
	.q .v .r .y .o .d > div div svg { width: 10px; height: 10px; color: #e0e0da }
	.q .v .r .y .o .d > div {}
	.q .v .r .y .o .z { height: 340px; text-align: center; padding: 16px; font-size: 11px; color: #d0d0d0; }

	.q .v .r .y .o .t { display: grid; grid-template-columns: auto 86px; border-top: 1px solid #f2f2f2; }
	.q .v .r .y .o .t div { padding: 7px 12px; font-size: 11px; }

	.q .v .r .y .w { margin-top: 20px; padding: 0 12px; }
	.q .v .r .y .w .h { font-size: 11px; padding: 5px; text-align: center; background-color: #f8f8f2; }
	.q .v .r .y .w .f { background-color: #fff; border-style: solid; border-width: 1px; border-color: transparent #f5f5f5 #ebebe7 #f5f5f5; }
	.q .v .r .y .w .f .g { display: grid; grid-template-columns: auto 130px }
	.q .v .r .y .w .f .g div { padding: 5px; }
	.q .v .r .y .w .f .g div.nam {}
	.q .v .r .y .w .f .g div.amt { font-size: 14px; font-weight: bold; text-align: right; }

	.dsbd { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(255,255,255,0.7) }

	#print-pay { display: none }
</style>

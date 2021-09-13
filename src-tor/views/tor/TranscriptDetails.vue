<template>
	<div class="form-o">
		<div class="w">
			<div class="p">
				<div class="u">
					<div class="h">
						<div class="name">Basic Information</div>
					</div>
					<div class="r a">
						<div class="c" style="padding-top: 10px">
							<div>
								<input style="width: 95%" v-model="school.email" placeholder="Email Address" maxlength="255"/>
							</div>
							<div>
								<input style="width: 100%" v-model="schoolx.website" placeholder="Website" maxlength="255"/>
							</div>
						</div>
					</div>
					<div class="r d">
						<div class="c">
							<div>
								<label for="">Telephone No.</label>
								<input style="width: 95%" placeholder="" v-model="school.tel_no" maxlength="32" />
							</div>
							<div>
								<label for="">Fax No.</label>
								<input style="width: 95%" placeholder="" v-model="schoolx.fax_no" maxlength="255" />
							</div>
							<div>
							</div>
							<div>
							</div>
						</div>
					</div>
					<div class="r b">
						<div class="c" style="padding-top: 10px">
							<div>
								<textarea v-model="school.address" style="width: 100%" placeholder="School Address" maxlength="255" ></textarea>
								<div class="info"></div>
							</div>
						</div>
					</div>
				</div>
				<div class="v">
					<div class="h">
						<div class="name">Other Information</div>
					</div>
					<div class="r a">
						<div class="c" style="padding-right: 8px">
							<fieldset style="margin-bottom: 10px">
								<legend>Personnels</legend>
								<div>
									<div>
										<input style="width: 100%" v-model="school.registrar_oic" placeholder="University Registrar" maxlength="32" />
									</div>
								</div>
								<div style="display: grid; grid-template-columns: 140px auto">
									<div style="padding-right: 10px">
										<input style="width: 100%" v-model="school.checked_by" placeholder="Checked By" maxlength="255" />
									</div>
									<div>
										<input style="width: 100%" v-model="school.prepared_by" placeholder="Prepared By" maxlength="255" />
									</div>
								</div>
							</fieldset>
						</div>
						<div class="c" style="padding-left: 8px">
							<fieldset style="height: 120px; display: block; margin-bottom: 10px;">
							</fieldset>
							<fieldset style="height: 200px; display: block">
							</fieldset>
						</div>
					</div>
				</div>
			</div>
			<div class="q">
				<div class="t">
				</div>
				<div class="s">
					<button :class="['br-confirm', isFormOkay ? 'okay' : '']" @click="goSaveDetails()" :disabled="isSavingForm || !isFormOkay"><v-icon name="plus"></v-icon> Save Information</button>
				</div>
			</div>
		</div>
		<ui-modal-informer v-if="isSubmitOkay" @informedOkay="modalBClose" class="moda-l">
			<div slot="text">
				Information was successfully saved!
			</div>
		</ui-modal-informer>
		<ui-loader v-if="isSavingForm"></ui-loader>
	</div>
</template>

<script>

	import UISelect from '@/components/UISelect.vue';
	import UILoader from '@/components/UILoader.vue';
	import UIModalInformer from '@/components/UIModalInformer.vue';

	import 'vue-awesome/icons/square';
	import 'vue-awesome/icons/plus';
	import 'vue-awesome/icons/chevron-right';
	import 'vue-awesome/icons/calendar';
	import 'vue-awesome/icons/at';
	import 'vue-awesome/icons/id-card';

	export default {
		components: {
			UiSelect: UISelect,
			UiLoader: UILoader,
			UiModalInformer: UIModalInformer,
		},
		data() {
			return {
				isSavingForm: false,
				isGenSIDError: false,
				isSubmitOkay: false,
				isFetchingList: false,
				school: { address: '', tel_no: '',  email: '', checked_by: '', prepared_by: '', registrar_oic: '' },
				schoolx: { fax_no: '', website: '' }
			}
		},
		computed: {
			isFormOkay() {
				let isFormOkay = true;
				for (let o in this.school)
					isFormOkay = isFormOkay && this.school[o] != '';
				return isFormOkay;
			}
		},
		methods: {
			goSaveDetails() {
				let sch = Object.assign({}, this.school, this.schoolx);
				this.$storageSet('tor_details', sch, 'local');
				this.isSubmitOkay = true;
			},
			fetchDetails() {
				let info = this.$storageGet('tor_details', 'local') || {};
				if (info.hasOwnProperty('address')) {
					this.school = info;
					this.schoolx.fax_no = info.fax_no;
					this.schoolx.website = info.website;
				}
			},
			modalAClose(v) {
				this.isGenSIDError = false;
			},
			modalBClose(v) {
				this.isSubmitOkay = false;
			}
		},
		created() {
			this.$store.commit('setModuleName', 'School – Transcript Details');
		},
		mounted() {
			this.fetchDetails();
		}
	}
</script>

<style scoped>
	.form-o { position: relative; height: auto;  }
	.form-o .w { height: 100%; display: grid; grid-template-columns: auto 312px; }
	.form-o .w .p { height: 100%; position: relative; display: grid; grid-template-rows: 230px auto; }
	.form-o .w .q { height: 100%; border-left: 1px solid #f0f0f0; background: #f8f8f2; display: grid; grid-template-rows: auto 70px; }

	.form-o .w .p input { width: 100%; height: 28px; border-radius: 2px; color: #000; padding: 3px 8px 3px 8px; border: none; background-color: #fdfdfd; font-size: 11px; outline: none; cursor: pointer; border-style: solid; border-width: 1px; border-color: #a0a09a #90908a #70706a #90908a; }
	.form-o .w .p ::placeholder { color: #222; }
	.form-o .w .p select { border-radius: 5px; color: #000; padding: 5px 12px 5px 12px; border: 1px solid #f0f0f0;  background-color: #fdfdfd; font-size: 11px; border-width: 1px; border-style: solid; border-color: #a0a09a #90908a #70706a #90908a; outline: none; cursor: pointer; }
	.form-o .w .p textarea { width: 100%; height: 72px; border-radius: 2px; color: #000; padding: 5px 8px; background-color: #fdfdfd; font-size: 11px; border: none; outline: none; cursor: pointer; border-style: solid; border-width: 1px; border-color: #a0a09a #90908a #70706a #90908a; }
	.form-o .w .p label { display: block; font-size: 11px; margin: 10px 0 4px 2px; color: #111; }
	.form-o .w .p button { width: 100%; height: 28px; border-radius: 2px; color: #000; padding: 7px 8px 8px 8px; border: none; background-color: #fdfdfd; font-size: 11px; outline: none; cursor: pointer;border-style: solid; border-width: 1px; border-color: #a0a09a #90908a #70706a #90908a; }
	.form-o .w div.info { font-size: 10px; padding: 2px 8px; }

	.p .h { iborder-bottom: 1px solid #f0f0f0; display: grid; grid-template-columns: auto 200px; margin-bottom: 0px; color: #505040; }
	.p .h .name { font-weight: 600; }
	.p .h .butt { text-align: right }
	.p .h .butt button { border-width: 1px; border-style: outset; border-color: #f0f0f0; font-size: 11px; background: linear-gradient(to bottom, #e6d1d8, #f5f5dc); padding: 2px 8px; }

	.p .u { padding: 16px; border-bottom: 1px solid #f8f8f2; }
	.p .v { padding: 16px; background-color: #fbfbf7; }

	.p .r { position: relative; }
	.p .r .c { display: grid; margin-bottom: 5px; }
	.p .u .r.a .c { grid-template-columns: 50% 50% }
	.p .u .r.d .c { grid-template-columns: 160px 160px auto auto }
	.p .u .r.d .c > div { position: relative; }
	.p .u .r.b .c {}
	
	.p .v .r.a { display: grid; grid-template-columns: 50% 50% }
	.p .v .r.a .c {}
	.p .v .r.a .c div { margin-bottom: 8px; position: relative; }
	.p .v .r.a .c fieldset legend { font-size: 11px; padding: 5px 8px; }
	.p .v .r.a .c fieldset { background-color: #fff; border: 1px solid #e0e0da; padding: 12px; }
	.p .v .r.a .c div svg { position: absolute; width: 12px; right: 12px; color: #505050; top: 6px; right: 8px; }

	.q .t .a { padding: 12px; }
	.q .t .a .h { padding: 5px 0 0 0; font-weight: 600; color: #303030; }
	.q .t .a .g {}
	.q .t .a .g div { display: grid; grid-template-columns: auto 70px; margin: 8px 0; }
	.q .t .a .g div input { height: 28px; border-radius: 2px; color: #000; padding: 3px 8px 3px 8px; border: none; background-color: #fdfdfd; font-size: 11px; outline: none; cursor: pointer; border-style: solid; border-width: 1px; border-color: #a0a09a #90908a #70706a #90908a; }
	.q .t .a .g div ::placeholder { color: #222; }

	.q .t .b { padding: 12px; }
	.q .t .b fieldset legend { font-size: 11px; padding: 5px 8px; }
	.q .t .b fieldset { background-color: #fff; border: 1px solid #e0e0da; padding: 12px; }
    .q .t .b fieldset .list { height: 220px; background-color: #fff; border: 1px solid #f8f8f2; overflow-y: scroll; }
    .q .t .b fieldset .list .l { padding: 7px 4px; border-bottom: 1px solid #f8f8f2; position: relative; color: #222; }
    .q .t .b fieldset .list .l svg { width: 10px; height: 10px; color: #c0c0c0; }
    .q .t .b fieldset .list .l span { margin-left: 10px; font-size: 11px; }
    .q .t .b fieldset .list .l i { font-style: normal; position: absolute; top: 8px; right: 8px; font-size: 10px; color: #222; }
    .q .t .b fieldset .list .l:hover, .p .b .f.h fieldset .list .l.active { background-color: #f0f0ea; color: #222; }
	.q .t .b div svg { position: absolute; width: 12px; right: 12px; color: #505050; top: 6px; right: 8px; }

	.q .s {text-align: center; background-color: #f0f0ea; height: 70px; padding: 20px 0; }
	.q .s button {}
	.q .s button svg { height: 10px; width: 10px; color: #808080; }
	.q .s button.okay { border: 1px outset #e0e0d0; color: #000; }
	.q .s button.okay svg { color: #000; }

	.v { position: relative; }

	.dsbd { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(255,255,255,0.7) }
	.dp-wrap { position: absolute; top: 150px; left: calc((100% - 300px) / 2); z-index: 9999; }
	.dp-back { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.15) }

</style>

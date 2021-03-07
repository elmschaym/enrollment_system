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
							<input type="text" placeholder="Name" style="width: 95%" v-model="subject.name" maxlength="64"/>
							<label>Full-subject Name, Brief, Descriptive.</label>
						</div>
						<div>
							<input type="text" placeholder="Name (Code)" style="width: 100%" v-model="subject.code" maxlength="10"/>
							<label>Subject Code, Alias. eg: MATH61</label>
						</div>
					</div>
					<div class="f h">
						<div class="x">
							<fieldset>
								<legend>Required Units</legend>
								<div class="list">
									<button :class="subject.units == 1 ? 'active' : ''" @click="subject.units = 1">1</button>
									<button :class="subject.units == 2 ? 'active' : ''" @click="subject.units = 2">2</button>
									<button :class="subject.units == 3 ? 'active' : ''" @click="subject.units = 3">3</button>
									<button :class="subject.units == 4 ? 'active' : ''" @click="subject.units = 4">4</button>
									<button :class="subject.units == 6 ? 'active' : ''" @click="subject.units = 6">6</button>
								</div>
								<div class="inpu">
									<input placeholder="Enter units" v-model="subject.units" style="width: 100%; text-align: center;" maxlength="1"/>
								</div>
							</fieldset>
						</div>
						<div class="y">
							<textarea placeholder="Notes" style="width: 100%; margin-top: 10px" v-model="description" maxlength="255"></textarea>
							<label>Additional information</label>
						</div>
					</div>
					<div class="butt">
						<button :class="isFormOkay ? 'okay' : ''" :disabled="!isFormOkay || isSavingForm" @click="goSaveSubject()"><v-icon name="save"></v-icon> Create Subject</button>
					</div>
					<ui-loader v-if="isSavingForm"></ui-loader>
					<div class="dsbd" v-if="!department.hasOwnProperty('id')"></div>
					<ui-modal-informer v-if="isModalShow" @modalClose="modalClose" @informedOkay="modalClose" :hasBG="true" class="moda-l">
						<div slot="text">
							Subject <span style="font-weight: 600; padding: 0 4px;">{{ this.subject.name }}</span> has been created successfully.
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
				subject: { name: '', code: '', units: 3 },
				description: ''
			}
		},
		computed: {
			isFormOkay() {
				let isOkay = true;
				for (let o in this.subject) {
					if (this.subject[o] == '') {
						isOkay = false;
						break;
					}
				}
				return isOkay;
			}
		},
		methods: {
			setDeptFromList(v) {
				this.department = v;
			},
			modalClose(v) {
				this.isModalShow = !v;
				this.department = {};
				this.subject = { name: '', code: '', units: 3 };
				this.description = '';
			},
			goSaveSubject() {
				this.isSavingForm = true;
				this.$http.post('subject/', { department: this.department.id, ...this.subject, description: this.description }).then( res => {
					this.isModalShow = true;
				}).finally(() => {
					this.isSavingForm = false;
				});
			}
		},
		created() {
			this.$emit('setViewName', this.$route.name);
			this.$store.commit('setModuleName', 'Subjects – New Subject');
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
	.p .b .f.g label, .p .b .f.h label { display: block; font-size: 11px; padding: 4px 0; color: #444; }
	.p .b .f.h textarea { height: 72px; border: none; font-size: 12px; padding: 5px; border: 1px solid #f0f0ea; border-bottom: 1px solid #b0b0aa; color: #222; }

	.p .b .f.g { display: grid; grid-template-columns: auto 170px }

	.p .b .f.h { display: grid; grid-template-columns: 180px auto; padding: 16px 0; }
	.p .b .f.h .y { padding-left: 20px; }

	.p .b .f.h fieldset { border: 1px solid #f0f0ea; background-color: #fbfbf7; padding: 10px 10px 30px 10px; }
	.p .b .f.h fieldset legend { font-size: 11px; color: #444; padding: 4px 6px; background-color: #fbfbf7; }
	.p .b .f.h fieldset .list { height: auto; min-height: 120px; background-color: #fff; border: 1px solid #f8f8f2; padding: 10px; text-align: center; }
	.p .b .f.h fieldset .list button { padding: 7px 12px; border: 1px solid #f8f8f2; color: #555; background-color: #fbfbf7; margin: 5px; }
	.p .b .f.h fieldset .list button:hover, .p .b .f.h fieldset .list button.active { background-color: #f0f0ea; color: #222; }

	.p .b .f.h .x .z { padding: 20px 0; }
	.p .b .f.h .x .z span { height: 24px; padding: 5px 0; font-size: 11px; color: #444; margin-right: 10px; display: inline-block; }

	.p .b .butt { position: absolute; bottom: 24px; right: 12px; width: 300px; }
	.p .b .butt button { height: 32px; display: block; border: none; width: 100%; font-size: 11px; background-color: #fbfbf7; color: #909090; cursor: default; }
	.p .b .butt button svg { width: 10px; height: 10px; margin-right: 6px }
	.p .b .butt button.okay { background-color: #f0f0ea; color: #222; cursor: pointer; }

	.dsbd { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: #fff }
</style>
 
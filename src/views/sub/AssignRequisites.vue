<template>
	<div class="wrap-a">
		<div class="p">
			<div class="a">
				<list-e-dep-subject @setValue="setSubjectFromSearch"></list-e-dep-subject>
			</div>
		</div>
		<div class="q">
			<div class="w">
				<div class="h">
					<div class="code">
						{{ subject.code }}
					</div>
					<div class="name">
						<div class="n">{{ subject.name }}</div>
						<div class="m">{{ subject.units }} Units</div>
					</div>
					<div class="butt">
						<button @click="changeSubject()">Change</button>
					</div>
				</div>
				<div class="g">
					<div class="u">
						<div class="x">
							<div class="list">
								<div class="l" v-for="(p,i) in pre_reqs_new" :key="'pre_new_'+i">
									<div class="ii">
										<div class="ff">
											<div class="c">{{ p.code }}</div>
											<div class="n">{{ p.name }}</div>
											<div class="e" title="Remove" @click="removeRequisiteNew(p)">&times;</div>
										</div>
									</div>
									<div class="bb"></div>
								</div>
							</div>
							<div class="subm">
								<button :disabled="!isFormOkay" @click="saveRequisites()" :class="['br-confirm', isFormOkay ? 'okay' : '']">Commit Changes</button>
							</div>
						</div>
						<div class="y">
							<div class="data">
								<div class="code">
									<div class="ii">{{ subject.code }}</div>
									<div class="bb"></div>
								</div>
								<div class="list">
									<div class="l" v-for="(p,i) in pre_reqs_old" :key="'pre_old_'+i">
										<div class="bb"></div>
										<div class="ii">
											<div class="ff">
												<div class="c" @click="changeSubjectByOld(p)">{{ p.requisite.code }}</div>
												<div class="n">{{ p.requisite.name }}</div>
												<div class="e" title="Remove" @click="removeRequisiteOld(p)">&times;</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="subm">
								<button @click="fetchRequisites(true)" class="br-confirm">Reload</button>
							</div>
						</div>
					</div>
					<ui-modal-decider v-if="isModalDeciderShow" :hasBG="false" @modalClose="modalDeciderClose" @decidedYes="removeDecidedYes">
						<span slot="text">
							Do you want to remove <b style="font-weight: 600; padding: 0 2px">{{ queue_to_rem.requisite.code }}</b>?
						</span>
					</ui-modal-decider>
					<ui-loader v-if="isFetchingList"></ui-loader>
				</div>
			</div>
			<ui-loader v-if="isFormSaving"></ui-loader>
			<div class="blur-w0" v-if="!subject.hasOwnProperty('id')"></div>
		</div>
	</div>
</template>

<script>
	import ListEDepSubject from '@/components/ListEDepSubject.vue';
	import UILoader from '@/components/UILoader.vue';
	import UIModalDecider from '@/components/UIModalDecider.vue';

	import 'vue-awesome/icons/square';
	import 'vue-awesome/icons/trash';

	export default {
		emits: ['setViewName'],
		components: {
			ListEDepSubject,
			UiLoader: UILoader,
			UiModalDecider: UIModalDecider
		},
		data() {
			return {
				isModalDeciderShow: false,
				isFetchingList: false,
				isFormSaving: false,
				isErrorConnect: false,
				//subject: { id: 1, name: 'Research Methods', code: 'ECE198', units: 3 },
				subject: {},
				pre_reqs_new: [],
				pre_reqs_old: [],
				queue_to_rem: {}
			}
		},
		computed: {
			isFormOkay() {
				return this.pre_reqs_new.length > 0;
			}
		},
		methods: {
			setSubjectFromSearch(v) {
				if (this.subject.hasOwnProperty('id')) {
					if (this.subject.id != v.id && !this.pre_reqs_old.find(s => s.requisite.id == v.id) && !this.pre_reqs_new.find(s => s.id == v.id))
						this.pre_reqs_new.push(v);
				}
				else {
					this.subject = v;
					this.fetchRequisites(true);
				}
			},
			changeSubject() {
				this.subject = {}
				this.pre_reqs_new = [];
				this.pre_reqs_old = [];
			},
			modalDeciderClose(v) {
				this.isModalDeciderShow = false;
			},
			removeRequisiteNew(p) {
				let i = this.pre_reqs_new.indexOf(p);
				this.pre_reqs_new.splice(i, 1);
			},
			removeRequisiteOld(p) {
				this.queue_to_rem = p;
				this.isModalDeciderShow = true;
			},
			removeDecidedYes() {
				this.$http.delete('subject_requisite/'+ this.queue_to_rem.id +'/?type=full').then(res => {
					this.fetchRequisites(false);
				});
				this.isModalDeciderShow = false;
			},
			changeSubjectByOld(p) {
				this.subject = p.requisite;
				this.fetchRequisites(true);
			},
			fetchRequisites(v) {
				this.isFetchingList = v;
				this.$http.get('subject_requisite/'+ this.subject.id +'/?action=lister&subjrequisite_fields=id,requisite&subject_fields_alt=id,code,name,units').then( res => {
					this.pre_reqs_old = res.data;
				}).catch( () => {
					this.isErrorConnect = true;
				}).finally(() => {
					this.isFetchingList = false;
				});
			},
			saveRequisites() {
				this.isFetchingList = true;
				if (this.isFormOkay) {
					const data = [];
					this.pre_reqs_new.forEach(v => {
						data.push({ subject: this.subject.id, requisite: v.id });
					});
					this.$http.post('subject_requisite/', data).then( res => {
						this.pre_reqs_new =[];
						this.fetchRequisites(false);
					}).catch( () => {
						this.isErrorConnect = true;
					}).finally(() => {
						this.isFetchingList = false;
					});
				}
			}
		},
		created() {
			this.$emit('setViewName', this.$route.name);
			this.$store.commit('setModuleName', 'Subjects – Assign Requisites');
		}
	}
</script>

<style scoped>
	.wrap-a { height: auto; position: relative; display: grid; grid-template-columns: 320px auto; }
	.p { height: 100%; padding: 0 16px; background-color: #fbfbf7; }
	.q { height: 100%; border-left: 1px solid #f0f0f0; background: #fff; position: relative;  }
	.q .w { height: 100%; display: grid; grid-template-rows: 58px auto; }

	.p .a { height: 100%; padding: 12px 0; }

	.q .w .h { padding: 12px; border-bottom: 1px solid #f0f0f0; display: grid; grid-template-columns: 72px auto 80px; margin-bottom: 0px; }
	.q .w .h .code { height: 32px; display: flex; align-items: center; justify-content: center; font-size: 16px; color: #444; font-weight: 600; background-color: #f5f5f0; white-space: nowrap; overflow-x: hidden; padding-top: 6px; padding-bottom: 6px; box-shadow: 0 1px 1px rgba(0,0,0,0.24); }
	.q .w .h .name { padding: 2px 0 0 12px; }
	.q .w .h .name .n { font-size: 13px; font-weight: 600; margin: 2px 0; }
	.q .w .h .name .m { font-size: 11px;  }
	.q .w .h .butt { padding: 8px 0; }
	.q .w .h .butt button { width: 100%; border-radius: 2px; color: #808080; padding: 3px 8px 2px 8px; border: none; background-color: #f0f0ea; font-size: 11px; outline: none; cursor: pointer; color: #000; box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 1px rgba(0,0,0,0.24); }
	.q .w .h .butt button.okay { background-color: #fff }

	.q .w .g { background-color: #fff; position: relative; }
	.q .w .g .u { height: 100%; display: grid; grid-template-columns: auto 40%; }
	.q .w .g .u .x { height: inherit; background: #fbfbf7; display: grid; grid-template-rows:  auto 50px; }
	.q .w .g .u .y { height: inherit; background: #fff; border-left: 1px solid #f0f0ea; display: grid; grid-template-rows: auto 50px; }

	.u .x .list { margin: 60px 78px 20px 20px; overflow-y: scroll; max-height: 350px; }
	.x .l { display: grid; grid-template-columns: auto 50px; border-right: 1px solid #e0e0da; }
	.x .l .bb { width: 50px; height: 20px; border-bottom: 1px solid #e0e0da; }
	.x .l .ii { padding: 8px 0; }
	.x .ff { height: 40px; background-color: #fff; border: 1px solid #ebebe7; display: grid; grid-template-columns: 70px auto 20px; overflow: hidden }
	.x .ff .c { display: flex; justify-content: left; align-items: center; font-size: 13px; font-weight: 600; padding: 4px 10px; background-color: #fbfbf7; }
	.x .n { display: flex; justify-content: left; align-items: center; font-size: 11px; padding: 4px 10px; background-color: #fff; }
	.x .ff .e { display: flex; justify-content: center; align-items: center; background-color: #fbfbf7; cursor: pointer; }

	.x .subm { background-color: #fff; border-top: 1px solid #f8f8f2; padding: 14px 0; text-align: center;  }
	.x .subm button { height: 22px; border: none; font-size: 11px; }
	.x .subm button.okay { border: 1px solid #e0e0d0; color: #000; background-color: #fff }

	.u .y .data { display: grid; grid-template-columns: 90px auto; padding: 20px; }
	.y .list { height: 100%; margin-top: 20px; overflow-y: scroll; max-height: 350px; margin-bottom: 20px; }
	.y .list .l { display: grid; grid-template-columns: 20px auto; border-left: 1px solid #e0e0da; }
	.y .list .bb { width: 20px; height: 20px; border-bottom: 1px solid #e0e0da; }
	.y .list .ii { padding: 8px 0; }
	.y .list .ii .ff { height: 40px; background-color: #fff; border: 1px solid #ebebe7; display: grid; grid-template-columns: 50px auto 20px; overflow: hidden }
	.y .list .ii .ff .c { display: flex; justify-content: left; align-items: center; font-size: 13px; font-weight: 600; padding: 4px; background-color: #fbfbf7; cursor: pointer; }
	.y .list .ii .ff .n { display: flex; justify-content: left; align-items: center; font-size: 11px; padding: 4px; background-color: #fff; }
	.y .list .ii .ff .e { display: flex; justify-content: center; align-items: center; background-color: #fbfbf7; cursor: pointer; }

	.y .code { display: grid; grid-template-columns: auto 20px; }
	.y .code .ii { height: 40px; margin-left: -100px; border: 1px solid #e0e0da; background-color: #fff; display: flex; justify-content: center; align-items: center; font-size: 16px; font-weight: bold; color: #444; }
	.y .code .bb { height: 20px; width: 20px; margin-top: 20px; border-top: 1px solid #e0e0da; }

	.y .subm { background-color: #fff; border-top: 1px solid #f8f8f2; padding: 14px 0; text-align: center;  }
	.y .subm button { height: 22px; border: 1px solid #e0e0d0; color: #000; background-color: #fff; font-size: 11px; }
</style>

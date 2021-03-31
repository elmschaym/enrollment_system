<template>
	<div class="wrap-t">
		<div class="p">
			<div class="h">
				<b v-if="faculty.hasOwnProperty('id')">{{ faculty.last_name }}, {{ faculty.first_name }}</b>
			</div>
			<div class="g">
				<div class="x">
					<div class="a">
						<b v-if="acadpref.hasOwnProperty('academic_calendar')">{{ acadpref.academic_calendar }} - {{ acadpref.academic_semester }} Semester</b> <span>{{ loadId == 0 ? 'Add Load' : 'Modify Load' }}</span>
					</div>
					<div class="b">
						<div class="f">
							<span>Unit Load: </span> <input v-model.number="unit_load" maxlength="2"/>
						</div>
						<div class="f">
							<button @click="addLoadSubmit()" :disabled="unit_load == 0 || isSavingLoad">{{ isSavingLoad ? 'Saving' : 'Submit' }}</button>
						</div>
					</div>
				</div>
				<div class="y">
					<fieldset>
						<legend>Load History</legend>
						<ul v-if="teachingLoads.length > 0">
							<li v-for="(t,i) in teachingLoads" :key="'tl_'+i">
								<v-icon name="square"></v-icon>
								<span>{{ t.acad_year }}, {{ t.semester }}</span>
								<b>{{ t.unit_load }}</b>
							</li>
							<ui-loader v-if="isFetchingLoad"></ui-loader>
						</ul>
						<ul v-else>
							<li>
								<div style="text-align: center">No Data</div>
							</li>
							<ui-loader v-if="isFetchingLoad"></ui-loader>
						</ul>
					</fieldset>
				</div>
			</div>
			<div v-if="!faculty.hasOwnProperty('id')" class="dsbd"></div>
		</div>
		<div class="q">
			<div class="t">
				<list-e-dep-faculty @setValue="setFaculty"></list-e-dep-faculty>
			</div>
		</div>        
	</div>
</template>

<script>
	import ListEDepFaculty from '@/components/ListEDepFaculty.vue';
	import UILoader from '@/components/UILoader.vue';

	export default {
		emits: ['setViewName'],
		components: {
			ListEDepFaculty,
			UiLoader: UILoader,
		},
		data() {
			return {
				isFetchingLoad: false,
				isSavingLoad: false,
				faculty: {},
				acadpref: { academic_calendar: '', academic_semester: '' },
				teachingLoads: [],
				unit_load: 0,
				loadId: 0
			}
		},
		methods: {
			setFaculty(v) {
				this.faculty = v;
				this.loadId = 0;
				this.unit_load = 0;
				this.fetchTeachingLoads();
			},
			fetchTeachingLoads() {
				this.isFetchingLoad = true;
				this.$http.get('teaching_load/?action=lister&refer=current-sem&facid='+ this.faculty.id).then(res => {
					this.teachingLoads = res.data;
				}).finally( () => {
					this.isFetchingLoad = false;
				});
			},
			fetchAcadPreference() {
				this.$http.get('academic_preference/').then(res => {
					this.acadpref = res.data;
				});
			},
			addLoadSubmit() {
				this.isSavingLoad = true;
				this.$http.post('teaching_load/?action=add-unit-load&refer=department', { faculty: this.faculty.id, unit_load: this.unit_load }).then(res => {
					this.fetchTeachingLoads();
				}).finally( () => {
					this.isSavingLoad = false;
				});
			}
		},
		mounted() {
			this.$emit('setViewName', this.$route.name);
			this.$store.commit('setModuleName', 'Department – Teaching Load');
			this.fetchAcadPreference();
		}
	}
</script>

<style scoped>
	.wrap-t { height: auto; display: grid; grid-template-columns: auto 300px; }
	.wrap-t .p { height: 100%; position: relative; background-color: #fff }
	.wrap-t .q { height: 100%; border-left: 1px solid #f0f0f0; background: #f8f8f0 }

	.p .h { height: 32px; padding: 10px 12px; border-bottom: 1px solid #f0f0ea; }
	.p .h b { font-weight: 600; font-size: 12px; color: #222; }

	.p .g { display: grid; grid-template-columns: auto 220px; }
	.p .g .x { padding: 16px 12px; }
	.p .g .x .a { border-bottom: 4px solid #f0f0ea; padding: 0 0 4px 0; margin: 5px 0 0 0; }
	.p .g .x .a b { font-weight: 600 }
	.p .g .x .a span { float: right; }
	.p .g .x .b { padding: 16px 0; }
	.p .g .x .b .f { padding-bottom: 10px }
	.p .g .x .b .f span { display: inline-block; padding-right: 8px; }
	.p .g .x .b .f input { height: 24px; border: none; font-size: 12px; padding: 4px 0; border-bottom: 1px solid #b0b0aa; color: #222; }
	.p .g .x .b .f button { background-color: #f0f0ea; color: #222; cursor: pointer; height: 24px; display: block; border: none; width: 100px; font-size: 11px; cursor: default; }
	.p .g .x .b .f button:disabled { background-color: #fbfbf7; color: #909090; }

	.p .g .y { padding: 16px 12px; }
	.p .g .y fieldset { border: 1px solid #f0f0ea; padding: 5px; }
	.p .g .y fieldset legend { padding: 5px; }
	.p .g .y fieldset ul { display: block; height: 300px; position: relative; }
	.p .g .y fieldset ul li { display: block; border-bottom: 1px solid #fbfbf7; padding: 5px 0; }
	.p .g .y fieldset ul li svg { width: 10px; height: 10px; color: #f0f0ea; }
	.p .g .y fieldset ul li span { font-size: 12px; color: #111; padding: 0 8px;}
	.p .g .y fieldset ul li b { font-size: 12px; font-weight: normal; float: right; }

	.q .t { height: 90%; padding: 12px; }

	.dsbd { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: #fff }
</style>

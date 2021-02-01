<template>
	<div class="_f">
		<div class="rslt">
			<div class="tabs">
				<div></div>
				<div>Department</div>
			</div>
			<div class="list" v-if="isFetchingList">
				<ui-loader></ui-loader>
			</div>
			<div class="list" v-else-if="departments.length > 0">
				<div :class="['l', {'active': selectedId == l.id}]" :key="l.id" v-for="l in departments" @click="setSelected(l)">
					<div class="i">
						<div style="text-align: center;"><v-icon name="square"></v-icon></div>
						<div style="font-size: 11px;">{{ l.name }} ({{ l.name_alias }})</div>
					</div>
				</div>
			</div>
			<div class="list" v-else>
			</div>
		</div>
	</div>
</template>

<script>
	import UILoader from './UILoader.vue';
	import UISelect from '@/components/UISelect.vue';

	import 'vue-awesome/icons/square';

	export default {
		emits: ['setValue'],
		components: {
			UiLoader: UILoader,
			UiSelect: UISelect
		},
		data() {
			return {
				isFetchingList: false,
				isErrorConnect: false,
				selectedId: 0,
				departments: [],
			}
		},
		methods: {
			fetchDepartments() {
				this.isFetchingList = true;
				this.$http.get('department/?action=lister').then(res => {
					this.departments = res.data;
				}).finally(() => {
					this.isFetchingList = false;
				});
			},
			setSelected(v) {
				this.selectedId = v.id;
				this.$emit('setValue', v);
			}
		},
		mounted() {
			this.fetchDepartments();
		}
	}
</script>

<style scoped>
	._f { height: inherit; background-color: #fff; box-shadow: 0 1px 1px rgba(0,0,0,0.24); display: grid; grid-template-rows: 26px auto 28px }

	.rslt { position: relative; }
	.head { font-size: 8px; text-transform: uppercase; padding: 4px 12px; background-color: #fafafa; }

	.tabs, .list .l .i { display: grid; grid-template-columns: 30px auto }
	.tabs { padding: 6px 0; font-size: 10px; color: #333; background-color: #fafaf9 }
	.list { height: inherit; min-height: 300px; overflow-y: scroll; }

	.list .l { border-bottom: 1px solid #f9f9f9; cursor: pointer; }
	.list .l:hover, .l.active { background-color: #f7f7f5; }
	.list .l .i { padding: 0; }
	.list .l .i div { color: #000; white-space: nowrap; text-overflow: clip; overflow-x: hidden; padding: 7px 0; }
	.list .l .i div svg { width: 10px; height: 10px; color: #e0e0e0; margin-bottom: 2px; }
	.list .l.active .b span{ background-color: #ececec; }
</style>

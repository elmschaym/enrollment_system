<template>
	<div class="wrap-c">
		<div class="cate-o">
			<div class="link">
				<ul>
					<li @click="goName('cou-master-list')" :class="viewName == 'cou-master-list' || viewName == 'cou-index' ? 'active' : ''"><div>Mater List</div></li>
					<li @click="goName('cou-assign-subj')" :class="viewName == 'cou-assign-subj' ? 'active' : ''"><div>Assign Subjects</div></li>
					<li @click="goName('cou-view-prospectus')" :class="viewName == 'cou-view-prospectus' ? 'active' : ''"><div>View Prospectus</div></li>
				</ul>
			</div>
			<div class="make">
				<span @click="goName('cou-create')"><v-icon name="plus"></v-icon> Create</span>
			</div>
		</div>
		<router-view @setViewName="setViewName"></router-view>
		<status-bar></status-bar>
	</div>
</template>

<script>
	import StatusBar from '@/components/StatusBar.vue';
	import 'vue-awesome/icons/plus';

	export default {
		components: {
			StatusBar
		},
		data() {
			return {
				viewName: 'cou-master-list'
			}
		},
		methods: {
			goName(name) {
				if( name != this.$route.name ) {
					this.viewName = name;
					this.$router.push({ name });
				}
			},
			setViewName(v) {
				this.viewName = v;
			}
		}
	}
</script>

<style scoped>
	.wrap-c { height: 100%; background-color: #fff; position: relative; display: grid; grid-template-rows: 32px auto 24px }

	.cate-o { background-color: #fbfbf7; height: 32px; display: grid; grid-template-columns: auto 300px; border-bottom: 1px solid #f0f0ea; }
	.link ul { display: block; padding: 0 4px; }
	.link ul li { display: inline-block; padding: 0  12px; }
	.link ul li div { font-size: 11px; padding: 10px 0; cursor: pointer; }
	.link ul li.active div { border-bottom: 1px solid #290e12; }

	.make { text-align: right; padding: 0 4px; }
	.make span { display: inline-block; font-size: 11px; padding: 10px 10px 9px 10px; border-left: 1px solid #f0f0ea; cursor: pointer;  }
	.make span svg { width: 10px; height: 10px; margin-right: 4px; }
</style>

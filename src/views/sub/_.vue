<template>
	<div class="wrap-f">
		<div class="head">
			<div class="cate-o">
				<div class="link">
					<ul>
						<li @click="goName('sub-assign-xreq')" :class="viewName == 'sub-index' || viewName == 'sub-assign-xreq'? 'active' : ''"><div>Assign Requisites</div></li>
						<li @click="goName('sub-student-eval')" :class="viewName == 'sub-student-eval' ? 'active' : ''"><div>Student Evaluation</div></li>
					</ul>
				</div>
				<div class="make">
					<span v-show="false" @click="goMake()">
						<v-icon name="plus"></v-icon> Create Invoice
					</span>
				</div>
			</div>
		</div>
		<div class="view">
			<router-view @setViewName="setViewName"></router-view>
		</div>
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
				viewName: 'sub-assign-xreq'
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
	.wrap-f { height: 100%; background-color: #fff; position: relative; display: grid; grid-template-rows: 32px auto 24px }
	.head {}
	.view {}

	.cate-o { background-color: #fbfbfb; height: 32px; border-bottom: 1px solid #eaeaea; }
	.link ul { display: block; padding: 0 4px; }
	.link ul li { display: inline-block; padding: 0 12px; }
	.link ul li div { font-size: 11px; padding: 10px 0; cursor: pointer; }
	.link ul li.active div { border-bottom: 1px solid #290e12; }

	.make { text-align: right; }
	.make span { display: inline-block; background-color: #fff; font-size: 11px; padding: 10px 10px 9px 10px; border-left: 1px solid #e9e9e9; cursor: pointer; }
	.make span svg { width: 12px; height: 12px; margin-bottom: -2px; }
</style>

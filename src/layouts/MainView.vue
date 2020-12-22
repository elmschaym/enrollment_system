<template>
	<div class="wrap-m" :style="wMain">
		<title-bar></title-bar>
		<div class="m">
			<div class="sidecon">
				<ul>
					<li :class="sconName == 'dbd-index' ? 'active' : ''"><span @click="goScon('dbd-index')"><v-icon name="bars"></v-icon></span></li>
					<li :class="sconName == 'not-index' ? 'active' : ''"><span @click="goScon('not-index')"><v-icon name="bell"></v-icon></span></li>
					<li :class="sconName == 'usr-index' ? 'active' : ''"><span @click="goScon('usr-index')"><v-icon name="user-circle"></v-icon></span></li>
					<li :class="sconName == 'set-index' ? 'active' : ''"><span @click="goScon('set-index')"><v-icon name="cog"></v-icon></span></li>
				</ul>
			</div>
			<div class="content">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
	import TitleBar from '@/components/TitleBar.vue';

	import 'vue-awesome/icons/th';
	import 'vue-awesome/icons/cog';
	import 'vue-awesome/icons/bars';
	import 'vue-awesome/icons/bell';
	import 'vue-awesome/icons/user-circle';

	export default {
		components: {
			TitleBar
		},
		data() {
			return {
				sconName: 'dbd-index'
			}
		},
		computed: {
			wMain() {
				let w = this.$store.state.appWidth,
					h = this.$store.state.appHeight;
				return 'height: '+ h;
			}
		},
		methods: {
			goScon(name) {
				this.sconName = name;
				this.$router.push({ name });
			}
		},
		mounted() {
			this.sconName = 'dbd-index';
		}
	}
</script>

<style scoped>
	.wrap-m { height: 100vh; background-color: #fff; box-sizing: border-box; border-radius: 5px 5px 0 0; box-shadow: 0 5px 11px rgba(0,0,0,0.4); }
			
	.m { display: grid; grid-template-columns: 28px auto; }
	.m .content { height: calc(100vh - 24px); width: 100%; overflow-y: hidden; }

	.m .sidecon { background-color: #00222E; border-right: 1px solid #101010; }
	.m .sidecon ul { padding: 20px 0; }
	.m .sidecon ul li { height: 36px; padding: 10px 5px; cursor: pointer; }
	.m .sidecon ul li span {}
	.m .sidecon ul li span svg { height: 16px; width: 16px; color: #f0f0f0; }
	.m .sidecon ul li.active { background-color: #243544; }
</style>

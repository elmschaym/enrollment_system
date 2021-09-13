<template>
	<div class="_w">
		<title-bar></title-bar>
		<div class="m">
			<div class="sidecon">
				<ul>
					<li :class="sconName == 'dbd-index' ? 'active' : ''"><span @click="goScon('dbd-index')"><v-icon name="th-large"></v-icon></span></li>
					<li :class="sconName == 'not-index' ? 'active' : ''"><span @click="goScon('not-index')"><v-icon name="bell"></v-icon></span></li>
					<li :class="sconName == 'usr-index' ? 'active' : ''"><span @click="goScon('usr-index')"><v-icon name="user-circle"></v-icon></span></li>
					<li :class="sconName == 'set-index' ? 'active' : ''"><span @click="goScon('set-index')"><v-icon name="cog"></v-icon></span></li>
				</ul>
			</div>
			<div class="content">
				<div class="c">
					<router-view></router-view>
				</div>
				<div class="s">
					<status-bar />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import TitleBar from '@/components/TitleBar.vue';
	import StatusBar from '@/components/StatusBar.vue';

	import 'vue-awesome/icons/th-large';
	import 'vue-awesome/icons/cog';
	import 'vue-awesome/icons/bell';
	import 'vue-awesome/icons/user-circle';


	export default {
		components: {
			TitleBar,
			StatusBar
		},
		data() {
			return {
				sconName: 'dbd-index',
			}
		},
		methods: {
			goScon(name) {
				this.sconName = name;
				this.$router.push({ name });
			}
		},
		mounted() {
			this.sconName = this.$route.name;
		}
	}
</script>

<style scoped>
	._w { height: 100vh; background: #fff; box-sizing: border-box; border-radius: 5px; }
		
	.m { display: grid; grid-template-columns: 28px auto; }
	.m .content .c { height: calc(100vh - 48px); width: 100%; }

	.m .sidecon { background-color: #555753; border-right: 1px solid #101010; }
	.m .sidecon ul { padding: 24px 0; }
	.m .sidecon ul li { height: 36px; padding: 10px 6px; cursor: pointer; }
	.m .sidecon ul li span {}
	.m .sidecon ul li span svg { height: 16px; width: 16px; color: #f0f0f0; }
	.m .sidecon ul li.active { background-color: #2E3436; }

	.m .content .c { overflow-y: hidden; }
	.m .content .s {}
</style>

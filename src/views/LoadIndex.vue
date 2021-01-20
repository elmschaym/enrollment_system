<template>
	<div class="load-i">
		<div class="name">
			<div :class="['icon', { 'animate': isAnimate }]">
				<b class="a">☄</b>
				<b class="b">☄</b>
				<b class="c">☄</b>
			</div>
			<span v-if="isShowName">sysuno v1.0-alpha</span>
		</div>
		<div class="stat" v-if="isLoading">
			<span><b></b></span>
		</div>
	</div>
</template>

<script>
	//import 'vue-awesome/icons/microchip';

	export default {
		data() {
			return {
				isLoading: false,
				isAnimate: false,
				isShowName: false
			}
		},
		methods: {
			initializeSetup() {
				this.isLoading = true;
				this.$sleep(4000).then(() => {
					this.$router.push({ name: 'usr-signin', query: { set_dimen: 1 } });
				});
			}
		},
		mounted() {
			this.$sleep(500).then(() => this.isShowName = true );
			this.$sleep(1000).then(() => this.isAnimate = true );
			this.$sleep(4000).then(this.initializeSetup);
		},
		destroyed() {
			window.nwWin.hide();
		}
	}
</script>

<style scoped>
	.load-i { background-color: #fff; width: 300px; height: 300px; overflow: hidden; display: grid; grid-template-rows: 268px 32px }

	.name { position: relative; display: grid; grid-template-rows: auto 18px }

	.name .icon { position: relative; }
	.name .icon b {  display: block; position: absolute; font-weight: normal; transition: all 3s ease; }

	.name .icon b.a { font-size: 128px; bottom: 100%; left: 220px; color: #111; }
	.name .icon b.b { font-size: 96px; bottom: 100%; left: 180px; color: #505050; }
	.name .icon b.c { font-size: 72px; bottom: 100%; left: 300px; color: #909090; }

	.name .icon.animate b.a { bottom: 22px; left: 70px; }
	.name .icon.animate b.b { bottom: 114px; left: 70px; }
	.name .icon.animate b.c { bottom: 58px; left: 170px; }

	.name svg { height: 128px; width: 128px; display: block; margin: 0 auto; position: absolute; background: -webkit-linear-gradient(to bottom, #478ba2, #de5b6d); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
	.name span { font-size: 18px; font-weight: 100; color: #111; display: block; text-shadow: 0 2px 2px rgba(0,0,0,0.2); position: absolute; top: 238px; text-align: center; width: 100%; }

	.stat {}
	.stat span {  display: block;  margin: 0 auto; position: relative; background-color: transparent; height: 2px; width: 32px; overflow-x: hidden; }
	.stat span b { background-color: #707070; height: 2px; top: 0;  width: 16px; display: block; position: absolute; -webkit-animation-name: loaderer;  -webkit-animation-duration: 800ms;  -webkit-animation-iteration-count: infinite;  -webkit-animation-direction: forward; }
	@-webkit-keyframes loaderer { from { left: 100% } to { left: -16px; } }
</style>

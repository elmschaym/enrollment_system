<template>
	<div class="load-i">
		<div class="name">
			<div :class="['icon', { 'animate': isAnimate }]">
				<b class="a"></b>
				<b class="b"></b>
				<b class="c"></b>
			</div>
			<span>{{ APP_NAME }} {{ APP_VERSION }}</span>
		</div>
		<div class="stat" v-if="isLoading">
			<span><b></b></span>
		</div>
	</div>
</template>

<script>
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
					window.nwWin.hide();
					this.$router.push({ name: 'usr-signin', query: { set_dimen: 1 } });
				});
			}
		},
		mounted() {
			this.$sleep(500).then(() => this.isShowName = true );
			this.$sleep(1000).then(() => this.isAnimate = true );
			this.$sleep(4000).then(this.initializeSetup);
		}
	}
</script>

<style scoped>
	.load-i { background-color: #fff; width: 300px; height: 300px; overflow: hidden; display: grid; grid-template-rows: 268px 32px }

	.name { position: relative; display: grid; grid-template-rows: auto 18px }

	.name .icon { position: relative; }
	.name .icon b {  display: block; position: absolute; height: 0; transform: rotate(-60deg); transition: all 3s ease-in; }

	.name .icon b.a { width: 160px; border-left: 60px solid transparent; border-right: 60px solid transparent;  border-bottom: 20px solid #202020; bottom: calc(100% + 80px); left: 194px; }
	.name .icon b.b { width: 138px; border-left: 50px solid transparent; border-right: 60px solid transparent; border-bottom: 14px solid #505050; bottom: calc(100% + 60px); left: 144px;  }
	.name .icon b.c { width: 120px; border-left: 40px solid transparent; border-right: 50px solid transparent; border-bottom: 8px solid #909090; bottom: calc(100% + 50px); left: 264px; color: #909090; }

	.name .icon.animate b.a { bottom: 90px; left: 65px; }
	.name .icon.animate b.b { bottom: 130px; left: 40px; }
	.name .icon.animate b.c { bottom: 100px; left: 150px; }

	.name svg { height: 128px; width: 128px; display: block; margin: 0 auto; position: absolute; background: -webkit-linear-gradient(to bottom, #478ba2, #de5b6d); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
	.name span { font-size: 18px; font-weight: 100; color: #111; display: block; text-shadow: 0 2px 2px rgba(0,0,0,0.2); position: absolute; top: 238px; text-align: center; width: 100%; }

	.stat {}
	.stat span {  display: block;  margin: 0 auto; position: relative; background-color: transparent; height: 2px; width: 32px; overflow-x: hidden; }
	.stat span b { background-color: #707070; height: 2px; top: 0;  width: 16px; display: block; position: absolute; -webkit-animation-name: loaderer;  -webkit-animation-duration: 800ms;  -webkit-animation-iteration-count: infinite;  -webkit-animation-direction: forward; }
	@-webkit-keyframes loaderer { from { left: 100% } to { left: -16px; } }
</style>

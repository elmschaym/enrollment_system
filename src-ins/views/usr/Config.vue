<template>
	<div class="__cfg">
		<div class="p">
			<div class="h" @click="$router.push({ name: 'usr-signin' })">
				<v-icon name="angle-left"></v-icon>
				<span>Go Back</span>
			</div>
			<ul>
				<li>
					<div>API Setup</div>
				</li>
			</ul>
		</div>
		<div class="q">
			<div class="h">System Configuration</div>
			<div class="g">
				<div class="s">
					<div><label>API Protocol</label></div>
					<div>
						<input type="radio" v-model="API.protocol" value="1"/> HTTP
						<input type="radio" v-model="API.protocol" value="2"/> HTTPS
					</div>
				</div>
				<div class="s">
					<div><label>API Server</label></div>
					<div>
						<input type="text" v-model="API.server" :placeholder="(API.protocol == 1 ? 'http' : 'https') +'://'"/>
					</div>
				</div>
				<div class="s">
					<div></div>
					<div>
						<button v-if="!isSavingConfig" @click="saveConfig()">Save Config</button>
						<button v-else><v-icon name="spinner" :spin="true"></v-icon></button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import 'vue-awesome/icons/angle-left';
	import 'vue-awesome/icons/spinner';

	export default {
		data() {
			return {
				isSavingConfig: false,
				API: { protocol: 2, server: '' }
			}
		},
		methods: {
			saveConfig() {
				this.isSavingConfig = true;
				this.$sleep(1000).then(() => {
					this.$storageSet("api_config", this.API, 'local');
					this.$http.defaults.baseURL = this.API.server;
					this.isSavingConfig = false;
				});
			}
		},
		mounted() {
			let api_config = this.$storageGet("api_config", 'local');
			this.API.server = api_config.server;
		}
	}
</script>

<style scoped>
	.__cfg { height: 100%; display: grid; grid-template-columns: 170px auto }
	.__cfg .p { height: inherit; background-color: #fbfbf7; border-right: 1px solid #f0f0ea; }
	.__cfg .q {}

	.p .h { padding: 7px 6px; }
	.p .h svg { width: 12px; height: 12px; margin: 0 6px -1px 0; }
	.p ul { display: block; padding: 32px 0; }
	.p ul li { text-indent: 16px }
	.p ul li div { padding: 7px; border-bottom: 1px solid #f0f0ea; }

	.q .h { padding: 8px 6px; text-align: center; color: #000; font-size: 12px; font-weight: 600; border-bottom: 1px solid #fbfbf7; -webkit-app-region: drag; }
	.q .g { padding: 32px;  }
	.q .g div.s { padding-bottom: 16px; display: grid; grid-template-columns: 170px auto; }
	.q .g div.s label {}
	.q .g div.s input[type=radio] {}
	.q .g div.s input[type=text] { width: 50%; font-size: 11px; border: 1px solid #c0c0ba; background-color: #fff; color: #111; height: 24px; padding: 4px 8px; }
	.q .g div.s button { font-size: 11px; border: 1px solid #c0c0ba; background-color: #fbfbf7; color: #111; padding: 5px 12px; width: 100px; }
	.q .g div.s button svg { width: 10px; height: 10px; }
</style>
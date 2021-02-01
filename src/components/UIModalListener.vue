<template>
	<div :class="['_com_uml', hasBG ? 'has-bg' : '']">
		<div class="moda">
			<div class="text">
				<slot name="text">Are you sure you want to continue?</slot>
			</div>
			<div class="cide">
				<div class="y" @click="hasListen()">
					{{ listenLabel }}
				</div>
				<div class="b">
				</div>
				<div class="n" @click="hasClosed()">
					&times;
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import 'vue-awesome/icons/times';

	export default {
		emits: ['modalClose', 'listenedYes'],
		props: {
			listenLabel: {
				type: String,
				default: function() {
					return 'OK';
				}
			},
			hasBG: {
				type: Boolean,
				default: function() {
					return true;
				}
			}
		},
		data() {
			return {
			}
		},
		methods: {
			hasClosed() {
				this.$emit('modalClose', true);
			},
			hasListen() {
				this.$emit('listenedYes', true);
			}
		}
	}
</script>

<style scoped>
	._com_uml { position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; justify-content: center; align-items: center; }
	._com_uml.has-bg { background-color: rgba(255,255,255,0.95); }

	.moda { width: 280px; height: auto; background-color: #fff; box-shadow: 0 6px 14px rgba(0,0,0,0.2); z-index: 9999; }

	.text { height: 140px; display: flex; justify-content: center; align-items: center; padding: 12px; text-align: center; line-height: 17px; font-size: 12px; }

	.cide { height: 30px; display: grid; grid-template-columns: auto 1px 30px; border-top: 1px solid #f0f0ea; }
	.cide > div { height: 100%; display: flex; justify-content: center; align-items: center; font-weight: 600; font-size: 11px; background-color: #fbfbf7 }
	.cide > div:hover { background-color: #f0f0ea }
	.cide .n {}
	.cide .b { background-color: #f0f0ea; }
	.cide .y {  }
</style>

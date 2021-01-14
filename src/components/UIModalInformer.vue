<template>
	<div :class="['wrap-m', hasBG ? 'has-bg' : '']">
		<div class="moda">
			<div class="body">
				<div class="text">
					<slot name="text"></slot>
				</div>
				<div class="okay">
					<span @click="hasOkayed()">{{ informLabel }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import 'vue-awesome/icons/times';

	export default {
		emits: ['informedOkay'],
		props: {
            informLabel: {
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
		methods: {
			hasOkayed() {
				this.$emit('informedOkay', true);
			}
		}
	}
</script>

<style scoped>
	.wrap-m { position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; justify-content: center; align-items: center; z-index: 9998; }
	.wrap-m.has-bg { background-color: rgba(255,255,255,0.95); }

	.moda { width: 280px; background-color: #fff; box-shadow: 0 6px 14px rgba(0,0,0,0.2); z-index: 9999; }
	.head { display: grid; grid-template-columns: 24px auto; background: #f5f5f0; border-bottom: 1px solid #f0f0f0; height: 24px; }
	.head .icon { display: block; width: 24px; height: 24px; cursor: pointer; padding: 5px 5px; }
	.head .icon span { display: block; font-size: 10px; color: #444; }
	.head .icon span svg { width: 11px; height: 11px }
	.head .name { padding: 6px; text-align: center; }
	.head .name span { margin-right: 24px; font-size: 11px }

	.body { position: relative; background-color: #fff; }
	.body .text { height: 140px; display: flex; justify-content: center; align-items: center; padding: 12px; text-align: center; line-height: 17px; font-size: 12px; }

	.body .okay { height: 30px; border-top: 1px solid #f0f0ea; }
	.body .okay span { height: inherit; display: flex; justify-content: center; align-items: center; font-weight: 600; font-size: 11px; background-color: #fbfbf7 }
	.body .okay span:hover { background-color: #f0f0ea }
</style>

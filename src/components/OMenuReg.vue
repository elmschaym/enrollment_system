<template>
	<div class="_cmp_omr">
		<div class="menu-box">
			<div class="menu-name">{{ menuName }}</div>
			<div class="menu-menu" v-if="menus.length > 0" :style="'grid-template-columns: repeat('+ menus.length +', 140px);'">
				<div class="menu-menu-m" v-for="(m,i) in menus" :key="'cmp_omr_'+ i" @click="goLink(m.link)">
					<div>
						<v-icon :name="m.icon"></v-icon>
						<span>{{ m.name }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import 'vue-awesome/icons/square';
	import 'vue-awesome/icons/id-card';
	import 'vue-awesome/icons/book';
	import 'vue-awesome/icons/book-reader';
	import 'vue-awesome/icons/address-book';
	import 'vue-awesome/icons/clone';
	import 'vue-awesome/icons/industry';
	import 'vue-awesome/icons/map-signs';
	import 'vue-awesome/icons/map';
	import 'vue-awesome/icons/crop';
	import 'vue-awesome/icons/braille';
	import 'vue-awesome/icons/users';
	import 'vue-awesome/icons/suitcase';
	import 'vue-awesome/icons/columns';
	import 'vue-awesome/icons/sticky-note';

	export default {
		emits: ['menuClose'],
		props: {
			menus: {
				type: Array,
				required: true,
				default: function() {
					return [];
				}
			},
			menuName: {
				type: String,
				required: false,
				default: function() {
					return '';
				}
			}
		},
		methods: {
			goLink(link) {
				this.$emit('menuClose');
				this.$router.push({ name: link });
			}
		}
	}
</script>

<style scoped>
	._cmp_omr { position: absolute; top: 0; left: 0; right: 0; bottom: 48px; display: flex; justify-content: center; align-items: center; background-color: rgba(255,255,255,0.95); z-index: 10000; }

	._cmp_omr .menu-box { width: auto; height: auto; }
	._cmp_omr .menu-box .menu-name { font-size: 12px; text-align: center; padding: 5px 0; border-bottom: 1px solid #f0f0ea; iborder-top: 1px solid #f0f0ea; margin-bottom: 10px; }
	._cmp_omr .menu-box .menu-menu { display: grid; }
	._cmp_omr .menu-box .menu-menu .menu-menu-m { padding: 0 8px; }
	._cmp_omr .menu-box .menu-menu .menu-menu-m div { text-align: center; padding: 5px;box-shadow: 0 1px 1px rgba(0,0,0,0.24); border-top: 1px solid #f8f8f2; }
	._cmp_omr .menu-box .menu-menu .menu-menu-m div svg { height: 48px; width: 48px; color: #808080; }
	._cmp_omr .menu-box .menu-menu .menu-menu-m div span { display: block; font-size: 12px; color: #222; text-align: center; padding: 10px 0 0 0; }
	._cmp_omr .menu-box .menu-menu .menu-menu-m div:hover svg { color: #404040; }
</style>

<template>
	<div class="sidecon">
		<ul class="a">
			<li v-for="(m,i) in menus" :key="'menu_'+ i">
				<div class="l">
					<v-icon :name="m.icon"></v-icon>
					<div class="m">
						<div class="h">{{ m.name }}</div>
						<div class="g">
							<div v-for="(u,j) in m.menu" :key="m.icon +'_'+j" @click="$router.push({ name: u.link })">
								<v-icon :name="u.icon"></v-icon>
								<span>{{ u.name }}</span>
							</div>
						</div>
					</div>
				</div>
			</li>
		</ul>
		<ul class="b"></ul>
		<ul class="c">
			<li :class="sconName == 'dep-index' ? 'active' : ''">
				<div class="l" @click="goScon(dashboard)"><v-icon name="th-large"></v-icon></div>
			</li>
			<li :class="sconName == 'set-index' ? 'active' : ''">
				<div class="l" @click="goScon('dep-index')"><v-icon name="cog"></v-icon></div>
			</li>
		</ul>
	</div>
</template>

<script>
	import 'vue-awesome/icons/th-large';
	import 'vue-awesome/icons/cog';
	import 'vue-awesome/icons/bell';
	import 'vue-awesome/icons/user-circle';
	import 'vue-awesome/icons/wrench';
	import 'vue-awesome/icons/file';
	import 'vue-awesome/icons/list-ul';
	import 'vue-awesome/icons/clipboard';
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
	import 'vue-awesome/icons/anchor';
	import 'vue-awesome/icons/eraser';
	import 'vue-awesome/icons/sitemap';

	export default {
		props: {
			dashboard: {
				type: String,
				required: false,
				default: function() {
					return 'dep-index';
				}
			}
		},
		data() {
			return {
				sconName: 'dep-index',
				menus: [
					{ name: 'Create Instance', icon: 'file', menu: [
						{ name: 'Enrollee', icon: 'address-book', link: 'dep-create-enrollee' },
						{ name: 'Room', icon: 'columns', link: 'dep-create-room' },
						{ name: 'Section', icon: 'crop', link: 'dep-create-section' }
						]
					},
					{ name: 'Lister', icon: 'list-ul', menu: [
						{ name: 'Enrollees', icon: 'id-card', link: 'dep-list-enrollees' },
						{ name: 'Faculties', icon: 'users', link: 'dep-list-faculties' }
						]
					},
					{ name: 'Assign', icon: 'clipboard', menu: [
						{ name: 'Student Subjects', icon: 'sitemap', link: 'dep-assign-set-subject' },
						{ name: 'Teaching Load', icon: 'anchor', link: 'dep-assign-teaching-load' },
						{ name: 'Enter Grades', icon: 'eraser', link: 'dep-assign-enter-grades' }
						]
					}
				]
			}
		},
		methods: {
			goScon(name) {
				this.sconName = name;
				this.$router.push({ name });
			}
		},
		created() {
		},
		mounted() {
			this.sconName = 'dep-index';
		}
	}
</script>

<style scoped>
	.sidecon { height: inherit; background-color: #555753; border-right: 1px solid #2E3436; display: grid; grid-template-rows: 200px auto 124px }
	.sidecon ul { padding: 24px 0; }
	.sidecon ul li { height: 36px; cursor: pointer; }
	.sidecon ul li div.l { display: block; text-align: center; position: relative; padding: 10px 0; }

	.sidecon ul li div.l > svg { height: 16px; width: 16px; color: #f0f0f0 }
	.sidecon ul li div.l div.m { position: absolute; z-index: 9999; height: 140px; top: 0; width: 200px; background-color: #2E3436; display: none; text-align: center; font-style: normal; }
	.sidecon ul li div.l div.m .h { font-size: 12px; text-align: center; padding: 4px 0; color: #e0e0e0; border-bottom: 1px solid #555753; }
	.sidecon ul li div.l div.m .g { display: flex; flex-wrap: wrap; justify-content: space-between; }
	.sidecon ul li div.l div.m .g > div { width: 100px; padding: 5px; }
	.sidecon ul li div.l div.m .g > div svg { width: 32px; height: 32px; color: #f0f0f0; }
	.sidecon ul li div.l div.m .g > div span { font-size: 11px; display: block; color: #e0e0e0; padding-top: 2px; }

	.sidecon ul li div.l:hover div.m { left: 100%; display: block; transition: left 250ms ease-in-out; }
	.sidecon ul li.active, .sidecon ul li:hover { background-color: #2E3436; }
	.sidecon ul li.active svg { color: #fff; }
</style>

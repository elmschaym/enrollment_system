<template>
    <div class="sidecon">
        <ul v-if="!isDashBoard" class="a">
            <li v-for="(m,i) in menus" :key="'menu_'+ i">
                <div :class="['l', sconName == m.link ? 'active' : '']" @click="goScon(m.link)" :title="m.name">
                    <v-icon :name="m.icon"></v-icon>
                </div>
            </li>
        </ul>
        <ul v-else class="a"></ul>
        <ul class="b"></ul>
        <ul class="c">
            <li>
                <div :class="['l', sconName == 'dbd-index' ? 'active' : '']" @click="goScon('dbd-index')"><v-icon name="th-large"></v-icon></div>
            </li>
            <li :class="sconName == 'set-index' ? 'active' : ''">
                <div class="l" @click="goScon('adm-index')"><v-icon name="cog"></v-icon></div>
            </li>
        </ul>
    </div>
</template>

<script>
    import 'vue-awesome/icons/th-large';
    import 'vue-awesome/icons/cog';
    import 'vue-awesome/icons/bell';
    import 'vue-awesome/icons/user-circle';
    import 'vue-awesome/icons/print';
    import 'vue-awesome/icons/book';
    import 'vue-awesome/icons/map';
    import 'vue-awesome/icons/address-book';
    import 'vue-awesome/icons/list-ul';
    import 'vue-awesome/icons/book-reader';
    import 'vue-awesome/icons/info';
    
    export default {
        data() {
            return {
                sconName: 'dbd-index',
                menus: [
                    { name: 'Enter Student', icon: 'address-book', link: 'enter-student' },
                    { name: 'List Student', icon: 'book', link: 'list-student' },
                    { name: 'Build Subject', icon: 'map', link: 'build-subject' },
                    { name: 'Print Record', icon: 'print', link: 'print-record' },
                    { name: 'Create Course', icon: 'book-reader', link: 'create-course' },
                    { name: 'List Course', icon: 'list-ul', link: 'list-course' },
                    { name: 'Transcript Details', icon: 'info', link: 'transcript-details' }
                ]
            }
        },
        computed: {
            isDashBoard() {
                return this.$route.name == 'dbd-index';
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
    .sidecon { height: inherit; background-color: #454743; border-right: 1px solid #2E3436; display: grid; grid-template-rows: 200px auto 124px }
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
    .sidecon ul li div.l.active, .sidecon ul li div.l:hover { background-color: #2E3436; }
    .sidecon ul li.active svg { color: #fff; }
</style>

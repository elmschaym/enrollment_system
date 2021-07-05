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
            <li :class="sconName == 'adm-index' ? 'active' : ''">
                <div class="l" @click="goScon(dashboard)"><v-icon name="th-large"></v-icon></div>
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
                    return 'adm-index';
                }
            }
        },
        data() {
            return {
                sconName: 'adm-index',
                menus: [
                    { name: 'Create Instance', icon: 'file', menu: [
                        { name: 'Admittee', icon: 'id-card', link: 'adm-create-admittee' },
                        { name: 'Student', icon: 'address-book', link: 'adm-create-student' },
                        { name: 'Subject', icon: 'book', link: 'adm-create-subject' },
                        { name: 'Course', icon: 'book-reader', link: 'adm-create-course' }
                        ]
                    },
                    { name: 'Lister', icon: 'list-ul', menu: [
                        { name: 'Students', icon: 'address-book', link: 'adm-list-stu-master' },
                        { name: 'Admittees', icon: 'id-card', link: 'adm-list-adm-master' },
                        { name: 'Courses', icon: 'book-reader', link: 'adm-list-cou-master' }
                        ]
                    },
                    { name: 'Assign', icon: 'clipboard', menu: [
                        { name: 'Subject Reqsts', icon: 'map-signs', link: 'adm-assign-sub-xreq' },
                        { name: 'Course Prog.', icon: 'map', link: 'adm-assign-cou-subj' }
                        ]
                    },
                    { name: 'Tools', icon: 'wrench', menu: [
                        { name: 'Gen Prospectus', icon: 'clone', link: 'adm-tool-view-prospectus' },
                        { name: 'COR', icon: 'suitcase', link: 'adm-tool-confirm-registration' },
                        { name: 'Grade Slip', icon: 'sticky-note', link: 'adm-tool-grade-slip' },
                        { name: 'Student Evaluate', icon: 'industry', link: 'adm-tool-student-evaluation' }
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
            this.sconName = 'adm-index';
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

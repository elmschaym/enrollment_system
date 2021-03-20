<template>
    <div class="sidecon">
        <ul class="a">
            <li>
                <div class="l">
                    <v-icon name="file"></v-icon>
                    <div class="m">
                        <div class="h">Create</div>
                        <div class="g">
                            <div v-for="(m,i) in menus.create" :key="'create_'+i" @click="$router.push({ name: m.link })">
                                <v-icon :name="m.icon"></v-icon>
                                <span>{{ m.name }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="l">
                    <v-icon name="list-ul"></v-icon>
                    <div class="m">
                        <div class="h">Lister</div>
                        <div class="g">
                            
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="l">
                    <v-icon name="clipboard"></v-icon>
                    <div class="m">
                        <div class="h">Assign</div>
                        <div class="g">
                            
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="l">
                    <v-icon name="wrench"></v-icon>
                    <div class="m">
                        <div class="h">Tools</div>
                        <div class="g">
                            
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <ul class="b"></ul>
        <ul class="c">
            <li :class="sconName == 'dbd-index' ? 'active' : ''">
                <div class="l" @click="goScon(dashboard)"><v-icon name="th-large"></v-icon></div>
            </li>
            <li :class="sconName == 'set-index' ? 'active' : ''">
                <div class="l" @click="goScon('set-index')"><v-icon name="cog"></v-icon></div>
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

    export default {
        props: {
            dashboard: {
                type: String,
                required: false,
                default: function() {
                    return 'load-index';
                }
            }
        },
        data() {
            return {
                sconName: 'adm-index',
                menus: {
                    create: [
                        { name: 'Admittee', icon: 'id-card', link: 'adm-create-admittee' },
                        { name: 'Subject', icon: 'book', link: 'adm-create-subject' },
                        { name: 'Course', icon: 'book-reader', link: 'adm-create-course' },
                        { name: 'Student', icon: 'address-book', link: 'adm-create-student' },
                    ],
                    lister: [
                        { name: 'Students', icon: 'address-book', link: 'adm-list-stu-master' },
                        { name: 'Admittees', icon: 'id-card', link: 'adm-list-adm-master' },
                        { name: 'Courses', icon: 'book-reader', link: 'adm-list-cou-master' }
                    ],
                    assign: [
                        { name: 'Subject Requisites', icon: 'map-signs', link: 'adm-assign-sub-xreq' },
                        { name: 'Course Programme', icon: 'map', link: 'adm-assign-cou-subj' }
                    ],
                    tools: [
                        { name: 'Generate Prospectus', icon: 'clone', link: 'adm-tool-view-prospectus' },
                        { name: 'COR', icon: 'suitcase', link: 'adm-tool-confirm-registration' },
                        { name: 'Grade Slip', icon: 'sticky-note', link: 'adm-tool-grade-slip' },
                        { name: 'Student Evaluation', icon: 'industry', link: 'adm-tool-student-evaluation' }
                    ]
                }
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

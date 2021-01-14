<template>
    <div class="tool-b">
        <div class="w">
            <div class="x">
                <ul>
                    <li>
                        <div class="l">
                            <div class="n" @click="goLink('dbd-index')">Dashboard</div>
                        </div>
                     </li>
                    <li>
                        <div class="l">
                            <div class="n" @click="toMenu('adm')">Admission</div>
                            <div class="m" v-show="subm.adm">
                                <div class="o" @click="goLink('adm-new-admittee', 'adm')">New Admittee <span>Ctrl+Alt+A</span></div>
                                <div class="o h" @click="goLink('adm-new-student', 'adm')">New Student &nbsp; &nbsp;<span>Ctrl+Alt+S</span></div>
                                <div class="o" @click="goLink('adm-list-stu-master', 'adm')">Students List</div>
                                <div class="o" @click="goLink('adm-list-adm-master', 'adm')">Admittee List</div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="l">
                            <div class="n" @click="toMenu('dep')">Department</div>
                            <div class="m" v-show="subm.dep">
                                <div class="o" @click="goLink('dep-set-subject', 'dep')">Enrol Subject <span>Ctrl+Alt+R</span></div>
                                <div class="o" @click="goLink('dep-sec-new-section', 'dep')">New Section &nbsp;<span>Ctrl+Alt+C</span></div>
                                <div class="o h" @click="goLink('dep-enr-new-enrollee', 'dep')">New Enrollee <span>Ctrl+Alt+E</span></div>
                                <div class="o" @click="goLink('dep-enr-master-list', 'dep')">Enrollee List</div>
                                <div class="o" @click="goLink('dep-fac-master-list', 'dep')">Instructors</div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="l">
                            <div class="n" @click="toMenu('fin')">Billings</div>
                            <div class="m" v-show="subm.fin">
                                <div class="o" @click="goLink('fin-index', 'fin')">Enrollment Billing</div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="l">
                            <div class="n" @click="goLink('sub-index', 'sub')">Subjects</div>
                        </div>
                    </li>
                    <li>
                        <div class="l">
                            <div class="n" @click="goLink('cou-index', 'cou')">Courses</div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="y">
                <ul>
                    <li>
                        <div class="l">
                            <div class="n" style="color: #9b9b97" @click="isModalShow = !isModalShow">sysuno 1.0-a</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <ui-modal-informer v-if="isModalShow" @informedOkay="modalClose" :hasBG="false" class="moda-l">
            <div slot="text">
                <div class="nn">sysuno v0.1-alpha</div>
                <div class="ii">Management System</div>
                <div class="ss"><v-icon name="code"></v-icon> with <v-icon name="heart"></v-icon></div>
            </div>
        </ui-modal-informer>
    </div>
</template>

<script>
    import UIModalInformer from './UIModalInformer.vue';

    import 'vue-awesome/icons/bars';
    import 'vue-awesome/icons/minus';
    import 'vue-awesome/icons/code';
    import 'vue-awesome/icons/heart';

    export default {
        components: {
            UiModalInformer: UIModalInformer
        },
        data() {
            return {
                user: { name: 'Paul', role: 'Administrator' },
                subm: { adm: false, stu: false, dep: false, fin: false, sub: false, cou: false },
                bars: false,
                isModalShow: false
            }
        },
        methods: {
            endSession() {
                window.localStorage.removeItem('api_token');
                this.$sleep(500).then(() => {
                    this.$router.push('/');
                });
            },
            goLink(name, view) {
                this.subm[view] = false;
                this.$router.push({ name: name });
            },
            toMenu(name) {
                let d = { adm: false, stu: false, dep: false, fin: false, sub: false, cou: false };
                d[name] = !this.subm[name];
                this.subm = d;
            },
            modalClose(v) {
                this.isModalShow = false;
            }
        }
    }
</script>

<style scoped>
    .tool-b {}

    .tool-b .w { height: 24px; background-color: #f8f8f2; display: grid; grid-template-columns: auto 200px; border-bottom: 1px solid #EEEEEC; }
    .w .x {}
    ul { display: block; list-style-type: none }
    ul li { display: inline-block;  }
    ul li .l { position: relative; }
    ul li .l .n { font-size: 11px; color: #222; padding: 6px 8px; }
    ul li .l .n:hover { color: #444; }

    ul li .l .m { padding: 5px 0; position: absolute; top: 100%; width: auto; height: auto; background-color: #fff; z-index: 9999; box-shadow: 0 1px 3px rgba(0,0,0,0.24); }
    ul li .l .m .o { font-size: 11px; color: #222; padding: 5px 16px; white-space: nowrap;  }
    ul li .l .m .o.h { border-bottom: 1px solid #efefea; }
    ul li .l .m .o span { margin-left: 40px; color: #7e7e7a; display: inline-block; text-align: right; }
    ul li .l .m .o:hover { background-color: #315BEF; color: #fff; }
    ul li .l .m .o:hover span { color: #fff; }

    .w .y { text-align: right; }

    .moda-l {}
    .moda-l .nn { padding: 12px 0 2px 0; text-align: center; font-size: 14px; font-weight: 600; color: #222; }
    .moda-l .ii { font-size: 10px; color: #333; text-align: center }
    .moda-l .ss { padding: 10px 0; font-size: 10px; text-align: center; color: #555; }
    .moda-l .ss svg { width: 12px; height: 12px; margin: 0 2px -2px 2px; }
</style>

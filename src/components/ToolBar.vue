<template>
    <div class="tool-b">
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
                            <div class="o h" @click="goLink('adm-new-admittee', 'adm')">New Admittee <span>Ctrl+Alt+A</span></div>
                            <div class="o" @click="goLink('adm-list-adm-master', 'adm')">Master List</div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="l">
                        <div class="n" @click="toMenu('stu')">Students</div>
                        <div class="m" v-show="subm.stu">
                            <div class="o h" @click="goLink('adm-new-student', 'stu')">New Student <span>Ctrl+Alt+S</span></div>
                            <div class="o" @click="goLink('adm-list-stu-master', 'stu')">Master List</div>
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
                        <div class="n" @click="toMenu('fin')">Finances</div>
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
                        <div class="n" @click="goLink('cou-index', 'cou')">Help</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import 'vue-awesome/icons/bars';
    import 'vue-awesome/icons/minus';

    export default {
        data() {
            return {
                user: { name: 'Paul', role: 'Administrator' },
                subm: { adm: false, stu: false, dep: false, fin: false, sub: false, cou: false },
                bars: false
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
            }
        }
    }
</script>

<style scoped>
    .tool-b { height: 24px; background-color: #f8f8f2; display: grid; grid-template-columns: auto 200px; border-bottom: 1px solid #EEEEEC; }

    .tool-b .x {}
    ul { display: block; list-style-type: none }
    ul li { display: inline-block;  }
    ul li .l { position: relative; }
    ul li .l .n { font-size: 11px; color: #222; padding: 6px 8px; }
    ul li .l .n:hover { color: #444; }

    ul li .l .m { padding: 5px 0; position: absolute; top: 100%; width: auto; height: auto; background-color: #fff; z-index: 9999; box-shadow: 0 4px 9px rgba(0,0,0,0.24); }
    ul li .l .m .o { font-size: 11px; color: #222; padding: 5px 16px; white-space: nowrap;  }
    ul li .l .m .o.h { border-bottom: 1px solid #efefea; }
    ul li .l .m .o span { margin-left: 40px; color: #7e7e7a; display: inline-block; text-align: right; }
    ul li .l .m .o:hover { background-color: #315BEF; color: #fff; }
    ul li .l .m .o:hover span { color: #fff; }

    .tool-b .y { text-align: right; }
</style>

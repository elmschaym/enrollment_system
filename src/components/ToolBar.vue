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
                            <div class="o" @click="goLink('dep-enr-new-enrollee', 'dep')">New Enrollee <span>Ctrl+Alt+E</span></div>
                            <div class="o" @click="goLink('dep-sec-new-section', 'dep')">New Section &nbsp;<span>Ctrl+Alt+C</span></div>
                            <div class="o h" @click="goLink('dep-set-subject', 'dep')">Enrol Subject <span>Ctrl+Alt+R</span></div>
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
            <div class="l">
                <div class="n" @click="bars = !bars"><v-icon name="bars"></v-icon></div>
                <div class="m" v-show="bars">
                    <div class="u">
                        <div class="p">
                            <span></span>
                        </div>
                        <div class="q">
                            <b>{{ user.name }}</b>
                            <span>{{ user.role }}</span>
                        </div>
                    </div>
                    <div class="e">View Profile</div>
                    <div class="e" @click="endSession()">End Session <v-icon name="minus"></v-icon></div>
                </div>
            </div>
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
        },
        created() {
            let user = this.$storageGet('user_info', 'local');
            this.user.name = user.first_name +' '+ user.last_name;
            this.user.role = this.$store.state.forms.faculty.positions.find( p => p.id === user.position ).name;  
        }
    }
</script>

<style scoped>
    .tool-b { height: 24px; background-color: #f8f8f2; display: grid; grid-template-columns: auto 200px; border-bottom: 1px solid #EEEEEC; }

    .tool-b .x {}
    .x ul { display: block; list-style-type: none }
    .x ul li { display: inline-block;  }
    .x ul li .l { position: relative; }
    .x ul li .l .n { font-size: 11px; color: #222; padding: 6px 8px; }
    .x ul li .l .n:hover { color: #444; }

    .x ul li .l .m { padding: 5px 0; position: absolute; top: 100%; width: auto; height: auto; background-color: #fff; z-index: 9999; box-shadow: 0 4px 9px rgba(0,0,0,0.24); }
    .x ul li .l .m .o { font-size: 11px; color: #222; padding: 5px 16px; white-space: nowrap;  }
    .x ul li .l .m .o.h { border-bottom: 1px solid #efefea; }
    .x ul li .l .m .o span { margin-left: 40px; color: #7e7e7a; display: inline-block; text-align: right; }
    .x ul li .l .m .o:hover { background-color: #315BEF; color: #fff; }
    .x ul li .l .m .o:hover span { color: #fff; }

    .tool-b .y { text-align: right; }
    .y .l { position: relative; }
    .y .l .n { padding: 6px 10px; color: #222; }
    .y .l .n svg { width: 10px; height: 10px; }
    .y .l .m { position: absolute; top: 100%; right: 10px; width: 160px; height: auto; background-color: #fff; z-index: 9999; box-shadow: 0 4px 9px rgba(0,0,0,0.24); }
    .y .l .m .u { display: grid; grid-template-columns: 32px auto; margin: 0 10px; border-bottom: 1px solid #ebebe7; padding: 5px 0;}
    .y .l .m .u .p {}
    .y .l .m .u .p span { display: block; height: 28px; width: 28px; background-color: #60605a; }
    .y .l .m .u .q { text-align: left; padding: 2px 5px; }
    .y .l .m .u .q b { display: block; font-weight: 600; color: #222; font-size: 11px; white-space: nowrap; text-overflow: clip; overflow: hidden; }
    .y .l .m .u .q span { display: block; color: #444; font-size: 10px; white-space: nowrap; text-overflow: clip; overflow: hidden; }

    .y .l .m .e { text-align: left; color: #222; padding: 5px 10px; font-size: 11px; }
    .y .l .m .e:hover { background-color: #315BEF; color: #fff; }
    .y .l .m .e svg { width: 10px; height: 10px; float: right; }
</style>

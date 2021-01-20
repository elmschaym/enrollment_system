<template>
    <div class="wrap-m">
        <div class="w">
            <div class="p">
                <list-e-course v-if="departments.length > 0" @setValue="setCourseFromList" :departments="departments" @hasChangedDept="hasChangedDept"></list-e-course>
            </div>
            <div class="q">
                <div v-if="course.hasOwnProperty('id')" class="s">
                    {{ course.program_type }} &nbsp; {{ course.name }}
                </div>
                <div v-if="course.hasOwnProperty('id')" class="t">
                    <div class="u">
                        <ui-loader v-if="isFetchingList"></ui-loader>
                    </div>
                </div>                
            </div>
        </div>
    </div>
</template>

<script>
    import ListECourse from '@/components/ListECourse.vue';
    import UILoader from '@/components/UILoader.vue';

    export default {
        emits: ['setViewName'],
        components: {
            UiLoader: UILoader,
            ListECourse
        },
        data() {
            return {
                isFetchingList: false,
                departments: [],
                course: {},
                subjCourses: []
            }
        },
        methods: {
            setCourseFromList(v) {
                this.course = v;
                this.subject = {};
                this.fetchSubjects();
            },
            fetchDepartments() {
                this.$http.get('department/?action=lister').then(res => {
                    this.departments = res.data;
                });
            },
            fetchSubjects() {
                this.isFetchingList = true;
                this.$http.get('course/'+ this.course.id +'/?action=get-subjects&course_fields=id,subjcourse&subjcourse_fields=id,subject&subject_fields=id,code,name,units').then(res => {
                    this.subjCourses = res.data;
                    console.log(res.data);
                }).finally(() => {
                    this.isFetchingList = false;
                });
            },
            hasChangedDept() {
                this.course = {};
                this.subject = {};
            }
        },
        mounted() {
            this.$emit('setViewName', this.$route.name);
            this.$store.commit('setModuleName', 'Courses – View Prospectus');
            this.fetchDepartments();
        }
    }
</script>

<style scoped>
    .wrap-m { height: inherit; position: relative; }
    .wrap-m .w { height: 100%; display: grid; grid-template-columns: 312px auto; }
    .wrap-m .w .p { height: 100%; background: #f8f8f2; padding: 16px; }
    .wrap-m .w .q { height: 100%; border-left: 1px solid #f0f0f0; display: grid; grid-template-rows: 32px auto }

    .q .s { padding: 10px; font-size: 12px; font-weight: 600; border-bottom: 1px solid #f0f0ea; }
    .q .t {}
    .q .t .u { height: 100%; position: relative; }
</style>

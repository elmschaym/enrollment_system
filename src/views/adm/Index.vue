<template>
    <div class="wrap-i">
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        methods: {
            fetchList() {
                let vm = this;
                this.$http.get('student/').then( res => {
                    vm.isFetching = true;
                    let data = res.data;
                    console.log(data);
                }).catch( e => {
                    console.log(e);
                });
            }
        },
        mounted() {
            this.$store.commit('setModuleName', 'Admission – Dashboard');
        }
    }
</script>

<style scoped>
    .wrap-i { height: inherit; }
</style>

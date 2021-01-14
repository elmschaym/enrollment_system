<template>
    <div>
        <button @click="fetchList()">Fetch</button>
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
                this.$http.post('admission/', { api_token: localStorage.getItem("api_token")}).then( res => {
                    vm.isFetching = true;
                    let data = res.data;
                }).catch( e => {
                });
            }
        },
        mounted() {
            this.$store.commit('setModuleName', 'Admission – Dashboard');
        }
    }
</script>

<style scoped>
</style>

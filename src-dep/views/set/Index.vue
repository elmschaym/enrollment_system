<template>
    <div class="set-o">
        <div><router-link to="/">Loading Screen</router-link></div>
        <div @click="sessionDestroy()">Session Destroy</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        methods: {
            sessionDestroy() {
                window.localStorage.removeItem('api_token');
                this.$sleep(500).then( () => {
                    this.$router.push('/');
                })
            }
        }
    }
</script>

<style scoped>
    .set-o { padding: 16px; }
    .set-o div { margin-bottom: 16px; }
</style>

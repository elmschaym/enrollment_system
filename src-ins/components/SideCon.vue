<template>
    <div class="sidecon">
        <ul>
            <li :class="sconName == 'dbd-index' ? 'active' : ''"><span @click="goScon(dashboard)"><v-icon name="th-large"></v-icon></span></li>
            <li :class="sconName == 'not-index' ? 'active' : ''"><span @click="goScon('not-index')"><v-icon name="bell"></v-icon></span></li>
            <li :class="sconName == 'usr-index' ? 'active' : ''"><span @click="goScon('usr-index')"><v-icon name="user-circle"></v-icon></span></li>
            <li :class="sconName == 'set-index' ? 'active' : ''"><span @click="goScon('set-index')"><v-icon name="cog"></v-icon></span></li>
        </ul>
    </div>
</template>

<script>
    import 'vue-awesome/icons/th-large';
    import 'vue-awesome/icons/cog';
    import 'vue-awesome/icons/bell';
    import 'vue-awesome/icons/user-circle';

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
                sconName: 'dbd-index'
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
            this.sconName = 'dbd-index';
        }
    }
</script>

<style scoped>
    .sidecon { height: 100%; background-color: #555753; border-right: 1px solid #2E3436; }
    .sidecon ul { padding: 24px 0; }
    .sidecon ul li { height: 36px; padding: 10px 6px; cursor: pointer; }
    .sidecon ul li span {}
    .sidecon ul li span svg { height: 16px; width: 16px; color: #f0f0f0; }
    .sidecon ul li.active { background-color: #2E3436; }
    .sidecon ul li.active svg { color: #fff; }
</style>

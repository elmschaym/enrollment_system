<template>
    <div class="tool-b">
        <div class="x">
            <ul>
                <li><div @click="goLink('dbd-index')">Dashboard</div></li>
                <li><div @click="goLink('adm-index')">Admission</div></li>
                <li><div @click="goLink('stu-index')">Students</div></li>
                <li><div @click="goLink('dep-index')">Departments</div></li>
                <li><div @click="goLink('fin-index')">Finances</div></li>
                <li><div @click="goLink('sub-index')">Subjects</div></li>
                <li><div>Courses</div></li>
            </ul>
        </div>
        <div class="y">
            <ul>
                <li><div>{{ user.name }} ({{ user.role }})</div></li>
            </ul>
        </div>
    </div>
</template>

<script>
    import 'vue-awesome/icons/lock';
    import 'vue-awesome/icons/angle-left';

    export default {
        data() {
            return {
                user: { name: 'Paul', role: 'Administrator' }
            }
        },
        methods: {
            goLink(name) {
                this.$router.push({ name: name });
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
    .tool-b .x ul { display: block; list-style-type: none }
    .tool-b .x ul li { display: inline-block;  }
    .tool-b .x ul li div { font-size: 11px; color: #222; padding: 6px 8px; }
    .tool-b .x {}
    .tool-b .x {}

    .tool-b .y { text-align: right; }
    .tool-b .y ul { display: block; list-style-type: none }
    .tool-b .y ul li { display: inline-block;  }
    .tool-b .y ul li div { font-size: 11px; color: #222; padding: 6px 8px; }
</style>

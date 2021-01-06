<template>
    <div class="sidebar">
        <div class="list">
            <div class="usr">
                <div class="u">
                    <span></span>
                    <b>{{ usr.name }} <v-icon name="user-circle"></v-icon></b>
                    <i>{{ usr.role }}</i>
                </div>
            </div>
            <div>
                <div class="q">
                    <div>
                        <v-icon name="search"></v-icon>
                        <input placeholder=""/>
                    </div>
                </div>
                <div class="h">
                    <span>MANAGEMENT</span> <v-icon name="folder-open"></v-icon>
                </div>
                <ul class="p">
                    <li v-for="m in modules_m" :key="m.name+m.icon" @click="goSbar(m.link)" :class="['l', m.link == sbarName ? 'active' : '']">
                        <div>
                            <v-icon :name="m.icon"></v-icon> 
                            <span>{{ m.name }}</span>
                        </div>
                    </li>
                </ul>
                <div class="h" v-show="modules_a">
                    <span>BOOKMARKS</span> <v-icon name="bookmark"></v-icon>
                </div>
                <ul class="p" v-show="modules_a">
                    <li v-for="m in modules_a" :key="m.name+m.icon" @click="goSbar(m.link)" :class="['l', m.link == sbarName ? 'active' : '']">
                        <div>
                            <v-icon :name="m.icon"></v-icon> 
                            <span>{{ m.name }}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="user">
        </div>
    </div>
</template>

<script>
    import 'vue-awesome/icons/th';
    import 'vue-awesome/icons/caret-down';
    import 'vue-awesome/icons/puzzle-piece';
    import 'vue-awesome/icons/plus';
    import 'vue-awesome/icons/search';
    import 'vue-awesome/icons/edit';
    import 'vue-awesome/icons/paw';
    import 'vue-awesome/icons/chevron-left';
    import 'vue-awesome/icons/plus-circle';
    import 'vue-awesome/icons/envelope';
    import 'vue-awesome/icons/bed';
    import 'vue-awesome/icons/users';
    import 'vue-awesome/icons/thermometer';
    import 'vue-awesome/icons/flask';
    import 'vue-awesome/icons/chart-area';
    import 'vue-awesome/icons/edit';
    import 'vue-awesome/icons/universal-access';
    import 'vue-awesome/icons/calendar'
    import 'vue-awesome/icons/lock';
    import 'vue-awesome/icons/user-circle';
    import 'vue-awesome/icons/bookmark';
    import 'vue-awesome/icons/folder-open';

    export default {
        props: {
            modules_m: {
                type: Array,
                required: true
            },
            modules_a: {
                type: Array,
                required: false
            }
        },
        data() {
            return {
                sbarName: '',
                usr: { name: 'Paul', role: 'Administrator' }
            }
        },
        methods: {
            goSbar(name) {
                if( name != this.$route.name ) {
                    this.sbarName = name;
                    this.$router.push({ name });
                }
            }
        },
        created() {
            let user = this.$storageGet('user_info', 'local');
            this.usr.name = user.first_name +' '+ user.last_name;
            this.usr.role = this.$store.state.forms.faculty.positions.find( p => p.id === user.position ).name;  
        }
    }
</script>

<style scoped>
    .sidebar { background: #EEEEEC; height: calc(100vh - 24px); border-right: 1px solid #E8E8E2; position: relative; }

    .sidebar .name { height: 40px; background-color: #00222E; font-size: 24px; text-align: center; font-weight: 600; padding: 8px 0; }
    .sidebar .name b { color: #fff; }
    .sidebar .name span { color: #fff; }
    
    .sidebar .list { height: calc(100% - 48px); padding: 20px 0; }
    .list ul {}
    .list ul li { display: block; position: relative; }
    .list ul li.l > div { display: block; padding: 6px 8px 6px 14px; border-top: 1px solid #E8E8E2 }
    .list ul li.l > div svg { height: 12px; width: 12px; color: #111; margin-bottom: -1px; }
    .list ul li.l > div > span { margin-left: 16px; color: #111; font-size: 11px; }
    .list ul li.l > div:hover { background-color: #E8E8E2; cursor: pointer; }
    .list ul li.l.active > div { background-color: #E8E8E2; cursor: pointer; border-right: 2px solid #888A85; margin-right: -2px; }

    .list .q > div { padding: 2px 4px; margin-bottom: 12px; position: relative; }
    .list .q > div input { width: 100%; padding: 6px; color: #391e22; background-color: #E0E0DB; width: 100%; font-size: 12px; border-width: 1px; border-style: solid; border-color: #EEEEEC #D3D7CF #D0D0D0 #D3D7CF; border-radius: 2px; line-height: 12px; height: 28px; }
    .list .q > div svg { color: #00222E; position: absolute; right: 8px; top: 10px; width: 14px; height: 14px; }

    .list .p {}
    .list .h { margin-top: 8px; padding: 7px 14px; border-top: 1px solid #E8E8E2; }
    .list .h span { font-size: 9px; text-transform: uppercase; color: #111; }
    .list .h svg { width: 9px; height: 9px; float: right; color: #777; margin: 2px 0; }

    .list .usr {}
    .list .usr .u {}
    .list .usr .u span { display: block; height: 84px; width: 84px; background-color: #2E3436; margin: 0 auto; border-radius: 42px 42px 42px 0; }
    .list .usr .u b { color: #111; display: block; padding: 8px 8px 2px 8px; font-size: 12px; position: relative; font-weight: 600; }
    .list .usr .u b svg { width: 12px; height: 12px; position: absolute; right: 8px; }
    .list .usr .u i { color: #333; display: block; font-size: 10px; padding: 0 8px 8px 8px; font-style: normal; }

    .user { height: 24px; display: grid; grid-template-columns: 32px 138px; padding: 4px 6px; background-color: #E8E8E2 }
    .user .m {}
    .user .n {}
    .user .n span { display: block; color: #111; font-size: 10px; }
    .user .n span b { color: #111; font-size: 10px; font-weight: 300; }
    .user .n span i { display: block; margin-top: 2px; color: #111; font-size: 9px; font-style: normal; font-weight: 100 }
    .user .m span { width: 20px; height: 20px; border-radius: 20px; background-color: #a0a0a0; margin: 2px 0; }
</style>

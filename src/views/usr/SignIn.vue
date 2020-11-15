<template>
    <div class="wrap-a">
        <div class="bnnr">
            <div class="name">
                <div class="p">
                    <span>Adiong Memorial Polytechnic State College</span>
                </div>
                <div class="q">Enrollemt System</div>
            </div>
        </div>
        <div class="form">
            <div class="x"><button onclick="win.close()">&times;</button></div>
            <div v-if="!isConnecting" class="w">
                <div class="h">
                    <b>Login</b>
                </div>
                <div class="f">
                    <input type="text" v-model="username" placeholder="Username" :class="{ 'error': isErrorConnect }"/>
                    <v-icon :name="isUsername ? 'user-circle' : 'user'"></v-icon>
                </div>
                <div class="f">
                    <input type="password" v-model="password" placeholder="Password" :class="{ 'error': isErrorConnect }"/>
                    <v-icon :name="isPassword ? 'lock' : 'unlock'"></v-icon>
                </div>
                <div class="s">
                    <button @click="login()" :disabled="!isOkay" :class="{ 'ready': isOkay }">CONNECT</button>
                    
                </div>
            </div>
            <div v-else class="l"><div class="loader"></div></div>
        </div>
    </div>
</template>

<script>
    import 'vue-awesome/icons/user';
    import 'vue-awesome/icons/user-circle';
    import 'vue-awesome/icons/lock';
    import 'vue-awesome/icons/unlock';

    export default {
        data() {
            return {
                isConnecting: false,
                isErrorConnect: false,
                username: "",
                password: ""
            }
        },
        computed: {
            isOkay() {
                return this.username && this.password;
            },
            isUsername() {
                return !!this.username;
            },
            isPassword() {
                return !!this.password;
            }
        },
        methods: {
            login() {
                /*let vm = this, uname = this.username, passw = this.password;
                this.$http.post('AuthSignin', { uname, passw }, { timeout: 10000, before() { vm.isConnecting = true } }).then(
                    res => {
                        vm.isConnecting = true;
                        let data = res.body;
                        if (data.stat == 1) {
                            vm._storageSet('hash', data.hash, 'local');
                            vm._storageSet('user', { id: data.id, username: data.username }, 'local');
                            vm.$router.push('/'+ data.redr);
                        } else {
                            vm.isConnecting = false;
                            vm.isErrorConnect = true;
                        }
                    },
                    () => {
                        vm.isConnecting = false;
                        vm.isErrorConnect = true;
                    }
                ); 
                window.setTimeout(() => vm.isErrorConnect = false, 4000); */
                this.$router.push({ name: 'dbd-index'});
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>
    .wrap-a { height: 100%; display: grid; grid-template-columns: 796px 404px; position: relative; background: linear-gradient(to left bottom, #fafafa, #f0f0f0); }
    .bnnr { position: relative; height: 100%; background: linear-gradient(to right bottom, #08979d, #055b5c); border-radius: 0 0 660px 0; box-shadow: 0 4px 9px rgba(0,0,0,0.4); }
    .form { position: relative; height: 100%; background: transparent; }

    div.x { position: absolute; top: 4px; right: 4px; }
    div.x button { background-color: transparent; border: none; font-size: 18px; color: #08979d; height: 22px; width: 22px; line-height: 18px; cursor: pointer; outline: none }

    div.w { position: absolute; top: calc((100vh - 230px)/2); height: 266px; width: 260px; right: 72px; background: linear-gradient(to left bottom, #478ba2, #de5b6d); padding: 20px 32px 16px 32px; border-radius: 10px; box-shadow: 0 5px 13px rgba(0,0,0,0.4) }
    div.w .h { padding: 8px 0 20px 0;  }
    div.w .h b { display: block; text-align: center; color: #fff; font-family: "Open Sans"; font-size: 28px; font-weight: 600; }
    div.w .h i { display: block; color: #56373c; font-size: 10px; font-weight: bold; text-align: center; font-style: normal; }

    div.w .f { padding: 5px 0; position: relative }
    div.w .f svg { position: absolute; right: 12px; top: 16px; height: 12px; width: 12px; color: #055b5c; }
    div.w input { border-radius: 5px; color: #391e22; padding: 8px 12px; border: 1px solid #f0f0f0;  background-color: #fdfdfd; width: 100%; font-family: "Open Sans"; font-size: 12px; border-width: 1px; border-style: solid; border-color: #f0f0f0 #e0e0e0 #d0d0d0 #e0e0e0; outline: none; cursor: pointer; }
    div.w .s { padding-top: 16px; }
    div.w input.error { background-color: #ffebeb; }
    div.w button { text-align: center; padding: 8px 16px; border-width: 1px; border-style: solid; border-color: #f0f0f0 #e0e0e0 #c0c0c0 #e0e0e0; font-size: 10px; font-family: "Open Sans"; display: block; width: 75%; margin: 0 auto; border-radius: 5px; outline: none; background-color: #fbfbfb; color: #a0a0a0; font-weight: bold }
    div.w button.ready { box-shadow: 0 4px 9px rgba(0,0,0,0.15); background: linear-gradient(to bottom, #fafafa, #f0f0f0); color: #391e22; cursor: pointer; }

    .bnnr .name { position: absolute; top: 200px; left: 32px; right: 32px; }
    .bnnr .name .p { color: #111; }
    .bnnr .name .p span { border-bottom: 10px solid #eee; font-size: 35px; text-transform: uppercase; color: #fff; font-weight: bold; display: inline-block; padding: 0 0 6px 0;}
    .bnnr .name .q { font-size: 36px; text-transform: uppercase; color: #fff; font-weight: bold; margin-top: 6px;  }

    div.l { position: absolute; top: calc((100vh - 230px)/2); height: 266px; width: 260px; right: 72px;  background-color: rgba(0,0,0,0.10); padding: 24px 36px 48px 36px; border-radius: 10px; }
    
    .loader, .loader:before, .loader:after { border-radius: 50%; width: 12px; height: 12px; -webkit-animation-fill-mode: both; animation-fill-mode: both; -webkit-animation: load7 1.8s infinite ease-in-out; animation: load7 1.8s infinite ease-in-out; }
    .loader { color: #391e22; font-size: 10px; margin: 80px auto; position: relative; text-indent: -9999em; -webkit-transform: translateZ(0); -ms-transform: translateZ(0); transform: translateZ(0); -webkit-animation-delay: -0.16s; animation-delay: -0.16s; }
    .loader:before,
    .loader:after { content: ''; position: absolute; top: 0; }
    .loader:before { left: -18px; -webkit-animation-delay: -0.32s; animation-delay: -0.32s; }
    .loader:after { left: 18px; }
    @-webkit-keyframes load7 { 0%, 80%, 100% { box-shadow: 12px 0 -7px; } 40% { box-shadow: 0 12px 0 0; }}
    @keyframes load7 { 0%, 80%, 100% { box-shadow: 0 12px 0 -7px; } 40% { box-shadow: 0 12px 0 0; }}
</style>

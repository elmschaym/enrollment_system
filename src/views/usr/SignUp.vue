<template>
    <div class="wrap" :style="'background-color: #fff; background-image: url('+ bg +'); background-position: top top; background-repeat: no-repeat; background-size: cover;'">
        <div class="bnnr">
            <div class="name">
                <i>Pet Clinic Management System</i>
                <b>&lt;/&gt; with ♥ by <u>paulcaras</u></b>
            </div>
        </div>
        <div class="form">
            <div class="w">
                <div class="h">
                    <b>ENOSYS</b>
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
                    <button @click="login()" :disabled="!isOkay" :class="{ 'ready': isOkay }">REGISTER</button>
                </div>
            </div>
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
            bg() {
                return require('@/assets/img/signin-bg.png');
            },
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
                let vm = this, uname = this.username, passw = this.password;
                this.$http.post('AuthSignup', { uname, passw }, { timeout: 10000, before() { vm.isConnecting = true } }).then(
                    res => {
                        vm.isConnecting = true;
                        let data = res.body;
                        if (data.stat == 1) {
                            vm.$storageSet('hash', { hash: data.hash });
                            vm.$storageSet('user', { id: data.id, username: data.username });
                            window.setTimeout(function() {
                                vm.$router.push('/'+ data.redr);
                            }, 2000)
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
                window.setTimeout(() => vm.isErrorConnect = false, 4000);
            }
        }
    }
</script>

<style scoped>
    .wrap { height: 100%; display: grid; grid-template-columns: 60% 40%; position: relative; }
    .bnnr { position: relative; height: 636px; }
    .form { position: relative; }

    div.w { position: absolute; top: 20%; width: 280px; right: 72px; background-color: #fbfbfb; padding: 24px 36px 48px 36px; box-shadow: 20px 20px 20px #f0f0f0, -20px -20px 40px #f0f0f0; border: 1px solid #f0f0f0; border-radius: 10px; }
    div.w .h { padding: 8px 0 24px 0;  }
    div.w .h b { display: block; text-align: center; color: #56373c; font-family: "Bauhaus 93"; font-size: 32px; font-weight: 600; }
    div.w .h i { display: block; color: #56373c; font-size: 10px; font-weight: bold; text-align: center; font-style: normal; }

    div.w .f { padding: 5px 0; position: relative }
    div.w .f svg { position: absolute; right: 10px; top: 14px; height: 16px; width: 16px; color: #56373c; }
    div.w input { border-radius: 20px; color: #391e22; padding: 8px 20px; border: 1px solid #f0f0f0;  background-color: #fdfdfd; width: 100%; font-family: "Consolas"; font-size: 14px; border-width: 1px; border-style: solid; border-color: #f0f0f0 #e0e0e0 #d0d0d0 #e0e0e0; outline: none; box-shadow: 1px 1px 8px #e0e0e0 ; cursor: pointer; }
    div.w .s { padding-top: 16px; }
    div.w input.error { background-color: #ffebeb; }
    div.w button { text-align: center; padding: 8px 16px; border-width: 1px; border-style: solid; border-color: #f0f0f0 #e0e0e0 #c0c0c0 #e0e0e0; font-size: 12px; font-family: "Consolas"; display: block; width: 75%; margin: 0 auto; border-radius: 12px; outline: none; background-color: #fbfbfb; color: #a0a0a0; }
    div.w button.ready { box-shadow: 0 4px 9px rgba(0,0,0,0.15); background: linear-gradient(to bottom, #fafafa, #f0f0f0); color: #391e22; cursor: pointer; }

    .bnnr .name { position: absolute; bottom: 24px; left: 24px; }
    .bnnr .name b { display: block; color: #56373c; font-size: 9px; font-weight: 600; margin-top: 4px; }
    .bnnr .name i { display: block; color: #56373c; font-size: 10px; font-weight: bold; font-style: normal; }
</style>

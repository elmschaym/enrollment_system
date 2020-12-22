import axios from 'axios';

export default {
     install(Vue) {
        Vue.prototype.APP_NAME = "System ENR";
        Vue.prototype.APP_NAME_FULL = "Enrollment System";

        Vue.filter('currency', function(value) {
            if (typeof value !== "number") {
                return value;
            }
            var formatter = new Intl.NumberFormat('en-PH', {
                style: 'currency',
                currency: 'PHP',
                minimumFractionDigits: 2
            });
            return formatter.format(value);
        });

        Vue.filter('getDate', function(value) {
            var d = new Date(value);
            return d.getFullYear() +'-'+ Number.parseInt(d.getMonth()+1) +'-'+ d.getDate();
        });

        Vue.prototype.$storageGet = function(key, type) {
            var ttype = type || 'local';
            var value = ttype === 'local' ? window.localStorage.getItem(key) : window.sessionStorage.getItem(key)
            return value && JSON.parse(value)
        };
        Vue.prototype.$storageSet = function(key, value, type) {
            var ttype = type || 'local';
            if (ttype === 'local')
                window.localStorage.setItem(key, JSON.stringify(value));
            else if(ttype === 'session')
                window.sessionStorage.setItem(key, JSON.stringify(value));
        };
        Vue.prototype.$storageDel = function(key, type) {
            var ttype = type || 'local';
            if (ttype === 'local')
                window.localStorage.removeItem(key);
            else if(ttype === 'session')
                window.sessionStorage.removeItem(key);
        };
        Vue.prototype.$sleep = function(milliseconds) {
            return new Promise(resolve => window.setTimeout(resolve, milliseconds));
        };

        Vue.prototype.$http = axios.create({
            baseURL: window.API_BASEURL +'/api/',
            timeout: 5000
        });
        Vue.prototype.$http.interceptors.request.use(function (config) {
                const api_token = window.localStorage.getItem("api_token") || "0";
                config.headers.common["Authorization"] = "Token "+ JSON.parse(api_token);
                return config;
            }, function (error) {
                return Promise.reject(error);
        });
    }
};
export default {
    methods: {
        _storageGet: function(key, type) {
            var ttype = type || 'local';
            var value = ttype === 'local' ? window.localStorage.getItem(key) : window.sessionStorage.getItem(key)
            return value && JSON.parse(value)
        },
        _storageSet: function(key, value, type) {
            var ttype = type || 'local';
            if (ttype === 'local')
                window.localStorage.setItem(key, JSON.stringify(value))
            else
                window.sessionStorage.setItem(key, JSON.stringify(value))
        }
    }
}



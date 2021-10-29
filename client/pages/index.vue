<template>
    <div>
        <form v-if="!isLoggedin" @submit.prevent="login">
            <input v-model="payload.email" type="email" placeholder="email" />
            <input
                v-model="payload.password"
                type="text"
                placeholder="password"
            />
            <input type="submit" value="Login" />
        </form>
        <button v-if="isLoggedin" @click="logout">Logout</button>
        <br />
        <br />
        <br />
        <br />
        <button @click="test">Test</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            payload: {
                email: '',
                password: ''
            },

            message: null,

            isLoggedin: false,
        }
    },

    mounted() {
        this.socket = this.$nuxtSocket({
            name: 'home', // Use socket "home"
            channel: '/', // connect to '/index'

            // socket.io-client opts:
            reconnection: false
        })

        this.getMessage()
    },

    methods: {
        async login() {
            try {
                await this.$axios.$post('/auth/login', this.payload)
                this.isLoggedin = true
            } catch (e) {
                this.isLoggedin = false
                console.log(e.response)
            }
        },

        async logout() {
            await this.$axios.$get('/auth/logout')
            this.isLoggedin = false
        },

        test() {
            this.$axios.$get('/test')
        },

        getMessage() {
            this.socket.emit('test', { data: 'Hello World' })
        }
    },
}
</script>

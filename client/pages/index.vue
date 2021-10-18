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

            isLoggedin: false,
        }
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
        }
    },
}
</script>

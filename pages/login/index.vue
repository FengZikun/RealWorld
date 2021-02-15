<template>
  <div class="auth-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">{{ isLogin ? 'Sign in' : 'Sign up'}}</h1>
        <p class="text-xs-center">
          <nuxt-link to="/login" v-if="!isLogin">Have an account?</nuxt-link>
          <nuxt-link to="/register" v-else>Don't have an account?</nuxt-link>
        </p>

        <ul class="error-messages">
          <template v-for="(messages, field) in errors">
            <li v-for="(message, index) in messages" :key="index">{{field}} {{message}}</li>
          </template>
          
        </ul>

        <form @submit.prevent="onSubmit">
          <fieldset v-if="!isLogin" class="form-group">
            <input v-model="user.username" class="form-control form-control-lg" type="text" placeholder="Your Name">
          </fieldset>
          <fieldset class="form-group">
            <input v-model="user.email" type="email" class="form-control form-control-lg" placeholder="Email" required>
          </fieldset>
          <fieldset class="form-group">
            <input v-model="user.password" class="form-control form-control-lg" type="password" placeholder="Password" required>
          </fieldset>
          <button class="btn btn-lg btn-primary pull-xs-right">
            {{ isLogin ? 'Sign in' : 'Sign up'}}
          </button>
        </form>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import { login, register } from '@/api/user'

const Cookie = process.client ? require('js-cookie') : undefined
export default {
  computed: {
    isLogin() {
      return this.$route.name === 'login'
    }
  },

  data() {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      },

      errors: {}
    }
  },

  created() {
    this.errors = {}
  },

  methods: {
    async onSubmit() {
      try {
        const { data } = this.isLogin ? await login(this.user) : await register(this.user)
        console.log(data)

        this.$store.commit("setUser", data.user)
        Cookie.set('user', data.user)
        
        this.$router.push({path: '/'})
      } catch (error) {
        console.dir(error)
        this.errors = error.response.data.errors
      }
      
    }
  }
}
</script>

<style>

</style>

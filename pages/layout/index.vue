<template>
  <div>
    <nav class="navbar navbar-light">
      <div class="container">
        <nuxt-link class="navbar-brand" to="/">Home</nuxt-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <nuxt-link class="nav-link" to="/" exact>Home</nuxt-link>
          </li>

          <template v-if="user">
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/create-article">
                <i class="ion-compose"></i>&nbsp;New Post
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/settings">
                <i class="ion-gear-a"></i>&nbsp;Settings
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" :to="`/profile/${user.id}`">
                <img class="user-pic" :src="user.image" alt="">
                {{user.username}}
              </nuxt-link>
            </li>
          </template>

          <li class="nav-item">
            <nuxt-link v-if="isLogin" class="nav-link" to="/register">Sign up</nuxt-link>
            <nuxt-link v-if="!user" class="nav-link" to="/login">Sign in</nuxt-link>
          </li>
        </ul>
      </div>
    </nav>

    <nuxt-child></nuxt-child>

    <footer>
      <div class="container">
        <a href="/" class="logo-font">conduit</a>
        <span class="attribution">
          An interactive learning project from
          <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  middleware: 'authenticated',

  computed: {
    ...mapState(['user']),

    isLogin() {
      return this.$route.name === 'login'
    }
  }
}
</script>

<style>
</style>

import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3c037607 = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _650482fc = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _3bc424ec = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _29101880 = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _34756a6c = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _1b3fadb9 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))
const _4da19550 = () => interopDefault(import('..\\pages\\edit-article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _3c037607,
    children: [{
      path: "",
      component: _650482fc,
      name: "home"
    }, {
      path: "/login",
      component: _3bc424ec,
      name: "login"
    }, {
      path: "/register",
      component: _3bc424ec,
      name: "register"
    }, {
      path: "/settings",
      component: _29101880,
      name: "settings"
    }, {
      path: "/profile/:username",
      component: _34756a6c,
      name: "profile"
    }, {
      path: "/article/:slug",
      component: _1b3fadb9,
      name: "article"
    }, {
      path: "/edit-article",
      component: _4da19550,
      name: "edit-article"
    }, {
      path: "/create-article",
      component: _4da19550,
      name: "create-article"
    }]
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}

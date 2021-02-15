module.exports = {
  router: {
    linkActiveClass: 'active',
    extendRoutes(routes, resolve) {
      routes.splice(0);
      routes.push(...[{
        path: "/", 
        component: resolve(__dirname, 'pages/layout/'),
        children: [
          {
            path: '',
            name: 'home',
            component: resolve(__dirname, 'pages/home/')
          },
          {
            path: '/login',
            name: 'login',
            component: resolve(__dirname, 'pages/login/')
          },
          {
            path: '/register',
            name: 'register',
            component: resolve(__dirname, 'pages/login/')
          },
          {
            path: '/settings',
            name: 'settings',
            component: resolve(__dirname, 'pages/settings/')
          },
          {
            path: '/profile/:username',
            name: 'profile',
            component: resolve(__dirname, 'pages/profile/')
          },
          {
            path: '/article/:slug',
            name: 'article',
            component: resolve(__dirname, 'pages/article/')
          },
          {
            path: '/edit-article',
            name: 'edit-article',
            component: resolve(__dirname, 'pages/edit-article/')
          },
          {
            path: '/create-article',
            name: 'create-article',
            component: resolve(__dirname, 'pages/edit-article/')
          }
        ]
      }]);
    }
  },

  plugins: [
    '~/plugins/request.js'
  ]
};

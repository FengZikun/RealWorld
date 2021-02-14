module.exports = {
  router: {
    extendRoutes(routes, resolve) {
      routes.splice(0);
      routes.push(...[{
        path: "/", 
        component: resolve(__dirname, 'pages/layout/'),
        children: [
          {
            path: '',
            component: resolve(__dirname, 'pages/home/')
          },
          {
            path: '/login',
            component: resolve(__dirname, 'pages/login/')
          }
        ]
      }]);
    }
  }
};

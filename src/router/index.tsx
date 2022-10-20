 const routes = {
  prefixes: ['http://localhost:19006'],
  config: {
    screens: {
      Home: '',
      Admin: 'admin',
      ResetPassword: 'admin/reset-password',
      Dashboard: 'admin/dashboard',
      Users: 'admin/users',
      AddUsers: 'admin/users/add',
      NotFound: '*',
    }
  },
};

export default routes;
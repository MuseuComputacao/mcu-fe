 const routes = {
  prefixes: ['http://localhost:19006'],
  config: {
    screens: {
      Home: '',
      Admin: 'admin',
      Dashboard: 'admin/dashboard',
      Users: 'admin/users',
      AddUsers: 'admin/users/add',
      NotFound: '*'
    }
  },
};

export default routes;
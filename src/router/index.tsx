 const routes = {
  prefixes: ['http://localhost:19006'],
  config: {
    screens: {
      Home: '',
      Admin: 'admin',
      Dashboard: 'admin/dashboard',
      Users: 'admin/users',
      AddUsers: 'admin/users/add',
      Items: 'admin/items',
      NotFound: '*'
    }
  },
};

export default routes;
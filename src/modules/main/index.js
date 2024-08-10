
const main = (router) => {
  router.route('/').get((req, res) => res.send('API Shopping App!'))
}

export default main;

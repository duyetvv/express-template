
const main = (router) => {
  router.route('/').get((req, res) => res.send('Sample Express Server!'))
}

export default main;

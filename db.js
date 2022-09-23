const jsonServer = require('json-server')
const server = jsonServer.create()
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

const map = {
  "ASAP": 1499,
  "STANDARD": 799,
  "SLOW": 0
}

server.get('/shipping-cost', (req, res) => {
  const method = req.query.method;
  
  setTimeout(() => {
    res.jsonp(map[method])
  }, 500)
})

server.post('/complete-order', (req, res) => {
  setTimeout(() => {
    res.jsonp({
      success: true
    })
  }, 500)
})

server.listen(4000, () => {
  console.log('Server is running')
})
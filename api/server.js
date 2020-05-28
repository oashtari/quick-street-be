const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

// const authRouter = require(../auth/auth-router)
// const auth = require('./routes/auth');
// const vendors = require('./routes/vendors');
// const customers = require('./routes/customers');
// const products = require('./routes/products');
// const cart = require('./routes/cart');
// const productImages = require('./routes/productImages');
// const posts = require('./routes/posts');
// const orders = require('./routes/order');

const server = express()

server.use(cors())
server.use(helmet())
server.use(morgan('combined'))
server.use(express.json())
server.use(cookieParser())

// app.use('/api/auth', auth);
// app.use('/api/vendors', vendors);
// app.use('/api/customers', customers);
// app.use('/api/products', products);
// app.use('/api/cart', cart);
// app.use('/api/product-images', productImages);
// app.use('/api/posts', posts);
// app.use('/api/orders', orders);

server.get('/test', (req, res) => {
  res.send(
    '<h1>Server Status</h1><h2>Server running succesfully.</h2><p>Deployment is all good, continue working.. nothing to see here.</p>'
  );
});

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

module.exports = server;
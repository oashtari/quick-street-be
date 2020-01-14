const express = require('express');
const {
  getAllVendors,
  getVendor,
  createVendor,
  updateVendor,
  deleteVendor,
  getVendorsInRadius
} = require('../controllers/vendors');

const Vendor = require('../models/Vendor');

const advancedResults = require('../middleware/advancedResults');

// Include other resource routers
const productRouter = require('./products');
const postRouter = require('./posts');
const productImageRouter = require('./productImages');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.use(protect);

// Re-route into other resource route
router.use('/:vendorId/products', productRouter);
router.use('/:vendorId/posts', postRouter);
router.use('/:vendorId/product-images', productImageRouter);

router.route('/radius/:zipcode/:distance').get(getVendorsInRadius);

router
  .route('/')
  .get(advancedResults(Vendor), getAllVendors)
  .post(createVendor);

router
  .route('/:id')
  .get(getVendor)
  .put(updateVendor)
  .delete(deleteVendor);

module.exports = router;

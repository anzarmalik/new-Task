var express = require('express');
var router = express.Router();
const {
  getDetails, insertDetails,deleteDetails,updateDetails,uploadImage
} = require('../controllers/');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/getAllDetails' ,getDetails) ;
router.post('/',insertDetails)
router.put('/',updateDetails)
router.delete('/',deleteDetails)

router.post('/upload',uploadImage)






module.exports = router;

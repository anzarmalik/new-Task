const userMethod = require('../model/use-cases/')
var multer = require("multer")
var mime = require('mime');
const fs = require('fs');

module.exports.getDetails = async (req, res) => {
  try {
    return await userMethod.getDetails(req, res);
  } catch (e) {
    console.error(e.message || 'Internal server error')
    const resData = {
      resCode: '999',
      resMessage: 'Internal server error',
      description: null
    }
    res.send(resData)
  }
}



module.exports.insertDetails = async (req, res) => {
  try {
    return await userMethod.insertDetails(req, res);
  } catch (e) {
    console.error(e.message || 'Internal server error')
    const resData = {
      resCode: '999',
      resMessage: 'Internal server error',
      description: null
    }
    res.send(resData)
  }
}



module.exports.deleteDetails = async (req, res) => {
  try {
    let response = await userMethod.deleteDetails(req, res);
    if (response) {
      return res.json({
        resMessage: "Success Deletion",
        resCode: "200"
      })
    } else {
      return res.json({
        resMessage: "wrong",
        resCode: "404"
      })
    }
  } catch (e) {
    console.error(e.message || 'Internal server error')
    const resData = {
      resCode: '999',
      resMessage: 'Internal server error',
      description: null
    }
    res.send(resData)
  }
}


module.exports.updateDetails = async (req, res) => {
  try {
    const { id } = req.body;
    delete req.body.id;
    const data = req.body;
    let response = await userMethod.updateDetails(data, id);
    if (response) {
      return res.json({
        resMessage: "Success",
        resCode: "200"
      })
    } else {
      return res.json({
        resMessage: "wrong",
        resCode: "404"
      })
    }
  } catch (e) {
    console.error(e.message || 'Internal server error')
    const resData = {
      resCode: '999',
      resMessage: 'Internal server error',
      description: null
    }
    res.send(resData)
  }
}





// api for image

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
      var dirName = 'public/userImages'
      if (!fs.existsSync(dirName)) {
          fs.mkdirSync(dirName)
      }
      callback(null, './' + dirName)
  },
  filename: function (req, file, callback) {
      let extFileCheck = file.originalname.split('.');
      extFileCheck.shift()
      if(extFileCheck.length>1){
          return callback(new Error('Not a valid Extension'))
      }else{
          callback(null, file.fieldname + '-' + Date.now() + '.' + mime.getExtension(file.mimetype));
      }
  }
})

module.exports.uploadImage = async function (req, res) {
  var upload = multer({
    storage: storage
  }).single('userFile');
  upload(req, res, function (err) {
    if (err) {
      if (err && err.message === 'Not a valid Extension') {
        return res.send({
          responseCode: '101',
          message: `Not a valid Extension`
        })
      } else {
        return res.send({
          responseCode: '102',
          message: `Something Went Wrong`
        })
      }
    } else {
      var fileName = req.file.filename ? req.file.filename : req.file.fileName
      let response = {
        responseCode: '200',
        userFile: 'userImages/' + fileName
      }
      res.send(response)
    }
  })
}
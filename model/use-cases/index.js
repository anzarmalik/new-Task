const userDetails = require('../entities/index')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

async function getDetails(req, res) {
    try {

        let start = parseInt(req.query.start);
        const length = parseInt(req.query.length);
        const draw = parseInt(req.query.draw);
        let searchText = req.query.search.value;
        let whereClause, opOr;

        opOr = [
            {
                id: {
                    [Op.like]: '%' + searchText + '%'
                }
            },
            {
                firstname: {
                    [Op.like]: '%' + searchText + '%'
                }
            },
            {
                address: {
                    [Op.like]: '%' + searchText + '%'
                }
            },
            {
                lastname: {
                    [Op.like]: '%' + searchText + '%'
                }
            },
            {
                emailAddress: {
                    [Op.like]: '%' + searchText + '%'
                }
            },
            {
                dob: {
                    [Op.like]: '%' + searchText + '%'
                }
            }
        ];

        whereClause = {
            [Op.or]: opOr
        }

        const data = await userDetails.findAndCountAll({
            where: whereClause,
        });
        const record = data.count;
        const requestData = await userDetails.findAll({
            where: whereClause,
            limit: length,
            offset: start,
            order: [
                ["id", "DESC"]
            ],
        });

        if (requestData) {
            res.json({
                'resCode':200,
                'draw': draw,
                'recordsTotal': record,
                'recordsFiltered': record,
                limit: length,
                offset: start,
                data: requestData
            })
        } else {
            res.json({
                'resCode':404,
                resType: 'Error',
                resMessage: 'Something went wrong',
                data: requestData
            })
        }

    } catch (error) {
        console.log(error)
    }
}




async function insertDetails(req, res){
    try {
        const details = req.body;
        console.log('req body=====', details);
        let userDetail = await userDetails.create(details)
        console.log("======================userDetails ",userDetail)
        if (userDetail) {
          return  res.json({
                'resCode':200,
                data: userDetail
            })
        } else {
          return  res.json({
                'resCode':404,
                'resMessage':'Data Inserted successfully',
                data: userDetail
            })
        }
    } catch (e) {
        console.log(e)
        const resData = {
            resCode: '999',
            message: 'Internal server error',
            description: null
        }
        res.send(resData)
    }
}


async function deleteDetails(req, res){

    try {
        let id = req.query.id ;
        const deletedData = await userDetails.destroy({
          where: {
            id,
          },
        });
        if (deletedData == 1) {
          return deletedData;
        }
        return null;
      } catch (error) {
        console.log(error);
        return null;
      }

}


async function updateDetails(data, id) {
    try {
        console.log("==============data========",data);
        console.log("==============id========",id);

      const updatedData = await userDetails.update(data,
        {
          where: {
            id,
          },
        });
      if (updatedData[0] == 1) {
        return updatedData;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };



module.exports = {
    getDetails,
    insertDetails,
    deleteDetails,
    updateDetails
}
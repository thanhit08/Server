const User_Model = require('../models/user');

const getCurrentDate = () => {
    return new Date();
};

var that = module.exports = {
    userCheckExists: async (req, res) => {
        //check params here use Utils
        //   const isCheck = await Utils.checkMissingParams({arrCheck, arrQuery});
        //   if(!isCheck){
        //     return res.status(200).json({
        //       code: 200, status: 'success', elements: 'Missing key'
        //     })
        //   }
  
      //nếu ok chạy tiếp 
      const isExistUser = await User_Model.findOne(req.query || req.body)
      if(!isExistUser){  
        return res.status(200).json({
          code: 200, status: 'success', elements: 'Create is Failed!!'
        })
      }
  
      return res.status(200).json({
          code: 200, status: 'success', elements: isExistUser._id
      })
    }
  }
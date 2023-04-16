const ResultsModel = require("../modal/Results");
const UsersModel = require("../modal/Users");
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Ho_Chi_Minh');

class ResultController {
  getAll(req, res) {

    ResultsModel.find()
    .then( async (data)=>{
      const newData = data.map((item)=>{
        return { ...item._doc, 
          createdAt: moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
          updatedAt: moment(item.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
        }
      })
      return newData
    })
    .then((users) => {
      res
        .status(200)
        .json({ data: users, status: 200, message: "Lấy thành công !" });
    });
  }
  deleteResult(req, res) {
    (async () => {
      console.log({ data: req.params, method: "delete" });
      try {
        await ResultsModel.findByIdAndDelete(req.params);
        return res
          .status(200)
          .json({ status: 200, method: "DELETE", message: "Xóa thành công" });
      } catch {
        return res
          .status(404)
          .json({ status: 404, message: "Không xóa được :)" });
      }
    })();
  }
  postGift(req, res,next) {
    const { userId, gift } = req.body;
  
    if (!userId || !gift) {
      return res.status(404).json({ message: "Dữ liệu không hợp lệ", data: [] });
    } else {
      (async () => {
        try {
          
          const result = await ResultsModel.findOne({ "user._id": userId });
          const getUser = await UsersModel.findOne({ _id: userId });
          const user = {
            _id: getUser._id,
            fullname: getUser.fullname,
            phone: getUser.phone
          }
          
          if (!result) {
            const newResult = new ResultsModel({
              user,
              gift: [{ name: gift }],
            })
            
            ;
            await newResult.save();
          } else {
            result.gift.push({ name: gift });
            await result.save();
          }
          return res
            .status(200)
            .json({ message: "Cập nhập gift thành công", status: 200 });
       
          } catch (err) {
            return res
              .status(500)
              .json({ message: "Lỗi trong quá trình lưu vào cơ sở dữ liệu", status: 500 });
        }
      })();
    }
  }
}
module.exports = new ResultController();

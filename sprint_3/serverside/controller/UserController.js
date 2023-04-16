const UsersModel = require("../modal/Users");

class UserController {
  getAll(req, res) {
    UsersModel.find().then((users) => {
      res
        .status(200)
        .json({ data: users, status: 200, message: "Lấy thành công !" });
    });
  }
  addUser(req, res) {
    console.log(req.body);
    const listuser = req.body.user;
    if (listuser.length <= 0) {
      return res.status(404).json({ message: "Some things erroe" });
    }
    (async function () {
      const result = await UsersModel.insertMany(listuser);

      return res
        .status(200)
        .json({ status: 200, messsage: "Add Correct", user: result });
    })();
  }
  
  deleteUser(req, res) {
    (async () => {
      console.log({ data: req.params, method: "delete" });
      try {
        await UsersModel.findByIdAndDelete(req.params);
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

}
module.exports = new UserController();

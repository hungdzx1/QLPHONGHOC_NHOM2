const express = require("express");
const {
  getAdmin, getUpdateR,
  postNewRooms,
  postLogin,
  AdQLTK,
  Register,
  UpdateR,
  DeleteR,
  DeleteAcc,
  UpdateAccout, ReqRooms, BookingRooms, Searching
} = require("../controllers/APIcontrollers");

const {
  CheckLogin,
} = require('../middleware/middle');

const { checkAccount } = require("../services/CRUD");

const router = express.Router();

const RestAPIs = (app) => {
  router.get("/", CheckLogin); // CheckLogin-->Hàm này để check đăng nhập với role là gì

  router.post("/login", postLogin); //

  router.get("/admin/rooms", getAdmin); //Get all room for admin

  router.get("/admin/searching", Searching);

  router.post("/create-new-rooms", postNewRooms); //Tạo phòng (admin)

  router.get("/update-rooms/:idr", getUpdateR); //Lấy thông tin phòng trước khi update

  router.put("/results-update/:idr", UpdateR); 

  router.delete("/admin/delete-room/:idr", DeleteR); 

  router.get("/ql-taikhoan", AdQLTK); //Hiển thị toàn bộ tài khoản

  router.post("/register", Register); //tạo mới tài khoản (user and admin)

  router.put("/update-account/:ida", UpdateAccout);

  router.delete("/delete-acc/:ida", DeleteAcc); //xóa tài khoản theo id chọn

  router.get("/req-rooms/:idr", ReqRooms); //Lấy thông tin phòng trước khi mượn

  router.post("/bookings/:idr", BookingRooms);

  return app.use('/api/', router);
};


module.exports = RestAPIs;

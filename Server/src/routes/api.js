const express = require("express");
const {
  getAdmin, getUpdateR,
  postNewRooms, getTotalRows, 
  postLogin, getUpdateAcc, Auth,
  AdQLTK, ShowRooms,
  Register, getStatus, ReqRoomsByStatus,
  UpdateR, logout,
  DeleteR, ChangeStatusBookings,
  DeleteAcc,
  UpdateAccout, ReqRooms, BookingRooms, Searching, SearchingAccount
} = require("../controllers/APIcontrollers");

const {
  CheckLogin,
} = require('../middleware/middle');

const { checkAccount } = require("../services/CRUD");

const router = express.Router();

const RestAPIs = (app) => {
  router.get("/", CheckLogin); // CheckLogin-->Hàm này để check đăng nhập với role là gì

  router.post("/login", postLogin); //

  router.get("/admin/rooms",CheckLogin , getAdmin); //Get all room for admin

  router.get("/admin/searching", CheckLogin ,Searching);

  router.post("/create-new-rooms", CheckLogin ,postNewRooms); //Tạo phòng (admin)

  router.get("/update-rooms/:idr", CheckLogin ,getUpdateR); //Lấy thông tin phòng trước khi update

  router.put("/results-update/:idr", UpdateR); 

  router.delete("/admin/delete-room/:idr", DeleteR); 

  router.get("/admin/choose-rooms", CheckLogin ,ShowRooms); //Lấy thông tin phòng trước khi mượn

  router.get("/admin/ql-taikhoan", CheckLogin ,AdQLTK); //Hiển thị toàn bộ tài khoản

  router.post("/admin/register", CheckLogin ,Register); //tạo mới tài khoản (user and admin)

  router.get("/admin/update-account/:ida", CheckLogin ,getUpdateAcc); //Lấy thông tin tài khoản trước khi update

  router.put("/admin/update-account/:ida", CheckLogin ,UpdateAccout); 

  router.get("/admin/searching-account", CheckLogin ,SearchingAccount); //Tìm kiếm tài khoản theo tên

  router.delete("/admin/delete-acc/:ida", CheckLogin ,DeleteAcc); //xóa tài khoản theo id chọn

  router.get("/req-rooms", CheckLogin ,ReqRooms); //Lấy thông tin phòng đã đăng ký theo id user

  router.post("/req-rooms-by-status", CheckLogin ,ReqRoomsByStatus); //Trả phòng theo trạng thái

  router.post("/change-status-bookings", ChangeStatusBookings);

  router.post("/bookings", CheckLogin ,BookingRooms);

  router.get("/get-total-rows", CheckLogin ,getTotalRows);

  router.post("/get-status", CheckLogin ,getStatus); 

  router.post("/logout", CheckLogin ,logout);

  router.get("/auth", Auth);

  
  return app.use('/api/', router);
};


module.exports = RestAPIs;

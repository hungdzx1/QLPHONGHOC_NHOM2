const express = require("express");
const {
  getLogin,
  getAdmin,
  postRooms,
  postNewRooms,
  postLogin,
  AdQLTK,
  Register,
  getUpdateR,
  UpdateR,
  DeleteR,
  Dashboard, Searching, AdminSearching,
} = require("../controllers/homeController");

const {
  CheckLogin,
} = require('../middleware/middle');

const { checkAccount } = require("../services/CRUD");

const router = express.Router();

router.get('/', CheckLogin);

router.get('/login', getLogin);

router.post('/login', postLogin);

router.get("/admin", getAdmin);

router.get('/create-rooms', postRooms);

router.post('/create-new-rooms', postNewRooms);

router.get('/ql-taikhoan', AdQLTK);

router.post('/register', Register);

router.get('/update-rooms/:idr', getUpdateR);

router.post('/results-update/:idr', UpdateR);

router.get('/delete-room/:idr', DeleteR);

router.get('/dashboard', Dashboard);

router.get('/searching', Searching);

router.get('/admin/searching', AdminSearching);

module.exports = router;

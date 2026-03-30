const connection = require("../config/database");
const { get } = require("../routes/web");

const {
  getAllRooms,
  creatNewRooms,
  checkAccount, getStatus1, getStatus2, getStatus3, getStatus4,
  getUserByID, GetIdRoomByName,
  getFullAcc, checkpass, updatepass,
  getUserByUS,
  CreateAcc,
  getRoomByID,
  UpdateRooms,
  DeleteRoomById,
  GetRoomByName,
  DeleteAccById,
  updateAccoutById,
  CheckBookingRoom,
  CheckTimeBookings,
  Bookings, 
  getTotalRooms,
  getTotalAccounts,
  getTotalBookings, ChangeStatus
} = require("../services/CRUD");

const getAdmin = async (req, res) => {
  try {
    let room = await getAllRooms();
    return res.status(200).json({
      status: "success",
      message: "Done",
      data: room,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi",
      error: error.message,
    });
  }
};

const Searching = async (req, res) => {
  try {
    const name = req.query.name;
    // console.log("Name nhận được:", name);

    let rooms = await GetRoomByName(name);

    // console.log("Kết quả tìm kiếm:", rooms);

    if(rooms.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy phòng học nào!",
      });
    }
    
    return res.status(200).json({
      status: "success",
      message: "Tìm kiếm thành công",
      data: rooms,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server!",
    });
  }
};

const postNewRooms = async (req, res) => {
  try {
    let { roomName, roomType, capacity, status } = req.body;

    if (!roomName || !roomType || !capacity || !status) {
      return res.status(400).json({
        message: "Vui lòng nhập đầy đủ thông tin!",
      });
    }

    let check = await GetRoomByName(roomName);

    if (check.length > 0) {
      return res.status(409).json({
        message: "Phòng đã tồn tại!",
      });
    }

    await creatNewRooms(roomName, roomType, capacity, status);

    return res.status(201).json({
      message: "Tạo mới phòng thành công",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Lỗi server!",
      error: error.message,
    });
  }
};

const postLogin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Thiếu thông tin" });
  }

  let user = await checkAccount(username, password);

  if (!user) {
    return res.status(401).json({
      message: "Tài khoản hoặc mật khẩu không chính xác!",
    });
  }

  req.session.user = {
    id: user.id,
    username: user.username,
    role: user.role,
  };

    // console.log("SESSION USER:", req.session.user);
    // console.log("Cookie sau khi đăng nhập:", req.headers.cookie);

  req.session.save((err) => {
    if (err) {
      return res.status(500).json({ message: "Lỗi lưu session" });
    }

    return res.status(200).json({
      message: "Đăng nhập thành công",
      role: user.role
    });
  });
};

const getUpdateR = async (req, res) => {
  try {
    let id = req.params.idr;

    let room = await getRoomByID(id);

    return res.status(200).json({
      message: "Lấy thông tin phòng thành công!",
      data: room,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server!",
      error: error.message,
    });
  }

}

const UpdateR = async (req, res) => {
  try {
    let id = req.params.idr;
    let { roomName, roomType, capacity, status} = req.body;

    if (!roomName || !roomType || !capacity || !status) {
      return res.status(400).json({
        message: "Không được để trống các trường thông tin",
      });
    }

    let check = await GetRoomByName(roomName);

    if (check.length > 0 && check[0].id !== parseInt(id)) {
      return res.status(409).json({
        message: "Tên phòng đã tồn tại!",
      });
    }

    await UpdateRooms(id, roomName, roomType, capacity, status);

    return res.status(200).json({
      message: "Cập nhật thông tin thành công",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server!",
    });
  }
};

const DeleteR = async (req, res) => {
  try {
    let id = req.params.idr;

    await DeleteRoomById(id);
    return res.status(200).json({
      message: "Xóa Thành Công!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server!",
    });
  }
};

/*================ ACCOUNT =================*/

const AdQLTK = async (req, res) => {
  try {
    let acc = await getFullAcc();

    return res.status(200).json({
      message: "Lấy thành công",
      data: acc,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server!",
    });
  }
};

const Register = async (req, res) => {
  try {
    const { username, password, email, fullname, role } = req.body;

    const userRole = role ? role : "USER"; //Dùng tích chọn 1 đối tượng 'ADMIN'

    if (!username || !password || !fullname || !email) {
      return res.status(400).json({
        message: "Vui lòng nhập đầy đủ thông tin!",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Mật khẩu dài tối thiểu 8 ký tự!",
      });
    }

    let check = await getUserByUS(username);

    if (check.length > 0) {
      return res.status(409).json({
        message: "UserName đã tồn tại!",
      });
    }

    await CreateAcc( username, password, email, fullname ,role);

    return res.status(200).json({
      message: "Tạo tài khoản thành công!",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
};

const DeleteAcc = async (req, res) => {
  try {
    let id = req.params.ida;

    await DeleteAccById(id);
    return res.status(200).json({
      message: "Xóa Thành Công!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Lỗi server!",
    });
  }
};


const getUpdateAcc = async (req, res) => {
  try {
    let id = req.params.ida;

    let acc = await getUserByID(id);

    return res.status(200).json({
      message: "Lấy thông tin tài khoản thành công!",
      data: acc,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server!",
      error: error.message,
    });
  }
}

const UpdateAccout = async (req, res) => {
  try {
    let id = req.params.ida;
    let {password, email, name, role} = req.body;

    if (!password || !name || !email) {
      return res.status(400).json({
        message: "Vui lòng điền đầy đủ thông tin!",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Mật khẩu dài tối thiểu 8 ký tự!",
      });
    }

    await updateAccoutById(id, password, email, name, role);

    return res.status(200).json({
      message: "Cập nhật thông tin tài khoản thành công!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Lỗi server!",
    });
  }
};

const ChangePass = async (req, res) => {
  try {
    if (!req.session || !req.session.user) {
      return res.status(401).json({
        message: "Bạn chưa đăng nhập!",
        tus: false,
      });
    }

    const id = req.session.user.id;
    const { password, new_pass } = req.body;

    // console.log("pass: ", password);

    const check = await checkpass(id, password);

    if (!check) {
      return res.status(400).json({
        message: "Mật khẩu hiện tại không đúng!",
        tus: false,
      });
    }

    await updatepass(id, new_pass);

    return res.status(200).json({
      message: "Cập nhật mật khẩu thành công!",
      tus: true,
    });
  } catch (error) {
    console.error("ERROR ChangePass:", error.message);
    return res.status(500).json({
      message: error.message,
      tus: false,
    });
  }
};

/*================ BOOKINGS =================*/

const ReqRooms = async (req, res) => {
  try {
    let id = req.session.user.id;

    let { status } = req.body;

    let checkBooking = await CheckBookingRoom(id, status);

    // console.log("checkBooking:", checkBooking);

    if (checkBooking.length > 0) {
      return res.status(200).json({
        message: "Thành công!",
        data: checkBooking,
      });
    }

  } catch (error) {
    return res.status(500).json({
      message: "Server Lỗi!",
    });
  }
};

const BookingRooms = async (req, res) => {
  try {
    let { roomName, date, ca_hoc , purpose } = req.body;
    let idUser = req.session.user.id;
    let roomID = await GetIdRoomByName(roomName);
      if (!roomName || !date || !ca_hoc) { 
        return res.status(400).json({
          message: "Vui lòng nhập đầy đủ thông tin!",
        });
      }

    
    await Bookings(idUser, roomID, ca_hoc, date, purpose);

    return res.status(200).json({
      message: "Đăng ký thành công!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Lỗi server!",
    });
  }
};

const getTotalRows = async (req, res) => {
  try {
    const totalRooms = await getTotalRooms();
    const totalAccounts = await getTotalAccounts();
    const totalBookings = await getTotalBookings();

    return res.status(200).json({
      totalRooms,
      totalAccounts,
      totalBookings
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Lỗi server!",
    });
  }
};


const SearchingAccount = async (req, res) => {
  try {
    const name = req.query.username;

    const accounts = await getUserByUS(name);

    return res.status(200).json({
      message: "Tìm kiếm thành công!",
      data: accounts,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server!",
    });
  }
};

const ShowRooms = async (req, res) => {
  try {
    let name = req.query.roomName;

    // console.log("Name nhận được:", name);

    let rooms = await GetRoomByName(name);

    return res.status(200).json({
      message: "Lấy thông tin phòng thành công!",
      data: rooms,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Lỗi server!",
    });
  }
};

const getStatus = async (req, res) => {
  try {
    const name = req.body.roomName;
    const id = await GetIdRoomByName(name);
    // console.log("ID phòng nhận được:", id);
    const date = req.body.date;
    const status1 = await getStatus1(id, date);
    const status2 = await getStatus2(id, date);
    const status3 = await getStatus3(id, date);
    const status4 = await getStatus4(id, date);
    // console.log(status1, status2, status3, status4);
    // console.log(typeof date);

    return res.status(200).json({
      message: "Lấy trạng thái thành công!",
      ca1: status1,
      ca2: status2,
      ca3: status3,
      ca4: status4
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Lỗi server!",
    });
  }
};


const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        message: "Đăng xuất thất bại"
      });
    }

    res.clearCookie("connect.sid", {
      path: "/"
    }); // xóa cookie session

    return res.status(200).json({
      message: "Đăng xuất thành công"
    });
  });
};


const Auth = async (req, res) => {
  if(req.session.user) {
    
    let user = req.session.user.username;
    const auth = await getUserByUS(user);

    // console.log("user: ", user);
    // console.log(auth);
    
    return res.status(200).json({
      data: auth,
      message: "Success!",
    });
  }
  return res.status(401).json({
    message: "Chưa đăng nhập",
  });
}

const ReqRoomsByStatus = async (req, res) => {
  try {
    let { status } = req.body;
    let rooms = await CheckTimeBookings(status);


    return res.status(200).json({
      message: "Lấy thông tin phòng thành công!",
      data: rooms,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Lỗi server!",
    });
  }
}


const ChangeStatusBookings = async (req,res) => {
  try {
    const { id, status } = req.body;
    let idUser = req.session.user.id;
    await ChangeStatus(id, idUser ,status);

    return res.status(200).json({
      message: "Cập nhật trạng thái thành công!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Lỗi server!",
    });
  }
}

module.exports = {
  getAdmin, getUpdateR, getTotalRows,
  postNewRooms, getStatus,
  postLogin, logout, Auth,
  AdQLTK,
  Register,
  UpdateR,
  DeleteR,
  DeleteAcc, ChangePass,
  UpdateAccout, ChangeStatusBookings,
  ReqRooms, ShowRooms, ReqRoomsByStatus,
  BookingRooms, Searching, SearchingAccount, getUpdateAcc
};

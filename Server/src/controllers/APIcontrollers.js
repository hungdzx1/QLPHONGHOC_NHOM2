const connection = require("../config/database");

const {
  getAllRooms,
  creatNewRooms,
  checkAccount,
  getUserByID,
  getFullAcc,
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
    id: user.idAccount,
    username: user.userName,
    role: user.role,
  };

  return res.status(200).json({
    message: "Đăng nhập thành công!",
    role: user.role,
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
    const { cusername, cpass, fullname, role } = req.body;

    const userRole = role ? role : "USER"; //Dùng tích chọn 1 đối tượng 'ADMIN'

    if (!cusername || !cpass || !fullname) {
      return res.status(400).json({
        message: "Vui lòng nhập đầy đủ thông tin!",
      });
    }

    if (cpass.length < 8) {
      return res.status(400).json({
        message: "Mật khẩu dài tối thiểu 8 ký tự!",
      });
    }

    let check = await getUserByUS(cusername);

    if (check.length > 0) {
      return res.status(409).json({
        message: "UserName đã tồn tại!",
      });
    }

    await CreateAcc(cusername, cpass, fullname, userRole);

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

const UpdateAccout = async (req, res) => {
  try {
    let id = req.params.ida;
    let pass = req.body.password;
    let role = req.body.roleA;
    let name = req.body.nameA;

    const userRole = role ? role : "USER";

    if (!pass || !name) {
      return res.status(400).json({
        message: "Vui lòng điền đầy đủ thông tin!",
      });
    }

    if (pass.length < 8) {
      return res.status(400).json({
        message: "Mật khẩu dài tối thiểu 8 ký tự!",
      });
    }

    await updateAccoutById(id, pass, userRole, name);

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

const ReqRooms = async (req, res) => {
  try {
    let id = req.params.idr;

    let rooms = await getRoomByID(id);

    let checkBooking = await CheckBookingRoom(id);

    if (checkBooking.length > 0) {
      return res.status(200).json({
        message: "Thành công!",
        statusRoom: "Bận",
        Data: rooms,
      });
    }

    return res.status(200).json({
      message: "Thành công!",
      statusRoom: "Trống",
      Data: rooms,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Lỗi!",
    });
  }
};

const BookingRooms = async (req, res) => {
  try {
    let { StartTime, EndTime } = req.body;
    let roomID = req.params.idr;
    let idUser = req.session.user.id;

    if (!StartTime || !EndTime) {
      return res.status(400).json({
        message: "Vui lòng điền đầy đủ thông tin!",
      });
    }

    if (new Date(StartTime) >= new Date(EndTime)) {
      return res.status(400).json({
        message: "Thời gian không hợp lệ",
      });
    }

    const exist = await CheckTimeBookings(roomID, StartTime, EndTime);

    if (exist.length > 0) {
      return res.status(400).json({
        message: "Thời gian đặt bị trùng!",
      });
    }

    await Bookings(idUser, roomID, StartTime, EndTime);

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




module.exports = {
  getAdmin, getUpdateR,
  postNewRooms,
  postLogin,
  AdQLTK,
  Register,
  UpdateR,
  DeleteR,
  DeleteAcc,
  UpdateAccout,
  ReqRooms,
  BookingRooms, Searching
};

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
} = require("../services/CRUD");

const getLogin = (req, res) => {
  return res.render("login.ejs");
};

const Dashboard = async (req, res) => {
  try {
    let room = await getAllRooms();
    return res.render("dashboard.ejs", {Rooms: room});
  } catch (error) {
    res.render("404.ejs");
  }
}

const Searching = async (req, res) => {
  try {
    let name = req.query.name;
    let room = await GetRoomByName(name);
    return res.render("searching.ejs", {Rooms: room});
  } catch (error) {
    return res.render("404.ejs");
  }
}

const AdminSearching = async (req, res) => {
  try {
    let name = req.query.name;
    let room = await GetRoomByName(name);
    return res.render("admin-searching.ejs", {Rooms: room});
  } catch (error) {
    return res.render("404.ejs");
  }
}

const getAdmin = async (req, res) => {
  try {
    let room = await getAllRooms();
    return res.render("admin.ejs", {Rooms: room});
  } catch (error) {
    return res.render("404.ejs");
  }  
};

const postRooms = async (req, res) => {
  return res.render("create-room.ejs");
};

const postNewRooms = async (req, res) => {
  let Name = req.body.RName;
  let CreateBy = req.session.user.id;

  let check = await GetRoomByName(Name);
  
  if(check.length > 0){
    return res.send("Rooms Existed!")
  }

  await creatNewRooms(Name, CreateBy);

  return res.redirect("/admin");
};

const postLogin = async (req, res) => {
  const { username, password } = req.body;

  if(!username || !password){
    return res.status(400).json({ message: "Thiếu thông tin" });
  }

  let user = await checkAccount(username, password);


  if (!user) {
    return res.status(401).json({
      message: "Tài khoản không tồn tại!",
    })
  }

  if(user.passWord !== password){
    return res.status(401).json({
      message: "Sai mật khẩu!",
    })
  }

  req.session.user = {
    id: user.idAccount,
    username: user.userName,
    role: user.role,
  };

  if(req.session.user.role === "ADMIN"){
    return res.redirect("/admin");
  }

  return res.redirect("/dashboard");

};

const AdQLTK = async (req, res) => {
  let acc = await getFullAcc();
  return res.render("createAcc.ejs", { Acount: acc });
};

const Register = async (req, res) => {
  try {
    const { cusername, cpass, role } = req.body;

    let check = await getUserByUS(cusername);

    if (check.length > 0) {
      return res.send("Username already existed!");
    }

    const userRole = role ? role : "USER";

    await CreateAcc(cusername, cpass, userRole);

    // res.send("SUCCESSS!");

    return res.redirect("/ql-taikhoan");
  } catch (err) {
      console.log(err);
      return res.status(500).send("Server error");
  }
};

const getUpdateR = async (req, res) => {
  let id = req.params.idr;

  let room = await getRoomByID (id);

  return res.render('update-room.ejs', {Rooms: room});

}

const UpdateR = async (req, res) => {
  let id = req.params.idr;
  let nameRooms = req.body.RName;
  let stt = req.body.stt;

  await UpdateRooms(id, nameRooms, stt);

  return res.redirect('/admin');
}

const DeleteR = async (req, res) => {
  let id = req.params.idr;
  await DeleteRoomById(id);

  return res.redirect('/admin');
}



module.exports = {
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
  Dashboard, Searching, AdminSearching
};
